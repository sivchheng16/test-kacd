import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, BookOpen, LayoutTemplate, Paintbrush, Code2, AppWindow } from "lucide-react";
import { TOPICS } from "../constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Footer from "../components/Footer";

const iconMap: Record<string, React.FC<any>> = {
  LayoutTemplate,
  Paintbrush,
  Code2,
  AppWindow,
};

export default function TopicDetails() {
  const { topicId } = useParams();
  const topic = TOPICS.find((t) => t.id === topicId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!topic) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-32 px-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-sans mb-6">Terminal Error: Topic Not Found</h2>
        <Button asChild variant="outline" className="h-14 px-10 rounded-full glass-panel font-mono text-[10px] font-bold tracking-widest uppercase">
          <Link to="/">Reboot to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 flex flex-col relative overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[5%] left-[10%] w-[50vw] h-[50vw] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl flex-1 relative z-10">
        {/* Navigation & Header */}
        <div className="mb-24">
          <Link 
            to="/"
            className="group inline-flex items-center gap-4 font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-12 hover:gap-6 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> 
            <span>System Return</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row gap-12 items-start md:items-center justify-between"
          >
            <div className="flex items-center gap-10">
              <div className="relative w-28 h-28 glass-panel p-2 rounded-3xl overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-tr ${topic.gradient} opacity-20`} />
                <img 
                  src={topic.logo} 
                  alt={topic.title} 
                  className="relative z-10 w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-1000" 
                />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className={cn(
                    "px-4 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 border",
                    topic.level === "Beginner" ? "border-green-500/20 text-green-500 bg-green-500/5" :
                    topic.level === "Intermediate" ? "border-amber-500/20 text-amber-500 bg-amber-500/5" :
                    "border-primary/20 text-primary bg-primary/5"
                  )}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {topic.level} System
                  </span>
                  <span className="text-[9px] font-mono font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">
                    Module: {topic.id}
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-sans font-medium tracking-tighter leading-[0.8] mb-2 uppercase text-gradient">
                  {topic.title}
                </h1>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3 text-right glass-panel p-6 rounded-2xl border-white/5">
              <div className="text-base font-sans italic text-muted-foreground">
                {topic.lessons.length} Modules in Queue
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                <Clock className="w-4 h-4" />
                {topic.lessons.length * 45} MINS RUNTIME
              </div>
            </div>
          </motion.div>
        </div>

        {/* Description Section */}
        <motion.div 
          className="mb-32 max-w-3xl border-l-2 border-primary/20 pl-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-2xl md:text-3xl font-sans leading-relaxed text-muted-foreground italic opacity-80">
            {topic.description}
          </p>
        </motion.div>

        {/* Lessons List */}
        <div className="mb-48">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
              Operational Syllabus
            </h2>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="space-y-6">
            {topic.lessons.length > 0 ? (
              topic.lessons.map((lesson, idx) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="glass-panel p-10 md:p-14 rounded-[40px] hover:border-primary/40 transition-all duration-700 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-10 md:gap-20 items-center">
                    <div className="font-mono text-5xl font-bold text-primary/10 group-hover:text-primary/30 transition-colors">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-3xl font-sans font-medium mb-4 group-hover:text-primary transition-colors duration-500">
                        {lesson.title}
                      </h3>
                      <p className="text-lg text-muted-foreground font-sans italic opacity-70 group-hover:opacity-100 transition-opacity">
                        {lesson.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 glass-panel rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                      <Clock size={14} className="text-primary/40 group-hover:text-primary transition-colors" />
                      {lesson.duration}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-40 glass-panel rounded-[40px] border-dashed border-white/10">
                <Code2 size={48} className="text-primary/20 mx-auto mb-8 animate-pulse" />
                <p className="text-xl text-muted-foreground font-sans italic opacity-60">
                  System state: Content for this terminal is currently being architected.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
