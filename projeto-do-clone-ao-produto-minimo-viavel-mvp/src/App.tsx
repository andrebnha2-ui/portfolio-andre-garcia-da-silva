import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { UploadBox } from './components/ui/UploadBox';
import { UrlInput } from './components/ui/UrlInput';
import { MetadataTable } from './components/ui/MetadataTable';
import { HistoryList, HistoryRecord } from './components/ui/HistoryList';
import { extractMetadata, extractMetadataFromUrl, MetadataResult } from './lib/exif-engine';
import { AlertCircle, X, LogIn, History } from 'lucide-react';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { useLanguage } from './components/LanguageContext';
import { auth, googleProvider, signInWithPopup, signOut, db, collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from './lib/firebase';

function AppContent() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [metadata, setMetadata] = useState<MetadataResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Listen to history changes
  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    const q = query(
      collection(db, 'history'),
      where('uid', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as HistoryRecord[];
      setHistory(records);
    }, (err) => {
      console.error("Erro ao carregar histórico:", err);
    });

    return () => unsubscribe();
  }, [user]);

  const logAction = async (type: 'file' | 'url', source: string, result: MetadataResult) => {
    if (!user) return;

    try {
      const count = Object.values(result).reduce((acc: number, section) => acc + Object.keys(section).length, 0);
      await addDoc(collection(db, 'history'), {
        uid: user.uid,
        type,
        source,
        timestamp: serverTimestamp(),
        metadataCount: count,
        metadata: result
      });
    } catch (err) {
      console.error("Erro ao salvar histórico:", err);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Falha na autenticação com Google.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      reset();
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    setMetadata(null);
    
    try {
      const result = await extractMetadata(file);
      setMetadata(result);
      logAction('file', file.name, result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUrlSubmit = async (url: string) => {
    setIsProcessing(true);
    setError(null);
    setMetadata(null);
    
    try {
      const result = await extractMetadataFromUrl(url);
      setMetadata(result);
      logAction('url', url, result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setMetadata(null);
    setError(null);
    setShowHistory(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-8 mt-4 pb-20 max-w-4xl mx-auto">
        {/* User Status Bar */}
        <div className="w-full flex justify-between items-center bg-brand-surface/30 p-4 rounded-xl border border-brand-border backdrop-blur-sm">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {user.photoURL && (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-10 h-10 rounded-full border-2 border-brand-accent/30 p-0.5" referrerPolicy="no-referrer" />
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-brand-bg rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-brand-text font-berkeley text-sm font-bold">{user.displayName}</span>
                  <button 
                    onClick={() => setShowHistory(!showHistory)}
                    className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider transition-all ${
                      showHistory ? 'text-brand-accent' : 'text-brand-muted hover:text-brand-accent'
                    }`}
                  >
                    <History size={12} /> {showHistory ? t.closeHistory : t.viewHistory}
                  </button>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-brand-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all border border-transparent hover:border-red-400/20"
              >
                {t.signOut}
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 text-brand-muted font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-brand-muted/30"></span>
                {t.guestMode}
              </div>
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest hover:bg-brand-accent hover:text-brand-bg transition-all active:scale-95"
              >
                <LogIn size={14} /> {t.authenticate}
              </button>
            </>
          )}
        </div>

        {showHistory && user && !metadata && !isProcessing && (
          <div className="w-full animate-in fade-in slide-in-from-top-4 duration-500">
            <HistoryList records={history} onSelect={(record) => {
              setMetadata(record.metadata);
              setShowHistory(false);
            }} />
          </div>
        )}

        {!metadata && !error && !showHistory && (
          <div className="w-full grid md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-6 bg-brand-surface/20 p-8 rounded-2xl border border-brand-border flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent">
                  <History size={20} />
                </div>
                <h2 className="text-brand-text font-berkeley text-lg uppercase tracking-widest">
                  {t.fileAnalysis}
                </h2>
              </div>
              <p className="text-brand-muted font-mono text-xs leading-relaxed flex-grow">
                {t.fileDesc}
              </p>
              <UploadBox onUpload={handleFileSelect} />
            </div>
            
            <div className="space-y-6 bg-brand-surface/20 p-8 rounded-2xl border border-brand-border flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent">
                  <LogIn size={20} />
                </div>
                <h2 className="text-brand-text font-berkeley text-lg uppercase tracking-widest">
                  {t.urlAnalysis}
                </h2>
              </div>
              <p className="text-brand-muted font-mono text-xs leading-relaxed flex-grow">
                {t.urlDesc}
              </p>
              <UrlInput onUrlSubmit={handleUrlSubmit} />
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="mt-12 flex flex-col items-center space-y-6 py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-brand-accent/10 border-t-brand-accent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-brand-accent/5 border-b-brand-accent rounded-full animate-spin-reverse"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-brand-accent font-berkeley uppercase tracking-[0.3em] animate-pulse">
                {t.processing}
              </div>
              <div className="text-brand-muted font-mono text-[10px] uppercase tracking-widest">
                {t.extracting}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="w-full bg-red-500/5 border border-red-500/20 p-10 rounded-2xl flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
              <AlertCircle size={32} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-red-500 font-berkeley uppercase tracking-widest">{t.errorTitle}</h3>
              <p className="text-red-200/60 font-mono text-sm max-w-md">{error}</p>
            </div>
            <button 
              onClick={reset}
              className="bg-red-500 text-white px-8 py-3 rounded-lg font-berkeley text-sm uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95"
            >
              {t.tryAgain}
            </button>
          </div>
        )}

        {metadata && (
          <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex justify-between items-center bg-brand-surface/30 p-4 rounded-xl border border-brand-border">
              <div className="flex items-center gap-3 text-brand-muted font-mono text-[10px] uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {t.analysisDone}
              </div>
              <button 
                onClick={reset}
                className="flex items-center gap-2 text-brand-accent hover:text-white font-mono text-[10px] uppercase tracking-widest transition-all group"
              >
                <X size={14} className="group-hover:rotate-90 transition-transform" /> {t.newAnalysis}
              </button>
            </div>
            <MetadataTable data={metadata} />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
