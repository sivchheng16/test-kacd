import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin,
  MessageCircle, 
  ExternalLink, 
  Code2, 
  BookOpen, 
  Users, 
  Briefcase,
  Cpu,
  Globe,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "GameVault Portal",
    description: "A high-performance web game distribution platform with cloud syncing and AI-powered metadata generation.",
    details: "This project involved building a custom game distribution engine that handles binary AppImage delivery and real-time cloud synchronization using Firebase. I integrated the Gemini API to automatically generate rich metadata and visual assets for newly uploaded games, significantly reducing manual overhead.",
    tags: ["React", "Firebase", "Tailwind", "Gemini API"],
    link: "/library",
    image: "https://picsum.photos/seed/vault/800/600"
  },
  {
    title: "Neural Engine",
    description: "An open-source library for efficient inference of large language models on edge devices.",
    details: "Neural Engine focuses on cross-platform compatibility by leveraging WebAssembly and Rust. It provides a unified API for running quantized models directly in the browser with hardware acceleration via WebGPU, enabling privacy-focused AI applications without server-side dependencies.",
    tags: ["TypeScript", "WebAssembly", "Rust"],
    link: "#",
    image: "https://picsum.photos/seed/neural/800/600"
  },
  {
    title: "Atmospheric UI",
    description: "A design system focused on immersive, glass-morphism based interfaces for creative tools.",
    details: "Atmospheric UI is a comprehensive component library that uses advanced CSS filter techniques and Framer Motion to create depth and motion. It includes a custom theme engine that adapts to background colors dynamically, ensuring accessibility while maintaining a high-fidelity aesthetic.",
    tags: ["CSS", "Framer Motion", "Design Systems"],
    link: "#",
    image: "https://picsum.photos/seed/ui/800/600"
  }
];

const skills = [
  { name: "Frontend Architecture", icon: <Globe className="w-5 h-5" />, level: "Expert" },
  { name: "AI Integration", icon: <Zap className="w-5 h-5" />, level: "Advanced" },
  { name: "Systems Design", icon: <Cpu className="w-5 h-5" />, level: "Expert" },
  { name: "Full-stack Dev", icon: <Code2 className="w-5 h-5" />, level: "Advanced" },
];

