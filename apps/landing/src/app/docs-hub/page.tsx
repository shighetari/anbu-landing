'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Bot, Zap, Database, Code, BookOpen } from '@/components/ui/lucide-safe'
import { siteConfig } from '@/lib/site-config'

import Container from '@/components/ui/Container'
import { TypewriterEffectSmooth } from '@/components/aceternity/typewriter-effect'
import { BackgroundBeams } from '@/components/aceternity/background-beams'
import { SparklesCore } from '@/components/aceternity/sparkles'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { CardSpotlight } from '@/components/aceternity/card-spotlight'
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/ui/terminal'
import { NumberTicker } from '@/components/ui/number-ticker'
import { BorderBeam } from '@/components/ui/border-beam'
import { Meteors } from '@/components/aceternity/meteors'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BlurFadeText } from '@/components/magicui/blur-fade-text'
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect'
import { ShinyText } from '@/components/magicui/shiny-text'

const features = [
  {
    title: 'AI-Powered Search',
    description: 'Vector database integration with intelligent semantic search across all documentation.',
    icon: Search,
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 via-purple-500/5 to-pink-500/10',
  },
  {
    title: 'RAG Chatbots',
    description: 'Conversational AI assistants trained on your specific codebase and documentation.',
    icon: Bot,
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-500/10 via-cyan-500/5 to-blue-500/10',
  },
  {
    title: 'Real-time API Playground',
    description: 'Interactive testing environment with live code examples and instant feedback.',
    icon: Zap,
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-500/10 via-amber-500/5 to-orange-500/10',
  },
  {
    title: 'Vector Knowledge Base',
    description: 'Embeddings-powered knowledge graphs for connecting related concepts.',
    icon: Database,
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/10 via-green-500/5 to-emerald-500/10',
  },
  {
    title: 'Interactive Code Examples',
    description: 'Executable code snippets with real-time output and customizable parameters.',
    icon: Code,
    gradient: 'from-red-500 to-rose-500',
    bgGradient: 'from-red-500/10 via-red-500/5 to-rose-500/10',
  },
  {
    title: 'Design System Explorer',
    description: 'Visual component library with live previews and design token documentation.',
    icon: BookOpen,
    gradient: 'from-indigo-500 to-violet-500',
    bgGradient: 'from-indigo-500/10 via-indigo-500/5 to-violet-500/10',
  },
]

const stats = [
  { value: 500, suffix: '+', label: 'API endpoints documented' },
  { value: 200, suffix: '+', label: 'code examples' },
  { value: 50, suffix: '+', label: 'design components' },
  { value: 99.9, suffix: '%', label: 'uptime guarantee' },
]

const typewriterWords = [
  { text: "Your", className: "text-white" },
  { text: "AI-Powered", className: "text-anbu-gold" },
  { text: "Documentation", className: "text-anbu-gold" },
  { text: "Hub", className: "text-anbu-gold" },
]

