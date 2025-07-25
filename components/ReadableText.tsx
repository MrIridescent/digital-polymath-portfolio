'use client'

import { ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'

interface ReadableTextProps {
  children: ReactNode
  variant?: 'heading' | 'body' | 'caption' | 'display'
  className?: string
  currentTheme?: ThemeVariant | null
  centered?: boolean
}

export function ReadableText({
  children,
  variant = 'body',
  className = '',
  currentTheme,
  centered = false
}: ReadableTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Get theme-aware text styling for maximum readability
  const getTextStyles = () => {
    if (!currentTheme) return {
      text: 'text-gray-900',
      bg: 'bg-white/90',
      shadow: 'text-shadow-sm',
      backdrop: 'backdrop-blur-sm'
    }
    
    switch (currentTheme.category) {
      case 'cyberpunk':
        return {
          text: 'text-green-100',
          bg: 'bg-black/80',
          shadow: 'drop-shadow-[0_2px_4px_rgba(0,255,65,0.3)]',
          backdrop: 'backdrop-blur-md'
        }
      case 'minimalist':
        return {
          text: 'text-gray-900',
          bg: 'bg-white/95',
          shadow: 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
          backdrop: 'backdrop-blur-sm'
        }
      case 'organic':
        return {
          text: 'text-green-900',
          bg: 'bg-white/90',
          shadow: 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]',
          backdrop: 'backdrop-blur-md'
        }
      case 'retro':
        return {
          text: 'text-pink-50',
          bg: 'bg-purple-900/80',
          shadow: 'drop-shadow-[0_2px_4px_rgba(255,0,128,0.3)]',
          backdrop: 'backdrop-blur-md'
        }
      case 'futuristic':
        return {
          text: 'text-blue-50',
          bg: 'bg-slate-900/80',
          shadow: 'drop-shadow-[0_2px_4px_rgba(59,130,246,0.3)]',
          backdrop: 'backdrop-blur-md'
        }
      case 'artistic':
        return {
          text: 'text-purple-900',
          bg: 'bg-white/90',
          shadow: 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]',
          backdrop: 'backdrop-blur-md'
        }
      default:
        return {
          text: 'text-gray-900',
          bg: 'bg-white/90',
          shadow: 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]',
          backdrop: 'backdrop-blur-sm'
        }
    }
  }

  // Get variant-specific styling
  const getVariantStyles = () => {
    switch (variant) {
      case 'display':
        return 'text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight'
      case 'heading':
        return 'text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight'
      case 'body':
        return 'text-base md:text-lg leading-relaxed'
      case 'caption':
        return 'text-sm md:text-base leading-normal'
      default:
        return 'text-base md:text-lg leading-relaxed'
    }
  }

  const styles = getTextStyles()
  const variantStyles = getVariantStyles()

  return (
    <motion.div
      className={`
        relative
        ${centered ? 'text-center' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: variant === 'display' ? 0.2 : variant === 'heading' ? 0.1 : 0
      }}
    >
      {/* Background overlay for readability */}
      <div 
        className={`
          absolute inset-0 -m-2 rounded-lg
          ${styles.bg}
          ${styles.backdrop}
          opacity-90
        `}
      />
      
      {/* Text content */}
      <div 
        className={`
          relative z-10 p-2
          ${styles.text}
          ${variantStyles}
          ${styles.shadow}
          font-feature-settings: 'rlig' 1, 'calt' 1
        `}
        style={{
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

// Card component with proper text readability
interface ReadableCardProps {
  children: ReactNode
  className?: string
  currentTheme?: ThemeVariant | null
  padding?: 'sm' | 'md' | 'lg'
}

export function ReadableCard({ 
  children, 
  className = '', 
  currentTheme,
  padding = 'md'
}: ReadableCardProps) {
  
  const getCardStyles = () => {
    if (!currentTheme) return {
      bg: 'bg-white/95',
      border: 'border-gray-200',
      shadow: 'shadow-lg'
    }
    
    switch (currentTheme.category) {
      case 'cyberpunk':
        return {
          bg: 'bg-black/90',
          border: 'border-green-500/30',
          shadow: 'shadow-2xl shadow-green-500/20'
        }
      case 'minimalist':
        return {
          bg: 'bg-white/98',
          border: 'border-gray-100',
          shadow: 'shadow-md'
        }
      case 'organic':
        return {
          bg: 'bg-white/95',
          border: 'border-green-200/50',
          shadow: 'shadow-lg shadow-green-500/10'
        }
      case 'retro':
        return {
          bg: 'bg-purple-900/90',
          border: 'border-pink-500/30',
          shadow: 'shadow-2xl shadow-pink-500/20'
        }
      case 'futuristic':
        return {
          bg: 'bg-slate-900/90',
          border: 'border-blue-500/30',
          shadow: 'shadow-2xl shadow-blue-500/20'
        }
      case 'artistic':
        return {
          bg: 'bg-white/95',
          border: 'border-purple-200/50',
          shadow: 'shadow-lg shadow-purple-500/10'
        }
      default:
        return {
          bg: 'bg-white/95',
          border: 'border-gray-200',
          shadow: 'shadow-lg'
        }
    }
  }

  const getPaddingStyles = () => {
    switch (padding) {
      case 'sm': return 'p-4'
      case 'lg': return 'p-8'
      default: return 'p-6'
    }
  }

  const styles = getCardStyles()

  return (
    <motion.div
      className={`
        ${styles.bg}
        ${styles.border}
        ${styles.shadow}
        ${getPaddingStyles()}
        border rounded-xl backdrop-blur-md
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  )
}
