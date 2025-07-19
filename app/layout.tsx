import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import '../styles/dynamic-themes.css'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DynamicLayoutSystem } from '@/components/DynamicLayoutSystem'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
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
        <DynamicLayoutSystem>
          <Navigation />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
        </DynamicLayoutSystem>
      </body>
    </html>
  )
}