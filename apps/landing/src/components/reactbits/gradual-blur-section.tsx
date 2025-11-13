"use client"

import { motion, useInView } from "framer-motion"
import { PropsWithChildren, useRef } from "react"

import { cn } from "@/lib/utils"

interface GradualBlurSectionProps extends PropsWithChildren<{}> {
  className?: string
  id?: string
}

/**
 * Section wrapper that applies a gentle blur and fade as it enters the viewport.
 * Inspired by React Bits "gradual-blur" animation.
 */
export function GradualBlurSection({ children, className, id }: GradualBlurSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, filter: "blur(18px)" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={cn("relative", className)}
    >
      {children}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-transparent to-transparent opacity-50"
        aria-hidden="true"
      />
    </motion.section>
  )
}
