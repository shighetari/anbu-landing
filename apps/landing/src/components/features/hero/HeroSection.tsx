'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import CountUp from 'react-countup'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/ui/terminal'
import { DecryptedText } from '@/components/reactbits/decrypted-text'
import { StarBorderButton } from '@/components/reactbits/star-border-button'

const heroHighlights = [
  {
    value: 50,
    suffix: '+',
    label: 'premier launches',
    detail: 'Enterprise deployments delivered end-to-end.',
  },
  {
    value: 24,
    suffix: 'hr',
    label: 'response window',
    detail: 'Rapid support for high-priority partners.',
  },
  {
    value: 99.9,
    suffix: '%',
    label: 'uptime target',
    detail: 'Reliability engineered into every release.',
  },
]

const BackgroundSparkles = dynamic(() => import('./LetterGlitch'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-transparent" />,
})

export default function HeroSection() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#080808] via-[#020202] to-[#080808] text-anbu-marble"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,215,0,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(255,168,0,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_65%)]" />
      </div>

      <div className="absolute inset-0 opacity-[0.2]">
        <BackgroundSparkles />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/35 to-black/80" />

      <div className="relative z-30 flex min-h-screen flex-col justify-center pb-36 pt-32">
        <Container size="md" className="flex w-full flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex w-full flex-col items-center gap-14 text-center"
          >
            <DecryptedText
              text="Innovate ∙ Engineer ∙ Elevate"
              className="mb-6 text-[0.7rem] text-anbu-gold/70"
              revealDirection="center"
            />

            <motion.h1
              className="font-display text-[clamp(3.25rem,8vw,6.5rem)] font-semibold leading-none"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <AnimatedGradientText
                className="block text-balance drop-shadow-[0_0_40px_rgba(255,215,0,0.45)]"
                colorFrom="#FFE680"
                colorTo="#FFB347"
                speed={1.4}
              >
                ANBU Solutions
              </AnimatedGradientText>
            </motion.h1>

            <motion.p
              className="max-w-3xl text-base text-white/80 sm:text-lg md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              We craft premium product journeys for executive teams that expect precision.
              <span className="text-anbu-gold/90">
                {' '}Interfaces, data orchestration, and scale-ready automation
              </span>{' '}
              delivered by a studio that pairs enterprise discipline with atelier-level detail.
            </motion.p>

            <motion.div
              className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <StarBorderButton className="w-full bg-black sm:w-auto" onClick={scrollToServices}>
                Request Strategy Session
              </StarBorderButton>
              <StarBorderButton
                className="w-full bg-transparent text-anbu-gold shadow-[0_0_0_1px_rgba(255,215,0,0.35)] hover:text-black sm:w-auto"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Offerings
              </StarBorderButton>
            </motion.div>

            <motion.div
              className="w-full max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.9 }}
            >
              <NeonGradientCard
                className="text-left text-white"
                contentClassName="border border-white/10 bg-neutral-950/95 px-10 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                neonColors={{ firstColor: '#FFD700', secondColor: '#FF9D2E' }}
                borderSize={3}
              >
                <div className="grid gap-8 sm:grid-cols-3">
                  {heroHighlights.map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                      className="flex flex-col items-start gap-2 rounded-xl bg-white/5 px-4 py-3 sm:items-center sm:text-center"
                    >
                      <span className="text-4xl font-semibold tracking-tight text-[#FFEE9A] sm:text-5xl">
                        <CountUp
                          end={item.value}
                          decimals={item.suffix === '%' ? 1 : undefined}
                          suffix={item.suffix}
                          duration={2.2}
                        />
                      </span>
                      <span className="text-[0.65rem] uppercase tracking-[0.35em] text-anbu-gold/70">
                        {item.label}
                      </span>
                      <p className="text-sm text-white/70">{item.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </NeonGradientCard>
            </motion.div>

            <motion.div
              className="w-full max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
            >
              <Terminal className="border border-white/10 bg-neutral-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
                <TypingAnimation className="font-mono text-[13px] text-anbu-gold/80" startOnView>
                  arch linux ➜ sudo pacman -S anbu-suite
                </TypingAnimation>
                <AnimatedSpan className="font-mono text-xs text-[#9AE6FF]">resolving packages...</AnimatedSpan>
                <AnimatedSpan className="font-mono text-xs text-[#9AE6FF]">syncing premium ui system...</AnimatedSpan>
                <TypingAnimation className="font-mono text-xs text-[#7CFFAE]" delay={900}>
                  ✅ deployment ready for production teams
                </TypingAnimation>
                <TypingAnimation className="font-mono text-xs text-[#F7D774]" delay={1400}>
                  → open docs/roadmap to preview upcoming modules
                </TypingAnimation>
              </Terminal>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-xs uppercase tracking-[0.4em] text-anbu-gold/70 sm:flex"
            onClick={scrollToServices}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span>Scroll</span>
            <ChevronDown className="h-6 w-6 animate-bounce text-[#FFD700]" />
          </motion.div>
        </Container>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </section>
  )
}
