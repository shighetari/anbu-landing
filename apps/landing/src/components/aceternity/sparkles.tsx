"use client"

import React, { useId, useMemo } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/cn"

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
    const generated = []
    for (let i = 0; i < effectiveDensity; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        delay: Math.random() * 5,
        duration: Math.random() * 14 + 8,
      })
    }
    return generated
  }, [effectiveDensity, minSize, maxSize])

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