'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Brain, 
  Zap, 
  Globe, 
  Shield, 
  Cpu, 
  Database, 
  Cloud, 
  Smartphone,
  Eye,
  Network,
  Bot,
  Layers,
  TrendingUp,
  Lightbulb,
  Atom,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { SpectacularText } from './SpectacularText'
import { AdvancedCard } from './AdvancedCard'
import { SectionQuote } from './PolymathQuotes'
import { AnimatedIcon } from './AnimatedIcons'

interface TechTrend {
  id: string
  title: string
  description: string
  icon: any
  impact: string
  applications: string[]
  color: string
  timeline: string
  details: string[]
  marketSize?: string
  adoptionRate?: string
}

const emergingTechnologies: TechTrend[] = [
  {
    id: 'generative-ai',
    title: 'Generative AI Revolution',
    description: 'From content creation to autonomous systems, AI is becoming the new digital fabric of innovation.',
    icon: Brain,
    impact: 'Transforming 70% of design and development workflows by 2026',
    applications: ['Content Creation', 'Code Generation', 'Design Automation', 'Decision Support'],
    color: 'neon',
    timeline: '2023-2026',
    details: [
      'Context windows expanding to 2M+ tokens (equivalent to 20 novels)',
      'Multimodal capabilities across text, images, audio, and video',
      'Open-source models challenging proprietary counterparts',
      'Enterprise adoption reaching 78% of organizations in 2024'
    ],
    marketSize: '$33.9B global investment in 2024',
    adoptionRate: '78% of organizations using AI'
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI & Autonomous Systems',
    description: 'AI agents that can perceive, reason, and execute complex multi-step tasks independently.',
    icon: Bot,
    impact: 'Creating virtual workforces and machine customers',
    applications: ['Autonomous Vehicles', 'Digital Assistants', 'Process Automation', 'Smart Cities'],
    color: 'hologram',
    timeline: '2024-2026',
    details: [
      'Waymo providing 150,000+ autonomous rides weekly',
      'Machine customers capable of independent purchasing',
      'Multi-step task execution with minimal human intervention',
      'Integration with physical robotics and IoT systems'
    ],
    marketSize: 'Emerging market with exponential growth potential',
    adoptionRate: 'Early adoption phase across industries'
  },
  {
    id: 'edge-computing',
    title: 'Edge Computing & 5G/6G',
    description: 'Ultra-low latency computing bringing intelligence to the edge of networks.',
    icon: Network,
    impact: 'Enabling real-time AI applications and immersive experiences',
    applications: ['IoT Devices', 'AR/VR', 'Autonomous Systems', 'Smart Manufacturing'],
    color: 'quantum',
    timeline: '2023-2025',
    details: [
      'Sub-millisecond latency for critical applications',
      'Distributed AI inference at network edge',
      'Federated learning across edge devices',
      '5G enabling massive IoT deployments'
    ],
    marketSize: '$250B+ edge computing market by 2025',
    adoptionRate: 'Rapid deployment across telecommunications'
  },
  {
    id: 'quantum-computing',
    title: 'Quantum Computing Breakthrough',
    description: 'Quantum systems solving problems impossible for classical computers.',
    icon: Atom,
    impact: 'Revolutionary advances in cryptography, drug discovery, and optimization',
    applications: ['Cryptography', 'Drug Discovery', 'Financial Modeling', 'Climate Simulation'],
    color: 'magnetic',
    timeline: '2025-2030',
    details: [
      'Quantum advantage demonstrated in specific domains',
      'Post-quantum cryptography standards emerging',
      'Hybrid classical-quantum algorithms',
      'Cloud-based quantum computing services'
    ],
    marketSize: '$1.3B market growing to $5B+ by 2030',
    adoptionRate: 'Research and early enterprise adoption'
  }
]

interface EmergingTechShowcaseProps {
  variant?: 'compact' | 'detailed'
  showQuotes?: boolean
}

export function EmergingTechShowcase({ 
  variant = 'detailed', 
  showQuotes = true 
}: EmergingTechShowcaseProps) {
  const [expandedTech, setExpandedTech] = useState<string | null>(null)

  const toggleExpanded = (techId: string) => {
    setExpandedTech(expandedTech === techId ? null : techId)
  }

  if (variant === 'compact') {
    return (
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showQuotes && (
            <div className="text-center mb-8">
              <SectionQuote category="future" />
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {emergingTechnologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <AdvancedCard 
                  effect={tech.color as any} 
                  className="p-4 h-full text-center hover:scale-105 transition-transform duration-300"
                >
                  <AnimatedIcon
                    icon={<tech.icon />}
                    animation="pulse"
                    size="lg"
                    className="text-primary-600 mx-auto mb-3"
                  />
                  <h3 className="text-sm md:text-base font-semibold mb-2">{tech.title}</h3>
                  <p className="text-xs text-slate-600 mb-2">{tech.timeline}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {tech.applications.slice(0, 2).map((app) => (
                      <span 
                        key={app}
                        className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </AdvancedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <SpectacularText 
            effect="electric"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
          >
            Emerging Technologies 2023-2026
          </SpectacularText>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
            The convergence of AI, quantum computing, and edge technologies is reshaping our digital future.
          </p>
          
          {showQuotes && (
            <div className="mt-8">
              <SectionQuote category="innovation" />
            </div>
          )}
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {emergingTechnologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <AdvancedCard 
                effect={tech.color as any} 
                className="p-4 md:p-6"
              >
                {/* Mobile-First Header */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div className="p-2 md:p-3 bg-primary-100 rounded-lg flex-shrink-0">
                      <tech.icon className="h-5 w-5 md:h-6 md:w-6 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold mb-1 truncate">{tech.title}</h3>
                      <div className="text-xs md:text-sm text-primary-600 font-medium">{tech.timeline}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleExpanded(tech.id)}
                    className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors self-start sm:self-center"
                  >
                    <span className="hidden sm:inline">Details</span>
                    {expandedTech === tech.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                {/* Description */}
                <p className="text-sm md:text-base text-slate-600 mt-4 mb-4">{tech.description}</p>
                
                {/* Impact */}
                <div className="mb-4">
                  <div className="text-sm font-semibold text-slate-700 mb-2">Key Impact:</div>
                  <div className="text-sm text-slate-600 italic">{tech.impact}</div>
                </div>
                
                {/* Applications - Mobile Responsive */}
                <div className="mb-4">
                  <div className="text-sm font-semibold text-slate-700 mb-2">Applications:</div>
                  <div className="flex flex-wrap gap-2">
                    {tech.applications.map((app) => (
                      <span 
                        key={app}
                        className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTech === tech.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-200 pt-4 mt-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-700 mb-2">Technical Details:</div>
                        <ul className="space-y-1">
                          {tech.details.map((detail, i) => (
                            <li key={i} className="text-xs md:text-sm text-slate-600 flex items-start gap-2">
                              <span className="text-primary-500 mt-1">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        {tech.marketSize && (
                          <div>
                            <div className="text-sm font-semibold text-slate-700">Market Size:</div>
                            <div className="text-xs md:text-sm text-slate-600">{tech.marketSize}</div>
                          </div>
                        )}
                        {tech.adoptionRate && (
                          <div>
                            <div className="text-sm font-semibold text-slate-700">Adoption:</div>
                            <div className="text-xs md:text-sm text-slate-600">{tech.adoptionRate}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AdvancedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
