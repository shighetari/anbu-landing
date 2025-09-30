'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Briefcase, Rocket, Clock, Shield, TrendingUp } from 'lucide-react'
import dynamic from 'next/dynamic'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/ui/terminal'
import { DecryptedText } from '@/components/reactbits/decrypted-text'
import { Button as MovingBorderButton } from '@/components/aceternity/moving-border'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { StarBorderButton } from '@/components/reactbits/star-border-button'
import { BorderBeam } from '@/components/ui/border-beam'
import { ShinyText } from '@/components/magicui/shiny-text'
import { NumberTicker } from '@/components/ui/number-ticker'
import { BackgroundBeams } from '@/components/aceternity/background-beams'
import { TypewriterEffectSmooth } from '@/components/aceternity/typewriter-effect'
import { SparklesCore } from '@/components/aceternity/sparkles'
import { ArchIcon } from '@/components/icons/ArchIcon'
import { cn } from '@/lib/utils'
import { buttonVariants, animationVariants, buttonSizes } from '@/lib/button-variants'

const heroHighlights = [
  {
    value: 50,
    suffix: '+',
    label: 'premier launches',
    detail: 'Enterprise deployments delivered end-to-end.',
    icon: TrendingUp,
  },
  {
    value: 24,
    suffix: 'hr',
    label: 'response window',
    detail: 'Rapid support for high-priority partners.',
    icon: Clock,
  },
  {
    value: 99.9,
    suffix: '%',
    label: 'uptime target',
    detail: 'Reliability engineered into every release.',
    icon: Shield,
  },
]

const typewriterWords = [
  { text: "Innovate", className: "text-anbu-gold" },
  { text: "Engineer", className: "text-anbu-gold" },
  { text: "Elevate", className: "text-anbu-gold" },
]

