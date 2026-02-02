'use client';

import { motion } from 'framer-motion';
import { Video, Users, ShoppingBag, Shield, Mic, BarChart3 } from '@/components/ui/lucide-safe';

import { CardContainer, CardBody, CardItem } from '@/components/aceternity/3d-card';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { cn } from '@/lib/utils';

const additionalServices = [
  {
    title: 'Live Stream Production',
    icon: Video,
    price: '$1,500',
    description: 'Professional multi-camera streaming setup with real-time graphics',
    features: ['Multi-platform streaming', 'Professional overlays', 'Chat moderation'],
    accent: {
      colorFrom: '#f87171',
      colorTo: '#fb7185',
      overlay: 'from-red-500/12 via-transparent to-transparent',
      icon: 'from-red-400 via-pink-400 to-rose-400',
      bullet: 'from-red-500/65 to-pink-500/65',
      glow: 'hover:shadow-[0_18px_55px_rgba(236,72,153,0.35)]',
    },
  },
  {
    title: 'UGC Campaign Management',
    icon: Users,
    price: '$4,000',
    description: 'Coordinate and amplify user-generated content campaigns',
    features: ['Creator outreach', 'Content curation', 'Rights management'],
    accent: {
      colorFrom: '#4ade80',
      colorTo: '#10b981',
      overlay: 'from-emerald-500/12 via-transparent to-transparent',
      icon: 'from-emerald-400 via-green-400 to-lime-400',
      bullet: 'from-emerald-500/65 to-lime-400/65',
      glow: 'hover:shadow-[0_18px_55px_rgba(16,185,129,0.35)]',
    },
  },
  {
    title: 'Social Commerce Setup',
    icon: ShoppingBag,
    price: '$3,500',
    description: 'Transform your social presence into a revenue engine',
    features: ['Shoppable posts', 'Product tagging', 'Conversion tracking'],
    accent: {
      colorFrom: '#38bdf8',
      colorTo: '#22d3ee',
      overlay: 'from-sky-500/12 via-transparent to-transparent',
      icon: 'from-sky-400 via-cyan-400 to-emerald-300',
      bullet: 'from-sky-500/65 to-cyan-400/65',
      glow: 'hover:shadow-[0_18px_55px_rgba(56,189,248,0.35)]',
    },
  },
  {
    title: 'Crisis Management',
    icon: Shield,
    price: '$2,000',
    description: '24/7 monitoring and rapid response for brand protection',
    features: ['Real-time monitoring', 'Response protocols', 'Reputation recovery'],
    accent: {
      colorFrom: '#facc15',
      colorTo: '#fb923c',
      overlay: 'from-amber-500/12 via-transparent to-transparent',
      icon: 'from-amber-400 via-orange-400 to-yellow-300',
      bullet: 'from-amber-500/65 to-orange-400/65',
      glow: 'hover:shadow-[0_18px_55px_rgba(251,191,36,0.35)]',
    },
  },
  {
    title: 'Podcast Production',
    icon: Mic,
    price: '$2,500',
    description: 'End-to-end podcast production with social distribution',
    features: ['Audio editing', 'Video snippets', 'Multi-platform distribution'],
    accent: {
      colorFrom: '#c084fc',
      colorTo: '#a855f7',
      overlay: 'from-purple-500/12 via-transparent to-transparent',
      icon: 'from-violet-400 via-purple-400 to-fuchsia-400',
      bullet: 'from-violet-500/65 to-purple-500/65',
      glow: 'hover:shadow-[0_18px_55px_rgba(168,85,247,0.35)]',
    },
  },
  {
    title: 'Analytics & Reporting',
    icon: BarChart3,
    price: '$1,000',
    description: 'Deep-dive analytics with actionable insights',
    features: ['Custom dashboards', 'Competitor analysis', 'ROI tracking'],
    accent: {
      colorFrom: '#2dd4bf',
      colorTo: '#0ea5e9',
      overlay: 'from-teal-500/12 via-transparent to-transparent',
      icon: 'from-teal-400 via-cyan-400 to-blue-400',
      bullet: 'from-teal-500/65 to-blue-400/65',
      glow: 'hover:shadow-[0_18px_55px_rgba(14,165,233,0.35)]',
    },
  },
];

export default function AdditionalServices() {
  return (
    <div className="grid auto-rows-fr grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-12">
      {additionalServices.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <CardContainer className="inter-var mx-auto w-full max-w-sm">
            <CardBody className="border-white/12 relative flex h-full min-h-[420px] flex-col items-center justify-between gap-6 overflow-hidden rounded-[26px] border bg-black/60 p-6 shadow-[0_14px_50px_rgba(0,0,0,0.55)] backdrop-blur sm:min-h-[460px] sm:gap-8 sm:p-8 lg:p-9">
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 opacity-90',
                  'bg-gradient-to-br',
                  service.accent.overlay
                )}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/5" />

              <div className="relative flex flex-col items-center gap-6 text-center">
                <CardItem translateZ="50">
                  <div
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/15',
                      service.accent.icon
                    )}
                  >
                    <service.icon className="h-5 w-5" />
                  </div>
                </CardItem>

                <CardItem translateZ="60">
                  <AnimatedGradientText
                    speed={1.15}
                    colorFrom={service.accent.colorFrom}
                    colorTo={service.accent.colorTo}
                    className="text-lg font-semibold tracking-tight text-white"
                  >
                    {service.title}
                  </AnimatedGradientText>
                </CardItem>

                <CardItem
                  as="p"
                  translateZ="60"
                  className="mx-auto max-w-xs text-xs leading-[1.8] text-white/80 sm:text-sm"
                >
                  {service.description}
                </CardItem>
              </div>

              <CardItem translateZ="80" className="relative flex w-full flex-grow items-center">
                <ul className="mx-auto flex w-full flex-col items-center gap-3">
                  {service.features.map((feature) => (
                    <motion.li
                      key={feature}
                      whileHover={{ scale: 1.02 }}
                      className={cn(
                        'border-white/12 group flex w-full max-w-xs items-center justify-center gap-3 rounded-full border bg-white/[0.04] px-4 py-3 text-center text-xs text-white/80 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] sm:text-sm',
                        service.accent.glow
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br text-[0.65rem] font-semibold text-anbu-ink/90 shadow-[0_10px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-110',
                          service.accent.bullet
                        )}
                      >
                        •
                      </span>
                      <span className="flex-1 text-center leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardItem>

              <div className="relative flex w-full flex-col items-center gap-4">
                <CardItem translateZ={20}>
                  <AnimatedGradientText
                    speed={1.1}
                    colorFrom={service.accent.colorFrom}
                    colorTo={service.accent.colorTo}
                    className="text-2xl font-bold text-white"
                  >
                    {service.price}
                  </AnimatedGradientText>
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="hover:from-white/22 hover:via-white/16 hover:to-white/9 min-h-[44px] rounded-full bg-gradient-to-r from-white/15 via-white/10 to-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-300"
                  style={{ touchAction: 'manipulation' } as React.CSSProperties}
                >
                  Learn More →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </motion.div>
      ))}
    </div>
  );
}
