'use client';

import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

interface DecryptedTextProps {
  text: string;
  className?: string;
  duration?: number;
  revealDirection?: 'start' | 'end' | 'center';
  mono?: boolean;
}

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>!@#$%^&*()'.split('');

/**
 * Simple scrambled text reveal inspired by React Bits "decrypted-text".
 */
export function DecryptedText({
  text,
  className,
  duration = 1600,
  revealDirection = 'start',
  mono = true,
}: DecryptedTextProps) {
  const [display, setDisplay] = useState(text);

  const order = useMemo(() => {
    const indexes = Array.from({ length: text.length }, (_, index) => index);
    if (revealDirection === 'end') {
      return indexes.reverse();
    }
    if (revealDirection === 'center') {
      const center = Math.floor(text.length / 2);
      return indexes.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
    }
    return indexes;
  }, [text.length, revealDirection]);

  useEffect(() => {
    let frame = 0;
    let raf: number;

    const reveal = () => {
      const progress = Math.min(1, frame / (duration / 16));
      const revealCount = Math.floor(progress * text.length);
      const next = text
        .split('')
        .map((char, index) => {
          const orderIndex = order.indexOf(index);
          if (orderIndex <= revealCount) {
            return char;
          }
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join('');

      setDisplay(next);
      frame += 1;
      if (progress < 1) {
        raf = window.requestAnimationFrame(reveal);
      } else {
        setDisplay(text);
      }
    };

    raf = window.requestAnimationFrame(reveal);
    return () => window.cancelAnimationFrame(raf);
  }, [text, duration, order]);

  const baseClasses = mono
    ? 'font-mono text-sm tracking-[0.35em] uppercase'
    : 'tracking-[0.25em] uppercase';

  return <span className={cn(baseClasses, className)}>{display}</span>;
}
