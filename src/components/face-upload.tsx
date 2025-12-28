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
                  viewBox="0 0 512 512"
                  className="h-40 w-40 text-foreground opacity-20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256V0z" />
                  <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0v256c0 70.7-57.3 128-128 128s-128-57.3-128-128c0-49.1 27.7-91.4 67.5-113.2c-.4-.6-.7-1.1-1.1-1.7C48.2 184.2 1.3 277.3 5.4 380.2c4.4 109.8 95.3 195.9 205.1 195.9C234.3 508.3 256 480.4 256 448V512zM128 384c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64z" fill="white" />
                  <path d="M256 256c0-70.7 57.3-128 128-128S512 185.3 512 256s-57.3 128-128 128S256 326.7 256 256zm128-64c-35.3 0-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64s-28.7-64-64-64z" />
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
