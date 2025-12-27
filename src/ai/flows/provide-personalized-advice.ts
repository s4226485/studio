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
  prompt: `您是一位精通中華面相學的專家，並根據分析報告提供個人化建議。

  請根據以下的面相分析報告，提供涵蓋事業、財運、人際關係及健康改善等方面的實用個人化建議。建議應具體且易於遵循。請務必使用繁體中文進行回覆。

  面相分析報告：
  {{faceReadingReport}}

  請專注於根據報告中所描述的個人獨特臉部特徵提供量身打造的具體建議。
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
