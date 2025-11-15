'use client';

import Link from 'next/link';
import Image from 'next/image';

import Container from '@/components/ui/Container';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { ShineBorder } from '@/components/ui/shine-border';
import { WobbleCard } from '@/components/aceternity/wobble-card';
import { SparklesCore } from '@/components/aceternity/sparkles';
import { Meteors } from '@/components/aceternity/meteors';
import { NumberTicker } from '@/components/ui/number-ticker';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { CardSpotlight } from '@/components/aceternity/card-spotlight';
import { BorderBeam } from '@/components/ui/border-beam';
import { siteConfig } from '@/lib/site-config';
import {
  ArrowUpRight,
  Gauge,
  ShieldCheck,
  Workflow,
  Rocket,
  Video,
  BookOpen,
  Cpu,
  Users,
  Sparkles,
} from '@/components/ui/lucide-safe';

const featureCards = [
  {
    icon: Gauge,
    title: 'Live status',
    body: 'Pods, QA, and blockers update in seconds so no one wonders where things stand.',
    badge: 'Live feed',
  },
  {
    icon: Workflow,
    title: 'One-click steps',
    body: 'Launch, fix, or escalate using tiny guided checklists everyone understands.',
    badge: 'Easy rituals',
  },
  {
    icon: ShieldCheck,
    title: 'Built-in guardrails',
    body: 'Approvals and decisions sit next to the work so releases stay safe.',
    badge: 'Safe changes',
  },
];

const telemetry = [
  { label: 'Active pods', value: 6, suffix: '' },
  { label: 'Automation rules', value: 42, suffix: '+' },
  { label: 'Signals monitored', value: 180, suffix: '+' },
  { label: 'Mean response', value: 7, suffix: 'm' },
];

const playbookStages = [
  {
    name: 'Sense',
    description: 'Every alert, deadline, or ask lands in one calm queue.',
  },
  {
    name: 'Decide',
    description: 'Assign the right pod and trigger the checklist with a tap.',
  },
  {
    name: 'Act',
    description: 'Updates, notes, and sign-offs broadcast automatically.',
  },
];

const navigationCards = [
  {
    id: 'apps',
    label: 'Apps',
    title: 'Custom builds',
    href: '/solutions',
    icon: Rocket,
    description: 'Launch-ready web and mobile products.',
    gradient: 'from-pink-500/20 to-pink-600/20',
    iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
  },
  {
    id: 'studio',
    label: 'Studio',
    title: 'Marketing media',
    href: '/solutions/marketing-studio',
    icon: Video,
    description: 'Video, campaigns, and launch kits.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-500',
  },
  {
    id: 'docs',
    label: 'Docs',
    title: 'Knowledge hub',
    href: '/docs-hub',
    icon: BookOpen,
    description: 'Playbooks and resources to share.',
    gradient: 'from-orange-500/20 to-amber-500/20',
    iconBg: 'bg-gradient-to-br from-orange-400 to-amber-500',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    title: 'Connect tools',
    href: '/solutions#integrations',
    icon: Cpu,
    description: 'Wire up data, auth, and automation.',
    gradient: 'from-emerald-500/20 to-green-600/20',
    iconBg: 'bg-gradient-to-br from-emerald-400 to-green-500',
  },
  {
    id: 'teams',
    label: 'Pods',
    title: 'Dedicated team',
    href: '/solutions#pods',
    icon: Users,
    description: 'Flexible engineers on call.',
    gradient: 'from-red-500/20 to-pink-600/20',
    iconBg: 'bg-gradient-to-br from-red-400 to-pink-600',
  },
  {
    id: 'contact',
    label: 'Start',
    title: 'Talk to us',
    href: '/contact',
    icon: Sparkles,
    description: 'Share your scope in a minute.',
    gradient: 'from-purple-500/20 to-indigo-600/20',
    iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600',
  },
] as const;

