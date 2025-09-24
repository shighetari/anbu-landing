'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiProps {
  isActive: boolean
  duration?: number
}

export const Confetti = ({ isActive, duration = 3000 }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; color: string }>>([])

  useEffect(() => {
    if (isActive) {
      const colors = ['#FFD700', '#FFA500', '#FF6347', '#FFE27A', '#FFB347']
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)]
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        setParticles([])
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isActive, duration])

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1
          }}
          animate={{
            x: (Math.random() - 0.5) * 500,
            y: (Math.random() - 0.5) * 500,
            scale: Math.random() * 2 + 0.5,
            opacity: 0,
            rotate: Math.random() * 360
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            ease: "easeOut"
          }}
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            left: '50%',
            top: '50%',
            zIndex: 100
          }}
        />
      ))}
    </AnimatePresence>
  )
}