import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { TOPICS } from "../constants";
import { cn } from "@/lib/utils";

export const CourseTopicNavbar = () => {
  const { topicId } = useParams();

  return (
    <div className="w-full border-b border-white/5 bg-background/50 backdrop-blur-xl relative z-30">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4" data-lenis-prevent>
          {TOPICS.map((topic) => {
            const isActive = topic.id === topicId;
            return (
              <Link
                key={topic.id}
                to={`/document/${topic.id}`}
                className="relative group shrink-0"
              >
                <div className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300",
                  isActive ? "bg-white/5 border border-white/10 shadow-lg shadow-black/20" : "hover:bg-white/5"
                )}>
                  <div className="relative w-6 h-6 rounded-lg overflow-hidden glass-panel p-1">
                    <div className={cn("absolute inset-0 opacity-20", isActive ? `bg-gradient-to-tr ${topic.gradient}` : "bg-muted")} />
                    <img src={topic.logo} alt={topic.title} className="relative z-10 w-full h-full object-contain" />
                  </div>
                  <span className={cn(
                    "text-[10px] font-mono font-bold uppercase tracking-widest transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {topic.title}
                  </span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeTopic"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
