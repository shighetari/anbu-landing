"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  LifeBuoy,
  Lightbulb,
  Users,
} from "@/components/ui/lucide-safe"

import { WobbleCard } from "@/components/aceternity/wobble-card"
import { cn } from "@/lib/utils"

type ResourceItem = {
  title: string
  description: string
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  tone: string
}

type ResourceGroup = {
  headline: string
  blurb: string
  resources: ResourceItem[]
}

const tabs: Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: "docs", label: "Documentation", icon: BookOpen },
  { id: "playbooks", label: "Playbooks", icon: Lightbulb },
  { id: "community", label: "Community", icon: Users },
  { id: "strategy", label: "Strategy", icon: Compass },
]

const resourceMap: Record<string, ResourceGroup> = {
  docs: {
    headline: "Docs Hub",
    blurb: "Every workflow, template, and integration pattern documented and kept in lockstep with production.",
    resources: [
      {
        title: "Product architecture",
        description: "Understand how the ANBU platform snaps together, from authentication to observability.",
        href: "/docs-hub?focus=architecture-overview",
        label: "Deep dive",
        icon: BookOpen,
        tone: "from-cyan-500/15 to-indigo-500/10",
      },
      {
        title: "Design tokens",
        description: "Reference our live design system with color semantics, spacing rules, and responsive rhythm.",
        href: "/docs-hub?focus=design-tokens",
        label: "Design system",
        icon: Lightbulb,
        tone: "from-amber-500/15 to-pink-500/10",
      },
      {
        title: "API launch checklist",
        description: "Ship safely with our default launch runbook that covers testing, migrations, and comms.",
        href: "/docs-hub?focus=api-launch",
        label: "Runbook",
        icon: LifeBuoy,
        tone: "from-emerald-500/15 to-teal-500/10",
      },
    ],
  },
  playbooks: {
    headline: "Acceleration playbooks",
    blurb: "Lightweight frameworks we use to unblock teams sprinting toward delivery.",
    resources: [
      {
        title: "Hypercare week",
        description: "Structure the critical first 7 days after launch with a split squad and clear escalation.",
        href: "/docs-hub?focus=hypercare",
        label: "Template",
        icon: Compass,
        tone: "from-purple-500/15 to-fuchsia-500/10",
      },
      {
        title: "Quality shader",
        description: "Automate UI QA with visual diffing and alerts tied into your release workflow.",
        href: "/docs-hub?focus=quality-automation",
        label: "Automation",
        icon: Lightbulb,
        tone: "from-blue-500/15 to-sky-500/10",
      },
      {
        title: "Stakeholder sync kit",
        description: "Align execs and ICs in 25 minutes with agenda prompts and integrated dashboards.",
        href: "/docs-hub?focus=stakeholder-sync",
        label: "Collaboration",
        icon: Users,
        tone: "from-rose-500/15 to-orange-500/10",
      },
    ],
  },
  community: {
    headline: "Community orbit",
    blurb: "Plug into how we share progress, gather feedback, and co-build with partners.",
    resources: [
      {
        title: "Product release nights",
        description: "Monthly livestream where we demo upcoming features and answer roadmap questions.",
        href: "/docs-hub?focus=release-nights",
        label: "Event",
        icon: Users,
        tone: "from-green-500/15 to-lime-500/10",
      },
      {
        title: "Office hours",
        description: "Grab a 20-minute slot with design or engineering leadership for rapid feedback.",
        href: "/docs-hub?focus=office-hours",
        label: "Support",
        icon: LifeBuoy,
        tone: "from-cyan-500/15 to-emerald-500/10",
      },
      {
        title: "Partner lounge",
        description: "Guided spaces for partner teams shipping integrations with ANBU tooling.",
        href: "/docs-hub?focus=partner-lounge",
        label: "Integrations",
        icon: Compass,
        tone: "from-indigo-500/15 to-blue-500/10",
      },
    ],
  },
  strategy: {
    headline: "Strategic insights",
    blurb: "Positioning, metrics, and vision artifacts to help you sell the future internally.",
    resources: [
      {
        title: "Roadmap narrative",
        description: "Translate product work into business milestones with a living story map.",
        href: "/docs-hub?focus=roadmap-narrative",
        label: "Narrative",
        icon: BookOpen,
        tone: "from-slate-500/15 to-slate-400/10",
      },
      {
        title: "North Star metrics",
        description: "Align teams around signals that predict adoption, retention, and expansion.",
        href: "/docs-hub?focus=north-star",
        label: "Metrics",
        icon: Lightbulb,
        tone: "from-amber-500/15 to-emerald-500/10",
      },
      {
        title: "Executive briefing kit",
        description: "Give leadership confidence with curated insights and prebuilt slide tracks.",
        href: "/docs-hub?focus=executive-briefing",
        label: "Toolkit",
        icon: ArrowUpRight,
        tone: "from-purple-500/15 to-indigo-500/10",
      },
    ],
  },
}

export function ResourceShowcase() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  const activeGroup = useMemo(() => resourceMap[activeTab], [activeTab])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-white/5 p-2 text-xs text-white/60">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "group relative flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300",
                isActive
                  ? "bg-anbu-gold/15 text-anbu-gold shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                  : "hover:bg-white/10 hover:text-white/80",
              )}
            >
              <Icon className={cn("h-3.5 w-3.5 transition-transform duration-300", isActive && "scale-110")} />
              <span className="uppercase tracking-[0.2em]">{tab.label}</span>
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full border border-anbu-gold/40"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
              className="text-2xl font-semibold text-white/90 md:text-3xl"
            >
              {activeGroup.headline}
            </motion.h3>
            <p className="max-w-2xl text-sm text-white/55 md:text-base">{activeGroup.blurb}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {activeGroup.resources.map((resource) => {
              const Icon = resource.icon
              return (
                <WobbleCard
                  key={resource.href}
                  containerClassName="group border-white/15 bg-gradient-to-br from-white/[0.02] to-white/[0.015] backdrop-blur-xl"
                  className="flex h-full flex-col justify-between gap-6 p-6"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.26em] text-white/35">
                    <span>{resource.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br p-5",
                      resource.tone,
                    )}
                  >
                    <div className="absolute -inset-14 bg-gradient-to-br from-white/5 to-transparent opacity-50 blur-3xl" />
                    <div className="relative z-10 flex flex-col gap-4 text-white/90">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
                        <Icon className="h-5 w-5 text-anbu-gold" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold">{resource.title}</h4>
                        <p className="text-sm text-white/60">{resource.description}</p>
                      </div>
                      <Link
                        href={resource.href}
                        className="inline-flex items-center gap-2 text-sm text-anbu-gold transition-colors duration-300 hover:text-anbu-gold/80"
                      >
                        Explore the docs
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </WobbleCard>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
