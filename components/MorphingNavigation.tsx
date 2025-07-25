'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code, User, Mail, Brain, BookOpen, Target, FileText, Zap, Terminal, Cpu, Palette, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'
import { LayoutVariant } from './AdvancedMorphingLayout'

const navigation = [
  { name: 'About', href: '/about', icon: User },
  { name: 'Emerging Tech', href: '/emerging-tech', icon: Zap },
  { name: 'Philosophy', href: '/philosophy', icon: Brain },
  { name: 'Case Studies', href: '/case-studies', icon: Target },
  { name: 'Writings', href: '/writings', icon: BookOpen },
  { name: 'Resume', href: '/resume', icon: FileText },
  { name: 'Contact', href: '/contact', icon: Mail },
]

interface MorphingNavigationProps {
  currentTheme: ThemeVariant | null
  layoutVariant: LayoutVariant
}

export function MorphingNavigation({ currentTheme, layoutVariant }: MorphingNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Get theme-specific styling
  const getThemeStyles = () => {
    if (!currentTheme) return {
      bg: 'bg-white/90 backdrop-blur-md',
      text: 'text-gray-900',
      accent: 'text-blue-600',
      border: 'border-gray-200'
    }
    
    switch (currentTheme.category) {
      case 'cyberpunk':
        return {
          bg: 'bg-black/95 backdrop-blur-md',
          text: 'text-green-300',
          accent: 'text-green-400',
          border: 'border-green-500/30'
        }
      case 'minimalist':
        return {
          bg: 'bg-white/95 backdrop-blur-sm',
          text: 'text-gray-900',
          accent: 'text-gray-700',
          border: 'border-gray-100'
        }
      case 'organic':
        return {
          bg: 'bg-green-50/90 backdrop-blur-md',
          text: 'text-green-800',
          accent: 'text-green-600',
          border: 'border-green-200/50'
        }
      case 'retro':
        return {
          bg: 'bg-purple-900/90 backdrop-blur-md',
          text: 'text-pink-200',
          accent: 'text-pink-400',
          border: 'border-pink-500/30'
        }
      case 'futuristic':
        return {
          bg: 'bg-slate-900/90 backdrop-blur-md',
          text: 'text-blue-200',
          accent: 'text-blue-400',
          border: 'border-blue-500/30'
        }
      case 'artistic':
        return {
          bg: 'bg-purple-50/90 backdrop-blur-md',
          text: 'text-purple-800',
          accent: 'text-purple-600',
          border: 'border-purple-200/50'
        }
      default:
        return {
          bg: 'bg-white/90 backdrop-blur-md',
          text: 'text-gray-900',
          accent: 'text-blue-600',
          border: 'border-gray-200'
        }
    }
  }

  const styles = getThemeStyles()

  // Get logo icon based on theme
  const getLogoIcon = () => {
    switch (currentTheme?.category) {
      case 'cyberpunk': return Terminal
      case 'minimalist': return Code
      case 'organic': return Cpu
      case 'retro': return Palette
      case 'futuristic': return Cpu
      case 'artistic': return Palette
      default: return Code
    }
  }

  const LogoIcon = getLogoIcon()

  // Render based on layout variant
  const renderNavigation = () => {
    switch (layoutVariant) {
      case 'left-sidebar':
      case 'right-sidebar':
        return renderSidebarNav()
      case 'bottom-nav':
        return renderBottomNav()
      case 'floating-nav':
        return renderFloatingNav()
      case 'dropdown-nav':
        return renderDropdownNav()
      case 'split-nav':
        return renderSplitNav()
      default:
        return renderTopNav()
    }
  }

  const renderSidebarNav = () => (
    <motion.nav 
      className={`h-full ${styles.bg} ${styles.border} border-r flex flex-col`}
      layout
      transition={{ duration: 1 }}
    >
      {/* Logo */}
      <motion.div 
        className="p-6 border-b border-opacity-20"
        style={{ borderColor: currentTheme?.colors.primary }}
        layout
      >
        <Link href="/" className="flex items-center space-x-3">
          <LogoIcon className={`h-8 w-8 ${styles.accent}`} />
          <span className={`font-bold text-lg ${styles.text}`}>
            Polymathic
          </span>
        </Link>
      </motion.div>

      {/* Navigation Links */}
      <motion.div className="flex-1 p-4 space-y-2" layout>
        {navigation.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300',
                  isActive
                    ? `${styles.accent} bg-current bg-opacity-10 border border-current border-opacity-20`
                    : `${styles.text} hover:${styles.accent} hover:bg-current hover:bg-opacity-5`
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.nav>
  )

  const renderBottomNav = () => (
    <motion.nav 
      className={`w-full ${styles.bg} ${styles.border} border-t flex items-center justify-center px-4`}
      layout
      transition={{ duration: 1 }}
    >
      <div className="flex items-center space-x-6 max-w-4xl w-full justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <LogoIcon className={`h-6 w-6 ${styles.accent}`} />
          <span className={`font-bold ${styles.text} hidden sm:block`}>
            Polymathic
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center space-y-1 px-2 py-1 rounded transition-colors',
                  isActive ? styles.accent : `${styles.text} hover:${styles.accent}`
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs hidden sm:block">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )

  const renderFloatingNav = () => (
    <motion.nav 
      className={`${styles.bg} ${styles.border} border rounded-2xl shadow-2xl px-6 py-4`}
      layout
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <LogoIcon className={`h-6 w-6 ${styles.accent}`} />
          <span className={`font-bold ${styles.text}`}>Polymathic</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-1 px-3 py-2 rounded-lg transition-all',
                  isActive ? styles.accent : `${styles.text} hover:${styles.accent}`
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-lg ${styles.text} hover:${styles.accent}`}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </motion.nav>
  )

  const renderDropdownNav = () => (
    <motion.nav 
      className={`w-full ${styles.bg} ${styles.border} border-b`}
      layout
      transition={{ duration: 1 }}
    >
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <LogoIcon className={`h-8 w-8 ${styles.accent}`} />
            <span className={`font-bold text-xl ${styles.text}`}>Polymathic Coder</span>
          </Link>

          {/* Dropdown Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${styles.text} hover:${styles.accent} transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Menu</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2"
            >
              {navigation.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center space-x-2 p-3 rounded-lg transition-all',
                        isActive ? styles.accent : `${styles.text} hover:${styles.accent}`
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )

  const renderSplitNav = () => (
    <motion.nav 
      className={`w-full ${styles.bg} ${styles.border} border-b flex items-center justify-between px-6 py-4`}
      layout
      transition={{ duration: 1 }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <LogoIcon className={`h-6 w-6 ${styles.accent}`} />
        <span className={`font-bold ${styles.text}`}>Polymathic Coder</span>
      </Link>

      {/* Quick Actions */}
      <div className="flex items-center space-x-4">
        {navigation.slice(0, 3).map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-1 px-3 py-2 rounded-lg transition-all',
                isActive ? styles.accent : `${styles.text} hover:${styles.accent}`
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm hidden md:block">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )

  const renderTopNav = () => (
    <motion.nav 
      className={`fixed top-0 w-full ${styles.bg} ${styles.border} border-b z-50`}
      layout
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <LogoIcon className={`h-8 w-8 ${styles.accent}`} />
            <span className={`font-bold text-xl ${styles.text}`}>Polymathic Coder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive ? styles.accent : `${styles.text} hover:${styles.accent}`
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-3 rounded-md ${styles.text} hover:${styles.accent}`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${styles.bg} ${styles.border} border-b shadow-lg`}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center space-x-4 px-4 py-4 rounded-lg text-base font-medium transition-colors w-full',
                        isActive ? styles.accent : `${styles.text} hover:${styles.accent}`
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )

  return renderNavigation()
}
