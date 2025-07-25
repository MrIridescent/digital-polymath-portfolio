'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ProfileImage } from './ProfileImage'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'
import {
  User,
  Code,
  Brain,
  Target,
  Zap,
  Star,
  Award,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react'

interface FixedPositionCardsProps {
  currentTheme?: ThemeVariant | null
}

export function FixedPositionCards({ currentTheme }: FixedPositionCardsProps) {
  const pathname = usePathname()
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(0)

  // Only show cards on home page
  const shouldShowCards = pathname === '/'

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let lastScrollY = 0
    let lastScrollTime = Date.now()

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const timeDiff = currentTime - lastScrollTime
      const scrollDiff = Math.abs(currentScrollY - lastScrollY)

      // Calculate scroll speed
      const speed = timeDiff > 0 ? scrollDiff / timeDiff : 0
      setScrollSpeed(speed)
      setScrollY(currentScrollY)
      setIsScrolling(true)

      lastScrollY = currentScrollY
      lastScrollTime = currentTime

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
        setScrollSpeed(0)
      }, 200) // Cards become visible again after 200ms of no scrolling
    }

    // Add multiple scroll event listeners for better detection
    const events = ['scroll', 'wheel', 'touchmove']
    events.forEach(event => {
      window.addEventListener(event, handleScroll, { passive: true })
    })

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleScroll)
      })
      clearTimeout(scrollTimeout)
    }
  }, [])

  // Calculate opacity based on scroll state - only disappear during active scrolling
  const cardOpacity = isScrolling ? 0 : 1 // Completely disappear only when actively scrolling
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  }

  const hoverVariants = {
    hover: { 
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  // Don't render cards if not on home page
  if (!shouldShowCards) {
    return null
  }

  return (
    <>
      {/* Profile Card - Far Right to avoid content blocking */}
      <motion.div
        className="fixed top-24 z-30 w-72 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl hidden xl:block"
        variants={cardVariants}
        initial="hidden"
        animate={{
          ...cardVariants.visible,
          opacity: cardOpacity
        }}
        whileHover="hover"
        {...hoverVariants}
        style={{
          right: '1rem', // Far right edge
          marginTop: '15px', // 15px top margin
          marginBottom: '15px', // 15px bottom margin
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <div className="text-center space-y-4">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <ProfileImage size="lg" effect="polymath" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pb-4 border-b border-white/10">
            <h3 className="text-2xl font-bold text-white">
              David Akpoviroro OKE
            </h3>
            <p className="text-blue-300 font-medium text-lg">
              Founder & Digital Product Architect
            </p>
            <p className="text-purple-300 text-sm mt-2">
              Deep Thinker • Abstract Conceptualizer • Futurist
            </p>
            <p className="text-cyan-300 text-xs mt-1">
              Digital Nomad • Remote-First Pioneer
            </p>
            <p className="text-green-300 text-xs mt-1">
              INTP/ENTP/INTJ • Enneagram Type 7
            </p>
          </div>

          <div className="flex justify-center space-x-4 py-3">
            <div className="flex items-center space-x-1 text-purple-400">
              <User className="w-5 h-5" />
              <span className="text-xs">Leader</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-400">
              <Code className="w-5 h-5" />
              <span className="text-xs">Developer</span>
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <Brain className="w-5 h-5" />
              <span className="text-xs">Innovator</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-300 bg-white/5 rounded-lg p-3">
            <MapPin className="w-4 h-4" />
            <span>Digital Renaissance Era</span>
          </div>
        </div>
      </motion.div>

      {/* Skills Card removed as requested - only profile image shows */}

      {/* Projects Card removed as requested */}

      {/* Stats/Achievements Card removed as requested - only profile image shows */}

      {/* Quote card removed to reduce clutter and improve readability */}
    </>
  )
}