export default function Home() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (title: string) => {
    setExpandedProject(expandedProject === title ? null : title);
  };

  return (
    <div className="min-h-screen">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-400 mb-8 block"
            >
              The Digital Archive
            </motion.span>
            <h1 className="text-[15vw] md:text-[12vw] font-bold leading-[0.8] tracking-tighter uppercase mb-12 select-none">
              GAME<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">VAULT</span>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            >
              <p className="text-lg md:text-xl text-white/40 max-w-md text-center md:text-left leading-tight font-light">
                A high-performance portal for immersive web experiences, custom game engines, and experimental digital art.
              </p>
              <div className="flex gap-4">
                <Link 
                  to="/library" 
                  className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all group"
                >
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex flex-col justify-center text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Enter the</span>
                  <span className="text-sm font-bold uppercase tracking-widest">Library</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-gradient-to-b from-emerald-500/5 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] to-transparent z-10" />
      </section>

      {/* About the Portal - The Mission */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-12 leading-[0.9]">
              THE <span className="text-emerald-400">VISION</span> BEHIND THE VAULT.
            </h2>
            <div className="space-y-8 text-xl text-white/60 leading-relaxed font-light">
              <p>
                GameVault isn't just a repository; it's a statement on the future of web-based interactive media. We believe the browser is the most powerful platform for distribution.
              </p>
              <p>
                Every project here is built with a focus on zero-latency interaction, atmospheric design, and technical excellence. From custom physics engines to AI-integrated interfaces.
              </p>
            </div>
          </motion.div>
          
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-[4rem] border border-white/5 overflow-hidden">
              <img 
                src="https://picsum.photos/seed/vision/1000/1000" 
                alt="Vision" 
                className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full" />
          </div>
        </div>
      </section>

      {/* About the Author - Redesigned to match Author page style */}
      <section id="about" className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative shrink-0"
            >
              <div className="w-64 h-64 rounded-[3rem] bg-gradient-to-br from-emerald-400 to-cyan-500 p-1">
                <div className="w-full h-full rounded-[2.8rem] bg-[#050505] flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/author/400/400" 
                    alt="Author" 
                    className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/20 blur-3xl rounded-full" />
            </motion.div>

            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mb-4 block">The Architect</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Sivechheng Kheang</h2>
              <p className="text-lg text-white/40 leading-relaxed mb-8 max-w-xl">
                Senior Product Engineer & Lead Designer. I specialize in building high-performance digital products that blend technical complexity with minimalist aesthetics.
              </p>
              
              <div className="mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-4 block">Community Engagement</span>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'GitHub', icon: Github, color: 'hover:text-white' },
                    { name: 'LinkedIn', icon: Linkedin, color: 'hover:text-[#0077B5]' },
                    { name: 'Twitter', icon: Twitter, color: 'hover:text-[#1DA1F2]' },
                    { name: 'Discord', icon: MessageCircle, color: 'hover:text-[#5865F2]' }
                  ].map((social) => (
                    <a 
                      key={social.name} 
                      href="#" 
                      className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${social.color} hover:border-current hover:bg-white/10`}
                    >
                      <social.icon className="w-3 h-3" />
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link 
                  to="/author" 
                  className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Full Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mb-4 block">Selected Works</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
                CURATED <br /> PROJECTS.
              </h2>
            </div>
            <Link to="/library" className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-all">
              View full archive <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500 transition-all"><ArrowRight className="w-5 h-5" /></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {projects.map((project, index) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1],
                  layout: { duration: 0.4, ease: "circOut" }
                }}
                viewport={{ once: true, margin: "-50px" }}
                onClick={() => toggleProject(project.title)}
                className="group cursor-pointer bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-4 hover:bg-white/[0.04] transition-colors"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 mb-8 relative">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    whileHover={{ scale: 1.05 }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-4 pb-4">
                  <div className="flex gap-3 mb-4">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{project.description}</p>
                  
                  <AnimatePresence>
                    {expandedProject === project.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-white/5 mt-4">
                          <p className="text-white/60 text-sm leading-relaxed mb-6">
                            {project.details}
                          </p>
                          <Link 
                            to={project.link} 
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all"
                          >
                            Full Case Study <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                      {expandedProject === project.title ? 'Show Less' : 'Read More'}
                      {expandedProject === project.title ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn Section */}
      <section id="learn" className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mb-4 block">Methodology</span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-8 leading-[0.9]">
              CONTINUOUS <br /> EVOLUTION.
            </h2>
            <p className="text-xl text-white/40 leading-relaxed mb-12 font-light">
              The web is a living organism. I dedicate my practice to mastering new paradigms and contributing to the open-source ecosystem.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map(skill => (
                <motion.div 
                  key={skill.name} 
                  whileHover={{ y: -5, borderColor: 'rgba(52, 211, 153, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-5 transition-all group cursor-default"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:text-emerald-400 transition-colors">
                    {skill.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest">{skill.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/20">{skill.level}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative aspect-square flex items-center justify-center">
            <div className="w-full h-full border border-white/5 rounded-[4rem] relative overflow-hidden flex flex-col justify-center p-16 space-y-12">
              {[
                { num: "01", text: "Architecting scalable React applications with modern state management." },
                { num: "02", text: "Integrating Large Language Models for intelligent user experiences." },
                { num: "03", text: "Performance optimization and low-latency data synchronization." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <span className="text-4xl font-bold text-white/10 group-hover:text-emerald-400 transition-colors duration-500">{item.num}</span>
                  <p className="text-lg font-medium text-white/60 leading-tight">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-400 mb-8 block">Get Involved</span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-12 leading-[0.8]">
              JOIN THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">NETWORK.</span>
            </h2>
            <p className="text-xl text-white/40 leading-relaxed mb-16 max-w-2xl mx-auto font-light">
              Active in several developer communities and always open to collaboration on high-impact projects.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'Discord', icon: MessageCircle, color: 'bg-[#5865F2]' },
                { label: 'Twitter', icon: Twitter, color: 'bg-[#1DA1F2]' },
                { label: 'GitHub', icon: Github, color: 'bg-white/10' }
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  className={`flex items-center gap-4 px-10 py-5 ${social.color} text-white font-bold rounded-full hover:scale-105 transition-all shadow-2xl`}
                >
                  <social.icon className="w-5 h-5" /> {social.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
