'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Users, Zap, Shield } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'We write maintainable, scalable code following industry best practices.',
  },
  {
    icon: Users,
    title: 'Client Focused',
    description: 'Your success is our priority. We build solutions tailored to your needs.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Lightning-fast applications optimized for the best user experience.',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Enterprise-grade security built into every solution we deliver.',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-anbu-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              <span className="text-anbu-marble">Why Choose </span>
              <span className="gold-gradient">ANBU</span>
            </h2>
            
            <p className="text-lg text-anbu-marble/70 mb-8">
              We're not just another digital agency. We're innovators, problem solvers, 
              and partners in your digital journey. With cutting-edge technology and a 
              passion for excellence, we transform ideas into reality.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-anbu-gold/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-anbu-gold" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-anbu-marble mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-anbu-marble/70">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Visual Side - Stats or Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass rounded-xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <motion.div
                    className="text-4xl lg:text-5xl font-bold gold-gradient mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    50+
                  </motion.div>
                  <p className="text-anbu-marble/70">Projects Delivered</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className="text-4xl lg:text-5xl font-bold gold-gradient mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    100%
                  </motion.div>
                  <p className="text-anbu-marble/70">Client Satisfaction</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className="text-4xl lg:text-5xl font-bold gold-gradient mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    24/7
                  </motion.div>
                  <p className="text-anbu-marble/70">Support Available</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className="text-4xl lg:text-5xl font-bold gold-gradient mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    5★
                  </motion.div>
                  <p className="text-anbu-marble/70">Average Rating</p>
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 text-center"
              >
                <button className="px-8 py-4 bg-anbu-gold text-anbu-black font-semibold rounded-lg hover:bg-anbu-gold-accent transition-all duration-300 gold-glow w-full">
                  Start Your Project
                </button>
              </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-anbu-gold/5 to-anbu-gold-accent/5 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}