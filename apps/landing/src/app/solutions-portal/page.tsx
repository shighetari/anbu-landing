'use client'

import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, BookOpen, Bot, Sparkles } from 'lucide-react'

import { SparklesCore } from '@/components/aceternity/sparkles'
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect'
import Container from '@/components/ui/Container'
import { BlurFadeText } from '@/components/magicui/blur-fade-text'
import { ShinyText } from '@/components/magicui/shiny-text'
import WordRotate from '@/components/magicui/word-rotate'
import AnimatedGradientText from '@/components/magicui/animated-gradient-text'
import SparklesText from '@/components/magicui/sparkles-text'
import TypingAnimation from '@/components/magicui/typing-animation'
import { cn } from '@/lib/utils'
import { brandButton } from '@/lib/brand'

const VIDEO_STOP_TIME = 7.2

type PortalDestination = {
  id: string
  title: string
  subtitle: string
  description: string
  href: string
  status: string
  statusTone: 'emerald' | 'amber' | 'violet'
  accent: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  shimmer: string[]
}

const portalDestinations: PortalDestination[] = [
  {
    id: 'docs-hub',
    title: 'Docs Intelligence',
    subtitle: 'Knowledge Graph & API Guides',
    description:
      'Vector-search SDKs. Automation recipes. Engineering enablement.',
    href: '/docs-hub',
    status: 'Live preview',
    statusTone: 'emerald',
    accent: '#38bdf8',
    icon: BookOpen,
    shimmer: ['#38bdf8', '#22d3ee', '#6366f1'],
  },
  {
    id: 'marketing',
    title: 'Marketing Studio',
    subtitle: 'Campaign Systems & Brand Motion',
    description:
      'Premium campaigns. Cinematic storytelling. Full service stack.',
    href: '/social-hub',
    status: 'Client ready',
    statusTone: 'amber',
    accent: '#f59e0b',
    icon: Sparkles,
    shimmer: ['#fbbf24', '#f97316', '#facc15'],
  },
  {
    id: 'command-console',
    title: 'Command Console',
    subtitle: 'Automation & Delivery Ops',
    description:
      'Unified console. Orchestrating pods. Full observability.',
    href: '/docs-hub',
    status: 'In build',
    statusTone: 'violet',
    accent: '#a855f7',
    icon: Bot,
    shimmer: ['#c084fc', '#a855f7', '#6366f1'],
  },
]

const statusToneStyles: Record<PortalDestination['statusTone'], string> = {
  emerald: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-200',
  amber: 'border-amber-400/40 bg-amber-400/15 text-amber-200',
  violet: 'border-violet-400/40 bg-violet-400/15 text-violet-200',
}

