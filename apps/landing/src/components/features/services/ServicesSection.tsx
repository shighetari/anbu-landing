'use client';

import { CircuitBoard, Globe2, Layers3, Sparkles } from '@/components/ui/lucide-safe';
import { motion } from 'framer-motion';

import Container from '@/components/ui/Container';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { Meteors } from '@/components/aceternity/meteors';
import { SparklesCore } from '@/components/aceternity/sparkles';
import { GradualBlurSection } from '@/components/reactbits/gradual-blur-section';
import { BlurFadeText } from '@/components/magicui/blur-fade-text';
import { ShinyText } from '@/components/magicui/shiny-text';
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect';

const services = [
  {
    id: 'saas-build',
    name: 'Build Your App',
    description: 'Custom web apps ready in 8-12 weeks',
    href: '/solutions/command-console',
    cta: 'See examples',
    icon: Globe2,
    tooltip: 'Web Apps',
    accentColor: '#FFB700',
  },
  {
    id: 'integration',
    name: 'Connect Your Tools',
    description: 'Link your software and automate tasks',
    href: '/contact',
    cta: 'Get started',
    icon: Sparkles,
    tooltip: 'Integrations',
    accentColor: '#C084FC',
  },
  {
    id: 'intelligence',
    name: 'Analytics & Insights',
    description: 'Dashboards that make your data useful',
    href: '/docs-hub',
    cta: 'Learn more',
    icon: Layers3,
    tooltip: 'Analytics',
    accentColor: '#0EA5E9',
  },
  {
    id: 'pods',
    name: 'Dedicated Team',
    description: 'Part-time developers when you need them',
    href: '/contact',
    cta: 'Talk to us',
    icon: CircuitBoard,
    tooltip: 'Team',
    accentColor: '#EA580C',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    },
  },
};

// I'm creating sick animated gradient backgrounds for each card
const AnimatedGradientBackground = ({ color, variant }: { color: string; variant: string }) => {
  const gradientVariants = {
    portal: (
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(45deg, ${color}30 0%, transparent 50%, ${color}20 100%)`,
            `linear-gradient(135deg, ${color}20 0%, ${color}30 50%, transparent 100%)`,
            `linear-gradient(225deg, transparent 0%, ${color}30 50%, ${color}20 100%)`,
            `linear-gradient(315deg, ${color}20 0%, transparent 50%, ${color}30 100%)`,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    ),
    experience: (
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${color}25 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${color}20 0%, transparent 50%)`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ),
    data: (
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${color}25 90deg, transparent 180deg, ${color}20 270deg, transparent 360deg)`,
            `conic-gradient(from 180deg at 50% 50%, transparent 0deg, ${color}20 90deg, transparent 180deg, ${color}25 270deg, transparent 360deg)`,
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    ),
    automation: (
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${color}15 10px, ${color}15 20px)`,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '20px 20px'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    ),
  };

  return gradientVariants[variant as keyof typeof gradientVariants] || gradientVariants.portal;
};

