'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Youtube, Instagram, Video, TrendingUp, BarChart3, Users, Play, Eye } from 'lucide-react'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { WobbleCard } from '@/components/aceternity/wobble-card'
import { CardContainer, CardBody, CardItem } from '@/components/aceternity/3d-card'
import { FloatingDock } from '@/components/aceternity/floating-dock'
import { InfiniteMovingCards } from '@/components/aceternity/infinite-moving-cards'
import { ShinyText } from '@/components/magicui/shiny-text'
import { BlurFadeText } from '@/components/magicui/blur-fade-text'
import { TextCascade } from '@/components/reactbits/text-cascade'
import { ShineBorder } from '@/components/ui/shine-border'
import { Magnet } from '@/components/reactbits/magnet'
import { NumberTicker } from '@/components/ui/number-ticker'
import { BackgroundBeams } from '@/components/aceternity/background-beams'
import { GradualBlurSection } from '@/components/reactbits/gradual-blur-section'
import { Sparkles } from '@/components/aceternity/sparkles'
import { Meteors } from '@/components/aceternity/meteors'
import SocialPricingCards from '@/components/features/social/SocialPricingCards'
import AdditionalServices from '@/components/features/social/AdditionalServices'
import { cn } from '@/lib/utils'

const socialPlatforms = [
  {
    title: 'YouTube',
    icon: <Youtube className="h-full w-full" />,
    href: 'https://youtube.com',
  },
  {
    title: 'Instagram',
    icon: <Instagram className="h-full w-full" />,
    href: 'https://instagram.com',
  },
  {
    title: 'TikTok',
    icon: <Video className="h-full w-full" />,
    href: 'https://tiktok.com',
  },
  {
    title: 'LinkedIn',
    icon: <Users className="h-full w-full" />,
    href: 'https://linkedin.com',
  },
  {
    title: 'Vimeo',
    icon: <Play className="h-full w-full" />,
    href: 'https://vimeo.com',
  },
]

const testimonials = [
  {
    quote: "ANBU's video content increased our engagement by 300%. The production quality is absolutely stunning.",
    name: "Sarah Chen",
    title: "Marketing Director at TechFlow",
  },
  {
    quote: "Their ability to translate complex technical concepts into compelling visual stories is unmatched.",
    name: "Marcus Rodriguez",
    title: "VP of Product at DataSync",
  },
  {
    quote: "The campaign blueprints they provided transformed our entire content strategy. Pure genius.",
    name: "Emily Watson",
    title: "Content Lead at InnovateLabs",
  },
  {
    quote: "Working with ANBU feels like having a world-class film studio as part of your marketing team.",
    name: "David Park",
    title: "CMO at CloudScale",
  },
]

const videoShowcase = [
  {
    title: 'Product Launch Campaign',
    description: 'Multi-platform rollout with custom assets for each channel',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80',
    category: 'Campaign',
    views: '2.4M',
    engagement: '15.2%',
  },
  {
    title: 'Technical Documentation',
    description: 'Developer-focused explainer with interactive code demos',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    category: 'Educational',
    views: '850K',
    engagement: '22.8%',
  },
  {
    title: 'Brand Storytelling',
    description: 'Cinematic narrative showcasing company values and mission',
    thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80',
    category: 'Brand',
    views: '3.1M',
    engagement: '18.7%',
  },
]

