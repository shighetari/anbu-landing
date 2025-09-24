'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SparklesTextProps {
  text: string
  className?: string
  sparkleColor?: string
  sparklesCount?: number
}

interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const DEFAULT_COLOR = '#FFD700'

function SparklesText({
  text,
  className = '',
  sparkleColor = DEFAULT_COLOR,
  sparklesCount = 10,
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const generateSparkle = (): Sparkle => ({
      id: String(Date.now() + Math.random()),
      x: `${random(0, 100)}%`,
      y: `${random(0, 100)}%`,
      color: sparkleColor,
      delay: random(0, 1),
      scale: random(0.2, 1),
      lifespan: random(0.5, 1.5),
    })

    const interval = setInterval(() => {
      setSparkles((currentSparkles) => {
        const now = Date.now()
        const newSparkles = currentSparkles.filter(
          (sparkle) => parseFloat(sparkle.id) > now - sparkle.lifespan * 2000
        )

        if (newSparkles.length < sparklesCount) {
          newSparkles.push(generateSparkle())
        }

        return newSparkles
      })
    }, 200)

    return () => clearInterval(interval)
  }, [sparklesCount, sparkleColor])

  return (
    <span className={cn('relative inline-block', className)}>
      <span className="relative">
        {text}
        <span
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <AnimatePresence>
            {sparkles.map((sparkle) => (
              <motion.svg
                key={sparkle.id}
                className="absolute h-4 w-4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, sparkle.scale, 0],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: sparkle.lifespan,
                  delay: sparkle.delay,
                  ease: 'easeInOut',
                }}
                style={{
                  left: sparkle.x,
                  top: sparkle.y,
                  color: sparkle.color,
                }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0l3.09 6.26L22 7.27l-5 4.87L18.18 19 12 15.77 5.82 19 7 12.14 2 7.27l6.91-1.01L12 0z" />
              </motion.svg>
            ))}
          </AnimatePresence>
        </span>
      </span>
    </span>
  )
}

export default SparklesText