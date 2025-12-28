"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FaceUploadProps {
  onImageUpload: (imageData: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const FaceUpload = ({ onImageUpload, onAnalyze, isLoading }: FaceUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files?.[0] ?? null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files?.[0] ?? null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <Card className="mb-8 shadow-lg overflow-hidden border-2 border-dashed border-muted-foreground/30 hover:border-primary transition-colors duration-300">
      <CardContent className="p-4">
        <div
          className={`relative flex flex-col items-center justify-center p-8 rounded-lg cursor-pointer h-96 ${isDragging ? 'bg-accent/20' : ''}`}
          onClick={triggerFileSelect}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileSelected}
          />
          {preview ? (
            <Image src={preview} alt="面部預覽" fill style={{ objectFit: 'contain' }} className="rounded-lg" />
          ) : (
            <div className="text-center text-muted-foreground flex flex-col items-center gap-4">
               <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="h-40 w-40 text-foreground opacity-20"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.86 8.17 6.84 9.5.6.11.82-.26.82-.58v-2.09c-2.78.6-3.37-1.34-3.37-1.34-.55-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23.95-.26 1.98-.4 3-.4s2.05.13 3 .4c2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.58A10 10 0 0 0 12 2z" />
                <path d="M12 2a10 10 0 0 0 0 20V2z" fill="currentColor" />
                 <circle cx="12" cy="7" r="1.5" fill="var(--background)" />
                 <circle cx="12" cy="17" r="1.5" fill="currentColor"/>
              </svg>
              <h3 className="font-headline text-2xl text-foreground">上傳您的照片</h3>
              <p>將圖片拖放到此處，或點擊以選擇檔案。</p>
              <p className="text-xs">(您的圖片是私密的，不會被儲存)</p>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <Button onClick={onAnalyze} disabled={!preview || isLoading} size="lg" className="font-headline text-lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                分析中...
              </>
            ) : (
              '開始分析'
            )}
          </Button>
        </div>
        {preview && !isLoading && (
           <div className="text-center mt-4">
            <Button variant="link" onClick={triggerFileSelect}>更換照片</Button>
           </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FaceUpload;
