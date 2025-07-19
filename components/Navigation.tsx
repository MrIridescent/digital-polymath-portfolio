'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, Code, User, Mail, Brain, BookOpen, Target, FileText, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { KineticContainer, KineticText } from './KineticSystem'

const navigation = [
  { name: 'About', href: '/about', icon: User },
  { name: 'Emerging Tech', href: '/emerging-tech', icon: Zap },
  { name: 'Philosophy', href: '/philosophy', icon: Brain },
  { name: 'Case Studies', href: '/case-studies', icon: Target },
  { name: 'Writings', href: '/writings', icon: BookOpen },
  { name: 'Resume', href: '/resume', icon: FileText },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-primary-600" />
            <span className="font-bold text-xl text-slate-900">Polymathic Coder</span>
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
                    'flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  )}
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
                    'flex items-center space-x-4 px-4 py-4 rounded-lg text-base font-medium transition-colors mobile-touch-target',
                    isActive
                      ? 'text-primary-600 bg-primary-50 border border-primary-200'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="mobile-text-scale">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </nav>
  )
}