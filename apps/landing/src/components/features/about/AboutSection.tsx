'use client';

import { ShieldCheck, Sparkles, Trophy, Zap } from '@/components/ui/lucide-safe';
import { motion } from 'framer-motion';
import { useState } from 'react';

import Container from '@/components/ui/Container';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { GradualBlurSection } from '@/components/reactbits/gradual-blur-section';
import { LogoLoop } from '@/components/reactbits/logo-loop';
import { PixelImage } from '@/components/ui/pixel-image';
import { Magnet } from '@/components/reactbits/magnet';
import { SparklesCore } from '@/components/aceternity/sparkles';
import { Meteors } from '@/components/aceternity/meteors';
import { BlurFadeText } from '@/components/magicui/blur-fade-text';
import { ShinyText } from '@/components/magicui/shiny-text';
import { DecryptedText } from '@/components/reactbits/decrypted-text';
import { TextHoverEffect } from '@/components/aceternity/text-hover-effect';
import { TypewriterEffect } from '@/components/aceternity/typewriter-effect';
import { FeatureModal } from '@/components/ui/feature-modal';

// ============================================
// IMAGE CONFIGURATION - Easy Image Swapping
// ============================================
// To test different images, simply update the src below:
// - Supports: JPG, PNG, WebP, AVIF formats
// - Best results: Square images (800x800px or larger)
// - Use URLs or local paths from /public folder (e.g., "/images/about-photo.jpg")
// - PixelImage grid "6x4" creates the pixelated reveal animation
// - Tip: Keep multiple options commented below for easy A/B testing

const ABOUT_IMAGE = {
  src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80',
  alt: 'About ANBU - Built with precision and care',
  caption: 'Built with care and attention to detail.',
  pixelGrid: '6x4' as const, // Options: "6x4", "8x8", "4x6" - affects animation style
};

// Uncomment these to quickly test other images:
// const ABOUT_IMAGE = {
//   src: "/images/your-photo.jpg", // Local image in /public/images/
//   alt: "Your custom alt text",
//   caption: "Your custom caption here",
//   pixelGrid: "6x4" as const,
// }

const differentiators = [
  {
    title: 'Fast Delivery',
    titleWords: [{ text: 'Fast' }, { text: 'Delivery' }],
    description: 'Launch in weeks',
    shortDesc: 'Not months',
    icon: Trophy,
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    accentColor: '#3b82f6', // blue
  },
  {
    title: 'Fixed Pricing',
    titleWords: [{ text: 'Fixed' }, { text: 'Pricing' }],
    description: 'Know your costs upfront',
    shortDesc: 'No surprises',
    icon: Sparkles,
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    accentColor: '#a855f7', // purple
  },
  {
    title: 'Grows With You',
    titleWords: [{ text: 'Grows' }, { text: 'With' }, { text: 'You' }],
    description: 'Scales as you grow',
    shortDesc: 'Built to last',
    icon: Zap,
    gradient: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
    accentColor: '#eab308', // yellow
  },
  {
    title: 'Quick Support',
    titleWords: [{ text: 'Quick' }, { text: 'Support' }],
    description: 'Fast help when needed',
    shortDesc: 'We respond fast',
    icon: ShieldCheck,
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    accentColor: '#10b981', // green
  },
];

