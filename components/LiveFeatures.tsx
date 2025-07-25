'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContentExtractor } from '@/lib/ContentExtractor'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'
import { 
  Brain, 
  Code, 
  Shield, 
  Cpu, 
  Zap, 
  Target,
  Layers,
  GitBranch,
  Database,
  Cloud
} from 'lucide-react'

interface LiveFeaturesProps {
  currentTheme?: ThemeVariant | null
}

export function LiveFeatures({ currentTheme }: LiveFeaturesProps) {
  const [features, setFeatures] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [philosophies, setPhilosophies] = useState<string[]>([])
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)
  const [currentPhilosophyIndex, setCurrentPhilosophyIndex] = useState(0)

  useEffect(() => {
    const contentExtractor = ContentExtractor.getInstance()
    setFeatures(contentExtractor.getFeatures())
    setSkills(contentExtractor.getSkills())
    setPhilosophies(contentExtractor.getPhilosophies())
  }, [])

  // Rotate features every 8 seconds
  useEffect(() => {
    if (features.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [features.length])

  // Rotate philosophies every 12 seconds
  useEffect(() => {
    if (philosophies.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentPhilosophyIndex((prev) => (prev + 1) % philosophies.length)
    }, 12000)

    return () => clearInterval(interval)
  }, [philosophies.length])

  // Get theme-aware styling
  const getThemeStyles = () => {
    if (!currentTheme) return {
      bg: 'bg-white/90',
      text: 'text-gray-900',
      accent: 'text-blue-600',
      border: 'border-gray-200'
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
      case 'organic':
        return {
          bg: 'bg-white/90',
          text: 'text-green-800',
          accent: 'text-green-600',
          border: 'border-green-200/50'
        }
      case 'retro':
        return {
          bg: 'bg-purple-900/90',
          text: 'text-pink-200',
          accent: 'text-pink-400',
          border: 'border-pink-500/30'
        }
      case 'futuristic':
        return {
          bg: 'bg-slate-900/90',
          text: 'text-blue-200',
          accent: 'text-blue-400',
          border: 'border-blue-500/30'
        }
      case 'artistic':
        return {
          bg: 'bg-white/90',
          text: 'text-purple-800',
          accent: 'text-purple-600',
          border: 'border-purple-200/50'
        }
      default:
        return {
          bg: 'bg-white/90',
          text: 'text-gray-900',
          accent: 'text-blue-600',
          border: 'border-gray-200'
        }
    }
  }

  const styles = getThemeStyles()

  // Get icon for skill
  const getSkillIcon = (skill: string) => {
    if (skill.includes('React') || skill.includes('Next')) return Code
    if (skill.includes('Cybersecurity') || skill.includes('Security')) return Shield
    if (skill.includes('AI') || skill.includes('ML')) return Brain
    if (skill.includes('Cloud')) return Cloud
    if (skill.includes('Database')) return Database
    if (skill.includes('Docker') || skill.includes('Kubernetes')) return Layers
    if (skill.includes('API') || skill.includes('microservices')) return GitBranch
    return Cpu
  }

  return (
    <div className="space-y-8">
      {/* Live Feature Showcase */}
      <motion.section
        className={`${styles.bg} ${styles.border} border rounded-xl p-6 backdrop-blur-md`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Target className={`w-6 h-6 ${styles.accent}`} />
          </motion.div>
          <h3 className={`text-xl font-bold ${styles.text}`}>
            Live Feature Showcase
          </h3>
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeatureIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`${styles.text} text-lg leading-relaxed`}
          >
            {features[currentFeatureIndex]}
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="mt-4 flex space-x-1">
          {features.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full ${
                index === currentFeatureIndex ? styles.accent : 'bg-gray-300'
              }`}
              initial={{ width: 8 }}
              animate={{ 
                width: index === currentFeatureIndex ? 24 : 8,
                backgroundColor: index === currentFeatureIndex ? currentTheme?.colors?.primary : '#d1d5db'
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.section>

      {/* Live Skills Grid */}
      <motion.section
        className={`${styles.bg} ${styles.border} border rounded-xl p-6 backdrop-blur-md`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Zap className={`w-6 h-6 ${styles.accent}`} />
          </motion.div>
          <h3 className={`text-xl font-bold ${styles.text}`}>
            Live Skills Matrix
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.slice(0, 6).map((skill, index) => {
            const Icon = getSkillIcon(skill)
            
            return (
              <motion.div
                key={skill}
                className={`flex items-center space-x-3 p-3 rounded-lg ${styles.border} border bg-white/5`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                >
                  <Icon className={`w-5 h-5 ${styles.accent}`} />
                </motion.div>
                <span className={`${styles.text} text-sm font-medium`}>
                  {skill}
                </span>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Live Philosophy */}
      <motion.section
        className={`${styles.bg} ${styles.border} border rounded-xl p-6 backdrop-blur-md`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Brain className={`w-6 h-6 ${styles.accent}`} />
          </motion.div>
          <h3 className={`text-xl font-bold ${styles.text}`}>
            Polymathic Philosophy
          </h3>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhilosophyIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`${styles.text} leading-relaxed`}
          >
            {philosophies[currentPhilosophyIndex]}
          </motion.div>
        </AnimatePresence>

        {/* Philosophy progress */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs opacity-60">
            <span className={styles.text}>Philosophy {currentPhilosophyIndex + 1} of {philosophies.length}</span>
            <motion.div
              className={`w-16 h-1 ${styles.border} border rounded-full overflow-hidden`}
            >
              <motion.div
                className={`h-full ${styles.accent} bg-current`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 12, ease: "linear" }}
                key={currentPhilosophyIndex}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
