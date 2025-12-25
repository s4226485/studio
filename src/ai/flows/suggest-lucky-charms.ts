'use server';

/**
 * @fileOverview A flow that suggests customized lucky charms based on face reading analysis.
 *
 * - suggestLuckyCharms - A function that suggests lucky charms.
 * - SuggestLuckyCharmsInput - The input type for the suggestLuckyCharms function.
 * - SuggestLuckyCharmsOutput - The return type for the suggestLuckyCharms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLuckyCharmsInputSchema = z.object({
  faceReadingAnalysis: z
    .string()
    .describe('The face reading analysis report generated from the face image.'),
});
export type SuggestLuckyCharmsInput = z.infer<typeof SuggestLuckyCharmsInputSchema>;

const SuggestLuckyCharmsOutputSchema = z.object({
  luckyCharms: z
    .array(z.string())
    .describe('An array of lucky charm suggestions based on the face reading analysis.'),
});
export type SuggestLuckyCharmsOutput = z.infer<typeof SuggestLuckyCharmsOutputSchema>;

export async function suggestLuckyCharms(input: SuggestLuckyCharmsInput): Promise<SuggestLuckyCharmsOutput> {
  return suggestLuckyCharmsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLuckyCharmsPrompt',
  input: {schema: SuggestLuckyCharmsInputSchema},
  output: {schema: SuggestLuckyCharmsOutputSchema},
  prompt: `Based on the following face reading analysis, suggest three lucky charms that can promote positive qualities and improve work-life:

Face Reading Analysis:
{{{faceReadingAnalysis}}}

Lucky Charms:`,
});

const suggestLuckyCharmsFlow = ai.defineFlow(
  {
    name: 'suggestLuckyCharmsFlow',
    inputSchema: SuggestLuckyCharmsInputSchema,
    outputSchema: SuggestLuckyCharmsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
