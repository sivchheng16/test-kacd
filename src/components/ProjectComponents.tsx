import React, { useState } from "react";
import { motion } from "motion/react";
import { Maximize2, Heart, ArrowRight, Square, Terminal, Cpu } from "lucide-react";
import { Project } from "../constants";
import { Separator } from "@/components/ui/separator";

export function SafeImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-muted/5 ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-muted/10 animate-pulse flex items-center justify-center">
           <Cpu size={24} className="text-primary/20 animate-spin-slow" />
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
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${isLoading ? "opacity-0 scale-110" : "opacity-100 scale-100"} group-hover:scale-110 grayscale group-hover:grayscale-0`}
          referrerPolicy="no-referrer"
        />
      )}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/5 border border-white/5">
          <Terminal className="w-8 h-8 text-primary/20" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary/30 mt-4">
            VISUAL_DATA_MISSING
          </span>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
}: {
  project: Project;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onViewDetails: (project: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      <div className="relative aspect-[16/11] overflow-hidden glass-panel rounded-[32px] border-white/5 shadow-2xl">
        <SafeImage
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full"
        />

        {/* Technical Overlays */}
        <div className="absolute top-8 left-8 flex flex-col gap-2">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 glass-panel rounded-lg flex items-center justify-center text-primary backdrop-blur-3xl border-primary/20">
                 <Terminal size={12} />
              </div>
              <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-white/40 group-hover:text-primary transition-colors">
                SYS_NODE_{index + 1}
              </span>
           </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(project.id, e);
          }}
          className={`absolute top-8 right-8 w-10 h-10 glass-panel rounded-full flex items-center justify-center transition-all duration-500 ${
            isFavorite
              ? "bg-primary text-background border-primary"
              : "text-white/40 hover:text-primary border-white/5"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-background/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
          <div className="w-20 h-20 glass-panel rounded-full border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 group-hover:border-primary">
            <Maximize2 className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Scanner Line Effect */}
        <div className="absolute inset-x-0 h-[1px] bg-primary/30 z-20 top-0 group-hover:animate-scan opacity-0 group-hover:opacity-100 pointer-events-none" />
      </div>

      <div className="mt-10 space-y-6">
        <div className="flex items-center gap-6">
           <span className="font-mono text-primary/40 text-lg">
             0{index + 1}
           </span>
           <div className="h-px flex-1 bg-white/5 group-hover:bg-primary/20 transition-colors" />
           <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
             {project.year}
           </span>
        </div>

        <div className="space-y-4">
           <h3 className="text-3xl sm:text-4xl font-sans font-medium tracking-tighter italic text-gradient leading-tight group-hover:text-primary transition-colors duration-500">
             {project.title}
           </h3>
           <p className="text-muted-foreground text-sm font-sans italic line-clamp-2 max-w-xl leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
             {project.description}
           </p>
        </div>

        <div className="pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(project);
            }}
            className="flex items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40 group-hover:text-primary transition-all group-hover:gap-8"
          >
            Execute Deep Dive <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
