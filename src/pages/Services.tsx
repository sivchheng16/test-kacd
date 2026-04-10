import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Layout,
  Paintbrush,
  Compass,
  Home as HomeIcon,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "@/components/ContactForm";

const services = [
  {
    name: "System Architecture",
    icon: Layout,
    description: "Cloud Scalability & Logic Flow",
    detail:
      "We engineer robust backend foundations that scale effortlessly. This includes microservices orchestration, database optimization, and ensuring high-availability systems.",
    features: [
      "Microservices Design",
      "API Orchestration",
      "Database Scalability",
      "Cloud Integration",
    ],
  },
  {
    name: "Custom Modules",
    icon: Paintbrush,
    description: "High-Performance Software",
    detail:
      "Every project is uniquely engineered to solve specific technical challenges. From proprietary algorithms to signature interfaces, we build software that drives excellence.",
    features: [
      "Proprietary Algorithms",
      "Modular Frontend Components",
      "Secure Edge Computing",
      "Legacy Code Refactoring",
    ],
  },
  {
    name: "UI/UX Strategy",
    icon: Compass,
    description: "Visual Identity & User Optics",
    detail:
      "We define the aesthetics and interactions that give a platform its character. Our strategies are data-driven and focused on the psychological resonance of the interface.",
    features: [
      "Interactive Prototyping",
      "Behavioral User Flows",
      "Design Systems (Tech)",
      "High-Fidelity Visuals",
    ],
  },
  {
    name: "Enterprise Solutions",
    icon: HomeIcon,
    description: "Digital Transformation",
    detail:
      "Modernizing large-scale infrastructures for the next generation of tech. We specialize in enterprise-grade transitions that balance legacy stability with modern speed.",
    features: [
      "Infrastructural Migration",
      "Security Protocols",
      "Scalable Dashboards",
      "Sovereign Tech Stacks",
    ],
  },
];