const stats = [
  { value: 50, suffix: 'M+', label: 'Total Views' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
  { value: 200, suffix: '+', label: 'Videos Produced' },
  { value: 15, suffix: '%', label: 'Avg. Engagement' },
]

const sectionBase = 'relative py-32 sm:py-40 lg:py-48 w-full flex justify-center'

function SectionWrapper({
  children,
  className,
  containerClassName = 'space-y-16 sm:space-y-20 lg:space-y-24',
}: {
  children: ReactNode
  className?: string
  containerClassName?: string
}) {
  return (
    <GradualBlurSection className={cn(sectionBase, className)}>
      <Container size="lg" className={cn('flex flex-col items-center justify-center text-center', containerClassName)}>
        {children}
      </Container>
    </GradualBlurSection>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  delay = 0.1,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, amount: 0.4 }}
      className={cn('mx-auto w-full max-w-3xl space-y-8 sm:space-y-10 text-center mb-52 sm:mb-64 lg:mb-72', className)}
    >
      {eyebrow ? <div className="flex justify-center">{eyebrow}</div> : null}
      {typeof title === 'string' ? (
        <TextCascade
          as="h2"
          text={title}
          className="text-balance text-3xl sm:text-4xl font-semibold"
          delay={delay + 0.05}
          stagger={0.06}
          viewportAmount={0.55}
        />
      ) : (
        <BlurFadeText className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
          {title}
        </BlurFadeText>
      )}
      {description ? (
        <p className="mx-auto w-full max-w-4xl text-center text-base sm:text-lg text-white/85 leading-[1.85] px-6 sm:px-8">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}

export default function SocialHubPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="relative overflow-hidden bg-gradient-to-b from-black via-black/95 to-black text-anbu-marble">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <BackgroundBeams className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
        </div>

        {/* Hero Section */}
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-32 pb-28">
          <div className="pointer-events-none absolute inset-0">
            <Meteors number={20} className="opacity-45" />
          </div>
          <Container size="lg" className="relative flex flex-col items-center text-center">
            <Sparkles
              particleColor="#FFD16A"
              particleDensity={90}
              minSize={0.6}
              maxSize={1.4}
              className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mx-auto flex w-full max-w-3xl flex-col items-center space-y-12 sm:space-y-16 text-center"
              >
                <div className="flex flex-col items-center space-y-10 sm:space-y-14">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <AnimatedGradientText
                      className="mx-auto inline-flex items-center justify-center text-xs sm:text-sm uppercase tracking-[0.32em] text-anbu-gold"
                      colorFrom="#FFED4E"
                      colorTo="#FF9D2E"
                    >
                      Social Showcase
                    </AnimatedGradientText>
                  </motion.div>

                  <div className="relative inline-flex flex-col items-center gap-2">
                    <TextCascade
                      as="span"
                      text="Broadcast-ready"
                      className="text-balance text-4xl sm:text-6xl lg:text-[4rem] font-semibold"
                      gradientClassName="text-white"
                      delay={0.2}
                      stagger={0.06}
                    />
                    <TextCascade
                      as="span"
                      text="storytelling"
                      className="text-balance text-3xl sm:text-5xl lg:text-[3.4rem] font-semibold text-white/95"
                      gradientClassName="text-white/95"
                      delay={0.28}
                      stagger={0.05}
                    />
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mx-auto max-w-2xl text-center text-base sm:text-lg lg:text-xl text-white/90 leading-[1.75] sm:leading-[1.85] px-4 sm:px-6"
                  >
                    <span className="font-semibold text-anbu-gold">Tech-credible.</span>{' '}
                    <span className="font-semibold text-white">Cinema-grade.</span>{' '}
                    From explainers to reels—every edit upholds ANBU's premium standard.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.85, duration: 0.6, type: 'spring', stiffness: 120, damping: 20 }}
                  className="flex flex-wrap justify-center gap-4 sm:gap-5 text-[0.65rem] uppercase tracking-[0.28em] text-white/70"
                >
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 backdrop-blur-sm">
                    Premium Production
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 backdrop-blur-sm">
                    Lifecycle Campaigns
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 backdrop-blur-sm">
                    Intelligent Automation
                  </span>
                </motion.div>
              </motion.div>
            </Sparkles>
          </Container>
        </section>

        {/* Video Showcase */}
        <SectionWrapper className="mt-24 sm:mt-32 lg:mt-40 !mb-64 sm:!mb-72 lg:!mb-20" containerClassName="text-center space-y-16 sm:space-y-20 lg:space-y-24">
          <SectionHeading
            eyebrow={
              <ShinyText className="text-xs uppercase tracking-[0.3em] text-anbu-gold font-medium">
                Signature Work
              </ShinyText>
            }
            title="Featured Production"
            description="Launch films that convert. Modular cuts for YouTube, LinkedIn, paid social."
            className="!mb-64 sm:!mb-72 lg:!mb-20"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto w-full max-w-4xl"
          >
            <ShineBorder
              className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
              shineColor={["#FFD700", "#FF9D2E", "#FFED4E"]}
            >
              <HeroVideoDialog
                videoSrc="https://www.youtube.com/embed/JkSxvdglLRs"
                thumbnailSrc="https://img.youtube.com/vi/JkSxvdglLRs/maxresdefault.jpg"
                thumbnailAlt="ANBU marketing reel preview"
                className="w-full"
                animationStyle="top-in-bottom-out"
              />
            </ShineBorder>
          </motion.div>
        </SectionWrapper>

        {/* Stats Section */}
        <SectionWrapper className="mt-24 sm:mt-32 lg:mt-40" containerClassName="text-center space-y-16 sm:space-y-20 lg:space-y-24">
          <SectionHeading
            eyebrow={
              <ShinyText className="text-xs uppercase tracking-[0.3em] text-anbu-gold font-medium">
                Impact Metrics
              </ShinyText>
            }
            title="Engineered for measurable growth"
            description="Real results. Real impact."
            className="!mb-64 sm:!mb-72 lg:!mb-5"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-10 md:grid-cols-4 md:gap-12 lg:gap-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/12 bg-white/[0.04] px-8 py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur !mb-64 sm:!mb-72 lg:!mb-10"
              >
                <div className="text-3xl lg:text-4xl font-bold">
                  <ShinyText className="text-anbu-gold">
                    <NumberTicker
                      value={stat.value}
                      startValue={0}
                      delay={0.4}
                      decimalPlaces={stat.suffix === '%' ? 0 : 0}
                    />
                    {stat.suffix}
                  </ShinyText>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>

        {/* NEW: Service Offerings Section */}
        <SectionWrapper className="mt-32 sm:mt-40 lg:mt-48">
          <SectionHeading
            eyebrow={
              <ShinyText className="text-xs uppercase tracking-[0.3em] text-anbu-gold font-medium">
                Social Media Services
              </ShinyText>
            }
            title="Transform your social presence"
            description="Pick your rhythm: automated clips or fully managed campaigns."
            className="!mb-64 sm:!mb-72 lg:!mb-10"
          />
          <SocialPricingCards />
        </SectionWrapper>

        {/* Additional Services */}
        <SectionWrapper className="relative mt-48 sm:mt-56 lg:mt-64 py-32 sm:py-40 lg:py-48 !mb-64 sm:!mb-72 lg:!mb-20 overflow-visible">
          <SectionHeading
            eyebrow={
              <ShinyText className="text-xs uppercase tracking-[0.3em] text-anbu-gold font-medium">
                Specialized Add-ons
              </ShinyText>
            }
            title="Services ANBU offers"
            description="Live production. Commerce support. On-brand analytics. Mix and match."
            className="!mb-64 sm:!mb-72 lg:!mb-20"
          />
          <div className="pt-20 sm:pt-24 lg:pt-32 pb-32 sm:pb-40 lg:pb-48">
            <AdditionalServices />
          </div>
        </SectionWrapper>

        {/* Video Gallery */}
        <SectionWrapper className="mt-80 sm:mt-96 lg:mt-[120px]" containerClassName="text-center space-y-20 sm:space-y-28 lg:space-y-32">
          <SectionHeading
            eyebrow={
              <ShinyText className="text-xs uppercase tracking-[0.3em] text-anbu-gold font-medium">
                Portfolio Showcase
              </ShinyText>
            }
            title="Launch films"
            description="Recent work. Platform-optimized. Always premium."
            className="mx-auto w-full max-w-3xl space-y-8 sm:space-y-10 text-center !mb-64 sm:!mb-72 lg:!mb-20"
          />

          <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {videoShowcase.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                viewport={{ once: true }}
              >
                <CardContainer className="inter-var max-w-sm mx-auto h-full !mb-64 sm:!mb-72 lg:!mb-20">
                  <CardBody className="relative flex h-full min-h-[520px] flex-col justify-between gap-5 rounded-[26px] border border-white/12 bg-black/60 p-8 sm:p-10 shadow-[0_16px_60px_rgba(0,0,0,0.55)] backdrop-blur">
                    <div className="flex flex-col gap-4">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-semibold text-white text-center"
                      >
                        {video.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="mx-auto max-w-xs text-sm text-white/75 text-center leading-[1.85] min-h-[3rem]"
                      >
                        {video.description}
                      </CardItem>
                    </div>
                    <CardItem translateZ="100" className="w-full overflow-hidden rounded-2xl">
                      <img
                        src={video.thumbnail}
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover transition duration-500 group-hover/card:scale-[1.03]"
                        alt={video.title}
                      />
                    </CardItem>
                    <div className="flex flex-col items-center gap-4">
                      <CardItem
                        translateZ={20}
                        className="inline-flex items-center justify-center rounded-full bg-anbu-gold/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-anbu-gold"
                      >
                        {video.category}
                      </CardItem>
                      <div className="flex items-center justify-center gap-6 text-xs text-white/60">
                        <CardItem translateZ={20} className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {video.views}
                        </CardItem>
                        <CardItem translateZ={20} className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {video.engagement}
                        </CardItem>
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Campaign Blueprints & Analytics */}
        <SectionWrapper className="mt-32 sm:mt-40 lg:mt-48 " containerClassName="text-center space-y-16 sm:space-y-20 lg:space-y-24">
          <SectionHeading
            eyebrow={
              <ShinyText className="text-xs uppercase tracking-[0.3em] text-anbu-gold font-medium">
                Full-Service Production
              </ShinyText>
            }
            title="Strategy-to-screen workflows"
            description="Blueprint narratives, pipe analytics into the next edit cycle, and keep brand, story, and KPIs aligned."
            className="!mb-64 sm:!mb-72 lg:!mb-20"
          />

          <div className="mx-auto grid w-full max-w-5xl gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <WobbleCard containerClassName="col-span-1 min-h-[320px] max-w-xl mx-auto">
                <div className="mx-auto flex max-w-prose flex-col items-center space-y-4 text-center">
                  <h2 className="text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Campaign Blueprints
                  </h2>
                  <p className="text-base leading-relaxed text-neutral-200">
                    Scripts. Storyboards. Edit templates. Stay on-message through every launch.
                  </p>
                </div>
                <BarChart3 className="absolute -right-4 lg:-right-[40%] -bottom-10 h-32 w-32 rounded-2xl object-contain text-anbu-gold/30" />
              </WobbleCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <WobbleCard containerClassName="col-span-1 min-h-[320px] max-w-xl mx-auto !mb-64 sm:!mb-72 lg:!mb-10">
                <div className="mx-auto flex max-w-prose flex-col items-center space-y-4 text-center">
                  <h2 className="text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Performance Analytics
                  </h2>
                  <p className="text-base leading-relaxed text-neutral-200">
                    Dashboards. Reports. Creative tuned to audience signals.
                  </p>
                </div>
                <TrendingUp className="absolute -right-4 lg:-right-[40%] -bottom-10 h-32 w-32 rounded-2xl object-contain text-anbu-gold/30" />
              </WobbleCard>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Testimonials */}
        <SectionWrapper className="mt-32 sm:mt-40 lg:mt-48" containerClassName="text-center space-y-16 sm:space-y-20 lg:space-y-24">
          <SectionHeading
            eyebrow={
              <ShinyText className="text-xs uppercase tracking-[0.3em] text-anbu-gold font-medium">
                Client Testimonials
              </ShinyText>
            }
            title="ANBU trusted for cinematic storytelling"
            description="What revenue, growth, and product leaders say."
            className="!mb-64 sm:!mb-72 lg:!mb-20"
          />

          <div className="mx-auto max-w-4xl">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </SectionWrapper>

        {/* CTA Section */}
        <SectionWrapper className="mt-32 sm:mt-40 lg:mt-48" containerClassName="text-center space-y-16 sm:space-y-20 lg:space-y-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Sparkles
              particleColor="#FFC46B"
              particleDensity={130}
              minSize={0.6}
              maxSize={1.3}
              className="mx-auto w-full max-w-3xl"
            >
              <div className="space-y-6">
                <TextCascade
                  as="h3"
                  text="Ready to create something unforgettable?"
                  className="text-3xl sm:text-4xl font-semibold"
                  delay={0.1}
                  stagger={0.05}
                />
                <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/80 leading-[1.85]">
                  Book your strategy session. Map your campaign. Hit your revenue goals.
                </p>
              </div>
            </Sparkles>

            <div className="mt-16 sm:mt-20 flex justify-center">
              <Magnet>
                <div
                  className="relative inline-block cursor-pointer"
                  onClick={() => {
                    console.log('🎉 Confetti!')
                  }}
                >
                  <ShineBorder
                    className="text-center text-2xl font-bold capitalize"
                    shineColor={["#FFD700", "#FF9D2E", "#FFED4E"]}
                  >
                    <a
                      href="mailto:contact@anbu.ai?subject=Marketing Studio Production Inquiry"
                      className="block px-12 py-5 text-lg font-bold uppercase tracking-[0.18em] text-anbu-gold transition-colors hover:text-white"
                    >
                      Start Your Project
                    </a>
                  </ShineBorder>
                </div>
              </Magnet>
            </div>
          </motion.div>
        </SectionWrapper>

        {/* Social Media Dock */}
        <div className="pointer-events-none fixed bottom-20 left-1/2 z-50 -translate-x-1/2">
          <div className="pointer-events-auto">
            <FloatingDock
              desktopClassName="border border-anbu-gold/40 bg-black/70 backdrop-blur-3xl shadow-[0_16px_60px_rgba(0,0,0,0.65)]"
              mobileClassName="translate-y-28"
              items={socialPlatforms}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
