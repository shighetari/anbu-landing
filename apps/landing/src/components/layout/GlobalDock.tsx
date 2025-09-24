'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { FloatingDock } from '@/components/aceternity/floating-dock'
import { cn } from '@/lib/utils'

interface DockItem {
  title: string
  icon: ReactNode
  href: string
}

interface GlobalDockProps {
  items: DockItem[]
  className?: string
  desktopClassName?: string
  mobileClassName?: string
}

export function GlobalDock({
  items,
  className,
  desktopClassName,
  mobileClassName,
}: GlobalDockProps) {
  const pathname = usePathname()

  if (pathname?.startsWith('/social-hub')) {
    return null
  }

  return (
    <div className={cn('pointer-events-none fixed bottom-6 left-0 right-0 z-40 flex justify-center', className)}>
      <div className="pointer-events-auto">
        <FloatingDock
          desktopClassName={desktopClassName}
          mobileClassName={mobileClassName}
          items={items}
        />
      </div>
    </div>
  )
}
