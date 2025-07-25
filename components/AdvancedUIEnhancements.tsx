'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  Zap, 
  Brain, 
  Palette, 
  Monitor,
  Activity,
  Sparkles,
  Cpu,
  Eye,
  Layers
} from 'lucide-react'

interface AdvancedUIEnhancementsProps {
  currentTheme: any
}

export function AdvancedUIEnhancements({ currentTheme }: AdvancedUIEnhancementsProps) {
  const [showPanel, setShowPanel] = useState(false)
  const [uiMode, setUIMode] = useState<'standard' | 'kinetic' | 'immersive'>('kinetic')
  const [visualEffects, setVisualEffects] = useState(true)
  const [particleSystem, setParticleSystem] = useState(true)
  const [morphingEnabled, setMorphingEnabled] = useState(true)

  // Enhanced particle system
  const ParticleField = () => {
    if (!particleSystem) return null

    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-current rounded-full opacity-30"
            style={{
              color: currentTheme?.colors?.primary || '#00ffff',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    )
  }

  // Neural network visualization overlay
  const NeuralNetworkOverlay = () => {
    if (uiMode !== 'immersive') return null

    return (
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path 
                d="M 50 0 L 0 0 0 50" 
                fill="none" 
                stroke={currentTheme?.colors?.primary || '#00ffff'} 
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Neural connections */}
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * window.innerWidth}
              y1={Math.random() * window.innerHeight}
              x2={Math.random() * window.innerWidth}
              y2={Math.random() * window.innerHeight}
              stroke={currentTheme?.colors?.primary || '#00ffff'}
              strokeWidth="1"
              opacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: Math.random() * 5 + 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </svg>
      </div>
    )
  }

  // Holographic UI elements
  const HolographicElements = () => {
    if (!visualEffects) return null

    return (
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Corner decorations */}
        <div className="absolute top-4 left-4">
          <motion.div
            className="w-16 h-16 border-l-2 border-t-2 border-current opacity-60"
            style={{ borderColor: currentTheme?.colors?.primary || '#00ffff' }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        <div className="absolute top-4 right-4">
          <motion.div
            className="w-16 h-16 border-r-2 border-t-2 border-current opacity-60"
            style={{ borderColor: currentTheme?.colors?.primary || '#00ffff' }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        <div className="absolute bottom-4 left-4">
          <motion.div
            className="w-16 h-16 border-l-2 border-b-2 border-current opacity-60"
            style={{ borderColor: currentTheme?.colors?.primary || '#00ffff' }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="absolute bottom-4 right-4">
          <motion.div
            className="w-16 h-16 border-r-2 border-b-2 border-current opacity-60"
            style={{ borderColor: currentTheme?.colors?.primary || '#00ffff' }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </div>

        {/* Scanning lines */}
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-current opacity-40"
          style={{ backgroundColor: currentTheme?.colors?.primary || '#00ffff' }}
          animate={{
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    )
  }

  return (
    <>
      {/* Particle Field */}
      <ParticleField />
      
      {/* Neural Network Overlay */}
      <NeuralNetworkOverlay />
      
      {/* Holographic Elements */}
      <HolographicElements />

      {/* Control Panel Toggle */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-8 left-8 z-50 bg-black/90 border border-white/20 rounded-full p-4 backdrop-blur-md hover:border-white/40 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.button>

      {/* Advanced UI Control Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            className="fixed bottom-24 left-8 z-50 bg-black/95 border border-white/20 rounded-xl backdrop-blur-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-6 w-80">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg font-mono">
                  Advanced UI
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-purple-400 text-xs font-mono">ENHANCED</span>
                </div>
              </div>

              {/* UI Mode Selection */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 text-sm">UI Mode</h4>
                <div className="space-y-2">
                  {[
                    { id: 'standard', name: 'Standard', icon: Monitor, desc: 'Clean, minimal interface' },
                    { id: 'kinetic', name: 'Kinetic', icon: Activity, desc: 'Dynamic animations and effects' },
                    { id: 'immersive', name: 'Immersive', icon: Eye, desc: 'Full neural network overlay' }
                  ].map((mode) => {
                    const Icon = mode.icon
                    const isActive = uiMode === mode.id
                    
                    return (
                      <motion.button
                        key={mode.id}
                        onClick={() => setUIMode(mode.id as any)}
                        className={`
                          w-full p-3 rounded-lg border transition-all text-left
                          ${isActive 
                            ? 'bg-purple-500/20 border-purple-500/30 text-purple-400' 
                            : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-gray-500'
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <Icon className="w-4 h-4" />
                          <span className="font-medium text-sm">{mode.name}</span>
                        </div>
                        <p className="text-xs opacity-70">{mode.desc}</p>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Visual Effects Toggles */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold text-sm">Visual Effects</h4>
                
                {[
                  { 
                    id: 'particles', 
                    name: 'Particle System', 
                    value: particleSystem, 
                    setter: setParticleSystem,
                    icon: Sparkles 
                  },
                  { 
                    id: 'effects', 
                    name: 'Holographic UI', 
                    value: visualEffects, 
                    setter: setVisualEffects,
                    icon: Layers 
                  },
                  { 
                    id: 'morphing', 
                    name: 'Layout Morphing', 
                    value: morphingEnabled, 
                    setter: setMorphingEnabled,
                    icon: Cpu 
                  }
                ].map((toggle) => {
                  const Icon = toggle.icon
                  
                  return (
                    <div key={toggle.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-gray-400" />
                        <span className="text-white text-sm">{toggle.name}</span>
                      </div>
                      <motion.button
                        onClick={() => toggle.setter(!toggle.value)}
                        className={`
                          relative w-12 h-6 rounded-full transition-colors
                          ${toggle.value ? 'bg-purple-500' : 'bg-gray-600'}
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full"
                          animate={{
                            left: toggle.value ? '1.5rem' : '0.25rem'
                          }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="text-center text-xs text-gray-500 font-mono">
                  Advanced UI System v1.0
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
