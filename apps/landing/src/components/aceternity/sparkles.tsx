"use client"

import React, { useId, useMemo } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { deterministicRandom, hashStringToNumber } from "@/lib/random"

interface SparklesProps {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  className?: string
  particleColor?: string
}

export const SparklesCore = (props: SparklesProps) => {
  const {
    id,
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 100,
    className,
    particleColor = "#FFD700",
  } = props
  const generatedId = useId()
  const internalId = id || generatedId
  const prefersReducedMotion = useReducedMotion()
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { margin: '-10% 0px' })
  const baseSeed = useMemo(() => hashStringToNumber(internalId), [internalId])

  const effectiveDensity = useMemo(() => {
    if (prefersReducedMotion) {
      return 0
    }
    return Math.min(particleDensity, 18)
  }, [particleDensity, prefersReducedMotion])

  const particles = useMemo(() => {
    if (!effectiveDensity) {
      return []
    }

    const valueForIndex = (index: number, offset: number) =>
      deterministicRandom(baseSeed + index * 131 + offset)

    return Array.from({ length: effectiveDensity }, (_, index) => ({
      id: index,
      x: valueForIndex(index, 1) * 100,
      y: valueForIndex(index, 2) * 100,
      size: valueForIndex(index, 3) * (maxSize - minSize) + minSize,
      delay: valueForIndex(index, 4) * 5,
      duration: valueForIndex(index, 5) * 6 + 8,
    }))
  }, [effectiveDensity, maxSize, minSize, baseSeed])

  if (!particles.length) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        contain: 'layout style paint',
        willChange: 'transform'
      }}
      aria-hidden
    >
      {isInView && (
        <svg
          className="absolute inset-0 h-full w-full"
          style={{ background }}
        >
          <defs>
            <filter id={`sparkle-${internalId}`}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
          </defs>
          {particles.map((particle) => (
            <motion.circle
              key={particle.id}
              cx={`${particle.x}%`}
              cy={`${particle.y}%`}
              r={particle.size}
              fill={particleColor}
              filter={`url(#sparkle-${internalId})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>
      )}
    </div>
  )
}

export const Sparkles = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<SparklesProps & { className?: string }>) => {
  return (
    <div className={cn("relative", className)}>
      <SparklesCore {...props} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
