import { HeroContent } from '@/components/HeroContent'
import { AboutSection } from '@/components/AboutSection'
import { ServicesSection } from '@/components/ServicesSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { Stats } from '@/components/Stats'
import { FAQ } from '@/components/FAQ'
import { ScrollReveal } from '@/components/ScrollReveal'

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <HeroContent />
      </section>

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ServicesSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <HowItWorksSection />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <Stats />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <FAQ />
      </ScrollReveal>
    </>
  )
}
