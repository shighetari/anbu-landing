'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Spark = {
  id: number;
  x: number;
  y: number;
};

/**
 * Lightweight click feedback inspired by React Bits "click-spark" animation.
 * Spawns a short lived spark burst wherever the user interacts with the page.
 */
export function ClickSparkOverlay() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const id = Date.now() + Math.random();
      setSparks((current) => [
        ...current,
        {
          id,
          x: event.clientX,
          y: event.clientY,
        },
      ]);

      window.setTimeout(() => {
        setSparks((current) => current.filter((spark) => spark.id !== id));
      }, 500);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[75] overflow-hidden">
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.span
            key={spark.id}
            initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
            animate={{ opacity: 0.9, scale: 1, rotate: 35 }}
            exit={{ opacity: 0, scale: 0.2, rotate: 65 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2"
            style={{ left: spark.x, top: spark.y }}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFD700] via-[#FFED4E] to-[#FFA500] opacity-60 blur-[2px]" />
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-[15deg] bg-gradient-to-br from-[#FFF7C2] to-[#FFB347] [clip-path:polygon(50%_0%,63%_35%,100%_38%,72%_59%,82%_95%,50%_75%,18%_95%,28%_59%,0%_38%,37%_35%)]" />
            <span className="absolute left-1/2 top-1/2 h-8 w-[1px] -translate-x-1/2 -translate-y-full bg-gradient-to-b from-transparent via-[#FFD700] to-transparent" />
            <span className="absolute left-1/2 top-1/2 h-[1px] w-8 -translate-x-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
