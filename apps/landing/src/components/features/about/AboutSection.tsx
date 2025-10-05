'use client'

import { ShieldCheck, Sparkles, Trophy, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid'
import { GradualBlurSection } from '@/components/reactbits/gradual-blur-section'
import { LogoLoop } from '@/components/reactbits/logo-loop'
import { PixelImage } from '@/components/ui/pixel-image'
import { Magnet } from '@/components/reactbits/magnet'
import { SparklesCore } from '@/components/aceternity/sparkles'
import { Meteors } from '@/components/aceternity/meteors'
import { BlurFadeText } from '@/components/magicui/blur-fade-text'
import { ShinyText } from '@/components/magicui/shiny-text'
import { DecryptedText } from '@/components/reactbits/decrypted-text'
import { TextHoverEffect } from '@/components/aceternity/text-hover-effect'
import { TypewriterEffect } from '@/components/aceternity/typewriter-effect'

const differentiators = [
  {
    title: 'Speed to Market',
    titleWords: [{ text: 'Speed' }, { text: 'to' }, { text: 'Market' }],
    description: '10x faster deployment',
    shortDesc: 'Launch in weeks, not months',
    icon: Trophy,
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
  },
  {
    title: 'ROI Focused',
    titleWords: [{ text: 'ROI' }, { text: 'Focused' }],
    description: 'Measurable business impact',
    shortDesc: 'Data-driven outcomes',
    icon: Sparkles,
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
  },
  {
    title: 'Scale Ready',
    titleWords: [{ text: 'Scale' }, { text: 'Ready' }],
    description: 'From startup to enterprise',
    shortDesc: 'Built for growth',
    icon: Zap,
    gradient: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
  },
  {
    title: '24/7 Support',
    titleWords: [{ text: '24/7' }, { text: 'Support' }],
    description: 'Always-on reliability',
    shortDesc: 'We never sleep',
    icon: ShieldCheck,
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
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

// Enhanced BentoCard with hover effects
function EnhancedBentoCard({ item, index }: { item: typeof differentiators[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <BentoCard
        name={item.title}
        className="col-span-1 h-full transition-all duration-300 hover:scale-[1.02]"
        background={
          <div className="absolute inset-0 overflow-hidden">
            {index === 0 && (
              <>
                <SparklesCore
                  id={`sparkles-${index}`}
                  background="transparent"
                  particleColor="#FFD700"
                  className="h-full w-full"
                  particleDensity={isHovered ? 40 : 20}
                  minSize={0.4}
                  maxSize={1.0}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-50'}`} />
              </>
            )}
            {index === 1 && (
              <>
                <Meteors number={isHovered ? 10 : 5} />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-50'}`} />
              </>
            )}
            {index === 2 && (
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: isHovered ? [
                    'radial-gradient(circle at 20% 20%, rgba(255,215,0,0.15), transparent 50%)',
                    'radial-gradient(circle at 80% 80%, rgba(255,215,0,0.15), transparent 50%)',
                  ] : [
                    'radial-gradient(circle at 20% 20%, rgba(255,215,0,0.08), transparent 50%)',
                    'radial-gradient(circle at 80% 80%, rgba(255,215,0,0.08), transparent 50%)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
              />
            )}
            {index === 3 && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,226,122,0.1),transparent_70%)]" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: isHovered ? [0.5, 0.8, 0.5] : [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(255,215,0,0.05), transparent)',
                  }}
                />
              </div>
            )}
          </div>
        }
        Icon={item.icon}
        description={isHovered ? item.shortDesc : item.description}
        href="#"
        cta="Learn more"
        tooltip={item.title}
      />
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <div>
      <GradualBlurSection className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 w-full" id="about">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 opacity-30 mix-blend-screen" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_70%,rgba(255,215,0,0.08),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,165,0,0.12),transparent_60%)]" />
        </div>

      <Container size="lg" className="relative px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Header section with text and image side by side */}
          <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex justify-center lg:justify-start"
              >
                <ShinyText
                  className="inline-block text-[0.5rem] sm:text-[0.625rem] md:text-[0.7rem] lg:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] lg:tracking-[0.35em] text-anbu-gold"
                  speed={7}
                >
                  The ANBU Advantage
                </ShinyText>
              </motion.div>
              <BlurFadeText delay={0.1} duration={0.6}>
                <h2 className="font-display text-[1.25rem] sm:text-[1.5rem] md:text-[1.875rem] lg:text-[2.25rem] xl:text-[2.5rem] font-bold text-white leading-[1.1]">
                  Results That Drive Revenue
                </h2>
              </BlurFadeText>
              <BlurFadeText delay={0.2} duration={0.6}>
                <p className="text-[0.75rem] sm:text-[0.875rem] md:text-[0.9375rem] lg:text-[1rem] xl:text-[1.125rem] text-white/70 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0">
                  We transform complex challenges into elegant solutions that accelerate growth.
                </p>
              </BlurFadeText>
            </div>

            {/* Image and caption - centered on mobile */}
            <motion.div
              className="relative flex flex-col items-center gap-2 sm:gap-3 order-first lg:order-last"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] md:max-w-sm lg:max-w-full mx-auto overflow-hidden rounded-lg sm:rounded-xl">
                <div className="relative group">
                  {/* Subtle glow effect on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-anbu-gold/20 to-anbu-gold-accent/20 rounded-xl blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-500" />

                  {/* Image with border */}
                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                    <PixelImage
                      src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80"
                      grid="6x4"
                    />

                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>

              <motion.p
                className="text-center text-[0.625rem] sm:text-[0.75rem] md:text-[0.8125rem] lg:text-[0.875rem] text-white/60 max-w-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Precision-engineered for success.
              </motion.p>
            </motion.div>
          </div>

          <LogoLoop
            logos={techStack}
            speed={28}
            className="mt-2 sm:mt-4 md:mt-6 lg:mt-8"
            fadeEdges
          />

          <BentoGrid className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6
            auto-rows-[14rem] sm:auto-rows-[15rem] md:auto-rows-[17rem] lg:auto-rows-[18rem] xl:auto-rows-[19rem]">
            {differentiators.map((item, index) => (
              <EnhancedBentoCard key={item.title} item={item} index={index} />
            ))}
          </BentoGrid>
        </div>
      </Container>
      </GradualBlurSection>
    </div>
  )
}
