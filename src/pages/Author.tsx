import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Twitter, Linkedin, Mail, ExternalLink, Code2, Palette, Terminal, Send, Loader2, CheckCircle2, MessageCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Author() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const projects = [
    { title: 'GameVault Core', desc: 'The engine powering this very portal.', icon: Terminal },
    { title: 'Pixel Perfect UI', desc: 'A design system for modern web apps.', icon: Palette },
    { title: 'Async Logic', desc: 'High-performance state management library.', icon: Code2 },
  ];

  const communityLinks = [
    { 
      name: 'GitHub', 
      label: 'Open Source', 
      icon: Github, 
      url: '#', 
      desc: 'Contributing to the ecosystem through experimental repos and core libraries.',
      color: 'group-hover:text-white',
      borderColor: 'group-hover:border-white/40'
    },
    { 
      name: 'LinkedIn', 
      label: 'Professional', 
      icon: Linkedin, 
      url: '#', 
      desc: 'Connecting with industry leaders and sharing insights on product engineering.',
      color: 'group-hover:text-[#0077B5]',
      borderColor: 'group-hover:border-[#0077B5]/40'
    },
    { 
      name: 'Twitter', 
      label: 'Tech Feed', 
      icon: Twitter, 
      url: '#', 
      desc: 'Daily thoughts on UI/UX, AI, and the evolving landscape of web tech.',
      color: 'group-hover:text-[#1DA1F2]',
      borderColor: 'group-hover:border-[#1DA1F2]/40'
    },
    { 
      name: 'Discord', 
      label: 'Community', 
      icon: MessageCircle, 
      url: '#', 
      desc: 'Engaging in real-time discussions with developer communities worldwide.',
      color: 'group-hover:text-[#5865F2]',
      borderColor: 'group-hover:border-[#5865F2]/40'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      setStatus('error');
      setErrorMessage('Database connection not available. Please try again later.');
      return;
    }

    setStatus('submitting');
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-block"
          >
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-emerald-400 to-cyan-500 p-1 mx-auto">
              <div className="w-full h-full rounded-[2.3rem] bg-[#050505] flex items-center justify-center overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/author/200/200" 
                  alt="Author" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold mb-4 tracking-tight"
          >
            Sivechheng Kheang
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            Senior Product Engineer & Lead Designer. Crafting immersive digital experiences with a focus on performance and aesthetics.
          </motion.p>
        </section>

        {/* Expertise */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {projects.map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -8, borderColor: 'rgba(52, 211, 153, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/10 transition-all group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Bio */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-12 rounded-[3rem] bg-white/5 border border-white/10 relative overflow-hidden mb-24"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -z-10" />
          <h2 className="text-2xl font-bold mb-6">The Vision</h2>
          <div className="space-y-6 text-white/60 leading-relaxed text-lg">
            <p>
              I believe that software should be more than just functional—it should be an experience. GameVault was born out of a desire to create a centralized hub for high-quality web experiences that feel native and responsive.
            </p>
            <p>
              With over a decade of experience in full-stack development and UI/UX design, I focus on the intersection of technology and human interaction. My goal is to build tools that empower creators and delight users.
            </p>
          </div>
          
          <button className="mt-10 flex items-center gap-2 text-emerald-400 font-bold hover:gap-4 transition-all">
            View full portfolio <ExternalLink className="w-4 h-4" />
          </button>
        </motion.section>

        {/* Community Engagement */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mb-2 block">Network</span>
              <h2 className="text-3xl font-bold tracking-tight">Community Engagement</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                className={`group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all ${link.borderColor}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center transition-colors ${link.color}`}>
                    <link.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
                    {link.label}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-3 transition-colors ${link.color}`}>{link.name}</h3>
                <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                  {link.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-[3rem] bg-white/5 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -z-10" />
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-white/40">Have a project in mind or just want to say hello? Drop me a message below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2 block">Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2 block">Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2 block">Subject</label>
                <input 
                  required
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2 block">Message</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-emerald-500/50 min-h-[160px] resize-none transition-all"
                  placeholder="Your message..."
                />
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-3 text-emerald-400 font-bold"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    Message sent successfully!
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center gap-3 text-red-400 font-bold"
                  >
                    {errorMessage}
                  </motion.div>
                ) : (
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full py-5 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 text-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Send Message
                      </>
                    )}
                  </button>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
