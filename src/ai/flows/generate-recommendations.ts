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
import { JaroWinklerDistance, TfIdf } from 'natural';

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

    const candidateProducts = PlaceHolderImages.filter(p => p.id !== sourceProduct.id);

    // 1. Calculate TF-IDF for description similarity
    const tfidf = new TfIdf();
    tfidf.addDocument(sourceProduct.description);
    candidateProducts.forEach(p => tfidf.addDocument(p.description));
    
    // 2. Score and rank candidates
    const scoredProducts = candidateProducts.map((candidate, index) => {
        let score = 0;

        // Score 1: Category match (highest weight)
        if (candidate.category === sourceProduct.category) {
            score += 1.0;
        }

        // Score 2: Title similarity (Jaro-Winkler distance)
        const titleSimilarity = JaroWinklerDistance(sourceProduct.title || '', candidate.title || '', {});
        score += titleSimilarity * 0.5;

        // Score 3: Description similarity (TF-IDF)
        const descriptionSimilarity = tfidf.tfidf(sourceProduct.description, index + 1);
        score += descriptionSimilarity * 0.2;

        return {
            ...candidate,
            score
        };
    });

    // 3. Sort by score and take top 4
    const sortedProducts = scoredProducts.sort((a, b) => b.score - a.score);
    const top4 = sortedProducts.slice(0, 4);

    // 4. Format for output
    const recommendations = top4.map(product => ({
      ...product,
      reason: "Similar product"
    }));

    return { recommendations };
  }
);