import HeroSection from '@/components/features/hero/HeroSection'
import ServicesSection from '@/components/features/services/ServicesSection'
import AboutSection from '@/components/features/about/AboutSection'

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
    </main>
  )
}
