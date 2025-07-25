import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { CyberThreatShowcase } from '@/components/CyberThreatShowcase'
import { SkillsMatrix } from '@/components/SkillsMatrix'
import { EmergingTechShowcase } from '@/components/EmergingTechShowcase'

import { FloatingIconsBackground } from '@/components/AnimatedIcons'
import { CTASection } from '@/components/CTASection'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ThemeSelector } from '@/components/ThemeSelector'
import { ClientOnly } from '@/components/ClientOnly'
import { GlobalCTA } from '@/components/GlobalCTA'
import { SocialSharing, HireMeShare } from '@/components/SocialSharing'
import { GlobalHomeSEO } from '@/components/GlobalMarketSEO'

export default function HomePage() {
  return (
    <>
      {/* Global Market SEO Optimization */}
      <GlobalHomeSEO />

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

      {/* Global CTA for Client Acquisition */}
      <GlobalCTA variant="primary" position="bottom" showStats={true} />

      {/* Social Sharing for Viral Growth */}
      <div className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <HireMeShare />
        </div>
      </div>

      {/* Floating Social Share */}
      <SocialSharing variant="floating" />

      {/* Dynamic Theme Selector */}
      <ClientOnly>
        <ThemeSelector />
      </ClientOnly>
      </div>
    </>
  )
}