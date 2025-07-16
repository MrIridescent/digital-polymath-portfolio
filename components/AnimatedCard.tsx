'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { cardHover } from '@/lib/animations'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  glowEffect?: boolean
  tiltEffect?: boolean
  scaleOnHover?: boolean
}

export function AnimatedCard({ 
  children, 
  className = '', 
  glowEffect = true,
  tiltEffect = true,
  scaleOnHover = true 
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect || !ref.current) return
    
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
  }

  return (
    <motion.div
      ref={ref}
      className={`relative group ${className}`}
      variants={scaleOnHover ? cardHover : undefined}
      initial="rest"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tiltEffect ? rotateX : 0,
        rotateY: tiltEffect ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 rounded-xl opacity-0 blur-lg"
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Card content */}
      <div 
        className="relative bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
        style={{ transform: "translateZ(50px)" }}
      >
        {children}
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          whileHover={{ translateX: "200%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  )
}

// Specialized card for skills/technologies
export function TechCard({
  icon: Icon,
  title,
  description,
  color = "primary"
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color?: "primary" | "accent" | "success" | "warning"
}) {
  const colorClasses = {
    primary: "from-primary-500 to-primary-600 text-white",
    accent: "from-accent-500 to-accent-600 text-white", 
    success: "from-green-500 to-green-600 text-white",
    warning: "from-orange-500 to-orange-600 text-white"
  }

  return (
    <AnimatedCard className="h-full">
      <div className="p-6 h-full flex flex-col">
        <motion.div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
        
        <motion.h3 
          className="text-lg font-semibold text-slate-900 mb-2"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-slate-600 flex-1"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>
      </div>
    </AnimatedCard>
  )
}

// Project showcase card with advanced animations
export function ProjectCard({
  title,
  description,
  image,
  tags,
  link
}: {
  title: string
  description: string
  image?: string
  tags: string[]
  link?: string
}) {
  return (
    <AnimatedCard className="h-full group">
      <div className="relative overflow-hidden">
        {image && (
          <motion.div
            className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-accent-600/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        )}
        
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold text-slate-900 mb-3"
            whileHover={{ color: "#2563eb" }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-slate-600 mb-4 leading-relaxed"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            variants={{
              hover: {
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            whileHover="hover"
          >
            {tags.map((tag) => (
              <motion.span
                key={tag}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                variants={{
                  hover: {
                    scale: 1.1,
                    backgroundColor: "#dbeafe",
                    transition: { duration: 0.2 }
                  }
                }}
                whileHover="hover"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
          
          {link && (
            <motion.a
              href={link}
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              View Project →
            </motion.a>
          )}
        </div>
      </div>
    </AnimatedCard>
  )
}
