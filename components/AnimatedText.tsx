'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  type?: 'typewriter' | 'reveal' | 'wave' | 'glitch'
}

export function AnimatedText({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.05,
  type = 'reveal'
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const words = text.split(' ')
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i }
    })
  }
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

  if (type === 'typewriter') {
    return <TypewriterText text={text} className={className} />
  }

  if (type === 'wave') {
    return <WaveText text={text} className={className} />
  }
  
  if (type === 'glitch') {
    return <GlitchText text={text} className={className} />
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

function TypewriterText({ text, className }: { text: string, className?: string }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [currentIndex, text, isInView])

  return (
    <div ref={ref} className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-primary-600 ml-1"
      />
    </div>
  )
}

function WaveText({ text, className }: { text: string, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const letters = text.split('')

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.05, delayChildren: 0 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
              }
            }
          }}
          whileHover={{
            y: -10,
            color: "#2563eb",
            transition: { duration: 0.2 }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

function GlitchText({ text, className }: { text: string, className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsGlitching(true)}
      onHoverEnd={() => setIsGlitching(false)}
    >
      <span className="relative z-10">{text}</span>
      
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
            {text}
          </motion.span>
          
          <motion.span
            className="absolute top-0 left-0 text-blue-500 opacity-70"
            animate={{
              x: [0, 2, -2, 0],
              y: [0, -1, 1, 0]
            }}
            transition={{ duration: 0.2, repeat: 3, delay: 0.1 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </motion.div>
  )
}

// Gradient text with animation
export function GradientText({ 
  children, 
  className = '',
  animate = true 
}: { 
  children: React.ReactNode
  className?: string
  animate?: boolean
}) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent ${animate ? 'bg-[length:200%_100%]' : ''} ${className}`}
      animate={animate ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      } : {}}
      transition={animate ? {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      } : {}}
    >
      {children}
    </motion.span>
  )
}

// Morphing text effect
export function MorphingText({ 
  texts, 
  className = '',
  interval = 3000 
}: { 
  texts: string[]
  className?: string
  interval?: number
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <div className={`relative ${className}`}>
      {texts.map((text, index) => (
        <motion.span
          key={text}
          className="absolute inset-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : -20
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      ))}
      {/* Spacer for layout */}
      <span className="opacity-0">{texts[0]}</span>
    </div>
  )
}