const categories = [
  {
    name: "All Team",
    moments: [
      { title: "Sivchheng Kheang", role: "Technical Lead", description: "Architecting the technical core and high-performance visions.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
      { title: "Long Sei", role: "DevOps Engineer", description: "Optimizing cloud orchestration and system deployment cycles.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
      { title: "Dara Som", role: "UI/UX Engineer", description: "Refining visual optics and interactive design protocols.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
      { title: "Leakhena Tep", role: "Fullstack Developer", description: "Bridging complex logic with intuitive system interfaces.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
    ]
  },
  {
    name: "Developers",
    moments: [
      { title: "Sivchheng Kheang", role: "Technical Lead", description: "Architecting the technical core and high-performance visions.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
      { title: "Long Sei", role: "DevOps Engineer", description: "Optimizing cloud orchestration and system deployment cycles.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
    ]
  },
  {
    name: "Designers",
    moments: [
      { title: "Dara Som", role: "UI/UX Engineer", description: "Refining visual optics and interactive design protocols.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
    ]
  }
];

const processSteps = [
  {
    title: "Discovery & Audit",
    description:
      "We analyze your technical landscape, system bottlenecks, and the vision for your digital infrastructure.",
  },
  {
    title: "Technical Spiking",
    description:
      "Translating requirements into architectural blueprints, proof-of-concepts, and modular data models.",
  },
  {
    title: "Deep Engineering",
    description:
      "Refining every detail, from technical unit tests to final high-performance system deployments.",
  },
  {
    title: "Scaling & Support",
    description:
      "Coordinating with devops and teams to ensure system longevity and precision at scale.",
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All Team");

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 relative overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[5%] right-[10%] w-[50vw] h-[50vw] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="px-8 mb-40 relative z-10 text-center section-connector">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-primary" />
              <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
                Expertise & Systems
              </p>
              <span className="w-12 h-[1px] bg-primary" />
            </div>
            <h1 className="text-6xl md:text-8xl font-sans font-medium tracking-tighter leading-[0.85] mb-12 uppercase text-gradient">
              Services that <br />
              <span className="italic font-light lowercase font-sans opacity-80">define performance.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-sans leading-relaxed max-w-3xl mx-auto italic">
              "From our studios in Phnom Penh, we build high-performance digital architectures that balance technical mastery with intuitive user design."
            </p>
          </motion.div>
        </div>
        {/* Bottom Connective Bloom (Transition to Grid) */}
        <div className="absolute -bottom-48 right-[10%] w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Services Grid */}
      <section className="px-8 mb-48 relative z-10 section-connector">
        {/* Top Connective Bloom */}
        <div className="absolute -top-48 right-[10%] w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service: any, index: number) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-panel p-10 md:p-14 rounded-[48px] border-white/5 hover:border-primary/40 transition-all duration-700 group flex flex-col justify-between overflow-hidden relative shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <service.icon size={120} className="text-primary" />
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 glass-panel rounded-2xl flex items-center justify-center text-primary mb-12 group-hover:scale-110 shadow-[0_0_30px_rgba(var(--primary),0.15)] transition-all duration-700">
                  <service.icon size={32} strokeWidth={1.2} />
                </div>
                <h2 className="text-3xl font-sans font-medium mb-4 italic">{service.name}</h2>
                <div className="flex items-center gap-4 mb-8">
                   <div className="h-px w-6 bg-primary/40" />
                   <p className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-primary">{service.description}</p>
                </div>
                <p className="text-muted-foreground font-sans leading-relaxed italic mb-12 opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                  {service.detail}
                </p>
              </div>
              
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto pt-10 border-t border-white/5">
                {service.features.map((feature: string) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40 group-hover:text-foreground transition-all">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        {/* Bottom Connective Bloom (Transition to Process) */}
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Process Section */}
      <section className="py-48 px-8 relative overflow-hidden section-connector">
        {/* Top Connective Bloom */}
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute -inset-20 bg-primary/5 blur-[150px] rounded-full opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-6">Execution Lifecycle</p>
            <h2 className="text-5xl md:text-6xl font-sans font-medium">The Journey.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel p-12 rounded-[48px] border-white/5 hover:bg-white/5 transition-all duration-700 text-center group flex flex-col items-center"
              >
                <span className="font-mono text-primary/20 text-[56px] mb-8 block font-bold leading-none tracking-tighter">
                  0{idx + 1}
                </span>
                <h3 className="font-sans text-2xl mb-6 text-foreground italic">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic font-sans opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                  {step.description}
                </p>
                <div className="mt-10 h-1 w-8 bg-primary/10 group-hover:w-16 transition-all duration-700 overflow-hidden rounded-full">
                   <div className="h-full w-full bg-primary translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Bottom Connective Bloom (Transition to Partnership) */}
        <div className="absolute -bottom-48 right-0 w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* KOOMPI Partnership */}
      <section className="py-48 px-8 relative bg-white/[0.02] section-connector">
        {/* Top Connective Bloom */}
        <div className="absolute -top-48 right-0 w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-[1px] bg-secondary" />
              <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-secondary uppercase">
                Corporate Synergy
              </p>
            </div>
            <h2 className="text-5xl md:text-6xl font-sans font-medium leading-tight mb-8">
              KOOMPI <span className="text-secondary italic">Ecosystem.</span>
            </h2>
            <p className="text-xl text-muted-foreground font-sans leading-relaxed mb-12 italic opacity-80">
              As a core member of the KOOMPI development team, we leverage sovereign technology and modular architectures to build products that redefine regional standards.
            </p>
            
            <div className="space-y-6">
              {[
                "Sovereign Tech Integration",
                "Scalable System Architecture",
                "Community-Driven Design"
              ].map((item) => (
                <div key={item} className="flex items-center gap-6 glass-panel py-4 px-8 rounded-2xl max-w-sm">
                  <CheckCircle2 size={18} className="text-secondary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/80 font-bold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="aspect-video glass-panel p-4 rounded-[40px] relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
              alt="Collaboration"
              className="w-full h-full object-cover rounded-[32px] grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
        </div>
        {/* Bottom Connective Bloom (Transition to Team) */}
        <div className="absolute -bottom-48 left-[10%] w-[40vw] h-[40vw] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Team Section */}
      <section className="py-48 px-8 relative z-10 section-connector">
        {/* Top Connective Bloom */}
        <div className="absolute -top-48 left-[10%] w-[40vw] h-[40vw] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <p className="font-mono text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-6">The Collective</p>
            <h2 className="text-5xl md:text-6xl font-sans font-medium">Studio Team.</h2>
          </div>

          <div className="flex justify-center mb-20">
            <div className="glass-panel p-1.5 rounded-full inline-flex">
              {categories.map((category: any) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-8 py-3 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                    activeCategory === category.name
                      ? "bg-primary text-background shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {categories
                .find((cat: any) => cat.name === activeCategory)
                ?.moments.map((moment: any, index: number) => (
                  <motion.div
                    key={moment.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="glass-panel p-4 rounded-[32px] group relative overflow-hidden"
                  >
                    <div className="aspect-square rounded-[24px] overflow-hidden mb-6 relative">
                      <img
                        src={moment.image}
                        alt={moment.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-sans text-lg font-medium mb-1">{moment.title}</h4>
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-primary mb-2 opacity-80">{moment.role}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed italic opacity-70 group-hover:opacity-100 transition-opacity">
                      {moment.description}
                    </p>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
        {/* Bottom Connective Bloom (Transition to Contact) */}
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      </section>


      <section id="contact" className="py-28 px-5 md:px-5 relative overflow-hidden bg-background section-connector">
        {/* Subtle Background Ornaments */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 20, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [20, 0, 20],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[10%] -left-[5%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Container Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel border-white/5 p-6 md:p-10 rounded-[64px] shadow-[0_64px_128px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Visual Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />

            <div className="relative z-10">
              {/* SHARED HEADER */}
              <div className="relative mb-20 flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-6 mb-10"
                >
                  <div className="w-12 h-px bg-primary/40" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-primary">
                    Transmission Node
                  </span>
                  <div className="w-12 h-px bg-primary/40" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 1.2 }}
                  className="text-5xl md:text-8xl font-sans leading-[0.85] tracking-tight italic"
                >
                  Have a system <br />
                  <span className="opacity-40 font-light">requirement?</span>
                </motion.h2>
              </div>

              {/* NESTED CARDS GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Description Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="glass-panel border-white/5 p-10 md:p-16 flex flex-col justify-between space-y-16 rounded-[48px]"
                >
                  <div className="space-y-12">
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-sans italic opacity-70">
                      Collaborate with our Khmer-led technical studio to architect exceptional digital experiences. Currently accepting system audits for Q3 2026.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                      {[
                        { label: "Direct Line", value: "+855 969094960" },
                        { label: "Secure Mail", value: "kheangsivechheng@gmail.com" },
                        { label: "Studio HQ", value: "KOOMPI Hub, Phnom Penh, KH", full: true },
                      ].map((item) => (
                        <div key={item.label} className={`${item.full ? 'sm:col-span-2' : ''} space-y-3`}>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-primary/40">
                            {item.label}
                          </span>
                          <p className="text-md font-sans italic tracking-tight text-foreground/80">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 border-t border-white/5 space-y-6">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-primary/40">
                      Network Identity
                    </span>
                    <div className="flex flex-wrap gap-10">
                      {[{ name: 'LinkedIn', link: '#' }, { name: 'GitHub', link: '#' }, { name: 'Instagram', link: 'https://www.instagram.com/koompi/' }].map((social) => (
                        <a
                          target="_blank"
                          key={social.name}
                          href={social.link}
                          className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-all duration-500 hover:scale-105"
                        >
                          {social.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="glass-panel border-white/5 p-1 shadow-2xl rounded-[48px]"
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
