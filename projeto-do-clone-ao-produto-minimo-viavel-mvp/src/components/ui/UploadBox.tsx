import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface UploadBoxProps {
  onUpload: (file: File) => void;
}

export const UploadBox: React.FC<UploadBoxProps> = ({ onUpload }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative group cursor-pointer border-2 border-dashed rounded-lg p-12 transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
          isDragging 
            ? 'border-brand-accent bg-brand-accent/5' 
            : 'border-brand-border hover:border-brand-accent/50 bg-brand-surface/20'
        }`}
        onClick={handleSelectClick}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
        <div className={`p-4 rounded-full transition-colors duration-300 ${
          selectedFile ? 'bg-brand-accent text-brand-bg' : 'bg-brand-surface text-brand-muted group-hover:text-brand-accent'
        }`}>
          <Upload size={32} />
        </div>
        <div className="text-center">
          <p className="text-brand-text font-berkeley text-sm uppercase tracking-widest mb-1">
            {selectedFile ? selectedFile.name : t.dragDrop}
          </p>
          <p className="text-brand-muted font-mono text-[10px] uppercase tracking-wider">
            JPG, PNG, WEBP, TIFF (MAX 10MB)
          </p>
        </div>
      </div>

      {selectedFile && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleUploadClick();
          }}
          className="w-full bg-brand-accent text-brand-bg py-4 rounded-lg font-berkeley text-sm uppercase tracking-[0.2em] font-bold hover:bg-white transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-brand-accent/20"
        >
          {t.analyzeFile}
        </button>
      )}
    </div>
  );
};
