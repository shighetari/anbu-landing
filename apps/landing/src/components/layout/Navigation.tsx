'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

type MegaItem = {
  title: string
  description: string
  href: string
}

type NavItem = {
  label: string
  href: string
  mega?: MegaItem[]
  auxLinks?: { label: string; href: string }[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/#home',
  },
  {
    label: 'Services',
    href: '/#services',
    mega: [
      {
        title: 'Solutions Portal',
        description: 'Launch concierge experiences, automation suites, and premium workflows tailored to partners.',
        href: '/solutions-portal',
      },
      {
        title: 'Documentation Hub',
        description: 'Review architectural guides, integration patterns, and release roadmaps maintained by the studio.',
        href: '/docs-hub',
      },
      {
        title: 'Strategy Intake',
        description: 'Share current initiatives and we will map the delivery sprints, analytics, and enablement cadence.',
        href: '/#contact',
      },
    ],
    auxLinks: [
      { label: 'Success Stories', href: '/social-hub' },
      { label: 'Support Desk', href: 'mailto:contact@anbu.ai' },
    ],
  },
  {
    label: 'About',
    href: '/#about',
  },
  {
    label: 'Social Hub',
    href: '/social-hub',
  },
]

const TRANSITION = {
  type: 'spring',
  mass: 0.4,
  damping: 18,
  stiffness: 120,
}

export default function Navigation() {
  const pathname = usePathname()
  const [active, setActive] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [y, setY] = useState(0)

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 24)
      setY(scrollY)
    }
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const handleNavigate = () => {
    setMobileOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-4 z-[55] flex justify-center px-4 transition-all duration-500',
        isScrolled ? 'top-2' : 'top-4',
      )}
    >
      <nav
        onMouseLeave={() => setActive(null)}
        className={cn(
          'will-change-transform',
          'relative flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-white/15 bg-black/65 px-5 py-3.5 shadow-[0_16px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors duration-500 sm:px-7',
          isScrolled && 'border-white/15 bg-black/70 shadow-[0_16px_80px_rgba(0,0,0,0.55)]',
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-[0.4em] text-anbu-gold transition hover:text-anbu-gold/80"
        >
          <span className="h-2 w-2 rounded-full bg-anbu-gold shadow-[0_0_12px_rgba(255,215,0,0.75)]" />
          ANBU
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <DesktopMenuItem
                key={item.label}
                item={item}
                active={active}
                setActive={setActive}
              />
            ))}
          </div>
          <Link
            href="/#contact"
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#FFD700]/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-anbu-gold transition hover:border-[#FFC347] hover:text-[#FFC347]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FFD7001a] via-[#FFB3471a] to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
            <span className="relative z-10">Start A Project</span>
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-anbu-gold md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 top-[calc(100%+0.75rem)] z-40 w-[min(92vw,380px)] -translate-x-1/2 md:hidden"
              >
                <div className="space-y-4 rounded-3xl border border-white/12 bg-black/90 p-6 shadow-[0_32px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.label} className="space-y-3">
                      <Link
                        href={item.href}
                        onClick={handleNavigate}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-anbu-marble transition hover:border-[#FFD700]/25 hover:bg-white/10"
                      >
                        {item.label}
                        <span className="text-[10px] uppercase tracking-[0.28em] text-anbu-gold/70">Go</span>
                      </Link>
                      {item.mega ? (
                        <div className="space-y-2 border-l border-white/10 pl-4">
                          {item.mega.map((mega) => (
                            <Link
                              key={mega.title}
                              href={mega.href}
                              onClick={handleNavigate}
                              className="block rounded-lg px-2 py-1 text-sm text-white/70 transition hover:text-white"
                            >
                              <span className="block text-sm font-medium text-white">{mega.title}</span>
                              <span className="text-xs leading-relaxed text-white/55">{mega.description}</span>
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  <Link
                    href="/#contact"
                    onClick={handleNavigate}
                    className="flex items-center justify-center rounded-full bg-anbu-gold px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(255,215,0,0.35)] transition hover:bg-anbu-gold-accent"
                  >
                    Start A Project
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

function DesktopMenuItem({
  item,
  active,
  setActive,
}: {
  item: NavItem
  active: string | null
  setActive: (value: string | null) => void
}) {
  const isActive = active === item.label
  const hasMega = item.mega && item.mega.length > 0

  return (
    <div
      className="relative"
      onMouseEnter={() => hasMega && setActive(item.label)}
      onMouseLeave={() => hasMega && setActive(null)}
    >
      <Link
        href={item.href}
        className={cn(
          'group relative inline-flex items-center rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70 transition-colors hover:bg-white/5 hover:text-anbu-gold',
          isActive && 'bg-white/5 text-anbu-gold',
        )}
      >
        <motion.span
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          className="inline-flex items-center"
        >
          {item.label}
        </motion.span>
        <span className="absolute inset-x-0 -bottom-1 h-[2px] origin-center scale-x-0 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFB347] transition-transform duration-300 group-hover:scale-x-100" />
      </Link>

      <AnimatePresence>
        {hasMega && isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={TRANSITION}
            className="absolute left-1/2 top-[calc(100%+0.75rem)] z-40 w-[min(90vw,420px)] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-black/92 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
                {item.mega?.map((mega) => (
                  <Link
                    key={mega.title}
                    href={mega.href}
                    className="group flex h-full flex-col justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.05] p-4 transition hover:border-[#FFD700]/35 hover:bg-white/[0.08]"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-white">{mega.title}</span>
                      <span className="text-xs leading-relaxed text-white/60">{mega.description}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-anbu-gold/70 transition group-hover:text-anbu-gold">
                      Explore
                    </span>
                  </Link>
                ))}
              </div>
              {item.auxLinks && item.auxLinks.length > 0 ? (
                <div className="flex flex-wrap gap-2 border-t border-white/5 bg-black/70 px-4 py-3">
                  {item.auxLinks.map((aux) => (
                    <Link
                      key={aux.label}
                      href={aux.href}
                      className="rounded-full border border-transparent px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/50 transition hover:border-anbu-gold/30 hover:text-anbu-gold"
                    >
                      {aux.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
