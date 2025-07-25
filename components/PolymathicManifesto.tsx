'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Brain, 
  Lightbulb, 
  Network, 
  Target, 
  Eye, 
  Puzzle, 
  Heart,
  Zap,
  Globe,
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { SpectacularText } from './SpectacularText'

interface ManifestoSection {
  id: string
  title: string
  icon: any
  content: string[]
  color: string
  expanded?: boolean
}

const manifestoSections: ManifestoSection[] = [
  {
    id: 'intersection-imperative',
    title: 'The Intersection Imperative',
    icon: Network,
    color: 'from-blue-500 to-purple-600',
    content: [
      'In an era of accelerating complexity, the most challenging problems emerge at the intersections of disciplines.',
      'The Digital Polymat specializes in these intersections, architecting solutions that transcend traditional boundaries between technology, creativity, security, and human experience.',
      'We reject the artificial silos that fragment knowledge. True innovation occurs when cybersecurity principles inform user experience design, when artistic sensibilities guide algorithmic architecture, and when philosophical frameworks shape technological implementation.'
    ]
  },
  {
    id: 'adaptive-intelligence',
    title: 'Adaptive Intelligence',
    icon: Brain,
    color: 'from-green-500 to-teal-600',
    content: [
      'The Digital Polymat cultivates cognitive flexibility—the ability to shift between analytical and creative modes, to think in systems while attending to details, to balance technical precision with humanistic wisdom.',
      'We embrace uncertainty as a creative force, using polymathic thinking to discover novel approaches at the convergence of multiple domains.',
      'Our intelligence adapts to context, drawing from diverse knowledge reservoirs to synthesize solutions that honor complexity while achieving elegant simplicity.'
    ]
  },
  {
    id: 'emergent-solutions',
    title: 'Emergent Problem-Solving',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-600',
    content: [
      'Complex challenges require emergent solutions that cannot be predetermined. We embrace uncertainty as a creative force, using polymathic thinking to discover novel approaches at the convergence of multiple domains.',
      'Our methodology involves contextual immersion, intersection analysis, polymathic architecture, and iterative synthesis.',
      'We locate convergence points between disciplines, apply cross-domain pattern recognition, and leverage analogical reasoning from disparate fields to generate breakthrough innovations.'
    ]
  },
  {
    id: 'ethical-leadership',
    title: 'Ethical Technology Leadership',
    icon: Shield,
    color: 'from-red-500 to-pink-600',
    content: [
      'With great technical capability comes the responsibility to consider broader implications. We integrate ethical reasoning, social awareness, and long-term thinking into every technological decision.',
      'Our solutions serve human flourishing, bridge technical and non-technical communities, and provide ethical leadership in emerging technology domains.',
      'We design technology that honors both technical excellence and human values, ensuring our innovations contribute to a more equitable and sustainable future.'
    ]
  },
  {
    id: 'continuous-renaissance',
    title: 'Continuous Renaissance',
    icon: Globe,
    color: 'from-purple-500 to-indigo-600',
    content: [
      'Learning never ends. The Digital Polymat maintains beginner\'s mind across multiple disciplines, constantly expanding the intersection points where breakthrough innovations emerge.',
      'We cultivate expertise across technical mastery, creative intelligence, strategic wisdom, and human-centered approaches.',
      'Our renaissance mindset drives continuous exploration, synthesis, and application of knowledge across traditional boundaries.'
    ]
  }
]

export function PolymathicManifesto() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['intersection-imperative'])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <div className="relative w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <SpectacularText
          effect="hologram"
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          The Polymathic Manifesto
        </SpectacularText>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
        >
          A Digital Renaissance for the Age of Complexity
        </motion.p>
      </motion.div>

      {/* Manifesto Sections */}
      <div className="space-y-6">
        {manifestoSections.map((section, index) => {
          const isExpanded = expandedSections.includes(section.id)
          const Icon = section.icon

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-white/50 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {section.title}
                    </h3>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </div>
              </button>

              {/* Section Content */}
              <motion.div
                initial={false}
                animate={{ 
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <motion.p
                        key={pIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: pIndex * 0.1 }}
                        className="text-gray-700 leading-relaxed"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-12 text-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold mb-4">Join the Digital Polymat Movement</h3>
        <p className="text-lg mb-6 opacity-90">
          Embrace the intersection. Transcend the boundaries. Create the future.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Intersection Specialist</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
            <Puzzle className="w-4 h-4" />
            <span className="text-sm font-medium">Complexity Navigator</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Human-Centered Technologist</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
