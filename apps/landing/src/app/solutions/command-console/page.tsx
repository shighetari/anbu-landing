import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Command Console — Executive Delivery Control',
  description:
    'Monitor every squad, unlock playbooks, and trigger deployment rituals from a single real-time console engineered for ANBU partners.',
};

const featureCards = [
  {
    icon: Gauge,
    title: 'Live delivery telemetry',
    body: 'Watch pods, burndown, QA status, and blockers stream into one surface with alerting baked in.',
    badge: 'Realtime data',
  },
  {
    icon: Workflow,
    title: 'Automated runbooks',
    body: 'Spin up launch, hypercare, and incident workflows with preassigned owners and linked docs.',
    badge: 'Preset rituals',
  },
  {
    icon: ShieldCheck,
    title: 'Guardrails & approvals',
    body: 'Enforce review gates, capture decisions, and notify stakeholders before anything reaches prod.',
    badge: 'Risk controls',
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
    description:
      'Consolidate deploy health, incident noise, and approvals into one prioritized feed.',
  },
  {
    name: 'Decide',
    description:
      'Trigger playbooks or route tasks with single-click actions tied to the right squad.',
  },
  {
    name: 'Act',
    description:
      'Broadcast updates, log decisions, and push fixes or comms instantly across channels.',
  },
];

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
          <div className="max-w-4xl space-y-4">
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              The mission control for every ANBU engagement
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/65 sm:text-lg">
              Orchestrate pods, approvals, and automations from a single pane of glass. The Command
              Console keeps leadership, delivery, and operations aligned without hopping across
              tools.
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
                {[
                  {
                    id: 'apps',
                    title: 'Build Custom Apps',
                    href: '/solutions',
                    icon: Rocket,
                    description: 'Web & mobile applications',
                    gradient: 'from-pink-500/20 to-pink-600/20',
                    iconBg: 'bg-gradient-to-br from-pink-500 to-pink-600',
                  },
                  {
                    id: 'studio',
                    title: 'Marketing Studio',
                    href: '/solutions/marketing-studio',
                    icon: Video,
                    description: 'Cinematic content & campaigns',
                    gradient: 'from-cyan-500/20 to-blue-500/20',
                    iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-500',
                  },
                  {
                    id: 'docs',
                    title: 'Documentation Hub',
                    href: '/docs-hub',
                    icon: BookOpen,
                    description: 'Knowledge & playbooks',
                    gradient: 'from-orange-500/20 to-amber-500/20',
                    iconBg: 'bg-gradient-to-br from-orange-400 to-amber-500',
                  },
                  {
                    id: 'integrations',
                    title: 'Integrations',
                    href: '/solutions#integrations',
                    icon: Cpu,
                    description: 'Connect your tools',
                    gradient: 'from-emerald-500/20 to-green-600/20',
                    iconBg: 'bg-gradient-to-br from-emerald-400 to-green-500',
                  },
                  {
                    id: 'teams',
                    title: 'Dedicated Teams',
                    href: '/solutions#pods',
                    icon: Users,
                    description: 'On-demand developers',
                    gradient: 'from-red-500/20 to-pink-600/20',
                    iconBg: 'bg-gradient-to-br from-red-400 to-pink-600',
                  },
                  {
                    id: 'contact',
                    title: 'Get Started',
                    href: '/contact',
                    icon: Sparkles,
                    description: 'Begin your project',
                    gradient: 'from-purple-500/20 to-indigo-600/20',
                    iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600',
                  },
                ].map((item, index) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`group relative block transition-all duration-300 hover:scale-[1.02]`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <CardSpotlight
                      className="h-full"
                      color="#FFD700"
                      radius={350}
                    >
                      <div className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${item.gradient}`} />
                      <div className="relative z-10 flex flex-col gap-3 h-full">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${item.iconBg} text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                          <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div className="flex-grow space-y-1.5">
                          <h3 style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)' }} className="font-semibold leading-snug text-white/95 transition-colors duration-300 group-hover:text-anbu-gold line-clamp-2 tracking-wide">
                            {item.title}
                          </h3>
                          <p style={{ fontSize: 'clamp(0.65rem, 2vw, 0.75rem)' }} className="leading-tight text-white/55 transition-colors duration-300 group-hover:text-white/70 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 pt-1 text-[0.6rem] sm:text-[0.65rem] lg:text-xs font-semibold text-anbu-gold/70 transition-colors duration-300 group-hover:text-anbu-gold mt-auto">
                          <span>Explore</span>
                          <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              Operational clarity
            </AnimatedGradientText>
            <h2 className="font-display text-3xl text-white md:text-4xl">
              Everything you need to steer delivery
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-white/60 md:text-base">
              Each module inside the Command Console is wired for transparency, accountability, and
              pace. No more digging through Slack to understand what ships next.
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
                    Telemetry stack
                  </AnimatedGradientText>
                  <h2 className="font-display text-3xl text-white md:text-4xl">
                    See every signal without context switching
                  </h2>
                  <p className="text-sm text-white/60 md:text-base">
                    Tie Jira, Linear, PagerDuty, and notion docs into a single normalized feed. AI
                    summaries keep execs informed while engineers drill into the detail they need.
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
            We set up the Command Console alongside kickoff so your team inherits rituals,
            automations, and reporting from day one. Connect with us to see your data inside the
            workspace.
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
