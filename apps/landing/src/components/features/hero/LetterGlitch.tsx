'use client'

import React, { useEffect, useRef } from 'react'

interface LetterGlitchProps {
  children?: React.ReactNode
  className?: string
}

export default function LetterGlitch({ children, className = '' }: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return
    
    // I'm setting up the canvas dimensions - optimized for mobile
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2 for performance
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Characters for the glitch effect
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    // Larger font on mobile for better performance
    const isMobile = window.innerWidth < 768
    const fontSize = isMobile ? 18 : 14
    const columns = Math.floor(window.innerWidth / fontSize)
    const rows = Math.floor(window.innerHeight / fontSize)
    
    // Grid of characters
    interface Letter {
      char: string
      opacity: number
      color: string
      changeTime: number
      speed: number
    }
    
    const letters: Letter[][] = []
    
    // Initialize the letter grid
    for (let i = 0; i < columns; i++) {
      letters[i] = []
      for (let j = 0; j < rows; j++) {
        letters[i][j] = {
          char: chars[Math.floor(Math.random() * chars.length)],
          opacity: Math.random() * 0.5,
          color: ['#FFD700', '#FFA500', '#FFFFFF'][Math.floor(Math.random() * 3)],
          changeTime: Date.now() + Math.random() * 5000,
          speed: 0.5 + Math.random() * 2
        }
      }
    }
    
    // Animation loop - optimized for 30fps on mobile
    let lastTime = 0
    const targetFPS = isMobile ? 30 : 60
    const frameInterval = 1000 / targetFPS
    
    const animate = (currentTime: number = 0) => {
      const deltaTime = currentTime - lastTime
      
      if (deltaTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      
      lastTime = currentTime - (deltaTime % frameInterval)
      
      // Clear canvas with black background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      
      // Draw letters
      ctx.font = `${fontSize}px monospace`
      const now = Date.now()
      
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const letter = letters[i][j]
          
          // Update letter if it's time
          if (now > letter.changeTime) {
            letter.char = chars[Math.floor(Math.random() * chars.length)]
            letter.changeTime = now + Math.random() * 5000 / letter.speed
            letter.opacity = Math.random() * 0.5
            letter.color = ['#FFD700', '#FFA500', '#FFFFFF'][Math.floor(Math.random() * 3)]
          }
          
          // Draw the letter
          ctx.fillStyle = letter.color
          ctx.globalAlpha = letter.opacity
          ctx.fillText(letter.char, i * fontSize, j * fontSize)
        }
      }
      
      // Add vignette effect
      const gradient = ctx.createRadialGradient(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0,
        window.innerWidth / 2,
        window.innerHeight / 2,
        Math.max(window.innerWidth, window.innerHeight) / 2
      )
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)')
      
      ctx.globalAlpha = 1
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animationRef.current = requestAnimationFrame(() => animate(0))
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#000000' }}
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}