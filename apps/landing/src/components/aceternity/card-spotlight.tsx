'use client'

import { useMotionValue, motion, useMotionTemplate } from 'framer-motion'
import React, { MouseEvent as ReactMouseEvent, useState } from 'react'
import { cn } from '@/lib/utils'

export const CardSpotlight = ({
  children,
  radius = 350,
  color = '#FFD700',
  className,
  ...props
}: {
  radius?: number
  color?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn(
        'group/spotlight relative rounded-xl border border-white/10 bg-black/50 p-6',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              ${color}20,
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}