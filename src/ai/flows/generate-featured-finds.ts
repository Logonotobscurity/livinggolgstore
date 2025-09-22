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

const allProductsForPrompt = PlaceHolderImages.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
}));

const prompt = ai.definePrompt({
    name: 'generateFeaturedFindsPrompt',
    output: { schema: GenerateFeaturedFindsOutputSchema },
    prompt: `You are an expert curator for "Living Gold", a luxury lighting and decor store in Nigeria.
Your task is to select exactly 4 diverse and visually interesting products to feature on the homepage. You must also write a short, catchy headline for the section.

- Select a diverse mix of products. Do not pick more than one from the same category.
- For each product, write a compelling, one-sentence reason why it's a "featured find".
- The reasons should be exciting and entice users to click. Example: "A true masterpiece of hand-blown glass that commands attention." or "The perfect blend of vintage charm and modern engineering."

Here is the list of all available products:
---
{{#each products}}
- ID: {{this.id}}, Title: {{this.title}}, Description: {{this.description}}, Category: {{this.category}}
{{/each}}
---

Generate the headline and the 4 featured products now.`,
});


const generateFeaturedFindsFlow = ai.defineFlow(
  {
    name: 'generateFeaturedFindsFlow',
    outputSchema: GenerateFeaturedFindsOutputSchema,
  },
  async () => {
    
    const { output } = await prompt({ products: allProductsForPrompt });

    if (!output?.products) {
      // Fallback in case AI fails
      return {
        heading: "Curator's Picks",
        products: PlaceHolderImages.slice(0, 4).map(p => ({...p, reason: "A fantastic choice for any home."}))
      };
    }
    
    // Hydrate the results with full product data for the UI
    const hydratedProducts = output.products.map(result => {
        const fullProduct = PlaceHolderImages.find(p => p.id === result.id);
        if (!fullProduct) return null; // Should not happen if AI returns valid IDs
        return {
            ...fullProduct,
            reason: result.reason,
        };
    }).filter(Boolean) as GenerateFeaturedFindsOutput['products'];

    return { 
        heading: output.heading,
        products: hydratedProducts
    };
  }
);
