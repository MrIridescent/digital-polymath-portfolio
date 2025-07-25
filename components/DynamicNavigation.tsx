'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code, User, Mail, Brain, BookOpen, Target, FileText, Zap, Terminal, Cpu, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'

const navigation = [
  { name: 'About', href: '/about', icon: User },
  { name: 'Emerging Tech', href: '/emerging-tech', icon: Zap },
  { name: 'Philosophy', href: '/philosophy', icon: Brain },
  { name: 'Case Studies', href: '/case-studies', icon: Target },
  { name: 'Writings', href: '/writings', icon: BookOpen },
  { name: 'Resume', href: '/resume', icon: FileText },
  { name: 'Contact', href: '/contact', icon: Mail },
]

interface DynamicNavigationProps {
  currentTheme: ThemeVariant | null
}

export function DynamicNavigation({ currentTheme }: DynamicNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Get theme-specific navigation style
  const getNavigationStyle = () => {
    if (!currentTheme) return 'default'
    
    switch (currentTheme.category) {
      case 'cyberpunk':
        return 'cyberpunk'
      case 'minimalist':
        return 'minimal'
      case 'organic':
        return 'organic'
      case 'retro':
        return 'retro'
      case 'futuristic':
        return 'futuristic'
      case 'artistic':
        return 'artistic'
      default:
        return 'default'
    }
  }

  const getNavigationClasses = () => {
    const style = getNavigationStyle()
    const baseClasses = 'fixed top-0 w-full z-50 transition-all duration-700'
    
    switch (style) {
      case 'cyberpunk':
        return `${baseClasses} bg-black/90 backdrop-blur-md border-b border-green-500/30 shadow-lg shadow-green-500/20`
      case 'minimal':
        return `${baseClasses} bg-white/95 backdrop-blur-sm border-b border-gray-100`
      case 'organic':
        return `${baseClasses} bg-gradient-to-r from-green-50/90 to-blue-50/90 backdrop-blur-md border-b border-green-200/50`
      case 'retro':
        return `${baseClasses} bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-md border-b border-pink-500/30`
      case 'futuristic':
        return `${baseClasses} bg-slate-900/90 backdrop-blur-md border-b border-blue-500/30 shadow-lg shadow-blue-500/20`
      case 'artistic':
        return `${baseClasses} bg-gradient-to-r from-purple-50/90 to-pink-50/90 backdrop-blur-md border-b border-purple-200/50`
      default:
        return `${baseClasses} bg-white/80 backdrop-blur-md border-b border-slate-200`
    }
  }

  const getLogoStyle = () => {
    const style = getNavigationStyle()
    
    switch (style) {
      case 'cyberpunk':
        return { icon: Terminal, color: 'text-green-400', text: 'text-green-400' }
      case 'minimal':
        return { icon: Code, color: 'text-gray-900', text: 'text-gray-900' }
      case 'organic':
        return { icon: Cpu, color: 'text-green-600', text: 'text-green-800' }
      case 'retro':
        return { icon: Palette, color: 'text-pink-400', text: 'text-pink-100' }
      case 'futuristic':
        return { icon: Cpu, color: 'text-blue-400', text: 'text-blue-100' }
      case 'artistic':
        return { icon: Palette, color: 'text-purple-600', text: 'text-purple-800' }
      default:
        return { icon: Code, color: 'text-primary-600', text: 'text-slate-900' }
    }
  }

  const getLinkStyle = (isActive: boolean) => {
    const style = getNavigationStyle()
    const baseClasses = 'flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300'
    
    switch (style) {
      case 'cyberpunk':
        return cn(baseClasses, 
          isActive 
            ? 'text-green-400 bg-green-500/20 border border-green-500/30 shadow-lg shadow-green-500/20' 
            : 'text-green-300 hover:text-green-400 hover:bg-green-500/10 hover:border hover:border-green-500/20'
        )
      case 'minimal':
        return cn(baseClasses,
          isActive
            ? 'text-gray-900 bg-gray-100'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        )
      case 'organic':
        return cn(baseClasses,
          isActive
            ? 'text-green-800 bg-green-100 border border-green-200'
            : 'text-green-700 hover:text-green-800 hover:bg-green-50'
        )
      case 'retro':
        return cn(baseClasses,
          isActive
            ? 'text-pink-100 bg-pink-500/20 border border-pink-400/30'
            : 'text-pink-200 hover:text-pink-100 hover:bg-pink-500/10'
        )
      case 'futuristic':
        return cn(baseClasses,
          isActive
            ? 'text-blue-100 bg-blue-500/20 border border-blue-400/30'
            : 'text-blue-200 hover:text-blue-100 hover:bg-blue-500/10'
        )
      case 'artistic':
        return cn(baseClasses,
          isActive
            ? 'text-purple-800 bg-purple-100 border border-purple-200'
            : 'text-purple-700 hover:text-purple-800 hover:bg-purple-50'
        )
      default:
        return cn(baseClasses,
          isActive
            ? 'text-primary-600 bg-primary-50'
            : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
        )
    }
  }

  const logoStyle = getLogoStyle()
  const LogoIcon = logoStyle.icon

  return (
    <nav className={getNavigationClasses()}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogoIcon className={`h-8 w-8 ${logoStyle.color}`} />
            </motion.div>
            <span className={`font-bold text-xl ${logoStyle.text} group-hover:scale-105 transition-transform`}>
              Polymathic Coder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={getLinkStyle(isActive)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-3 rounded-md transition-colors ${
              getNavigationStyle() === 'cyberpunk' 
                ? 'text-green-300 hover:text-green-400 hover:bg-green-500/10' 
                : getNavigationStyle() === 'retro'
                ? 'text-pink-200 hover:text-pink-100 hover:bg-pink-500/10'
                : getNavigationStyle() === 'futuristic'
                ? 'text-blue-200 hover:text-blue-100 hover:bg-blue-500/10'
                : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${
              getNavigationStyle() === 'cyberpunk' 
                ? 'bg-black/95 border-b border-green-500/30' 
                : getNavigationStyle() === 'retro'
                ? 'bg-purple-900/95 border-b border-pink-500/30'
                : getNavigationStyle() === 'futuristic'
                ? 'bg-slate-900/95 border-b border-blue-500/30'
                : 'bg-white/95 border-b border-slate-200'
            } shadow-lg`}
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
                      className={`${getLinkStyle(isActive)} w-full justify-start space-x-4 px-4 py-4 text-base`}
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
    </nav>
  )
}
