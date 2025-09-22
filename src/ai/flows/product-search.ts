
'use server';

/**
 * @fileOverview An AI agent that performs semantic search for products using a RAG approach.
 *
 * - productSearch - A function that handles the product search process.
 * - ProductSearchInput - The input type for the productSearch function.
 * - ProductSearchOutput - The return type for the productSearch function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TfIdf, PorterStemmer } from 'natural';

const ProductSearchInputSchema = z.object({
  query: z.string().describe('The user\'s search query.'),
});
export type ProductSearchInput = z.infer<typeof ProductSearchInputSchema>;

const ProductSearchOutputSchema = z.object({
  results: z.array(z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string().optional(),
    description: z.string(),
    imageUrl: z.string(),
    imageHint: z.string(),
    price: z.string().optional(),
  })),
});
export type ProductSearchOutput = z.infer<typeof ProductSearchOutputSchema>;

export async function productSearch(input: ProductSearchInput): Promise<ProductSearchOutput> {
  return productSearchFlow(input);
}

const allProducts = PlaceHolderImages.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description
}));

/**
 * Simulates a retrieval step from a vector database using NLP.
 * This function uses TF-IDF to rank products based on the user's query.
 */
function retrieveRelevantProducts(query: string, count: number = 20) {
    if (!query.trim()) {
        return allProducts.slice(0, count);
    }
    
    const tfidf = new TfIdf();
    
    // Add product documents to the model
    allProducts.forEach((product, index) => {
        const text = `${product.title?.toLowerCase()} ${product.description.toLowerCase()}`;
        tfidf.addDocument(text, index);
    });

    // Get the scores for the query
    const scores: { index: number; value: number }[] = [];
    tfidf.tfidfs(query.toLowerCase(), (i, measure) => {
        scores.push({ index: i, value: measure });
    });

    // Sort by score in descending order
    scores.sort((a, b) => b.value - a.value);

    // Get the top matching products, filtering out zero-score results
    const relevant = scores
        .filter(score => score.value > 0)
        .slice(0, count)
        .map(score => allProducts[score.index]);
    
    if (relevant.length < 5) {
        return allProducts.slice(0, count);
    }

    return relevant;
}


const prompt = ai.definePrompt({
  name: 'productSearchPrompt',
  input: { schema: z.object({
      query: z.string(),
      products: z.array(z.object({
          id: z.string(),
          slug: z.string(),
          title: z.string().optional(),
          description: z.string(),
      }))
  }) },
  output: { schema: ProductSearchOutputSchema },
  prompt: `You are a product search expert for a luxury lighting store called "Living Gold".
You will be given a user's search query and a pre-filtered list of potentially relevant products. Your task is to act as the final-stage ranker, analyzing the user's intent and returning only the most relevant products from the list provided.

Consider the user's intent, not just keyword matching. For example, if a user asks for "something for a dark entryway", you should look for products that provide good illumination or are described as bright. If they ask for "a statement piece", you should look for large, impressive, or unique items like chandeliers.

Return a ranked list of the product objects that are the best matches for the query.

User Query: {{{query}}}

Available Products (pre-filtered for relevance):
---
{{#each products}}
- ID: {{this.id}}, Title: {{this.title}}, Description: {{this.description}}
{{/each}}
---
`,
});

const productSearchFlow = ai.defineFlow(
  {
    name: 'productSearchFlow',
    inputSchema: ProductSearchInputSchema,
    outputSchema: ProductSearchOutputSchema,
  },
  async (input) => {

    // 1. Retrieval Step (NLP-enhanced)
    const relevantProducts = retrieveRelevantProducts(input.query);

    // 2. Generation/Ranking Step
    const { output } = await prompt({ 
        query: input.query, 
        products: relevantProducts 
    });
    
    if (!output) {
      return { results: [] };
    }

    // 3. Hydrate the results with full product data for the UI
    const hydratedResults = output.results.map(result => {
        const fullProduct = PlaceHolderImages.find(p => p.id === result.id);
        return fullProduct || result;
    }).filter(Boolean);

    return { results: hydratedResults as any[] };
  }
);