// Detailed modal content for each feature
const featureDetails = [
  {
    title: 'Fast Delivery',
    icon: Trophy,
    tagline: 'Launch in weeks, not months',
    description:
      "I've built my development process around speed without sacrificing quality. Using agile methodologies and rapid prototyping, I help you get to market fast—perfect for startups needing quick validation or businesses racing against tight deadlines.",
    benefits: [
      '2-4 week sprint cycles get you from concept to launch lightning-fast',
      'Rapid prototyping validates your ideas before full-scale development',
      'MVP approach delivers core functionality first, then iterates based on real feedback',
      'Continuous deployment means you see progress every single day',
      'Agile workflow adapts quickly to changing requirements without starting over',
    ],
    metrics: [
      { value: 14, label: 'Avg Days to MVP', suffix: '' },
      { value: 85, label: 'Faster Launch', suffix: '%' },
      { value: 7, label: 'Day Sprints', suffix: '' },
    ],
    useCases: [
      'Startups needing quick validation',
      'Time-sensitive product launches',
      'MVP development',
      'Proof of concept projects',
      'Rapid market entry',
    ],
    accentColor: '#3b82f6',
  },
  {
    title: 'Fixed Pricing',
    icon: Sparkles,
    tagline: 'Know your costs upfront, no surprises',
    description:
      "I believe in transparent pricing. You'll get a detailed project-based quote upfront—no hidden fees, no scope creep charges, no surprises. Budget confidently knowing exactly what you're investing in.",
    benefits: [
      'Detailed project quotes provided before any work begins',
      'Fixed-price packages eliminate budget uncertainty',
      'No hourly rate surprises or unexpected invoices',
      'Flexible payment plans accommodate your cash flow needs',
      'Scope changes discussed and approved before affecting price',
      'Value-based pricing ensures you get ROI, not just hours worked',
    ],
    metrics: [
      { value: 100, label: 'Price Certainty', suffix: '%' },
      { value: 0, label: 'Hidden Fees', suffix: '' },
      { value: 30, label: 'Avg Savings', suffix: '%' },
    ],
    useCases: [
      'Fixed-budget projects',
      'Enterprise procurement',
      'Predictable spend planning',
      'Fixed-scope deliverables',
      'No hourly billing preferred',
    ],
    accentColor: '#a855f7',
  },
  {
    title: 'Grows With You',
    icon: Zap,
    tagline: 'Scales as you grow, built to last',
    description:
      "I architect solutions with growth in mind. Your app won't just work today—it'll scale effortlessly as your user base explodes, your features multiply, and your business expands globally. Built with modern, maintainable tech that evolves with you.",
    benefits: [
      'Cloud-native architecture auto-scales with traffic spikes',
      'Microservices design adds features without touching existing code',
      'Performance optimization built-in from day one, not bolted on later',
      'Modern tech stack stays current with minimal maintenance',
      'Modular codebase makes updates and expansions straightforward',
      'Database design handles millions of records without slowdowns',
    ],
    metrics: [
      { value: 99, label: 'Uptime SLA', suffix: '.9%' },
      { value: 10, label: 'Scale Capacity', suffix: 'x' },
      { value: 200, label: 'Faster Load Times', suffix: '%' },
    ],
    useCases: [
      'High-growth startups',
      'Expanding businesses',
      'Future-proof systems',
      'International scaling',
      'Performance-critical apps',
    ],
    accentColor: '#eab308',
  },
  {
    title: 'Quick Support',
    icon: ShieldCheck,
    tagline: 'Fast help when you need it most',
    description:
      "I'm here for you even after launch. With dedicated support channels, same-day response times, and proactive monitoring, you're never left hanging. Bugs get prioritized, questions get answered, and your app stays running smoothly.",
    benefits: [
      'Same-day response to critical issues, usually within hours',
      'Dedicated Slack/Discord channel for instant communication',
      'Proactive monitoring catches problems before users notice',
      'Priority bug fixes keep your app running without interruptions',
      'Regular health checks and performance optimization',
      'Documentation and training ensure your team can self-serve simple tasks',
    ],
    metrics: [
      { value: 2, label: 'Hour Response', suffix: '' },
      { value: 24, label: 'Critical Fix SLA', suffix: 'hr' },
      { value: 99, label: 'Support Satisfaction', suffix: '%' },
    ],
    useCases: [
      'Mission-critical applications',
      'Customer-facing platforms',
      'High-availability systems',
      'Businesses needing reliability',
      'Peace of mind support',
    ],
    accentColor: '#10b981',
  },
];

const techStack = [
  { render: <span className="text-sm font-semibold text-white/80">Next.js</span>, alt: 'Next.js' },
  { render: <span className="text-sm font-semibold text-white/80">React</span>, alt: 'React' },
  {
    render: <span className="text-sm font-semibold text-white/80">Tailwind</span>,
    alt: 'Tailwind',
  },
  { render: <span className="text-sm font-semibold text-white/80">AWS</span>, alt: 'AWS' },
  { render: <span className="text-sm font-semibold text-white/80">Edge AI</span>, alt: 'Edge AI' },
  {
    render: <span className="text-sm font-semibold text-white/80">Supabase</span>,
    alt: 'Supabase',
  },
];

