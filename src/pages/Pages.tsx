import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Library, 
  User, 
  Layout, 
  ArrowRight, 
  Layers, 
  Terminal, 
  Cpu, 
  Zap, 
  Globe 
} from 'lucide-react';

const directory = [
  {
    title: "Primary Nodes",
    links: [
      { name: "Home Portal", path: "/", icon: Home, desc: "The main entry point and editorial archive." },
      { name: "Game Library", path: "/library", icon: Library, desc: "Access the full collection of verified game binaries." },
      { name: "Author Profile", path: "/author", icon: User, desc: "Detailed background on the architect and methodology." },
    ]
  },
  {
    title: "System Sections",
    links: [
      { name: "About Mission", path: "/#about", icon: Globe, desc: "The vision and philosophy behind the Vault." },
      { name: "Curated Projects", path: "/#projects", icon: Layers, desc: "A showcase of high-performance digital experiments." },
      { name: "Learning Lab", path: "/#learn", icon: Zap, desc: "Technical insights and continuous evolution logs." },
      { name: "Community Hub", path: "/#community", icon: Cpu, desc: "Engagement channels and professional network nodes." },
    ]
  },
  {
    title: "Internal Tools",
    links: [
      { name: "System Status", path: "#", icon: Terminal, desc: "Real-time diagnostics and portal health monitoring." },
      { name: "UI Components", path: "#", icon: Layout, desc: "The design system powering the Atmospheric interface." },
    ]
  }
];

export default function Pages() {
  return (
    <div className="min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-400 mb-6 block"
          >
            System Directory
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.8]"
          >
            PAGES <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">INDEX.</span>
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {directory.map((section, sIndex) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sIndex * 0.1 }}
            >
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-8 border-b border-white/5 pb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.links.map((link, lIndex) => (
                  <Link 
                    key={link.name}
                    to={link.path}
                    className="group block p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-emerald-400 transition-colors">
                        <link.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">{link.name}</h3>
                          <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-white/30 leading-relaxed group-hover:text-white/50 transition-colors">
                          {link.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
