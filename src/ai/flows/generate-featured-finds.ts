'use server';

/**
 * @fileOverview An AI agent that generates a curated list of featured products for the homepage.
 *
 * - generateFeaturedFinds - A function that returns a list of featured products.
 * - GenerateFeaturedFindsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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
  heading: z.string().describe("A short, catchy headline for the featured products section."),
  products: z.array(FeaturedProductSchema),
});
export type GenerateFeaturedFindsOutput = z.infer<typeof GenerateFeaturedFindsOutputSchema>;


export async function generateFeaturedFinds(): Promise<GenerateFeaturedFindsOutput> {
  return generateFeaturedFindsFlow();
}

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
    
    // 1. Shuffle products to ensure variety on each run
    const shuffledProducts = _.shuffle(PlaceHolderImages);

    // 2. Select 4 diverse products programmatically
    const selectedProducts = [];
    const usedCategories = new Set<string>();
    for (const product of shuffledProducts) {
        if (selectedProducts.length >= 4) break;
        if (product.category && !usedCategories.has(product.category)) {
            selectedProducts.push(product);
            usedCategories.add(product.category);
        }
    }

    // Fallback if diversification logic fails to find 4 unique categories
    if (selectedProducts.length < 4) {
        const fallback = shuffledProducts.slice(0, 4 - selectedProducts.length);
        selectedProducts.push(...fallback);
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


    return { 
        heading: "Curator's Featured Finds",
        products: productsWithReasons as any,
    };
  }
);
