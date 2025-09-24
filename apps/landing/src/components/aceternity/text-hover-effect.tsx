'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface TextHoverEffectProps {
  text: string
  className?: string
  duration?: number
}

export const TextHoverEffect = ({
  text,
  className,
  duration = 0.5,
}: TextHoverEffectProps) => {
  return (
    <motion.span
      className={cn(
        'relative inline-block cursor-pointer',
        'bg-gradient-to-r from-white to-white bg-clip-text text-transparent',
        'transition-all duration-300',
        'hover:from-anbu-gold hover:via-anbu-gold-accent hover:to-anbu-gold',
        className
      )}
      whileHover={{
        scale: 1.02,
      }}
      transition={{ duration }}
    >
      {text}
      <motion.span
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration }}
      >
        <span className="absolute inset-0 blur-xl bg-gradient-to-r from-anbu-gold/20 via-anbu-gold-accent/20 to-anbu-gold/20" />
      </motion.span>
    </motion.span>
  )
}