'use client'

import { useEffect } from 'react'

/**
 * Component that ensures clean scroll behavior across page navigation
 * I'm adding this to fix any lingering scroll restrictions from other pages
 */
export function ScrollReset() {
  useEffect(() => {
    // Clear any stuck scroll styles on mount
    const clearScrollStyles = () => {
      document.body.style.overflow = ''
      document.body.style.overscrollBehaviorY = ''
      document.body.style.touchAction = ''
      document.body.style.paddingRight = ''
    }

    clearScrollStyles()

    // Ensure cleanup on unmount
    return () => {
      clearScrollStyles()
    }
  }, [])

  return null
}
