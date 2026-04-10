import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Loader2, Mail, Lock, ShieldCheck, ArrowRight, Terminal as TerminalIcon, Cpu, Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-[100]">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="flex flex-col items-center gap-6"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full"
            />
            <Cpu className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
          </div>
          <span className="font-mono text-[10px] font-bold tracking-[0.5em] text-primary uppercase animate-pulse">
            Booting System...
          </span>
        </motion.div>
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  const onLogin = async (data: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    try {
      await signIn(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegister = async (data: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true);
    try {
      await signUp(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden selection:bg-primary/20 selection:text-primary-foreground">
      {/* Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[480px] px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12 text-center"
        >
          <div className="inline-block relative mb-8">
            <div className="relative z-10 w-20 h-20 glass-panel rounded-3xl flex items-center justify-center text-primary">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-50" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-sans font-medium tracking-tighter text-foreground italic">
              {isLogin ? "System Access" : "Network Entry"}
            </h1>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.5em] text-primary/40">
              {isLogin ? "VERIFY CREDENTIALS TO INITIALIZE" : "ARCHITECT YOUR STUDIO IDENTITY"}
            </p>
          </div>
        </motion.div>

        {/* Terminal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-panel p-10 md:p-12 rounded-[40px] border-white/5 relative overflow-hidden">
            {/* Corner Decorative Elements */}
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
               <Fingerprint size={24} className="text-primary" />
            </div>

            <div className="mb-10">
               <div className="flex items-center gap-3 mb-2">
                  <TerminalIcon size={14} className="text-secondary" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">
                    {isLogin ? "AUTH_TERMINAL_V4" : "REG_TERMINAL_V4"}
                  </span>
               </div>
               <div className="h-px w-12 bg-secondary/30" />
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">Email Identifier</FormLabel>
                            <FormControl>
                              <div className="group relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/5 group-focus-within:text-primary transition-colors" />
                                <Input 
                                  placeholder="IDENTIFIER@STUDIO.SYS" 
                                  className="h-14 bg-white/5 border-none rounded-2xl font-mono text-[11px] font-bold tracking-widest uppercase px-6 pr-12 focus-visible:ring-1 focus-visible:ring-primary/40" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-[9px] font-mono text-primary/60 uppercase tracking-widest" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">Access Phrase</FormLabel>
                            <FormControl>
                              <div className="group relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/5 group-focus-within:text-primary transition-colors" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="h-14 bg-white/5 border-none rounded-2xl font-mono text-[11px] font-bold tracking-widest uppercase px-6 pr-12 focus-visible:ring-1 focus-visible:ring-primary/40" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-[9px] font-mono text-primary/60 uppercase tracking-widest" />
                          </FormItem>
                        )}
                      />
                      <div className="pt-6">
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full h-16 rounded-full font-mono text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500 bg-primary text-background hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                        >
                          {isSubmitting ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : "Initialize Login"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">Given Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="GIVEN_NAME" 
                                  className="h-14 bg-white/5 border-none rounded-2xl font-mono text-[11px] font-bold tracking-widest uppercase px-6 focus-visible:ring-1 focus-visible:ring-primary/40" 
                                  {...field} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">Family Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="FAMILY_NAME" 
                                  className="h-14 bg-white/5 border-none rounded-2xl font-mono text-[11px] font-bold tracking-widest uppercase px-6 focus-visible:ring-1 focus-visible:ring-primary/40" 
                                  {...field} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">System Email</FormLabel>
                            <FormControl>
                              <div className="group relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/5 group-focus-within:text-primary transition-colors" />
                                <Input 
                                  placeholder="IDENTIFIER@STUDIO.SYS" 
                                  className="h-14 bg-white/5 border-none rounded-2xl font-mono text-[11px] font-bold tracking-widest uppercase px-6 pr-12 focus-visible:ring-1 focus-visible:ring-primary/40" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">Secure Phrase</FormLabel>
                            <FormControl>
                              <div className="group relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/5 group-focus-within:text-primary transition-colors" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="h-14 bg-white/5 border-none rounded-2xl font-mono text-[11px] font-bold tracking-widest uppercase px-6 pr-12 focus-visible:ring-1 focus-visible:ring-primary/40" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="pt-6">
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full h-16 rounded-full font-mono text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500 bg-primary text-background hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                        >
                          {isSubmitting ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : "Architect Account"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="group flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 hover:text-primary transition-all duration-300"
              >
                <span>{isLogin ? "PROPOSE NEW IDENTITY" : "RETURN TO ACCESS LOG"}</span>
                <ArrowRight className="h-3 w-3 translate-x-0 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer Branding */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center opacity-20"
        >
          <p className="font-mono text-[8px] font-bold uppercase tracking-[1em] text-foreground">SIVCHHENG KHEANG STUDIO // REGISTRY 2026</p>
        </motion.div>
      </div>
    </div>
  );
}