function PortalCard({ portal }: { portal: PortalDestination }) {
  const StatusTone = statusToneStyles[portal.statusTone]
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      key={portal.id}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 24,
            duration: 0.6
          }
        }
      }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={portal.href}
        className="group relative block h-full w-full"
        aria-label={`Open ${portal.title}`}
      >
        {/* Animated border gradient */}
        <div className="absolute -inset-[1px] rounded-[25px] opacity-60 blur-sm"
          style={{
            background: `linear-gradient(135deg, ${portal.accent}, transparent, ${portal.accent})`,
            animation: 'gradient-shift 8s ease infinite',
            backgroundSize: '200% 200%'
          }}
        />

        {/* Main card container */}
        <div className="relative flex h-full min-h-[280px] sm:min-h-[300px] lg:min-h-[320px] w-full max-w-full sm:max-w-[340px] md:max-w-[320px] lg:max-w-[360px] xl:max-w-[380px] flex-col overflow-hidden rounded-[20px] sm:rounded-[24px] border border-white/10 bg-gradient-to-br from-black/95 via-black/90 to-black/85 p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_30px_80px_rgba(0,0,0,0.7)]">

          {/* Background effects layer */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
            {/* Accent gradient */}
            <motion.div
              className="absolute -inset-10"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${portal.accent}20 0%, transparent 50%)`,
              }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                opacity: isHovered ? 0.8 : 0.5
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />

            {/* Sparkles with reduced density */}
            <SparklesCore
              id={`${portal.id}-sparkles`}
              background="transparent"
              particleColor={portal.accent}
              className="h-full w-full opacity-50"
              particleDensity={12}
              minSize={0.3}
              maxSize={0.8}
            />

            {/* Bottom gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${portal.accent}10 0%, transparent 70%)`,
              }}
              animate={{
                opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center text-center">
            {/* Status Badge */}
            <div className="mb-4 w-full flex justify-center">
              <span
                className={cn(
                  'inline-flex items-center rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em]',
                  StatusTone,
                )}
              >
                {portal.status}
              </span>
            </div>

            {/* Icon */}
            <motion.div
              className="relative grid size-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent mb-4"
              style={{
                boxShadow: isHovered ? `0 0 30px ${portal.accent}25` : `0 0 15px ${portal.accent}10`
              }}
              animate={{
                rotate: isHovered ? [0, 5, 0] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <portal.icon className="h-5 w-5" style={{ color: portal.accent }} />
              {/* Icon glow */}
              <div className="absolute inset-0 rounded-xl"
                style={{
                  background: `radial-gradient(circle, ${portal.accent}20, transparent)`,
                  filter: 'blur(6px)'
                }}
              />
            </motion.div>

            {/* Title section */}
            <div className="mb-auto space-y-3">
              <motion.p
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50"
                animate={{
                  letterSpacing: isHovered ? '0.35em' : '0.3em',
                  opacity: isHovered ? 0.8 : 0.5
                }}
                transition={{ duration: 0.3 }}
              >
                {portal.subtitle}
              </motion.p>

              <h3 className="text-2xl font-display font-bold text-white sm:text-3xl">
                {isHovered ? (
                  <TextGenerateEffect
                    words={portal.title}
                    className="text-2xl sm:text-3xl font-bold"
                    duration={0.3}
                  />
                ) : (
                  <ShinyText className="inline-block text-white" speed={4}>
                    {portal.title}
                  </ShinyText>
                )}
              </h3>

              <motion.p
                className="text-balance text-[13px] leading-relaxed text-white/60"
                animate={{
                  opacity: isHovered ? 0.9 : 0.6
                }}
                transition={{ duration: 0.3 }}
              >
                {portal.description}
              </motion.p>
            </div>

            {/* CTA */}
            <motion.div
              className={brandButton({ variant: 'ghost', size: 'sm', className: 'mt-6 border-white/20 bg-black/40 px-4 py-1.5 tracking-[0.18em] text-anbu-gold/85' })}
              animate={{
                x: isHovered ? 8 : 0,
                letterSpacing: isHovered ? '0.2em' : '0.16em'
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              Enter workspace
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </Link>

      {/* CSS animation for gradient shift */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  )
}

export default function SolutionsPortalLanding() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)
  const [videoFinished, setVideoFinished] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const video = videoRef.current
    if (!video) return

    setVideoFinished(false)

    let removeUserInteractionListeners: (() => void) | null = null

    const attemptPlay = () => {
      const promise = video.play()
      if (!promise || typeof promise.then !== 'function') {
        return
      }
      promise.catch(() => {
        const retry = () => {
          video.play().catch(() => null)
          removeUserInteractionListeners?.()
        }
        const handlePointer = () => retry()
        const handleKey = () => retry()
        removeUserInteractionListeners = () => {
          window.removeEventListener('pointerdown', handlePointer)
          window.removeEventListener('keydown', handleKey)
          removeUserInteractionListeners = null
        }
        window.addEventListener('pointerdown', handlePointer, { once: true })
        window.addEventListener('keydown', handleKey, { once: true })
      })
    }

    const primePlayback = () => {
      setVideoFinished(false)
      video.currentTime = 0
      attemptPlay()
    }

    if (video.readyState >= 2) {
      primePlayback()
    } else {
      const onLoaded = () => {
        primePlayback()
      }
      video.addEventListener('loadeddata', onLoaded, { once: true })
      removeUserInteractionListeners = () => {
        video.removeEventListener('loadeddata', onLoaded)
      }
    }

    return () => {
      removeUserInteractionListeners?.()
    }
  }, [mounted])

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    if (video.currentTime >= VIDEO_STOP_TIME) {
      video.pause()
      video.currentTime = VIDEO_STOP_TIME
      setVideoFinished(true)
    }
  }

  return (
    <main id="main-content" className="min-h-screen bg-black text-anbu-marble">
      <section className="relative flex min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] lg:min-h-[55vh] items-center justify-center overflow-hidden">
        {mounted && !videoFinished ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            poster="/anbu_hero.png"
          >
            <source src="/Create_a_marketing_202509100024_evwzi.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/anbu_hero.png"
            alt="ANBU Solutions Portal"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/65 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.18)_0%,_transparent_55%)]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        >
          <span
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-black/70 px-6 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/80 text-center backdrop-blur"
          >
            <motion.span
              aria-hidden
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.08, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1 w-8 rounded-full bg-gradient-to-r from-anbu-gold/20 via-anbu-gold/60 to-anbu-gold/20"
            />
            ANBU SOLUTIONS PORTAL
            <motion.span
              aria-hidden
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.08, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1 w-8 rounded-full bg-gradient-to-r from-anbu-gold/20 via-anbu-gold/60 to-anbu-gold/20"
            />
          </span>
        </motion.div>
      </section>

      <section ref={sectionRef} id="portals" className="relative overflow-hidden py-6 sm:py-8 md:py-10 lg:py-12">
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0c0c0c] to-black"
          style={{ opacity }}
          aria-hidden
        />
        <motion.div
          className="absolute inset-0 -z-20 opacity-30"
          style={{ y: parallaxY }}
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255,215,0,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(255,215,0,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255,215,0,0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <SparklesCore
            id="solutions-portal-sparkles"
            background="transparent"
            particleColor="#FFD700"
            particleDensity={12}
            minSize={0.6}
            maxSize={1.2}
            className="h-full w-full"
          />
        </motion.div>

        <Container size="lg">
          <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <div className="mx-auto max-w-2xl text-center space-y-2 sm:space-y-3">
              <BlurFadeText delay={0} duration={0.6}>
                <AnimatedGradientText className="inline-flex">
                  <SparklesText
                    text="✨ ENTERPRISE PORTALS"
                    className="text-[10px] font-bold uppercase tracking-[0.35em]"
                    sparkleColor="#FFD700"
                    sparklesCount={3}
                  />
                </AnimatedGradientText>
              </BlurFadeText>

              <BlurFadeText delay={0.1} duration={0.7}>
                <h2 className="text-balance text-xl font-display font-semibold sm:text-2xl lg:text-3xl">
                  <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Your next
                  </span>
                  {' '}
                  <WordRotate
                    words={[
                      'breakthrough',
                      'transformation',
                      'evolution',
                      'advantage',
                      'innovation',
                      'success story',
                      'market edge',
                      'growth phase',
                      'expansion',
                      'disruption'
                    ]}
                    className="bg-gradient-to-r from-anbu-gold via-amber-400 to-anbu-gold bg-clip-text text-transparent inline-block font-bold animate-gradient bg-[length:200%_auto]"
                    duration={2500}
                  />
                  {' '}
                  <span className="bg-gradient-to-r from-white/70 via-white/90 to-white bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    starts here
                  </span>
                </h2>
              </BlurFadeText>

              <BlurFadeText delay={0.2} duration={0.7}>
                <div className="flex flex-col items-center gap-1">
                  <TypingAnimation
                    text="Three paths. Unlimited potential."
                    className="text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-white/50 via-white/70 to-white/50 font-medium"
                    duration={0.04}
                    delay={0.5}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                  >
                    <ShinyText className="text-[10px] uppercase tracking-widest text-anbu-gold/60" speed={3}>
                      Select your workspace below
                    </ShinyText>
                  </motion.div>
                </div>
              </BlurFadeText>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                  }
                }
              }}
              className="grid w-full max-w-7xl mx-auto gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 justify-items-center px-4 sm:px-6 lg:px-8"
            >
              {portalDestinations.map((portal) => (
                <PortalCard key={portal.id} portal={portal} />
              ))}
            </motion.div>

            {/* Impact Metrics Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              {/* Background glow */}
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-anbu-gold/10 via-transparent to-anbu-gold/10 opacity-30 blur-3xl" />

              {/* Metrics Grid */}
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { value: '12+', label: 'Active Portals', accent: '#38bdf8' },
                  { value: '99.9%', label: 'Uptime SLA', accent: '#f59e0b' },
                  { value: '24/7', label: 'Operations', accent: '#a855f7' },
                  { value: '<50ms', label: 'Response Time', accent: '#FFD700' }
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="relative group"
                  >
                    {/* Card background */}
                    <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/[0.03] to-transparent" />
                    <div
                      className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${metric.accent}, transparent)`
                      }}
                    />

                    {/* Content */}
                    <div className="relative rounded-[16px] border border-white/[0.08] bg-black/40 backdrop-blur-xl p-4 sm:p-5 lg:p-6 text-center">
                      <motion.div
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2"
                        style={{ color: metric.accent }}
                        animate={{
                          textShadow: [
                            `0 0 20px ${metric.accent}00`,
                            `0 0 30px ${metric.accent}40`,
                            `0 0 20px ${metric.accent}00`,
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        {metric.value}
                      </motion.div>
                      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                        {metric.label}
                      </p>
                    </div>

                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, transparent, ${metric.accent}30, transparent)`,
                        filter: 'blur(1px)'
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Bottom tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 sm:mt-10 lg:mt-12 text-center"
              >
                <p className="text-xs sm:text-sm text-white/40 font-medium uppercase tracking-[0.25em]">
                  Powering digital excellence since deployment
                </p>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  )
}
