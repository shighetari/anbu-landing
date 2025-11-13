'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Briefcase,
  Rocket,
  Clock,
  Shield,
  TrendingUp,
} from '@/components/ui/lucide-safe';
import dynamic from 'next/dynamic';

import Container from '@/components/ui/Container';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/ui/terminal';
import { DecryptedText } from '@/components/reactbits/decrypted-text';
import { Button as MovingBorderButton } from '@/components/aceternity/moving-border';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { StarBorderButton } from '@/components/reactbits/star-border-button';
import { useScrolling } from '@/hooks/useScrolling';
import { BorderBeam } from '@/components/ui/border-beam';
import { ShinyText } from '@/components/magicui/shiny-text';
import { NumberTicker } from '@/components/ui/number-ticker';
import { TypewriterEffectSmooth } from '@/components/aceternity/typewriter-effect';
import { SparklesCore } from '@/components/aceternity/sparkles';
import { ArchIcon } from '@/components/icons/ArchIcon';
import { cn } from '@/lib/utils';
import { brandButton } from '@/lib/brand';
import { buttonVariants, animationVariants, buttonSizes } from '@/lib/button-variants';

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
];

const typewriterWords = [
  { text: 'Strategize', className: 'text-anbu-gold' },
  { text: 'Build', className: 'text-anbu-gold' },
  { text: 'Scale', className: 'text-anbu-gold' },
];

