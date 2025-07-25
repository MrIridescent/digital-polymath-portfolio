'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { AutonomousMorphingEngine, MorphingState } from '@/lib/AutonomousMorphingEngine'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'

interface AutonomousLayoutMorpherProps {
  children: React.ReactNode
  currentTheme: ThemeVariant | null
}

export function AutonomousLayoutMorpher({ children, currentTheme }: AutonomousLayoutMorpherProps) {
  const [morphingState, setMorphingState] = useState<MorphingState>({
    layoutMode: 'top-nav',
    visualMode: 'enhanced',
    animationIntensity: 'moderate',
    colorScheme: 'primary',
    particleCount: 30,
    morphingSpeed: 1
  })
  
  const [isTransitioning, setIsTransitioning] = useState(false)
  const morphingEngineRef = useRef<AutonomousMorphingEngine | null>(null)

  useEffect(() => {
    // Initialize autonomous morphing engine
    morphingEngineRef.current = new AutonomousMorphingEngine()
    
    // Add listener for state changes
    const handleMorphingChange = (newState: MorphingState) => {
      setIsTransitioning(true)
      
      // Smooth transition to new state
      setTimeout(() => {
        setMorphingState(newState)
        setTimeout(() => setIsTransitioning(false), 1000)
      }, 500)
    }

    morphingEngineRef.current.addListener(handleMorphingChange)
    
    // Start autonomous morphing after initial load
    setTimeout(() => {
      morphingEngineRef.current?.start()
    }, 3000) // Start after 3 seconds

    return () => {
      morphingEngineRef.current?.stop()
    }
  }, [])

  // Get layout classes based on current morphing state
  const getLayoutClasses = () => {
    const baseClasses = 'min-h-screen w-full transition-all duration-1000 ease-in-out'
    
    switch (morphingState.layoutMode) {
      case 'left-sidebar':
        return `${baseClasses} flex flex-row`
      case 'right-sidebar':
        return `${baseClasses} flex flex-row-reverse`
      case 'bottom-nav':
        return `${baseClasses} flex flex-col-reverse`
      case 'floating':
        return `${baseClasses} relative overflow-hidden`
      case 'split':
        return `${baseClasses} grid grid-cols-[300px_1fr] grid-rows-[80px_1fr] gap-4 p-4`
      default: // top-nav
        return `${baseClasses} flex flex-col`
    }
  }

  // Get navigation positioning
  const getNavClasses = () => {
    switch (morphingState.layoutMode) {
      case 'left-sidebar':
      case 'right-sidebar':
        return 'w-80 h-full flex flex-col'
      case 'bottom-nav':
        return 'w-full h-20 flex items-center'
      case 'floating':
        return 'absolute top-6 left-6 right-6 z-50 rounded-2xl'
      case 'split':
        return 'col-span-2 row-start-1 flex items-center'
      default: // top-nav
        return 'w-full h-16 flex items-center'
    }
  }

  // Get main content classes
  const getMainClasses = () => {
    switch (morphingState.layoutMode) {
      case 'left-sidebar':
      case 'right-sidebar':
        return 'flex-1 overflow-auto relative'
      case 'bottom-nav':
        return 'flex-1 overflow-auto pt-4'
      case 'floating':
        return 'w-full h-full pt-24'
      case 'split':
        return 'col-start-2 row-start-2 overflow-auto'
      default: // top-nav
        return 'flex-1 overflow-auto pt-16'
    }
  }

  // Get visual effects based on state
  const getVisualEffects = () => {
    const effects = []
    
    if (morphingState.visualMode === 'immersive' || morphingState.visualMode === 'cinematic') {
      effects.push('neural-grid')
    }
    
    if (morphingState.animationIntensity === 'dynamic' || morphingState.animationIntensity === 'extreme') {
      effects.push('particle-field')
    }
    
    if (morphingState.colorScheme === 'gradient') {
      effects.push('gradient-overlay')
    }
    
    return effects
  }

  // Morphing transition variants
  const morphingVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.95,
      rotateY: -15,
      filter: 'blur(10px)'
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 2 * morphingState.morphingSpeed,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      rotateY: 15,
      filter: 'blur(5px)',
      transition: {
        duration: 1.5 * morphingState.morphingSpeed,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 * morphingState.morphingSpeed }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.6 * morphingState.morphingSpeed }
    }
  }

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${morphingState.layoutMode}-${morphingState.visualMode}`}
          className={getLayoutClasses()}
          variants={morphingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          layout
        >
          {/* Visual Effects Layer */}
          {getVisualEffects().includes('neural-grid') && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-0 opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
            >
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
              />
            </motion.div>
          )}

          {/* Particle Field */}
          {getVisualEffects().includes('particle-field') && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(morphingState.particleCount)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-current rounded-full"
                  style={{
                    color: currentTheme?.colors?.primary || '#00ffff',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 400 - 200],
                    y: [0, Math.random() * 400 - 200],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: Math.random() * 15 + 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Gradient Overlay */}
          {getVisualEffects().includes('gradient-overlay') && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at 50% 50%, ${currentTheme?.colors?.primary || '#00ffff'}20 0%, transparent 70%)`
              }}
            />
          )}

          {/* Navigation - Centered with proper spacing */}
          <motion.nav
            layout
            className={`w-full bg-black/90 backdrop-blur-md border-b border-white/10 py-6 mb-8`}
            variants={childVariants}
          >
            <div className="container mx-auto px-6 flex items-center justify-center">
              <div className="flex items-center space-x-8">
                <motion.div
                  className="font-bold text-xl text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Polymathic Coder
                </motion.div>

                <motion.div
                  className="hidden md:flex items-center space-x-6"
                  variants={childVariants}
                >
                  {[
                    { name: 'About', href: '/about' },
                    { name: 'Skills', href: '/skills' },
                    { name: 'Philosophy', href: '/philosophy' },
                    { name: 'Projects', href: '/projects' },
                    { name: 'Contact', href: '/contact' }
                  ].map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-primary-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.1 }
                      }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.nav>

          {/* Sidebar Content for Split Layout */}
          {morphingState.layoutMode === 'split' && (
            <motion.aside
              layout
              className="col-start-1 row-start-2 bg-black/20 backdrop-blur-md rounded-lg p-6"
              variants={childVariants}
            >
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-70">
                Quick Navigation
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Skills', href: '/skills' },
                  { name: 'Philosophy', href: '/philosophy' },
                  { name: 'Projects', href: '/projects' },
                  { name: 'Contact', href: '/contact' }
                ].map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block p-3 rounded-lg hover:bg-white/10 transition-colors"
                    whileHover={{ x: 8, scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 }
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.aside>
          )}

          {/* Main Content - Proper spacing from navbar */}
          <motion.main
            layout
            className={`${getMainClasses()} mt-4 pt-8`}
            variants={childVariants}
          >
            <div className="w-full h-full relative">
              {children}
            </div>
          </motion.main>

          {/* Transition Indicator */}
          {isTransitioning && (
            <motion.div
              className="fixed top-8 right-8 z-50 bg-black/90 border border-white/20 rounded-lg px-4 py-2 backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-white text-sm font-mono">
                  Morphing to {morphingState.layoutMode}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  )
}
