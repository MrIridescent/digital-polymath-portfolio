'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MobileFirstLayoutProps {
  children: ReactNode
  className?: string
  variant?: 'container' | 'full-width' | 'centered'
  spacing?: 'tight' | 'normal' | 'loose'
}

export function MobileFirstLayout({ 
  children, 
  className = '', 
  variant = 'container',
  spacing = 'normal'
}: MobileFirstLayoutProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'full-width':
        return 'w-full'
      case 'centered':
        return 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
      default:
        return 'responsive-container'
    }
  }

  const getSpacingClasses = () => {
    switch (spacing) {
      case 'tight':
        return 'py-4 md:py-6'
      case 'loose':
        return 'py-12 md:py-20'
      default:
        return 'py-8 md:py-12'
    }
  }

  return (
    <div className={`${getVariantClasses()} ${getSpacingClasses()} ${className}`}>
      {children}
    </div>
  )
}

interface ResponsiveGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ResponsiveGrid({ 
  children, 
  columns = 3, 
  gap = 'md',
  className = ''
}: ResponsiveGridProps) {
  const getGridClasses = () => {
    const gapClasses = {
      sm: 'gap-3 md:gap-4',
      md: 'gap-4 md:gap-6',
      lg: 'gap-6 md:gap-8'
    }

    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    }

    return `grid ${columnClasses[columns]} ${gapClasses[gap]}`
  }

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {children}
    </div>
  )
}

interface ResponsiveStackProps {
  children: ReactNode
  direction?: 'vertical' | 'horizontal-on-desktop'
  align?: 'start' | 'center' | 'end'
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ResponsiveStack({ 
  children, 
  direction = 'vertical',
  align = 'start',
  gap = 'md',
  className = ''
}: ResponsiveStackProps) {
  const getStackClasses = () => {
    const gapClasses = {
      sm: 'gap-2 md:gap-3',
      md: 'gap-4 md:gap-6',
      lg: 'gap-6 md:gap-8'
    }

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end'
    }

    const directionClasses = {
      vertical: 'flex flex-col',
      'horizontal-on-desktop': 'flex flex-col md:flex-row'
    }

    return `${directionClasses[direction]} ${alignClasses[align]} ${gapClasses[gap]}`
  }

  return (
    <div className={`${getStackClasses()} ${className}`}>
      {children}
    </div>
  )
}

interface MobileFirstCardProps {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  hover?: boolean
}

export function MobileFirstCard({ 
  children, 
  padding = 'md',
  className = '',
  hover = true
}: MobileFirstCardProps) {
  const getPaddingClasses = () => {
    switch (padding) {
      case 'sm':
        return 'p-3 md:p-4'
      case 'lg':
        return 'p-6 md:p-8'
      default:
        return 'p-4 md:p-6'
    }
  }

  const hoverClasses = hover ? 'hover:scale-105 transition-transform duration-300' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        bg-white rounded-lg shadow-sm border border-slate-200
        ${getPaddingClasses()}
        ${hoverClasses}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

interface ResponsiveTextProps {
  children: ReactNode
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'heading'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'primary' | 'secondary' | 'muted'
  className?: string
}

export function ResponsiveText({ 
  children, 
  size = 'base',
  weight = 'normal',
  color = 'primary',
  className = ''
}: ResponsiveTextProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm md:text-base mobile-text-scale'
      case 'lg':
        return 'text-lg md:text-xl'
      case 'xl':
        return 'text-xl md:text-2xl'
      case 'heading':
        return 'text-2xl md:text-3xl lg:text-4xl mobile-heading-scale'
      default:
        return 'text-base md:text-lg mobile-text-scale'
    }
  }

  const getWeightClasses = () => {
    switch (weight) {
      case 'medium':
        return 'font-medium'
      case 'semibold':
        return 'font-semibold'
      case 'bold':
        return 'font-bold'
      default:
        return 'font-normal'
    }
  }

  const getColorClasses = () => {
    switch (color) {
      case 'secondary':
        return 'text-slate-600'
      case 'muted':
        return 'text-slate-500'
      default:
        return 'text-slate-900'
    }
  }

  return (
    <div className={`
      ${getSizeClasses()}
      ${getWeightClasses()}
      ${getColorClasses()}
      leading-relaxed
      ${className}
    `}>
      {children}
    </div>
  )
}

interface TouchFriendlyButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export function TouchFriendlyButton({ 
  children, 
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}: TouchFriendlyButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      case 'ghost':
        return 'bg-transparent text-slate-600 hover:bg-slate-50'
      default:
        return 'bg-primary-600 text-white hover:bg-primary-700'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm min-h-[40px]'
      case 'lg':
        return 'px-8 py-4 text-lg min-h-[52px]'
      default:
        return 'px-6 py-3 text-base min-h-[44px]'
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        mobile-touch-target
        rounded-lg font-medium
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  )
}
