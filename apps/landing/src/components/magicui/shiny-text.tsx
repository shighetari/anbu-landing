'use client';

import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  disabled?: boolean;
}

export const ShinyText = ({ children, className, speed = 8, disabled = false }: ShinyTextProps) => {
  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={cn(
        'inline-block animate-shiny-text bg-clip-text text-transparent',
        'bg-[linear-gradient(110deg,#939393,45%,#FFD700,55%,#939393)]',
        'bg-[length:250%_100%]',
        className
      )}
      style={
        {
          '--animate-shiny-text': `shiny-text ${speed}s infinite`,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
};
