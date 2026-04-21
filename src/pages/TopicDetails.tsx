import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Clock, Code2, Menu, ChevronRight } from "lucide-react";
import { TOPICS } from "../constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Footer from "../components/Footer";
import { CourseTopicNavbar } from "../components/CourseTopicNavbar";
import { LessonSidebar } from "../components/LessonSidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function TopicDetails() {
  const { topicId } = useParams();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topic = TOPICS.find((t) => t.id === topicId);

  useEffect(() => {
    // Reset page scroll
    window.scrollTo(0, 0);
    // Reset internal container scroll
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }

    if (topic && topic.lessons.length > 0) {
      setActiveLessonId(topic.lessons[0].id);
    }
  }, [topicId, topic]);

  useEffect(() => {
    // Scroll to top when lesson changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeLessonId]);

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

  const activeLesson = topic.lessons.find(l => l.id === activeLessonId) || topic.lessons[0];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground relative pt-24">
      {/* Background Mesh Gradients - Moved to a wrapper to avoid global interference */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[5%] left-[10%] w-[50vw] h-[50vw] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[0%] w-[40vw] h-[40vw] bg-secondary/3 blur-[150px] rounded-full" />
      </div>

      {/* Main Section Wrapper: Below the site-wide Navbar (h-24/96px) */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Section: Topic Switcher Navbar */}
        <CourseTopicNavbar />

        {/* Big Section: Sidebar + Content */}
        <div className="flex-1 flex overflow-hidden ">

          {/* Desktop Sidebar: Focused Navigator */}
          <div className="hidden lg:block w-[340px] border-r border-white/5 overflow-y-auto custom-scrollbar p-8 bg-background/20 scroll-smooth" data-lenis-prevent>
            <LessonSidebar  
              lessons={topic.lessons}
              activeLessonId={activeLessonId}
              onLessonSelect={setActiveLessonId}
            />
          </div>

          {/* Mobile Sidebar Trigger (Modified for the new layout) */}
          <div className="lg:hidden absolute top-[1px] right-6 z-40 h-[72px] flex items-center">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 glass-panel h-10 w-10 rounded-xl">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background border-r border-white/5 p-0 w-80">
                <SheetHeader className="p-6 border-b border-white/5">
                  <SheetTitle className="text-left font-sans italic">Course Navigator</SheetTitle>
                </SheetHeader>
                <div className="py-8 px-4 text-foreground overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar" data-lenis-prevent>
                  <LessonSidebar
                    lessons={topic.lessons}
                    activeLessonId={activeLessonId}
                    onLessonSelect={(id) => {
                      setActiveLessonId(id);
                      setIsSidebarOpen(false);
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Scrollable Content Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 w-full overflow-y-auto custom-scrollbar relative px-6 md:px-12 pt-12 scroll-smooth"
            data-lenis-prevent
          >
            <div className="w-full">
              {/* Navigation & Header */}
              <div className="mb-16">
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
                  key={topic.id}
                  className="flex flex-col md:flex-row gap-12 items-start md:items-center justify-between"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
                    <div className="relative w-28 h-28 glass-panel p-2 rounded-3xl overflow-hidden group shrink-0">
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
                      <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tighter leading-[0.8] mb-2 uppercase text-gradient">
                        {topic.title}
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 text-right glass-panel p-6 rounded-2xl border-white/5 shrink-0">
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
                className="mb-20 w-full border-l-2 border-primary/20 pl-12"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                key={`${topic.id}-desc`}
              >
                <p className="text-xl md:text-2xl font-sans leading-relaxed text-muted-foreground italic opacity-80">
                  {topic.description}
                </p>
              </motion.div>

              {/* Current Lesson View */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLessonId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-20"
                >
                  <div className="flex items-center gap-6 mb-12">
                    <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
                      Active Module
                    </h2>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>

                  <div className="glass-panel p-10 md:p-14 rounded-[40px] relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-tr ${topic.gradient} opacity-5 blur-[100px] pointer-events-none group-hover:opacity-10 transition-opacity duration-1000`} />

                    <div className="flex flex-col gap-8">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl font-mono font-bold text-primary/10">
                            {topic.lessons.findIndex(l => l.id === activeLessonId) + 1 < 10 ? '0' : ''}
                            {topic.lessons.findIndex(l => l.id === activeLessonId) + 1}
                          </span>
                          <ChevronRight className="text-primary/20" size={24} />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-sans font-medium tracking-tight italic">
                          {activeLesson?.title}
                        </h3>
                      </div>

                      <p className="text-xl md:text-2xl text-muted-foreground font-sans italic leading-relaxed max-w-2xl">
                        {activeLesson?.description}
                      </p>

                      <div className="flex flex-wrap gap-6 items-center">
                        <div className="flex items-center gap-3 px-6 py-3 glass-panel rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-primary border-primary/20">
                          <Clock size={16} className="text-primary/40" />
                          {activeLesson?.duration}
                        </div>
                        <Button className="h-14 px-10 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase bg-primary text-background hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                          Launch Terminal
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* List remaining lessons if any */}
              <div className="mb-20">
                <div className="flex items-center gap-6 mb-12">
                  <h2 className="font-mono text-[10px] font-bold tracking-[0.4em] text-muted-foreground/40 uppercase">
                    Upcoming Syllabus
                  </h2>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topic.lessons.filter(l => l.id !== activeLessonId).map((lesson, idx) => (
                    <motion.div
                      key={lesson.id}
                      className="glass-panel p-8 rounded-[32px] hover:border-white/20 transition-all cursor-pointer group"
                      onClick={() => setActiveLessonId(lesson.id)}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground/20 group-hover:text-primary/40 transition-colors">
                          MODULE_{(topic.lessons.findIndex(l => l.id === lesson.id) + 1).toString().padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary/40">
                          <Clock size={12} />
                          {lesson.duration}
                        </div>
                      </div>
                      <h4 className="text-xl font-sans font-medium mb-3 group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h4>
                      <p className="text-sm text-muted-foreground italic line-clamp-2">
                        {lesson.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>

  );
}
