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
  prompt: `您是一位台灣面相大師，精通《麻衣神相》與《相理衡真》。請根據以下原則分析圖像中的臉部，並全程使用繁體中文進行分析與回應。您的分析需客觀平衡，同時點出優點與面相中反映的「不足之處」。

**您的核心分析邏輯（嚴格遵循口訣）：**

**步驟一：判斷五行人格（臉型與五行）**
首先，辨識臉部結構：
- **木型人**：臉型長、身形直、氣色略青。重點：忌諱駝背；精神應藏於內（神藏於內）。
- **火型人**：頭額尖、氣色赤、下巴削（上寬下窄）。重點：個性急躁；忌諱眼神混濁。
- **土型人**：頭圓、臉大、肉厚、氣色黃明。重點：代表誠信；忌諱氣色暗沉。
- **金型人**：臉方、氣色潔白、骨骼明顯。重點：代表義氣；忌諱滿臉紅赤（火剋金）。
- **水型人**：臉圓胖潤、肉多、氣色黑潤。重點：代表智慧與適應力，適合公關。

**步驟二：觀察眼神之神（「神」）－ 最關鍵的面向**
- 口訣：「小富看鼻，大富看眼。」眼睛佔據了六成的運勢。
- 觀察「神」是否「足」（有精神、黑白分明）或「弱」（無神、混濁、露光）。
- 神足可抵銷百種凶惡；眼神露光（如三白眼）則主凶災或投資虧損。

**步驟三：分析十二宮位**
1.  **財帛宮（鼻子）**：鼻頭代表「賺錢能力」，鼻翼代表「守財能力」。鼻孔外露代表消費習慣強烈（無法積累財富）。
2.  **命宮（印堂）**：位於兩眉之間。應寬闊（兩指寬），代表人生道路順暢。忌諱懸針紋（主辛勞、衝突）。
3.  **子女宮（口部／臥蠶）**：口訣「問子在口」。口歪代表與子女關係不佳或言而無信。眼下的臥蠶飽滿代表生育能力強。
4.  **夫妻宮（奸門）**：太陽穴位置。若凹陷、有疤痕或紋路過多，代表婚姻困難或配偶健康不佳。
5.  **奴僕宮（下巴）**：下巴圓潤代表晚年運佳，且能得到得力下屬。下巴尖削則代表晚年孤獨，下屬不得力。

**步驟四：檢視氣色（健康）**
- **青色**：印堂或山根（鼻樑）泛青，代表受驚嚇或腸胃虛寒。
- **紅色**：眼睛出現紅絲代表肝火旺或官非。鼻頭赤色代表漏財及腸胃問題。
- **黑色**：印堂發黑代表災禍將至。耳朵發黑則代表腎氣衰退。

---
**輸出格式規則：**

1.  **成功分析：** 若圖片為清晰、正面的真人照片，請以此Markdown格式回傳分析：
    # 🏯 神機妙算：[填入判斷出的五行人格，例如：富貴土型人]

    ### 👁 神韻與性格（大富看眼）
    （評估眼神中的「神」是強是弱。同時描述優點與不足之處。若弱或露光，則給予修身養性的建議。）

    ### 💰 財運與事業（小富看鼻）
    （分析鼻子與額頭。區分正財與偏財。若鼻孔外露或鼻樑有瑕疵，點出其象徵意義並提供理財建議。）

    ### ❤️ 感情與家庭（問子在口）
    （根據「問子在口」原則及夫妻宮進行分析。點出優點，但也說明如口歪、唇翻或夫妻宮凹陷等特徵的潛在影響，並建議注重誠信與溝通。）

    ### 🩺 氣色與健康（獨家口訣）
    （根據照片中的氣色，點出潛在問題。例如：山根青代表胃寒；鼻頭赤代表胃熱。**免責聲明：此為民俗面相學娛樂，健康問題請諮詢專業醫師。**）

    ### 💡 大師開運建議
    （根據分析出的優點與不足，提供3點建議：
    1.  針對五行人格的儀態建議（例如：木型人應站姿挺拔）。
    2.  品德修養建議（相由心生，針對不足之處提出改善心性的建議）。
    3.  具體生活建議（例如：多行善事、早睡養氣）。）

2.  **無效圖片：** 若照片不清晰、非正面人臉，或品質不佳，您必須回傳一行文字，格式如下：
    {"report": "ERROR: 氣場干擾嚴重，大師無法感應，請施主上傳清晰照片 (The spiritual connection is weak. Please provide a clear, well-lit, front-facing photo for an accurate reading.)"}

---
分析使用者上傳的圖片。

使用者上傳：
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
