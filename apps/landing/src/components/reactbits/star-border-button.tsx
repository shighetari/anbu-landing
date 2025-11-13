'use client';

import { motion } from 'framer-motion';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface StarBorderButtonProps extends ComponentPropsWithoutRef<'button'> {
  glow?: boolean;
}

/**
 * Button with an animated star tracing the border.
 * Inspired by React Bits "star-border" pattern and tailored to ANBU's palette.
 */
export const StarBorderButton = forwardRef<HTMLButtonElement, StarBorderButtonProps>(
  ({ className, children, glow = true, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em]',
          'text-anbu-black',
          className
        )}
        {...props}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFED4E] to-[#FFA500]" />
        <span className="absolute inset-[1.5px] rounded-full bg-black" />
        {glow && (
          <span className="absolute inset-[1.5px] overflow-hidden rounded-full">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFED4E33,transparent_60%)] opacity-60 blur-lg transition-opacity duration-500 group-hover:opacity-90" />
          </span>
        )}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-[20deg] bg-gradient-to-br from-[#FFF6C1] to-[#FFB347] shadow-[0_0_8px_2px_rgba(255,215,0,0.35)] [clip-path:polygon(50%_0%,64%_35%,100%_38%,70%_58%,82%_100%,50%_78%,18%_100%,30%_58%,0%_38%,36%_35%)]" />
        </motion.span>
        <span className="relative z-10 flex items-center gap-2 text-anbu-gold">{children}</span>
      </button>
    );
  }
);

StarBorderButton.displayName = 'StarBorderButton';
