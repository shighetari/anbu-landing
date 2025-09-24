import HeroSection from '@/components/features/hero/HeroSection'
import ServicesSection from '@/components/features/services/ServicesSection'
import AboutSection from '@/components/features/about/AboutSection'
import ContactSection from '@/components/features/contact/ContactSection'
import { SectionDivider } from '@/components/ui/section-divider'

export default function Home() {
  return (
    <main className="relative flex flex-col items-center min-h-screen">
      <HeroSection />

      <div className="w-full py-12 sm:py-16 lg:py-20">
        <SectionDivider variant="gradient" />
      </div>

      <ServicesSection />

      <div className="w-full py-12 sm:py-16 lg:py-20">
        <SectionDivider variant="dots" />
      </div>

      <AboutSection />

      <div className="w-full py-12 sm:py-16 lg:py-20">
        <SectionDivider variant="gradient" />
      </div>

      <ContactSection />

      {/* Clear separator before footer */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-anbu-gold/20 to-transparent" />
      <div className="w-full py-16 sm:py-20 lg:py-24 bg-black" />
    </main>
  )
}
