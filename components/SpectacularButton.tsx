'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface SpectacularButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'neon' | 'hologram' | 'plasma' | 'quantum' | 'magnetic'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: ReactNode
}

export function SpectacularButton({
  children,
  onClick,
  href,
  variant = 'neon',
  size = 'md',
  className = '',
  icon
}: SpectacularButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'neon':
        return {
          base: 'bg-transparent border-2 border-cyan-400 text-cyan-400 font-semibold',
          glow: 'shadow-[0_0_20px_rgba(6,182,212,0.5)]'
        }
      case 'hologram':
        return {
          base: 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/50 text-white font-semibold',
          glow: 'shadow-[0_0_30px_rgba(139,92,246,0.6)]'
        }
      case 'plasma':
        return {
          base: 'bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold',
          glow: 'shadow-[0_0_25px_rgba(236,72,153,0.7)]'
        }
      case 'quantum':
        return {
          base: 'bg-black border border-green-400 text-green-400 font-mono',
          glow: 'shadow-[0_0_15px_rgba(34,197,94,0.5)]'
        }
      case 'magnetic':
        return {
          base: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold',
          glow: 'shadow-[0_0_20px_rgba(99,102,241,0.6)]'
        }
      default:
        return {
          base: 'bg-primary-600 text-white font-semibold',
          glow: 'shadow-lg'
        }
    }
  }

  const styles = getVariantStyles()

  const ButtonContent = () => (
    <motion.button
      className={`
        relative overflow-hidden rounded-lg transition-all duration-300
        ${styles.base} ${sizeClasses[size]} ${className}
        ${isHovered ? styles.glow : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated background effects */}
      {variant === 'neon' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: [
              'linear-gradient(45deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
              'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2), rgba(6,182,212,0.2))',
              'linear-gradient(225deg, rgba(236,72,153,0.2), rgba(6,182,212,0.2), rgba(59,130,246,0.2))',
              'linear-gradient(315deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2), rgba(6,182,212,0.2))'
            ]
          }}
          transition={{
            opacity: { duration: 0.3 },
            background: { duration: 2, repeat: Infinity }
          }}
        />
      )}

      {variant === 'hologram' && (
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3))',
              'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(139,92,246,0.3))'
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}

      {variant === 'plasma' && (
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(236,72,153,0.8), rgba(251,146,60,0.8))',
              'radial-gradient(circle at 100% 100%, rgba(251,146,60,0.8), rgba(236,72,153,0.8))',
              'radial-gradient(circle at 0% 100%, rgba(236,72,153,0.8), rgba(251,146,60,0.8))',
              'radial-gradient(circle at 100% 0%, rgba(251,146,60,0.8), rgba(236,72,153,0.8))'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={{
          translateX: isHovered ? "200%" : "-100%"
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && (
          <motion.span
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.span>
        )}
        {children}
      </span>

      {/* Particle effects for quantum variant */}
      {variant === 'quantum' && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        <ButtonContent />
      </a>
    )
  }

  return <ButtonContent />
}

// Floating Action Button with spectacular effects
export function FloatingButton({
  children,
  onClick,
  className = ''
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <motion.button
      className={`
        fixed bottom-8 right-8 w-16 h-16 rounded-full
        bg-gradient-to-r from-purple-600 to-pink-600 text-white
        shadow-lg hover:shadow-2xl transition-all duration-300
        flex items-center justify-center z-50
        ${className}
      `}
      onClick={onClick}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)"
      }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-purple-400"
        animate={{
          scale: [1, 1.5, 2],
          opacity: [0.5, 0.2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
