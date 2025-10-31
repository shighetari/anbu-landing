import { useEffect } from 'react'

/**
 * Hook that locks body scroll when enabled
 */
export function useLockBodyScroll(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return

    // Save original body style
    const originalStyle = window.getComputedStyle(document.body).overflow
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight

    // Calculate scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    // Lock body scroll and add padding to prevent layout shift
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    // Cleanup
    return () => {
      document.body.style.overflow = originalStyle
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [enabled])
}