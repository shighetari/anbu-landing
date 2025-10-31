'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { cn } from '@/lib/cn'

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode
  containerClassName?: string
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (clientX - rect.left) / rect.width
    const y = (clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovered
          ? `translate3d(${(mousePosition.x - 0.5) * 10}px, ${
              (mousePosition.y - 0.5) * 10
            }px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm",
        containerClassName
      )}
    >
      <div
        className="relative h-full"
        style={{
          background: isHovered
            ? `radial-gradient(
                600px circle at ${mousePosition.x * 100}% ${
                mousePosition.y * 100
              }%,
                rgba(255,215,0,0.1),
                transparent 40%
              )`
            : "transparent",
        }}
      >
        <motion.div
          animate={{
            rotate: isHovered
              ? 10 * (mousePosition.x - 0.5) + "deg"
              : "0deg",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className={cn("h-full", className)}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  )
}