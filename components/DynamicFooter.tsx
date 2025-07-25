'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, Code, Terminal, Palette } from 'lucide-react'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'

interface DynamicFooterProps {
  currentTheme: ThemeVariant | null
}

export function DynamicFooter({ currentTheme }: DynamicFooterProps) {
  const getFooterStyle = () => {
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

  const getFooterClasses = () => {
    const style = getFooterStyle()
    const baseClasses = 'w-full py-8 px-4 sm:px-6 lg:px-8 transition-all duration-700'
    
    switch (style) {
      case 'cyberpunk':
        return `${baseClasses} bg-black/90 border-t border-green-500/30 text-green-300`
      case 'minimal':
        return `${baseClasses} bg-white/95 border-t border-gray-100 text-gray-600`
      case 'organic':
        return `${baseClasses} bg-gradient-to-r from-green-50/90 to-blue-50/90 border-t border-green-200/50 text-green-700`
      case 'retro':
        return `${baseClasses} bg-gradient-to-r from-purple-900/90 to-pink-900/90 border-t border-pink-500/30 text-pink-200`
      case 'futuristic':
        return `${baseClasses} bg-slate-900/90 border-t border-blue-500/30 text-blue-200`
      case 'artistic':
        return `${baseClasses} bg-gradient-to-r from-purple-50/90 to-pink-50/90 border-t border-purple-200/50 text-purple-700`
      default:
        return `${baseClasses} bg-white/80 border-t border-slate-200 text-slate-600`
    }
  }

  const getIconColor = () => {
    const style = getFooterStyle()
    
    switch (style) {
      case 'cyberpunk':
        return 'text-green-400 hover:text-green-300'
      case 'minimal':
        return 'text-gray-500 hover:text-gray-700'
      case 'organic':
        return 'text-green-600 hover:text-green-800'
      case 'retro':
        return 'text-pink-400 hover:text-pink-300'
      case 'futuristic':
        return 'text-blue-400 hover:text-blue-300'
      case 'artistic':
        return 'text-purple-600 hover:text-purple-800'
      default:
        return 'text-slate-500 hover:text-primary-600'
    }
  }

  const getAccentIcon = () => {
    const style = getFooterStyle()
    
    switch (style) {
      case 'cyberpunk':
        return Terminal
      case 'minimal':
        return Code
      case 'organic':
        return Heart
      case 'retro':
        return Palette
      case 'futuristic':
        return Code
      case 'artistic':
        return Palette
      default:
        return Heart
    }
  }

  const AccentIcon = getAccentIcon()

  return (
    <footer className={getFooterClasses()}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span>© 2025 Polymathic Coder. All rights reserved.</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <AccentIcon className="h-4 w-4" />
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${getIconColor()} transition-colors`}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${getIconColor()} transition-colors`}
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="mailto:contact@example.com"
              className={`${getIconColor()} transition-colors`}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="h-5 w-5" />
            </motion.a>
          </motion.div>

          {/* Theme indicator */}
          {currentTheme && (
            <motion.div 
              className="text-xs opacity-70"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Theme: {currentTheme.name}
            </motion.div>
          )}
        </div>
      </div>
    </footer>
  )
}
