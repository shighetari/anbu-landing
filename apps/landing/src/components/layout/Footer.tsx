'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

import Container from '@/components/ui/Container'

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/shighetari' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@anbu.ai' },
]

const footerLinks = {
  Solutions: [
    { name: 'Web Development', href: '#' },
    { name: 'Mobile Apps', href: '#' },
    { name: 'Cloud Services', href: '#' },
    { name: 'Consulting', href: '#' },
  ],
  Company: [
    { name: 'About Us', href: '#about' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#contact' },
  ],
  Resources: [
    { name: 'Documentation', href: '/docs-hub' },
    { name: 'API Reference', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'Status', href: '#' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-anbu-gold/20 bg-anbu-black pt-16 pb-8">
      <Container size="md" className="flex w-full flex-col gap-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold font-display mb-4">
                <span className="gold-gradient">ANBU</span>
                <span className="text-anbu-marble ml-2">Solutions</span>
              </h3>
              <p className="text-anbu-marble/70 mb-6 max-w-sm">
                Innovative digital solutions crafted with precision and passion. 
                Elevating businesses through cutting-edge technology.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 rounded-lg bg-anbu-gray/50 hover:bg-anbu-gold/20 flex items-center justify-center transition-all duration-300 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5 text-anbu-marble/70 group-hover:text-anbu-gold transition-colors duration-300" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-anbu-marble font-semibold font-display mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-anbu-marble/70 hover:text-anbu-gold transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-anbu-gold/20 pt-8">
          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            {/* Copyright */}
            <div className="text-anbu-marble/70 text-sm flex items-center">
              <span>© {currentYear} ANBU Solutions. All rights reserved.</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-anbu-gold" fill="currentColor" /> by Francisco
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-anbu-marble/70 hover:text-anbu-gold transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-anbu-marble/70 hover:text-anbu-gold transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-anbu-marble/70 hover:text-anbu-gold transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </footer>
  )
}