'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import {
  IconRocket,
  IconBook,
  IconChartLine,
  IconStar,
  IconHeadset,
  IconBrandCodesandbox
} from '@tabler/icons-react'
import { useEffect, useState, useRef } from 'react'

import { cn } from '@/lib/utils'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useFocusTrap } from '@/hooks/useFocusTrap'

type MegaItem = {
  title: string
  description: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  gradient: string
  bgGradient: string
  category?: string
}

type NavItem = {
  label: string
  href: string
  mega?: MegaItem[]
  auxLinks?: {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    gradient?: string
  }[]
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
        description: 'Automation & workflows',
        href: '/solutions-portal',
        icon: IconRocket,
        gradient: 'from-purple-500 to-pink-500',
        bgGradient: 'from-purple-500/10 via-purple-500/5 to-pink-500/10',
        category: 'Launch',
      },
      {
        title: 'Documentation Hub',
        description: 'Guides & roadmaps',
        href: '/docs-hub',
        icon: IconBook,
        gradient: 'from-cyan-500 to-teal-500',
        bgGradient: 'from-cyan-500/10 via-cyan-500/5 to-teal-500/10',
        category: 'Learn',
      },
      {
        title: 'Marketing Suite',
        description: 'Brand & growth tools',
        href: '/social-hub',
        icon: IconBrandCodesandbox,
        gradient: 'from-emerald-500 to-green-500',
        bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-green-500/10',
        category: 'Grow',
      },
      {
        title: 'Strategy Intake',
        description: 'Project planning',
        href: '/#contact',
        icon: IconChartLine,
        gradient: 'from-amber-500 to-yellow-500',
        bgGradient: 'from-amber-500/10 via-amber-500/5 to-yellow-500/10',
        category: 'Plan',
      },
    ],
    auxLinks: [
      {
        label: 'Success Stories',
        href: '/social-hub',
        icon: IconStar,
        gradient: 'from-green-500 to-emerald-500'
      },
      {
        label: 'Support Desk',
        href: 'mailto:contact@anbu.ai',
        icon: IconHeadset,
        gradient: 'from-red-500 to-rose-500'
      },
    ],
  },
  {
    label: 'About',
    href: '/#about',
  },
  {
    label: 'Marketing Studio',
    href: '/social-hub',
  },
]

const TRANSITION = {
  type: 'spring',
  mass: 0.8,
  damping: 30,
  stiffness: 300,
}

const STAGGER_DELAY = 0.05

