import React from "react";
import { motion } from "motion/react";
import {
    Quote,
    Layers,
    Sun,
    Palette,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const philosophyItems = [
    {
        title: "Honest Materials",
        icon: Layers,
        detail: "We use stone, timber, and metal in their natural form — no decor that pretends to be something it is not."
    },
    {
        title: "Quiet Spaces",
        icon: Sun,
        detail: "Good design does not shout. We work to remove what is unnecessary so the space can breathe."
    },
    {
        title: "Light as a Material",
        icon: Palette,
        detail: "We plan every room around how sunlight moves through it from morning to evening."
    }
];

export default function About() {
    return (
        <div className="min-h-screen pt-32 pb-20">
            {/* Hero Section */}
            <section className="px-8 mb-32">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-6">
                            The Studio
                        </p>
                        <h1 className="text-7xl md:text-8xl font-serif font-medium tracking-tighter leading-[0.9] mb-12 uppercase">
                            Sivchheng Kheang:
                            <br />
                            Deliberate Design.
                        </h1>
                        <p className="text-2xl text-muted-foreground font-serif leading-relaxed max-w-2xl italic">
                            "Based in Phnom Penh and Singapore, we create residential and commercial spaces that are thoughtfully planned, carefully detailed, and built to last."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Founder Story */}
            <section className="px-8 mb-40">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="aspect-[4/5] bg-muted overflow-hidden border border-border/20"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
                            alt="Sivchheng Kheang"
                            className="w-full h-full object-cover grayscale transition-all duration-1000 scale-105 hover:scale-100"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <div className="text-primary">
                            <Quote className="w-12 h-12 mb-6" />
                        </div>
                        <h2 className="text-4xl font-serif font-medium">A Vision for Timelessness.</h2>
                        <p className="text-lg text-muted-foreground font-serif leading-relaxed italic">
                            Founded in 2018, SIVCHHENG KHEANG started as a small studio in Phnom Penh focused on getting the most out of modest spaces. Since then, we have grown into a full interior design practice working on homes, boutique commercial spaces, and bespoke commissions across Cambodia and Southeast Asia.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            We work directly with each client from the first conversation to the final fitting. No two projects are the same, and we keep our process close and personal to make sure every detail is right. Our job is to understand who you are and what you need — and then build it.
                        </p>
                        <div className="pt-8">
                            <div className="flex items-center gap-6">
                                <div>
                                    <h4 className="font-serif text-xl uppercase tracking-wider">Sivchheng Kheang</h4>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mt-1">Principal Designer & Founder</p>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-2">Phnom Penh / Singapore City</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-32 px-8 bg-muted/5 border-y border-border/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {philosophyItems.map((item) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <div className="w-12 h-12 border border-primary/20 flex items-center justify-center text-primary mb-8">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-2xl font-serif font-medium">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed italic font-serif">
                                    {item.detail}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Statement */}
            <section className="py-40 px-8 text-center max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="font-sans text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-12">Our Mission</p>
                    <h2 className="text-5xl md:text-6xl font-serif font-medium tracking-tight mb-20 leading-tight">
                        To design spaces that enhance the way we live, work, and feel — one detail at a time.
                    </h2>
                    <Button size="lg" className="rounded-none h-16 px-12 font-sans text-xs tracking-[0.2em] uppercase bg-foreground text-background hover:bg-primary transition-colors">
                        View Our Work <ArrowRight className="ml-4 w-4 h-4" />
                    </Button>
                </motion.div>
            </section>
        </div>
    );
}
