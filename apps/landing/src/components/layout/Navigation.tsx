'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import {
  IconBrandCodesandbox,
  IconBook,
  IconCompass,
  IconHeadset,
  IconMessage2,
  IconRocket,
  IconTimeline,
  IconRoute,
  IconSparkles,
  IconUsersGroup,
  IconChecklist
} from '@tabler/icons-react'
import { useEffect, useState, useRef } from 'react'
import type { ComponentType } from 'react'

import { cn } from '@/lib/utils'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useFocusTrap } from '@/hooks/useFocusTrap'

type JourneyItem = {
  stage: string
  title: string
  description: string
  href: string
}

type MegaItem = {
  title: string
  description: string
  href: string
  icon?: ComponentType<{ className?: string }>
  gradient: string
  bgGradient?: string
  badge?: string
  status?: string
}

type AuxiliaryLink = {
  label: string
  href: string
  icon?: ComponentType<{ className?: string }>
  gradient?: string
}

type NavItem = {
  label: string
  href: string
  description?: string
  journey?: JourneyItem[]
  mega?: MegaItem[]
  auxLinks?: AuxiliaryLink[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Journey',
    href: '/#home',
    description: 'Four deliberate stages that guide partners from discovery to launch.',
    journey: [
      {
        stage: '01',
        title: 'Discover',
        description: 'Start at the overview to align on thesis, tone, and ambition.',
        href: '/#home',
      },
      {
        stage: '02',
        title: 'Shape Solutions',
        description: 'Map the modules that fit using the Solutions overview and suites.',
        href: '/solutions',
      },
      {
        stage: '03',
        title: 'Validate',
        description: 'Share resources, playbooks, and docs to bring stakeholders along.',
        href: '/resources',
      },
      {
        stage: '04',
        title: 'Engage',
        description: 'Open the command desk, book sessions, and kick off delivery.',
        href: '/contact',
      },
    ],
    auxLinks: [
      {
        label: 'Solutions overview',
        href: '/solutions',
        icon: IconCompass,
        gradient: 'from-amber-500 to-orange-500',
      },
      {
        label: 'Resource library',
        href: '/resources',
        icon: IconBook,
        gradient: 'from-blue-500 to-cyan-500',
      },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    description: 'Command consoles, cinematic marketing, and data intelligence systems.',
    mega: [
      {
        title: 'Command Console',
        description: 'Coordinate pods, rituals, and telemetry through the Solutions Portal.',
        href: '/solutions/command-console',
        icon: IconRocket,
        gradient: 'from-cyan-500 to-violet-500',
        bgGradient: 'from-cyan-500/15 via-cyan-500/5 to-violet-500/10',
        badge: 'Automation pods',
        status: 'Live preview',
      },
      {
        title: 'Marketing Studio',
        description: 'Motion-first storytelling, launch films, and brand systems.',
        href: '/solutions/marketing-studio',
        icon: IconBrandCodesandbox,
        gradient: 'from-amber-500 to-pink-500',
        bgGradient: 'from-amber-500/15 via-amber-500/5 to-pink-500/10',
        badge: 'Experience design',
        status: 'Client ready',
      },
      {
        title: 'Docs Intelligence',
        description: 'Vector search documentation, AI copilots, and interactive sandboxes.',
        href: '/resources/docs-hub',
        icon: IconBook,
        gradient: 'from-indigo-500 to-sky-500',
        bgGradient: 'from-indigo-500/15 via-indigo-500/5 to-sky-500/10',
        badge: 'Knowledge fabric',
        status: 'Early access',
      },
    ],
    auxLinks: [
      {
        label: 'See the journey map',
        href: '/solutions#design',
        icon: IconRoute,
        gradient: 'from-purple-500 to-cyan-500',
      },
      {
        label: 'Talk with delivery',
        href: '/contact',
        icon: IconHeadset,
        gradient: 'from-red-500 to-rose-500',
      },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    description: 'Enablement content that keeps leadership and operators aligned.',
    mega: [
      {
        title: 'Resource Center',
        description: 'Guided entry point for docs, playbooks, and success stories.',
        href: '/resources',
        icon: IconSparkles,
        gradient: 'from-amber-500 to-rose-500',
        bgGradient: 'from-amber-500/15 via-amber-500/5 to-rose-500/10',
        badge: 'Start here',
        status: 'Updated weekly',
      },
      {
        title: 'Docs Hub',
        description: 'Deep technical documentation and AI copilots for teams.',
        href: '/resources/docs-hub',
        icon: IconBook,
        gradient: 'from-indigo-500 to-blue-500',
        bgGradient: 'from-indigo-500/15 via-indigo-500/5 to-blue-500/10',
        badge: 'AI docs',
        status: 'Beta',
      },
      {
        title: 'Success Library',
        description: 'Case studies, launch retros, and outcome scorecards.',
        href: '/social-hub',
        icon: IconUsersGroup,
        gradient: 'from-emerald-500 to-teal-500',
        bgGradient: 'from-emerald-500/15 via-emerald-500/5 to-teal-500/10',
        badge: 'Proof',
        status: 'Live',
      },
    ],
    auxLinks: [
      {
        label: 'Request enablement session',
        href: 'https://cal.com/',
        icon: IconTimeline,
        gradient: 'from-emerald-500 to-cyan-500',
      },
      {
        label: 'Ask the team',
        href: '/contact',
        icon: IconMessage2,
        gradient: 'from-purple-500 to-pink-500',
      },
    ],
  },
  {
    label: 'Engage',
    href: '/contact',
    description: 'Open the command desk, share a brief, or align on next steps.',
    mega: [
      {
        title: 'Contact Desk',
        description: 'Route questions to the team and receive a tailored response.',
        href: '/contact',
        icon: IconHeadset,
        gradient: 'from-amber-500 to-yellow-500',
        bgGradient: 'from-amber-500/15 via-amber-500/5 to-yellow-500/10',
        badge: 'Fastest',
        status: '24hr reply',
      },
      {
        title: 'Project Intake',
        description: 'Submit timelines, goals, and constraints to shape the engagement.',
        href: '/contact',
        icon: IconChecklist,
        gradient: 'from-cyan-500 to-blue-500',
        bgGradient: 'from-cyan-500/15 via-cyan-500/5 to-blue-500/10',
        badge: 'Intake',
        status: 'Guided form',
      },
      {
        title: 'Command Console Preview',
        description: 'Walk through the live Solutions Portal build with the leads.',
        href: '/solutions/command-console',
        icon: IconRocket,
        gradient: 'from-purple-500 to-violet-500',
        bgGradient: 'from-purple-500/15 via-purple-500/5 to-violet-500/10',
        badge: 'Tour',
        status: 'Schedule',
      },
    ],
    auxLinks: [
      {
        label: 'Start a project',
        href: '/contact',
        icon: IconHeadset,
        gradient: 'from-red-500 to-rose-500',
      },
    ],
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
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const prevY = useRef(0)

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
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActive(null)
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }, [pathname])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setActive(null)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  const handleNavigate = () => {
    setMobileOpen(false)
    setActive(null)
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
          'relative flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border border-white/15 bg-black/65 px-4 lg:px-6 py-2 lg:py-3 shadow-[0_16px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500',
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
              href="/contact"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#FFD700]/60 px-5 lg:px-7 py-2 lg:py-2.5 text-xs font-semibold uppercase tracking-[0.12em] lg:tracking-[0.15em] text-anbu-gold transition-colors duration-300 hover:border-[#FFC347] hover:text-[#FFC347] ml-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFD7001a] via-[#FFB3471a] to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2">
                Start A Project
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-anbu-gold transition-all duration-300 hover:border-anbu-gold/40 hover:bg-anbu-gold/10 md:hidden touch-manipulation"
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
                ref={(node) => {
                  // I'm properly setting both refs to the same element
                  mobileMenuRef.current = node
                  focusTrapRef.current = node
                }}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  duration: 0.3,
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
                        className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 fluid-px-lg fluid-py-md text-left"
                      >
                        <span className="flex items-center justify-between text-sm font-semibold text-anbu-marble">
                          {item.label}
                          <span className="text-[10px] uppercase tracking-[0.2em] text-anbu-gold/70">Go</span>
                        </span>
                        {item.description ? (
                          <span className="text-xs text-white/55 leading-relaxed">
                            {item.description}
                          </span>
                        ) : null}
                      </Link>

                      {item.journey ? (
                        <div className="mt-3 space-y-2 border-l border-white/10 pl-4">
                          {item.journey.map((step) => (
                            <Link
                              key={step.stage}
                              href={step.href}
                              onClick={handleNavigate}
                              className="group flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-white/5"
                            >
                              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-anbu-gold/80">
                                {step.stage}
                              </span>
                              <div className="flex-1">
                                <span className="block text-sm font-medium text-white">
                                  {step.title}
                                </span>
                                <span className="text-xs text-white/55 leading-relaxed">
                                  {step.description}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : null}

                      {item.mega ? (
                        <div className="mt-3 space-y-3 border-l border-white/10 pl-4">
                          {item.mega.map((mega) => {
                            const IconComponent = mega.icon
                            return (
                              <Link
                                key={mega.title}
                                href={mega.href}
                                onClick={handleNavigate}
                                className={cn(
                                  'group relative block rounded-xl px-4 py-3 transition-all duration-300 hover:bg-white/5',
                                  'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1'
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex flex-col items-center gap-1">
                                    {mega.badge ? (
                                      <span className={cn(
                                        'rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80',
                                        'bg-gradient-to-r',
                                        mega.gradient
                                      )}>
                                        {mega.badge}
                                      </span>
                                    ) : null}
                                    {IconComponent && (
                                      <div className={cn(
                                        'rounded-md p-1 bg-gradient-to-br text-white',
                                        mega.gradient
                                      )}>
                                        <IconComponent className="h-4 w-4" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <span className="block text-sm font-medium text-white">
                                      {mega.title}
                                    </span>
                                    <span className="text-xs text-white/55 leading-relaxed">
                                      {mega.description}
                                    </span>
                                    {mega.status ? (
                                      <span className="mt-2 inline-flex items-center rounded-full border border-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-white/60">
                                        {mega.status}
                                      </span>
                                    ) : null}
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
                      href="/contact"
                      onClick={handleNavigate}
                      className="flex items-center justify-center gap-2 rounded-full bg-anbu-gold fluid-px-lg fluid-py-sm fluid-text-sm font-semibold text-black shadow-[0_12px_30px_rgba(255,215,0,0.35)] transition-all duration-300 hover:bg-anbu-gold-accent hover:scale-[1.05] active:scale-[0.95]"
                    >
                      Start A Project
                      <ArrowUpRight className="h-4 w-4" />
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
  const hasMega = Boolean(item.mega && item.mega.length > 0)
  const hasJourney = Boolean(item.journey && item.journey.length > 0)
  const hasMenu = hasMega || hasJourney
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    if (hasMenu) {
      setActive(item.label)
    }
  }

  const handleMouseLeave = () => {
    if (hasMenu) {
      closeTimeoutRef.current = setTimeout(() => {
        setActive(null)
      }, 300)
    }
  }

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
        onClick={() => setActive(null)}
        className={cn(
          'group relative inline-flex items-center rounded-full px-4 lg:px-6 py-2 lg:py-2.5 text-xs font-semibold uppercase tracking-[0.12em] lg:tracking-[0.15em] text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-anbu-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] min-h-[44px] touch-manipulation',
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

      {hasMenu && isActive ? (
        <div className="absolute top-full left-0 right-0 h-3 z-30" />
      ) : null}

      <AnimatePresence>
        {hasMenu && isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={TRANSITION}
            className="absolute left-1/2 top-[calc(100%+0.5rem)] z-40 w-[min(92vw,clamp(420px,48vw,620px))] -translate-x-1/2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="menu"
            aria-label={`${item.label} submenu`}
          >
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-black/92 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              {hasJourney ? (
                <motion.div
                  className="flex flex-col gap-3 p-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: STAGGER_DELAY,
                      },
                    },
                  }}
                >
                  {item.journey?.map((step) => (
                    <motion.div
                      key={step.stage}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                          },
                        },
                      }}
                    >
                      <Link
                        href={step.href}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-all duration-300 hover:border-anbu-gold/40 hover:bg-white/[0.08]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[11px] font-semibold uppercase tracking-[0.32em] text-anbu-gold">
                          {step.stage}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white group-hover:text-anbu-gold">
                            {step.title}
                          </p>
                          <p className="text-xs text-white/60 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-white/50 transition-all duration-300 group-hover:text-anbu-gold group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}

              {hasMega ? (
                <motion.div
                  className="grid gap-4 p-6 sm:grid-cols-2 lg:gap-5 lg:p-8"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: STAGGER_DELAY,
                      },
                    },
                  }}
                >
                  {item.mega?.map((mega) => {
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
                              damping: 25,
                            },
                          },
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href={mega.href}
                          className={cn(
                            'group relative flex h-full flex-col gap-4 rounded-xl border border-white/[0.08] bg-white/[0.05] p-5 lg:p-6 transition-all duration-300',
                            'hover:border-white/20 hover:bg-white/[0.08] hover:shadow-lg backdrop-blur-sm',
                            'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black'
                          )}
                        >
                          <div className={cn(
                            'absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                            mega.bgGradient || mega.gradient
                          )} />

                          <div className="relative flex items-start justify-between gap-2">
                            {mega.badge ? (
                              <span className={cn(
                                'inline-flex items-center justify-center rounded-full px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90',
                                'bg-gradient-to-r',
                                mega.gradient
                              )}>
                                {mega.badge}
                              </span>
                            ) : null}
                            {mega.status ? (
                              <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-white/60">
                                {mega.status}
                              </span>
                            ) : null}
                            {IconComponent ? (
                              <div className={cn(
                                'absolute -top-2 -right-2 rounded-xl p-2 bg-gradient-to-br text-white shadow-lg transition-transform duration-300',
                                mega.gradient
                              )}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                            ) : null}
                          </div>

                          <div className="relative space-y-2 pt-2">
                            <p className="text-base font-semibold text-white">
                              {mega.title}
                            </p>
                            <p className="text-sm text-white/70 leading-relaxed">
                              {mega.description}
                            </p>
                          </div>

                          <div className="relative mt-auto flex items-center gap-2">
                            <span className={cn(
                              'text-xs uppercase tracking-[0.2em] font-medium text-white/70 transition-colors duration-300',
                              'group-hover:text-anbu-gold'
                            )}>
                              Explore
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-white/60 transition-all duration-300 group-hover:text-anbu-gold group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              ) : null}

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
                            damping: 25,
                          }}
                        >
                          <Link
                            href={aux.href}
                            className={cn(
                              'group relative inline-flex items-center gap-2.5 rounded-full overflow-hidden',
                              'border border-white/10 px-5 py-2.5 text-[11px]',
                              'uppercase tracking-[0.15em] font-semibold',
                              'text-white/80 transition-all duration-300',
                              'hover:scale-105 hover:border-anbu-gold/40 hover:text-anbu-gold hover:bg-anbu-gold/5',
                              'hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]',
                              'backdrop-blur-sm min-w-[160px] justify-center',
                              'focus:outline-none focus:ring-2 focus:ring-anbu-gold/50 focus:ring-offset-1 focus:ring-offset-black'
                            )}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12" />
                            <div className={cn(
                              'absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300',
                              aux.gradient || 'from-anbu-gold/20 to-anbu-gold/10'
                            )} />
                            <div className="relative z-10 flex items-center gap-2.5">
                              {IconComponent && (
                                <motion.div
                                  className={cn(
                                    'rounded-full p-1.5 bg-gradient-to-br',
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
