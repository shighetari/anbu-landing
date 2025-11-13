"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Mail,
  MapPin,
  Sparkles,
} from "@/components/ui/lucide-safe"

import { WobbleCard } from "@/components/aceternity/wobble-card"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { buttonSizes } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

type ActionCard = {
  id: string
  title: string
  description: string
  accent: string
  icon: React.ComponentType<{ className?: string }>
  titleGradient: {
    from: string
    to: string
  }
  badgeGradient: {
    from: string
    to: string
  }
  buttonBackground: string
  buttonShimmer: string
  buttonTextClass: string
  footer?: React.ReactNode
  body?: React.ReactNode
}

const defaultEmail = siteConfig.contactEmail
const calendlyUrl = siteConfig.calLink
const hqLocation = "Englewood Cliffs, NJ"
const responsiveSm = buttonSizes.responsive.sm
const baseButtonClass = "text-xs font-semibold uppercase tracking-[0.24em] sm:text-[0.72rem]"

function FriendlyClock() {
  const [timestamp, setTimestamp] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const formatted = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York",
        timeZoneName: "short",
      }).format(timestamp),
    [timestamp],
  )

  return (
    <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
      {formatted}
    </span>
  )
}

export function ContactQuickActions() {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(defaultEmail)
      setCopied(true)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = defaultEmail
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
    }

    setTimeout(() => setCopied(false), 2200)
  }, [])

  const actions: ActionCard[] = [
    {
      id: "copy-email",
      title: "Copy our inbox",
      description: "Drop a note and we’ll reply before the next sprint planning.",
      accent: "from-emerald-500/10 to-emerald-400/5",
      icon: Mail,
      titleGradient: {
        from: "#34F5C5",
        to: "#7DFFB1",
      },
      badgeGradient: { from: "#34F5C5", to: "#7DFFB1" },
      buttonBackground: "linear-gradient(135deg, #34F5C5 0%, #7DFFB1 100%)",
      buttonShimmer: "#E8FFF6",
      buttonTextClass: "text-anbu-ink",
      body: (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          <Mail className="h-4 w-4 text-anbu-gold" />
          <span>{defaultEmail}</span>
        </div>
      ),
      footer: (
        <div className="flex flex-col gap-2">
          <ShimmerButton
            shimmerColor="#E8FFF6"
            shimmerDuration="2.4s"
            background="linear-gradient(135deg, #34F5C5 0%, #7DFFB1 100%)"
            borderRadius="999px"
            className={cn(
              baseButtonClass,
              responsiveSm,
            "text-anbu-ink shadow-[0_18px_45px_rgba(52,245,197,0.28)] hover:shadow-[0_24px_60px_rgba(52,245,197,0.35)] transition-shadow duration-300",
            )}
            onClick={handleCopy}
          >
            <span className="flex items-center gap-2">
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy Email
                </>
              )}
            </span>
          </ShimmerButton>
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-emerald-200/70"
              >
                Ready to paste — see you in the inbox.
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ),
    },
    {
      id: "book-call",
      title: "Jump on a call",
      description: "Choose a time that works for you. We bring the notes and a live preview.",
      accent: "from-blue-500/10 to-cyan-400/10",
      icon: CalendarDays,
      titleGradient: {
        from: "#60A5FF",
        to: "#38D9FF",
      },
      badgeGradient: { from: "#60A5FF", to: "#38D9FF" },
      buttonBackground: "linear-gradient(135deg, #60A5FF 0%, #38D9FF 100%)",
      buttonShimmer: "#E4F2FF",
      buttonTextClass: "text-anbu-ink",
      footer: (
        <ShimmerButton
          shimmerColor="#E4F2FF"
          shimmerDuration="2.2s"
          background="linear-gradient(135deg, #60A5FF 0%, #38D9FF 100%)"
          borderRadius="999px"
          className={cn(
            baseButtonClass,
            responsiveSm,
            "text-anbu-ink shadow-[0_18px_45px_rgba(96,165,255,0.28)] hover:shadow-[0_24px_60px_rgba(96,165,255,0.35)] transition-shadow duration-300",
          )}
          asChild
        >
          <Link href={calendlyUrl} target="_blank" rel="noopener noreferrer">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5" />
              Book Discovery
            </span>
          </Link>
        </ShimmerButton>
      ),
      body: (
        <div className="flex flex-col gap-2 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <Clock3 className="h-3.5 w-3.5 text-white/40" />
            <span>30-minute focused conversation</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-white/40" />
            <span>Design board + scope template included</span>
          </div>
        </div>
      ),
    },
    {
      id: "visit",
      title: "On-site collaboration",
      description: "We plan immersive working sessions for bigger pushes.",
      accent: "from-purple-500/10 to-fuchsia-500/10",
      icon: MapPin,
      titleGradient: {
        from: "#c084fc",
        to: "#fb7185",
      },
      badgeGradient: { from: "#C084FC", to: "#FB7185" },
      buttonBackground: "linear-gradient(135deg, #C084FC 0%, #FB7185 100%)",
      buttonShimmer: "#FFE3FF",
      buttonTextClass: "text-white",
      body: (
        <div className="flex flex-col gap-2 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-white/40" />
            <span>{hqLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-white/40" />
            <span>Agenda design, stakeholder logistics, and roadmap alignment.</span>
          </div>
        </div>
      ),
      footer: (
        <Link
          href="https://maps.google.com/?q=Englewood+Cliffs+NJ"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-anbu-gold transition-colors duration-300 hover:text-[#FFE4FA]"
        >
          <AnimatedGradientText colorFrom="#C084FC" colorTo="#FB7185" className="text-[0.72rem] uppercase tracking-[0.24em]">
            View on Maps
          </AnimatedGradientText>
          <Sparkles className="h-3 w-3 text-anbu-gold transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      ),
    },
  ]

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <WobbleCard
            key={action.id}
            containerClassName="relative border-white/12 bg-gradient-to-br from-white/[0.015] via-white/[0.02] to-white/[0.03] backdrop-blur-xl"
            className="flex h-full flex-col justify-between gap-6 p-6 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <AnimatedGradientText
                colorFrom={action.badgeGradient.from}
                colorTo={action.badgeGradient.to}
                className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-transparent sm:text-[0.72rem]"
              >
                {action.id.replace("-", " ")}
              </AnimatedGradientText>
              {action.id === "book-call" ? <FriendlyClock /> : null}
            </div>

            <div className="relative overflow-hidden">
              <div
                className={`absolute -inset-8 rounded-3xl bg-gradient-to-br ${action.accent} opacity-80 blur-3xl transition-opacity duration-500`}
              />
              <div className="relative z-10 flex flex-col gap-3">
                <div
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${action.badgeGradient.from}26, ${action.badgeGradient.to}12)`,
                  }}
                >
                  <Icon className="h-4 w-4 text-anbu-gold" />
                  <span className="capitalize text-white/80">{action.id.replace("-", " ")}</span>
                </div>
                <motion.h3
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <AnimatedGradientText
                    colorFrom={action.titleGradient.from}
                    colorTo={action.titleGradient.to}
                    className="text-sm font-semibold uppercase tracking-[0.3em] text-transparent sm:text-base"
                  >
                    {action.title}
                  </AnimatedGradientText>
                </motion.h3>
                <p className="text-[0.85rem] text-white/60 sm:text-sm">{action.description}</p>
              </div>
              <div className="relative mt-4">{action.body}</div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-[0.68rem] text-white/45 sm:text-[0.72rem]">
                Crafted for timeline calm
              </span>
              {action.footer}
            </div>
          </WobbleCard>
        )
      })}
    </div>
  )
}
