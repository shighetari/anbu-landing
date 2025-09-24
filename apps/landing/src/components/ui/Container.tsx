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
    sm: '768px',
    md: '1024px',
    lg: '1280px',
    xl: '1440px',
    full: '100%'
  }

  return (
    <div
      className={cn('w-full', className)}
      style={{
        maxWidth: sizeValues[size],
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      {children}
    </div>
  )
}