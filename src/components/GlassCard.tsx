import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`glass-panel rounded-[32px] border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] ${className}`}
        >
            <div className="relative z-10">
                {children}
            </div>
            {/* Inner Neon Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
    );
};

export default GlassCard;
