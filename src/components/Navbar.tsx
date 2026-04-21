import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal, Command } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formatStudentDate } from "../lib/dateUtils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import logo from "../../public/logo.png"
import { LogOut } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, openAuthModal } = useAuth();
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

  // Scroll Lock when Mobile Menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Systems", path: "/portfolio" },
    { name: "The Vault", path: "/vault" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 h-24 flex items-center border-b",
          isScrolled
            ? "bg-background/20 backdrop-blur-3xl border-white/5 py-4"
            : "bg-transparent border-transparent py-8"
        )}
      >
        {/* <div className="max-w-[1440px] mx-auto w-full px-8 md:px-12 flex items-center justify-between"> */}
        <div className="max-w-full mx-auto w-full px-8 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-[110] group shrink-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-transparent hover:text-primary group-hover:rotate-12 transition-transform duration-500">
                  <img src={logo} alt="logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-sans text-xl md:text-3xl font-medium tracking-[0.2em] group-hover:text-primary transition-colors">
                  Portfolio
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav - Centered */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative font-mono text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:text-primary py-2",
                  location.pathname === link.path
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary"
                    : "text-foreground/60"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Call to Action - Right */}
          <div className="hidden lg:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                {/* <span className="font-mono text-md font-bold uppercase tracking-widest text-primary/60">
                {user.firstName} {user.lastName}
              </span> */}
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="relative h-11 px-7 rounded-full border-white/10 hover:bg-white/5 font-mono text-[10px] font-bold tracking-widest uppercase transition-all gap-3 flex flex-col items-center justify-center py-2"
                >
                  <div className="flex items-center gap-2">
                    <LogOut size={14} />
                    {user.firstName} {user.lastName}
                  </div>
                  {user.updatedAt && (
                    <span className="text-[7px] text-primary/60 lowercase tracking-normal">
                      active: {formatStudentDate(user.updatedAt)}
                    </span>
                  )}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => openAuthModal()}
                variant="outline"
                className="h-11 px-8 rounded-full border-white/10 hover:bg-white/5 font-mono text-[10px] font-bold tracking-widest uppercase transition-all"
              >
                Sign In
              </Button>
            )}
            {/* <Button
            asChild
            className="h-11 px-8 rounded-full bg-primary text-background font-mono text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-primary/20"
          >
            <Link to="/services#contact">Initiate Project</Link>
          </Button> */}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden relative z-[110] p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-8 text-center overscroll-none touch-none"
            data-lenis-prevent
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="space-y-6 md:space-y-10"
            >
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + 0.1 * idx,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    to={link.path}
                    className={cn(
                      "text-2xl sm:text-3xl font-sans font-medium uppercase tracking-widest block transition-all hover:text-primary",
                      location.pathname === link.path ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6 + 0.1 * navLinks.length }}
                className="pt-8 flex flex-col gap-4"
              >
                {user ? (
                  <>
                    <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-2">
                      Account: {user.firstName}
                    </p>
                    <Button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      size="lg"
                      className="h-14 sm:h-16 px-10 sm:px-12 rounded-full border-white/10 font-mono text-xs font-bold tracking-widest uppercase"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      openAuthModal();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    size="lg"
                    className="h-14 sm:h-16 px-10 sm:px-12 rounded-full border-white/10 font-mono text-xs font-bold tracking-widest uppercase"
                  >
                    Sign In
                  </Button>
                )}
                <Button
                  onClick={() => setIsMobileMenuOpen(false)}
                  asChild
                  size="lg"
                  className="h-14 sm:h-16 px-10 sm:px-12 rounded-full bg-primary text-background font-mono text-xs font-bold tracking-widest uppercase shadow-xl shadow-primary/20"
                >
                  <Link to="/services#contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 left-0 w-full text-center"
            >
              <p className="font-mono text-[9px] font-bold tracking-[0.4em] text-primary uppercase opacity-40">
                Sivchheng Kheang Studio // 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