export default function HeroSection() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-[#080808] via-[#020202] to-[#080808] text-anbu-marble flex justify-center"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,215,0,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(255,168,0,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_65%)]" />
      </div>

      <BackgroundBeams className="absolute inset-0 opacity-30" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/35 to-black/80" />

      <div className="relative z-30 flex min-h-[100dvh] flex-col justify-center pt-20 sm:pt-24 md:pt-20 lg:pt-16 pb-8 sm:pb-12 md:pb-16">
        <Container size="lg" className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex w-full flex-col items-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 text-center"
          >
            <div className="mt-0 sm:mt-2 md:mt-3">
              <TypewriterEffectSmooth
                words={typewriterWords}
                className="text-[10px] sm:text-xs md:text-sm lg:text-base tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] lg:tracking-[0.4em] uppercase"
              />
            </div>

            <motion.h1
              className="font-display text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.1]"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <AnimatedGradientText
                className="block text-balance drop-shadow-[0_0_20px_rgba(255,215,0,0.35)] sm:drop-shadow-[0_0_30px_rgba(255,215,0,0.4)] lg:drop-shadow-[0_0_40px_rgba(255,215,0,0.45)]"
                colorFrom="#FFE680"
                colorTo="#FFB347"
                speed={1.4}
              >
                ANBU Solutions
              </AnimatedGradientText>
            </motion.h1>

            <motion.p
              className="max-w-3xl text-white/80 text-[0.8rem] leading-[1.6] sm:text-sm md:text-base lg:text-lg xl:text-xl px-2 sm:px-4 md:px-6 lg:px-0"
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
              className="relative flex w-full flex-col items-center justify-center gap-3 sm:gap-4 md:flex-row md:gap-5 lg:gap-6 mt-3 sm:mt-4 md:mt-6 lg:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {/* Primary CTA with MovingBorderButton and refined effects */}
              <motion.div
                className="relative group shadow-[0_10px_30px_rgba(255,215,0,0.2)] hover:shadow-[0_12px_35px_rgba(255,215,0,0.25)] transition-shadow duration-700"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 25,
                  mass: 1
                }}
              >
                <MovingBorderButton
                  borderRadius="1rem"
                  containerClassName="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] w-full md:w-auto"
                  borderClassName="bg-[radial-gradient(var(--anbu-gold)_40%,transparent_60%)] opacity-[0.7] group-hover:opacity-[0.9] transition-opacity duration-700"
                  className="px-8 sm:px-10 md:px-14 lg:px-16 py-4 sm:py-5 md:py-6 lg:py-7 text-[11px] sm:text-xs md:text-sm lg:text-base bg-gradient-to-br from-neutral-950 via-black to-neutral-900 backdrop-blur-xl border border-anbu-gold/20 font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] shadow-[0_10px_30px_rgba(255,215,0,0.2)] hover:shadow-[0_15px_40px_rgba(255,215,0,0.3)] transition-all duration-700 ease-out"
                  duration={4000}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {/* Subtle sparkles effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none">
                    <SparklesCore
                      id="hero-primary-sparkles"
                      background="transparent"
                      particleColor="#FFD700"
                      className="h-full w-full"
                      particleDensity={8}
                      minSize={0.3}
                      maxSize={0.8}
                    />
                  </div>
                  <span className="relative z-10 flex items-center gap-4 pointer-events-none">
                    <div className="transition-transform duration-500 ease-out group-hover:rotate-12">
                      <Rocket className="w-4 h-4 lg:w-5 lg:h-5 text-anbu-gold" />
                    </div>
                    <ShinyText className="text-anbu-gold" speed={4}>
                      Start Project
                    </ShinyText>
                    <motion.div
                      className="text-anbu-gold"
                      animate={{ x: [0, 2, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: 'easeInOut'
                      }}
                    >
                      →
                    </motion.div>
                  </span>
                  <BorderBeam
                    size={60}
                    duration={5}
                    delay={0}
                    colorFrom="#FFD700"
                    colorTo="#FFA500"
                    borderWidth={1}
                  />
                </MovingBorderButton>
              </motion.div>

              {/* Secondary CTA with StarBorderButton */}
              <motion.div
                className="group opacity-95 hover:opacity-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 25,
                  mass: 1
                }}
              >
                <StarBorderButton
                  className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] w-full md:w-auto px-8 sm:px-10 md:px-14 lg:px-16 py-4 sm:py-5 md:py-6 lg:py-7 text-[11px] sm:text-xs md:text-sm lg:text-base shadow-[0_10px_30px_rgba(255,215,0,0.15)] hover:shadow-[0_15px_35px_rgba(255,215,0,0.25)] transition-all duration-700 ease-out"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  glow={true}
                >
                  <span className="flex items-center gap-3 sm:gap-4 font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] pointer-events-none">
                    <div className="transition-transform duration-500 ease-out group-hover:scale-110">
                      <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    Our Work
                    <motion.div
                      animate={{ y: [0, 2, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: 'easeInOut'
                      }}
                    >
                      ↓
                    </motion.div>
                  </span>
                </StarBorderButton>
              </motion.div>
            </motion.div>

            <motion.div
              className="w-full max-w-4xl mt-4 sm:mt-6 md:mt-8 lg:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.9 }}
            >
              <NeonGradientCard
                className="text-left text-white"
                contentClassName="border border-white/10 bg-neutral-950/95 px-4 lg:px-6 py-4 lg:py-6 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                neonColors={{ firstColor: '#FFD700', secondColor: '#FF9D2E' }}
                borderSize={2}
              >
                <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-3">
                  {heroHighlights.map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                      className="flex flex-col items-center gap-1 rounded-xl bg-white/5 px-3 py-2 text-center"
                    >
                      <div className="flex items-center gap-2 mb-1 justify-center">
                        <item.icon className="w-5 h-5 text-anbu-gold/60" />
                        <span className="text-2xl lg:text-3xl font-semibold tracking-tight text-[#FFEE9A]">
                          <NumberTicker
                            value={item.value}
                            startValue={0}
                            delay={0.5}
                            decimalPlaces={item.suffix === '%' ? 1 : 0}
                          />
                          {item.suffix}
                        </span>
                      </div>
                      <span className="fluid-text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-anbu-gold/70">
                        {item.label}
                      </span>
                      <p className="fluid-text-sm text-white/70">{item.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </NeonGradientCard>
            </motion.div>

            <motion.div
              className="w-full max-w-2xl sm:max-w-3xl flex justify-center mt-3 sm:mt-4 md:mt-6 lg:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
            >
              <Terminal className="border border-white/10 bg-neutral-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.55)] w-full max-w-2xl p-3 sm:p-4 lg:p-6">
                <div className="font-mono text-xs sm:text-[13px] md:text-sm text-anbu-gold/80 flex items-center gap-2">
                  <ArchIcon size="md" />
                  <TypingAnimation startOnView>
                    arch linux ➜ sudo pacman -S anbu-suite
                  </TypingAnimation>
                </div>
                <AnimatedSpan className="font-mono text-[11px] sm:text-xs md:text-sm text-[#9AE6FF]">resolving packages...</AnimatedSpan>
                <AnimatedSpan className="font-mono text-[11px] sm:text-xs md:text-sm text-[#9AE6FF]">syncing premium ui system...</AnimatedSpan>
                <TypingAnimation className="font-mono text-[11px] sm:text-xs md:text-sm text-[#7CFFAE]" delay={900}>
                  ✅ deployment ready for production teams
                </TypingAnimation>
                <TypingAnimation className="font-mono text-[11px] sm:text-xs md:text-sm text-[#F7D774]" delay={1400}>
                  → open docs/roadmap to preview upcoming mod
                </TypingAnimation>
              </Terminal>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-6 sm:bottom-8 md:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] text-anbu-gold/80 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full border border-anbu-gold/20 hover:bg-black/50 hover:border-anbu-gold/40 transition-all duration-300"
            onClick={scrollToServices}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden sm:block">Scroll</span>
            <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce text-[#FFD700]" />
          </motion.div>
        </Container>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </section>
  )
}
