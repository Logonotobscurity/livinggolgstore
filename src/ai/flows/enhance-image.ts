
'use server';

/**
 * @fileOverview An AI agent that enhances an image based on a prompt.
 *
 * - enhanceImage - A function that enhances an image.
 * - EnhanceImageInput - The input type for the enhanceImage function.
 * - EnhanceImageOutput - The return type for the enhanceImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to enhance, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  prompt: z.string().describe('A text description of how the image should be enhanced.'),
});
export type EnhanceImageInput = z.infer<typeof EnhanceImageInputSchema>;

const EnhanceImageOutputSchema = z.object({
  enhancedImageUri: z
    .string()
    .describe('The enhanced image, as a data URI.'),
});
export type EnhanceImageOutput = z.infer<typeof EnhanceImageOutputSchema>;


export async function enhanceImage(input: EnhanceImageInput): Promise<EnhanceImageOutput> {
    return enhanceImageFlow(input);
}


const enhanceImageFlow = ai.defineFlow(
  {
    name: 'enhanceImageFlow',
    inputSchema: EnhanceImageInputSchema,
    outputSchema: EnhanceImageOutputSchema,
  },
  async (input) => {
    const {media} = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
            {media: {url: input.photoDataUri}},
            {text: input.prompt},
        ],
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media.url) {
        throw new Error('Image enhancement failed to produce an image.');
    }

    return {
        enhancedImageUri: media.url,
    };
  }
);
