import { Suspense } from 'react'
import {
  LazyHeroSection,
  LazyCyberThreatShowcase,
  LazyAboutSection,
  LazySkillsMatrix,
  LazyWrapper
} from '@/components/LazyComponents'
import dynamic from 'next/dynamic'
import { EmergingTechShowcase } from '@/components/EmergingTechShowcase'

// Ultra-fast dynamic imports for non-critical components
const LazyFloatingIconsBackground = dynamic(
  () => import('@/components/AnimatedIcons').then(mod => ({ default: mod.FloatingIconsBackground })),
  { ssr: false }
)

const LazyCTASection = dynamic(
  () => import('@/components/CTASection').then(mod => ({ default: mod.CTASection })),
  { ssr: false }
)

const LazyNewsletterSignup = dynamic(
  () => import('@/components/NewsletterSignup').then(mod => ({ default: mod.NewsletterSignup })),
  { ssr: false }
)

export default function HomePage() {
  return (
    <div className="pt-16 relative">
      {/* Background animations - load after critical content */}
      <LazyFloatingIconsBackground />

      {/* Critical above-the-fold content - SSR enabled */}
      <LazyWrapper>
        <LazyHeroSection />
      </LazyWrapper>

      {/* Important content - SSR enabled */}
      <LazyWrapper>
        <LazyAboutSection />
      </LazyWrapper>

      {/* Cyber threat showcase - SSR enabled for SEO */}
      <LazyWrapper>
        <LazyCyberThreatShowcase />
      </LazyWrapper>

      {/* Emerging Technologies - Mobile-first showcase */}
      <EmergingTechShowcase variant="compact" showQuotes={true} />

      {/* Interactive content - client-side for performance */}
      <Suspense fallback={
        <div className="animate-pulse bg-slate-200 h-96 mx-4 rounded-lg"></div>
      }>
        <LazySkillsMatrix />
      </Suspense>

      {/* Non-critical content - load after interaction */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="animate-pulse bg-slate-300 h-32 rounded-lg"></div>
          }>
            <LazyNewsletterSignup />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={
        <div className="animate-pulse bg-slate-200 h-48 mx-4 rounded-lg"></div>
      }>
        <LazyCTASection />
      </Suspense>
    </div>
  )
}