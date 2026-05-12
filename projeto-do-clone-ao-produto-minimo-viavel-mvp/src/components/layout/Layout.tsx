import React from 'react';
import { LanguageProvider, useLanguage } from '../LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex items-center bg-brand-surface border border-brand-border rounded-lg p-1 gap-1">
      {(['pt', 'en', 'zh'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-tighter transition-all ${
            language === lang 
              ? 'bg-brand-accent text-brand-bg font-bold' 
              : 'text-brand-muted hover:text-brand-text hover:bg-brand-accent/10'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export const LayoutContent: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg selection:bg-brand-accent/30">
      <header className="border-b border-brand-border bg-brand-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-accent rounded-sm flex items-center justify-center text-brand-bg font-bold font-berkeley">
              EX
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-brand-text font-berkeley uppercase">
              Exif<span className="text-brand-accent">Info</span>.org
            </h1>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden lg:flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-muted">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> 
                {t.systemOnline}
              </span>
              <span>v2.4.0-stable</span>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 max-w-5xl py-12">
        {children}
      </main>

      <footer className="border-t border-brand-border py-12 px-4 bg-brand-surface/30">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-brand-muted font-mono text-xs uppercase tracking-wider">
            © {new Date().getFullYear()} Exif Info.org • OSINT Metadata Tool
          </div>
          <div className="flex gap-8 text-brand-muted font-mono text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-brand-accent transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-brand-accent transition-colors">{t.terms}</a>
            <a href="#" className="hover:text-brand-accent transition-colors">{t.api}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
};