export default function CommandConsolePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-anbu-marble">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.18),_transparent_55%)]" />
        <SparklesCore
          id="command-console-hero"
          className="pointer-events-none opacity-70"
          particleDensity={16}
          minSize={0.2}
          maxSize={0.6}
        />
        <Container className="relative flex flex-col items-center gap-8 py-16 text-center lg:py-24">
          <AnimatedGradientText className="text-xs uppercase tracking-[0.35em] text-white/60">
            Command Console
          </AnimatedGradientText>
          <div className="max-w-3xl space-y-3">
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Your project mission control
            </h1>
            <p className="mx-auto text-base text-white/70 sm:text-lg">
              Track pods, handoffs, and approvals in one calm view—no extra tabs, no jargon.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 py-16 md:py-20">
        <Container className="space-y-12">
          {/* Featured Video */}
          <div className="w-full">
            <div className="mb-8 space-y-3 text-center">
              <AnimatedGradientText className="text-xs uppercase tracking-[0.3em] text-white/55">
                Live orchestration demo
              </AnimatedGradientText>
              <h2 className="font-display text-2xl text-white md:text-3xl">
                See the console in action
              </h2>
            </div>
            <ShineBorder
              borderWidth={1.5}
              shineColor={['#FFD700', '#FF8A3C', '#FFED4E']}
              className="rounded-[2rem] border-white/5 shadow-[0_35px_120px_rgba(0,0,0,0.65)]"
            >
              <div className="relative aspect-video overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-black/80 via-black/70 to-black/60">
                <video
                  className="hidden h-full w-full object-cover motion-safe:block"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/anbu_hero.png"
                  aria-label="Command Console live orchestration preview"
                >
                  <source src="/Create_a_marketing_202509100024_evwzi.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <Image
                  src="/anbu_hero.png"
                  alt="Command Console preview still"
                  width={1920}
                  height={1080}
                  className="block h-full w-full object-cover motion-safe:hidden"
                  priority={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 text-[0.6rem] uppercase tracking-[0.35em] text-white/75">
                  <span className="rounded-full border border-white/20 bg-black/60 px-4 py-2 backdrop-blur">
                    Command Console
                  </span>
                  <span className="rounded-full border border-white/20 bg-black/60 px-4 py-2 backdrop-blur">
                    Live Sequence
                  </span>
                </div>
              </div>
            </ShineBorder>
          </div>

          {/* Navigation Grid */}
          <div className="w-full">
            <div className="mb-8 space-y-3 text-center">
              <AnimatedGradientText className="text-xs uppercase tracking-[0.3em] text-white/55">
                Explore ANBU
              </AnimatedGradientText>
              <h2 className="font-display text-2xl text-white md:text-3xl">
                Navigate our solutions
              </h2>
            </div>
            <NeonGradientCard
              neonColors={{ firstColor: '#FFD700', secondColor: '#FFA500' }}
              borderSize={2}
              borderRadius={16}
              contentClassName="p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {navigationCards.map((item, index) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    aria-label={`Navigate to ${item.title}`}
                    className="group relative block transition-all duration-300 hover:scale-[1.02]"
                  >
                    <CardSpotlight className="h-full" color="#FFD700" radius={350}>
                      <div
                        className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${item.gradient}`}
                      />
                      <div className="relative z-10 flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-left sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.35em] text-white/55 sm:text-[0.6rem]">
                            {item.label}
                          </p>
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg text-white transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11 ${item.iconBg}`}
                          >
                            <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <h3 className="command-console-nav-title text-balance font-semibold text-white transition-colors duration-300 group-hover:text-anbu-gold">
                            {item.title}
                          </h3>
                          <p className="command-console-nav-description text-sm text-white/65 transition-colors duration-300 group-hover:text-white/80">
                            {item.description}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-anbu-gold/75 transition-colors duration-300 group-hover:text-anbu-gold sm:text-[0.65rem]">
                          <span>Open</span>
                          <ArrowUpRight className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                      <BorderBeam size={200} duration={12} delay={index * 1} />
                    </CardSpotlight>
                  </Link>
                ))}
              </div>
            </NeonGradientCard>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 py-16 md:py-20">
        <Container className="space-y-10">
          <div className="space-y-3 text-center">
            <AnimatedGradientText className="text-xs uppercase tracking-[0.3em] text-white/55">
              Why teams use it
            </AnimatedGradientText>
            <h2 className="font-display text-3xl text-white md:text-4xl">
              Clarity without extra meetings
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-white/60 md:text-base">
              Everyone can see what is shipping, who owns it, and what is blocking progress in plain
              language.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <WobbleCard
                key={feature.title}
                containerClassName="border-white/10 bg-white/[0.02] backdrop-blur-xl"
                className="flex h-full flex-col gap-4 p-6"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/35">
                  <span>{feature.badge}</span>
                  <feature.icon className="h-5 w-5 text-anbu-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{feature.body}</p>
                </div>
              </WobbleCard>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-[#050505] py-16 md:py-20">
        <Container>
          <ShineBorder
            borderWidth={1.5}
            shineColor={['#FFD700', '#FF8A3C']}
            className="rounded-[2rem] border-white/5"
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-black/80 to-black/60 px-6 py-10 md:px-12 md:py-14">
              <SparklesCore
                id="command-console-telemetry"
                className="pointer-events-none opacity-60"
                particleDensity={10}
                minSize={0.15}
                maxSize={0.45}
              />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
                <div className="space-y-4">
                  <AnimatedGradientText className="text-xs uppercase tracking-[0.35em] text-white/55">
                    Signals at a glance
                  </AnimatedGradientText>
                  <h2 className="font-display text-3xl text-white md:text-4xl">
                    Every tool, one window
                  </h2>
                  <p className="text-sm text-white/60 md:text-base">
                    Jira, Linear, PagerDuty, docs, and chat updates plug into a single feed so leaders
                    and makers see the same truth.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {telemetry.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left"
                      >
                        <div className="text-3xl font-semibold text-white">
                          <NumberTicker value={item.value} />
                          {item.suffix}
                        </div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                  {playbookStages.map((stage) => (
                    <div
                      key={stage.name}
                      className="space-y-2 border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="text-[10px] uppercase tracking-[0.35em] text-anbu-gold/70">
                        {stage.name}
                      </p>
                      <p className="text-sm text-white/65">{stage.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ShineBorder>
        </Container>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20">
        <Container className="relative space-y-6 text-center">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <Meteors number={16} className="opacity-40" />
          </div>
          <AnimatedGradientText className="text-xs uppercase tracking-[0.3em] text-white/55">
            Ready when you are
          </AnimatedGradientText>
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Bring the console into your next sprint
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-white/60 md:text-base">
            We drop the console in during kickoff, connect your tools, and let you see your own data
            inside the workspace immediately.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ShimmerButton
              shimmerColor="#FFD700"
              shimmerDuration="2s"
              background="linear-gradient(110deg, #FFD700 0%, #FFED4E 45%, #FFD700 100%)"
              borderRadius="0.75rem"
              textColor="var(--anbu-ink, #0B0500)"
              className="px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-anbu-ink"
              asChild
            >
              <Link href={`mailto:${siteConfig.contactEmail}?subject=Command Console Inquiry`}>
                <span className="flex items-center gap-2 text-anbu-ink">Request access</span>
              </Link>
            </ShimmerButton>
            <Link
              href="/solutions"
              className="text-xs uppercase tracking-[0.3em] text-white/45 transition-colors duration-300 hover:text-white/80"
            >
              Explore all solutions
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