export default function ServicesSection() {
  return (
    <GradualBlurSection
      id="services"
      className="relative flex w-full justify-center overflow-hidden py-6 sm:py-10 md:py-14 lg:py-18 xl:py-20"
    >
      {/* Enhanced background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-black" />
      <div className="absolute inset-0 opacity-30 mix-blend-screen" aria-hidden>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(255,215,0,0.08), transparent 55%)',
              'radial-gradient(circle at 80% 80%, rgba(255,215,0,0.08), transparent 55%)',
              'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.08), transparent 55%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container
        size="lg"
        className="relative flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12"
      >
        {/* Enhanced header section */}
        <div className="flex w-full max-w-3xl flex-col items-center space-y-2 text-center sm:space-y-3 md:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ShinyText
              className="text-[10px] font-medium uppercase tracking-[0.12em] text-anbu-gold sm:text-xs sm:tracking-[0.15em] md:tracking-[0.2em]"
              speed={6}
            >
              Our Services
            </ShinyText>
          </motion.div>

          <h2 className="font-display text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            <TextGenerateEffect words="What We Build" className="" duration={0.8} />
          </h2>

          <BlurFadeText delay={0.3} duration={0.7}>
            <p className="mx-auto max-w-xl px-4 text-xs leading-relaxed text-white/70 sm:px-0 sm:text-sm md:text-base lg:text-lg">
              Fast, reliable software for growing businesses.
            </p>
          </BlurFadeText>
        </div>

        {/* Enhanced cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full"
        >
          <BentoGrid className="mt-3 grid-cols-2 gap-3 sm:mt-4 sm:gap-4 md:mt-6 md:gap-5 lg:grid-cols-4">
            {/* Portal Card */}
            <motion.div
              key={services[0].id}
              variants={itemVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 220, damping: 18 },
              }}
              whileTap={{ scale: 0.97 }}
              className="h-full"
            >
              <BentoCard
                name={services[0].name}
                className="col-span-1 h-full"
                background={
                  <div className="absolute inset-0 overflow-hidden">
                    <AnimatedGradientBackground color={services[0].accentColor} variant="portal" />
                    <SparklesCore
                      id="portal-sparkles"
                      background="transparent"
                      particleColor={services[0].accentColor}
                      className="h-full w-full"
                      particleDensity={22}
                      minSize={0.5}
                      maxSize={1.1}
                    />
                  </div>
                }
                Icon={services[0].icon}
                description={services[0].description}
                href={services[0].href}
                cta={services[0].cta}
                tooltip={services[0].tooltip}
                accentColor={services[0].accentColor}
              />
            </motion.div>

            {/* Experience Card */}
            <motion.div
              key={services[1].id}
              variants={itemVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 220, damping: 18 },
              }}
              whileTap={{ scale: 0.97 }}
              className="h-full"
            >
              <BentoCard
                name={services[1].name}
                className="col-span-1 h-full"
                background={
                  <div className="absolute inset-0 overflow-hidden">
                    <AnimatedGradientBackground
                      color={services[1].accentColor}
                      variant="experience"
                    />
                    <Meteors number={6} />
                  </div>
                }
                Icon={services[1].icon}
                description={services[1].description}
                href={services[1].href}
                cta={services[1].cta}
                tooltip={services[1].tooltip}
                accentColor={services[1].accentColor}
              />
            </motion.div>

            {/* Data Ops Card */}
            <motion.div
              key={services[2].id}
              variants={itemVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 220, damping: 18 },
              }}
              whileTap={{ scale: 0.97 }}
              className="h-full"
            >
              <BentoCard
                name={services[2].name}
                className="col-span-1 h-full"
                background={
                  <div className="absolute inset-0 overflow-hidden">
                    <AnimatedGradientBackground color={services[2].accentColor} variant="data" />
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        backgroundImage: [
                          `linear-gradient(0deg, transparent, ${services[2].accentColor}10)`,
                          `linear-gradient(180deg, transparent, ${services[2].accentColor}10)`,
                        ],
                      }}
                      transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
                    />
                  </div>
                }
                Icon={services[2].icon}
                description={services[2].description}
                href={services[2].href}
                cta={services[2].cta}
                tooltip={services[2].tooltip}
                accentColor={services[2].accentColor}
              />
            </motion.div>

            {/* Automation Card */}
            <motion.div
              key={services[3].id}
              variants={itemVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 220, damping: 18 },
              }}
              whileTap={{ scale: 0.97 }}
              className="h-full"
            >
              <BentoCard
                name={services[3].name}
                className="col-span-1 h-full"
                background={
                  <div className="absolute inset-0 overflow-hidden">
                    <AnimatedGradientBackground
                      color={services[3].accentColor}
                      variant="automation"
                    />
                    <SparklesCore
                      id="automation-sparkles"
                      background="transparent"
                      particleColor={services[3].accentColor}
                      className="h-full w-full"
                      particleDensity={18}
                      minSize={0.35}
                      maxSize={1.0}
                    />
                  </div>
                }
                Icon={services[3].icon}
                description={services[3].description}
                href={services[3].href}
                cta={services[3].cta}
                tooltip={services[3].tooltip}
                accentColor={services[3].accentColor}
              />
            </motion.div>
          </BentoGrid>
        </motion.div>
      </Container>
    </GradualBlurSection>
  );
}
