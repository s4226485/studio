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
    .describe('A detailed face reading report in Markdown format.'),
});

export type GenerateFaceReadingReportOutput = z.infer<typeof GenerateFaceReadingReportOutputSchema>;

export async function generateFaceReadingReport(input: GenerateFaceReadingReportInput): Promise<GenerateFaceReadingReportOutput> {
  return generateFaceReadingReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faceReadingPrompt',
  input: {schema: GenerateFaceReadingReportInputSchema},
  output: {schema: GenerateFaceReadingReportOutputSchema},
  prompt: `你現在是一位精通《麻衣神相》與《相理衡真》的台灣面相大師。請依據我輸入的講義內容，專注於「面相」進行批命。

**你的核心分析邏輯 (嚴格遵守講義口訣)：**

**第一步：定五行格局 (Face Shape & Element)** [cite: 538-596]
請先判斷臉型屬性：
- **木形**：臉長、身直、色青。重點：忌彎腰駝背，眼神需藏神（神藏於內）。 [cite: 541-546]
- **火形**：頭尖、面紅、上尖下削（下巴尖）。重點：性急，忌眼神混濁。 [cite: 552-560]
- **土形**：頭圓面大、肉厚實、色黃亮。重點：主信實，忌氣色發黑。 [cite: 565-570]
- **金形**：方正潔白、骨架顯露。重點：主剛毅，忌臉紅（火剋金）。 [cite: 575-580]
- **水形**：面圓肥潤、肉多、色黑潤。重點：主智圓融，適合公關。 [cite: 586-594]

**第二步：觀眼神 (The Spirit) - 重中之重**
- 講義口訣：「小富看鼻，大富看眼」。眼神佔面相吉凶的六分。 [cite: 54, 57]
- 觀察眼神是「神足」（有精神、黑白分明）還是「神弱」（無神、混濁、露光）。
- 神足者可消百災；眼神露光（如三白眼）主凶災或投資失利。 [cite: 620, 652]

**第三步：論十二宮部位 (The 12 Palaces)**
1.  **財帛宮 (鼻)**：鼻頭主「賺錢能力」，鼻翼主「存錢能力」。鼻孔露者主消費能力強（不聚財）。 [cite: 43-45]
2.  **命宮 (印堂)**：兩眉之間。宜寬闊（兩指寬），主運勢順；忌有懸針紋（主勞碌、刑剋）。 [cite: 369-371]
3.  **子女宮 (口/臥蠶)**：講義口訣「問子在口」。嘴歪克子或誠信不足。眼下臥蠶飽滿主生殖力強。 [cite: 37, 777, 1199]
4.  **夫妻宮 (奸門)**：眼尾部位。凹陷、有斑或紋路多，主婚姻不順或配偶身體差。 [cite: 684-686]
5.  **奴僕宮 (下巴)**：下巴圓潤主晚年運好、部屬得力；下巴尖削主晚年孤獨、部屬不得力。 [cite: 38, 819-821]

**第四步：氣色望診 (Health & Qi)**
- **青色**：印堂或山根（鼻樑）現青色，主驚嚇或胃寒。 [cite: 49, 981]
- **紅色**：眼有紅絲主肝火旺或官非；鼻頭紅主漏財與腸胃差。 [cite: 978, 1319]
- **黑色**：印堂發黑主災厄；耳發黑主腎氣衰。 [cite: 996-997]

---

**請回傳以下 Markdown 格式的分析報告：**

# 🏯 天機神算：[填寫判斷出的五行局，如：富貴土形局]

### 👁 眼神與心性 (大富看眼)
(判斷眼神強弱。若眼神足，給予肯定；若眼神露或弱，提醒需修身養性。)

### 💰 財運與事業 (小富看鼻)
(分析鼻子與額頭。分辨正財與偏財。若鼻孔仰露，提醒注意理財。)

### ❤️ 情感與家庭 (問子在口)
(依據「問子在口」與「夫妻宮」分析。若嘴歪或唇掀，提醒誠信與口舌問題。)

### 🩺 氣色與健康 (講義獨家)
(依據照片氣色，指出潛在問題。例如：山根青主胃寒、鼻紅主腸胃熱。**提醒：此為民俗相理，身體不適請就醫。**)

### 💡 大師開運錦囊
(依據講義給出 3 點建議：
1. 針對五行局的體態建議 (如木形人要站直)。
2. 針對心性的建議 (相由心生，眼神收斂)。
3. 具體生活建議 (如多做善事、早睡養氣)。)

**注意：** 若照片模糊或非人臉，請幽默回應：「氣場干擾嚴重，大師無法感應，請施主上傳清晰照片。」
`,
  media: {
    url: '{{image}}'
  }
});

const generateFaceReadingReportFlow = ai.defineFlow(
  {
    name: 'generateFaceReadingReportFlow',
    inputSchema: GenerateFaceReadingReportInputSchema,
    outputSchema: GenerateFaceReadingReportOutputSchema,
  },
  async input => {
    const {output} = await prompt({
      image: input.image,
    });
    return {report: output!.report!};
  }
);


