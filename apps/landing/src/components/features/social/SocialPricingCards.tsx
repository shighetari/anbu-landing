'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Zap, Crown } from 'lucide-react'

import { WobbleCard } from '@/components/aceternity/wobble-card'
import { ShinyText } from '@/components/magicui/shiny-text'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BorderBeam } from '@/components/ui/border-beam'
import { cn } from '@/lib/utils'

const pricingTiers = [
  {
    name: 'Content Automation',
    tagline: 'Scale without burnout',
    price: '$2,500',
    period: '/month',
    description: 'Streamline your social media with intelligent automation',
    icon: Zap,
    features: [
      'Automated scheduling across all platforms',
      'AI-powered optimal posting times',
      'Cross-platform content adaptation',
      'Real-time analytics dashboard',
      'Content calendar management',
      'Hashtag optimization',
      '24/7 support response',
    ],
    highlighted: false,
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    accent: {
      colorFrom: '#38bdf8',
      colorTo: '#14b8a6',
      text: 'from-sky-400 via-cyan-300 to-teal-300',
      bullet: 'from-sky-500/60 to-teal-400/60',
      glow: 'shadow-[0_16px_45px_rgba(45,212,191,0.35)]',
    },
  },
  {
    name: 'Short-Form Production',
    tagline: 'Buzz in 60 seconds',
    price: '$3,500',
    period: '/package',
    description: 'Viral-ready content optimized for maximum engagement',
    icon: Sparkles,
    features: [
      '10 short-form videos per package',
      'Platform-specific optimization',
      'Trending audio integration',
      'Professional editing & effects',
      'A/B testing variations',
      'Caption & hashtag strategy',
      'Performance analytics',
    ],
    highlighted: true,
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    accent: {
      colorFrom: '#f0abfc',
      colorTo: '#fb7185',
      text: 'from-fuchsia-400 via-pink-400 to-rose-300',
      bullet: 'from-fuchsia-500/60 to-rose-400/60',
      glow: 'shadow-[0_16px_45px_rgba(244,114,182,0.35)]',
    },
  },
  {
    name: 'Full Campaign Management',
    tagline: 'Own every channel',
    price: '$8,500',
    period: '/month',
    description: 'End-to-end social media domination strategy',
    icon: Crown,
    features: [
      'Complete strategy development',
      'Daily content creation & posting',
      'Influencer coordination',
      'Community management',
      'Monthly performance reports',
      'Crisis management included',
      'Competitor analysis',
      'ROI optimization',
    ],
    highlighted: false,
    gradient: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20',
    accent: {
      colorFrom: '#fbbf24',
      colorTo: '#fb923c',
      text: 'from-amber-400 via-orange-400 to-yellow-300',
      bullet: 'from-amber-500/60 to-orange-400/60',
      glow: 'shadow-[0_16px_45px_rgba(251,191,36,0.35)]',
    },
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

export default function SocialPricingCards() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid justify-items-center gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
    >
      {pricingTiers.map((tier, index) => (
        <motion.div
          key={tier.name}
          variants={cardVariants}
          whileHover={{ y: -10 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <WobbleCard
            containerClassName={cn(
              'relative h-full w-full rounded-[28px] border border-white/10 bg-black/60 backdrop-blur',
              'min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]',
              tier.highlighted && 'ring-2 ring-anbu-gold/60'
            )}
          >
            {tier.highlighted ? (
              <>
                <BorderBeam size={250} duration={12} delay={9} />
                <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2">
                  <ShinyText className="rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFC94A] to-[#FFB347] px-4 py-1.5 text-xs font-semibold text-black shadow-[0_8px_24px_rgba(255,215,0,0.35)]">
                    MOST POPULAR
                  </ShinyText>
                </div>
              </>
            ) : null}

            <div
              className={cn(
                'absolute inset-0 rounded-[28px] opacity-30',
                'bg-gradient-to-br',
                tier.gradient
              )}
            />

            <div className="relative flex h-full flex-col justify-between gap-6 p-6 sm:gap-8 sm:p-8 lg:p-9">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
                  <AnimatedGradientText
                    speed={1.2}
                    colorFrom={tier.accent.colorFrom}
                    colorTo={tier.accent.colorTo}
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-white drop-shadow"
                  >
                    {tier.tagline}
                  </AnimatedGradientText>

                  <span
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-black/85 shadow-[0_18px_55px_rgba(0,0,0,0.35)] ring-1 ring-white/15',
                      tier.accent.text
                    )}
                  >
                    <tier.icon className="h-6 w-6" />
                  </span>

                  <div className="space-y-2">
                    <AnimatedGradientText
                      speed={1.1}
                      colorFrom={tier.accent.colorFrom}
                      colorTo={tier.accent.colorTo}
                      className="text-lg font-semibold sm:text-xl"
                    >
                      {tier.name}
                    </AnimatedGradientText>
                    <p className="text-sm leading-[1.8] text-white/80 sm:min-h-[3rem]">
                      {tier.description}
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                  className="flex items-baseline justify-center gap-2"
                >
                  <AnimatedGradientText
                    colorFrom={tier.accent.colorFrom}
                    colorTo={tier.accent.colorTo}
                    className="text-3xl font-bold tracking-tight drop-shadow-sm sm:text-[2.1rem]"
                  >
                    {tier.price}
                  </AnimatedGradientText>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/65 sm:text-sm">
                    {tier.period}
                  </span>
                </motion.div>
              </div>

              <ul className="mx-auto flex w-full flex-col items-center gap-3 border-t border-white/10 pt-5 sm:gap-4 sm:pt-7">
                {tier.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.1 + featureIndex * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className={cn(
                      'group relative flex w-full max-w-sm items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-4 py-3.5 text-center text-xs leading-relaxed text-white/85 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07]',
                      tier.accent.glow
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br text-black/85 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110',
                        tier.accent.bullet
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-center text-[0.78rem] sm:text-[0.85rem]">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'w-full rounded-full px-6 py-3.5 min-h-[44px] text-sm font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-[0_12px_35px_rgba(0,0,0,0.45)]',
                  tier.highlighted
                    ? 'bg-gradient-to-r from-[#FFD16A] via-[#FFB347] to-[#FF8C37] text-black shadow-[0_18px_60px_rgba(255,173,51,0.45)] hover:shadow-[0_20px_65px_rgba(255,173,51,0.6)]'
                    : 'bg-gradient-to-r from-white/15 via-white/10 to-white/5 hover:from-white/20 hover:via-white/14 hover:to-white/8'
                )}
                style={{ touchAction: 'manipulation' }}
              >
                Get Started
              </motion.button>
            </div>
          </WobbleCard>
        </motion.div>
      ))}
    </motion.div>
  )
}
