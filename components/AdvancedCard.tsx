'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef, useState } from 'react'

interface AdvancedCardProps {
  children: ReactNode
  className?: string
  effect?: 'hologram' | 'neon' | 'glass' | 'magnetic' | 'liquid' | 'quantum' | 'plasma' | 'renaissance'
}

export function AdvancedCard({ 
  children, 
  className = '', 
  effect = 'hologram' 
}: AdvancedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const getEffectStyles = () => {
    switch (effect) {
      case 'hologram':
        return 'bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-cyan-500/30'
      case 'neon':
        return 'bg-slate-900/90 border-pink-500/50'
      case 'glass':
        return 'bg-white/10 backdrop-blur-md border-white/20'
      case 'magnetic':
        return 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30'
      case 'liquid':
        return 'bg-gradient-to-br from-blue-500/10 to-green-500/10 border-blue-500/30'
      case 'quantum':
        return 'bg-black/90 border-green-500/50'
      case 'plasma':
        return 'bg-gradient-to-br from-pink-500/10 to-orange-500/10 border-pink-500/30'
      case 'renaissance':
        return 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-500/30'
      default:
        return 'bg-white border-slate-200'
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`relative group cursor-pointer ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 blur-lg"
        style={{
          background: effect === 'neon' 
            ? 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)'
            : 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)'
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main card */}
      <div 
        className={`relative rounded-xl border overflow-hidden ${getEffectStyles()}`}
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{
            translateX: isHovered ? "200%" : "-100%"
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Floating particles inside card */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Magnetic card that follows mouse
export function MagneticCard({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.1
    const deltaY = (e.clientY - centerY) * 0.1
    
    setMousePosition({ x: deltaX, y: deltaY })
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30 overflow-hidden"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Magnetic field visualization */}
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-purple-400/30 rounded-xl"
                animate={{
                  scale: [1, 1.1, 1.2],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        )}
        
        {children}
      </motion.div>
    </motion.div>
  )
}

// Liquid morphing card
export function LiquidCard({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        className="relative bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-blue-500/30 overflow-hidden"
        variants={{
          rest: { 
            borderRadius: "12px",
          },
          hover: { 
            borderRadius: ["12px", "20px", "8px", "16px", "12px"],
          }
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-green-400/20 to-blue-400/20"
          variants={{
            rest: { 
              scale: 1,
              rotate: 0,
            },
            hover: { 
              scale: [1, 1.1, 0.9, 1.05, 1],
              rotate: [0, 5, -5, 2, 0],
            }
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        />
        
        {children}
      </motion.div>
    </motion.div>
  )
}
