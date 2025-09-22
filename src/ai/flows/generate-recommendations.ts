'use server';

/**
 * @fileOverview An AI agent that generates product recommendations.
 *
 * - generateRecommendations - A function that recommends similar products.
 * - GenerateRecommendationsInput - The input type for the function.
 * - GenerateRecommendationsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

const GenerateRecommendationsInputSchema = z.object({
  productId: z.string().describe("The ID of the product to base recommendations on."),
});
export type GenerateRecommendationsInput = z.infer<typeof GenerateRecommendationsInputSchema>;

const RecommendedProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  imageHint: z.string(),
  price: z.string().optional(),
  category: z.string().optional(),
  reason: z.string().describe("A brief explanation for why this product is a good recommendation."),
});

const GenerateRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendedProductSchema),
});
export type GenerateRecommendationsOutput = z.infer<typeof GenerateRecommendationsOutputSchema>;


export async function generateRecommendations(
  input: GenerateRecommendationsInput
): Promise<GenerateRecommendationsOutput> {
  return generateRecommendationsFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generateRecommendationsPrompt',
  input: { schema: z.object({
      sourceProduct: RecommendedProductSchema.omit({ reason: true }),
      candidateProducts: z.array(RecommendedProductSchema.omit({ reason: true })),
  }) },
  output: { schema: GenerateRecommendationsOutputSchema },
  prompt: `You are a helpful and stylish interior design assistant for "Living Gold", a luxury lighting store. Your goal is to help customers discover products they'll love.

A customer is currently viewing the following product:
- Source Product: {{sourceProduct.title}}
- Description: {{sourceProduct.description}}

Based on this, select up to 4 of the most relevant products from the list of candidates below. For each recommendation, provide a short, compelling reason why the customer might like it, connecting it to the source product's style, function, or aesthetic.

Candidate Products:
---
{{#each candidateProducts}}
- ID: {{this.id}}, Title: {{this.title}}, Description: {{this.description}}
{{/each}}
---

Return a ranked list of the best recommendations with your reasons.`,
});


const generateRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateRecommendationsFlow',
    inputSchema: GenerateRecommendationsInputSchema,
    outputSchema: GenerateRecommendationsOutputSchema,
  },
  async ({ productId }) => {
    const sourceProduct = PlaceHolderImages.find(p => p.id === productId);
    if (!sourceProduct) {
      return { recommendations: [] };
    }

    // 1. Retrieval Step: Find candidate products from the same category.
    const candidateProducts = PlaceHolderImages.filter(
        p => p.category === sourceProduct.category && p.id !== sourceProduct.id
    ).slice(0, 10); // Limit candidates to reduce tokens and improve performance.

    if (candidateProducts.length === 0) {
      return { recommendations: [] };
    }

    // 2. Generation/Ranking Step: Use the LLM to select and rank the best recommendations.
    const { output } = await prompt({ 
        sourceProduct: sourceProduct, 
        candidateProducts: candidateProducts 
    });
    
    if (!output) {
      return { recommendations: [] };
    }

    // 3. Hydrate the results with full product data for the UI
    const hydratedResults = output.recommendations.map(result => {
        const fullProduct = PlaceHolderImages.find(p => p.id === result.id);
        return {
            ...(fullProduct || {}),
            ...result
        };
    }).filter(Boolean);

    return { recommendations: hydratedResults as any[] };
  }
);
