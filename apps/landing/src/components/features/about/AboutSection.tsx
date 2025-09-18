'use client'

import { ShieldCheck, Sparkles, Trophy, Zap } from 'lucide-react'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { ShineBorder } from '@/components/ui/shine-border'
import { GradualBlurSection } from '@/components/reactbits/gradual-blur-section'
import { LogoLoop } from '@/components/reactbits/logo-loop'
import { PixelImage } from '@/components/ui/pixel-image'

const differentiators = [
  {
    title: 'Clean Code',
    description: 'Modular architectures, automated quality gates, and documentation aligned to regulated teams.',
    icon: Trophy,
  },
  {
    title: 'Client Focused',
    description:
      'We align roadmaps with business KPIs so every launch reinforces revenue, retention, or operational leverage.',
    icon: Sparkles,
  },
  {
    title: 'Performance',
    description: 'Observability-first engineering with SLO dashboards, chaos drills, and rapid rollback tooling.',
    icon: Zap,
  },
  {
    title: 'Security First',
    description: 'Zero trust defaults, threat modeling, and compliance-ready release practices baked into delivery.',
    icon: ShieldCheck,
  },
]

const techStack = [
  { render: <span className="text-sm font-semibold text-white/80">Next.js</span>, alt: 'Next.js' },
  { render: <span className="text-sm font-semibold text-white/80">React</span>, alt: 'React' },
  { render: <span className="text-sm font-semibold text-white/80">Tailwind</span>, alt: 'Tailwind' },
  { render: <span className="text-sm font-semibold text-white/80">AWS</span>, alt: 'AWS' },
  { render: <span className="text-sm font-semibold text-white/80">Edge AI</span>, alt: 'Edge AI' },
  { render: <span className="text-sm font-semibold text-white/80">Supabase</span>, alt: 'Supabase' },
]

export default function AboutSection() {
  return (
    <GradualBlurSection className="relative overflow-hidden py-28" id="about">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      <div className="absolute inset-0 opacity-30 mix-blend-screen" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_70%,rgba(255,215,0,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,165,0,0.12),transparent_60%)]" />
      </div>

      <Container size="md" className="relative grid w-full gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-8">
          <div className="space-y-6">
            <AnimatedGradientText
              className="inline-block text-sm uppercase tracking-[0.4em] text-anbu-gold"
              colorFrom="#FFDA67"
              colorTo="#FFA533"
            >
              Why choose anbu
            </AnimatedGradientText>
            <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
              Boutique execution with enterprise governance
            </h2>
            <p className="text-base text-white/70 sm:text-lg">
              We embed alongside product, engineering, and operations leaders to create software that looks
              extraordinary, behaves predictably, and scales effortlessly. Every engagement arrives with measurable
              outcomes and a comprehensive enablement plan.
            </p>
          </div>

          <LogoLoop
            logos={techStack}
            speed={28}
            className="mt-4"
            fadeEdges
          />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item.title} className="relative overflow-hidden rounded-xl border border-white/10 bg-black/70 p-6">
                <ShineBorder
                  borderWidth={2}
                  duration={14}
                  shineColor={["#FFD700", "#FF9F3C", "#FFE27A"]}
                />
                <item.icon className="h-8 w-8 text-anbu-gold" />
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex flex-col items-center gap-8">
          <PixelImage
            src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80"
            grid="6x4"
          />
          <p className="max-w-md text-center text-sm text-white/60">
            Premium journeys deserve artifacts worth showcasing. Our teams combine research, prototyping, development,
            and change management to deliver results clients are proud to demo.
          </p>
        </div>
      </Container>
    </GradualBlurSection>
  )
}
