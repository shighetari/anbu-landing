'use client';

import { motion } from 'framer-motion';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useScrolling } from '@/hooks/useScrolling';

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isScrolling = useScrolling();
  const rafRef = useRef<number | undefined>(undefined);
  const lastMoveTime = useRef(0);

  // Reset position when scrolling starts
  useEffect(() => {
    if (isScrolling) {
      setMousePosition({ x: 0, y: 0 });
      setIsHovered(false);
    }
  }, [isScrolling]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // Don't track mouse during scroll - return immediately
      if (isScrolling) {
        setMousePosition({ x: 0, y: 0 });
        return;
      }

      // Simple direct update without RAF for now
      const rect = event.currentTarget?.getBoundingClientRect();
      if (!rect) return;

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    },
    [isScrolling]
  );

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform:
          isHovered && !isScrolling
            ? `translate3d(${(mousePosition.x - 0.5) * 10}px, ${
                (mousePosition.y - 0.5) * 10
              }px, 0) scale3d(1, 1, 1)`
            : 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)',
        transition: 'transform 0.1s ease-out',
        willChange: isHovered && !isScrolling ? 'transform' : 'auto',
      }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm',
        containerClassName
      )}
    >
      <div
        className="relative h-full"
        style={{
          background: isHovered
            ? `radial-gradient(
                600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
                rgba(255,215,0,0.1),
                transparent 40%
              )`
            : 'transparent',
        }}
        suppressHydrationWarning
      >
        <motion.div
          animate={{
            rotate: isHovered ? 10 * (mousePosition.x - 0.5) + 'deg' : '0deg',
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className={cn('h-full', className)}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};
