"use client"

import { cn } from "@/lib/cn"
import React, { useRef, useState, useCallback, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useScrolling } from "@/hooks/useScrolling"

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isScrolling = useScrolling()
  const rafRef = useRef<number | undefined>(undefined)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Reduced stiffness for smoother interaction
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 35 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 35 })

  // Reset card position when scrolling
  useEffect(() => {
    if (isScrolling) {
      setIsHovered(false)
      x.set(0)
      y.set(0)
    }
  }, [isScrolling, x, y])

  // Reduced rotation range for less aggressive movement
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Don't track mouse during scroll - completely disable
    if (isScrolling) {
      x.set(0)
      y.set(0)
      return
    }

    if (!ref.current) return

    // Direct update without RAF
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }, [isScrolling, x, y])

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div
      className={cn("relative", containerClassName)}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
          willChange: "transform",
          contain: "layout style paint"
        }}
        className={cn(
          "relative",
          className
        )}
      >
        <div
          style={{
            transform: "translateZ(50px)", // Reduced from 75px for better performance
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "h-full w-full [transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardItem = ({
  as: Component = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  [key: string]: any
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Component
      ref={ref}
      className={cn("w-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
          : `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`,
        transition: "all 0.2s ease",
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}