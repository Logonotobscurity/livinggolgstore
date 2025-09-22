'use server';
/**
 * @fileOverview A Text-to-Speech (TTS) agent for generating audio from text.
 * - generateAudioGuide - Converts text into a playable audio file.
 */

import { ai } from '@/ai/genkit';
import { toWav } from '@/lib/wav-utils';
import { z } from 'genkit';

const GenerateAudioGuideInputSchema = z.object({
  guideText: z.string().describe('The text to be converted to speech.'),
});
export type GenerateAudioGuideInput = z.infer<
  typeof GenerateAudioGuideInputSchema
>;

const GenerateAudioGuideOutputSchema = z.object({
  audioUri: z.string().describe('The generated audio as a data URI.'),
});
export type GenerateAudioGuideOutput = z.infer<
  typeof GenerateAudioGuideOutputSchema
>;

export async function generateAudioGuide(
  input: GenerateAudioGuideInput
): Promise<GenerateAudioGuideOutput> {
  return generateAudioGuideFlow(input);
}

const generateAudioGuideFlow = ai.defineFlow(
  {
    name: 'generateAudioGuideFlow',
    inputSchema: GenerateAudioGuideInputSchema,
    outputSchema: GenerateAudioGuideOutputSchema,
  },
  async ({ guideText }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: guideText,
    });

    if (!media?.url) {
      throw new Error('No audio was returned from the TTS model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    return {
      audioUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);

    