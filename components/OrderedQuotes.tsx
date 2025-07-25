'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContentExtractor } from '@/lib/ContentExtractor'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'

interface Quote {
  text: string
  author: string
  category: string
}

interface OrderedQuotesProps {
  currentTheme?: ThemeVariant | null
  speed?: 'slow' | 'medium' | 'fast'
  count?: number
}

export function OrderedQuotes({ 
  currentTheme, 
  speed = 'slow',
  count = 8
}: OrderedQuotesProps) {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load quotes in order
  useEffect(() => {
    const contentExtractor = ContentExtractor.getInstance()
    const selectedQuotes = contentExtractor.getRandomQuotes(count)
    setQuotes(selectedQuotes)
    setCurrentIndex(0)
  }, [count])

  // Get timing configuration
  const getTimingConfig = () => {
    switch (speed) {
      case 'fast': return { quoteDuration: 15000, progressInterval: 100 }
      case 'medium': return { quoteDuration: 20000, progressInterval: 100 }
      default: return { quoteDuration: 30000, progressInterval: 100 }
    }
  }

  // Clean up intervals
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [])

  // Advance to next quote
  const advanceQuote = useCallback(() => {
    if (quotes.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % quotes.length)
    setProgress(0)
  }, [quotes.length])

  // Quote cycling logic
  useEffect(() => {
    if (quotes.length === 0 || isPaused || !isVisible) return

    const timing = getTimingConfig()
    
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    intervalRef.current = setInterval(advanceQuote, timing.quoteDuration)

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

  // Reset progress on quote change
  useEffect(() => {
    setProgress(0)
  }, [currentIndex])

  // Respect reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsVisible(!mediaQuery.matches)
    
    const handleChange = () => setIsVisible(!mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Theme styles
  const getThemeStyles = () => {
    if (!currentTheme) return {
      bg: 'bg-black/80',
      text: 'text-white',
      accent: 'text-blue-400',
      border: 'border-white/20'
    }
    
    switch (currentTheme.category) {
      case 'cyberpunk':
        return {
          bg: 'bg-black/90',
          text: 'text-green-300',
          accent: 'text-green-400',
          border: 'border-green-500/30'
        }
      case 'minimalist':
        return {
          bg: 'bg-white/95',
          text: 'text-gray-900',
          accent: 'text-gray-700',
          border: 'border-gray-200'
        }
      default:
        return {
          bg: 'bg-black/80',
          text: 'text-white',
          accent: 'text-blue-400',
          border: 'border-white/20'
        }
    }
  }

  if (!isVisible || quotes.length === 0) return null

  const styles = getThemeStyles()
  const currentQuote = quotes[currentIndex]

  return (
    <div className="relative w-full">
      <div 
        className={`${styles.bg} ${styles.border} border rounded-xl p-6 backdrop-blur-md shadow-2xl`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Quote Display */}
        <div className="relative min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentQuote && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center w-full"
              >
                {/* Quote Icon */}
                <motion.div
                  className={`text-3xl ${styles.accent} opacity-60 mb-4`}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  "
                </motion.div>

                {/* Quote Text */}
                <blockquote className={`${styles.text} text-lg md:text-xl leading-relaxed mb-4 font-medium`}>
                  {currentQuote.text}
                </blockquote>

                {/* Author */}
                <cite className={`${styles.accent} text-sm md:text-base font-semibold not-italic`}>
                  — {currentQuote.author}
                </cite>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress and Controls */}
        <div className="mt-6 space-y-3">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200/20 rounded-full h-1">
            <motion.div
              className={`h-full ${styles.accent} bg-current rounded-full`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Quote Counter and Status */}
          <div className="flex justify-between items-center text-xs">
            <span className={`${styles.text} opacity-70`}>
              Quote {currentIndex + 1} of {quotes.length}
            </span>
            
            {isPaused && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`${styles.accent} flex items-center space-x-1`}
              >
                <span>⏸️</span>
                <span>Paused</span>
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Export as TopQuotes for compatibility
export function TopQuotes(props: Omit<OrderedQuotesProps, 'position'>) {
  return <OrderedQuotes {...props} />
}

export function BottomQuotes(props: Omit<OrderedQuotesProps, 'position'>) {
  return <OrderedQuotes {...props} />
}

export function FloatingQuotes(props: Omit<OrderedQuotesProps, 'position'>) {
  return <OrderedQuotes {...props} />
}
