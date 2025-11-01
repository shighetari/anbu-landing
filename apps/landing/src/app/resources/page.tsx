import type { Metadata } from "next"
import Link from "next/link"

import { ResourceShowcase } from "@/components/features/resources/ResourceShowcase"
import { SparklesCore } from "@/components/aceternity/sparkles"
import { WobbleCard } from "@/components/aceternity/wobble-card"
import Container from "@/components/ui/Container"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { ShineBorder } from "@/components/ui/shine-border"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import {
  ArrowUpRight,
  BarChart2,
  BookMarked,
  Sparkles,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Resource Library — ANBU Solutions",
  description:
    "Explore ANBU Solutions resources: documentation, playbooks, community moments, and strategic guides that help teams ship faster.",
  openGraph: {
    title: "ANBU Resource Library",
    description:
      "Discover curated documentation, launch playbooks, and partner enablement material from ANBU Solutions.",
    url: "https://anbu.ai/resources",
  },
}

const snapshotCards = [
  {
    icon: BookMarked,
    title: "Live documentation",
    caption: "Versioned, searchable, and updated alongside every release.",
    metric: "47 collections",
  },
  {
    icon: BarChart2,
    title: "Playbooks in motion",
    caption: "Battle-tested templates for shipping with clarity and control.",
    metric: "13 frameworks",
  },
  {
    icon: Sparkles,
    title: "Co-build sessions",
    caption: "Monthly touchpoints with our hybrid squads and partner teams.",
    metric: "Monthly cadence",
  },
]

export default function ResourcesPage() {
  const primaryButton = buttonVariants.primary
  const secondaryButton = buttonVariants.secondary

  return (
    <main className="relative min-h-screen bg-black text-anbu-marble">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.15),_transparent_60%)]" />
        <SparklesCore
          id="resources-hero-sparkles"
          className="pointer-events-none"
          particleDensity={16}
          minSize={0.2}
          maxSize={0.6}
        />
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl space-y-5 text-center md:text-left">
            <AnimatedGradientText className="text-xs uppercase tracking-[0.35em] text-white/60">
              Resource library
            </AnimatedGradientText>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
              Everything we use to ship premium product experiences
            </h1>
            <p className="max-w-2xl text-base text-white/60 md:text-lg">
              Dive into the same documentation, playbooks, and strategic tooling we rely on with partners. Updated in
              lockstep with production, crafted for clarity, and ready to bookmark.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/docs-hub">
                <ShimmerButton
                  shimmerColor={primaryButton.shimmerColor}
                  shimmerDuration={primaryButton.shimmerDuration}
                  background={primaryButton.background}
                  borderRadius={primaryButton.borderRadius}
                  className={cn(
                    primaryButton.className,
                    "px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] md:px-10 md:py-4 md:text-sm",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4" />
                    Launch docs hub
                  </span>
                </ShimmerButton>
              </Link>
              <Link href="#resource-atlas">
                <ShimmerButton
                  shimmerColor={secondaryButton.shimmerColor}
                  shimmerDuration={secondaryButton.shimmerDuration}
                  background={secondaryButton.background}
                  borderRadius={secondaryButton.borderRadius}
                  className={cn(
                    secondaryButton.className,
                    "px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] md:px-10 md:py-4 md:text-sm",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Browse sampler
                  </span>
                </ShimmerButton>
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {snapshotCards.map((card) => {
              const Icon = card.icon
              return (
                <WobbleCard
                  key={card.title}
                  containerClassName="border-white/15 bg-white/[0.02] backdrop-blur-xl"
                  className="flex h-full flex-col gap-4 p-6"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-anbu-gold" />
                    <span className="text-xs uppercase tracking-[0.3em] text-white/35">{card.metric}</span>
                  </div>
                  <div className="space-y-2 text-white/90">
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-sm text-white/60">{card.caption}</p>
                  </div>
                </WobbleCard>
              )
            })}
          </div>
        </Container>
      </section>

      <section id="resource-atlas" className="border-b border-white/10 bg-[#070707]/95 py-16 md:py-20">
        <Container className="space-y-10">
          <div className="max-w-xl space-y-3">
            <AnimatedGradientText className="text-xs uppercase tracking-[0.35em] text-white/60">
              Curated resource atlas
            </AnimatedGradientText>
            <h2 className="font-display text-3xl text-white md:text-4xl">
              Filter by the outcome you&apos;re targeting
            </h2>
            <p className="text-sm text-white/60 md:text-base">
              Toggle through documentation, playbooks, community access, and strategic guides. Each card links directly
              into Docs Hub so you can jump straight to the answers.
            </p>
          </div>
          <ResourceShowcase />
        </Container>
      </section>

      <section className="relative py-16 md:py-20">
        <Container>
          <ShineBorder borderWidth={1.5} shineColor={["#FFD700", "#FF8A3C"]} className="rounded-[2rem] border-white/5">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-black/75 via-black/60 to-black/75 px-6 py-10 backdrop-blur-xl md:px-12 md:py-14">
              <SparklesCore
                id="resources-dive-deeper"
                className="pointer-events-none opacity-80"
                particleDensity={12}
                minSize={0.15}
                maxSize={0.45}
              />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
                <div className="space-y-4">
                  <AnimatedGradientText className="text-xs uppercase tracking-[0.35em] text-white/55">
                    Never out of date
                  </AnimatedGradientText>
                  <h2 className="font-display text-3xl text-white md:text-4xl">
                    Subscribe to change logs and early release notes
                  </h2>
                  <p className="text-sm text-white/60 md:text-base">
                    We publish a fresh changelog every sprint with highlights, upcoming experiments, and long-term bets.
                    You can self-serve or have updates dropped into your preferred channel.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href="/docs-hub?focus=changelog">
                      <ShimmerButton
                        shimmerColor={primaryButton.shimmerColor}
                        shimmerDuration={primaryButton.shimmerDuration}
                        background={primaryButton.background}
                        borderRadius={primaryButton.borderRadius}
                        className={cn(
                          primaryButton.className,
                          "px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] md:px-9 md:py-4 md:text-sm",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4" />
                          Open changelog
                        </span>
                      </ShimmerButton>
                    </Link>
                    <Link
                      href="/contact?topic=docs-hub"
                      className="text-xs uppercase tracking-[0.3em] text-white/45 transition-colors duration-300 hover:text-white/80 md:text-sm"
                    >
                      Request tailored updates
                    </Link>
                  </div>
                </div>
                <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.015] p-6 text-sm text-white/60">
                  <p className="text-sm text-white/55">
                    <span className="text-anbu-gold">What you get:</span> curated doc bundles, live office hours,
                    async video recaps, and early prototypes you can test-drive with your team.
                  </p>
                  <ul className="space-y-2 text-sm text-white/50">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-anbu-gold" />
                      <span>Opt-in by topic — design systems, platform, growth, or partner tooling.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-anbu-gold" />
                      <span>Downloadable sprint briefs with supporting Loom walkthroughs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-anbu-gold" />
                      <span>Redlines on your roadmap with implementation notes from our leads.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ShineBorder>
        </Container>
      </section>
    </main>
  )
}
