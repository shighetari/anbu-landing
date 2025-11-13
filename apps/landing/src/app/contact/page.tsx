import type { Metadata } from "next"
import Link from "next/link"

import ContactSection from "@/components/features/contact/ContactSection"
import { ContactQuickActions } from "@/components/features/contact/ContactQuickActions"
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
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "@/components/ui/lucide-safe"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Connect with ANBU Solutions",
  description:
    "Start a conversation with the ANBU Solutions team. We respond within one business day to craft project plans, partner on strategy, and help teams ship ambitious product experiences.",
  openGraph: {
    title: "Connect with ANBU Solutions",
    description:
      "Get in touch with the ANBU Solutions team to accelerate product, design, and platform initiatives.",
    url: `${siteConfig.website}/contact`,
  },
}

const heroHighlights = [
  {
    icon: MessageSquare,
    metric: "<6h reply",
    title: "Clear next steps",
    description: "Expect a same-day response with a tailored plan you can take to stakeholders.",
    accent: { from: "#FFD16A", to: "#FF8C37" },
  },
  {
    icon: Users,
    metric: "One team",
    title: "Operators, not vendors",
    description: "Design, engineering, and product leads show up on every call to keep momentum.",
    accent: { from: "#60A5FF", to: "#38D9FF" },
  },
  {
    icon: ShieldCheck,
    metric: "Risk handled",
    title: "Enterprise ready",
    description: "Contracts, security reviews, and onboarding handled so you can focus on outcomes.",
    accent: { from: "#C084FC", to: "#FB7185" },
  },
]

