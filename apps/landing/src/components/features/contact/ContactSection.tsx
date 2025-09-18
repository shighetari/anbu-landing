'use client'

import { ArrowUpRight, Mail, MessageSquare } from 'lucide-react'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { ShineBorder } from '@/components/ui/shine-border'
import { GradualBlurSection } from '@/components/reactbits/gradual-blur-section'
import { StarBorderButton } from '@/components/reactbits/star-border-button'

const contactOptions = [
  {
    title: 'Email Us',
    description: 'Share project details or ask us anything. We reply within one business day.',
    icon: Mail,
    href: 'mailto:contact@anbu.ai',
    label: 'contact@anbu.ai',
  },
  {
    title: 'Book a Call',
    description: 'Schedule a discovery session so we can map out your goals and next steps.',
    icon: MessageSquare,
    href: 'https://cal.com/',
    label: 'Schedule a consultation',
  },
]

export default function ContactSection() {
  return (
    <GradualBlurSection
      id="contact"
      className="relative overflow-hidden py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      <div className="absolute inset-0 opacity-30 mix-blend-screen" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,215,0,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,168,0,0.12),transparent_65%)]" />
      </div>

      <Container size="md" className="relative flex w-full flex-col items-center gap-10 text-center">
        <AnimatedGradientText
          className="text-sm uppercase tracking-[0.45em] text-anbu-gold"
          colorFrom="#FFED4E"
          colorTo="#FFAB34"
        >
          Let’s partner
        </AnimatedGradientText>
        <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
          Start your project with confidence
        </h2>
        <p className="max-w-2xl text-base text-white/70 sm:text-lg">
          Tell us about your idea and we will craft a plan to bring it to life. From discovery to deployment, the ANBU
          team is ready to help.
        </p>

        <div className="grid w-full gap-6 md:grid-cols-2">
          {contactOptions.map((option) => (
            <a
              key={option.title}
              href={option.href}
              target={option.href.startsWith('http') ? '_blank' : undefined}
              rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/70 p-8 text-left transition-colors hover:border-anbu-gold/40"
            >
              <ShineBorder
                borderWidth={2}
                duration={12}
                shineColor={["#FFD700", "#FF9D2E", "#FFE27A"]}
              />
              <div className="relative flex flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-anbu-gold/15 text-anbu-gold">
                  <option.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{option.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">
                    {option.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-anbu-gold">
                  {option.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <StarBorderButton
          className="mt-6 bg-black px-10 py-4 text-anbu-gold"
          onClick={() => window.open('mailto:contact@anbu.ai')}
        >
          Share your brief
        </StarBorderButton>
      </Container>
    </GradualBlurSection>
  )
}
