import React from 'react';
import { MetadataResult } from '../../lib/exif-engine';
import { Search, Info } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface MetadataTableProps {
  data: MetadataResult;
}

export const MetadataTable: React.FC<MetadataTableProps> = ({ data }) => {
  const { t } = useLanguage();
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return (
      <div className="w-full bg-brand-surface/20 p-12 rounded-lg text-center border border-brand-border">
        <div className="flex justify-center mb-4">
          <Info className="text-brand-muted" size={48} />
        </div>
        <p className="text-brand-muted font-mono uppercase tracking-widest text-sm">{t.noMetadata}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-accent/10 rounded-md text-brand-accent">
            <Search size={20} />
          </div>
          <h2 className="text-brand-text font-berkeley text-xl uppercase tracking-widest">
            {t.metadataReport}
          </h2>
        </div>
        <div className="px-3 py-1 bg-brand-surface border border-brand-border rounded-full text-brand-muted font-mono text-[10px] uppercase tracking-widest">
          {entries.length} {t.entries}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-brand-border bg-brand-surface/10 backdrop-blur-sm">
        <table className="w-full text-left font-mono text-sm border-collapse">
          <thead>
            <tr className="bg-brand-surface/50 border-b border-brand-border">
              <th className="px-6 py-4 font-berkeley text-[10px] uppercase tracking-[0.2em] text-brand-muted">{t.property}</th>
              <th className="px-6 py-4 font-berkeley text-[10px] uppercase tracking-[0.2em] text-brand-muted">{t.value}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {entries.map(([key, value]) => (
              <tr key={key} className="hover:bg-brand-accent/5 transition-colors group">
                <td className="px-6 py-4 text-brand-accent font-semibold align-top whitespace-nowrap border-r border-brand-border/50">
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">{key}</span>
                </td>
                <td className="px-6 py-4 text-brand-text/90 break-all font-mono leading-relaxed">
                  {typeof value === 'object' ? (
                    <pre className="text-[10px] bg-black/20 p-2 rounded overflow-x-auto">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : (
                    String(value)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
