'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Bot,
  Sparkles,
  Globe2,
  BookOpen,
  Cpu,
  ArrowUpRight
} from 'lucide-react'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { ShinyText } from '@/components/magicui/shiny-text'
import { BlurFadeText } from '@/components/magicui/blur-fade-text'
import { SparklesCore } from '@/components/aceternity/sparkles'
import { cn } from '@/lib/utils'

const journeyStages = [
  {
    id: 'discover',
    title: 'Discover',
    description: 'Map opportunities and define measurable outcomes in the main experience.',
    href: '/#home',
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Prototype flows and craft motion systems that feel unmistakably ANBU.',
    href: '/solutions#design',
  },
  {
    id: 'deploy',
    title: 'Deploy',
    description: 'Activate pods inside the command console to coordinate delivery.',
    href: '/solutions/command-console',
  },
  {
    id: 'scale',
    title: 'Scale',
    description: 'Instrument the Docs Hub and Marketing Studio to extend adoption.',
    href: '/resources',
  },
]

const suites = [
  {
    label: 'Automation Pods',
    eyebrow: 'Command Console',
    description:
      'A mission control interface for orchestrating delivery squads, launch rooms, and operational telemetry.',
    href: '/solutions/command-console',
    icon: Bot,
    status: 'In active build',
    gradient: 'from-cyan-400 via-blue-500 to-violet-500',
    highlights: [
      'Live launch rooms & release rituals',
      'Runbooks with AI copilots',
      'Delivery scoreboards and health pulses',
    ],
  },
  {
    label: 'Experience Design',
    eyebrow: 'Motion Studio',
    description:
      'Adaptive UI kits and cinematic storytelling for marketing sites, product micro-interactions, and brand systems.',
    href: '/solutions/marketing-studio',
    icon: Sparkles,
    status: 'Client ready',
    gradient: 'from-amber-300 via-orange-400 to-pink-500',
    highlights: [
      'Creative direction sprints',
      'Narrative scoring & storyboard decks',
      'Signature motion & sound expressions',
    ],
  },
  {
    label: 'Data Intelligence',
    eyebrow: 'Insight Fabric',
    description:
      'Connect data exhaust to executive dashboards with AI summarisation, RAG copilots, and automated updates.',
    href: '/resources/docs-hub',
    icon: Globe2,
    status: 'Preview',
    gradient: 'from-emerald-300 via-teal-400 to-cyan-500',
    highlights: [
      'Vector powered knowledge graphs',
      'Exec dashboards with auto insights',
      'Embedded copilots for every function',
    ],
  },
  {
    label: 'Technical Enablement',
    eyebrow: 'Docs Intelligence',
    description:
      'For teams that need self-service onboarding, code recipes, and AI-assisted documentation that stays current.',
    href: '/resources/docs-hub',
    icon: BookOpen,
    status: 'Early access',
    gradient: 'from-indigo-300 via-purple-400 to-sky-500',
    highlights: [
      'Interactive API explorations',
      'RAG chat alongside the docs',
      'Automated playbook distribution',
    ],
  },
]

export default function SolutionsPage() {
  return (
    <div className="relative min-h-screen bg-black pt-24 pb-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <SparklesCore
          id="solutions-background"
          background="transparent"
          minSize={0.5}
          maxSize={1.15}
          particleColor="#FFD700"
          particleDensity={24}
          className="h-full w-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <main className="relative">
        <Container size="lg" className="px-4 sm:px-6 lg:px-8">
          <header className="flex flex-col items-center text-center gap-6 sm:gap-8">
            <ShinyText className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-anbu-gold" speed={5}>
              Suite Overview
            </ShinyText>
            <AnimatedGradientText
              colorFrom="#FFE680"
              colorTo="#FF9A3C"
              speed={1.2}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-display"
            >
              Build, orchestrate, and scale from a single command surface
            </AnimatedGradientText>
            <BlurFadeText className="max-w-2xl text-sm sm:text-base md:text-lg text-white/70">
              The ANBU platform moves clients through a guided journey. Start with a shared vision, activate the command
              console, and extend adoption with knowledge and marketing systems that stay in sync.
            </BlurFadeText>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#services"
                className="inline-flex items-center justify-center rounded-full border border-anbu-gold/50 bg-anbu-gold px-6 py-2 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(255,215,0,0.25)] transition hover:translate-y-[-2px] hover:shadow-[0_18px_40px_rgba(255,215,0,0.35)]"
              >
                Compare with Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-semibold text-white/85 transition hover:border-anbu-gold/40 hover:text-anbu-gold"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </header>

          <section className="mt-16 grid gap-6 sm:gap-8 lg:gap-10">
            <motion.div
              className="grid gap-5 sm:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              {suites.map((suite) => {
                const Icon = suite.icon
                return (
                  <motion.article
                    key={suite.label}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { type: 'spring', stiffness: 120, damping: 20 },
                      },
                    }}
                    whileHover={{ y: -6 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.04] via-black/[0.35] to-black/80 p-6 sm:p-7"
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden>
                      <div className={cn('absolute inset-0 blur-3xl', `bg-gradient-to-br ${suite.gradient}`)} />
                    </div>

                    <div className="relative flex items-center justify-between">
                      <div className={cn('rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/80 bg-white/10 border border-white/15', `bg-gradient-to-r ${suite.gradient}`)}>
                        {suite.eyebrow}
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                        {suite.status}
                      </span>
                    </div>

                    <div className="relative mt-6 flex items-center gap-3">
                      <span className={cn('flex h-12 w-12 items-center justify-center rounded-2xl text-black shadow-lg', `bg-gradient-to-br ${suite.gradient}`)}>
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="text-xl font-semibold text-white">
                        {suite.label}
                      </h3>
                    </div>

                    <p className="relative mt-4 text-sm text-white/70 leading-relaxed">
                      {suite.description}
                    </p>

                    <ul className="relative mt-6 space-y-3 text-xs text-white/65">
                      {suite.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <Cpu className="mt-0.5 h-3.5 w-3.5 flex-none text-anbu-gold/80" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={suite.href}
                      className="relative mt-8 inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition group-hover:border-anbu-gold/50 group-hover:text-anbu-gold"
                    >
                      Explore
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </motion.article>
                )
              })}
            </motion.div>
          </section>

          <section
            id="design"
            className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[320px,1fr] lg:gap-12">
              <div className="space-y-4">
                <ShinyText className="text-[10px] uppercase tracking-[0.35em] text-anbu-gold" speed={4}>
                  Journey Map
                </ShinyText>
                <h2 className="text-2xl font-semibold text-white">
                  Navigate the end-to-end experience
                </h2>
                <p className="text-sm text-white/70">
                  Every engagement follows a deliberate path. Use the map to explore the touchpoints that keep clients oriented and empowered at each step.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {journeyStages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/70 p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <span className="text-[11px] uppercase tracking-[0.28em] text-anbu-gold/80">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{stage.description}</p>
                    <Link
                      href={stage.href}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-anbu-gold/80 hover:text-anbu-gold"
                    >
                      View stage
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </Container>
      </main>
    </div>
  )
}

