'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { 
  Code, 
  Shield, 
  Brain, 
  Lightbulb, 
  Sparkles, 
  Zap, 
  Cpu, 
  Database,
  Globe,
  Rocket,
  Star,
  Heart,
  Eye,
  Target,
  Award,
  TrendingUp
} from 'lucide-react'

interface AnimatedIconProps {
  icon: ReactNode
  animation?: 'float' | 'pulse' | 'rotate' | 'bounce' | 'glow' | 'morph' | 'shake' | 'swing'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'
  className?: string
}

export function AnimatedIcon({ 
  icon, 
  animation = 'float',
  size = 'md',
  color = 'primary',
  className = ''
}: AnimatedIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'text-primary-600',
    secondary: 'text-slate-600',
    accent: 'text-accent-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  const getAnimationProps = () => {
    switch (animation) {
      case 'float':
        return {
          animate: { y: [-5, 5, -5] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      case 'pulse':
        return {
          animate: { scale: [1, 1.2, 1] },
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      case 'rotate':
        return {
          animate: { rotate: [0, 360] },
          transition: { duration: 4, repeat: Infinity, ease: "linear" }
        }
      case 'bounce':
        return {
          animate: { y: [0, -10, 0] },
          transition: { duration: 1, repeat: Infinity, ease: "easeOut" }
        }
      case 'glow':
        return {
          animate: { 
            filter: [
              'drop-shadow(0 0 5px currentColor)',
              'drop-shadow(0 0 15px currentColor)',
              'drop-shadow(0 0 5px currentColor)'
            ]
          },
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      case 'morph':
        return {
          animate: { 
            scale: [1, 1.1, 0.9, 1.05, 1],
            rotate: [0, 5, -5, 2, 0]
          },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      case 'shake':
        return {
          animate: { x: [-2, 2, -2, 2, 0] },
          transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
        }
      case 'swing':
        return {
          animate: { rotate: [-10, 10, -10] },
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      className={`inline-block ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      {...getAnimationProps()}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.div>
  )
}

// Predefined animated icons for common use cases
export const AnimatedCodeIcon = (props: Omit<AnimatedIconProps, 'icon'>) => (
  <AnimatedIcon icon={<Code />} animation="pulse" color="primary" {...props} />
)

export const AnimatedShieldIcon = (props: Omit<AnimatedIconProps, 'icon'>) => (
  <AnimatedIcon icon={<Shield />} animation="glow" color="success" {...props} />
)

export const AnimatedBrainIcon = (props: Omit<AnimatedIconProps, 'icon'>) => (
  <AnimatedIcon icon={<Brain />} animation="morph" color="accent" {...props} />
)

export const AnimatedLightbulbIcon = (props: Omit<AnimatedIconProps, 'icon'>) => (
  <AnimatedIcon icon={<Lightbulb />} animation="bounce" color="warning" {...props} />
)

export const AnimatedSparklesIcon = (props: Omit<AnimatedIconProps, 'icon'>) => (
  <AnimatedIcon icon={<Sparkles />} animation="rotate" color="primary" {...props} />
)

// Icon constellation component
export function IconConstellation() {
  const icons = [
    { Icon: Code, position: { x: 10, y: 20 }, delay: 0 },
    { Icon: Shield, position: { x: 80, y: 15 }, delay: 0.5 },
    { Icon: Brain, position: { x: 15, y: 70 }, delay: 1 },
    { Icon: Lightbulb, position: { x: 85, y: 75 }, delay: 1.5 },
    { Icon: Cpu, position: { x: 50, y: 10 }, delay: 2 },
    { Icon: Database, position: { x: 45, y: 85 }, delay: 2.5 },
    { Icon: Globe, position: { x: 25, y: 45 }, delay: 3 },
    { Icon: Rocket, position: { x: 75, y: 50 }, delay: 3.5 }
  ]

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {icons.map(({ Icon, position, delay }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay, duration: 0.8 }}
        >
          <AnimatedIcon
            icon={<Icon />}
            animation={(['float', 'pulse', 'rotate'] as const)[index % 3]}
            size="lg"
            color={(['primary', 'accent', 'success'] as const)[index % 3]}
          />
        </motion.div>
      ))}
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {icons.map((_, index) => {
          if (index === icons.length - 1) return null
          const current = icons[index]
          const next = icons[index + 1]
          
          return (
            <motion.line
              key={`line-${index}`}
              x1={`${current.position.x}%`}
              y1={`${current.position.y}%`}
              x2={`${next.position.x}%`}
              y2={`${next.position.y}%`}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: current.delay + 0.5, duration: 1 }}
            />
          )
        })}
      </svg>
    </div>
  )
}

// Floating icons background
export function FloatingIconsBackground() {
  const backgroundIcons = [
    Code, Shield, Brain, Lightbulb, Sparkles, Zap, Cpu, Database,
    Globe, Rocket, Star, Heart, Eye, Target, Award, TrendingUp
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {backgroundIcons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          <Icon className="w-8 h-8 text-primary-600" />
        </motion.div>
      ))}
    </div>
  )
}

// Interactive icon grid
export function InteractiveIconGrid() {
  const gridIcons = [
    { Icon: Code, label: 'Development', color: 'primary' },
    { Icon: Shield, label: 'Security', color: 'success' },
    { Icon: Brain, label: 'AI/ML', color: 'accent' },
    { Icon: Lightbulb, label: 'Innovation', color: 'warning' },
    { Icon: Cpu, label: 'Systems', color: 'primary' },
    { Icon: Database, label: 'Data', color: 'secondary' },
    { Icon: Globe, label: 'Web', color: 'primary' },
    { Icon: Rocket, label: 'Performance', color: 'accent' }
  ]

  return (
    <div className="grid grid-cols-4 gap-6 max-w-md mx-auto">
      {gridIcons.map(({ Icon, label, color }, index) => (
        <motion.div
          key={label}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <AnimatedIcon
              icon={<Icon />}
              animation="pulse"
              size="lg"
              color={color as 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'}
              className="mx-auto mb-2"
            />
            <div className="text-xs font-medium text-slate-600">{label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
