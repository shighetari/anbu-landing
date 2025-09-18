import HeroSection from '@/components/features/hero/HeroSection'
import ServicesSection from '@/components/features/services/ServicesSection'
import AboutSection from '@/components/features/about/AboutSection'
import ContactSection from '@/components/features/contact/ContactSection'

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
