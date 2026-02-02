'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// I'm creating a flexible card component with hover effects
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glass?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className,
  hover = true,
  glow = false,
  glass = true,
  padding = 'md',
}: CardProps) {
  const paddings = {
    sm: 'p-4 sm:p-6',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  };

  return (
    <motion.div
      className={cn(
        'rounded-xl transition-all duration-300',
        glass && 'glass',
        'border border-anbu-gold/20',
        hover && 'hover:border-anbu-gold/50 hover:shadow-lg hover:shadow-anbu-gold/20',
        glow && 'hover:shadow-anbu-gold/50',
        paddings[padding],
        className
      )}
      whileHover={hover ? { y: -5, scale: 1.01 } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
