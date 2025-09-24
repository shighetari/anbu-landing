'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import ArchSVG from '@/assets/icons/arch/arch.svg'

interface ArchIconProps extends React.SVGProps<SVGSVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
}

export const ArchIcon: React.FC<ArchIconProps> = ({
  size = 'md',
  className,
  ...props
}) => {
  return (
    <ArchSVG
      className={cn(sizeClasses[size], 'flex-shrink-0', className)}
      fill="currentColor"
      {...props}
    />
  )
}

export default ArchIcon