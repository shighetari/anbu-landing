'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Lightbulb,
  Palette,
  Code2,
  Rocket,
  CheckCircle2,
  Clock,
  ArrowRight,
} from '@/components/ui/lucide-safe';
import Link from 'next/link';

import { CardSpotlight } from '@/components/aceternity/card-spotlight';
import { BorderBeam } from '@/components/ui/border-beam';
import { ShinyText } from '@/components/magicui/shiny-text';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { brandButton } from '@/lib/brand';

interface ProcessStage {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
  icon: React.ElementType;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
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
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} id="how-it-works" className="mt-20">
      <Container size="lg" className="px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] via-black/50 to-black/70 py-16 sm:py-20 lg:py-24">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-anbu-gold/5 via-transparent to-transparent" />

          {/* Subtle radial gradient for depth */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.08),transparent_50%)]" />

          {/* Header */}
          <motion.div
            className="relative z-10 mx-auto mb-16 max-w-4xl space-y-5 text-center lg:mb-20"
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
                className="text-[11px] font-semibold uppercase tracking-[0.35em] text-anbu-gold"
                speed={4}
              >
                How It Works
              </ShinyText>
            </motion.div>

            <motion.h2
              className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Your path from idea to launch
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-base leading-[1.7] text-white/65 sm:text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              I guide you through each step with transparency, regular updates, and a clear process
              that takes the stress out of software development.
            </motion.p>
          </motion.div>

          {/* Unified Vertical Timeline for All Screens */}
          <div className="relative mx-auto max-w-4xl">
            {/* Vertical connecting line */}
            <div className="absolute bottom-0 left-0 top-0 hidden w-[2px] bg-white/10 sm:left-8 sm:block lg:left-10">
              <motion.div
                className="w-full bg-gradient-to-b from-cyan-400 via-emerald-500 via-purple-500 to-amber-400"
                style={{
                  height: lineProgress,
                }}
              />
            </div>

            {/* Stages Stack */}
            <div className="relative z-10 space-y-8 lg:space-y-10">
              {processStages.map((stage, index) => (
                <ProcessCard key={stage.id} stage={stage} index={index} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="relative z-10 mx-auto mt-20 max-w-4xl space-y-7 border-t border-white/10 pt-12 text-center lg:mt-24 lg:pt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <motion.h3
              className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Ready to start your journey?
            </motion.h3>

            <motion.p
              className="text-sm leading-[1.6] text-white/55 sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Let's build something amazing together. Get in touch and I'll respond within 24 hours.
            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact" className={brandButton({ variant: 'primary', size: 'lg' })}>
                  Let's build together
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/#services" className={brandButton({ variant: 'ghost', size: 'lg' })}>
                  Explore services first
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Unified Process Card Component
function ProcessCard({ stage, index }: { stage: ProcessStage; index: number }) {
  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
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
          'absolute left-[-14px] top-8 z-20 hidden h-7 w-7 items-center justify-center rounded-full border-2 border-white/20 shadow-lg sm:left-[-14px] sm:flex lg:left-[-14px]',
          `bg-gradient-to-br ${stage.gradient}`
        )}
      >
        <Icon className="h-4 w-4 text-anbu-ink" />
      </motion.div>

      {/* Card */}
      <div className="group relative">
        {/* Strategic left border colorization */}
        <div
          className={cn(
            'absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl transition-all duration-300',
            `bg-gradient-to-b ${stage.gradient}`,
            'opacity-60 group-hover:w-1.5 group-hover:opacity-100'
          )}
        />

        <CardSpotlight
          className="group relative flex flex-col gap-6 bg-gradient-to-br from-black/70 via-black/60 to-black/50 px-6 py-8 shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] sm:flex-row sm:gap-8 sm:px-8 sm:py-10 lg:px-10"
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
            className="opacity-0 transition-opacity duration-700 group-hover:opacity-50"
          />

          {/* Left Column: Icon, Number, Duration */}
          <div className="flex items-center gap-4 sm:min-w-[140px] sm:flex-col sm:items-start sm:gap-6">
            {/* Mobile Icon (only on mobile) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={cn(
                'relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl font-bold text-anbu-ink shadow-lg sm:hidden',
                `bg-gradient-to-br ${stage.gradient}`
              )}
            >
              <Icon className="relative z-10 h-7 w-7" />
            </motion.div>

            {/* Stage Number */}
            <div className="flex-1 sm:flex-none">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="block font-mono text-sm font-bold uppercase tracking-[0.25em] text-white/25"
              >
                {stage.number}
              </motion.span>
            </div>

            {/* Duration - Desktop */}
            <div className="mt-auto hidden items-start gap-2.5 sm:flex">
              <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-anbu-gold/70" />
              <div className="text-xs leading-tight text-white/40">
                <div className="mb-0.5 text-white/30">Duration</div>
                <div className="font-semibold text-white/60">{stage.duration}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 space-y-6">
            {/* Title */}
            <motion.h3
              className="text-lg font-bold leading-tight text-white sm:text-xl"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {stage.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-sm leading-[1.75] text-white/60 sm:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.25 }}
            >
              {stage.description}
            </motion.p>

            {/* Deliverables */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">
                <CheckCircle2 className="h-3.5 w-3.5 text-anbu-gold/70" />
                <span>What you'll get</span>
              </div>
              <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
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
                        'mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full',
                        `bg-gradient-to-r ${stage.gradient}`
                      )}
                    />
                    <span className="leading-[1.5]">{deliverable}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Duration - Mobile */}
            <div className="flex items-center gap-2.5 border-t border-white/5 pt-2 sm:hidden">
              <Clock className="h-4 w-4 text-anbu-gold/70" />
              <span className="text-xs text-white/40">
                Duration: <span className="font-semibold text-white/60">{stage.duration}</span>
              </span>
            </div>
          </div>
        </CardSpotlight>
      </div>
    </motion.div>
  );
}
