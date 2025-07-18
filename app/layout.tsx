import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports for non-critical components
const LazyNavigation = dynamic(() => import('@/components/Navigation'), {
  ssr: true, // Keep navigation for SEO
})

const LazyFooter = dynamic(() => import('@/components/Footer'), {
  ssr: false, // Footer can load after
})

const LazyPerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), {
  ssr: false, // Client-side only
})
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Polymathic Coder - Code in any language. Think in every discipline.',
    template: '%s | Polymathic Coder'
  },
  description: 'Digital Polymath and Senior Full Stack Developer specializing in interdisciplinary problem-solving. Creating holistic solutions at the intersection of technology, design, and systems thinking.',
  keywords: ['Polymathic Coder', 'Digital Polymath', 'Systems Thinking', 'Full-stack Developer', 'Interdisciplinary', 'Polyglot Developer', 'Software Architecture', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Java'],
  authors: [{ name: 'Polymathic Coder' }],
  creator: 'Polymathic Coder',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://polymathiccoder.dev',
    title: 'Polymathic Coder - Code in any language. Think in every discipline.',
    description: 'Digital Polymath and Senior Full Stack Developer specializing in interdisciplinary problem-solving. Creating holistic solutions at the intersection of technology, design, and systems thinking.',
    siteName: 'Polymathic Coder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polymathic Coder - Code in any language. Think in every discipline.',
    description: 'Digital Polymath and Senior Full Stack Developer specializing in interdisciplinary problem-solving.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={
          <div className="h-16 bg-white border-b border-slate-200 animate-pulse">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
              <div className="h-8 w-32 bg-slate-200 rounded"></div>
              <div className="flex space-x-4">
                <div className="h-6 w-16 bg-slate-200 rounded"></div>
                <div className="h-6 w-16 bg-slate-200 rounded"></div>
                <div className="h-6 w-16 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        }>
          <LazyNavigation />
        </Suspense>

        <main className="min-h-screen">
          {children}
        </main>

        <Suspense fallback={
          <div className="h-32 bg-slate-100 animate-pulse">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="h-4 bg-slate-200 rounded w-1/4 mx-auto"></div>
            </div>
          </div>
        }>
          <LazyFooter />
        </Suspense>

        {/* Performance monitoring in development */}
        {process.env.NODE_ENV === 'development' && (
          <LazyPerformanceMonitor />
        )}
      </body>
    </html>
  )
}