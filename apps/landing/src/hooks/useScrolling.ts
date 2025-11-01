import { useEffect, useState, useRef } from 'react'

/**
 * Hook that detects when the user is scrolling
 * Returns true during scroll and for 150ms after scroll stops
 */
export function useScrolling() {
  const [isScrolling, setIsScrolling] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(timeoutRef.current)

      // Reset after scroll stops
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return isScrolling
}