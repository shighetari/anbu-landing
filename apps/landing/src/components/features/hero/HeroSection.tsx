'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, ArrowRight, Briefcase, Rocket, Clock, Shield, TrendingUp } from '@/components/ui/lucide-safe'
import dynamic from 'next/dynamic'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/ui/terminal'
import { DecryptedText } from '@/components/reactbits/decrypted-text'
import { Button as MovingBorderButton } from '@/components/aceternity/moving-border'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { StarBorderButton } from '@/components/reactbits/star-border-button'
import { useScrolling } from '@/hooks/useScrolling'
import { BorderBeam } from '@/components/ui/border-beam'
import { ShinyText } from '@/components/magicui/shiny-text'
import { NumberTicker } from '@/components/ui/number-ticker'
import { TypewriterEffectSmooth } from '@/components/aceternity/typewriter-effect'
import { SparklesCore } from '@/components/aceternity/sparkles'
import { ArchIcon } from '@/components/icons/ArchIcon'
import { cn } from '@/lib/utils'
import { brandButton } from '@/lib/brand'
import { buttonVariants, animationVariants, buttonSizes } from '@/lib/button-variants'

const heroHighlights = [
  {
    value: 50,
    suffix: '+',
    label: 'projects delivered',
    detail: 'Apps and websites built for growing companies.',
    icon: TrendingUp,
  },
  {
    value: 24,
    suffix: 'hr',
    label: 'response time',
    detail: 'Fast replies when you need support.',
    icon: Clock,
  },
  {
    value: 99.9,
    suffix: '%',
    label: 'reliability',
    detail: 'Stable, tested code you can count on.',
    icon: Shield,
  },
]

const typewriterWords = [
  { text: "Strategize", className: "text-anbu-gold" },
  { text: "Build", className: "text-anbu-gold" },
  { text: "Scale", className: "text-anbu-gold" },
]

