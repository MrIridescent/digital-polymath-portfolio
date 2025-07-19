'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DynamicThemeEngine, ThemeVariant } from '@/lib/DynamicThemeEngine'
import { AIPersonalizationEngine } from '@/lib/AIPersonalizationEngine'
import { ClientOnly } from './ClientOnly'

interface DynamicLayoutProps {
  children: React.ReactNode
}

export function DynamicLayoutSystem({ children }: DynamicLayoutProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [themeEngine] = useState(() => new DynamicThemeEngine())
  const [aiEngine] = useState(() => new AIPersonalizationEngine())

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        // Only run on client side
        if (typeof window === 'undefined') return

        // Get AI-recommended theme or fallback to visit-based theme
        const visitTheme = themeEngine.getThemeForVisit()

        // Apply the theme
        themeEngine.applyTheme(visitTheme)
        setCurrentTheme(visitTheme)

        // Add theme transition effect
        document.body.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'

        setIsLoading(false)
      } catch (error) {
        console.error('Theme initialization failed:', error)
        setIsLoading(false)
      }
    }

    // Delay initialization to ensure client-side hydration
    const timer = setTimeout(initializeTheme, 100)
    return () => clearTimeout(timer)
  }, [themeEngine, aiEngine])

  const getLayoutClasses = () => {
    if (!currentTheme) return 'grid-layout-default'
    
    const baseClasses = 'min-h-screen transition-all duration-700 ease-out'
    const themeClasses = `theme-${currentTheme.id}`
    
    switch (currentTheme.layout.type) {
      case 'grid':
        return `${baseClasses} ${themeClasses} grid-layout-standard`
      case 'masonry':
        return `${baseClasses} ${themeClasses} masonry-layout`
      case 'asymmetric':
        return `${baseClasses} ${themeClasses} asymmetric-layout`
      case 'flowing':
        return `${baseClasses} ${themeClasses} flowing-layout`
      case 'centered':
        return `${baseClasses} ${themeClasses} centered-layout`
      case 'split':
        return `${baseClasses} ${themeClasses} split-layout`
      default:
        return `${baseClasses} ${themeClasses} grid-layout-default`
    }
  }

  const getAnimationVariants = () => {
    if (!currentTheme) return {}
    
    const speed = currentTheme.animations.speed === 'fast' ? 0.3 : 
                 currentTheme.animations.speed === 'medium' ? 0.6 : 0.9
    
    const intensity = currentTheme.animations.intensity === 'dynamic' ? 1.2 :
                     currentTheme.animations.intensity === 'medium' ? 0.8 : 0.4

    return {
      initial: { 
        opacity: 0, 
        scale: 0.95,
        y: 20 * intensity
      },
      animate: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: {
          duration: speed,
          ease: currentTheme.animations.style === 'bouncy' ? [0.68, -0.55, 0.265, 1.55] :
                currentTheme.animations.style === 'elastic' ? [0.25, 0.46, 0.45, 0.94] :
                currentTheme.animations.style === 'sharp' ? [0.4, 0, 0.2, 1] :
                [0.4, 0, 0.2, 1] // smooth
        }
      },
      exit: { 
        opacity: 0, 
        scale: 0.95,
        y: -20 * intensity,
        transition: { duration: speed * 0.7 }
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white text-lg font-medium"
          >
            Generating your personalized experience...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-blue-300 text-sm mt-2"
          >
            AI is analyzing your context and preferences
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTheme?.id}
        className={getLayoutClasses()}
        variants={getAnimationVariants()}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          '--dynamic-columns': currentTheme?.layout.columns,
          '--dynamic-rows': currentTheme?.layout.rows,
          '--dynamic-areas': currentTheme?.layout.areas,
          '--dynamic-gap': currentTheme?.layout.gap,
        } as React.CSSProperties}
      >
        {/* Theme Debug Info (Development Only) */}
        {process.env.NODE_ENV === 'development' && currentTheme && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="fixed top-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono"
          >
            <div className="font-bold text-green-400">Theme: {currentTheme.name}</div>
            <div>Layout: {currentTheme.layout.type}</div>
            <div>Mood: {currentTheme.personality.mood}</div>
            <div>Energy: {currentTheme.personality.energy}/10</div>
            <div>Visit: {themeEngine.getThemeStats().visitCount}</div>
          </motion.div>
        )}

        {/* Dynamic Background Effects */}
        <ClientOnly>
          <DynamicBackground theme={currentTheme} />
        </ClientOnly>
        
        {/* Main Content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {children}
        </motion.div>

        {/* Theme Transition Overlay */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(45deg, ${currentTheme?.colors.primary}20, ${currentTheme?.colors.secondary}20)`
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

interface DynamicBackgroundProps {
  theme: ThemeVariant | null
}

function DynamicBackground({ theme }: DynamicBackgroundProps) {
  if (!theme || typeof window === 'undefined') return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient Background */}
      {theme.effects.gradients && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.background}, ${theme.colors.surface}, ${theme.colors.primary}10)`
          }}
        />
      )}

      {/* Particle Effects */}
      {theme.effects.particles && (
        <div className="absolute inset-0">
          {Array.from({ length: theme.personality.energy * 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ backgroundColor: theme.colors.accent }}
              initial={{
                x: Math.random() * 1200,
                y: Math.random() * 800,
                opacity: 0
              }}
              animate={{
                x: Math.random() * 1200,
                y: Math.random() * 800,
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      )}

      {/* Glow Effects */}
      {theme.effects.glow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 3 }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 70%, ${theme.colors.primary}20 0%, transparent 50%), radial-gradient(circle at 70% 30%, ${theme.colors.secondary}20 0%, transparent 50%)`
          }}
        />
      )}

      {/* Blur Overlays */}
      {theme.effects.blur && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 4 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: theme.colors.accent }}
        />
      )}
    </div>
  )
}
