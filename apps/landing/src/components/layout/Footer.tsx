'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, Heart, Sparkles, ArrowUpRight, Code2, Zap } from 'lucide-react'
import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { Magnet } from '@/components/reactbits/magnet'
import { DecryptedText } from '@/components/reactbits/decrypted-text'
import { SparklesCore } from '@/components/aceternity/sparkles'
import { BorderBeam } from '@/components/ui/border-beam'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { cn } from '@/lib/cn'

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/shighetari' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@anbu.ai' },
]

const quickLinks = [
  { name: 'Discover', href: '/#home' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Resources', href: '/resources' },
  { name: 'Docs Hub', href: '/resources/docs-hub' },
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={social.name}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-anbu-gold/20 to-anbu-gold-accent/20 blur-md"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main icon container */}
        <div className="relative w-full h-full rounded-lg bg-white/5 border border-white/10 hover:border-anbu-gold/50 flex items-center justify-center transition-all duration-300">
          <Icon className="w-5 h-5 text-white/70 group-hover:text-anbu-gold transition-colors duration-300" />
        </div>

        {/* Rotating border gradient on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-lg"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-anbu-gold/30 to-transparent" />
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
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-start">

            {/* Left: Brand & Tagline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center lg:items-start space-y-6"
            >
              <div className="relative mb-2">
                <SparklesCore
                  id="footer-logo-sparkles"
                  background="transparent"
                  minSize={0.3}
                  maxSize={0.8}
                  particleColor="#FFD700"
                  className="absolute -inset-x-4 -inset-y-2 w-[calc(100%+2rem)] h-[calc(100%+1rem)]"
                  particleDensity={15}
                />
                <h3 className="relative font-display text-2xl font-bold bg-gradient-to-r from-anbu-gold via-anbu-gold-accent to-anbu-gold bg-clip-text text-transparent">
                  ANBU
                </h3>
              </div>

              {/* Subtle tagline */}
              <p className="text-xs text-white/40 text-center lg:text-left">
                Premium digital craft
              </p>

              {/* Social icons with micro animations */}
              <div className="flex gap-4 mt-2">
                {socialLinks.map((social) => (
                  <SocialIcon key={social.name} social={social} />
                ))}
              </div>
            </motion.div>

            {/* Center: Quick Links - properly centered */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex justify-center lg:justify-center"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-4 text-sm">
                {quickLinks.map((link, index) => (
                  <Magnet
                    key={link.name}
                    strength={0.3}
                  >
                    <motion.a
                      href={link.href}
                      className="relative text-white/60 hover:text-anbu-gold transition-colors duration-300 group"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="relative">
                        {link.name}
                        {/* Underline animation */}
                        <motion.span
                          className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-anbu-gold to-anbu-gold-accent"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </motion.a>
                  </Magnet>
                ))}
              </div>
            </motion.nav>

            {/* Right: CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center lg:items-end space-y-6"
            >
              {/* New CTA - Let's build something */}
              <motion.a
                href="mailto:contact@anbu.ai"
                className="relative group inline-block"
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative px-8 py-4 rounded-full bg-gradient-to-r from-black to-black border border-anbu-gold/20 hover:border-anbu-gold/50 transition-all duration-300 overflow-hidden">
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-anbu-gold/0 via-anbu-gold/10 to-anbu-gold/0"
                    animate={{
                      x: emailHovered ? ['100%', '-100%'] : '100%',
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: emailHovered ? Infinity : 0,
                      ease: "linear",
                    }}
                  />

                  <span className="relative flex items-center gap-2 text-sm font-medium text-white/90 group-hover:text-anbu-gold transition-colors duration-300">
                    <Zap className="w-4 h-4" />
                    <span>Let's build</span>
                    <motion.div
                      animate={{ x: emailHovered ? 3 : 0, y: emailHovered ? -3 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowUpRight className="w-3 h-3" />
                    </motion.div>
                  </span>
                </div>
              </motion.a>

              {/* Status indicator */}
              <div className="flex items-center gap-2 text-xs text-white/40">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span>Available for projects</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-anbu-gold/5 py-8 mt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40">
            {/* Copyright */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
              <span>© {currentYear} ANBU</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Made with
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="inline-block"
                >
                  <Heart className="w-3 h-3 text-anbu-gold fill-anbu-gold" />
                </motion.div>
                by Francisco
              </span>
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:text-anbu-gold transition-colors duration-300"
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
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </Container>
    </footer>
  )
}