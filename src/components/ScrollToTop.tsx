import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable browser's default scroll behavior on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Check if this is an initial load or refresh
    // We use a custom check for the very first mount of the app
    const isFirstMount = !window.sessionStorage.getItem('app_mounted');
    if (isFirstMount) {
      window.sessionStorage.setItem('app_mounted', 'true');
    }

    const isHomePath = pathname === '/' || pathname === '/home';
    if (isHomePath && isFirstMount) {
      // On the very first load of the home page, always start at the top
      // and clear any hash that might have been carried over from a previous session/refresh
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      return;
    }

    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 10);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    }
  }, [pathname, hash]);

  return null;
}
