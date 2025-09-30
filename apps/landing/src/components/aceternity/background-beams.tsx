"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/cn"

export const BackgroundBeams = React.memo(({ className }: { className?: string }) => {
  // Reduced number of beams for better performance
  const beams = [
    { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: 600, translateX: 600, duration: 3, repeatDelay: 3, delay: 4 },
    { initialX: 100, translateX: 100, duration: 7, repeatDelay: 7, className: "h-6" },
    { initialX: 800, translateX: 800, duration: 11, repeatDelay: 2, className: "h-20" },
  ]

  return (
    <div
      className={cn(
        "absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden pointer-events-none",
        className
      )}
      style={{
        contain: 'layout style paint',
        willChange: 'transform'
      }}
    >
      {beams.map((beam, index) => (
        <div
          key={`beam-${index}`}
          className="absolute inset-0 flex h-full w-full items-center justify-center"
        >
          <Beam {...beam} />
        </div>
      ))}
    </div>
  )
})

BackgroundBeams.displayName = 'BackgroundBeams'

const Beam = React.memo(({
  initialX,
  translateX,
  duration,
  repeatDelay = 0,
  delay = 0,
  className,
}: {
  initialX: number
  translateX: number
  duration: number
  repeatDelay?: number
  delay?: number
  className?: string
}) => {
  return (
    <motion.div
      initial={{ x: initialX, opacity: 0 }}
      animate={{
        x: translateX,
        opacity: [0, 1, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatDelay,
        delay,
        ease: "linear",
      }}
      className={cn(
        "absolute left-0 top-1/2 h-10 w-px -translate-y-1/2 bg-gradient-to-t from-transparent via-anbu-gold/50 to-transparent blur-sm",
        className
      )}
    />
  )
})

Beam.displayName = 'Beam'