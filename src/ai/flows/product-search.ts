'use server';

/**
 * @fileOverview An AI agent that performs semantic search for products.
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

const prompt = ai.definePrompt({
  name: 'productSearchPrompt',
  input: { schema: ProductSearchInputSchema },
  output: { schema: ProductSearchOutputSchema },
  prompt: `You are a product search expert for a luxury lighting store called "Living Gold".
You will be given a user's search query. Your task is to analyze the user's intent and return the most relevant products from the list provided below.

Consider the user's intent, not just keyword matching. For example, if a user asks for "something for a dark entryway", you should look for products that provide good illumination or are described as bright. If they ask for "a statement piece", you should look for large, impressive, or unique items like chandeliers.

Return a list of product objects that are the best matches for the query.

User Query: {{{query}}}

Available Products:
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
    const { output } = await prompt({ query: input.query, products: allProducts });
    if (!output) {
      return { results: [] };
    }

    // Hydrate the results with full product data
    const hydratedResults = output.results.map(result => {
        const fullProduct = PlaceHolderImages.find(p => p.id === result.id);
        return fullProduct || result;
    }).filter(Boolean);

    return { results: hydratedResults as any[] };
  }
);
