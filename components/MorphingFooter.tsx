'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, Code, Terminal, Palette } from 'lucide-react'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'

interface MorphingFooterProps {
  currentTheme: ThemeVariant | null
}

export function MorphingFooter({ currentTheme }: MorphingFooterProps) {
  const getThemeStyles = () => {
    if (!currentTheme) return {
      bg: 'bg-white/90 backdrop-blur-md',
      text: 'text-gray-600',
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
          text: 'text-gray-600',
          accent: 'text-gray-700',
          border: 'border-gray-100'
        }
      case 'organic':
        return {
          bg: 'bg-green-50/90 backdrop-blur-md',
          text: 'text-green-700',
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
          text: 'text-purple-700',
          accent: 'text-purple-600',
          border: 'border-purple-200/50'
        }
      default:
        return {
          bg: 'bg-white/90 backdrop-blur-md',
          text: 'text-gray-600',
          accent: 'text-blue-600',
          border: 'border-gray-200'
        }
    }
  }

  const getAccentIcon = () => {
    switch (currentTheme?.category) {
      case 'cyberpunk': return Terminal
      case 'minimalist': return Code
      case 'organic': return Heart
      case 'retro': return Palette
      case 'futuristic': return Code
      case 'artistic': return Palette
      default: return Heart
    }
  }

  const styles = getThemeStyles()
  const AccentIcon = getAccentIcon()

  return (
    <motion.footer 
      className={`w-full ${styles.bg} ${styles.border} border-t py-8 px-4 sm:px-6 lg:px-8`}
      layout
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <motion.div 
            className={`flex items-center space-x-2 ${styles.text}`}
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
              className={`${styles.text} hover:${styles.accent} transition-colors`}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.text} hover:${styles.accent} transition-colors`}
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="mailto:contact@example.com"
              className={`${styles.text} hover:${styles.accent} transition-colors`}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="h-5 w-5" />
            </motion.a>
          </motion.div>

          {/* Theme indicator */}
          {currentTheme && (
            <motion.div 
              className={`text-xs opacity-70 ${styles.text}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Theme: {currentTheme.name}
            </motion.div>
          )}
        </div>
      </div>
    </motion.footer>
  )
}
