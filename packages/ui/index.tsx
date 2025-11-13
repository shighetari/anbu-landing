import * as React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition'
    const variants: Record<ButtonProps['variant'], string> = {
      primary: 'bg-[#FFD700] text-[#0B0500] hover:bg-[#FFED4E]',
      secondary: 'border border-[#FFD700] text-[#FFD700] hover:border-[#FFED4E] hover:text-[#FFED4E]',
    }

    return (
      <button ref={ref} className={`${baseStyles} ${variants[variant]} ${className}`.trim()} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export const tokens = {
  colors: {
    black: '#000000',
    gold: '#FFD700',
    goldAccent: '#FFA500',
  },
} as const
