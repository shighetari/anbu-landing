import React from 'react'
import { cn } from '@/lib/utils'

interface IconWrapperProps extends React.SVGProps<SVGSVGElement> {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  size = 'md',
  className,
  ...props
}) => {
  return (
    <div className={cn(sizeClasses[size], 'flex-shrink-0', className)}>
      {React.cloneElement(children as React.ReactElement<any>, {
        className: 'w-full h-full',
        fill: 'currentColor',
      })}
    </div>
  )
}