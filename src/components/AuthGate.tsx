import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { AlertCircle, Loader2, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
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
  const [error, setError] = useState<string | null>(null);

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
            <ShieldCheck className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
          </div>
          <span className="font-mono text-[10px] font-bold tracking-[0.5em] text-primary uppercase animate-pulse">
            Verifying session...
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
    setError(null);
    try {
      await signIn(data);
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

   const onRegister = async (data: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await signUp(data);
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fdfdfd] overflow-hidden selection:bg-primary/20 selection:text-primary-foreground">
      {/* 
        LIGHT MODE BACKGROUND SYSTEM
        Soft, airy mesh gradients and subtle depth
      */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Pastel Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -30, 0],
            rotate: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] opacity-40"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-400/5 rounded-full blur-[120px] opacity-30"
        />
        
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: `url("data:image/svg+xml=%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
        
        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[460px] px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center"
        >
          <div className="inline-block relative mb-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 w-14 h-14 rounded-2xl bg-white shadow-sm border border-black/[0.03] flex items-center justify-center"
            >
              <ShieldCheck className="w-7 h-7 text-primary/80" />
            </motion.div>
            <div className="absolute inset-0 bg-primary/10 blur-xl opacity-40" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-light tracking-tight text-foreground italic">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-muted-foreground/40">
              {isLogin ? "Sign in to continue" : "Join the member list"}
            </p>
          </div>
        </motion.div>

        {/* Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Card className="relative border border-black/[0.03] bg-white/70 backdrop-blur-[80px] rounded-[28px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
            <CardHeader className="pt-10 pb-6 px-10">
              <CardTitle className="text-xl font-serif font-medium tracking-tight text-foreground/80">
                {isLogin ? "Sign In" : "Register"}
              </CardTitle>
              <CardDescription className="text-[11px] font-sans font-semibold uppercase tracking-[0.1em] text-muted-foreground/50 mt-1">
                {isLogin 
                  ? "Enter your credentials below" 
                  : "Fill in your details to get started"}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-10 pb-4">
              {/* Error Feedback */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <Alert variant="destructive" className="bg-red-50/50 border-red-100 text-red-600 rounded-xl py-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-[10px] font-bold uppercase tracking-wider">
                      {error}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-5">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">Email</FormLabel>
                              <FormControl>
                                <div className="group relative">
                                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/[0.1] group-focus-within:text-primary/40 transition-colors" />
                                  <Input 
                                    placeholder="name@example.com" 
                                    className="h-11 bg-black/[0.02] border-black/[0.04] focus:border-primary/20 focus:bg-white transition-all duration-300 rounded-xl font-sans text-xs px-4 pr-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[9px] font-sans text-red-500 opacity-80" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">Password</FormLabel>
                              <FormControl>
                                <div className="group relative">
                                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/[0.1] group-focus-within:text-primary/40 transition-colors" />
                                  <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="h-11 bg-black/[0.02] border-black/[0.04] focus:border-primary/20 focus:bg-white transition-all duration-300 rounded-xl font-sans text-xs px-4 pr-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[9px] font-sans text-red-500 opacity-80" />
                            </FormItem>
                          )}
                        />
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full h-12 rounded-xl font-sans text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 bg-primary text-primary-foreground hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-primary/10"
                          >
                            {isSubmitting ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : "Log In"}
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
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={registerForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">First Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter first name" 
                                    className="h-11 bg-black/[0.02] border-black/[0.04] focus:border-primary/20 focus:bg-white transition-all duration-300 rounded-xl font-sans text-xs px-4" 
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
                              <FormItem className="space-y-2">
                                <FormLabel className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">Last Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter last name" 
                                    className="h-11 bg-black/[0.02] border-black/[0.04] focus:border-primary/20 focus:bg-white transition-all duration-300 rounded-xl font-sans text-xs px-4" 
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
                            <FormItem className="space-y-2">
                              <FormLabel className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">Email</FormLabel>
                              <FormControl>
                                <div className="group relative">
                                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/[0.1] group-focus-within:text-primary/40 transition-colors" />
                                  <Input 
                                    placeholder="name@example.com" 
                                    className="h-11 bg-black/[0.02] border-black/[0.04] focus:border-primary/20 focus:bg-white transition-all duration-300 rounded-xl font-sans text-xs px-4 pr-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[9px] font-sans text-red-500 opacity-80" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold ml-1">Password</FormLabel>
                              <FormControl>
                                <div className="group relative">
                                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black/[0.1] group-focus-within:text-primary/40 transition-colors" />
                                  <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="h-11 bg-black/[0.02] border-black/[0.04] focus:border-primary/20 focus:bg-white transition-all duration-300 rounded-xl font-sans text-xs px-4 pr-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-[9px] font-sans text-red-500 opacity-80" />
                            </FormItem>
                          )}
                        />
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full h-12 rounded-xl font-sans text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 bg-primary text-primary-foreground hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-primary/10"
                          >
                            {isSubmitting ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : "Sign Up"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter className="px-10 pb-8 flex flex-col items-center pt-6">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
                className="group flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary transition-all duration-300"
              >
                <span>{isLogin ? "Need an account? Sign up" : "Already a member? Log in"}</span>
                <ArrowRight className="h-3 w-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Footer Branding */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center opacity-20"
        >
          <p className="text-[9px] font-sans font-bold uppercase tracking-[0.6em] text-foreground">Studio Registry 2026</p>
        </motion.div>
      </div>
    </div>
  );
}



