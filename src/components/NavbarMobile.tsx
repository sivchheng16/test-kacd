import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal, Command } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formatStudentDate } from "../lib/dateUtils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import logo from "../../public/koompi-white.png"
import { LogOut } from "lucide-react";

export default function NavbarMobile() {
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
          "lg:hidden fixed top-0 left-0 right-0 z-[100] transition-all duration-700 h-16 w-full flex items-center border-b",
          isScrolled
            ? "bg-background/20 backdrop-blur-3xl border-white/5"
            : "bg-transparent backdrop-blur-xl border-transparent"
        )}
      >
        {/* Mobile menu toggle */}
        <div className="relative lg:hidden flex items-center justify-between w-full px-8">
          <button
            className="lg:hidden relative p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="absolute  left-1/2 -translate-x-1/2 group shrink-0 items-center justify-center">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </Link>
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
            className="fixed right-0 top-16 h-full w-full z-[9999] bg-background/20 backdrop-blur-xl flex flex-col  p-8 overscroll-none touch-none "
            data-lenis-prevent
          >

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="space-y-3 md:space-y-5 items-center text-center justify-center "
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
                  className="ph-14 sm:h-16 p-3  sm:px-12 rounded-full hover:bg-white/10 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-3000 "


                >
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    to={link.path}
                    className={cn(
                      " text-2xl sm:text-3xl font-sans font-medium uppercase tracking-widest block transition-all hover:text-primary  ",
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

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 left-0 w-full text-center"
            >
              <p className="font-mono text-[9px] font-bold tracking-[0.4em] text-primary uppercase opacity-40">
                Sivchheng Kheang Studio // 2026
              </p>
            </motion.div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
