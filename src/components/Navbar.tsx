import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal, Command } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import logo from "../../public/logo.png"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Systems", path: "/portfolio" },
    { name: "The Vault", path: "/vault" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 h-24 flex items-center border-b",
        isScrolled
          ? "bg-background/20 backdrop-blur-3xl border-white/5 py-4"
          : "bg-transparent border-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto w-full px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-[110] group">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-transparent hover:text-primary group-hover:rotate-12 transition-transform duration-500">
                {/* <Command size={18} /> */}
                <img src={logo} alt="logo" className="w-full h-full object-contain" />

              </div>
              <span className="font-sans text-1xl md:text-3xl font-medium  group-hover:text-primary transition-colors tracking-[0.2em]">
                Portfolio
                {/* <span className="italic font-light opacity-60 group-hover:opacity-100 italic transition-all">Studio.</span> */}
              </span>
            </div>
            {/* <span className="font-mono text-[8px] font-bold tracking-[0.5em] text-primary mt-1 opacity-0 group-hover:opacity-100 transition-all pl-11">
              EST. 2018 // PHNOM PENH
            </span> */}
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative font-mono text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:text-primary py-2",
                location.pathname === link.path
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary"
                  : "text-foreground/60"
              )}
            >
              {link.name}
            </Link>
          ))}

          <div className="h-6 w-px bg-white/10 mx-4" />

          <Button
            asChild
            className="h-11 px-8 rounded-full bg-primary text-background font-mono text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-primary/20"
          >
            <Link to="/services#contact">Initiate Project</Link>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden relative z-[110] p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] glass-panel bg-background/90 backdrop-blur-3xl lg:hidden flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="space-y-8 md:space-y-12">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "text-3xl md:text-4xl font-sans font-medium uppercase tracking-tighter block transition-all",
                      location.pathname === link.path ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-16 px-12 rounded-full bg-primary text-background font-mono text-xs font-bold tracking-widest uppercase"
                >
                  <Link to="/services#contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </div>

            <div className="absolute bottom-12 left-0 w-full text-center">
              <p className="font-mono text-[9px] font-bold tracking-[0.4em] text-primary uppercase opacity-40">
                Sivchheng Kheang Studio // 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
