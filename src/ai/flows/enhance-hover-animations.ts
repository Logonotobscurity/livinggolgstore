'use server';

/**
 * @fileOverview An AI agent that enhances hover animations on interactive elements.
 *
 * - enhanceHoverAnimation - A function that enhances hover animations.
 * - EnhanceHoverAnimationInput - The input type for the enhanceHoverAnimation function.
 * - EnhanceHoverAnimationOutput - The return type for the enhanceHoverAnimation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceHoverAnimationInputSchema = z.object({
  elementDescription: z
    .string()
    .describe('The description of the interactive element.'),
  currentCSS: z
    .string()
    .describe('The current CSS styles applied to the element.'),
});
export type EnhanceHoverAnimationInput = z.infer<typeof EnhanceHoverAnimationInputSchema>;

const EnhanceHoverAnimationOutputSchema = z.object({
  enhancedCSS: z
    .string()
    .describe('The enhanced CSS styles for the hover animation.'),
});
export type EnhanceHoverAnimationOutput = z.infer<typeof EnhanceHoverAnimationOutputSchema>;

export async function enhanceHoverAnimation(input: EnhanceHoverAnimationInput): Promise<EnhanceHoverAnimationOutput> {
  return enhanceHoverAnimationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceHoverAnimationPrompt',
  input: {schema: EnhanceHoverAnimationInputSchema},
  output: {schema: EnhanceHoverAnimationOutputSchema},
  prompt: `You are an expert UI/UX designer specializing in creating subtle and engaging hover animations.

You will receive a description of an interactive element and its current CSS styles.
Your task is to enhance the hover animation by adjusting properties like color, scale, shadow, and other appropriate CSS properties to make the user interface feel more dynamic and engaging.

Description: {{{elementDescription}}}
Current CSS: {{{currentCSS}}}

Enhanced CSS (only include the hover styles, starting with :hover):`,
});

const enhanceHoverAnimationFlow = ai.defineFlow(
  {
    name: 'enhanceHoverAnimationFlow',
    inputSchema: EnhanceHoverAnimationInputSchema,
    outputSchema: EnhanceHoverAnimationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
