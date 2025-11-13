import { useCallback, useEffect, useState } from 'react'

/**
 * Hook that traps focus within a container
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(enabled: boolean = true) {
  const [container, setContainer] = useState<T | null>(null)

  useEffect(() => {
    if (!enabled || !container) {
      return
    }

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) {
      return
    }

    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault()
          lastFocusable?.focus()
        }
        return
      }

      if (document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable?.focus()
      }
    }

    firstFocusable?.focus()
    container.addEventListener('keydown', handleTabKey)

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [container, enabled])

  return useCallback((node: T | null) => {
    setContainer(node ?? null)
  }, [])
}