export default function ContactPage() {
  const contactEmail = siteConfig.contactEmail
  const callLink = siteConfig.calLink
  const primaryButton = buttonVariants.primary
  const secondaryButton = buttonVariants.secondary

  return (
    <main className="relative min-h-screen bg-black text-anbu-marble">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.18),_transparent_55%)]" />
        <SparklesCore
          id="contact-hero-sparkles"
          className="pointer-events-none"
          particleDensity={18}
          minSize={0.25}
          maxSize={0.65}
        />
        <Container className="relative py-20 md:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center space-y-5 text-center">
            <AnimatedGradientText className="text-xs uppercase tracking-[0.35em] text-white/60">
              Let&apos;s build together
            </AnimatedGradientText>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
              Launch-ready product partners
            </h1>
            <p className="max-w-2xl text-base text-white/60 md:text-lg">
              The product team you can DM at 2am (and trust to deliver). Tell us what needs to ship, who relies on it,
              and the moments that matter. We&apos;ll architect the path, assemble the squad, and stay in the loop until
              value hits production.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ShimmerButton
                shimmerColor={primaryButton.shimmerColor}
                shimmerDuration={primaryButton.shimmerDuration}
                background={primaryButton.background}
                borderRadius={primaryButton.borderRadius}
                textColor={primaryButton.textColor}
                className={cn(
                  primaryButton.className,
                  "px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] md:px-10 md:py-4 md:text-sm",
                )}
                asChild
              >
                <Link href={`mailto:${contactEmail}`}>
                  <span className="flex items-center gap-2 text-anbu-ink">
                    <Sparkles className="h-4 w-4" />
                    Email the team
                  </span>
                </Link>
              </ShimmerButton>
              <ShimmerButton
                shimmerColor={secondaryButton.shimmerColor}
                shimmerDuration={secondaryButton.shimmerDuration}
                background={secondaryButton.background}
                borderRadius={secondaryButton.borderRadius}
                className={cn(
                  secondaryButton.className,
                  "px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] md:px-10 md:py-4 md:text-sm",
                )}
                asChild
              >
                <Link href={callLink} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2 text-anbu-ink">
                    <ArrowUpRight className="h-4 w-4" />
                    Book a call
                  </span>
                </Link>
              </ShimmerButton>
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:gap-6 md:grid-cols-3">
            {heroHighlights.map((item) => {
              const Icon = item.icon
              return (
                <WobbleCard
                  key={item.title}
                  containerClassName="border-white/12 bg-gradient-to-br from-white/[0.015] via-white/[0.02] to-white/[0.03] backdrop-blur-xl"
                  className="flex h-full flex-col gap-4 p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <AnimatedGradientText
                      colorFrom={item.accent.from}
                      colorTo={item.accent.to}
                      className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-transparent sm:text-[0.72rem]"
                    >
                      {item.metric}
                    </AnimatedGradientText>
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/30 shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${item.accent.from}24, ${item.accent.to}16)`,
                      }}
                    >
                      <Icon className="h-4 w-4 text-anbu-gold" />
                    </span>
                  </div>
                  <div className="space-y-2">
                    <AnimatedGradientText
                      colorFrom={item.accent.from}
                      colorTo={item.accent.to}
                      className="text-base font-semibold uppercase tracking-[0.28em] text-transparent sm:text-lg"
                    >
                      {item.title}
                    </AnimatedGradientText>
                    <p className="text-sm text-white/60">{item.description}</p>
                  </div>
                  <div className="mt-auto h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="text-[0.7rem] text-white/40 uppercase tracking-[0.28em]">
                    Built for busy teams
                  </span>
                </WobbleCard>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-[#050505]/95 py-16 md:py-20">
        <Container className="space-y-10">
          <div className="max-w-xl space-y-3">
            <AnimatedGradientText className="text-xs uppercase tracking-[0.35em] text-white/60">
              Quality of life extras
            </AnimatedGradientText>
            <h2 className="font-display text-3xl text-white md:text-4xl">Save time before we even meet</h2>
            <p className="text-sm text-white/60 md:text-base">
              Copy our direct inbox, grab a workshop slot, or align on on-site logistics. These shortcuts keep momentum
              flowing from the first touchpoint.
            </p>
          </div>
          <ContactQuickActions />
        </Container>
      </section>

      <section className="relative border-b border-white/10 py-16 md:py-20">
        <Container>
          <ShineBorder borderWidth={1.5} shineColor={["#FFD700", "#FF8A3C"]} className="rounded-[2rem] border-white/5">
            <div className="relative flex flex-col gap-12 overflow-hidden rounded-[2rem] bg-black/70 px-6 py-10 backdrop-blur-xl md:px-12 md:py-14">
              <SparklesCore
                id="contact-form-bg"
                className="pointer-events-none opacity-80"
                particleDensity={12}
                minSize={0.15}
                maxSize={0.45}
              />
              <div className="relative space-y-3 text-center md:text-left">
                <AnimatedGradientText className="text-xs uppercase tracking-[0.35em] text-white/50">
                  Tell us about the mission
                </AnimatedGradientText>
                <h2 className="font-display text-3xl text-white md:text-4xl">
                  Kick off your project with an actionable blueprint
                </h2>
                <p className="max-w-2xl text-sm text-white/60 md:text-base">
                  Fill out the form and we&apos;ll spin up an intake board, assign leads, and outline the first build
                  sprint. No generic autoresponders — you get a crafted response tailored to your timeline.
                </p>
              </div>
              <ContactSection />
            </div>
          </ShineBorder>
        </Container>
      </section>

      <section className="bg-black py-16 md:py-20">
        <Container className="flex flex-col items-center gap-5 text-center">
          <AnimatedGradientText className="text-xs uppercase tracking-[0.35em] text-white/60">
            Explore while we prep next steps
          </AnimatedGradientText>
          <div className="space-y-3">
            <h2 className="font-display text-3xl text-white md:text-4xl">Visit the Docs Hub</h2>
            <p className="mx-auto max-w-xl text-sm text-white/60 md:text-base">
              Browse live documentation, playbooks, and implementation guides in one place while we craft your tailored
              response.
            </p>
          </div>
          <ShimmerButton
            shimmerColor={primaryButton.shimmerColor}
            shimmerDuration={primaryButton.shimmerDuration}
            background={primaryButton.background}
            borderRadius={primaryButton.borderRadius}
            textColor={primaryButton.textColor}
            className={cn(
              primaryButton.className,
              "px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] md:px-10 md:py-4 md:text-sm",
            )}
            asChild
          >
            <Link href="/docs-hub">
              <span className="flex items-center gap-2 text-anbu-ink">
                <ArrowUpRight className="h-4 w-4" />
                Open Docs Hub
              </span>
            </Link>
          </ShimmerButton>
        </Container>
      </section>
    </main>
  )
}
