'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

import { cn } from '@/lib/utils'

interface AnimatedTooltipProps {
  label: string
  children: ReactNode
  className?: string
}

export function AnimatedTooltip({ label, children, className }: AnimatedTooltipProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-anbu-gold shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
