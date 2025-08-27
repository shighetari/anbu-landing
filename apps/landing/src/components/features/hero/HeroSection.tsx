'use client'

import React from 'react'
import LetterGlitch from './LetterGlitch'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Letter Glitch Background - this is the star of the show */}
      <LetterGlitch className="absolute inset-0" />
      
      {/* Gradient overlay for that premium feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-anbu-black/50 z-[5]" />
      
      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          {/* Main heading with gold gradient */}
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="gold-gradient">ANBU</span>
            <span className="text-anbu-marble ml-4">Solutions</span>
          </motion.h1>
          
          {/* Tagline */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-anbu-marble/80 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Innovative Digital Solutions for the Modern Era
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button className="px-8 py-4 bg-anbu-gold text-anbu-black font-semibold rounded-lg hover:bg-anbu-gold-accent transition-all duration-300 gold-glow">
              Get Started
            </button>
            <button className="px-8 py-4 border border-anbu-gold/50 text-anbu-gold font-semibold rounded-lg hover:bg-anbu-gold/10 transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToServices}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <ChevronDown 
            className="w-8 h-8 text-anbu-gold animate-bounce" 
          />
        </motion.div>
      </div>
    </section>
  )
}