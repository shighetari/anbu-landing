'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Sparkles,
  GraduationCap,
  MessageCircle,
  ArrowUpRight,
  FileText,
  Lightbulb,
  ShieldCheck
} from 'lucide-react'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { ShinyText } from '@/components/magicui/shiny-text'
import { BlurFadeText } from '@/components/magicui/blur-fade-text'
import { SparklesCore } from '@/components/aceternity/sparkles'
import { cn } from '@/lib/utils'
import { brandButton } from '@/lib/brand'

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const highlightVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 140, damping: 18 },
  },
}

const quickActionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08 + 0.1, duration: 0.4, ease: 'easeOut' },
  }),
}

const resourceHighlights = [
  {
    title: 'Docs Hub',
    description:
      'Interactive documentation, component explorers, and AI copilots that keep product knowledge current.',
    href: '/resources/docs-hub',
    icon: BookOpen,
    status: 'Beta access',
    gradient: 'from-indigo-300 via-purple-400 to-sky-500',
    microcopy: 'Guided walkthroughs with semantic search',
  },
  {
    title: 'Success Library',
    description:
      'Case studies, launch retros, and metrics that showcase how teams scale with ANBU.',
    href: '/social-hub',
    icon: Sparkles,
    status: 'Live',
    gradient: 'from-amber-300 via-orange-400 to-pink-500',
    microcopy: 'Go from idea to launch with proven playbooks',
  },
  {
    title: 'Operator Playbooks',
    description:
      'Step-by-step recipes for onboarding pods, defining rituals, and monitoring outcomes.',
    href: '/resources/docs-hub',
    icon: GraduationCap,
    status: 'Rolling release',
    gradient: 'from-emerald-300 via-teal-400 to-cyan-500',
    microcopy: 'Downloadable PDFs and Notion-ready templates',
  },
] as const

const quickActions = [
  {
    label: 'Contact Command Desk',
    description: 'Route questions or partner opportunities straight to the core team.',
    href: '/contact',
    icon: MessageCircle,
  },
  {
    label: 'Request Enablement Workshop',
    description: 'Schedule a working session to integrate ANBU tooling into your roadmap.',
    href: 'https://cal.com/',
    icon: Lightbulb,
  },
  {
    label: 'Security & Compliance Brief',
    description: 'Review policies, data handling, and uptime guarantees tailored to enterprise buyers.',
    href: '/docs/SECURITY.md',
    icon: ShieldCheck,
  },
] as const

export default function ResourcesPage() {
  return (
    <div className="relative min-h-screen bg-black pt-24 pb-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <SparklesCore
          id="resources-background"
          background="transparent"
          minSize={0.5}
          maxSize={1.2}
          particleColor="#FFD700"
          particleDensity={22}
          className="h-full w-full opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        {/* bottom color lift (to match Solutions page polish) */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-anbu-gold/25 via-anbu-gold/12 to-transparent" />
      </div>

      <Container size="lg" className="relative px-4 sm:px-6 lg:px-8">
        <motion.header
          className="flex flex-col items-center gap-6 text-center"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <ShinyText className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-anbu-gold" speed={5}>
            Resource Center
          </ShinyText>
          <AnimatedGradientText
            colorFrom="#FFE680"
            colorTo="#FF9A3C"
            speed={1.1}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-display"
          >
            Everything you need to onboard, operate, and scale with ANBU
          </AnimatedGradientText>
          <BlurFadeText className="max-w-2xl text-sm sm:text-base md:text-lg text-white/70">
            Dive into documentation, success stories, and enablement guides crafted to keep leadership, operators, and
            makers aligned. These resources mirror the exact journey our teams facilitate during delivery.
          </BlurFadeText>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className={brandButton({ variant: 'primary', size: 'lg' })}
            >
              Talk with us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/solutions#design"
              className={brandButton({ variant: 'secondary', size: 'lg' })}
            >
              Return to journey map
            </Link>
          </div>
        </motion.header>

        <section className="mt-16 grid gap-6 sm:gap-8">
          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {resourceHighlights.map((resource) => {
              const Icon = resource.icon
              return (
                <motion.article
                  key={resource.title}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.04] via-black/[0.35] to-black/75 p-8 sm:p-10 pt-14 sm:pt-16 transition-all duration-300 hover:-translate-y-1 hover:border-anbu-gold/25 hover:shadow-[0_0_0_1px_rgba(255,215,0,0.25)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                  variants={highlightVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden>
                    <div className={cn('absolute inset-0 blur-3xl', `bg-gradient-to-br ${resource.gradient}`)} />
                  </div>
                  {/* subtle top highlight for polish */}
                  <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  <div className="relative mt-4 sm:mt-6 flex items-center justify-between px-1">
                    <span className={cn('inline-block mt-0 rounded-full px-3 py-1 text-[10px] leading-none uppercase tracking-[0.3em] text-white/85 backdrop-blur-[2px] border border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.15)]', `bg-gradient-to-r ${resource.gradient}`)}>
                      {resource.status}
                    </span>
                    <FileText className="mt-0 h-4 w-4 text-white/55" />
                  </div>

                  <div className="relative mt-6 flex items-center gap-3">
                    <span className={cn('flex h-11 w-11 items-center justify-center rounded-2xl text-black shadow-lg', `bg-gradient-to-br ${resource.gradient}`)}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-semibold text-white">{resource.title}</h3>
                  </div>

                  <p className="relative mt-4 text-sm text-white/70 leading-relaxed">
                    {resource.description}
                  </p>

                  <p className="relative mt-3 text-xs uppercase tracking-[0.2em] text-anbu-gold/80">
                    {resource.microcopy}
                  </p>

                  <Link
                    href={resource.href}
                    aria-label={`Explore ${resource.title}`}
                    className={cn('relative mt-8 self-start', brandButton({ variant: 'ghost', size: 'sm', className: 'group-hover:border-anbu-gold/60 group-hover:text-anbu-gold' }))}
                  >
                    Explore
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.article>
              )
            })}
          </motion.div>
        </section>

        <section className="mt-20 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[320px,1fr] lg:gap-12">
            <div className="space-y-4">
              <ShinyText className="text-[10px] uppercase tracking-[0.35em] text-anbu-gold" speed={4}>
                Quick Actions
              </ShinyText>
              <h2 className="text-2xl font-semibold text-white">
                Extend the conversation
              </h2>
              <p className="text-sm text-white/70">
                Resources are just the starting point. Connect directly with the team to co-design workshops, security
                reviews, or custom roadmaps.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                const isExternal = action.href.startsWith('http')
                return (
                  <motion.div
                    key={action.label}
                    className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/70 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={quickActionVariants}
                    custom={index}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-anbu-gold/10 text-anbu-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold text-white">{action.label}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{action.description}</p>
                    <Link
                      href={action.href}
                      aria-label={`Open ${action.label}`}
                      className={brandButton({ variant: 'ghost', size: 'sm', className: 'px-3 py-1.5 tracking-[0.25em] text-anbu-gold/85 hover:text-anbu-gold' })}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noreferrer' : undefined}
                    >
                      Open
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
