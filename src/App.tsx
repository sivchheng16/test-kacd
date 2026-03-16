import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { 
  X, 
  ArrowRight,
  ChevronRight,
  Heart,
  Star,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Download,
  Maximize2,
  Gamepad2,
  Loader2,
} from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Game } from './constants';
import { db } from './firebase';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Library from './pages/Library';
import Author from './pages/Author';
import Pages from './pages/Pages';
import ScrollToTop from './components/ScrollToTop';

function AnimatedRoutes({ 
  favorites, 
  recentlyPlayed,
  toggleFavorite, 
  setViewingGame, 
  handleDownload
}: any) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/library" element={
            <Library 
              favorites={favorites} 
              recentlyPlayed={recentlyPlayed}
              toggleFavorite={toggleFavorite} 
              setViewingGame={setViewingGame} 
              handleDownload={handleDownload} 
            />
          } />
          <Route path="/author" element={<Author />} />
          <Route path="/pages" element={<Pages />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [viewingGame, setViewingGame] = useState<Game | null>(null);
  const [gameToDownload, setGameToDownload] = useState<Game | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'initiating' | 'completed'>('idle');
  const [isModalLoading, setIsModalLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('gamevault_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recentlyPlayed, setRecentlyPlayed] = useState<string[]>(() => {
    const saved = localStorage.getItem('gamevault_recently_played');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (selectedGame) {
      setIsModalLoading(true);
    }
  }, [selectedGame]);

  useEffect(() => {
    localStorage.setItem('gamevault_favorites', JSON.stringify(favorites));
    if (user && db && !isSyncing) {
      setDoc(doc(db, 'users', user.uid), { favorites }, { merge: true });
    }
  }, [favorites, user, isSyncing]);

  useEffect(() => {
    localStorage.setItem('gamevault_recently_played', JSON.stringify(recentlyPlayed));
    if (user && db && !isSyncing) {
      setDoc(doc(db, 'users', user.uid), { recentlyPlayed }, { merge: true });
    }
  }, [recentlyPlayed, user, isSyncing]);

  // Sync from Firestore when user logs in
  useEffect(() => {
    const syncData = async () => {
      if (user && db) {
        setIsSyncing(true);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.favorites) setFavorites(data.favorites);
            if (data.recentlyPlayed) setRecentlyPlayed(data.recentlyPlayed);
          }
        } catch (error) {
          console.error("Error syncing data from Firestore:", error);
        } finally {
          setIsSyncing(false);
        }
      }
    };
    syncData();
  }, [user]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const addToRecentlyPlayed = (id: string) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(gameId => gameId !== id);
      return [id, ...filtered].slice(0, 5);
    });
  };

  const handleDownload = (game: Game) => {
    setGameToDownload(game);
    setDownloadStatus('idle');
  };

  const confirmDownload = async () => {
    if (gameToDownload) {
      setDownloadStatus('initiating');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const link = document.createElement('a');
      link.href = gameToDownload.appImageUrl;
      link.download = gameToDownload.appImageUrl.split('/').pop() || 'game.AppImage';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadStatus('completed');
      setTimeout(() => {
        setGameToDownload(null);
        setDownloadStatus('idle');
      }, 2000);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement && modalRef.current) {
      modalRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
          <p className="text-sm font-bold tracking-widest text-emerald-500/50 uppercase animate-pulse">Initializing Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
        <Navbar />

        <AnimatedRoutes 
          favorites={favorites}
          recentlyPlayed={recentlyPlayed}
          toggleFavorite={toggleFavorite}
          setViewingGame={setViewingGame}
          handleDownload={handleDownload}
        />

        {/* Footer */}
        <footer className="border-t border-white/5 py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="text-black w-5 h-5" />
                </div>
                <span className="text-lg font-bold tracking-tight uppercase">Portfolio</span>
              </div>
              <p className="text-white/30 max-w-sm leading-relaxed">
                A digital space dedicated to exploring the intersection of design, technology, and human experience. Built with precision and passion.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-white/60">Navigation</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/30">
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                <li><Link to="/library" className="hover:text-emerald-400 transition-colors">Library</Link></li>
                <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a></li>
                <li><a href="#learn" className="hover:text-emerald-400 transition-colors">Learn</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-white/60">Connect</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/30">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <span>© 2026 DESIGNED & DEVELOPED BY THE AUTHOR.</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <AnimatePresence>
          {/* Game Details Modal */}
          {viewingGame && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
              onClick={() => setViewingGame(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 40 }}
                className="w-full max-w-4xl bg-[#0a0a0a] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setViewingGame(null)}
                  className="absolute top-8 right-8 w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all z-10 border border-white/10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-white/5">
                    <img src={viewingGame.thumbnail} alt={viewingGame.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">{viewingGame.category}</span>
                      <h2 className="text-4xl font-bold tracking-tight">{viewingGame.title}</h2>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-1 text-emerald-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Verified Content</span>
                      </div>
                      <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">About this game</h3>
                      <p className="text-white/60 leading-relaxed text-lg mb-8">{viewingGame.description}</p>
                      <div className="space-y-4 mb-12">
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                          <span className="text-white/30 text-sm">Platform</span>
                          <span className="text-white/80 text-sm font-medium">Web / Linux (AppImage)</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                          <span className="text-white/30 text-sm">Developer</span>
                          <span className="text-white/80 text-sm font-medium">Community Verified</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={() => { 
                          if (viewingGame) {
                            setSelectedGame(viewingGame); 
                            addToRecentlyPlayed(viewingGame.id);
                            setViewingGame(null); 
                          }
                        }}
                        className="w-full py-5 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 text-lg active:scale-[0.98]"
                      >
                        Play Now <ChevronRight className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => handleDownload(viewingGame)}
                        className="w-full py-5 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-lg border border-white/10 active:scale-[0.98]"
                      >
                        <Download className="w-5 h-5" /> Download AppImage
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Download Confirmation Modal */}
          {gameToDownload && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
              <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="w-full max-w-md bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 p-10 shadow-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8 mx-auto relative">
                  {downloadStatus === 'idle' && <AlertTriangle className="w-10 h-10 text-emerald-400" />}
                  {downloadStatus === 'initiating' && <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />}
                  {downloadStatus === 'completed' && <CheckCircle2 className="w-10 h-10 text-emerald-400" />}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {downloadStatus === 'idle' && 'Confirm Download'}
                  {downloadStatus === 'initiating' && 'Download Initiated'}
                  {downloadStatus === 'completed' && 'Download Complete'}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-10">
                  {downloadStatus === 'idle' && <>You are about to download <span className="text-white font-bold">"{gameToDownload.title}"</span> as an AppImage. This is a verified secure download from our repository.</>}
                  {downloadStatus === 'initiating' && <>Preparing your secure download for <span className="text-white font-bold">"{gameToDownload.title}"</span>. Please wait a moment...</>}
                  {downloadStatus === 'completed' && <>Success! Your download of <span className="text-white font-bold">"{gameToDownload.title}"</span> has started. Check your browser's download folder.</>}
                </p>
                <div className="flex flex-col gap-3">
                  {downloadStatus === 'idle' ? (
                    <>
                      <button onClick={confirmDownload} className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">Proceed to Download</button>
                      <button onClick={() => setGameToDownload(null)} className="w-full py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all active:scale-95">Cancel</button>
                    </>
                  ) : (
                    <div className="w-full py-4 bg-emerald-500/10 text-emerald-400 font-bold rounded-2xl border border-emerald-500/20 flex items-center justify-center gap-2">
                      {downloadStatus === 'initiating' ? <><Loader2 className="w-4 h-4 animate-spin" /> Starting Download...</> : <><CheckCircle2 className="w-4 h-4" /> Enjoy your game!</>}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Game Player Modal */}
          {selectedGame && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
              <motion.div ref={modalRef} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-6xl aspect-video bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 overflow-hidden relative shadow-2xl">
                <div className="absolute top-6 right-6 z-10 flex gap-3">
                  <button onClick={toggleFullScreen} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><Maximize2 className="w-6 h-6" /></button>
                  <button onClick={() => setSelectedGame(null)} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><X className="w-6 h-6" /></button>
                </div>
                <div className="relative w-full h-full">
                  {isModalLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-0">
                      <div className="w-16 h-16 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin mb-4" />
                      <p className="text-sm font-bold tracking-widest text-emerald-500/50 uppercase animate-pulse">Loading Game Engine...</p>
                    </div>
                  )}
                  <iframe src={selectedGame.iframeUrl} className={`w-full h-full border-none transition-opacity duration-700 ${isModalLoading ? 'opacity-0' : 'opacity-100'}`} onLoad={() => setIsModalLoading(false)} />
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </Router>
  );
}
