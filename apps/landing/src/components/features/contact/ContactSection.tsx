'use client'

import { ArrowUpRight, Mail, MessageSquare, Sparkles, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { ShineBorder } from '@/components/ui/shine-border'
import { GradualBlurSection } from '@/components/reactbits/gradual-blur-section'
import { WobbleCard } from '@/components/aceternity/wobble-card'
import { Confetti } from '@/components/magicui/confetti'
import { BlurFadeText } from '@/components/magicui/blur-fade-text'
import { ShinyText } from '@/components/magicui/shiny-text'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { TextGenerateEffect } from '@/components/aceternity/text-generate-effect'
import { TypewriterEffect } from '@/components/aceternity/typewriter-effect'
import { TextHoverEffect } from '@/components/aceternity/text-hover-effect'
import { cn } from '@/lib/utils'
import { buttonVariants, animationVariants, buttonSizes } from '@/lib/button-variants'

const contactOptions = [
  {
    title: 'Email',
    titleWords: [{ text: 'Email' }],
    description: 'Quick replies',
    shortDesc: '<24hrs',
    icon: Mail,
    href: 'mailto:contact@anbu.ai',
    label: 'contact@anbu.ai',
    gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    iconGradient: 'from-blue-500 to-cyan-500',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]',
  },
  {
    title: 'Schedule',
    titleWords: [{ text: 'Schedule' }],
    description: 'Talk on a call',
    shortDesc: '30 min',
    icon: MessageSquare,
    href: 'https://cal.com/',
    label: 'Book a call',
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    iconGradient: 'from-purple-500 to-pink-500',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]',
  },
]

