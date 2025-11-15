'use client';

import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS: Record<string, Grid> = {
  '6x4': { rows: 4, cols: 6 },
  '8x8': { rows: 8, cols: 8 },
  '8x3': { rows: 3, cols: 8 },
  '4x6': { rows: 6, cols: 4 },
  '3x8': { rows: 8, cols: 3 },
};

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

interface PixelImageProps {
  src: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number; // in ms
  maxAnimationDelay?: number; // in ms
  colorRevealDelay?: number; // in ms
}

export const PixelImage = ({
  src,
  grid = '6x4',
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false;
      const { rows, cols } = grid;
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      );
    };

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid];
  }, [customGrid, grid]);

  useEffect(() => {
    setIsVisible(true);
    if (prefersReducedMotion) {
      setShowColor(true);
      return;
    }

    const colorTimeout = setTimeout(() => {
      setShowColor(true);
    }, colorRevealDelay);
    return () => clearTimeout(colorTimeout);
  }, [colorRevealDelay, prefersReducedMotion]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const seed = (index * 131 + rows * 17 + cols * 7) % 1000;
      const delay = (seed / 1000) * maxAnimationDelay;
      return {
        row,
        col,
        delay,
      };
    });
  }, [rows, cols, maxAnimationDelay]);

  const tileWidth = 100 / cols;
  const tileHeight = 100 / rows;

  return (
    <div className="relative h-72 w-72 select-none md:h-96 md:w-96">
      <img
        src={src}
        alt="Pixelated showcase"
        className={cn('h-full w-full rounded-[2.5rem] object-cover', grayscaleAnimation && !showColor && 'grayscale')}
        style={{
          transition: grayscaleAnimation
            ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : 'none',
        }}
        draggable={false}
        loading="lazy"
      />

      {pieces.map((piece, index) => (
        <div
          key={index}
          className="pointer-events-none absolute rounded-[0.4rem] bg-black/80 shadow-lg transition-opacity duration-700 ease-out"
          style={{
            left: `${piece.col * tileWidth}%`,
            top: `${piece.row * tileHeight}%`,
            width: `${tileWidth}%`,
            height: `${tileHeight}%`,
            opacity: prefersReducedMotion ? 0 : isVisible ? 0 : 1,
            transitionDelay: prefersReducedMotion ? '0ms' : `${piece.delay}ms`,
            transitionDuration: prefersReducedMotion
              ? '0ms'
              : `${pixelFadeInDuration}ms`,
          }}
        />
      ))}
    </div>
  );
};
