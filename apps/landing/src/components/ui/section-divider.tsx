'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'dots' | 'gradient' | 'wave'
  className?: string
}

export function SectionDivider({ variant = 'gradient', className = '' }: SectionDividerProps) {
  if (variant === 'dots') {
    return (
      <div className={`relative w-full h-px ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-anbu-gold/30 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'wave') {
    return (
      <div className={`relative w-full h-32 overflow-hidden ${className}`}>
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <motion.path
            fill="url(#waveGradient)"
            fillOpacity="1"
            animate={{
              d: [
                "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,213.3C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,181.3C960,160,1056,128,1152,133.3C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  // Default gradient variant
  return (
    <div className={`relative w-full ${className}`}>
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-anbu-gold/30 to-transparent"
        animate={{
          opacity: [0.3, 1, 0.3],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}