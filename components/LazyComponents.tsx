'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Ultra-fast loading fallbacks
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
  </div>
)

const LoadingCard = () => (
  <div className="animate-pulse">
    <div className="bg-slate-200 rounded-lg h-48 w-full"></div>
  </div>
)

const LoadingSection = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
    <div className="h-32 bg-slate-200 rounded"></div>
  </div>
)

// Dynamically imported components for ultra-fast loading
export const LazyHeroSection = dynamic(
  () => import('./HeroSection'),
  {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Digital Polymath...</p>
        </div>
      </div>
    ),
    ssr: true, // Enable SSR for hero section
  }
)

export const LazyCyberThreatShowcase = dynamic(
  () => import('./CyberThreatShowcase'),
  {
    loading: () => <LoadingSection />,
    ssr: true, // Enable SSR for critical content
  }
)

export const LazyAboutSection = dynamic(
  () => import('./AboutSection'),
  {
    loading: () => <LoadingSection />,
    ssr: true,
  }
)

export const LazySkillsMatrix = dynamic(
  () => import('./SkillsMatrix'),
  {
    loading: () => <LoadingCard />,
    ssr: false, // Client-side only for animations
  }
)

export const LazyProjectsSection = dynamic(
  () => import('./ProjectsSection'),
  {
    loading: () => <LoadingSection />,
    ssr: false, // Load after initial render
  }
)

export const LazyContactSection = dynamic(
  () => import('./ContactSection'),
  {
    loading: () => <LoadingSection />,
    ssr: false, // Load after initial render
  }
)

export const LazyParticleBackground = dynamic(
  () => import('./ParticleBackground'),
  {
    loading: () => null,
    ssr: false, // Client-side only for performance
  }
)

export const LazyFloatingElements = dynamic(
  () => import('./FloatingElements'),
  {
    loading: () => null,
    ssr: false, // Client-side only
  }
)

// Wrapper component for lazy loading with Suspense
export const LazyWrapper = ({ 
  children, 
  fallback = <LoadingSpinner /> 
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
)
