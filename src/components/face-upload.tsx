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
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1024;
          const MAX_HEIGHT = 1024;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Get the data URL with JPEG format and quality 0.95
          const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
          
          setPreview(dataUrl);
          onImageUpload(dataUrl);
        };
        img.src = e.target?.result as string;
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
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="h-24 w-24 text-primary">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                <path d="M12 4a8 8 0 0 1 0 16V4z" fill="white"/>
                <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                <circle cx="12" cy="17" r="1.5" fill="white" />
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