export default function DocsHubLanding() {
  return (
    <div className="min-h-screen bg-black">
      <main
        id="main-content"
        className="relative overflow-hidden bg-gradient-to-b from-black via-black/95 to-black text-anbu-marble"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <BackgroundBeams className="opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
        </div>

        {/* Sparkles Background */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={35}
            className="w-full h-full"
            particleColor="#FFD700"
          />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-16 sm:py-20">
          <div className="w-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 text-center"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <ShinyText className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-anbu-gold/80 font-medium">
                    Coming Soon
                  </ShinyText>
                </motion.div>

                <div className="flex justify-center">
                  <TypewriterEffectSmooth
                    words={typewriterWords}
                    className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center"
                >
                  <BlurFadeText
                    className="max-w-3xl text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed px-4"
                    delay={0.8}
                  >
                    Experience intelligent documentation with vector search, RAG chatbots, and instant code examples. The future of developer documentation is here.
                  </BlurFadeText>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 sm:pt-8"
              >
                <ShimmerButton
                  className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-anbu-ink"
                  background="linear-gradient(110deg, #FFD700 0%, #FFED4E 45%, #FFD700 100%)"
                  borderRadius="0.75rem"
                  textColor="var(--anbu-ink, #0B0500)"
                  asChild
                >
                  <Link href="/contact?topic=docs-hub">
                    <span className="flex items-center gap-2 text-anbu-ink">
                      Get Early Access
                    </span>
                  </Link>
                </ShimmerButton>

                <ShimmerButton
                  className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-anbu-gold"
                  background="linear-gradient(110deg, #2C2C2C 0%, #1A1A1A 45%, #2C2C2C 100%)"
                  borderRadius="0.75rem"
                  shimmerColor="#FFD700"
                  asChild
                >
                  <Link href="/">
                    <span className="flex items-center gap-2">
                      Return to Main Site
                    </span>
                  </Link>
                </ShimmerButton>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                    <AnimatedGradientText
                      colorFrom="#FFD700"
                      colorTo="#FFA500"
                      speed={2}
                      className="inline-block"
                    >
                      <NumberTicker
                        value={stat.value}
                        startValue={0}
                        delay={0.5}
                        decimalPlaces={stat.suffix === '%' ? 1 : 0}
                      />
                      {stat.suffix}
                    </AnimatedGradientText>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wider px-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* AI Features Showcase */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12 lg:mb-16"
            >
              <AnimatedGradientText
                colorFrom="#FFD700"
                colorTo="#FF9D2E"
                speed={1.5}
                className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 block"
              >
                AI-Powered Documentation Experience
              </AnimatedGradientText>
              <TextGenerateEffect
                words="Revolutionary features that will transform how you interact with documentation"
                className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-white/70 px-4"
              />
            </motion.div>

            <NeonGradientCard
              className="w-full"
              contentClassName="bg-black/90 p-4 sm:p-6 lg:p-10"
              neonColors={{ firstColor: '#FFD700', secondColor: '#FF9D2E' }}
              borderSize={2}
            >
              <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CardSpotlight className="h-full">
                      <div className="relative p-4 sm:p-5 lg:p-6 h-full flex flex-col">
                        <div className={`inline-flex p-2 sm:p-2.5 lg:p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-3 sm:mb-4 w-fit`}>
                          <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <AnimatedGradientText
                          colorFrom={feature.gradient.includes('purple') ? '#a855f7' : feature.gradient.includes('cyan') ? '#06b6d4' : feature.gradient.includes('amber') ? '#f59e0b' : feature.gradient.includes('green') ? '#10b981' : feature.gradient.includes('red') ? '#ef4444' : '#6366f1'}
                          colorTo={feature.gradient.includes('purple') ? '#ec4899' : feature.gradient.includes('cyan') ? '#3b82f6' : feature.gradient.includes('amber') ? '#ea580c' : feature.gradient.includes('green') ? '#10b981' : feature.gradient.includes('red') ? '#f43f5e' : '#8b5cf6'}
                          speed={2}
                          className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 block"
                        >
                          {feature.title}
                        </AnimatedGradientText>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed flex-grow">{feature.description}</p>
                        <BorderBeam size={250} duration={12} delay={3} />
                      </div>
                    </CardSpotlight>
                  </motion.div>
                ))}
              </div>
            </NeonGradientCard>
          </Container>
        </section>

        {/* Terminal Demo */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <ShinyText className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 inline-block">
                See It In Action
              </ShinyText>
              <BlurFadeText
                className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-white/70 px-4"
                delay={0.2}
              >
                Experience how our AI assistant will help you find answers instantly
              </BlurFadeText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoother animation
              }}
              viewport={{ once: true }}
              className="w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4 flex justify-center motion-reduce:y-0"
              style={{
                willChange: 'transform, opacity',
                contain: 'layout style paint', // Prevent layout shifts from propagating
                contentVisibility: 'auto'
              }}
            >
              <Terminal className="border border-white/10 bg-black/90 shadow-2xl w-full max-w-full">
                <TypingAnimation className="font-mono text-xs sm:text-sm text-anbu-gold/80" startOnView>
                  $ ask-anbu "How do I implement authentication with Next.js?"
                </TypingAnimation>
                <AnimatedSpan className="font-mono text-[0.65rem] sm:text-xs text-cyan-400">🤖 Searching knowledge base...</AnimatedSpan>
                <AnimatedSpan className="font-mono text-[0.65rem] sm:text-xs text-cyan-400">📚 Found 12 relevant articles</AnimatedSpan>
                <TypingAnimation className="font-mono text-[0.65rem] sm:text-xs text-green-400" delay={1000}>
                  ✅ Here's a step-by-step guide with code examples:
                </TypingAnimation>
                <TypingAnimation className="font-mono text-[0.65rem] sm:text-xs text-white/80" delay={1500}>
                  🔗 /docs/auth/nextjs-setup
                </TypingAnimation>
                <TypingAnimation className="font-mono text-[0.65rem] sm:text-xs text-white/80" delay={2000}>
                  🔗 /examples/auth-middleware
                </TypingAnimation>
                <TypingAnimation className="font-mono text-[0.65rem] sm:text-xs text-anbu-gold" delay={2500}>
                  → Want me to create a custom implementation for your use case?
                </TypingAnimation>
              </Terminal>
            </motion.div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center relative px-4"
            >
              <Meteors number={20} />
              <AnimatedGradientText
                colorFrom="#FFD700"
                colorTo="#FFA500"
                speed={1}
                className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 block"
              >
                Be Among the First to Experience the Future
              </AnimatedGradientText>
              <div className="flex justify-center w-full">
                <TextGenerateEffect
                  words="Join our early access program and help shape the next generation of developer documentation."
                  className="max-w-2xl text-center mx-auto text-sm sm:text-base lg:text-lg text-white/70 mb-6 sm:mb-8 block"
                />
              </div>

              <div className="flex justify-center">
                <ShimmerButton
                  className="px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-anbu-ink"
                  background="linear-gradient(110deg, #FFD700 0%, #FFED4E 45%, #FFD700 100%)"
                  borderRadius="0.75rem"
                  textColor="var(--anbu-ink, #0B0500)"
                  asChild
                >
                  <Link href={`mailto:${siteConfig.contactEmail}?subject=Docs Hub Early Access Request`}>
                    <span className="flex items-center gap-2 text-anbu-ink">
                      Request Early Access
                    </span>
                  </Link>
                </ShimmerButton>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>

    </div>
  )
}