// Enhanced BentoCard with hover effects
function EnhancedBentoCard({
  item,
  index,
  onClick,
}: {
  item: (typeof differentiators)[0];
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full"
    >
      <BentoCard
        name={item.title}
        className="col-span-1 h-full transition-all duration-300 hover:scale-[1.02]"
        onClick={onClick}
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
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-50'}`}
                />
              </>
            )}
            {index === 1 && (
              <>
                <Meteors number={isHovered ? 10 : 5} />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-50'}`}
                />
              </>
            )}
            {index === 2 && (
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: isHovered
                    ? [
                        'radial-gradient(circle at 20% 20%, rgba(255,215,0,0.15), transparent 50%)',
                        'radial-gradient(circle at 80% 80%, rgba(255,215,0,0.15), transparent 50%)',
                      ]
                    : [
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
                    background:
                      'linear-gradient(45deg, transparent, rgba(255,215,0,0.05), transparent)',
                  }}
                />
              </div>
            )}
          </div>
        }
        Icon={item.icon}
        description={isHovered ? item.shortDesc : item.description}
        cta="Learn more"
        tooltip={item.title}
        ctaOnClick={onClick}
      />
    </motion.div>
  );
}

export default function AboutSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <div>
      <GradualBlurSection
        className="relative w-full py-6 sm:py-10 md:py-14 lg:py-18 xl:py-20"
        id="about"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 opacity-30 mix-blend-screen" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_70%,rgba(255,215,0,0.08),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,165,0,0.12),transparent_60%)]" />
        </div>

        <Container size="lg" className="relative">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {/* Header section with text and image side by side */}
            <div className="grid items-center gap-3 sm:gap-4 md:gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
              <div className="space-y-1.5 text-center sm:space-y-2 md:space-y-3 lg:space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center"
                >
                  <ShinyText
                    className="inline-block text-[0.5rem] uppercase tracking-[0.15em] text-anbu-gold sm:text-[0.625rem] sm:tracking-[0.2em] md:text-[0.7rem] md:tracking-[0.3em] lg:text-xs lg:tracking-[0.35em]"
                    speed={7}
                  >
                    Why Choose Us
                  </ShinyText>
                </motion.div>
                <BlurFadeText delay={0.1} duration={0.6}>
                  <h2 className="px-2 font-display text-lg font-bold leading-[1.2] text-white sm:px-0 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    Built to Help You Succeed
                  </h2>
                </BlurFadeText>
                <BlurFadeText delay={0.2} duration={0.6}>
                  <p className="mx-auto max-w-2xl px-4 text-[0.8125rem] leading-relaxed text-white/70 sm:px-0 sm:text-[0.875rem] md:text-[0.9375rem] lg:text-[1rem] xl:text-[1.0625rem]">
                    We make software development simple and affordable for growing businesses.
                  </p>
                </BlurFadeText>
              </div>

              {/* Image and caption - properly centered at all breakpoints */}
              <motion.div
                className="relative order-first flex w-full flex-col items-center justify-center gap-2 sm:gap-3 lg:order-last"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Container sized to match PixelImage dimensions for proper centering */}
                <div className="relative mx-auto max-w-[140px] overflow-hidden rounded-lg xs:max-w-[160px] sm:max-w-[200px] sm:rounded-xl md:max-w-[280px] lg:max-w-[384px]">
                  <div className="group relative">
                    {/* Subtle glow effect on hover */}
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-anbu-gold/20 to-anbu-gold-accent/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-75" />

                    {/* Image with border */}
                    <div className="relative overflow-hidden rounded-xl border border-white/10">
                      <PixelImage src={ABOUT_IMAGE.src} grid={ABOUT_IMAGE.pixelGrid} />

                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </div>
                </div>

                <motion.p
                  className="max-w-sm text-center text-[0.625rem] text-white/60 sm:text-[0.75rem] md:text-[0.8125rem] lg:text-[0.875rem]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {ABOUT_IMAGE.caption}
                </motion.p>
              </motion.div>
            </div>

            <LogoLoop
              logos={techStack}
              speed={28}
              className="mt-2 sm:mt-3 md:mt-4 lg:mt-6"
              fadeEdges
            />

            <BentoGrid className="mt-3 grid-cols-2 gap-3 sm:mt-4 sm:gap-4 md:mt-6 md:gap-5 lg:mt-8 lg:grid-cols-4">
              {differentiators.map((item, index) => (
                <EnhancedBentoCard
                  key={item.title}
                  item={item}
                  index={index}
                  onClick={() => setSelectedFeature(index)}
                />
              ))}
            </BentoGrid>
          </div>
        </Container>
      </GradualBlurSection>

      {/* Feature Modal */}
      {selectedFeature !== null && (
        <FeatureModal
          isOpen={selectedFeature !== null}
          onClose={() => setSelectedFeature(null)}
          feature={featureDetails[selectedFeature]}
        />
      )}
    </div>
  );
}
