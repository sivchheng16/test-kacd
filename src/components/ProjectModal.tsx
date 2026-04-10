import React from "react";
import { X, Terminal, Calendar, Tag, ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-12"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/60 backdrop-blur-3xl"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full h-full md:h-auto max-w-6xl md:max-h-[85vh] glass-panel md:rounded-[48px] border-white/5 overflow-hidden shadow-[0_64px_128px_-16px_rgba(0,0,0,0.5)] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed md:absolute top-6 right-6 md:top-8 md:right-8 z-[250] w-12 h-12 rounded-full glass-panel flex items-center justify-center text-foreground hover:bg-primary hover:text-background transition-all shadow-2xl backdrop-blur-3xl"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
            {/* Visual Section */}
            <div className="relative h-[300px] md:h-[450px] lg:h-full bg-muted/10 overflow-hidden shrink-0">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
              
              {/* Technical Overlay */}
              <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                 <div className="glass-panel px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl border-white/10 backdrop-blur-3xl">
                    <div className="flex items-center gap-3 mb-2">
                       <Terminal size={14} className="text-primary" />
                       <span className="font-mono text-[9px] font-bold tracking-widest text-primary uppercase">Composition Node</span>
                    </div>
                    <p className="font-mono text-[11px] font-bold text-white/50">{project.id.toUpperCase()}_REV_02</p>
                 </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-between overflow-y-auto min-h-0">
              <div className="space-y-10 md:space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 glass-panel rounded-full text-primary font-mono text-[9px] font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                    <div className="h-px w-8 bg-white/10" />
                    <span className="font-mono text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={12} />
                      {project.year}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-medium tracking-tighter italic text-gradient leading-tight">
                    {project.title}
                  </h2>
                </div>

                <div className="space-y-8">
                   <div className="flex items-center gap-4">
                      <div className="h-[1px] w-12 bg-primary/30" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Technical Brief</span>
                   </div>
                   <p className="text-base md:text-xl font-sans text-muted-foreground leading-relaxed italic opacity-80">
                     {project.details}
                   </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="h-[1px] w-12 bg-white/10" />
                     <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/40">Dependencies</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 glass-panel rounded-xl font-mono text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-primary transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-12 md:pt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8">
                <Button className="w-full sm:w-auto h-16 px-10 rounded-full bg-primary text-background font-mono text-[11px] font-bold tracking-[0.3em] uppercase transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4">
                  <span>Visit Interface</span>
                  <ExternalLink size={14} />
                </Button>
                
                <button
                  onClick={onClose}
                  className="group flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 hover:text-foreground transition-all"
                >
                  <span>Close Brief</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
