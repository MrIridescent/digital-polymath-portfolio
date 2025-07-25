'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProfileImage } from './ProfileImage'
import { ThemeVariant } from '@/lib/DynamicThemeEngine'
import { 
  User, 
  Code, 
  Brain, 
  Target, 
  Zap,
  Star,
  Award,
  TrendingUp
} from 'lucide-react'

interface KineticCardProps {
  currentTheme?: ThemeVariant | null
  morphingState?: any
}

interface CardPosition {
  x: number
  y: number
  scale: number
  rotation: number
  zIndex: number
}

interface KineticCard {
  id: string
  type: 'profile' | 'skills' | 'projects' | 'stats' | 'quotes'
  content: any
  position: CardPosition
  isVisible: boolean
}

export function KineticCardSystem({ currentTheme, morphingState }: KineticCardProps) {
  const [cards, setCards] = useState<KineticCard[]>([])
  const [layoutMode, setLayoutMode] = useState('mode1')

  // Initialize cards
  useEffect(() => {
    const initialCards: KineticCard[] = [
      {
        id: 'profile',
        type: 'profile',
        content: { name: 'David Akpoviroro OKE', title: 'Polymathic Developer' },
        position: { x: 20, y: 20, scale: 1, rotation: 0, zIndex: 10 },
        isVisible: true
      },
      {
        id: 'skills',
        type: 'skills',
        content: { 
          title: 'Core Skills',
          skills: ['React/Next.js', 'Python/AI', 'Cybersecurity', 'Cloud Architecture']
        },
        position: { x: 60, y: 30, scale: 0.9, rotation: 2, zIndex: 8 },
        isVisible: true
      },
      {
        id: 'projects',
        type: 'projects',
        content: {
          title: 'Featured Project',
          name: 'AI-Powered Security Platform',
          tech: 'Python, TensorFlow, AWS'
        },
        position: { x: 30, y: 60, scale: 0.95, rotation: -1, zIndex: 9 },
        isVisible: true
      },
      {
        id: 'stats',
        type: 'stats',
        content: {
          experience: '20+ Years',
          projects: '100+ Projects',
          technologies: '50+ Technologies'
        },
        position: { x: 70, y: 70, scale: 0.8, rotation: 3, zIndex: 7 },
        isVisible: true
      }
    ]
    setCards(initialCards)
  }, [])

  // Morph cards when morphing state changes
  useEffect(() => {
    if (!morphingState) return

    const newLayoutMode = `mode${Math.floor(Math.random() * 4) + 1}`
    setLayoutMode(newLayoutMode)
    morphCards(newLayoutMode)
  }, [morphingState])

  const morphCards = (mode: string) => {
    setCards(prevCards => 
      prevCards.map(card => {
        let newPosition: CardPosition

        switch (mode) {
          case 'mode1': // Top-right focus
            newPosition = getMode1Position(card.type)
            break
          case 'mode2': // Left sidebar
            newPosition = getMode2Position(card.type)
            break
          case 'mode3': // Center grid
            newPosition = getMode3Position(card.type)
            break
          case 'mode4': // Floating scattered
            newPosition = getMode4Position(card.type)
            break
          default:
            newPosition = card.position
        }

        return {
          ...card,
          position: newPosition
        }
      })
    )
  }

  const getMode1Position = (type: string): CardPosition => {
    switch (type) {
      case 'profile':
        return { x: 75, y: 15, scale: 1.1, rotation: 0, zIndex: 15 }
      case 'skills':
        return { x: 10, y: 40, scale: 0.9, rotation: -2, zIndex: 10 }
      case 'projects':
        return { x: 45, y: 65, scale: 1, rotation: 1, zIndex: 12 }
      case 'stats':
        return { x: 80, y: 75, scale: 0.8, rotation: 3, zIndex: 8 }
      default:
        return { x: 50, y: 50, scale: 1, rotation: 0, zIndex: 5 }
    }
  }

  const getMode2Position = (type: string): CardPosition => {
    switch (type) {
      case 'profile':
        return { x: 5, y: 25, scale: 0.9, rotation: -1, zIndex: 12 }
      case 'skills':
        return { x: 70, y: 20, scale: 1, rotation: 2, zIndex: 15 }
      case 'projects':
        return { x: 85, y: 60, scale: 0.95, rotation: -2, zIndex: 10 }
      case 'stats':
        return { x: 25, y: 80, scale: 0.85, rotation: 1, zIndex: 8 }
      default:
        return { x: 50, y: 50, scale: 1, rotation: 0, zIndex: 5 }
    }
  }

  const getMode3Position = (type: string): CardPosition => {
    switch (type) {
      case 'profile':
        return { x: 50, y: 10, scale: 1.2, rotation: 0, zIndex: 20 }
      case 'skills':
        return { x: 20, y: 70, scale: 0.9, rotation: -3, zIndex: 12 }
      case 'projects':
        return { x: 80, y: 70, scale: 0.9, rotation: 3, zIndex: 12 }
      case 'stats':
        return { x: 50, y: 85, scale: 0.8, rotation: 0, zIndex: 10 }
      default:
        return { x: 50, y: 50, scale: 1, rotation: 0, zIndex: 5 }
    }
  }

  const getMode4Position = (type: string): CardPosition => {
    switch (type) {
      case 'profile':
        return { x: 85, y: 40, scale: 1, rotation: 5, zIndex: 15 }
      case 'skills':
        return { x: 15, y: 15, scale: 0.95, rotation: -5, zIndex: 12 }
      case 'projects':
        return { x: 25, y: 55, scale: 1.05, rotation: 2, zIndex: 18 }
      case 'stats':
        return { x: 65, y: 80, scale: 0.85, rotation: -3, zIndex: 10 }
      default:
        return { x: 50, y: 50, scale: 1, rotation: 0, zIndex: 5 }
    }
  }

  const renderCard = (card: KineticCard) => {
    const baseClasses = "absolute bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl"
    
    switch (card.type) {
      case 'profile':
        return (
          <div className={`${baseClasses} w-80 h-96`}>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <ProfileImage size="lg" effect="polymath" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {card.content.name}
              </h3>
              <p className="text-blue-300 font-medium">
                {card.content.title}
              </p>
              <div className="mt-4 flex justify-center space-x-2">
                <User className="w-5 h-5 text-purple-400" />
                <Code className="w-5 h-5 text-blue-400" />
                <Brain className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>
        )

      case 'skills':
        return (
          <div className={`${baseClasses} w-72 h-80`}>
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">
                {card.content.title}
              </h3>
            </div>
            <div className="space-y-3">
              {card.content.skills.map((skill: string, index: number) => (
                <motion.div
                  key={skill}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-gray-200 text-sm">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'projects':
        return (
          <div className={`${baseClasses} w-80 h-64`}>
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-bold text-white">
                {card.content.title}
              </h3>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">
                {card.content.name}
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Advanced AI-powered cybersecurity platform with real-time threat detection
              </p>
              <div className="flex flex-wrap gap-2">
                {card.content.tech.split(', ').map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )

      case 'stats':
        return (
          <div className={`${baseClasses} w-64 h-56`}>
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Stats</h3>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {card.content.experience}
                </div>
                <div className="text-xs text-gray-400">Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {card.content.projects}
                </div>
                <div className="text-xs text-gray-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {card.content.technologies}
                </div>
                <div className="text-xs text-gray-400">Mastered</div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      <AnimatePresence>
        {cards.map(card => (
          <motion.div
            key={card.id}
            className="pointer-events-auto"
            initial={{ 
              x: `${card.position.x}vw`, 
              y: `${card.position.y}vh`,
              scale: card.position.scale,
              rotate: card.position.rotation,
              opacity: 0
            }}
            animate={{ 
              x: `${card.position.x}vw`, 
              y: `${card.position.y}vh`,
              scale: card.position.scale,
              rotate: card.position.rotation,
              opacity: card.isVisible ? 1 : 0
            }}
            transition={{
              duration: 2,
              ease: [0.23, 1, 0.32, 1], // Smoother easing
              type: "spring",
              stiffness: 120,
              damping: 25,
              mass: 0.8
            }}
            style={{ zIndex: card.position.zIndex }}
            whileHover={{ 
              scale: card.position.scale * 1.05,
              transition: { duration: 0.3 }
            }}
          >
            {renderCard(card)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
