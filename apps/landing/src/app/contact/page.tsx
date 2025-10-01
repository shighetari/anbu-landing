import Link from 'next/link'
import { ArrowLeft, MessageSquare } from 'lucide-react'

import Container from '@/components/ui/Container'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BlurFadeText } from '@/components/magicui/blur-fade-text'
import ContactSection from '@/components/features/contact/ContactSection'

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black pt-24">
      <Container size="lg" className="relative flex flex-col gap-6 px-4 sm:px-6 lg:px-8 pb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:border-anbu-gold/40 hover:text-anbu-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Back to overview
        </Link>

        <div className="flex flex-col items-start gap-4 text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-anbu-gold/30 bg-anbu-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-anbu-gold">
            <MessageSquare className="h-3.5 w-3.5" /> Engage
          </span>
          <AnimatedGradientText
            colorFrom="#FFE680"
            colorTo="#FF9A3C"
            speed={1.1}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-display"
          >
            Share your brief, and we will orchestrate the first move
          </AnimatedGradientText>
          <BlurFadeText className="max-w-2xl text-sm sm:text-base text-white/70">
            Every engagement begins with clarity. Tell us about targets, timelines, and the systems you already run.
            We will guide you through the same playbooks that power our launch rooms.
          </BlurFadeText>
        </div>
      </Container>

      <ContactSection />
    </div>
  )
}

