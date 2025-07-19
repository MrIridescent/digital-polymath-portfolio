'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface ProfileImageProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  effect?: 'hologram' | 'neon' | 'quantum' | 'renaissance' | 'polymath'
  className?: string
}

export function ProfileImage({ 
  src = '/profile-placeholder.jpg', 
  alt = 'David Akpoviroro OKE - The Creative Renaissance Man',
  size = 'lg',
  effect = 'renaissance',
  className = ''
}: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  }

  const getEffectStyles = () => {
    switch (effect) {
      case 'hologram':
        return 'border-4 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.6)]'
      case 'neon':
        return 'border-4 border-pink-400/50 shadow-[0_0_30px_rgba(236,72,153,0.6)]'
      case 'quantum':
        return 'border-4 border-green-400/50 shadow-[0_0_30px_rgba(34,197,94,0.6)]'
      case 'renaissance':
        return 'border-4 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.6)]'
      case 'polymath':
        return 'border-4 border-purple-400/50 shadow-[0_0_30px_rgba(139,92,246,0.6)]'
      default:
        return 'border-4 border-primary-400/50'
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Animated rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className={`w-full h-full rounded-full border-2 ${
          effect === 'hologram' ? 'border-cyan-400/30' :
          effect === 'neon' ? 'border-pink-400/30' :
          effect === 'quantum' ? 'border-green-400/30' :
          effect === 'renaissance' ? 'border-amber-400/30' :
          'border-purple-400/30'
        }`} />
      </motion.div>

      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className={`w-full h-full rounded-full border ${
          effect === 'hologram' ? 'border-cyan-400/20' :
          effect === 'neon' ? 'border-pink-400/20' :
          effect === 'quantum' ? 'border-green-400/20' :
          effect === 'renaissance' ? 'border-amber-400/20' :
          'border-purple-400/20'
        }`} />
      </motion.div>

      {/* Main image container */}
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden ${getEffectStyles()}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Animated background for placeholder */}
        {imageError && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-500 via-accent-500 to-purple-500"
            animate={{
              background: [
                'linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6)',
                'linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)',
                'linear-gradient(225deg, #ec4899, #f97316, #3b82f6)',
                'linear-gradient(315deg, #f97316, #3b82f6, #8b5cf6)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}

        {/* Profile Image */}
        {!imageError ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            priority={size === 'xl'}
            quality={90}
            sizes="(max-width: 768px) 200px, 300px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white font-bold text-2xl">
            <span className="text-center">
              MR.<br/>IRIDESCENT
            </span>
          </div>
        )}

        {/* Overlay effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
          animate={{
            translateX: isHovered ? "200%" : "-100%"
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Floating particles for special effects */}
        {(effect === 'quantum' || effect === 'polymath') && isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  effect === 'quantum' ? 'bg-green-400' : 'bg-purple-400'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -20, 0],
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
      </motion.div>

      {/* Professional title overlay */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-xs font-medium">
          The Creative Renaissance Man
        </div>
      </motion.div>
    </div>
  )
}

// Floating profile card component
export function FloatingProfileCard() {
  return (
    <motion.div
      className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <ProfileImage size="sm" effect="polymath" />
      <div className="mt-2 text-center">
        <div className="text-sm font-semibold text-white">David A. OKE</div>
        <div className="text-xs text-white/80">Digital Polymath</div>
      </div>
    </motion.div>
  )
}
