import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { CyberThreatShowcase } from '@/components/CyberThreatShowcase'
import { SkillsMatrix } from '@/components/SkillsMatrix'
import { EmergingTechShowcase } from '@/components/EmergingTechShowcase'

import { FloatingIconsBackground } from '@/components/AnimatedIcons'
import { CTASection } from '@/components/CTASection'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export default function HomePage() {
  return (
    <div className="pt-16 relative">
      {/* Background animations - load after critical content */}
      <FloatingIconsBackground />

      {/* Critical above-the-fold content */}
      <HeroSection />

      {/* Important content */}
      <AboutSection />

      {/* Cyber threat showcase */}
      <CyberThreatShowcase />

      {/* Emerging Technologies - Mobile-first showcase */}
      <EmergingTechShowcase variant="compact" showQuotes={true} />

      {/* Interactive content */}
      <SkillsMatrix />

      {/* Non-critical content - load after interaction */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </div>

      <CTASection />
    </div>
  )
}