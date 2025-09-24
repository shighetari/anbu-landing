'use client'

import { motion } from 'framer-motion'
import { Video, Users, ShoppingBag, Shield, Mic, BarChart3 } from 'lucide-react'
import { CardContainer, CardBody, CardItem } from '@/components/aceternity/3d-card'
import { cn } from '@/lib/utils'

const additionalServices = [
  {
    title: 'Live Stream Production',
    icon: Video,
    price: '$1,500',
    description: 'Professional multi-camera streaming setup with real-time graphics',
    features: ['Multi-platform streaming', 'Professional overlays', 'Chat moderation'],
    color: 'from-red-500 to-pink-500'
  },
  {
    title: 'UGC Campaign Management',
    icon: Users,
    price: '$4,000',
    description: 'Coordinate and amplify user-generated content campaigns',
    features: ['Creator outreach', 'Content curation', 'Rights management'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Social Commerce Setup',
    icon: ShoppingBag,
    price: '$3,500',
    description: 'Transform your social presence into a revenue engine',
    features: ['Shoppable posts', 'Product tagging', 'Conversion tracking'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Crisis Management',
    icon: Shield,
    price: '$2,000',
    description: '24/7 monitoring and rapid response for brand protection',
    features: ['Real-time monitoring', 'Response protocols', 'Reputation recovery'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Podcast Production',
    icon: Mic,
    price: '$2,500',
    description: 'End-to-end podcast production with social distribution',
    features: ['Audio editing', 'Video snippets', 'Multi-platform distribution'],
    color: 'from-purple-500 to-violet-500'
  },
  {
    title: 'Analytics & Reporting',
    icon: BarChart3,
    price: '$1,000',
    description: 'Deep-dive analytics with actionable insights',
    features: ['Custom dashboards', 'Competitor analysis', 'ROI tracking'],
    color: 'from-teal-500 to-blue-500'
  }
]

export default function AdditionalServices() {
  return (
    <div className="grid auto-rows-fr gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 md:gap-12 lg:gap-16 justify-items-center">
      {additionalServices.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <CardContainer className="inter-var mx-auto w-full max-w-sm">
            <CardBody className="relative flex h-full min-h-[460px] flex-col justify-between items-center gap-6 rounded-[26px] border border-white/12 bg-black/60 p-8 sm:p-10 shadow-[0_14px_50px_rgba(0,0,0,0.55)] backdrop-blur">
              <div className="flex flex-col items-center gap-6">
                <CardItem translateZ="50">
                <div
                  className={cn(
                    "inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-[0_10px_25px_rgba(255,215,0,0.2)]",
                    service.color
                  )}
                >
                  <service.icon className="h-5 w-5" />
                </div>
                </CardItem>

                <CardItem
                  translateZ="60"
                  className="text-lg font-semibold text-white text-center"
                >
                  {service.title}
                </CardItem>

                <CardItem
                  as="p"
                  translateZ="60"
                  className="mx-auto max-w-xs text-xs sm:text-sm text-white/80 text-center leading-[1.8] min-h-[3rem]"
                >
                  {service.description}
                </CardItem>
              </div>

              <CardItem translateZ="80" className="w-full flex-grow flex items-center">
                <ul className="mx-auto flex flex-col items-center gap-3 text-xs text-white/70">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center justify-center gap-3">
                      <span className="text-anbu-gold">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardItem>

              <div className="flex w-full flex-col items-center gap-4">
                <CardItem translateZ={20} className="text-2xl font-bold text-anbu-gold">
                  {service.price}
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="rounded-full bg-anbu-gold/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-anbu-gold transition-colors hover:bg-anbu-gold/30"
                >
                  Learn More →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </motion.div>
      ))}
    </div>
  )
}
