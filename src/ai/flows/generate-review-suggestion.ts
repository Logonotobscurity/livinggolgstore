'use server';

/**
 * @fileOverview An AI agent that helps users write more descriptive product reviews.
 *
 * - generateReviewSuggestion - A function that suggests a product review.
 * - GenerateReviewSuggestionInput - The input type for the function.
 * - GenerateReviewSuggestionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateReviewSuggestionInputSchema = z.object({
  productName: z.string().describe('The name of the product being reviewed.'),
  userText: z
    .string()
    .describe('The initial, brief text the user has written.'),
});
export type GenerateReviewSuggestionInput = z.infer<
  typeof GenerateReviewSuggestionInputSchema
>;

const GenerateReviewSuggestionOutputSchema = z.object({
  suggestion: z
    .string()
    .describe('The AI-generated review suggestion.'),
});
export type GenerateReviewSuggestionOutput = z.infer<
  typeof GenerateReviewSuggestionOutputSchema
>;

export async function generateReviewSuggestion(
  input: GenerateReviewSuggestionInput
): Promise<GenerateReviewSuggestionOutput> {
  return generateReviewSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReviewSuggestionPrompt',
  input: { schema: GenerateReviewSuggestionInputSchema },
  output: { schema: GenerateReviewSuggestionOutputSchema },
  prompt: `You are a helpful and eloquent shopping assistant for a luxury lighting store. A customer is writing a review for the product "{{productName}}" and has started with the following text: "{{userText}}".

Your task is to expand on the user's initial thought to create a more helpful and descriptive review. The review should be positive but balanced, and sound authentic. It should be about 2-4 sentences long.

Focus on aspects that other customers would find useful, such as:
- The quality of the materials.
- The aesthetic and how it feels in a room.
- A potential use case (e.g., "perfect for a reading nook," "a real statement piece in our dining room").
- The ambiance or quality of the light it produces.

Do not use overly exaggerated language. Keep it elegant and helpful.

Example:
Product: "Modo 3 Sided Chandelier"
User Text: "I love it!"
Suggestion: "I absolutely love this Modo chandelier! The quality is immediately apparent, and it has become a stunning centerpiece in our dining room. It casts a warm, inviting glow that has completely transformed the space."
`,
});

const generateReviewSuggestionFlow = ai.defineFlow(
  {
    name: 'generateReviewSuggestionFlow',
    inputSchema: GenerateReviewSuggestionInputSchema,
    outputSchema: GenerateReviewSuggestionOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
