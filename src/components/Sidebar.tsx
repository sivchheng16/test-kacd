import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  Layers,
  Cpu,
  Gamepad2,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Terminal,
  Settings,
  ShieldCheck,
  PanelLeftClose,
  PanelRightClose
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLayout } from "../context/LayoutContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import logo from "../../public/koompi-white.png";

export default function Sidebar() {
  const {
    isSidebarCollapsed: isCollapsed,
    setIsSidebarCollapsed: setIsCollapsed,
    isMobileSidebarOpen: isOpen,
    setIsMobileSidebarOpen: setIsOpen
  } = useLayout();
  const location = useLocation();
  const { user, signOut, openAuthModal } = useAuth();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About This App", path: "/about", icon: Info },
    { name: "Modules", path: "/services", icon: Layers },
    { name: "System Features", path: "/portfolio", icon: Cpu },
    { name: "The Vault", path: "/vault", icon: Gamepad2 },
  ];

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Toggle Trigger - REMOVED from here as per instruction */}

      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen z-[110] transition-all duration-500 ease-in-out",
          isCollapsed ? "w-[80px]" : "w-[280px]",
          "border-r border-white/5 bg-background/40 backdrop-blur-3xl",
          "lg:translate-x-0",
          isOpen ? "translate-x-0 shadow-2xl shadow-primary/10" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className={cn(
          "flex flex-col h-full transition-all duration-500",
          isCollapsed ? "p-4" : "p-4"
        )}>
          {/* Desktop Toggle Button */}
          <div className={cn(
            "hidden lg:flex mb-8",
            isCollapsed ? "justify-center" : "justify-end"
          )}>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-primary transition-all duration-300"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <PanelRightClose size={20} /> : <  PanelLeftClose size={20} />}
            </button>
          </div>

          {/* Logo Section */}
          <Link to="/" className={cn("mb-12 group", isCollapsed && "flex justify-center")}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center p-2 glass-panel rounded-xl group-hover:rotate-12 transition-transform duration-500 shrink-0">
                <img src={logo} alt="KOOMPI" className="w-full h-full object-contain" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden whitespace-nowrap">
                  <h1 className="font-sans text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    KOOMPI OS
                  </h1>
                  <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-primary/60 uppercase">
                    System App
                  </span>
                </div>
              )}
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <link.icon className={cn(
                    "w-5 h-5 transition-transform duration-500 shrink-0",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )} />

                  {!isCollapsed && (
                    <span className="font-sans font-medium tracking-wide whitespace-nowrap overflow-hidden">
                      {link.name}
                    </span>
                  )}

                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}

                  {/* Subtle hover micro-animation */}
                  {!isActive && !isCollapsed && (
                    <ChevronRight className="absolute right-4 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Profile / Auth Section */}
          <div className="pt-8 border-t border-white/5 space-y-4">
            {user ? (
              <div className="space-y-4">
                <div className={cn(
                  "flex items-center gap-4 glass-panel rounded-2xl border-white/5",
                  isCollapsed ? "p-2 justify-center" : "p-3"
                )}>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                    {user.firstName[0]}
                  </div>
                  {!isCollapsed && (
                    <div className="flex flex-col min-w-0 overflow-hidden">
                      <span className="font-sans font-bold text-sm truncate">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="font-mono text-[8px] text-primary/60 uppercase tracking-widest">
                        Operator
                      </span>
                    </div>
                  )}
                </div>
                {!isCollapsed ? (
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-white/10 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 font-mono text-[10px] font-bold uppercase tracking-widest"
                  >
                    <LogOut size={14} />
                    Terminate Session
                  </button>
                ) : (
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center justify-center p-4 rounded-2xl border border-white/10 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                    title="Terminate Session"
                  >
                    <LogOut size={14} />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className={cn(
                  "w-full rounded-2xl bg-primary text-background font-mono text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20",
                  isCollapsed ? "p-4 flex justify-center" : "p-4"
                )}
                title="Initialize Login"
              >
                {isCollapsed ? <ShieldCheck size={16} /> : "Initialize Login"}
              </button>
            )}

            {!isCollapsed && (
              <div className="text-center">
                <p className="font-mono text-[8px] text-muted-foreground/40 uppercase tracking-[0.4em]">
                  KOOMPI OS // 2026
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
