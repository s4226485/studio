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
  prompt: `根據以下的面相分析，建議三種能夠提升正面特質並改善工作與生活的開運物。請務必使用繁體中文進行回覆。

面相分析：
{{{faceReadingAnalysis}}}

開運物：`,
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