export default function HeroSection() {
  const isScrolling = useScrolling();
  const prefersReducedMotion = useReducedMotion();

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] w-full justify-center overflow-hidden bg-gradient-to-b from-[#080808] via-[#020202] to-[#080808] text-anbu-marble"
    >
      <div aria-hidden className="hero-gradient-layer pointer-events-none absolute inset-0" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"
      />

      <div className="relative z-30 flex min-h-[100dvh] flex-col justify-center pb-8 pt-24 sm:pb-12 sm:pt-32 md:pb-16 md:pt-28 lg:pt-24">
        <Container size="lg" className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex w-full flex-col items-center space-y-2 text-center sm:space-y-3 md:space-y-4 lg:space-y-6 xl:space-y-8"
          >
            <div className="mt-1 sm:mt-3 md:mt-4">
              <TypewriterEffectSmooth
                words={typewriterWords}
                className="mx-auto my-2 flex origin-center scale-[0.7] items-center justify-center uppercase tracking-[0.14em] text-anbu-gold sm:scale-[0.72] sm:tracking-[0.18em] md:scale-[0.46] md:tracking-[0.26em] lg:scale-[0.47] lg:tracking-[0.28em]"
              />
            </div>

            <motion.h1
              className="px-2 font-display text-[1.15rem] font-semibold leading-[1.1] xs:px-0 xs:text-[1.4rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[4.25rem] xl:text-[5.25rem]"
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
                  className="block font-display text-[1em] uppercase tracking-[0.08em] xs:tracking-[0.12em] sm:tracking-[0.18em]"
                />
              </AnimatedGradientText>
            </motion.h1>

            <motion.p
              className="max-w-3xl px-4 text-[0.8125rem] leading-[1.7] text-white/80 sm:px-4 sm:text-[0.9rem] md:px-6 md:text-[1.05rem] lg:px-0 lg:text-[1.15rem] xl:text-[1.25rem]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Get your product built by{' '}
              <span className="text-anbu-gold/90">
                an on-demand team of designers and developers
              </span>
              —without hiring full-time.
            </motion.p>

            <motion.div
              className="relative flex w-full flex-col items-center justify-center gap-2 sm:gap-2.5 md:flex-row md:gap-3 lg:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {/* Primary CTA with MovingBorderButton and refined effects */}
              <motion.div
                className="group relative shadow-[0_10px_30px_rgba(255,215,0,0.2)] transition-shadow duration-700 hover:shadow-[0_12px_35px_rgba(255,215,0,0.25)]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 25,
                  mass: 1,
                }}
              >
                <MovingBorderButton
                  borderRadius="1rem"
                  containerClassName="w-full sm:min-w-[160px] md:min-w-[180px] md:w-auto"
                  borderClassName="bg-[radial-gradient(var(--anbu-gold)_40%,transparent_60%)] opacity-[0.65] group-hover:opacity-[0.9] transition-opacity duration-700"
                  className="border border-anbu-gold/20 bg-gradient-to-br from-neutral-950 via-black to-neutral-900 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] shadow-[0_8px_24px_rgba(255,215,0,0.2)] backdrop-blur-xl transition-all duration-700 ease-out hover:shadow-[0_12px_36px_rgba(255,215,0,0.28)] sm:px-6 sm:py-2.5 sm:text-xs sm:tracking-[0.1em] md:px-8 md:py-3 md:text-sm md:tracking-[0.12em] lg:px-9 lg:py-3.5 lg:text-base"
                  duration={4000}
                  onClick={() =>
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  {/* Subtle sparkles effect on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-60">
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
                  <span className="pointer-events-none relative z-10 flex items-center gap-3">
                    <div className="transition-transform duration-500 ease-out group-hover:rotate-12">
                      <Rocket className="h-4 w-4 text-anbu-gold lg:h-5 lg:w-5" />
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
                        ease: 'easeInOut',
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
                  mass: 1,
                }}
              >
                <StarBorderButton
                  className="w-full px-4 py-2 text-[11px] shadow-[0_8px_24px_rgba(255,215,0,0.15)] transition-all duration-700 ease-out hover:shadow-[0_12px_30px_rgba(255,215,0,0.22)] sm:min-w-[160px] sm:px-6 sm:py-2.5 sm:text-xs md:w-auto md:min-w-[180px] md:px-8 md:py-3 md:text-sm lg:px-9 lg:py-3.5 lg:text-base"
                  onClick={() =>
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  glow={true}
                >
                  <span className="pointer-events-none flex items-center gap-2.5 font-bold uppercase tracking-[0.1em] sm:gap-3.5 sm:tracking-[0.12em]">
                    <div className="transition-transform duration-500 ease-out group-hover:scale-110">
                      <Briefcase className="h-4 w-4 lg:h-5 lg:w-5" />
                    </div>
                    See What We Build
                    <motion.div
                      animate={{ y: [0, 2, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: 'easeInOut',
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
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                  {heroHighlights.map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                      className="flex flex-col items-center gap-0.5 rounded-xl bg-white/5 px-2 py-1.5 text-center sm:gap-1 sm:px-3 sm:py-2"
                    >
                      <div className="mb-0.5 flex items-center justify-center gap-1 sm:mb-1 sm:gap-2">
                        <item.icon className="h-3 w-3 text-anbu-gold/60 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                        <span className="text-lg font-semibold tracking-tight text-[#FFEE9A] sm:text-xl md:text-2xl lg:text-3xl">
                          <NumberTicker
                            value={item.value}
                            startValue={0}
                            delay={0.5}
                            decimalPlaces={item.suffix === '%' ? 1 : 0}
                          />
                          {item.suffix}
                        </span>
                      </div>
                      <span className="md:fluid-text-xs text-[0.5rem] uppercase leading-tight tracking-[0.2em] text-anbu-gold/70 sm:text-[0.625rem] sm:tracking-[0.3em] md:tracking-[0.35em]">
                        {item.label}
                      </span>
                      <p className="md:fluid-text-sm hidden text-[0.6rem] leading-snug text-white/70 sm:block sm:text-[0.7rem]">
                        {item.detail}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </NeonGradientCard>
            </motion.div>

            <motion.div
              className="flex w-full max-w-2xl justify-center sm:max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
            >
              <Terminal className="w-full max-w-2xl border border-white/10 bg-neutral-950/90 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:p-3 md:p-4 lg:p-5">
                <div className="flex items-center gap-2 font-mono text-xs text-anbu-gold/80 sm:text-[13px] md:text-sm">
                  <ArchIcon size="md" />
                  <TypingAnimation startOnView>$ npm install @anbu/solutions</TypingAnimation>
                </div>
                <AnimatedSpan className="font-mono text-[11px] text-[#9AE6FF] sm:text-xs md:text-sm">
                  installing packages...
                </AnimatedSpan>
                <AnimatedSpan className="font-mono text-[11px] text-[#9AE6FF] sm:text-xs md:text-sm">
                  setting up your project...
                </AnimatedSpan>
                <TypingAnimation
                  className="font-mono text-[11px] text-[#7CFFAE] sm:text-xs md:text-sm"
                  delay={900}
                >
                  ✅ ready to launch
                </TypingAnimation>
                <TypingAnimation
                  className="font-mono text-[11px] text-[#F7D774] sm:text-xs md:text-sm"
                  delay={1400}
                >
                  → check out our examples to get started
                </TypingAnimation>
              </Terminal>
            </motion.div>
          </motion.div>

          <motion.button
            type="button"
            className={cn(
              'pointer-events-auto absolute bottom-16 left-1/2 -translate-x-1/2 sm:bottom-18 md:bottom-20 lg:bottom-20',
              brandButton({
                variant: 'ghost',
                size: 'sm',
                className:
                  'flex-col gap-1 border-white/20 bg-transparent px-3 py-2 text-[0.65rem] tracking-[0.28em] text-anbu-gold/85 backdrop-blur-none hover:bg-white/5 sm:px-4 sm:py-3 sm:text-[0.7rem]',
              })
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
              animate={prefersReducedMotion ? { opacity: 1 } : { y: [0, 6, 0] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
              }
              className="flex items-center justify-center rounded-full bg-anbu-gold/20 p-1"
            >
              <ChevronDown className="h-5 w-5 text-[#FFD700] sm:h-6 sm:w-6" />
            </motion.span>
          </motion.button>
        </Container>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black via-black/70 to-transparent" />
    </section>
  );
}
