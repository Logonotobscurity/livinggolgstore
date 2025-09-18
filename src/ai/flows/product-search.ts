
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
 * Simulates a retrieval step from a vector database.
 * In a real-world scenario, this would involve embedding the query and
 * performing a similarity search against a vector index of products.
 * Here, we use a simple keyword match to pre-filter relevant documents.
 */
function retrieveRelevantProducts(query: string, count: number = 20) {
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    if (queryWords.length === 0) {
        return allProducts.slice(0, count); // Return a default set if query is too generic
    }

    const relevant = allProducts.filter(product => {
        const productText = `${product.title?.toLowerCase()} ${product.description.toLowerCase()}`;
        return queryWords.some(word => productText.includes(word));
    });

    // If keyword search yields too few results, fall back to a larger default set.
    if (relevant.length < 5) {
        return allProducts.slice(0, count);
    }
    
    return relevant.slice(0, count);
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
- ID: {{this.id}}, Slug: {{this.slug}}, Title: {{this.title}}, Description: {{this.description}}
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

    // 1. Retrieval Step (Simulated)
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
