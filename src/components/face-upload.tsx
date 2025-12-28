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
                className="h-40 w-40 text-foreground opacity-20"
                fill="currentColor"
               >
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 4a8 8 0 0 1 0 16A8 8 0 0 1 4 12 8 8 0 0 1 12 4z" />
                <path d="M12 4a5 5 0 0 0 0 10 5 5 0 0 0 0-10zm0 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
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
