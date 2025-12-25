"use client";

import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import Image from 'next/image';
import { UploadCloud, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface FaceUploadProps {
  onImageUpload: (imageData: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const FaceUpload = ({ onImageUpload, onAnalyze, isLoading }: FaceUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const placeholder = PlaceHolderImages.find(p => p.id === 'face-placeholder');

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
            <Image src={preview} alt="Face preview" fill style={{ objectFit: 'contain' }} className="rounded-lg" />
          ) : (
            <div className="text-center text-muted-foreground flex flex-col items-center gap-4">
               {placeholder ? (
                <Image 
                    src={placeholder.imageUrl}
                    alt={placeholder.description}
                    width={200}
                    height={200}
                    className="rounded-full opacity-30"
                    data-ai-hint={placeholder.imageHint}
                />
               ) : (
                <UploadCloud className="h-16 w-16" />
               )}
              <h3 className="font-headline text-2xl text-foreground">Upload Your Photo</h3>
              <p>Drag & drop an image here, or click to select a file.</p>
              <p className="text-xs">(Your image is private and is not stored)</p>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <Button onClick={onAnalyze} disabled={!preview || isLoading} size="lg" className="font-headline text-lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Reveal My Fortune'
            )}
          </Button>
        </div>
        {preview && !isLoading && (
           <div className="text-center mt-4">
            <Button variant="link" onClick={triggerFileSelect}>Change photo</Button>
           </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FaceUpload;
