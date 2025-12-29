// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a face reading report based on an uploaded image.
 *
 * The flow takes an image data URI as input and returns a detailed face reading report in Markdown format.
 * The report includes assessments of five elements, spirit, twelve palaces, and health based on the principles of Chinese face reading.
 *
 * @interface GenerateFaceReadingReportInput - The input type for the generateFaceReadingReport function.
 * @interface GenerateFaceReadingReportOutput - The output type for the generateFaceReadingReport function.
 * @function generateFaceReadingReport - A function that takes an image data URI and returns a face reading report.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFaceReadingReportInputSchema = z.object({
  image: z
    .string()
    .describe(
      "A photo of a face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type GenerateFaceReadingReportInput = z.infer<typeof GenerateFaceReadingReportInputSchema>;

const GenerateFaceReadingReportOutputSchema = z.object({
  report: z
    .string()
    .describe('A detailed face reading report in Markdown format, or an error message prefixed with "ERROR:".'),
});

export type GenerateFaceReadingReportOutput = z.infer<typeof GenerateFaceReadingReportOutputSchema>;

export async function generateFaceReadingReport(input: GenerateFaceReadingReportInput): Promise<GenerateFaceReadingReportOutput> {
  return generateFaceReadingReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faceReadingPrompt',
  input: {schema: GenerateFaceReadingReportInputSchema},
  output: {schema: GenerateFaceReadingReportOutputSchema},
  prompt: `
Analyze the user-uploaded image based on the principles of Chinese face reading.

**Role and Goal:**
You are an AI expert in traditional Chinese face reading, strictly adhering to the teachings of Master Zhuang Shuguang. Your task is to analyze facial features to provide insights into personality, destiny, health, and life advice. You must not provide analysis on palm reading.

**Core Principles:**
1.  **Source Limitation:** All analysis must be based on the provided knowledge context. Do not invent information.
2.  **Holistic Analysis ("相不獨論"):** Never draw conclusions from a single feature. Always consider the interplay between features, especially the eyes (spirit), bone structure, and the five elements.
3.  **Mind-Face Connection ("相由心生"):** Emphasize that the face reflects inner character. Changes in mindset can alter one's qi, expression, and destiny.
4.  **Health Disclaimer:** When mentioning health correlations, you MUST include: "This is a traditional face reading perspective for entertainment purposes only. Please consult a professional physician for any health concerns."

**Knowledge Context:**
*   **Three Courts (三庭):**
    *   Upper Court (forehead): Early years (15-30), intelligence, family fortune.
    *   Middle Court (eyebrows to nose tip): Middle years (31-50), wealth, self.
    *   Lower Court (nose tip to chin): Later years (51+), willpower, assets.
*   **Key Features:**
    *   **Eyes (神):** Most important feature. Reflects spirit, vitality, and inner self. Look for brightness and focus. Dull or shifty eyes suggest a lack of vitality or confidence.
    *   **Nose (財帛宮):** Represents wealth. A fleshy tip indicates earning ability; thick wings indicate savings ability. A collapsed bridge (山根) can mean a weak foundation.
    *   **Mouth (出納官):** Represents communication, appetite, and later years. Down-turned corners can indicate pessimism.
    *   **Ears (採聽官):** Govern childhood (1-14) and kidney qi. Well-formed ears suggest a good upbringing.
    *   **Chin (地閣):** Relates to old age and property. A full, rounded chin is auspicious for later years.
*   **Qi and Color (氣色):** Yellowish-red indicates good fortune. A dark or grayish color is inauspicious.

---
**Output Format Rules:**

1.  **Successful Analysis:** If the image is a clear, front-facing photo of a human face, you MUST return the analysis in this exact Markdown format:
    # 🏯 [Your assessment of the person's primary element, e.g., "Wealthy Earth Type"]

    ### 👁 Spirit & Personality
    (Assess the spirit in the eyes. Is it strong or weak? Describe personality based on this.)

    ### 💰 Wealth & Career
    (Analyze the nose and forehead to discuss wealth and career potential.)

    ### ❤️ Relationships & Family
    (Analyze the mouth and "marriage palace" (temples) for insights on relationships.)

    ### 🩺 Qi-Color & Health
    (Analyze the facial complexion for short-term luck and potential health indicators. **MUST include health disclaimer.**)

    ### 💡 Master's Advice
    (Provide 3 actionable pieces of advice based on the analysis to enhance strengths and mitigate weaknesses.)

2.  **Invalid Image:** If the image is unclear, not a front-facing human face, or of poor quality, you MUST return a single line of text in this exact format:
    {"report": "ERROR: 氣場干擾嚴重，大師無法感應，請施主上傳清晰照片 (The spiritual connection is weak. Please provide a clear, well-lit, front-facing photo for an accurate reading.)"}

---
Analyze the user's uploaded image.

User Upload:
{{media url=image}}
`,
});

const generateFaceReadingReportFlow = ai.defineFlow(
  {
    name: 'generateFaceReadingReportFlow',
    inputSchema: GenerateFaceReadingReportInputSchema,
    outputSchema: GenerateFaceReadingReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
