"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "@/components/ui/lucide-safe"
import { useEffect, useId, useRef } from "react"

import { ShinyText } from "@/components/magicui/shiny-text"
import { NumberTicker } from "@/components/ui/number-ticker"
import { cn } from "@/lib/utils"

interface FeatureDetail {
  title: string
  icon: React.ElementType
  tagline: string
  description: string
  benefits: string[]
  metrics?: {
    value: number
    label: string
    suffix?: string
  }[]
  useCases: string[]
  accentColor: string
}

interface FeatureModalProps {
  isOpen: boolean
  onClose: () => void
  feature: FeatureDetail
}

export function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const Icon = feature.icon
  const headingId = useId()
  const descriptionId = `${headingId}-description`
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  const handleTrapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !modalRef.current) {
      return
    }

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) {
      event.preventDefault()
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else if (document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className={cn(
              "relative w-full max-w-3xl max-h-[92vh] overflow-y-auto",
              "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950",
              "border border-white/10 rounded-2xl shadow-2xl",
              "backdrop-blur-xl",
              "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20"
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            aria-describedby={descriptionId}
            ref={modalRef}
            onKeyDown={handleTrapFocus}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect */}
            <div
              className="absolute -inset-0.5 rounded-2xl opacity-30 blur-xl"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${feature.accentColor}40, transparent 70%)`
              }}
            />

            <div className="relative flex flex-col">
              {/* Sticky close bar */}
              <div className="sticky top-0 z-20 flex justify-end p-4 sm:p-5 md:p-6 bg-gradient-to-b from-black/85 via-black/45 to-transparent backdrop-blur-xl">
                <button
                  type="button"
                  onClick={onClose}
                  ref={closeButtonRef}
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-full",
                    "bg-white/12 hover:bg-white/20 active:scale-[0.97]",
                    "border border-white/15 hover:border-white/30",
                    "shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
                    "transition-all duration-200 ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-anbu-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  )}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="relative mt-2 space-y-6 px-6 pb-6 sm:mt-3 sm:px-8 sm:pb-8 md:mt-4 md:px-10 md:pb-10">
              {/* Header */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative"
                  initial={{ rotate: -10, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    className="absolute inset-0 blur-2xl opacity-40"
                    style={{ backgroundColor: feature.accentColor }}
                  />
                  <div
                    className="relative p-4 rounded-2xl border"
                    style={{
                      borderColor: `${feature.accentColor}40`,
                      backgroundColor: `${feature.accentColor}10`
                    }}
                  >
                    <Icon
                      className="h-8 w-8 sm:h-10 sm:w-10"
                      style={{ color: feature.accentColor }}
                    />
                  </div>
                </motion.div>

                <div className="flex-1">
                  <motion.h2
                    className={cn(
                      "text-2xl sm:text-3xl md:text-4xl font-bold",
                      "bg-gradient-to-r from-white via-white/90 to-white/80",
                      "bg-clip-text text-transparent"
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    id={headingId}
                  >
                    {feature.title}
                  </motion.h2>
                </div>
              </div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span style={{ color: feature.accentColor }}>
                  <ShinyText
                    className="text-base sm:text-lg md:text-xl font-semibold"
                    speed={5}
                  >
                    {feature.tagline}
                  </ShinyText>
                </span>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-sm sm:text-base text-white/70 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                id={descriptionId}
              >
                {feature.description}
              </motion.p>

              {/* Metrics (if provided) */}
              {feature.metrics && feature.metrics.length > 0 && (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {feature.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="text-2xl sm:text-3xl font-bold" style={{ color: feature.accentColor }}>
                        <NumberTicker value={metric.value} />
                        {metric.suffix && <span className="text-xl">{metric.suffix}</span>}
                      </div>
                      <div className="text-xs sm:text-sm text-white/60 mt-1">{metric.label}</div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Benefits */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white">Key Benefits</h3>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-sm sm:text-base text-white/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <div
                        className="p-1 rounded-full mt-0.5 shrink-0"
                        style={{ backgroundColor: `${feature.accentColor}20` }}
                      >
                        <Check className="h-4 w-4" style={{ color: feature.accentColor }} />
                      </div>
                      <span className="leading-relaxed">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Use Cases */}
              <motion.div
                className="space-y-3 pt-4 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white">Perfect For</h3>
                <div className="flex flex-wrap gap-2">
                  {feature.useCases.map((useCase, index) => (
                    <motion.span
                      key={index}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs sm:text-sm",
                        "bg-white/5 border border-white/10",
                        "hover:border-white/30 transition-colors duration-300",
                        "text-white/90"
                      )}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {useCase}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  className={cn(
                    "w-full py-4 rounded-full font-semibold",
                    "bg-gradient-to-r from-anbu-gold via-anbu-gold-accent to-anbu-gold",
                    "text-anbu-ink text-sm sm:text-base",
                    "shadow-lg hover:shadow-2xl",
                    "transition-all duration-300",
                    "hover:scale-[1.02]"
                  )}
                  style={{
                    boxShadow: `0 10px 40px ${feature.accentColor}30`
                  }}
                  onClick={() => {
                    // Navigate to contact or relevant page
                    window.location.href = '#contact'
                    onClose()
                  }}
                >
                  Get Started with {feature.title}
                </button>
              </motion.div>
            </div>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
