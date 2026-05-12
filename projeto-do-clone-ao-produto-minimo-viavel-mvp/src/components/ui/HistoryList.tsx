import React from 'react';
import { Clock, FileText, Globe, ChevronRight } from 'lucide-react';
import { Timestamp } from '../../lib/firebase';
import { MetadataResult } from '../../lib/exif-engine';
import { useLanguage } from '../LanguageContext';

export interface HistoryRecord {
  id: string;
  type: 'file' | 'url';
  source: string;
  timestamp: Timestamp;
  metadataCount?: number;
  metadata: MetadataResult;
}

interface HistoryListProps {
  records: HistoryRecord[];
  onSelect: (record: HistoryRecord) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ records, onSelect }) => {
  const { t } = useLanguage();
  
  if (records.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-brand-border rounded-xl bg-brand-surface/10">
        <div className="flex justify-center mb-4">
          <Clock className="text-brand-muted" size={48} />
        </div>
        <p className="text-brand-muted font-mono text-sm uppercase tracking-[0.2em]">{t.noHistory}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center gap-3 border-l-2 border-brand-accent pl-4">
        <h3 className="text-brand-text font-berkeley text-sm tracking-[0.3em] uppercase flex items-center gap-2">
          <Clock size={16} className="text-brand-accent" /> {t.opHistory}
        </h3>
      </div>
      <div className="grid gap-3">
        {records.map((record) => (
          <button
            key={record.id}
            onClick={() => onSelect(record)}
            className="flex items-center justify-between p-5 bg-brand-surface/20 border border-brand-border rounded-lg hover:border-brand-accent/50 hover:bg-brand-surface/40 transition-all text-left group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <div className="flex items-center gap-5">
              <div className="p-3 bg-brand-bg border border-brand-border rounded-md text-brand-accent group-hover:scale-110 transition-transform duration-300">
                {record.type === 'file' ? <FileText size={20} /> : <Globe size={20} />}
              </div>
              <div>
                <div className="text-brand-text font-mono text-sm truncate max-w-[180px] md:max-w-md group-hover:text-brand-accent transition-colors">
                  {record.source}
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-brand-muted font-mono text-[10px] uppercase tracking-wider">
                    {record.timestamp?.toDate().toLocaleString() || t.processing} 
                  </span>
                  {record.metadataCount !== undefined && (
                    <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent rounded-full text-[9px] font-bold uppercase tracking-tighter">
                      {record.metadataCount} {t.tags}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-brand-muted group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};
