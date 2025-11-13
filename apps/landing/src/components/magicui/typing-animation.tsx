'use client';

import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  delay?: number;
}

export default function TypingAnimation({
  text,
  duration = 0.1,
  className,
  delay = 0,
}: TypingAnimationProps) {
  const textVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: duration,
        delayChildren: delay,
      },
    },
  };

  const characters = text.split('');

  return (
    <motion.span
      className={cn('font-mono', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={textVariants} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