export default function HeroSection() {
  const isScrolling = useScrolling()
  const prefersReducedMotion = useReducedMotion()

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-[#080808] via-[#020202] to-[#080808] text-anbu-marble flex justify-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hero-gradient-layer"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"
      />

      <div className="relative z-30 flex min-h-[100dvh] flex-col justify-center pt-24 sm:pt-32 md:pt-28 lg:pt-24 pb-8 sm:pb-12 md:pb-16">
        <Container size="lg" className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex w-full flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 xl:space-y-8 text-center"
          >
            <div className="mt-1 sm:mt-3 md:mt-4">
              <TypewriterEffectSmooth
                words={typewriterWords}
                className="mx-auto my-2 flex items-center justify-center origin-center scale-[0.7] sm:scale-[0.72] md:scale-[0.46] lg:scale-[0.47] uppercase tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.26em] lg:tracking-[0.28em] text-anbu-gold"
              />
            </div>

            <motion.h1
              className="font-display text-[1.15rem] xs:text-[1.4rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[4.25rem] xl:text-[5.25rem] font-semibold leading-[1.1] px-2 xs:px-0"
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
                <DecryptedText
                  text="ANBU SOLUTIONS"
                  duration={2100}
                  revealDirection="center"
                  mono={false}
                  className="block font-display uppercase tracking-[0.08em] xs:tracking-[0.12em] sm:tracking-[0.18em] text-[1em]"
                />
              </AnimatedGradientText>
            </motion.h1>

            <motion.p
              className="max-w-3xl text-white/80 text-[0.8125rem] leading-[1.7] sm:text-[0.9rem] md:text-[1.05rem] lg:text-[1.15rem] xl:text-[1.25rem] px-4 sm:px-4 md:px-6 lg:px-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Get your product built by <span className="text-anbu-gold/90">an on-demand team of designers and developers</span>—without hiring full-time.
            </motion.p>

            <motion.div
              className="relative flex w-full flex-col items-center justify-center gap-2 sm:gap-2.5 md:flex-row md:gap-3 lg:gap-4"
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
                  containerClassName="w-full sm:min-w-[160px] md:min-w-[180px] md:w-auto"
                  borderClassName="bg-[radial-gradient(var(--anbu-gold)_40%,transparent_60%)] opacity-[0.65] group-hover:opacity-[0.9] transition-opacity duration-700"
                  className="px-4 sm:px-6 md:px-8 lg:px-9 py-2 sm:py-2.5 md:py-3 lg:py-3.5 text-[11px] sm:text-xs md:text-sm lg:text-base bg-gradient-to-br from-neutral-950 via-black to-neutral-900 backdrop-blur-xl border border-anbu-gold/20 font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] md:tracking-[0.12em] shadow-[0_8px_24px_rgba(255,215,0,0.2)] hover:shadow-[0_12px_36px_rgba(255,215,0,0.28)] transition-all duration-700 ease-out"
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
                  <span className="relative z-10 flex items-center gap-3 pointer-events-none">
                    <div className="transition-transform duration-500 ease-out group-hover:rotate-12">
                      <Rocket className="w-4 h-4 lg:w-5 lg:h-5 text-anbu-gold" />
                    </div>
                    <ShinyText className="text-anbu-gold" speed={4}>
                      Start Your Project
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
                  className="w-full sm:min-w-[160px] md:min-w-[180px] md:w-auto px-4 sm:px-6 md:px-8 lg:px-9 py-2 sm:py-2.5 md:py-3 lg:py-3.5 text-[11px] sm:text-xs md:text-sm lg:text-base shadow-[0_8px_24px_rgba(255,215,0,0.15)] hover:shadow-[0_12px_30px_rgba(255,215,0,0.22)] transition-all duration-700 ease-out"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  glow={true}
                >
                  <span className="flex items-center gap-2.5 sm:gap-3.5 font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] pointer-events-none">
                    <div className="transition-transform duration-500 ease-out group-hover:scale-110">
                      <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    See What We Build
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
              className="w-full max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.9 }}
            >
              <NeonGradientCard
                className="text-left text-white"
                contentClassName="border border-white/10 bg-neutral-950/95 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
                neonColors={{ firstColor: '#FFD700', secondColor: '#FF9D2E' }}
                borderSize={2}
              >
                <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-6 grid-cols-3">
                  {heroHighlights.map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                      className="flex flex-col items-center gap-0.5 sm:gap-1 rounded-xl bg-white/5 px-2 sm:px-3 py-1.5 sm:py-2 text-center"
                    >
                      <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1 justify-center">
                        <item.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-anbu-gold/60" />
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-[#FFEE9A]">
                          <NumberTicker
                            value={item.value}
                            startValue={0}
                            delay={0.5}
                            decimalPlaces={item.suffix === '%' ? 1 : 0}
                          />
                          {item.suffix}
                        </span>
                      </div>
                      <span className="text-[0.5rem] sm:text-[0.625rem] md:fluid-text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em] text-anbu-gold/70 leading-tight">
                        {item.label}
                      </span>
                      <p className="text-[0.6rem] sm:text-[0.7rem] md:fluid-text-sm text-white/70 leading-snug hidden sm:block">{item.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </NeonGradientCard>
            </motion.div>

            <motion.div
              className="w-full max-w-2xl sm:max-w-3xl flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
            >
              <Terminal className="border border-white/10 bg-neutral-950/90 shadow-[0_20px_50px_rgba(0,0,0,0.55)] w-full max-w-2xl p-2 sm:p-3 md:p-4 lg:p-5">
                <div className="font-mono text-xs sm:text-[13px] md:text-sm text-anbu-gold/80 flex items-center gap-2">
                  <ArchIcon size="md" />
                  <TypingAnimation startOnView>
                    $ npm install @anbu/solutions
                  </TypingAnimation>
                </div>
                <AnimatedSpan className="font-mono text-[11px] sm:text-xs md:text-sm text-[#9AE6FF]">installing packages...</AnimatedSpan>
                <AnimatedSpan className="font-mono text-[11px] sm:text-xs md:text-sm text-[#9AE6FF]">setting up your project...</AnimatedSpan>
                <TypingAnimation className="font-mono text-[11px] sm:text-xs md:text-sm text-[#7CFFAE]" delay={900}>
                  ✅ ready to launch
                </TypingAnimation>
                <TypingAnimation className="font-mono text-[11px] sm:text-xs md:text-sm text-[#F7D774]" delay={1400}>
                  → check out our examples to get started
                </TypingAnimation>
              </Terminal>
            </motion.div>
          </motion.div>

          <motion.button
            type="button"
            className={cn(
              'absolute bottom-16 sm:bottom-18 md:bottom-20 lg:bottom-20 left-1/2 -translate-x-1/2 pointer-events-auto',
              brandButton({
                variant: 'ghost',
                size: 'sm',
                className:
                  'flex-col gap-1 px-3 py-2 sm:px-4 sm:py-3 text-[0.65rem] sm:text-[0.7rem] tracking-[0.28em] text-anbu-gold/85 border-white/20 bg-transparent hover:bg-white/5 backdrop-blur-none',
              }),
            )}
            aria-label="Scroll to the services section"
            onClick={scrollToServices}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isScrolling ? 0 : 1, y: isScrolling ? 10 : 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            style={{ pointerEvents: isScrolling ? 'none' : 'auto' }}
          >
            <span className="hidden sm:block">Scroll</span>
            <motion.span
              aria-hidden
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { y: [0, 6, 0] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
              }
              className="flex items-center justify-center rounded-full bg-anbu-gold/20 p-1"
            >
              <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
            </motion.span>
          </motion.button>
        </Container>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </section>
  )
}
