"use client";

import { useState } from 'react';
import { generateFaceReadingReport, type GenerateFaceReadingReportOutput } from '@/ai/flows/generate-face-reading-report';
import { providePersonalizedAdvice, type PersonalizedAdviceOutput } from '@/ai/flows/provide-personalized-advice';
import { suggestLuckyCharms, type SuggestLuckyCharmsOutput } from '@/ai/flows/suggest-lucky-charms';
import { useToast } from "@/hooks/use-toast";

import Header from '@/components/header';
import Footer from '@/components/footer';
import FaceUpload from '@/components/face-upload';
import ReportDisplay from '@/components/report-display';

export default function Home() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [charms, setCharms] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    if (!imageData) {
      toast({
        title: "No Image",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setReport(null);
    setAdvice(null);
    setCharms(null);

    try {
      // 1. Generate Face Reading Report
      const reportOutput: GenerateFaceReadingReportOutput = await generateFaceReadingReport({ image: imageData });
      if (!reportOutput.report) {
        throw new Error("Failed to generate face reading report.");
      }
      
      if (reportOutput.report.startsWith('ERROR:')) {
        setReport(reportOutput.report);
        setIsLoading(false);
        return;
      }
      setReport(reportOutput.report);

      // 2. Provide Personalized Advice
      const adviceOutput: PersonalizedAdviceOutput = await providePersonalizedAdvice({ faceReadingReport: reportOutput.report });
      setAdvice(adviceOutput.advice);

      // 3. Suggest Lucky Charms
      const charmsOutput: SuggestLuckyCharmsOutput = await suggestLuckyCharms({ faceReadingAnalysis: reportOutput.report });
      setCharms(charmsOutput.luckyCharms);

    } catch (error) {
      console.error("Analysis failed:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Analysis Failed",
        description: `Could not analyze the image. ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FaceUpload
            onImageUpload={setImageData}
            onAnalyze={handleAnalysis}
            isLoading={isLoading}
          />
          <ReportDisplay
            report={report}
            advice={advice}
            charms={charms}
            isLoading={isLoading}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