export default function ContactSection() {
  const initialFormState = {
    name: '',
    email: '',
    company: '',
    teamSize: '',
    budget: '',
    timeline: '',
    projectType: '',
    projectFocus: '',
  }

  const [formState, setFormState] = useState(initialFormState)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isClientReady, setIsClientReady] = useState(false)

  useEffect(() => {
    setIsClientReady(true)
  }, [])

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)

    const lines = [
      `Name: ${formState.name || 'N/A'}`,
      `Email: ${formState.email || 'N/A'}`,
      `Company: ${formState.company || 'N/A'}`,
      `Team Size: ${formState.teamSize || 'N/A'}`,
      `Budget: ${formState.budget || 'N/A'}`,
      `Timeline: ${formState.timeline || 'N/A'}`,
      `Project Type: ${formState.projectType || 'N/A'}`,
      '',
      'Project Focus:',
      formState.projectFocus || 'N/A',
    ].join('\n')

    const params = new URLSearchParams()
    params.set(
      'subject',
      `ANBU Project Inquiry - ${formState.company || formState.name || 'New Lead'}`,
    )
    params.set('body', lines)

    const mailtoUrl = `mailto:contact@anbu.ai?${params.toString()}`

    if (typeof window !== 'undefined') {
      window.location.href = mailtoUrl
    }

    setSubmitted(true)
    setFormState(initialFormState)

    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)

    setTimeout(() => {
      setIsSubmitting(false)
    }, 400)
  }

  const handleContactClick = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const contactIntro = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center space-y-3 sm:space-y-3.5 md:space-y-5 w-full max-w-3xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ShinyText className="inline-flex items-center justify-center px-2.5 py-0.5 text-xs sm:text-sm uppercase tracking-[0.25em] text-anbu-gold/90" speed={4}>
          Connect
        </ShinyText>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-anbu-gold to-white bg-clip-text text-transparent"
      >
        Ready to Build?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="max-w-md mx-auto text-base sm:text-lg text-white/60 leading-relaxed"
      >
        Let's discuss your vision.
      </motion.p>
    </motion.div>
  )

  const skeleton = (
    <div className="grid w-full max-w-5xl mx-auto gap-6 sm:gap-7 md:gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-black/85 via-black/70 to-black/60 px-5 py-6 sm:px-7 sm:py-7 md:px-9 md:py-10 text-left shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl animate-pulse">
        <div className="space-y-4">
          <div className="h-8 w-40 rounded-full bg-white/10" />
          <div className="h-6 w-3/4 rounded bg-white/10" />
          <div className="h-4 w-2/3 rounded bg-white/10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-14 rounded-xl bg-white/10" />
            ))}
          </div>
          <div className="h-24 rounded-2xl bg-white/10" />
          <div className="h-12 w-40 rounded-full bg-anbu-gold/40" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="h-40 rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          />
        ))}
        <div className="h-28 rounded-2xl border border-white/10 bg-white/5" />
      </div>
    </div>
  )

  return (
    <GradualBlurSection
      id="contact"
      className="relative py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 w-full flex justify-center bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      <div className="absolute inset-0 opacity-20 mix-blend-screen" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,215,0,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,168,0,0.08),transparent_55%)]" />
      </div>

      <Container size="lg" className="relative flex w-full flex-col items-center gap-6 sm:gap-7 md:gap-8 lg:gap-10 text-center px-3 sm:px-4 lg:px-5">
        {contactIntro}

        {isClientReady ? (
          <div className="grid w-full max-w-5xl mx-auto gap-4 sm:gap-5 md:gap-6 lg:gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <motion.form
              onSubmit={handleFormSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-black/85 via-black/70 to-black/60 px-6 py-6 sm:px-7 sm:py-7 md:px-10 md:py-10 text-left shadow-[0_30px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            >
            <div className="space-y-0.5">
              <motion.div
                className="inline-flex items-center gap-1 rounded-full border border-anbu-gold/25 bg-anbu-gold/5 px-2 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-anbu-gold/90"
                whileHover={{ scale: 1.03, borderColor: 'rgba(255, 215, 0, 0.4)', backgroundColor: 'rgba(255, 215, 0, 0.08)' }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="h-2 w-2" />
                Quick Form
              </motion.div>
              <div className="text-xs sm:text-sm font-medium text-white/70 leading-tight pt-0.5 tracking-tight">
                Takes 2 minutes
              </div>
              <p className="text-[10px] sm:text-xs text-white/35 leading-relaxed max-w-md">
                I'll get back to you within 24 hours with next steps.
              </p>
              {submitted ? (
                <p className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200 shadow-[0_20px_60px_rgba(16,185,129,0.25)] mt-2">
                  Thanks for reaching out! I'll respond with next steps soon.
                </p>
              ) : null}
            </div>

            <div className="space-y-4 pt-1">
              {/* Personal Info Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Name</span>
                  <input
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Jane Founder"
                    className="rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-white/95 placeholder:text-white/40 transition-all duration-200 hover:border-white/25 focus:border-anbu-gold focus:outline-none focus:ring-2 focus:ring-anbu-gold/40 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                    autoComplete="name"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Company</span>
                  <input
                    name="company"
                    value={formState.company}
                    onChange={handleInputChange}
                    placeholder="Acme Labs"
                    className="rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-white/95 placeholder:text-white/40 transition-all duration-200 hover:border-white/25 focus:border-anbu-gold focus:outline-none focus:ring-2 focus:ring-anbu-gold/40 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                    autoComplete="organization"
                  />
                </label>
              </div>

              {/* Contact & Context Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    Email <span className="text-anbu-gold/90">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className="rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-white/95 placeholder:text-white/40 transition-all duration-200 hover:border-white/25 focus:border-anbu-gold focus:outline-none focus:ring-2 focus:ring-anbu-gold/40 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Team Size</span>
                  <div className="relative">
                    <select
                      name="teamSize"
                      value={formState.teamSize}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 pr-10 text-sm text-white/95 transition-all duration-200 hover:border-white/25 focus:border-anbu-gold focus:outline-none focus:ring-2 focus:ring-anbu-gold/40 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] cursor-pointer"
                      aria-label="Select team size"
                    >
                      <option value="" className="bg-neutral-950 text-white/60">
                        Select team size
                      </option>
                      <option value="Solo founder / Freelancer" className="bg-neutral-950 text-white">
                        Solo founder / Freelancer
                      </option>
                      <option value="2-10 team members" className="bg-neutral-950 text-white">
                        2-10 team members
                      </option>
                      <option value="11-50 team members" className="bg-neutral-950 text-white">
                        11-50 team members
                      </option>
                      <option value="51-200 team members" className="bg-neutral-950 text-white">
                        51-200 team members
                      </option>
                      <option value="200+ enterprise" className="bg-neutral-950 text-white">
                        200+ enterprise
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-anbu-gold/60 transition-colors" />
                  </div>
                </label>
              </div>

              {/* Project Scope Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Budget Range</span>
                  <div className="relative">
                    <select
                      name="budget"
                      value={formState.budget}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 pr-10 text-sm text-white/95 transition-all duration-200 hover:border-white/25 focus:border-anbu-gold focus:outline-none focus:ring-2 focus:ring-anbu-gold/40 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] cursor-pointer"
                      aria-label="Select budget range"
                    >
                      <option value="" className="bg-neutral-950 text-white/60">
                        Select budget range
                      </option>
                      <option value="<$25k" className="bg-neutral-950 text-white">
                        Under $25k
                      </option>
                      <option value="$25k-$50k" className="bg-neutral-950 text-white">
                        $25k – $50k
                      </option>
                      <option value="$50k-$100k" className="bg-neutral-950 text-white">
                        $50k – $100k
                      </option>
                      <option value="$100k+" className="bg-neutral-950 text-white">
                        $100k+
                      </option>
                      <option value="Not sure yet" className="bg-neutral-950 text-white">
                        Not sure yet
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-anbu-gold/60 transition-colors" />
                  </div>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Timeline</span>
                  <div className="relative">
                    <select
                      name="timeline"
                      value={formState.timeline}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 pr-10 text-sm text-white/95 transition-all duration-200 hover:border-white/25 focus:border-anbu-gold focus:outline-none focus:ring-2 focus:ring-anbu-gold/40 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] cursor-pointer"
                      aria-label="Select project timeline"
                    >
                      <option value="" className="bg-neutral-950 text-white/60">
                        Select timeline
                      </option>
                      <option value="ASAP (1-2 weeks)" className="bg-neutral-950 text-white">
                        ASAP (1-2 weeks)
                      </option>
                      <option value="1 month" className="bg-neutral-950 text-white">
                        1 month
                      </option>
                      <option value="2-3 months" className="bg-neutral-950 text-white">
                        2-3 months
                      </option>
                      <option value="3-6 months" className="bg-neutral-950 text-white">
                        3-6 months
                      </option>
                      <option value="6+ months" className="bg-neutral-950 text-white">
                        6+ months
                      </option>
                      <option value="Just exploring" className="bg-neutral-950 text-white">
                        Just exploring
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-anbu-gold/60 transition-colors" />
                  </div>
                </label>
              </div>

              {/* Project Type */}
              <label className="flex flex-col gap-1">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Project Type</span>
                <div className="relative">
                  <select
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 pr-10 text-sm text-white/95 transition-all duration-200 hover:border-white/25 focus:border-anbu-gold focus:outline-none focus:ring-2 focus:ring-anbu-gold/40 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] cursor-pointer"
                    aria-label="Select project type"
                  >
                    <option value="" className="bg-neutral-950 text-white/60">
                      Select project type
                    </option>
                    <option value="Web Application" className="bg-neutral-950 text-white">
                      Web Application
                    </option>
                    <option value="Mobile App" className="bg-neutral-950 text-white">
                      Mobile App
                    </option>
                    <option value="E-commerce Platform" className="bg-neutral-950 text-white">
                      E-commerce Platform
                    </option>
                    <option value="Marketing Website" className="bg-neutral-950 text-white">
                      Marketing Website
                    </option>
                    <option value="SaaS Product" className="bg-neutral-950 text-white">
                      SaaS Product
                    </option>
                    <option value="API Integration" className="bg-neutral-950 text-white">
                      API Integration
                    </option>
                    <option value="Marketing/Video Production" className="bg-neutral-950 text-white">
                      Marketing/Video Production
                    </option>
                    <option value="Documentation Portal" className="bg-neutral-950 text-white">
                      Documentation Portal
                    </option>
                    <option value="Other" className="bg-neutral-950 text-white">
                      Other
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-anbu-gold/60 transition-colors" />
                </div>
              </label>

              {/* Project Description */}
              <label className="flex flex-col gap-1 pt-0.5">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  What do you need?
                </span>
                <textarea
                  name="projectFocus"
                  value={formState.projectFocus}
                  onChange={handleInputChange}
                  placeholder="Example: Build a customer portal, connect Stripe to our database, create an analytics dashboard."
                  rows={3}
                  className="rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 text-sm text-white/95 placeholder:text-white/40 transition-all duration-200 hover:border-white/25 focus:border-anbu-gold focus:outline-none focus:ring-2 focus:ring-anbu-gold/40 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] resize-none leading-relaxed"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-0.5">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFC347] to-[#FFAF45] px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-black transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_18px_rgba(255,215,0,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending…' : 'Send brief'}
                <ArrowUpRight className="h-3 w-3" />
              </motion.button>
              <p className="text-xs text-white/30 text-center sm:text-left">
                I respond within 24 hours.
              </p>
            </div>
          </motion.form>

          <div className="flex flex-col gap-3">
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <WobbleCard
                  containerClassName={`h-full transition-all duration-500 text-left ${option.hoverGlow}`}
                  className="h-full"
                >
                  <motion.a
                    href={option.href}
                    target={option.href.startsWith('http') ? '_blank' : undefined}
                    rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group relative block h-full p-5 sm:p-6 md:p-7"
                    onClick={option.href.startsWith('mailto') ? handleContactClick : undefined}
                    whileHover={{ scale: 1.015 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex items-center gap-2.5">
                      <motion.span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${option.iconGradient} text-white shadow-md`}
                        whileHover={{ rotate: 6, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <option.icon className="h-5 w-5" />
                      </motion.span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white/70 group-hover:text-anbu-gold transition-colors duration-300 truncate">
                          {option.label}
                        </div>
                        <p className="text-xs text-white/30 leading-tight mt-0.5">{option.description}</p>
                        <div className="flex items-center gap-1 mt-1 text-[10px] uppercase tracking-[0.1em]">
                          <span className="text-anbu-gold/45">{option.title}</span>
                          <span className="text-white/15">•</span>
                          <span className="text-white/30">{option.shortDesc}</span>
                        </div>
                      </div>
                      <motion.div
                        className="opacity-30 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                        whileHover={{ x: 2 }}
                      >
                        <ArrowUpRight className="h-4 w-4 text-anbu-gold/70" />
                      </motion.div>
                    </div>
                  </motion.a>
                </WobbleCard>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="rounded-xl border border-white/6 bg-white/[0.015] p-4"
            >
              <ShimmerButton
                {...buttonVariants.cta}
                className={cn(
                  buttonVariants.cta.className,
                  'w-full justify-center px-3 py-1.5 text-xs sm:text-sm'
                )}
                onClick={() => {
                  handleContactClick()
                  if (typeof window !== 'undefined') {
                    window.open('mailto:contact@anbu.ai', '_blank')
                  }
                }}
              >
                <motion.span
                  className="flex items-center gap-1.5 text-black font-medium"
                  whileHover={{ gap: '8px' }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Direct email
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.span>
              </ShimmerButton>
              <p className="mt-1.5 text-xs text-white/30 text-center leading-relaxed">
                Prefer email? <span className="text-anbu-gold/60">contact@anbu.ai</span>
              </p>
            </motion.div>
          </div>
          </div>
        ) : (
          skeleton
        )}

        <Confetti isActive={showConfetti} />
      </Container>
    </GradualBlurSection>
  )
}
