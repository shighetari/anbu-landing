import React from 'react';
import { cn } from '@/lib/utils';

// I'm creating a heading component with responsive sizes and gradient options
interface HeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  gradient?: boolean;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export default function Heading({
  children,
  as = 'h2',
  size = 'lg',
  gradient = false,
  align = 'left',
  className,
}: HeadingProps) {
  const Component = as;

  const sizes = {
    sm: 'text-lg sm:text-xl md:text-2xl',
    md: 'text-xl sm:text-2xl md:text-3xl',
    lg: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    xl: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    '2xl': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <Component
      className={cn(
        'font-display font-bold leading-tight',
        sizes[size],
        alignments[align],
        gradient &&
          'bg-gradient-to-r from-anbu-gold to-anbu-gold-accent bg-clip-text text-transparent',
        !gradient && 'text-white',
        className
      )}
    >
      {children}
    </Component>
  );
}
