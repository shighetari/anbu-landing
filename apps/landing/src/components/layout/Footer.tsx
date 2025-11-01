'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, Heart, ArrowUpRight, Zap } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Magnet } from '@/components/reactbits/magnet'
import { SparklesCore } from '@/components/aceternity/sparkles'

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/shighetari' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@anbu.ai' },
]

const quickLinks = [
  { name: 'Discover', href: '/#home' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Docs Hub', href: '/docs-hub' },
  { name: 'Marketing Studio', href: '/solutions/marketing-studio' },
  { name: 'Command Console', href: '/solutions/command-console' },
  { name: 'Contact', href: '/contact' },
]

// Social icon with micro animations
function SocialIcon({ social }: { social: typeof socialLinks[0] }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = social.icon

  return (
    <motion.a
      href={social.href}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={social.name}
    >
      <div className="relative flex h-10 w-10 items-center justify-center">
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-md bg-gradient-to-r from-anbu-gold/15 to-anbu-gold-accent/15 blur"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.15 : 0.85,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main icon container */}
        <div className="relative flex h-full w-full items-center justify-center rounded-md border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-anbu-gold/50">
          <Icon className="h-4 w-4 text-white/70 transition-colors duration-300 group-hover:text-anbu-gold" />
        </div>

        {/* Rotating border gradient on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-md"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
            >
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-anbu-gold/30 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [emailHovered, setEmailHovered] = useState(false)

  return (
    <footer className="relative border-t border-anbu-gold/10 bg-black">
      <Container size="lg" className="relative">
        {/* Main footer content */}
        <div className="py-10 lg:py-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-start space-y-5 lg:max-w-sm"
            >
              <div className="relative">
                <SparklesCore
                  id="footer-logo-sparkles"
                  background="transparent"
                  minSize={0.25}
                  maxSize={0.7}
                  particleColor="#FFD700"
                  className="absolute -left-4 -top-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)]"
                  particleDensity={12}
                />
                <h3 className="relative font-display text-xl font-semibold uppercase tracking-[0.4em] text-white/80">
                  ANBU
                </h3>
              </div>

              <span className="text-[10px] uppercase tracking-[0.32em] text-anbu-gold/60">
                Design & Engineering
              </span>

              <p className="max-w-sm text-sm text-white/55">
                Premium digital craft for teams shipping ambitious product experiences with precision and pace.
              </p>

              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <SocialIcon key={social.name} social={social} />
                ))}
              </div>
            </motion.div>

            {/* Right: Navigation & CTA */}
            <div className="flex w-full flex-col gap-8 lg:max-w-lg lg:items-end lg:text-right">
              <motion.nav
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="w-full"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/35">
                  Navigation
                </span>
                <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/55 lg:justify-items-end">
                  {quickLinks.map((link) => (
                    <Magnet key={link.name} strength={0.25}>
                      <motion.a
                        href={link.href}
                        className="relative inline-flex items-center gap-2 transition-colors duration-300 hover:text-anbu-gold"
                        whileHover={{ x: -4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                      >
                        <span className="relative">
                          {link.name}
                          <motion.span
                            className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-anbu-gold to-anbu-gold-accent"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.25 }}
                          />
                        </span>
                      </motion.a>
                    </Magnet>
                  ))}
                </div>
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 }}
                className="flex w-full flex-col items-start gap-3 lg:max-w-md lg:items-end"
              >
                <p className="text-sm text-white/50 lg:max-w-xs">
                  We collaborate with founders and product teams to ship expressive, resilient interfaces.
                </p>

                <motion.a
                  href="mailto:contact@anbu.ai"
                  className="group inline-flex items-center gap-2 rounded-full border border-anbu-gold/40 bg-black/60 px-6 py-3 text-sm font-medium text-white/85 backdrop-blur transition-all duration-300 hover:border-anbu-gold/70 hover:text-anbu-gold"
                  onMouseEnter={() => setEmailHovered(true)}
                  onMouseLeave={() => setEmailHovered(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.span
                    className="inline-flex items-center gap-2"
                    animate={{
                      x: emailHovered ? 2 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  >
                    <Zap className="h-4 w-4" />
                    <span>Let's build</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </motion.span>
                </motion.a>

                <div className="flex items-center gap-2 text-[11px] text-white/40 lg:self-end">
                  <motion.span
                    className="inline-block h-2 w-2 rounded-full bg-green-500"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span>Available for projects</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-anbu-gold/5 py-6"
        >
          <div className="flex flex-col gap-4 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>© {currentYear} ANBU</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Made with
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <Heart className="h-3 w-3 text-anbu-gold fill-anbu-gold" />
                </motion.span>
                by Francisco
              </span>
            </div>

            <div className="flex items-center gap-5">
              {['Privacy', 'Terms', 'Cookies'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="transition-colors duration-300 hover:text-anbu-gold"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top border glow */}
        <motion.div
          className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-anbu-gold/30 to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </Container>
    </footer>
  )
}
