import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { TOPICS } from "../constants";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ArrowRight, Menu, X, ChevronDown, ChevronUp, Layout, PlayCircle } from "lucide-react"
import { Button } from "./ui/button";
import { LessonSidebar } from "./LessonSidebar";
import { useLayout } from "../context/LayoutContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CourseTopicNavbar = () => {
  const { topicId, moduleId } = useParams<{ topicId: string; moduleId: string }>();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topic = TOPICS.find((t) => t.id === topicId);
  const [isLessonSidebarOpen, setIsLessonSidebarOpen] = useState(false);
  const { setIsMobileSidebarOpen } = useLayout();
  const [openTopicDropdown, setOpenTopicDropdown] = useState<string | null>(null);
  const activeLessonId = moduleId
    ? (topic?.lessons.find((l) => l.id === moduleId)?.id ?? topic?.lessons[0]?.id ?? null)
    : (topic?.lessons[0]?.id ?? null);

  const handleLessonSelect = (_id: string) => {
    // Navigation to /document/:topicId/:moduleId is handled inside LessonSidebar
    setIsLessonSidebarOpen(false);
  };


  // useEffect(() => {
  //   const activeLink = document.querySelector(`a[href="/document/${topicId}"]`);
  //   if (activeLink) {
  //     activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  //   }
  // }, [topicId]);
  const scrollRef = useRef(null);

  // const scrollLeft = () => {
  //   scrollRef.current.scrollBy({
  //     left: -300,
  //     behavior: "smooth",
  //   });
  // };

  // const scrollRight = () => {
  //   scrollRef.current({
  //     left: 300,
  //     behavior: "smooth",
  //   });
  // };


  return (
    <div className="w-full border-b border-white/5 bg-foreground/5 backdrop-blur-xl relative z-30">
      <div className="overflow-x-auto items-start px-8 w-full ">
        <div className="flex items-center  overflow-x-auto no-scrollbar" data-lenis-prevent>
          {/* Mobile Sidebar Trigger */}
          {/* Global Sidebar Trigger (Mobile Only) */}
          <div className="lg:hidden h-[72px] flex items-center mr-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="text-primary hover:bg-primary/10 glass-panel h-10 w-10 rounded-xl"
            >
              <Layout size={20} />
            </Button>
          </div>

          {/* Lesson Navigator (Sheet) Trigger */}
          <div className="lg:hidden h-[72px] flex items-center mr-5">
            {/* <Sheet open={isLessonSidebarOpen} onOpenChange={setIsLessonSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 glass-panel h-10 w-10 rounded-xl">
                  <Menu size={22} />
                </Button>

              </SheetTrigger>
              <SheetContent side="left" className="absolute top-[4.5rem] bg-background border-r border-white/5 p-0 w-80">
                <div className="pl-4 pr-1 text-foreground overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar" data-lenis-prevent>
                  <LessonSidebar
                    lessons={topic?.lessons || []}
                    activeLessonId={activeLessonId}
                    onLessonSelect={(id) => {
                      handleLessonSelect(id);
                      setIsLessonSidebarOpen(false);
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
          {TOPICS.map((topic) => {
            if (!topic) return null;
            const isActive = topic.id === topicId;
            return (
              <div key={topic.id} className="flex items-center gap-1 group shrink-0">
                <Link
                  to={`/document/${topic.id}`}
                  className="relative group shrink-0 overflow-hidden "
                >
                  <div
                    ref={scrollRef}
                    className={cn(
                      "flex items-center rounded-md md:rounded-xl px-2 py-1 md:px-4 md:py-2 transition-all duration-300",
                      isActive ? "bg-white/5 gap-3 border border-white/10 shadow-lg shadow-black/20" : "hover:bg-white/5"
                    )}>
                    <span className={cn(
                      "text-[11px] md:text-[12px] lg:text-[14px] font-mono font-bold uppercase tracking-widest transition-colors whitespace-nowrap shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
                    )}>
                      {topic.title}
                    </span>
                  </div>
                  {
                    isActive && (
                      <motion.div
                        layoutId="activeTopic"
                        className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--primary)]"
                      />
                    )
                  }
                </Link>

                {/* Mobile Dropdown Chevron */}
                <div className="lg:hidden">
                  <DropdownMenu onOpenChange={(open) => setOpenTopicDropdown(open ? topic.id : null)}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className={cn(
                        "h-8 w-8 rounded-lg transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}>
                        {openTopicDropdown === topic.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="bg-background/95 backdrop-blur-xl border-white/5 p-2 w-64 z-[100]">
                      {topic.lessons.map((lesson, idx) => {
                        const isCurrentLesson = lesson.id === (topic.id === topicId ? moduleId : null);
                        return (
                          <DropdownMenuItem key={lesson.id} asChild className="focus:bg-primary/10 focus:text-primary rounded-lg transition-colors cursor-pointer p-0 mb-1">
                            <Link
                              to={`/document/${topic.id}/${lesson.id}`}
                              className={cn(
                                "group relative text-left p-3 rounded-2xl transition-all duration-300 border border-transparent",
                                isCurrentLesson && "bg-primary/5 border-primary/20"
                              )}
                            >
                              <div className={cn("flex gap-4 relative z-10 items-center")}>
                                <span className={cn(
                                  "font-mono text-xs font-bold transition-colors",
                                  isCurrentLesson ? "text-primary" : "text-muted-foreground/30 group-hover:text-primary/50"
                                )}>
                                  {(idx + 1).toString().padStart(2, '0')}
                                </span>

                                <div className="flex-1">
                                  <h4 className={cn(
                                    "font-sans text-xs font-medium mb-1 transition-colors",
                                    isCurrentLesson ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                  )}>
                                    {lesson.title}
                                  </h4>
                                </div>

                                {/* {isCurrentLesson && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-primary"
                                  >
                                    <PlayCircle size={18} fill="currentColor" className="opacity-20" />
                                  </motion.div>
                                )} */}
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div >
  );
};
