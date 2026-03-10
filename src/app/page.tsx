import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeatureCards } from '@/components/landing/FeatureCards'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Testimonials } from '@/components/landing/Testimonials'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { AnimatedBackground } from '@/components/landing/AnimatedBackground'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0F]">
      <AnimatedBackground />
      <SiteHeader />

      <main className="flex-1">
        <HeroSection />
        <FeatureCards />
        <HowItWorks />
        <Testimonials />
        <FinalCTA />
      </main>

      <SiteFooter />
    </div>
  )
}
