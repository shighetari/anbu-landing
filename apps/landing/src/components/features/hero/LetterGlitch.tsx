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

    // Track canvas metrics so we don't recalculate window globals in the draw loop
    let devicePixelRatio = 1
    let fontSize = 14
    let columns = 0
    let rows = 0

    const chars = 'ANBU◆◇○●□■△▽♦♠♣♥∞αβγδεζηθικλμνξοπρστυφχψω01234567890'

    interface Letter {
      char: string
      opacity: number
      color: string
      changeTime: number
      speed: number
    }

    let letters: Letter[][] = []

    const createLetter = (): Letter => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      opacity: 0.1 + Math.random() * 0.2,
      color: ['#FFD700', '#FFA500', '#FFD70080', '#FFFFFF20'][Math.floor(Math.random() * 4)],
      changeTime: Date.now() + Math.random() * 5000,
      speed: 0.5 + Math.random() * 2,
    })

    const configureGrid = () => {
      const cssWidth = canvas.clientWidth || window.innerWidth
      const cssHeight = canvas.clientHeight || window.innerHeight
      const isMobile = cssWidth < 768
      fontSize = isMobile ? 18 : 14
      columns = Math.max(1, Math.floor(cssWidth / fontSize))
      rows = Math.max(1, Math.floor(cssHeight / fontSize))

      letters = Array.from({ length: columns }, () =>
        Array.from({ length: rows }, () => createLetter()),
      )
    }

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      devicePixelRatio = dpr
      const cssWidth = window.innerWidth
      const cssHeight = window.innerHeight

      canvas.width = Math.floor(cssWidth * dpr)
      canvas.height = Math.floor(cssHeight * dpr)
      canvas.style.width = `${cssWidth}px`
      canvas.style.height = `${cssHeight}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      configureGrid()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let lastTime = 0
    const targetFPS = () => (fontSize > 16 ? 30 : 60)

    const animate = (currentTime: number = 0) => {
      const frameInterval = 1000 / targetFPS()
      const deltaTime = currentTime - lastTime

      if (deltaTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastTime = currentTime - (deltaTime % frameInterval)

      const cssWidth = canvas.width / devicePixelRatio
      const cssHeight = canvas.height / devicePixelRatio

      ctx.clearRect(0, 0, cssWidth, cssHeight)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, cssWidth, cssHeight)

      ctx.font = `${fontSize}px monospace`
      const now = Date.now()

      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
          const letter = letters[columnIndex]?.[rowIndex]
          if (!letter) continue

          if (now > letter.changeTime) {
            letter.char = chars[Math.floor(Math.random() * chars.length)]
            letter.changeTime = now + (Math.random() * 5000) / letter.speed
            letter.opacity = 0.1 + Math.random() * 0.2
            letter.color = ['#FFD700', '#FFA500', '#FFD70080', '#FFFFFF20'][
              Math.floor(Math.random() * 4)
            ]
          }

          ctx.fillStyle = letter.color
          ctx.globalAlpha = letter.opacity
          ctx.fillText(letter.char, columnIndex * fontSize, rowIndex * fontSize)
        }
      }

      const gradient = ctx.createRadialGradient(
        cssWidth / 2,
        cssHeight / 2,
        0,
        cssWidth / 2,
        cssHeight / 2,
        Math.max(cssWidth, cssHeight) / 2,
      )
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.05)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)')

      ctx.globalAlpha = 1
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, cssWidth, cssHeight)

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
        style={{ background: 'transparent' }}
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}
