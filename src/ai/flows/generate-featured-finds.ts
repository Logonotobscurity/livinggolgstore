
'use server';

/**
 * @fileOverview An AI agent that generates a curated list of featured products for the homepage.
 *
 * - generateFeaturedFinds - A function that returns a list of featured products.
 * - GenerateFeaturedFindsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { getAverageRating } from '@/lib/reviews';
import _ from 'lodash';

const FeaturedProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  imageHint: z.string(),
  price: z.string().optional(),
  category: z.string().optional(),
  reason: z.string().describe("A brief, compelling reason why this product is being featured on the homepage."),
});

const GenerateFeaturedFindsOutputSchema = z.object({
  heading: z.string().describe("A short, catchy headline for the featured products section (e.g., 'Today's AI-Curated Picks')."),
  products: z.array(FeaturedProductSchema),
});
export type GenerateFeaturedFindsOutput = z.infer<typeof GenerateFeaturedFindsOutputSchema>;


export async function generateFeaturedFinds(): Promise<GenerateFeaturedFindsOutput> {
  return generateFeaturedFindsFlow();
}

const headlinePrompt = ai.definePrompt({
    name: 'generateFeaturedHeadlinePrompt',
    output: { schema: z.object({ heading: z.string() }) },
    prompt: `You are the voice of an AI-powered curation engine for "Living Gold", a luxury lighting store.
Your task is to generate a single, short, and exciting headline (5-7 words) for the "Featured Finds" section.
The headline should convey that the products were intelligently selected based on trends, popularity, and top ratings.

Examples:
- "Revealed: Today's Top-Rated Treasures"
- "AI-Curated Finds, Trending Now"
- "The Hottest Styles, Chosen by Our AI"

Generate the headline now.`,
});


const reasonPrompt = ai.definePrompt({
    name: 'generateFeaturedReasonPrompt',
    input: { schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string().optional(),
    })},
    output: { schema: z.object({ reason: z.string() }) },
    prompt: `You are an expert curator for "Living Gold", a luxury lighting and decor store in Nigeria.
Your task is to write a single, compelling, one-sentence reason why the following product is a "featured find" for the homepage.

The reason should be exciting, concise (around 15 words), and entice users to click.
Example: "A true masterpiece of hand-blown glass that commands attention."

Product Details:
- Title: {{title}}
- Description: {{description}}
- Category: {{category}}

Generate the compelling reason now.`,
});


const generateFeaturedFindsFlow = ai.defineFlow(
  {
    name: 'generateFeaturedFindsFlow',
    outputSchema: GenerateFeaturedFindsOutputSchema,
  },
  async () => {
    
    // 1. Fetch ratings and calculate a "popularity score" for all products
    const ratedProducts = await Promise.all(
      PlaceHolderImages.map(async (product) => {
        const ratingInfo = await getAverageRating(product.title || product.id);
        // Simple scoring: average rating * log(number of reviews + 1) to balance quality and popularity
        const score = ratingInfo.average * Math.log(ratingInfo.count + 1);
        return { ...product, score };
      })
    );

    // 2. Select 4 diverse, high-scoring products
    const shuffledProducts = _.shuffle(ratedProducts); // Shuffle to add variety among high-scorers
    const selectedProducts: (ImagePlaceholder & { score: number })[] = [];
    const usedCategories = new Set<string>();

    // Prioritize high-scoring products with unique categories
    shuffledProducts.sort((a, b) => b.score - a.score);

    for (const product of shuffledProducts) {
      if (selectedProducts.length >= 4) break;
      if (product.category && !usedCategories.has(product.category)) {
        selectedProducts.push(product);
        usedCategories.add(product.category);
      }
    }
    
    // Fallback if we can't find 4 unique categories
    if (selectedProducts.length < 4) {
      const needed = 4 - selectedProducts.length;
      const fallbackCandidates = shuffledProducts.filter(p => !selectedProducts.find(sp => sp.id === p.id));
      selectedProducts.push(...fallbackCandidates.slice(0, needed));
    }

    // 3. Generate AI-powered reasons for each selected product
    const productsWithReasons = await Promise.all(selectedProducts.map(async (product) => {
        try {
            const { output } = await reasonPrompt({
                title: product.title || 'Untitled Product',
                description: product.description,
                category: product.category,
            });
            return {
                ...product,
                reason: output?.reason || "A fantastic choice for any modern home."
            };
        } catch (error) {
            console.error(`Failed to generate reason for ${product.id}`, error);
            return {
                ...product,
                reason: "An elegant and sophisticated choice for your space."
            };
        }
    }));
    
    // 4. Generate a dynamic, "genius" headline
    let heading = "Curator's Featured Finds";
    try {
        const { output } = await headlinePrompt();
        if (output?.heading) {
            heading = output.heading;
        }
    } catch (error) {
        console.error('Failed to generate headline', error);
    }


    return { 
        heading: heading,
        products: productsWithReasons as any,
    };
  }
);
