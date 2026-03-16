import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Maximize2, Heart, ChevronRight, Download } from 'lucide-react';
import { Game } from '../constants';

export function SafeImage({ src, alt, className, placeholderIcon: Icon = Gamepad2 }: { src: string; alt: string; className?: string; placeholderIcon?: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {(isLoading || hasError) && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-white/5 ${isLoading && !hasError ? 'animate-pulse' : ''}`}>
          <Icon className={`w-12 h-12 ${hasError ? 'text-white/20' : 'text-white/10'}`} />
          {hasError && <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 mt-3">Image Unavailable</span>}
        </div>
      )}
      {!hasError && (
        <img 
          src={src} 
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`w-full h-full object-cover transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}

export function GameThumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <SafeImage 
      src={src} 
      alt={alt} 
      className="w-full h-full group-hover:scale-110" 
    />
  );
}

export function GameCard({ 
  game, 
  isFavorite, 
  onToggleFavorite, 
  onViewDetails,
  onDownload
}: { 
  game: Game; 
  isFavorite: boolean; 
  onToggleFavorite: (id: string, e: React.MouseEvent) => void; 
  onViewDetails: (game: Game) => void;
  onDownload: (game: Game) => void;
}) {
  return (
    <motion.div 
      whileHover={{ y: -12, scale: 1.02 }}
      onClick={() => onViewDetails(game)}
      className="group relative rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 transition-all hover:border-emerald-500 hover:shadow-[0_30px_60px_rgba(16,185,129,0.15)] cursor-pointer"
    >
      <div className="aspect-[16/10] overflow-hidden relative bg-white/5">
        <GameThumbnail src={game.thumbnail} alt={game.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center hover:scale-110 transition-transform shadow-2xl shadow-emerald-500/40">
            <Maximize2 className="w-8 h-8" />
          </div>
        </div>
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest">
            {game.category}
          </span>
        </div>
        <button 
          onClick={(e) => onToggleFavorite(game.id, e)}
          className={`absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all hover:scale-110 ${
            isFavorite ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-black/50 text-white/60 hover:text-white'
          }`}
        >
          <Heart className={`w-6 h-6 ${isFavorite ? 'fill-white' : ''}`} />
        </button>
      </div>
      <div className="p-8 flex items-end justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/60">
              {game.category}
            </span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
              Verified
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-3 truncate tracking-tight text-white/90">{game.title}</h3>
          <div className="relative group/desc-tooltip mb-8">
            <p className="text-sm text-white/30 line-clamp-2 leading-relaxed cursor-help font-medium group-hover/desc-tooltip:text-white/50 transition-colors">
              {game.description}
            </p>
            <div className="absolute bottom-full mb-4 left-0 w-72 opacity-0 group-hover/desc-tooltip:opacity-100 pointer-events-none transition-all duration-500 translate-y-2 group-hover/desc-tooltip:translate-y-0 z-50">
              <div className="bg-[#0a0a0a]/95 text-white/90 text-xs p-5 rounded-[2rem] shadow-2xl border border-white/10 leading-relaxed backdrop-blur-2xl">
                {game.description}
              </div>
              <div className="w-4 h-4 bg-[#0a0a0a]/95 rotate-45 absolute -bottom-2 left-8 border-r border-b border-white/10" />
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(game);
            }}
            className="px-8 py-3.5 rounded-full bg-emerald-500 text-black text-sm font-bold flex items-center gap-3 hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            View Details <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="relative group/tooltip flex flex-col items-center shrink-0">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDownload(game);
            }}
            className="w-12 h-44 rounded-full bg-white/[0.03] border border-white/10 flex flex-col items-center justify-end pb-0 hover:bg-emerald-500/[0.05] hover:border-emerald-500/30 transition-all duration-700 group/btn relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700" />
            
            {/* Center Rail Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/0 via-white/20 to-white/0 group-hover/btn:via-emerald-500/50 transition-all duration-700" />

            {/* Download Icon Circle - Fitted to width */}
            <div className="relative z-10 w-12 h-12 rounded-full border-t border-white/20 flex items-center justify-center group-hover/btn:bg-emerald-500/30 group-hover/btn:border-emerald-500/50 transition-all duration-500">
              <Download className="w-5 h-5 text-white/40 group-hover/btn:text-emerald-400 group-hover/btn:scale-110 transition-all duration-500" />
            </div>
          </button>
          <div className="absolute bottom-full mb-6 right-0 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-500 translate-y-2 group-hover/tooltip:translate-y-0 z-50">
            <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl text-emerald-400 text-[10px] font-bold py-2.5 px-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] whitespace-nowrap border border-emerald-500/20 tracking-widest">
              {game.appImageUrl.split('/').pop()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
