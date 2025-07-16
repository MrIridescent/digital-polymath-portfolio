'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface SpectacularTextProps {
  children: string
  className?: string
  effect?: 'neon' | 'hologram' | 'matrix' | 'fire' | 'electric' | 'rainbow' | 'renaissance' | 'plasma'
  delay?: number
}

export function SpectacularText({ 
  children, 
  className = '', 
  effect = 'neon',
  delay = 0 
}: SpectacularTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const letters = children.split('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      scale: 0.5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
  }

  const getEffectStyles = () => {
    switch (effect) {
      case 'neon':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]'
      case 'hologram':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600'
      case 'matrix':
        return 'text-green-400 font-mono'
      case 'fire':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500'
      case 'electric':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'
      case 'rainbow':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500'
      case 'renaissance':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600'
      case 'plasma':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-500'
      default:
        return 'text-slate-900'
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={`inline-block ${getEffectStyles()}`}
          variants={letterVariants}
          whileHover={{
            scale: 1.2,
            y: -10,
            transition: { type: "spring", stiffness: 300 }
          }}
          style={{
            filter: effect === 'neon' ? 'drop-shadow(0 0 10px currentColor)' : 'none'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Typewriter effect with spectacular styling
export function TypewriterSpectacular({ 
  text, 
  className = '',
  speed = 100 
}: { 
  text: string
  className?: string
  speed?: number 
}) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <div className={`font-mono ${className}`}>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        {displayText}
      </span>
      <motion.span
        className="inline-block w-0.5 h-6 bg-green-400 ml-1"
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}

// Matrix rain effect
export function MatrixRain() {
  const [drops, setDrops] = useState<Array<{ id: number, x: number, chars: string[] }>>([])

  useEffect(() => {
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    const createDrop = (id: number) => ({
      id,
      x: Math.random() * 100,
      chars: Array.from({ length: 20 }, () => 
        characters[Math.floor(Math.random() * characters.length)]
      )
    })

    const initialDrops = Array.from({ length: 15 }, (_, i) => createDrop(i))
    setDrops(initialDrops)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute text-green-400 font-mono text-sm"
          style={{ left: `${drop.x}%` }}
          animate={{
            y: ['-100vh', '100vh']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        >
          {drop.chars.map((char, index) => (
            <motion.div
              key={index}
              className="block"
              animate={{
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: index * 0.1
              }}
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

// Glitch text effect
export function GlitchText({ 
  children, 
  className = '' 
}: { 
  children: string
  className?: string 
}) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-red-500 opacity-70"
            animate={{
              x: [0, -2, 2, 0],
              y: [0, 1, -1, 0]
            }}
            transition={{ duration: 0.2, repeat: 3 }}
          >
            {children}
          </motion.span>
          
          <motion.span
            className="absolute top-0 left-0 text-blue-500 opacity-70"
            animate={{
              x: [0, 2, -2, 0],
              y: [0, -1, 1, 0]
            }}
            transition={{ duration: 0.2, repeat: 3, delay: 0.1 }}
          >
            {children}
          </motion.span>
          
          <motion.span
            className="absolute top-0 left-0 text-green-500 opacity-70"
            animate={{
              x: [0, 1, -1, 0],
              y: [0, 2, -2, 0]
            }}
            transition={{ duration: 0.2, repeat: 3, delay: 0.05 }}
          >
            {children}
          </motion.span>
        </>
      )}
    </div>
  )
}
