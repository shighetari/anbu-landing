'use client'

import {
  CircuitBoard,
  Globe2,
  Layers3,
  Sparkles,
} from 'lucide-react'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { ShineBorder } from '@/components/ui/shine-border'
import { GradualBlurSection } from '@/components/reactbits/gradual-blur-section'

const services = [
  {
    id: 'portal',
    name: 'ANBU Solutions Portal',
    description:
      'Configured delivery pipelines, concierge onboarding, and cross-team observability under one polished workspace.',
    href: '/solutions-portal',
    cta: 'Launch portal',
    icon: Globe2,
    tooltip: 'Portal',
    gradient: 'from-[#FFD700]/40 via-[#FFAF3B]/20 to-transparent',
  },
  {
    id: 'experience',
    name: 'Experience Engineering',
    description:
      'Product strategy, interface systems, and motion design shaped to premium brand expectations.',
    href: '/#contact',
    cta: 'Plan a build',
    icon: Sparkles,
    tooltip: 'Experience',
    gradient: 'from-[#FFED4E]/50 via-[#FFE9A0]/20 to-transparent',
  },
  {
    id: 'data',
    name: 'Intelligence & Data Ops',
    description:
      'Analytics command centers, revenue telemetry, and automated executive reporting with governed access.',
    href: '/docs-hub',
    cta: 'Review documentation',
    icon: Layers3,
    tooltip: 'Intelligence',
    gradient: 'from-[#F0D18A]/45 via-[#FFBD59]/20 to-transparent',
  },
  {
    id: 'automation',
    name: 'Automation Architecture',
    description:
      'Workflow orchestration, AI-assisted agent tooling, and high-availability runtimes tuned for service organizations.',
    href: '/#contact',
    cta: 'Design an automation track',
    icon: CircuitBoard,
    tooltip: 'Automation',
    gradient: 'from-[#FFE07A]/45 via-[#FFD700]/15 to-transparent',
  },
]

export default function ServicesSection() {
  return (
    <GradualBlurSection
      id="services"
      className="relative overflow-hidden py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-black" />
      <div className="absolute inset-0 opacity-40 mix-blend-screen" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,215,0,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,168,0,0.08),transparent_60%)]" />
      </div>

      <Container size="md" className="relative flex w-full flex-col gap-16">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedGradientText
            className="text-sm uppercase tracking-[0.45em] text-anbu-gold"
            colorFrom="#FFED4E"
            colorTo="#FF9D2E"
            speed={1.2}
          >
            Core capabilities
          </AnimatedGradientText>
          <h2 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Systems that engineer measurable luxury
          </h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Every engagement combines meticulous experience design with resilient delivery infrastructure so
            stakeholders can launch, iterate, and scale with certainty.
          </p>
        </div>

        <BentoGrid className="grid-cols-1 md:grid-cols-2">
          {services.map((service) => (
            <BentoCard
              key={service.id}
              name={service.name}
              Icon={service.icon}
              description={service.description}
              href={service.href}
              cta={service.cta}
              tooltip={service.tooltip}
              className="relative bg-black/75 text-white transition-shadow hover:shadow-[0_20px_60px_rgba(255,215,0,0.12)]"
              background={
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.gradient}`}
                  />
                  <ShineBorder
                    borderWidth={2}
                    duration={12}
                    shineColor={["#FFD700", "#FFB347", "#FFE27A"]}
                  />
                </div>
              }
            />
          ))}
        </BentoGrid>
      </Container>
    </GradualBlurSection>
  )
}
