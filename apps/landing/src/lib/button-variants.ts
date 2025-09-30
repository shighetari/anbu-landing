import { type ShimmerButtonProps } from '@/components/ui/shimmer-button'

// Standardized button sizes with proper padding
export const buttonSizes = {
  xs: 'px-4 py-2 text-xs',
  sm: 'px-6 py-3 text-sm',
  md: 'px-8 py-4 text-sm',
  lg: 'px-10 py-5 text-base',
  xl: 'px-12 py-6 text-base',
  // Responsive sizes that adapt to screen
  responsive: {
    sm: 'px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm',
    md: 'px-8 py-4 sm:px-10 sm:py-5 text-sm sm:text-base',
    lg: 'px-10 py-5 sm:px-12 sm:py-6 lg:px-14 lg:py-7 text-sm sm:text-base lg:text-lg',
    xl: 'px-12 py-6 sm:px-14 sm:py-7 lg:px-16 lg:py-8 text-base sm:text-lg lg:text-xl',
  }
}

export const buttonVariants = {
  primary: {
    shimmerColor: '#FFD700',
    shimmerDuration: '2s',
    background: 'linear-gradient(110deg, #FFD700 0%, #FFED4E 45%, #FFD700 100%)',
    borderRadius: '0.75rem',
    className: 'shadow-2xl hover:scale-105 transition-transform font-bold uppercase tracking-[0.15em]',
  } as Partial<ShimmerButtonProps>,

  secondary: {
    shimmerColor: '#FFD700',
    shimmerDuration: '3s',
    background: 'linear-gradient(110deg, #2C2C2C 0%, #1A1A1A 45%, #2C2C2C 100%)',
    borderRadius: '0.75rem',
    className: 'shadow-2xl hover:scale-105 transition-transform font-bold uppercase tracking-[0.15em]',
  } as Partial<ShimmerButtonProps>,

  ghost: {
    shimmerColor: '#FFD700',
    shimmerDuration: '4s',
    background: 'rgba(255, 215, 0, 0.05)',
    borderRadius: '0.5rem',
    className: 'backdrop-blur-sm border border-anbu-gold/30 hover:bg-anbu-gold/10 transition-all',
  } as Partial<ShimmerButtonProps>,

  cta: {
    shimmerColor: '#FFFFFF',
    shimmerDuration: '1.5s',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    borderRadius: '1rem',
    className: 'shadow-[0_20px_50px_rgba(255,215,0,0.3)] hover:shadow-[0_30px_60px_rgba(255,215,0,0.5)] hover:scale-105 transition-all font-bold',
  } as Partial<ShimmerButtonProps>,
}

export const animationVariants = {
  buttonHover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  buttonTap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  iconHover: {
    x: 5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
}