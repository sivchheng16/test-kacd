import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Game } from "../constants";
import { Play, Download, ExternalLink, Terminal, Cpu } from "lucide-react";
import { useRequireAuth } from "../hooks/useRequireAuth";

export function AntigravityCard({
  game,
  index,
  onPlay,
  onDownload,
}: {
  game: Game;
  index: number;
  onPlay: (game: Game) => void;
  onDownload: (url: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { requireAuth } = useRequireAuth();
  
  const protectedOnPlay = requireAuth(onPlay);
  const protectedOnDownload = requireAuth(onDownload);

  useEffect(() => {
    // Entrance Animation: Staggered reveal
    gsap.fromTo(
      cardRef.current,
      {
        y: 60,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: index * 0.1,
        ease: "power4.out",
      },
    );
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -20,
      scale: 1.02,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.75)",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative p-2 flex items-center justify-center w-full"
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => protectedOnPlay(game)}
        className="relative w-full glass-panel rounded-[32px] overflow-hidden shadow-2xl transition-all cursor-pointer group border-white/5 flex flex-col h-full"
      >
        {/* Neon Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* Scanner Line Effect */}
        <div className="absolute inset-x-0 h-[1px] bg-primary/30 z-20 top-0 group-hover:animate-scan opacity-0 group-hover:opacity-100 pointer-events-none" />

        {/* Thumbnail Layer */}
        <div className="relative aspect-video overflow-hidden shrink-0">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover  opacity-60 transition-all duration-1000 group-hover:opacity-100 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Module ID */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
             <div className="w-8 h-8 glass-panel rounded-lg flex items-center justify-center text-primary backdrop-blur-3xl">
                <Terminal size={14} />
             </div>
             <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-white/40 group-hover:text-primary transition-colors">
               MOD_00{index + 1}
             </span>
          </div>

          {/* Level Indicator */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[8px] font-bold text-white/50 uppercase tracking-widest">Active</span>
          </div>
        </div>

        {/* Content Layer */}
        <div className="p-6 md:p-8 relative flex-1 flex flex-col justify-between space-y-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
            <Cpu size={12} className="text-primary/60" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-primary/60">
              {game.category}
            </span>
          </div>
          
            <h3 className="font-sans text-2xl md:text-3xl font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
              {game.title}
            </h3>
          
            <p className="font-sans text-xs md:text-sm text-muted-foreground/80 leading-relaxed italic mb-8">
              {game.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
               onClick={(e) => {
                e.stopPropagation();
                protectedOnPlay(game);
              }}
              className="flex-1 h-12 glass-panel rounded-full flex items-center justify-center gap-3 text-primary hover:bg-primary hover:text-background transition-all"
            >
              <Play size={14} className="fill-current" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Execute</span>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                protectedOnDownload(game.appImageUrl);
              }}
              className="w-12 h-12 glass-panel rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
            >
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Technical Border Overlay */}
        <div className="absolute inset-0 border border-white/5 rounded-[32px] pointer-events-none group-hover:border-primary/20 transition-colors duration-1000" />
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}