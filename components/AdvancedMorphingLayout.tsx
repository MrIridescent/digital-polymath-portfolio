'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'
import { MorphingNavigation } from './MorphingNavigation'
import { MorphingFooter } from './MorphingFooter'

export type LayoutVariant = 
  | 'top-nav'           // Traditional top navigation
  | 'left-sidebar'      // Left sidebar navigation
  | 'right-sidebar'     // Right sidebar navigation
  | 'bottom-nav'        // Bottom navigation
  | 'floating-nav'      // Floating overlay navigation
  | 'dropdown-nav'      // Hamburger dropdown navigation
  | 'split-nav'         // Split top + side navigation

interface AdvancedMorphingLayoutProps {
  children: React.ReactNode
  currentTheme: ThemeVariant | null
}

export function AdvancedMorphingLayout({ children, currentTheme }: AdvancedMorphingLayoutProps) {
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>('top-nav')

  // Get layout variant based on theme category
  const getLayoutVariant = (theme: ThemeVariant | null): LayoutVariant => {
    if (!theme) return 'top-nav'
    
    switch (theme.category) {
      case 'cyberpunk':
        return 'left-sidebar'
      case 'minimalist':
        return 'top-nav'
      case 'organic':
        return 'right-sidebar'
      case 'retro':
        return 'bottom-nav'
      case 'futuristic':
        return 'floating-nav'
      case 'artistic':
        return 'split-nav'
      default:
        return 'dropdown-nav'
    }
  }

  // Update layout when theme changes
  useEffect(() => {
    const newLayout = getLayoutVariant(currentTheme)
    setLayoutVariant(newLayout)
  }, [currentTheme])

  // Get container classes based on layout variant
  const getContainerClasses = () => {
    const baseClasses = 'min-h-screen w-full transition-all duration-1000 ease-in-out'
    
    switch (layoutVariant) {
      case 'left-sidebar':
        return `${baseClasses} flex flex-row`
      case 'right-sidebar':
        return `${baseClasses} flex flex-row-reverse`
      case 'bottom-nav':
        return `${baseClasses} flex flex-col-reverse`
      case 'floating-nav':
        return `${baseClasses} relative`
      case 'split-nav':
        return `${baseClasses} grid grid-cols-[250px_1fr] grid-rows-[60px_1fr]`
      case 'dropdown-nav':
        return `${baseClasses} flex flex-col`
      default: // top-nav
        return `${baseClasses} flex flex-col`
    }
  }

  // Get main content classes
  const getMainClasses = () => {
    switch (layoutVariant) {
      case 'left-sidebar':
      case 'right-sidebar':
        return 'flex-1 overflow-auto'
      case 'bottom-nav':
        return 'flex-1 overflow-auto'
      case 'floating-nav':
        return 'w-full h-full'
      case 'split-nav':
        return 'col-start-2 row-start-2 overflow-auto'
      case 'dropdown-nav':
        return 'flex-1 overflow-auto'
      default: // top-nav
        return 'flex-1 overflow-auto pt-16'
    }
  }

  // Morphing transition variants
  const morphingVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.95,
      rotateY: -10
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      rotateY: 10,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${layoutVariant}-${currentTheme?.id}`}
          className={getContainerClasses()}
          variants={morphingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          layout
        >
          {/* Navigation - positioned based on layout variant */}
          <motion.div
            layout
            className={
              layoutVariant === 'left-sidebar' || layoutVariant === 'right-sidebar'
                ? 'w-64 h-full'
                : layoutVariant === 'bottom-nav'
                ? 'w-full h-16'
                : layoutVariant === 'floating-nav'
                ? 'absolute top-4 left-4 right-4 z-50'
                : layoutVariant === 'split-nav'
                ? 'col-span-2 row-start-1'
                : 'w-full h-16'
            }
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <MorphingNavigation 
              currentTheme={currentTheme} 
              layoutVariant={layoutVariant}
            />
          </motion.div>

          {/* Main Content */}
          <motion.main
            layout
            className={getMainClasses()}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-full h-full relative">
              {children}
            </div>
          </motion.main>

          {/* Footer - only show for certain layouts */}
          {(layoutVariant === 'top-nav' || layoutVariant === 'dropdown-nav') && (
            <motion.div
              layout
              className="w-full"
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <MorphingFooter currentTheme={currentTheme} />
            </motion.div>
          )}

          {/* Split navigation sidebar for split-nav layout */}
          {layoutVariant === 'split-nav' && (
            <motion.div
              layout
              className="col-start-1 row-start-2 w-full h-full border-r border-opacity-20"
              style={{ borderColor: currentTheme?.colors.primary }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="p-4 h-full overflow-auto">
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-70">
                  Quick Access
                </h3>
                <div className="space-y-2">
                  {['Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
                    <motion.div
                      key={item}
                      className="p-2 rounded cursor-pointer hover:bg-opacity-10 hover:bg-current transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  )
}
