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
} from '@/components/ui/lucide-safe'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { ShinyText } from '@/components/magicui/shiny-text'
import { BlurFadeText } from '@/components/magicui/blur-fade-text'
import { SparklesCore } from '@/components/aceternity/sparkles'
import ProcessTimeline from '@/components/features/solutions/ProcessTimeline'
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

const suiteCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
}

const suites = [
  {
    label: 'Custom Web Apps',
    eyebrow: 'Full-Stack Development',
    description:
      'We build the web apps and tools your business needs, from customer portals to internal dashboards.',
    href: '/solutions/marketing-studio',
    icon: Bot,
    status: 'Available now',
    gradient: 'from-cyan-400 via-blue-500 to-violet-500',
    highlights: [
      'Regular progress updates and demos',
      'Clear project plans and timelines',
      'Testing and quality assurance included',
    ],
  },
  {
    label: 'Marketing Websites',
    eyebrow: 'Design & Development',
    description:
      'Beautiful, fast websites with modern animations and designs that help you stand out and convert visitors.',
    href: '/contact',
    icon: Sparkles,
    status: 'Available now',
    gradient: 'from-amber-300 via-orange-400 to-pink-500',
    highlights: [
      'Custom design that matches your brand',
      'Storytelling through visuals and copy',
      'Smooth animations and interactions',
    ],
  },
  {
    label: 'Content Production',
    eyebrow: 'Marketing Media',
    description:
      'Campaign films, commercials, and social content that stay on message across every channel.',
    href: '/contact',
    icon: Globe2,
    status: 'Available now',
    gradient: 'from-rose-300 via-fuchsia-400 to-purple-500',
    highlights: [
      'Launch films, commercials, and anthem videos',
      'Platform-native edits for social and paid media',
      'Creative direction, scripting, and on-set support',
    ],
  },
  {
    label: 'Documentation Sites',
    eyebrow: 'Knowledge Base',
    description:
      'Help your users and team with searchable documentation, guides, and help centers that are easy to update.',
    href: '/contact',
    icon: BookOpen,
    status: 'Available now',
    gradient: 'from-indigo-300 via-purple-400 to-sky-500',
    highlights: [
      'Easy-to-navigate documentation',
      'Search that actually works',
      'Simple content management',
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
          particleDensity={22}
          className="h-full w-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {/* bottom color lift (enhanced) */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-anbu-gold/30 via-anbu-gold/15 to-transparent" />
      </div>

      <main className="relative">
        <Container size="lg" className="px-4 sm:px-6 lg:px-8">
          <motion.header
            className="flex flex-col items-center text-center gap-6 sm:gap-8"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <ShinyText className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-anbu-gold" speed={5}>
              Our Solutions
            </ShinyText>
            <AnimatedGradientText
              colorFrom="#FFE680"
              colorTo="#FF9A3C"
              speed={1.2}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-display"
            >
              Everything you need to build and grow your product
            </AnimatedGradientText>
            <BlurFadeText className="max-w-2xl text-sm sm:text-base md:text-lg text-white/70">
              From web apps to marketing sites, we help you build the software your business needs to succeed.
            </BlurFadeText>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#services"
                className={brandButton({ variant: 'primary', size: 'lg' })}
              >
                View All Services
              </Link>
              <Link
                href="/contact"
                className={brandButton({ variant: 'secondary', size: 'lg' })}
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.header>

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
                    variants={suiteCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                    whileHover={{ y: -6 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.04] via-black/[0.35] to-black/80 p-8 sm:p-10 pt-14 sm:pt-16 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-anbu-gold/25 hover:shadow-[0_0_0_1px_rgba(255,215,0,0.25)]"
                  >
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden>
                      <div className={cn('absolute inset-0 blur-3xl', `bg-gradient-to-br ${suite.gradient}`)} />
                    </div>
                    {/* subtle top highlight for polish */}
                    <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                    <div className="relative mt-4 sm:mt-6 flex items-center justify-between px-1">
                      <div className={cn('inline-block mt-0 rounded-full px-3 py-1 text-[10px] leading-none uppercase tracking-[0.3em] text-white/85 backdrop-blur-[2px] border border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.15)]', `bg-gradient-to-r ${suite.gradient}`)}>
                        {suite.eyebrow}
                      </div>
                      <span className="mt-0 rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 whitespace-nowrap backdrop-blur-[2px]">
                        {suite.status}
                      </span>
                    </div>

                    <div className="relative mt-6 flex items-center gap-3">
                      <span className={cn('flex h-12 w-12 items-center justify-center rounded-2xl text-anbu-ink shadow-lg', `bg-gradient-to-br ${suite.gradient}`)}>
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
                      aria-label={`Get started with ${suite.label}`}
                      className={cn('relative mt-8 self-start', brandButton({ variant: 'ghost', size: 'sm', className: 'group-hover:border-anbu-gold/60 group-hover:text-anbu-gold' }))}
                    >
                      Get started
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </motion.article>
                )
              })}
            </motion.div>
          </section>

          <ProcessTimeline />
        </Container>
      </main>
    </div>
  )
}
