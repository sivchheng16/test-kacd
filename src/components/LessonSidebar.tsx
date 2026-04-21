import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Lesson } from "../constants";
import { cn } from "@/lib/utils";
import { Clock, PlayCircle } from "lucide-react";

interface LessonSidebarProps {
  lessons: Lesson[];
  activeLessonId: string | null;
  onLessonSelect: (id: string) => void;
  className?: string;
}

export const LessonSidebar = ({ lessons, activeLessonId, onLessonSelect, className }: LessonSidebarProps) => {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [activeLessonId]);

  return (
    <aside className={cn("flex flex-col gap-8", className)}>
      <div className="flex items-center gap-4 px-4">
        <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
          Course Modules
        </p>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      <div className="flex flex-col gap-2 ">
        {lessons.map((lesson, idx) => {
          const isActive = activeLessonId === lesson.id;
          return (
            <button
              key={lesson.id}
              ref={isActive ? activeRef : null}
              onClick={() => onLessonSelect(lesson.id)}
              className={cn(
                "group relative text-left p-4 rounded-2xl transition-all duration-300 border border-transparent",
                isActive ? "bg-primary/10 border-primary/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]" : "hover:bg-white/5"
              )}
            >
              <div className="flex items-start gap-4 relative z-10">
                <span className={cn(
                  "font-mono text-xs font-bold transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground/30 group-hover:text-primary/50"
                )}>
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                
                <div className="flex-1">
                  <h4 className={cn(
                    "font-sans text-sm font-medium mb-1 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {lesson.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary/40 transition-colors">
                    <Clock size={12} />
                    {lesson.duration}
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-primary"
                  >
                    <PlayCircle size={18} fill="currentColor" className="opacity-20" />
                  </motion.div>
                )}
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeLesson"
                  className="absolute inset-y-2 left-0 w-[3px] bg-primary rounded-r-full shadow-[0_0_8px_var(--primary)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
