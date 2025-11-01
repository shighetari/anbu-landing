import React from 'react'
import { cn } from '@/lib/utils'

// I'm creating a responsive container for consistent spacing
interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export default function Container({
  children,
  className,
  size = 'lg'
}: ContainerProps) {
  const sizeValues = {
    sm: '48rem',   // 768px
    md: '64rem',   // 1024px
    lg: '80rem',   // 1280px
    xl: '90rem',   // 1440px
    full: '100%'
  }

  return (
    <div
      className={cn('w-full', className)}
      style={{
        maxWidth: `min(${sizeValues[size]}, 100vw)`,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 'clamp(1rem, 2vw, 2rem)',
        paddingRight: 'clamp(1rem, 2vw, 2rem)',
      }}
    >
      {children}
    </div>
  )
}