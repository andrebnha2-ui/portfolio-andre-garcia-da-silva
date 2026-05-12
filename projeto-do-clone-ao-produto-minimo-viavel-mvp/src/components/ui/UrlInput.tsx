import React, { useState } from 'react';
import { Link as LinkIcon, Upload } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onUrlSubmit }) => {
  const { t } = useLanguage();
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-muted group-focus-within:text-brand-accent transition-colors">
          <LinkIcon size={18} />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t.placeholderUrl}
          className="w-full bg-brand-surface/20 border border-brand-border rounded-lg py-4 pl-12 pr-4 text-brand-text font-mono text-sm placeholder:text-brand-muted focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
        />
      </div>

      <button 
        type="submit"
        disabled={!url.trim()}
        className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg font-berkeley text-sm uppercase tracking-[0.2em] font-bold transition-all transform active:scale-[0.99] ${
          url.trim() 
            ? 'bg-brand-accent text-brand-bg hover:bg-white shadow-lg shadow-brand-accent/20' 
            : 'bg-brand-surface/50 text-brand-muted cursor-not-allowed border border-brand-border'
        }`}
      >
        <Upload size={18} />
        {t.analyzeUrl}
      </button>
    </form>
  );
};
