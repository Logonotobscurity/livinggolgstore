
'use server';

/**
 * @fileOverview An AI agent that analyzes the sentiment of product reviews.
 *
 * - analyzeReviewSentiment - A function that analyzes review text.
 * - AnalyzeReviewSentimentInput - The input type for the function.
 * - AnalyzeReviewSentimentOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { SentimentAnalyzer, PorterStemmer, WordTokenizer } from 'natural';

const AnalyzeReviewSentimentInputSchema = z.object({
  text: z.string().describe('The product review text to analyze.'),
});
export type AnalyzeReviewSentimentInput = z.infer<
  typeof AnalyzeReviewSentimentInputSchema
>;

const AnalyzeReviewSentimentOutputSchema = z.object({
  sentiment: z
    .enum(['positive', 'negative', 'neutral'])
    .describe('The overall sentiment of the text.'),
  score: z.number().describe('A numerical score representing the sentiment.'),
});
export type AnalyzeReviewSentimentOutput = z.infer<
  typeof AnalyzeReviewSentimentOutputSchema
>;

export async function analyzeReviewSentiment(
  input: AnalyzeReviewSentimentInput
): Promise<AnalyzeReviewSentimentOutput> {
  return analyzeReviewSentimentFlow(input);
}

const analyzeReviewSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeReviewSentimentFlow',
    inputSchema: AnalyzeReviewSentimentInputSchema,
    outputSchema: AnalyzeReviewSentimentOutputSchema,
  },
  async ({ text }) => {
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const tokenizer = new WordTokenizer();
    const tokens = tokenizer.tokenize(text);
    const score = analyzer.getSentiment(tokens);

    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (score > 0) {
      sentiment = 'positive';
    } else if (score < 0) {
      sentiment = 'negative';
    }

    return {
      sentiment,
      score,
    };
  }
);
