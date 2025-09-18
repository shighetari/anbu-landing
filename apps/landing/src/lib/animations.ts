// I'm creating reusable animation variants for Framer Motion

export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0 
  },
  transition: {
    duration: 0.5,
    ease: 'easeOut'
  }
}

export const fadeInDown = {
  initial: { 
    opacity: 0, 
    y: -20 
  },
  animate: { 
    opacity: 1, 
    y: 0 
  },
  transition: {
    duration: 0.5,
    ease: 'easeOut'
  }
}

export const fadeInLeft = {
  initial: { 
    opacity: 0, 
    x: -30 
  },
  animate: { 
    opacity: 1, 
    x: 0 
  },
  transition: {
    duration: 0.5,
    ease: 'easeOut'
  }
}

export const fadeInRight = {
  initial: { 
    opacity: 0, 
    x: 30 
  },
  animate: { 
    opacity: 1, 
    x: 0 
  },
  transition: {
    duration: 0.5,
    ease: 'easeOut'
  }
}

export const scaleIn = {
  initial: { 
    opacity: 0, 
    scale: 0.8 
  },
  animate: { 
    opacity: 1, 
    scale: 1 
  },
  transition: {
    duration: 0.5,
    ease: 'easeOut'
  }
}

// Stagger children animations - perfect for lists
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

export const staggerItem = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0 
  }
}

// Hover animations
export const hoverScale = {
  whileHover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  whileTap: { 
    scale: 0.95 
  }
}

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}

// Page transitions
export const pageTransition = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}