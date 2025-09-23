
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


const reasonPrompt = ai.definePrompt({
    name: 'generateRecommendationReasonPrompt',
    input: { schema: z.object({
        sourceProduct: z.object({
            title: z.string(),
            description: z.string(),
            category: z.string().optional(),
        }),
        candidateProduct: z.object({
            title: z.string(),
            description: z.string(),
            category: z.string().optional(),
        })
    })},
    output: { schema: z.object({ reason: z.string() }) },
    prompt: `You are a helpful and stylish shopping assistant for "Living Gold", a luxury lighting store in Nigeria.
Your task is to generate a very short, compelling reason (about 10-15 words) why a customer might like a "candidate product," given they are looking at a "source product."

Focus on a key similarity or a compelling difference. Speak like a local expert, not a robot.

Examples:
- "Offers a similar modern aesthetic, but as a table lamp."
- "If you like that gold finish, this is a much bolder statement piece."
- "A more minimalist take on the classic chandelier design."

Source Product:
- Title: {{sourceProduct.title}}
- Description: {{sourceProduct.description}}
- Category: {{sourceProduct.category}}

Candidate Product:
- Title: {{candidateProduct.title}}
- Description: {{candidateProduct.description}}
- Category: {{candidateProduct.category}}

Generate the reason now.`
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
        let descriptionSimilarity = 0;
        const sourceTerms = sourceProduct.description.split(' ');
        tfidf.tfidfs(sourceTerms, (i, measure) => {
             // The first document added was the source, so candidate indices are offset by 1.
             if (i === index + 1) { 
                descriptionSimilarity += measure;
            }
        });
        score += descriptionSimilarity * 0.01; // Lower weight for description

        return {
            ...candidate,
            score
        };
    });

    // 3. Sort by score and take top 4
    const sortedProducts = scoredProducts.sort((a, b) => b.score - a.score);
    const top4 = sortedProducts.slice(0, 4);

    // 4. Generate AI reasons for each of the top 4
    const recommendationsWithReasons = await Promise.all(top4.map(async (product) => {
        try {
            const { output } = await reasonPrompt({
                sourceProduct: {
                    title: sourceProduct.title || '',
                    description: sourceProduct.description,
                    category: sourceProduct.category
                },
                candidateProduct: {
                    title: product.title || '',
                    description: product.description,
                    category: product.category
                }
            });
            return {
                ...product,
                reason: output?.reason || "A great alternative for your space."
            };
        } catch (error) {
             console.error(`Failed to generate recommendation reason for ${product.id}`, error);
             return {
                ...product,
                reason: "A great alternative for your space."
            };
        }
    }));


    return { recommendations: recommendationsWithReasons };
  }
);
