"use client"

import React, { useId, useEffect, useState } from "react"
import { motion } from "framer-motion"
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

  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < particleDensity; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (maxSize - minSize) + minSize,
          delay: Math.random() * 5,
          duration: Math.random() * 20 + 10,
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
  }, [particleDensity, minSize, maxSize])

  return (
    <div className={cn("absolute inset-0", className)}>
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
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
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