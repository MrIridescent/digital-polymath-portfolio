'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContentExtractor, Quote } from '@/lib/ContentExtractor'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'

interface MovingQuotesProps {
  currentTheme?: ThemeVariant | null
  position?: 'top' | 'bottom' | 'floating'
  speed?: 'slow' | 'medium' | 'fast'
  count?: number
}

export function MovingQuotes({
  currentTheme,
  position = 'top',
  speed = 'slow',
  count = 8
}: MovingQuotesProps) {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load quotes in order (no duplication needed)
  useEffect(() => {
    const contentExtractor = ContentExtractor.getInstance()
    const selectedQuotes = contentExtractor.getRandomQuotes(count)
    setQuotes(selectedQuotes) // Keep original order, no duplication
    setCurrentIndex(0) // Start from first quote
  }, [count])

  // Get timing configuration for ordered display
  const getTimingConfig = () => {
    switch (speed) {
      case 'fast': return { quoteDuration: 15000, progressInterval: 100 } // 15 seconds per quote
      case 'medium': return { quoteDuration: 20000, progressInterval: 100 } // 20 seconds per quote
      default: return { quoteDuration: 30000, progressInterval: 100 } // 30 seconds per quote (slow)
    }
  }

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [])

  // Advance to next quote in order
  const advanceQuote = useCallback(() => {
    if (quotes.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % quotes.length)
    setProgress(0) // Reset progress for new quote
  }, [quotes.length])

  // Start/stop quote cycling with proper timing
  useEffect(() => {
    if (quotes.length === 0 || isPaused || !isVisible) return

    const timing = getTimingConfig()

    // Clear existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    // Set up quote advancement
    intervalRef.current = setInterval(advanceQuote, timing.quoteDuration)

    // Set up progress tracking
    const progressStep = 100 / (timing.quoteDuration / timing.progressInterval)
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressStep
        return newProgress >= 100 ? 100 : newProgress
      })
    }, timing.progressInterval)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [quotes.length, isPaused, isVisible, advanceQuote])

  // Reset progress when quote changes
  useEffect(() => {
    setProgress(0)
  }, [currentIndex])

  // Get theme-aware styling
  const getThemeStyles = () => {
    if (!currentTheme) return {
      bg: 'bg-black/80 backdrop-blur-md',
      text: 'text-white',
      accent: 'text-blue-400',
      border: 'border-white/20'
    }
    
    switch (currentTheme.category) {
      case 'cyberpunk':
        return {
          bg: 'bg-black/90 backdrop-blur-md',
          text: 'text-green-300',
          accent: 'text-green-400',
          border: 'border-green-500/30'
        }
      case 'minimalist':
        return {
          bg: 'bg-white/95 backdrop-blur-sm',
          text: 'text-gray-900',
          accent: 'text-gray-700',
          border: 'border-gray-200'
        }
      case 'organic':
        return {
          bg: 'bg-green-50/90 backdrop-blur-md',
          text: 'text-green-800',
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
          text: 'text-purple-800',
          accent: 'text-purple-600',
          border: 'border-purple-200/50'
        }
      default:
        return {
          bg: 'bg-black/80 backdrop-blur-md',
          text: 'text-white',
          accent: 'text-blue-400',
          border: 'border-white/20'
        }
    }
  }

  const styles = getThemeStyles()

  // Respect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsVisible(!mediaQuery.matches)

    const handleChange = () => setIsVisible(!mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Don't render if no quotes or motion is reduced
  if (!isVisible || quotes.length === 0) return null

  const currentQuote = quotes[currentIndex]

  const getPositionClasses = () => {
    return `fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-50`
  }

  const speedConfig = {
    duration: speed === 'slow' ? 60 : speed === 'medium' ? 40 : 20,
    delay: speed === 'slow' ? 8 : speed === 'medium' ? 5 : 3
  }

  return (
    <div className={getPositionClasses()}>
      <div 
        className={`
          ${styles.bg} 
          ${styles.border} 
          border-b 
          py-3 
          overflow-hidden
          ${position === 'floating' ? 'mx-8 rounded-lg border' : ''}
        `}
      >
        {/* Marquee Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex items-center space-x-16 whitespace-nowrap"
            animate={isPaused ? {} : {
              x: [0, -50 * quotes.length + '%']
            }}
            transition={{
              duration: speedConfig.duration,
              ease: "linear",
              repeat: Infinity,
              delay: speedConfig.delay
            }}
            style={{
              width: `${200 * quotes.length}%`
            }}
          >
            {quotes.map((quote, index) => (
              <motion.div
                key={`${quote.text}-${index}`}
                className="flex items-center space-x-4 px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Quote Icon */}
                <motion.div
                  className={`text-2xl ${styles.accent} opacity-60`}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  "
                </motion.div>

                {/* Quote Content */}
                <div className="flex flex-col">
                  <motion.blockquote 
                    className={`${styles.text} text-sm md:text-base font-medium leading-relaxed max-w-md`}
                    style={{
                      textShadow: currentTheme?.category === 'cyberpunk' ? '0 0 10px rgba(0, 255, 65, 0.3)' : 'none'
                    }}
                  >
                    {quote.text}
                  </motion.blockquote>
                  
                  <motion.cite 
                    className={`${styles.accent} text-xs md:text-sm font-semibold mt-1 not-italic`}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  >
                    — {quote.author}
                  </motion.cite>
                </div>

                {/* Category Badge */}
                <motion.span
                  className={`
                    px-2 py-1 rounded-full text-xs font-mono uppercase tracking-wider
                    ${styles.accent} bg-current bg-opacity-10 border border-current border-opacity-20
                  `}
                  whileHover={{ scale: 1.05 }}
                >
                  {quote.category}
                </motion.span>

                {/* Separator */}
                <motion.div
                  className={`w-px h-8 ${styles.border} bg-current opacity-30`}
                  animate={{
                    scaleY: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.7
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gradient Overlays for smooth edges */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${
              currentTheme?.category === 'minimalist' ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.8)'
            }, transparent)`
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${
              currentTheme?.category === 'minimalist' ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.8)'
            }, transparent)`
          }}
        />
      </div>

      {/* Pause indicator */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`${styles.bg} ${styles.border} border rounded px-3 py-1 shadow-lg`}>
              <span className={`${styles.text} text-xs font-mono flex items-center space-x-2`}>
                <span>⏸️</span>
                <span>Paused for reading • {quotes.length / 2} quotes</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Specialized quote components for different positions
export function TopQuotes(props: Omit<MovingQuotesProps, 'position'>) {
  return <MovingQuotes {...props} position="top" />
}

export function BottomQuotes(props: Omit<MovingQuotesProps, 'position'>) {
  return <MovingQuotes {...props} position="bottom" />
}

export function FloatingQuotes(props: Omit<MovingQuotesProps, 'position'>) {
  return <MovingQuotes {...props} position="floating" />
}
