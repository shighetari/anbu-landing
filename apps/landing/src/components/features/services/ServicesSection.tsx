'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Globe, Rocket, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'portal',
    title: 'ANBU Solutions Portal',
    description: 'Our flagship business portal showcasing premium digital services and enterprise solutions.',
    icon: Globe,
    href: '/solutions-portal',
    gradient: 'from-anbu-gold to-anbu-gold-accent',
  },
  {
    id: 'docs',
    title: 'Documentation Hub',
    description: 'Comprehensive technical documentation, API references, and developer resources.',
    icon: FileText,
    href: '/docs-hub',
    gradient: 'from-anbu-gold-accent to-anbu-gold',
  },
  {
    id: 'services',
    title: 'Digital Services',
    description: 'Custom software development, cloud solutions, and digital transformation expertise.',
    icon: Rocket,
    href: '#contact',
    gradient: 'from-anbu-gold to-anbu-gold-accent',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 marble-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="text-anbu-marble">Our </span>
            <span className="gold-gradient">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-anbu-marble/70 max-w-3xl mx-auto">
            Discover our suite of innovative solutions designed to elevate your digital presence
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <motion.div 
                  className="glass rounded-xl p-8 h-full border border-anbu-gold/20 hover:border-anbu-gold/50 transition-all duration-300 gold-glow"
                  whileHover={{ boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.gradient} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-anbu-black" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-display text-anbu-marble mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-anbu-marble/70 mb-6">
                    {service.description}
                  </p>

                  {/* CTA Link */}
                  <a
                    href={service.href}
                    className="inline-flex items-center text-anbu-gold hover:text-anbu-gold-accent transition-colors duration-300 font-semibold"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </a>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-anbu-gold text-anbu-black font-semibold rounded-lg hover:bg-anbu-gold-accent transition-all duration-300 gold-glow">
            Explore All Solutions
          </button>
        </motion.div>
      </div>
    </section>
  )
}