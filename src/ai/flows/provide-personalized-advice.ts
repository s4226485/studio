'use server';

/**
 * @fileOverview Provides personalized advice based on a face reading analysis.
 *
 * - providePersonalizedAdvice - A function that generates personalized advice based on face reading analysis.
 * - PersonalizedAdviceInput - The input type for the providePersonalizedAdvice function.
 * - PersonalizedAdviceOutput - The return type for the providePersonalizedAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAdviceInputSchema = z.object({
  faceReadingReport: z
    .string()
    .describe('The face reading analysis report to generate advice from.'),
});

export type PersonalizedAdviceInput = z.infer<typeof PersonalizedAdviceInputSchema>;

const PersonalizedAdviceOutputSchema = z.object({
  advice: z
    .string()
    .describe(
      'Personalized advice covering career, wealth, relationships, and health improvements based on the face reading report.'
    ),
});

export type PersonalizedAdviceOutput = z.infer<typeof PersonalizedAdviceOutputSchema>;

export async function providePersonalizedAdvice(
  input: PersonalizedAdviceInput
): Promise<PersonalizedAdviceOutput> {
  return providePersonalizedAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAdvicePrompt',
  input: {schema: PersonalizedAdviceInputSchema},
  output: {schema: PersonalizedAdviceOutputSchema},
  prompt: `You are an expert in Chinese face reading and provide personalized advice based on the analysis report.

  Based on the following face reading report, provide actionable and personalized advice covering aspects like career, wealth, relationships, and health improvements. The advice should be practical and easy to follow.

  Face Reading Report:
  {{faceReadingReport}}

  Focus on providing specific recommendations tailored to the individual's unique facial features and characteristics as described in the report.
`,
});

const providePersonalizedAdviceFlow = ai.defineFlow(
  {
    name: 'providePersonalizedAdviceFlow',
    inputSchema: PersonalizedAdviceInputSchema,
    outputSchema: PersonalizedAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
