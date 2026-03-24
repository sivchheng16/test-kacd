import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Game } from "../constants";
import { Play, Download, ExternalLink } from "lucide-react";

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

  useEffect(() => {
    // Entrance Animation: Staggered drop from Y axis
    gsap.fromTo(
      cardRef.current,
      {
        y: 100,
        opacity: 0,
        rotateX: 45,
        rotateZ: -10,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 20, // Default isometric-ish tilt
        rotateZ: -5,
        duration: 1.2,
        delay: index * 0.15,
        ease: "power4.out",
      },
    );
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -30,
      rotateX: 0,
      rotateZ: 0,
      scale: 1.05,
      duration: 0.6,
      ease: "power2.out",
      boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      rotateX: 20,
      rotateZ: -5,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.75)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative perspective-1000 p-8 flex items-center justify-center h-[400px]"
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onPlay(game)}
        className="relative w-full max-w-[320px] aspect-[3/4] bg-white/40 backdrop-blur-xl border border-border/20 rounded-2xl overflow-hidden shadow-xl transition-shadow cursor-pointer group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background Highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Play Indicator on Hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-20 pointer-events-none">
          <div className="text-center">
            <Play className="w-12 h-12 text-white fill-white mx-auto mb-2" />
            <span className="font-sans text-sm font-bold uppercase tracking-widest text-white">
              Click to Play
            </span>
          </div>
        </div>

        {/* Thumbnail Layer */}
        <div className="relative h-2/3 overflow-hidden">
          <img
            src={game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content Layer */}
        <div className="p-6 relative">
          <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
            {game.category}
          </div>
          <h3 className="font-serif text-2xl font-medium text-foreground group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="mt-2 text-xs text-muted-foreground font-sans leading-relaxed line-clamp-2">
            {game.description}
          </p>

          <div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <div
              onClick={(e) => {
                e.stopPropagation();
                onPlay(game);
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-background font-sans text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer"
              title="Play Game Now"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload(game.appImageUrl);
              }}
              className="px-4 py-2 rounded-lg border border-primary/40 text-foreground font-sans text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary transition-colors"
              title="Download .appImage"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>

        {/* Glossy Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/20 to-transparent border-t border-l border-white/40" />
      </div>
    </div>
  );
}
