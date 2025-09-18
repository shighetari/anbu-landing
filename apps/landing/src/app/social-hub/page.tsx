import { Metadata } from 'next'

import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { GradualBlurSection } from '@/components/reactbits/gradual-blur-section'
import { LogoLoop } from '@/components/reactbits/logo-loop'

export const metadata: Metadata = {
  title: 'ANBU Studio Films — Social Hub',
  description:
    'Preview the high-production explainers, walkthroughs, and product marketing assets ANBU crafts for clients.',
}

const socialPlatforms = [
  { render: <span className="text-sm font-semibold text-white/80">YouTube</span>, alt: 'YouTube' },
  { render: <span className="text-sm font-semibold text-white/80">TikTok</span>, alt: 'TikTok' },
  { render: <span className="text-sm font-semibold text-white/80">Instagram</span>, alt: 'Instagram' },
  { render: <span className="text-sm font-semibold text-white/80">LinkedIn</span>, alt: 'LinkedIn' },
  { render: <span className="text-sm font-semibold text-white/80">Vimeo</span>, alt: 'Vimeo' },
]

export default function SocialHubPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-anbu-marble">
      <GradualBlurSection className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-4 py-28 sm:px-6 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#050505] to-black" />
        <AnimatedGradientText
          className="text-sm uppercase tracking-[0.45em] text-anbu-gold"
          colorFrom="#FFED4E"
          colorTo="#FF9D2E"
        >
          Social showcase
        </AnimatedGradientText>
        <h1 className="text-center font-display text-4xl font-bold text-white sm:text-5xl">
          Broadcast-ready storytelling for each platform
        </h1>
        <p className="max-w-2xl text-center text-base text-white/70 sm:text-lg">
          We combine technical credibility with cinematic polish—tailoring edits for every channel your marketing team
          activates, from long-form explainers to snackable reels.
        </p>

        <HeroVideoDialog
          videoSrc="https://www.youtube.com/embed/JkSxvdglLRs"
          thumbnailSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
          thumbnailAlt="ANBU marketing reel preview"
          className="w-full"
          animationStyle="top-in-bottom-out"
        />

        <LogoLoop logos={socialPlatforms} speed={24} className="w-full" />

        <section className="grid gap-6 text-left sm:grid-cols-2 w-full">
          <article className="rounded-2xl border border-white/10 bg-black/70 p-6">
            <h2 className="font-semibold text-white">Campaign Blueprints</h2>
            <p className="mt-2 text-sm text-white/60">
              Modular scripts, storyboard systems, and templated edit packs help client teams stay on-message across
              product updates, investor communications, and hiring campaigns.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-black/70 p-6">
            <h2 className="font-semibold text-white">Performance Analytics</h2>
            <p className="mt-2 text-sm text-white/60">
              Each drop ships with ready-to-import metrics dashboards so you can iterate narratives with confidence.
            </p>
          </article>
        </section>
      </GradualBlurSection>
    </main>
  )
}
