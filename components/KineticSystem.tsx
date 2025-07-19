'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// Kinetic Philosophy: "Motion with Purpose" - Every animation serves intentionality

interface KineticContainerProps {
  children: React.ReactNode
  variant?: 'flow' | 'pulse' | 'magnetic' | 'orbital' | 'quantum'
  intensity?: 'subtle' | 'medium' | 'dynamic'
  className?: string
}

export function KineticContainer({ 
  children, 
  variant = 'flow', 
  intensity = 'medium',
  className = '' 
}: KineticContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const { scrollYProgress } = useScroll()
  
  // Kinetic transformations based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  const getVariantAnimation = () => {
    const intensityMultiplier = {
      subtle: 0.5,
      medium: 1,
      dynamic: 1.5
    }[intensity]

    switch (variant) {
      case 'pulse':
        return {
          scale: isInView ? [1, 1.02, 1] : 1,
          transition: {
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        }
      
      case 'magnetic':
        return {
          x: isInView ? [0, 5 * intensityMultiplier, -5 * intensityMultiplier, 0] : 0,
          y: isInView ? [0, -3 * intensityMultiplier, 3 * intensityMultiplier, 0] : 0,
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      
      case 'orbital':
        return {
          rotate: isInView ? 360 : 0,
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }
        }
      
      case 'quantum':
        return {
          opacity: isInView ? [1, 0.7, 1, 0.9, 1] : 1,
          scale: isInView ? [1, 1.01, 0.99, 1.005, 1] : 1,
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      
      default: // flow
        return {
          y: isInView ? [0, -10 * intensityMultiplier, 0] : 0,
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
    }
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      animate={getVariantAnimation()}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface KineticTextProps {
  children: React.ReactNode
  variant?: 'typewriter' | 'wave' | 'glitch' | 'matrix' | 'hologram'
  speed?: 'slow' | 'medium' | 'fast'
  className?: string
}

export function KineticText({ 
  children, 
  variant = 'wave', 
  speed = 'medium',
  className = '' 
}: KineticTextProps) {
  const [displayText, setDisplayText] = useState('')
  const text = typeof children === 'string' ? children : ''
  
  const speedConfig = {
    slow: 150,
    medium: 100,
    fast: 50
  }

  useEffect(() => {
    if (variant === 'typewriter') {
      let i = 0
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(timer)
        }
      }, speedConfig[speed])
      
      return () => clearInterval(timer)
    }
  }, [text, variant, speed])

  if (variant === 'typewriter') {
    return (
      <span className={className}>
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-current ml-1"
        />
      </span>
    )
  }

  if (variant === 'wave') {
    return (
      <span className={className}>
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    )
  }

  if (variant === 'glitch') {
    return (
      <motion.span
        className={className}
        animate={{
          x: [0, -2, 2, 0],
          textShadow: [
            '0 0 0 transparent',
            '2px 0 0 #ff0000, -2px 0 0 #00ffff',
            '0 0 0 transparent'
          ]
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        {children}
      </motion.span>
    )
  }

  if (variant === 'matrix') {
    return (
      <motion.span
        className={className}
        animate={{
          color: ['#00ff00', '#ffffff', '#00ff00'],
          textShadow: [
            '0 0 5px #00ff00',
            '0 0 10px #00ff00, 0 0 20px #00ff00',
            '0 0 5px #00ff00'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.span>
    )
  }

  if (variant === 'hologram') {
    return (
      <motion.span
        className={className}
        animate={{
          opacity: [0.8, 1, 0.9, 1],
          background: [
            'linear-gradient(45deg, #00ffff, #ff00ff)',
            'linear-gradient(45deg, #ff00ff, #ffff00)',
            'linear-gradient(45deg, #ffff00, #00ffff)'
          ]
        }}
        style={{
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.span>
    )
  }

  return <span className={className}>{children}</span>
}

interface KineticBackgroundProps {
  variant?: 'particles' | 'waves' | 'grid' | 'neural' | 'quantum'
  intensity?: 'subtle' | 'medium' | 'dynamic'
  className?: string
}

export function KineticBackground({ 
  variant = 'particles', 
  intensity = 'medium',
  className = '' 
}: KineticBackgroundProps) {
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const particleCount = {
    subtle: 20,
    medium: 40,
    dynamic: 60
  }[intensity]

  if (variant === 'particles') {
    return (
      <div className={`fixed inset-0 pointer-events-none ${className}`}>
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'neural') {
    return (
      <div className={`fixed inset-0 pointer-events-none ${className}`}>
        <svg className="w-full h-full opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 100 + '%'}
              y1={Math.random() * 100 + '%'}
              x2={Math.random() * 100 + '%'}
              y2={Math.random() * 100 + '%'}
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                strokeWidth: [1, 2, 1]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="50%" stopColor="#ff00ff" />
              <stop offset="100%" stopColor="#ffff00" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  return null
}

interface KineticCardProps {
  children: React.ReactNode
  variant?: 'hover-lift' | 'magnetic' | 'tilt' | 'glow' | 'morph'
  className?: string
}

export function KineticCard({ 
  children, 
  variant = 'hover-lift',
  className = '' 
}: KineticCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    })
  }

  const getVariantProps = () => {
    switch (variant) {
      case 'magnetic':
        return {
          animate: isHovered ? {
            x: (mousePosition.x - 0.5) * 20,
            y: (mousePosition.y - 0.5) * 20,
            scale: 1.05
          } : { x: 0, y: 0, scale: 1 },
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }
      
      case 'tilt':
        return {
          animate: isHovered ? {
            rotateX: (mousePosition.y - 0.5) * 20,
            rotateY: (mousePosition.x - 0.5) * -20,
            scale: 1.02
          } : { rotateX: 0, rotateY: 0, scale: 1 },
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }
      
      case 'glow':
        return {
          animate: isHovered ? {
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(255, 0, 255, 0.3)',
            scale: 1.02
          } : {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            scale: 1
          },
          transition: { duration: 0.3 }
        }
      
      case 'morph':
        return {
          animate: isHovered ? {
            borderRadius: '20px',
            scale: 1.03,
            background: 'linear-gradient(45deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1))'
          } : {
            borderRadius: '8px',
            scale: 1,
            background: 'rgba(255,255,255,1)'
          },
          transition: { duration: 0.4, ease: "easeOut" }
        }
      
      default: // hover-lift
        return {
          whileHover: { y: -8, scale: 1.02 },
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    }
  }

  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      {...getVariantProps()}
    >
      {children}
    </motion.div>
  )
}
