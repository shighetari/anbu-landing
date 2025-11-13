'use client';

import type { ElementType } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface TextCascadeProps {
  text: string;
  as?: ElementType;
  className?: string;
  gradientClassName?: string;
  delay?: number;
  stagger?: number;
  viewportAmount?: number;
}

const containerVariants = {
  hidden: {},
  visible: ({ delay = 0, stagger = 0.08 }: { delay?: number; stagger?: number }) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function TextCascade({
  text,
  as,
  className,
  gradientClassName = 'bg-gradient-to-r from-[#FFE7A3] via-[#FFD164] to-[#FFAD5B] text-transparent bg-clip-text',
  delay = 0,
  stagger = 0.08,
  viewportAmount = 0.6,
}: TextCascadeProps) {
  const MotionComponent = motion.create(as || 'h2', {
    forwardMotionProps: false,
  });
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <MotionComponent
      className={cn(
        'relative flex flex-wrap justify-center gap-x-2 gap-y-1 text-center font-display leading-tight tracking-tight text-white drop-shadow-[0_5px_20px_rgba(0,0,0,0.55)]',
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={containerVariants}
      custom={{ delay, stagger }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className={cn('px-1', gradientClassName)}
          style={{ textShadow: '0 0 6px rgba(255, 210, 110, 0.25)' }}
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
