'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Zap, Crown, Rocket } from 'lucide-react'
import { WobbleCard } from '@/components/aceternity/wobble-card'
import { ShinyText } from '@/components/magicui/shiny-text'
import { BorderBeam } from '@/components/ui/border-beam'
import { cn } from '@/lib/utils'

const pricingTiers = [
  {
    name: 'Content Automation',
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
      '24/7 support response'
    ],
    highlighted: false,
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20'
  },
  {
    name: 'Short-Form Production',
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
      'Performance analytics'
    ],
    highlighted: true,
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20'
  },
  {
    name: 'Full Campaign Management',
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
      'ROI optimization'
    ],
    highlighted: false,
    gradient: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
}

export default function SocialPricingCards() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
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
              "relative h-full min-h-[650px] w-full rounded-[28px] border border-white/10 bg-black/60 backdrop-blur",
              tier.highlighted && "ring-2 ring-anbu-gold/60"
            )}
          >
            {tier.highlighted && (
              <>
                <BorderBeam size={250} duration={12} delay={9} />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                  <ShinyText className="bg-anbu-gold text-black px-4 py-1.5 rounded-full text-xs font-semibold">
                    MOST POPULAR
                  </ShinyText>
                </div>
              </>
            )}

            <div className={cn(
              "absolute inset-0 rounded-[28px] opacity-25",
              `bg-gradient-to-br ${tier.gradient}`
            )} />

            <div className="relative flex h-full flex-col justify-between gap-6 p-9 sm:p-11">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-anbu-gold/15 text-anbu-gold">
                    <tier.icon className="h-6 w-6" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                    <p className="text-sm leading-[1.7] text-white/80 min-h-[3rem]">{tier.description}</p>
                  </div>
                </div>

                <div className="flex items-baseline justify-center gap-2 text-white">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-sm text-white/60">{tier.period}</span>
                </div>
              </div>

              <ul className="mx-auto w-full max-w-xs space-y-3 border-t border-white/10 pt-7 text-left flex-grow">
                {tier.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-4 w-4 text-anbu-gold shrink-0 mt-0.5" />
                    <span className="text-xs leading-[1.7] text-white/85">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full rounded-full px-6 py-3.5 text-sm font-semibold transition-all shadow-[0_12px_35px_rgba(255,215,0,0.08)]",
                  tier.highlighted
                    ? "bg-anbu-gold text-black hover:bg-anbu-gold/90"
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
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
