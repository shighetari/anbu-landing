'use client'

import { ArrowUpRight, Mail, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { ShineBorder } from '@/components/ui/shine-border'
import { GradualBlurSection } from '@/components/reactbits/gradual-blur-section'
import { WobbleCard } from '@/components/aceternity/wobble-card'
import { Confetti } from '@/components/magicui/confetti'
import { BlurFadeText } from '@/components/magicui/blur-fade-text'
import { ShinyText } from '@/components/magicui/shiny-text'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect'
import { TypewriterEffect } from '@/components/aceternity/typewriter-effect'
import { TextHoverEffect } from '@/components/aceternity/text-hover-effect'
import { cn } from '@/lib/utils'
import { buttonVariants, animationVariants, buttonSizes } from '@/lib/button-variants'

const contactOptions = [
  {
    title: 'Email',
    titleWords: [{ text: 'Email' }],
    description: 'Quick response guaranteed',
    shortDesc: 'Within 24 hours',
    icon: Mail,
    href: 'mailto:contact@anbu.ai',
    label: 'contact@anbu.ai',
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    iconGradient: 'from-blue-500 to-cyan-500',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]',
  },
  {
    title: 'Schedule',
    titleWords: [{ text: 'Schedule' }],
    description: 'Book a strategy session',
    shortDesc: '30-min consultation',
    icon: MessageSquare,
    href: 'https://cal.com/',
    label: 'Schedule a consultation',
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    iconGradient: 'from-purple-500 to-pink-500',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]',
  },
]

export default function ContactSection() {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleContactClick = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <GradualBlurSection
      id="contact"
      className="relative py-6 sm:py-9 md:py-12 lg:py-14 xl:py-16 w-full flex justify-center bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      <div className="absolute inset-0 opacity-20 mix-blend-screen" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,215,0,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,168,0,0.08),transparent_55%)]" />
      </div>

      <Container size="sm" className="relative flex w-full flex-col items-center gap-5 sm:gap-7 md:gap-9 lg:gap-10 text-center px-3 sm:px-4 lg:px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 w-full max-w-2xl mx-auto"
        >
          <ShinyText className="inline-flex items-center justify-center px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] lg:tracking-[0.35em] text-anbu-gold" speed={5}>
            Connect
          </ShinyText>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 w-full"
          >
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              <TextGenerateEffect
                words="Ready to Build?"
                className="bg-gradient-to-r from-white via-anbu-gold to-white bg-clip-text text-transparent"
                duration={1}
                filter={false}
              />
            </h2>
            <div className="space-y-2">
              <BlurFadeText delay={0.2} duration={0.6}>
                <p className="max-w-lg mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-2 sm:px-3">
                  Let's discuss your vision.
                </p>
              </BlurFadeText>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid w-full max-w-2xl mx-auto gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {contactOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <WobbleCard
                containerClassName={`h-full transition-all duration-700 ${option.hoverGlow}`}
                className="h-full"
              >
                <motion.a
                  href={option.href}
                  target={option.href.startsWith('http') ? '_blank' : undefined}
                  rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative block h-full p-5 sm:p-6 md:p-7 lg:p-8 text-center"
                  onClick={option.href.startsWith('mailto') ? handleContactClick : undefined}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Enhanced gradient background overlay */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative flex flex-col items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    <motion.div
                      className="relative flex justify-center"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      {/* Enhanced icon glow effect */}
                      <div className={`absolute inset-0 blur-2xl bg-gradient-to-br ${option.iconGradient} opacity-40 group-hover:opacity-80 transition-all duration-700 rounded-full scale-150`} />
                      <motion.span
                        className={`relative flex h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${option.iconGradient} text-white shadow-2xl`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.7 }}
                      >
                        <option.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
                      </motion.span>
                    </motion.div>
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold">
                        <motion.div
                          initial={{ opacity: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <TypewriterEffect
                            words={option.titleWords}
                            className="text-base sm:text-lg lg:text-xl"
                            cursorClassName="bg-anbu-gold hidden"
                          />
                        </motion.div>
                      </h3>
                      <motion.div
                        className="overflow-hidden"
                        initial={{ height: 'auto' }}
                        whileHover={{ height: 'auto' }}
                      >
                        <motion.p
                          className="text-xs sm:text-sm lg:text-base text-white/70 leading-relaxed transition-all duration-500 max-w-xs mx-auto"
                          whileHover={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {option.description}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          whileHover={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <TextGenerateEffect
                            words={option.shortDesc}
                            className="text-xs sm:text-sm lg:text-base text-anbu-gold/90 font-semibold"
                            duration={0.5}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                    <motion.div
                      className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base font-semibold mt-2 sm:mt-3 md:mt-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <ShinyText className="text-anbu-gold group-hover:text-white transition-colors duration-500" speed={3}>
                        {option.label}
                      </ShinyText>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                      >
                        <ArrowUpRight className="h-5 w-5 text-anbu-gold group-hover:text-white transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.a>
              </WobbleCard>
            </motion.div>
          ))}
        </div>

        <Confetti isActive={showConfetti} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-3 sm:mt-4 md:mt-5 lg:mt-6"
        >
          <ShimmerButton
            {...buttonVariants.cta}
            className={cn(
              buttonVariants.cta.className,
              "px-6 sm:px-8 md:px-9 lg:px-10 py-3.5 sm:py-4 lg:py-5 text-xs sm:text-sm lg:text-base"
            )}
            onClick={() => {
              handleContactClick()
              window.open('mailto:contact@anbu.ai')
            }}
          >
            <motion.span className="flex items-center gap-3 text-black font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
              <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
              Share your brief
              <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </motion.span>
          </ShimmerButton>
        </motion.div>
      </Container>
    </GradualBlurSection>
  )
}