export default function Navigation() {
  const pathname = usePathname()
  const [active, setActive] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [y, setY] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const prevY = useRef(0)

  // Custom hooks for mobile menu
  const mobileMenuRef = useClickOutside<HTMLDivElement>(() => setMobileOpen(false), mobileOpen)
  const focusTrapRef = useFocusTrap<HTMLDivElement>(mobileOpen)
  useLockBodyScroll(mobileOpen)

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 24)
      const velocity = scrollY - prevY.current
      setScrollVelocity(velocity)
      prevY.current = scrollY
      setY(scrollY)
    }
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

  const handleNavigate = () => {
    setMobileOpen(false)
  }

  return (
    <motion.header
      className={cn(
        'fixed inset-x-0 z-[55] flex justify-center px-4 transition-all duration-500 fluid-top-nav',
        isScrolled && 'translate-y-[-0.25rem]',
      )}
      style={{
        backdropFilter: `blur(${isScrolled ? 20 : 16}px)`,
      }}
      animate={{
        y: scrollVelocity > 10 && isScrolled ? -100 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.nav
        onMouseLeave={() => setActive(null)}
        className={cn(
          'will-change-transform',
          'relative flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border border-white/15 bg-black/65 px-4 lg:px-6 py-2 lg:py-3 shadow-[0_16px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500',
          isScrolled && 'border-white/15 bg-black/70 shadow-[0_16px_80px_rgba(0,0,0,0.55)]',
        )}
        animate={{
          scale: isScrolled ? 0.98 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-anbu-gold transition-all duration-300 hover:text-anbu-gold/90 hover:scale-105"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-anbu-gold shadow-[0_0_15px_rgba(255,215,0,0.8)]" />
          ANBU
        </Link>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2 lg:gap-3">
            {NAV_ITEMS.map((item) => (
              <DesktopMenuItem
                key={item.label}
                item={item}
                active={active}
                setActive={setActive}
              />
            ))}
          </div>
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 25px rgba(255,215,0,0.25)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Link
              href="/#contact"
              className="relative inline-flex items-center gap-1 overflow-hidden rounded-full border border-[#FFD700]/60 px-5 lg:px-7 py-2 lg:py-2.5 text-xs font-semibold uppercase tracking-[0.12em] lg:tracking-[0.15em] text-anbu-gold transition-colors duration-300 hover:border-[#FFC347] hover:text-[#FFC347] ml-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFD7001a] via-[#FFB3471a] to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              <span className="relative z-10">Start A Project</span>
            </Link>
          </motion.div>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-anbu-gold transition-all duration-300 hover:border-anbu-gold/40 hover:bg-anbu-gold/10 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
              />
              <motion.div
                ref={(el) => {
                  if (el) {
                    (mobileMenuRef as any).current = el;
                    (focusTrapRef as any).current = el;
                  }
                }}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  duration: 0.3
                }}
                className="absolute left-1/2 top-[calc(100%+0.75rem)] z-40 w-[min(92vw,380px)] -translate-x-1/2 md:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
              >
                <div className="fluid-space-y-md rounded-3xl border border-white/12 bg-black/95 fluid-p-lg shadow-[0_32px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="fluid-space-y-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavigate}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 fluid-px-lg fluid-py-md fluid-text-sm font-medium text-anbu-marble transition-all duration-300 hover:border-[#FFD700]/25 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {item.label}
                        <span className="fluid-text-xs uppercase tracking-[0.2em] lg:tracking-[0.28em] text-anbu-gold/70">Go</span>
                      </Link>
                      {item.mega ? (
                        <div className="space-y-3 border-l border-white/10 pl-4 mt-3">
                          {item.mega.map((mega) => {
                            const IconComponent = mega.icon
                            return (
                              <Link
                                key={mega.title}
                                href={mega.href}
                                onClick={handleNavigate}
                                className={cn(
                                  "group relative block rounded-lg px-4 py-3 transition-all duration-300",
                                  "hover:scale-[1.02] hover:bg-white/5",
                                  "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1"
                                )}
                                aria-label={`${mega.title} - ${mega.description}`}
                                role="menuitem"
                              >
                                <div className="flex items-start gap-3">
                                  {IconComponent && (
                                    <div className={cn(
                                      "rounded-md p-1 bg-gradient-to-br transition-transform duration-300",
                                      "group-hover:scale-110",
                                      mega.gradient
                                    )}>
                                      <IconComponent className="h-3 w-3 text-white" />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="block text-sm font-medium text-white group-hover:text-white transition-colors">
                                        {mega.title}
                                      </span>
                                      {mega.category && (
                                        <span className={cn(
                                          "inline-flex items-center justify-center px-3 py-1 rounded-full",
                                          "min-w-[60px] text-[10px] font-semibold uppercase tracking-wider",
                                          "bg-gradient-to-r text-white/90 transition-all duration-300",
                                          mega.gradient
                                        )}>
                                          {mega.category}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-xs leading-relaxed text-white/55 group-hover:text-white/70 transition-colors line-clamp-2">
                                      {mega.description}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      ) : null}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: NAV_ITEMS.length * 0.05 + 0.1 }}
                  >
                    <Link
                      href="/#contact"
                      onClick={handleNavigate}
                      className="flex items-center justify-center rounded-full bg-anbu-gold fluid-px-lg fluid-py-sm fluid-text-sm font-semibold text-black shadow-[0_12px_30px_rgba(255,215,0,0.35)] transition-all duration-300 hover:bg-anbu-gold-accent hover:scale-[1.05] active:scale-[0.95]"
                    >
                      Start A Project
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
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
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    // Open menu if it has mega items
    if (hasMega) {
      setActive(item.label)
    }
  }

  const handleMouseLeave = () => {
    if (hasMega) {
      // Add 300ms delay before closing
      closeTimeoutRef.current = setTimeout(() => {
        setActive(null)
      }, 300)
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative mx-1 lg:mx-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={cn(
          'group relative inline-flex items-center rounded-full px-4 lg:px-6 py-2 lg:py-2.5 text-xs font-semibold uppercase tracking-[0.12em] lg:tracking-[0.15em] text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-anbu-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]',
          isActive && 'bg-white/5 text-anbu-gold',
        )}
      >
        <motion.span
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="inline-flex items-center"
        >
          {item.label}
        </motion.span>
        <span className="absolute inset-x-0 -bottom-1 h-[2px] origin-center scale-x-0 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFB347] transition-transform duration-300 group-hover:scale-x-100" />
      </Link>

      {/* Invisible bridge to maintain hover state */}
      {hasMega && isActive && (
        <div className="absolute top-full left-0 right-0 h-3 z-30" />
      )}

      <AnimatePresence>
        {hasMega && isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={TRANSITION}
            className="absolute left-1/2 top-[calc(100%+0.5rem)] z-40 w-[min(92vw,clamp(400px,45vw,580px))] -translate-x-1/2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="menu"
            aria-label={`${item.label} submenu`}
          >
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-black/92 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              <motion.div
                className="grid gap-4 p-6 sm:grid-cols-2 lg:gap-5 lg:p-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: STAGGER_DELAY
                    }
                  }
                }}
              >
                {item.mega?.map((mega, idx) => {
                  const IconComponent = mega.icon
                  return (
                    <motion.div
                      key={mega.title}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 25
                          }
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                    <Link
                      href={mega.href}
                      className={cn(
                        "group relative flex h-full flex-col justify-between gap-4 rounded-xl",
                        "border border-white/[0.08] bg-white/[0.05] p-5 lg:p-6",
                        "min-h-[140px] lg:min-h-[160px]",
                        "transition-all duration-300",
                        "hover:border-white/20 hover:bg-white/[0.08]",
                        "hover:shadow-lg backdrop-blur-sm",
                        "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                      )}
                      aria-label={`${mega.title} - ${mega.description}`}
                      role="menuitem"
                    >
                      {/* Background gradient */}
                      <div className={cn(
                        "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        mega.bgGradient
                      )} />

                      {/* Category badge */}
                      <div className="relative flex items-center justify-center">
                        <span className={cn(
                          "inline-flex items-center justify-center gap-1 rounded-full px-5 lg:px-6 py-2",
                          "min-w-[80px] text-[11px] lg:text-xs font-semibold uppercase tracking-widest",
                          "bg-gradient-to-r text-white/90 transition-all duration-300",
                          "hover:scale-105 hover:shadow-lg",
                          mega.gradient
                        )}>
                          {mega.category}
                        </span>
                        {IconComponent && (
                          <div className={cn(
                            "absolute top-0 right-0 rounded-lg p-1.5 bg-gradient-to-br transition-transform duration-300",
                            "group-hover:scale-110 group-hover:rotate-6",
                            mega.gradient
                          )}>
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="relative flex flex-col gap-2 text-center">
                        <span className="text-sm lg:text-base font-semibold text-white group-hover:text-white transition-colors">
                          {mega.title}
                        </span>
                        <span className="text-xs lg:text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors line-clamp-2">
                          {mega.description}
                        </span>
                      </div>

                      <div className="relative flex items-center justify-center gap-2">
                        <span className={cn(
                          "text-xs uppercase tracking-[0.2em] lg:tracking-[0.28em] font-medium",
                          "bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300",
                          mega.gradient,
                          "group-hover:tracking-[0.3em]"
                        )}>
                          Explore
                        </span>
                        <div className={cn(
                          "h-1 w-8 rounded-full bg-gradient-to-r transition-all duration-300",
                          "group-hover:w-12",
                          mega.gradient
                        )} />
                      </div>
                    </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
              {item.auxLinks && item.auxLinks.length > 0 ? (
                <motion.div
                  className="border-t border-white/5 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-center gap-4 px-6 py-4">
                    {item.auxLinks.map((aux, index) => {
                      const IconComponent = aux.icon
                      return (
                        <motion.div
                          key={aux.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.35 + index * 0.05,
                            type: 'spring',
                            stiffness: 300,
                            damping: 25
                          }}
                        >
                          <Link
                            href={aux.href}
                            className={cn(
                              "group relative inline-flex items-center gap-2.5 rounded-full overflow-hidden",
                              "border border-white/10 px-5 py-2.5 text-[11px]",
                              "uppercase tracking-[0.15em] font-semibold",
                              "text-white/80 transition-all duration-300",
                              "hover:scale-105 hover:border-anbu-gold/40",
                              "hover:text-anbu-gold hover:bg-anbu-gold/5",
                              "hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]",
                              "backdrop-blur-sm min-w-[140px] justify-center",
                              "focus:outline-none focus:ring-2 focus:ring-anbu-gold/50 focus:ring-offset-1 focus:ring-offset-black"
                            )}
                            aria-label={aux.label}
                            role="menuitem"
                          >
                            {/* Shimmer effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12" />

                            {/* Gradient background on hover */}
                            <div className={cn(
                              "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300",
                              "group-hover:opacity-20",
                              aux.gradient || 'from-anbu-gold/20 to-anbu-gold/10'
                            )} />

                            {/* Content */}
                            <div className="relative z-10 flex items-center gap-2.5">
                              {IconComponent && (
                                <motion.div
                                  className={cn(
                                    "rounded-full p-1.5 bg-gradient-to-br",
                                    aux.gradient || 'from-anbu-gold/20 to-anbu-gold/10'
                                  )}
                                  whileHover={{ rotate: 180 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <IconComponent className="h-3.5 w-3.5 text-white transition-colors duration-300 group-hover:text-anbu-gold" />
                                </motion.div>
                              )}
                              <span className="font-semibold">{aux.label}</span>
                            </div>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
