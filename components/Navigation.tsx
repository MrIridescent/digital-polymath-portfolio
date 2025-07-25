'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, Code, User, Mail, Brain, BookOpen, Target, FileText, Zap, Quote, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { KineticContainer, KineticText } from './KineticSystem'

interface NavigationItem {
  name: string
  href: string
  icon: any
  description: string
}

const navigation: NavigationItem[] = [
  { name: 'About', href: '/about', icon: User, description: 'Polymathic journey & Multiple Intelligences' },
  { name: 'Statistics', href: '/statistics', icon: BarChart3, description: 'Impact metrics & client success stories' },
  { name: 'Resume', href: '/resume', icon: FileText, description: 'Da Vinci-inspired with downloads' },
  { name: 'Emerging Tech', href: '/emerging-tech', icon: Zap, description: 'AI innovations & future tech' },
  { name: 'Philosophy', href: '/philosophy', icon: Brain, description: 'Da Vincian principles & Digital Polymat' },
  { name: 'Quotes', href: '/quotes', icon: Quote, description: 'Wisdom collection with insights' },
  { name: 'Case Studies', href: '/case-studies', icon: Target, description: 'Technical project showcases' },
  { name: 'Writings', href: '/writings', icon: BookOpen, description: 'Thought leadership content' },
  { name: 'Contact', href: '/contact', icon: Mail, description: 'Multiple connection opportunities' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="w-full max-w-none px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
            <span className="font-bold text-lg sm:text-xl text-slate-900 whitespace-nowrap">Mr. Iridescent</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group',
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  )}
                  title={item.description}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button - Enhanced touch target */}
          <button
            data-testid="mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-md text-slate-600 hover:text-primary-600 hover:bg-slate-50 mobile-touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-b border-slate-200 shadow-lg"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-4 py-4 rounded-lg text-base font-medium transition-colors mobile-touch-target',
                    isActive
                      ? 'text-primary-600 bg-primary-50 border border-primary-200'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <span className="mobile-text-scale">{item.name}</span>
                      <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </nav>
  )
}