'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// I'm creating a versatile button component with multiple variants
type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
> &
  MotionProps & {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    children: React.ReactNode;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    // Variant styles - keeping it clean and maintainable
    const variants = {
      primary:
        'bg-anbu-gold text-anbu-ink hover:bg-anbu-gold-accent shadow-lg hover:shadow-anbu-gold/50',
      secondary: 'bg-anbu-gray text-white hover:bg-anbu-gray/80',
      outline:
        'border-2 border-anbu-gold/50 text-anbu-gold hover:bg-anbu-gold/10 hover:border-anbu-gold',
      ghost: 'text-anbu-gold hover:bg-anbu-gold/10',
    };

    // Size variations
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
