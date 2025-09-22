'use server';

/**
 * @fileOverview An AI agent that generates a virtual installation guide for a lighting product.
 *
 * - generateInstallationGuide - A function that generates the guide.
 * - GenerateInstallationGuideInput - The input type for the function.
 * - GenerateInstallationGuideOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateInstallationGuideInputSchema = z.object({
  productName: z.string().describe('The name of the lighting product.'),
});
export type GenerateInstallationGuideInput = z.infer<
  typeof GenerateInstallationGuideInputSchema
>;

const GuideStepSchema = z.object({
  step: z.number().describe('The step number.'),
  title: z.string().describe('The title of the step.'),
  description: z.string().describe('The detailed description of the step.'),
});

const GenerateInstallationGuideOutputSchema = z.object({
  productName: z.string(),
  toolsRequired: z.array(z.string()).describe('A list of tools required for installation.'),
  safetyPrecautions: z.array(z.string()).describe('A list of important safety precautions.'),
  steps: z.array(GuideStepSchema).describe('An array of step-by-step installation instructions.'),
});
export type GenerateInstallationGuideOutput = z.infer<
  typeof GenerateInstallationGuideOutputSchema
>;

export async function generateInstallationGuide(
  input: GenerateInstallationGuideInput
): Promise<GenerateInstallationGuideOutput> {
  return generateInstallationGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstallationGuidePrompt',
  input: { schema: GenerateInstallationGuideInputSchema },
  output: { schema: GenerateInstallationGuideOutputSchema },
  prompt: `You are an expert technical writer for a luxury lighting company called "Living Gold". Your task is to generate a clear, concise, and professional installation guide for the lighting product: "{{productName}}".

The guide must be easy for both homeowners and professional electricians to understand. Assume all products are for the Nigerian market and must comply with local electrical standards (230V, 50Hz).

Generate a guide with the following structure:
1.  **Tools Required**: List common tools needed (e.g., Phillips screwdriver, wire strippers, ladder).
2.  **Safety Precautions**: Provide critical safety warnings. Always include "Turn off power at the circuit breaker before installation."
3.  **Installation Steps**: Provide a clear, step-by-step sequence for installing the fixture. Start from unboxing and end with testing the light. Include steps for mounting the bracket, connecting the wires (Live, Neutral, Earth), securing the fixture, and installing bulbs.

Product Name: {{productName}}

Generate the installation guide now.`,
});

const generateInstallationGuideFlow = ai.defineFlow(
  {
    name: 'generateInstallationGuideFlow',
    inputSchema: GenerateInstallationGuideInputSchema,
    outputSchema: GenerateInstallationGuideOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
