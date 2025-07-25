'use client'

import { ReactNode, useState, useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'

interface EnhancedCardProps {
  children: ReactNode
  className?: string
  currentTheme?: ThemeVariant | null
  variant?: 'default' | 'elevated' | 'glass' | 'neon' | 'minimal'
  interactive?: boolean
  autoCenter?: boolean
  delay?: number
}

export function EnhancedCard({ 
  children, 
  className = '', 
  currentTheme,
  variant = 'default',
  interactive = true,
  autoCenter = true,
  delay = 0
}: EnhancedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(mouseY, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(mouseX, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !interactive) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const rotateXValue = (e.clientY - centerY) / (rect.height / 2) * -10
      const rotateYValue = (e.clientX - centerX) / (rect.width / 2) * 10
      
      mouseX.set(rotateYValue)
      mouseY.set(rotateXValue)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    if (cardRef.current && interactive) {
      cardRef.current.addEventListener('mousemove', handleMouseMove)
      cardRef.current.addEventListener('mouseleave', handleMouseLeave)
      
      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener('mousemove', handleMouseMove)
          cardRef.current.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, [interactive, mouseX, mouseY])

  // Get variant-specific styling
  const getVariantStyles = () => {
    const baseStyles = 'rounded-xl backdrop-blur-md border transition-all duration-300'
    
    switch (variant) {
      case 'elevated':
        return `${baseStyles} bg-white/95 border-gray-200 shadow-2xl hover:shadow-3xl`
      case 'glass':
        return `${baseStyles} bg-white/10 border-white/20 shadow-lg hover:bg-white/15`
      case 'neon':
        return `${baseStyles} bg-black/80 border-cyan-500/50 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40`
      case 'minimal':
        return `${baseStyles} bg-white/98 border-gray-100 shadow-sm hover:shadow-md`
      default:
        return `${baseStyles} bg-white/90 border-gray-200/50 shadow-lg hover:shadow-xl`
    }
  }

  // Get theme-aware colors
  const getThemeColors = () => {
    if (!currentTheme) return {
      bg: 'bg-white/90',
      border: 'border-gray-200/50',
      text: 'text-gray-900',
      shadow: 'shadow-lg'
    }
    
    switch (currentTheme.category) {
      case 'cyberpunk':
        return {
          bg: 'bg-black/90',
          border: 'border-green-500/30',
          text: 'text-green-100',
          shadow: 'shadow-2xl shadow-green-500/20'
        }
      case 'minimalist':
        return {
          bg: 'bg-white/98',
          border: 'border-gray-100',
          text: 'text-gray-900',
          shadow: 'shadow-md'
        }
      case 'organic':
        return {
          bg: 'bg-white/95',
          border: 'border-green-200/50',
          text: 'text-green-900',
          shadow: 'shadow-lg shadow-green-500/10'
        }
      case 'retro':
        return {
          bg: 'bg-purple-900/90',
          border: 'border-pink-500/30',
          text: 'text-pink-50',
          shadow: 'shadow-2xl shadow-pink-500/20'
        }
      case 'futuristic':
        return {
          bg: 'bg-slate-900/90',
          border: 'border-blue-500/30',
          text: 'text-blue-50',
          shadow: 'shadow-2xl shadow-blue-500/20'
        }
      case 'artistic':
        return {
          bg: 'bg-white/95',
          border: 'border-purple-200/50',
          text: 'text-purple-900',
          shadow: 'shadow-lg shadow-purple-500/10'
        }
      default:
        return {
          bg: 'bg-white/90',
          border: 'border-gray-200/50',
          text: 'text-gray-900',
          shadow: 'shadow-lg'
        }
    }
  }

  const themeColors = getThemeColors()

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: delay,
        staggerChildren: 0.1
      }
    },
    hover: {
      scale: interactive ? 1.02 : 1,
      y: interactive ? -5 : 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`
        ${getVariantStyles()}
        ${themeColors.bg}
        ${themeColors.border}
        ${themeColors.shadow}
        ${autoCenter ? 'mx-auto' : ''}
        ${className}
      `}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glow effect for neon variant */}
      {variant === 'neon' && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Content container */}
      <motion.div
        className={`
          relative z-10 p-6
          ${themeColors.text}
          ${autoCenter ? 'text-center' : ''}
        `}
        variants={contentVariants}
        style={{
          textShadow: variant === 'neon' ? '0 0 10px rgba(0, 255, 255, 0.5)' : 'none'
        }}
      >
        {children}
      </motion.div>

      {/* Interactive highlight */}
      {interactive && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}

      {/* Border glow animation */}
      {isHovered && variant !== 'minimal' && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(45deg, transparent, ${currentTheme?.colors?.primary || '#3b82f6'}40, transparent)`,
            padding: '1px'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={`w-full h-full rounded-xl ${themeColors.bg}`} />
        </motion.div>
      )}
    </motion.div>
  )
}

// Specialized card variants
export function ProjectCard({ children, ...props }: Omit<EnhancedCardProps, 'variant'>) {
  return (
    <EnhancedCard variant="elevated" {...props}>
      {children}
    </EnhancedCard>
  )
}

export function SkillCard({ children, ...props }: Omit<EnhancedCardProps, 'variant'>) {
  return (
    <EnhancedCard variant="glass" {...props}>
      {children}
    </EnhancedCard>
  )
}

export function HighlightCard({ children, ...props }: Omit<EnhancedCardProps, 'variant'>) {
  return (
    <EnhancedCard variant="neon" {...props}>
      {children}
    </EnhancedCard>
  )
}
