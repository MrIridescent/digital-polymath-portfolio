'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DynamicThemeEngine, ThemeVariant } from '@/lib/DynamicThemeEngine'
import { AIPersonalizationEngine } from '@/lib/AIPersonalizationEngine'
import { InactivityTimer } from '@/lib/InactivityTimer'
import { ClientOnly } from './ClientOnly'
// Autonomous morphing system replaces manual layout controls
import { AutonomousLayoutMorpher } from './AutonomousLayoutMorpher'

import { FixedPositionCards } from './FixedPositionCards'
import { Navigation } from './Navigation'
import { DigitalCourtierBot } from './DigitalCourtierBot'
import { LeadDashboard } from './LeadDashboard'
import { SystemIntegrationTest } from './SystemIntegrationTest'
import { EnterpriseSystemTest } from './EnterpriseSystemTest'
import { SystemFireTest } from './SystemFireTest'

interface DynamicLayoutProps {
  children: React.ReactNode
}

export function DynamicLayoutSystem({ children }: DynamicLayoutProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [themeEngine] = useState(() => new DynamicThemeEngine())
  const [aiEngine] = useState(() => new AIPersonalizationEngine())
  const inactivityTimerRef = useRef<InactivityTimer | null>(null)

  // Advanced UI system is now integrated

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

  // Add inactivity-based theme rotation (1 minute after last activity)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleThemeRotation = () => {
      const randomTheme = themeEngine.getRandomTheme()
      themeEngine.applyTheme(randomTheme)
      setCurrentTheme(randomTheme)

      // Show morphing notification
      if (typeof window !== 'undefined' && document.body) {
        const notification = document.createElement('div')
        notification.innerHTML = `
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 rounded-full animate-pulse" style="background-color: ${randomTheme.colors.primary}"></div>
            <span>🌀 Morphing to ${randomTheme.name}</span>
          </div>
        `
        notification.className = 'fixed top-4 right-4 z-50 bg-black/90 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all duration-500 backdrop-blur-md border border-white/20'
        document.body.appendChild(notification)

        setTimeout(() => {
          notification.style.opacity = '0'
          notification.style.transform = 'translateY(-20px)'
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification)
            }
          }, 500)
        }, 3000)
      }
    }

    // Create inactivity timer (60 seconds = 1 minute)
    inactivityTimerRef.current = new InactivityTimer(handleThemeRotation, 60000)
    inactivityTimerRef.current.start()

    return () => {
      if (inactivityTimerRef.current) {
        inactivityTimerRef.current.destroy()
      }
    }
  }, [themeEngine])

  const getLayoutClasses = () => {
    if (!currentTheme) return 'min-h-screen w-full flex flex-col'

    const baseClasses = 'min-h-screen w-full flex flex-col transition-all duration-700 ease-out'
    const themeClasses = `theme-${currentTheme.id}`

    // Full viewport layout with theme-specific styling
    switch (currentTheme.category) {
      case 'cyberpunk':
        return `${baseClasses} ${themeClasses} bg-black text-green-300`
      case 'minimalist':
        return `${baseClasses} ${themeClasses} bg-white text-gray-900`
      case 'organic':
        return `${baseClasses} ${themeClasses} bg-gradient-to-br from-green-50 to-blue-50 text-green-800`
      case 'retro':
        return `${baseClasses} ${themeClasses} bg-gradient-to-br from-purple-900 to-pink-900 text-pink-100`
      case 'futuristic':
        return `${baseClasses} ${themeClasses} bg-slate-900 text-blue-100`
      case 'artistic':
        return `${baseClasses} ${themeClasses} bg-gradient-to-br from-purple-50 to-pink-50 text-purple-800`
      default:
        return `${baseClasses} ${themeClasses} bg-white text-slate-900`
    }
  }

  const getAnimationVariants = () => {
    if (!currentTheme) return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    }
    
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
            Personalizing your viewing experience...
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
        
        {/* Navigation */}
        <Navigation />

        {/* Moving quotes moved to main content */}

        {/* Autonomous Layout Morphing System */}
        <AutonomousLayoutMorpher currentTheme={currentTheme}>
          {children}
        </AutonomousLayoutMorpher>

        {/* Fixed Position Cards - Profile and other cards in permanent positions */}
        <FixedPositionCards currentTheme={currentTheme} />

        {/* Digital Courtier Bot */}
        <DigitalCourtierBot />

        {/* Lead Dashboard */}
        <LeadDashboard />

        {/* System Integration Test (Development Only) */}
        {process.env.NODE_ENV === 'development' && <SystemIntegrationTest />}

        {/* Enterprise System Test (Development Only) */}
        {process.env.NODE_ENV === 'development' && <EnterpriseSystemTest />}

        {/* System Fire Test (Development Only) */}
        {process.env.NODE_ENV === 'development' && <SystemFireTest />}

        {/* Theme Transition Overlay - Optimized for Performance */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0.5 }}
          transition={{
            duration: 0.2, // Much faster
            ease: "easeInOut"
          }}
          style={{
            background: `linear-gradient(45deg, ${currentTheme?.colors.primary}10, ${currentTheme?.colors.secondary}10)`,
            willChange: 'opacity' // Optimize for animations
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
