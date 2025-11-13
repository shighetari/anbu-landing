import React from 'react';
import { cn } from '@/lib/utils';

// I'm creating a section wrapper with responsive padding
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'marble' | 'gradient' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Section({
  children,
  className,
  id,
  background = 'default',
  padding = 'lg',
}: SectionProps) {
  const backgrounds = {
    default: 'bg-anbu-black',
    marble: 'marble-bg',
    gradient: 'bg-gradient-to-b from-anbu-black to-anbu-gray/20',
    dark: 'bg-anbu-gray',
  };

  const paddings = {
    sm: 'py-8 sm:py-12 md:py-16',
    md: 'py-12 sm:py-16 md:py-20',
    lg: 'py-16 sm:py-20 md:py-24 lg:py-32',
    xl: 'py-20 sm:py-24 md:py-32 lg:py-40',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden',
        backgrounds[background],
        paddings[padding],
        className
      )}
    >
      {children}
    </section>
  );
}
