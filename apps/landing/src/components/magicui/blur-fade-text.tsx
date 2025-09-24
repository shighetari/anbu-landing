'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/cn'

interface BlurFadeTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  inView?: boolean
  duration?: number
  yOffset?: number
  blur?: string
}

export const BlurFadeText = ({
  children,
  className,
  delay = 0,
  inView = true,
  duration = 0.4,
  yOffset = 6,
  blur = '6px',
}: BlurFadeTextProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const shouldAnimate = inView ? isInView : true

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur})`,
      }}
      animate={
        shouldAnimate
          ? {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}