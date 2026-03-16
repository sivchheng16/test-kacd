import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, signInWithGoogle, logout } = useAuth();
  const [activeSection, setActiveSection] = React.useState<string>('');

  React.useEffect(() => {
    const isHomePage = location.pathname === '/' || location.pathname === '/home';
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const sections = ['about', 'projects', 'learn', 'community'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Learn', path: '/#learn' },
    { name: 'Community', path: '/#community' },
    { name: 'Library', path: '/library' },
    { name: 'Pages', path: '/pages', special: true },
  ];

  return (
    <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Gamepad2 className="text-black w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">GAMEVAULT</span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 mr-4">
              {navLinks.map((link) => {
                const isHomePage = location.pathname === '/' || location.pathname === '/home';
                const isHomeLink = link.path === '/';
                const isHashLink = link.path.startsWith('/#');
                
                let isActive = false;
                if (isHomeLink) {
                  isActive = isHomePage && activeSection === '';
                } else if (isHashLink) {
                  const hash = link.path.split('#')[1];
                  isActive = isHomePage && activeSection === hash;
                } else {
                  isActive = location.pathname === link.path;
                }
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative text-[10px] uppercase tracking-widest font-bold transition-all ${
                      isActive
                        ? 'text-emerald-400'
                        : 'text-white/40 hover:text-white'
                    } ${link.special ? 'px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40' : ''}`}
                  >
                    {link.name}
                    {link.special && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75" />
                    )}
                  </Link>
                );
              })}
          </div>
          
          <div className="h-4 w-px bg-white/10 hidden md:block" />

          <div className="h-4 w-px bg-white/10" />

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-emerald-500/30" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <UserIcon className="w-4 h-4 text-white/40" />
                  </div>
                )}
                <span className="text-sm font-medium text-white/80 hidden lg:inline">{user.displayName?.split(' ')[0]}</span>
              </div>
              <button 
                onClick={logout}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 transition-all group"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4 text-white/40 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          ) : (
            <button 
              onClick={signInWithGoogle}
              className="px-4 py-2 rounded-full bg-emerald-500 text-black text-sm font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
