'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  Lightbulb,
  Palette,
  Code2,
  Rocket,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

import { CardSpotlight } from '@/components/aceternity/card-spotlight'
import { BorderBeam } from '@/components/ui/border-beam'
import { ShinyText } from '@/components/magicui/shiny-text'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { brandButton } from '@/lib/brand'

interface ProcessStage {
  id: string
  number: string
  title: string
  description: string
  deliverables: string[]
  duration: string
  icon: React.ElementType
  gradient: string
  gradientFrom: string
  gradientTo: string
}

const processStages: ProcessStage[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    description:
      "I'll hop on a call to understand your vision, goals, and requirements. You'll get a clear project roadmap and honest timeline.",
    deliverables: [
      'Discovery call session',
      'Detailed project proposal',
      'Timeline & budget estimate',
      'Technical requirements doc',
    ],
    duration: '1 week',
    icon: Lightbulb,
    gradient: 'from-cyan-400 via-blue-500 to-blue-600',
    gradientFrom: '#06B6D4',
    gradientTo: '#3B82F6',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    description:
      "I'll create prototypes and designs that match your brand perfectly. You'll see exactly what we're building before we write any code.",
    deliverables: [
      'Wireframes & user flows',
      'High-fidelity mockups',
      'Interactive prototype',
      'Complete design system',
    ],
    duration: '2-3 weeks',
    icon: Palette,
    gradient: 'from-purple-400 via-violet-500 to-pink-500',
    gradientFrom: '#8B5CF6',
    gradientTo: '#EC4899',
  },
  {
    id: 'build',
    number: '03',
    title: 'Build',
    description:
      "I'll build your product with clean code and regular updates. You'll see progress every week and can request changes along the way.",
    deliverables: [
      'Weekly progress demos',
      'Working features delivered',
      'Quality testing & reviews',
      'Code documentation',
    ],
    duration: '4-8 weeks',
    icon: Code2,
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    gradientFrom: '#10B981',
    gradientTo: '#14B8A6',
  },
  {
    id: 'launch',
    number: '04',
    title: 'Launch',
    description:
      "I'll help you go live smoothly with documentation, training, and marketing support to make sure your launch is successful.",
    deliverables: [
      'Production deployment',
      'Complete documentation',
      'Team training session',
      '30-day post-launch support',
    ],
    duration: '1-2 weeks',
    icon: Rocket,
    gradient: 'from-amber-400 via-orange-500 to-yellow-500',
    gradientFrom: '#FFD700',
    gradientTo: '#F59E0B',
  },
]

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="mt-20"
    >
      <Container size="lg" className="px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] via-black/50 to-black/70 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-anbu-gold/5 via-transparent to-transparent pointer-events-none" />

          {/* Subtle radial gradient for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.08),transparent_50%)] pointer-events-none" />

          {/* Header */}
          <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center space-y-5 mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ShinyText
                className="text-[11px] uppercase tracking-[0.35em] text-anbu-gold font-semibold"
                speed={4}
              >
                How It Works
              </ShinyText>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Your path from idea to launch
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-white/65 max-w-2xl mx-auto leading-[1.7]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              I guide you through each step with transparency, regular updates, and a
              clear process that takes the stress out of software development.
            </motion.p>
          </motion.div>

          {/* Unified Vertical Timeline for All Screens */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical connecting line */}
            <div className="absolute left-0 sm:left-8 lg:left-10 top-0 bottom-0 w-[2px] bg-white/10 hidden sm:block">
              <motion.div
                className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 via-emerald-500 to-amber-400"
                style={{
                  height: lineProgress,
                }}
              />
            </div>

            {/* Stages Stack */}
            <div className="space-y-8 lg:space-y-10 relative z-10">
              {processStages.map((stage, index) => (
                <ProcessCard key={stage.id} stage={stage} index={index} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="relative z-10 max-w-4xl mx-auto mt-20 lg:mt-24 pt-12 lg:pt-16 border-t border-white/10 text-center space-y-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <motion.h3
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Ready to start your journey?
            </motion.h3>

            <motion.p
              className="text-sm sm:text-base text-white/55 leading-[1.6]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Let's build something amazing together. Get in touch and I'll respond within 24 hours.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className={brandButton({ variant: 'primary', size: 'lg' })}
                >
                  Let's build together
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/#services"
                  className={brandButton({ variant: 'ghost', size: 'lg' })}
                >
                  Explore services first
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

// Unified Process Card Component
function ProcessCard({ stage, index }: { stage: ProcessStage; index: number }) {
  const Icon = stage.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="relative sm:pl-16"
    >
      {/* Timeline dot on the left line */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, duration: 0.3, type: 'spring' }}
        className={cn(
          'hidden sm:flex absolute left-[-14px] sm:left-[-14px] lg:left-[-14px] top-8 w-7 h-7 rounded-full items-center justify-center z-20 shadow-lg border-2 border-white/20',
          `bg-gradient-to-br ${stage.gradient}`
        )}
      >
        <Icon className="h-4 w-4 text-black" />
      </motion.div>

      {/* Card */}
      <div className="relative group">
        {/* Strategic left border colorization */}
        <div className={cn(
          'absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300',
          `bg-gradient-to-b ${stage.gradient}`,
          'opacity-60 group-hover:opacity-100 group-hover:w-1.5'
        )} />

        <CardSpotlight
          className="relative flex flex-col sm:flex-row gap-6 sm:gap-8 bg-gradient-to-br from-black/70 via-black/60 to-black/50 backdrop-blur-sm py-8 px-6 sm:py-10 sm:px-8 lg:px-10 group hover:border-white/20 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          color={stage.gradientFrom}
          radius={280}
        >
          <BorderBeam
            size={80}
            duration={12}
            delay={index * 3}
            colorFrom={stage.gradientFrom}
            colorTo={stage.gradientTo}
            borderWidth={1.5}
            className="opacity-0 group-hover:opacity-50 transition-opacity duration-700"
          />

          {/* Left Column: Icon, Number, Duration */}
          <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-6 sm:min-w-[140px]">
            {/* Mobile Icon (only on mobile) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={cn(
                'sm:hidden flex items-center justify-center w-14 h-14 rounded-xl text-black font-bold shadow-lg relative overflow-hidden',
                `bg-gradient-to-br ${stage.gradient}`
              )}
            >
              <Icon className="h-7 w-7 relative z-10" />
            </motion.div>

            {/* Stage Number */}
            <div className="flex-1 sm:flex-none">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-sm font-mono uppercase tracking-[0.25em] text-white/25 font-bold block"
              >
                {stage.number}
              </motion.span>
            </div>

            {/* Duration - Desktop */}
            <div className="hidden sm:flex items-start gap-2.5 mt-auto">
              <Clock className="h-4 w-4 text-anbu-gold/70 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-white/40 leading-tight">
                <div className="text-white/30 mb-0.5">Duration</div>
                <div className="text-white/60 font-semibold">{stage.duration}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 space-y-6">
            {/* Title */}
            <motion.h3
              className="text-lg sm:text-xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {stage.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-base leading-[1.75] text-white/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.25 }}
            >
              {stage.description}
            </motion.p>

            {/* Deliverables */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[11px] text-white/35 uppercase tracking-[0.12em] font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-anbu-gold/70" />
                <span>What you'll get</span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {stage.deliverables.map((deliverable, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 + i * 0.04 }}
                    className="flex items-start gap-2.5 text-sm text-white/55"
                  >
                    <span
                      className={cn(
                        'mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0',
                        `bg-gradient-to-r ${stage.gradient}`
                      )}
                    />
                    <span className="leading-[1.5]">{deliverable}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Duration - Mobile */}
            <div className="sm:hidden flex items-center gap-2.5 pt-2 border-t border-white/5">
              <Clock className="h-4 w-4 text-anbu-gold/70" />
              <span className="text-xs text-white/40">
                Duration: <span className="text-white/60 font-semibold">{stage.duration}</span>
              </span>
            </div>
          </div>
        </CardSpotlight>
      </div>
    </motion.div>
  )
}
