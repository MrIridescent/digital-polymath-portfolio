'use client'

import { motion } from 'framer-motion'
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
  Atom
} from 'lucide-react'
import { SpectacularText } from '@/components/SpectacularText'
import { AdvancedCard } from '@/components/AdvancedCard'
import { SectionQuote, PolymathQuoteTicker } from '@/components/PolymathQuotes'
import { AnimatedIcon } from '@/components/AnimatedIcons'

export default function EmergingTechPage() {
  const techTrends = [
    {
      title: 'Generative AI Revolution',
      description: 'From content creation to autonomous systems, AI is becoming the new digital fabric of innovation.',
      icon: Brain,
      impact: 'Transforming 70% of design and development workflows by 2026',
      applications: ['Content Creation', 'Code Generation', 'Design Automation', 'Decision Support'],
      color: 'neon',
      timeline: '2023-2026'
    },
    {
      title: 'Agentic AI & Autonomous Systems',
      description: 'AI agents that can perceive, reason, and execute complex multi-step tasks independently.',
      icon: Bot,
      impact: 'Creating virtual workforces and machine customers',
      applications: ['Autonomous Vehicles', 'Digital Assistants', 'Process Automation', 'Smart Cities'],
      color: 'hologram',
      timeline: '2024-2026'
    },
    {
      title: 'Edge Computing & 5G/6G',
      description: 'Ultra-low latency computing bringing intelligence to the edge of networks.',
      icon: Network,
      impact: 'Enabling real-time AI applications and immersive experiences',
      applications: ['IoT Devices', 'AR/VR', 'Autonomous Systems', 'Smart Manufacturing'],
      color: 'quantum',
      timeline: '2023-2025'
    },
    {
      title: 'Quantum Computing Breakthrough',
      description: 'Quantum systems solving problems impossible for classical computers.',
      icon: Atom,
      impact: 'Revolutionary advances in cryptography, drug discovery, and optimization',
      applications: ['Cryptography', 'Drug Discovery', 'Financial Modeling', 'Climate Simulation'],
      color: 'magnetic',
      timeline: '2025-2030'
    },
    {
      title: 'Immersive Technologies (AR/VR/MR)',
      description: 'Spatial computing creating new dimensions of human-computer interaction.',
      icon: Eye,
      impact: 'Transforming work, education, and social interaction',
      applications: ['Remote Collaboration', 'Training Simulations', 'Digital Twins', 'Entertainment'],
      color: 'liquid',
      timeline: '2023-2026'
    },
    {
      title: 'Sustainable Tech & Green Computing',
      description: 'Technology solutions addressing climate change and environmental challenges.',
      icon: Globe,
      impact: 'Reducing global carbon footprint while enabling digital transformation',
      applications: ['Carbon Capture', 'Renewable Energy', 'Circular Economy', 'Smart Grids'],
      color: 'glass',
      timeline: '2023-2030'
    }
  ]

  const convergenceAreas = [
    {
      title: 'AI + Cybersecurity',
      description: 'Intelligent threat detection and autonomous security response systems.',
      technologies: ['Machine Learning', 'Behavioral Analytics', 'Zero Trust', 'Automated Response'],
      icon: Shield
    },
    {
      title: 'Quantum + Cryptography',
      description: 'Post-quantum cryptography and quantum-safe security protocols.',
      technologies: ['Quantum Key Distribution', 'Lattice Cryptography', 'Quantum Random Numbers', 'Secure Communications'],
      icon: Cpu
    },
    {
      title: 'Edge + AI',
      description: 'Distributed intelligence enabling real-time decision making.',
      technologies: ['Edge AI Chips', 'Federated Learning', 'Model Compression', 'Real-time Inference'],
      icon: Zap
    },
    {
      title: 'Blockchain + IoT',
      description: 'Decentralized trust and security for connected device ecosystems.',
      technologies: ['Smart Contracts', 'Device Identity', 'Micropayments', 'Supply Chain'],
      icon: Database
    }
  ]

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <SpectacularText 
              effect="electric"
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6"
            >
              The 2026 Digital Horizon
            </SpectacularText>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto mb-8">
              A strategic outlook on converging technologies that will define the next era of digital innovation.
              From pervasive AI to quantum computing, we stand at the nexus of transformation.
            </p>
            
            {/* Da Vinci Philosophy Quote */}
            <SectionQuote category="future" />
          </motion.div>

          {/* Key Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
          >
            {[
              { metric: '40%', label: 'Increase in IT efficiency by 2026', icon: TrendingUp },
              { metric: '78%', label: 'Organizations using AI in 2024', icon: Brain },
              { metric: '70%', label: 'Design workflows transformed by GenAI', icon: Lightbulb },
              { metric: '2026', label: 'Quantum advantage timeline', icon: Atom }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AdvancedCard effect="glass" className="p-4 md:p-6 text-center h-full">
                  <stat.icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-2">{stat.metric}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </AdvancedCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Aaron Swartz Tribute */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-red-900/10 to-orange-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <SpectacularText
              effect="neon"
              className="text-3xl md:text-4xl font-bold mb-6 text-red-600"
            >
              In Memory of Aaron Swartz (1986-2013)
            </SpectacularText>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              Co-founder of Reddit, Open Access Advocate, Digital Rights Pioneer who believed in technology's power to democratize knowledge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <AdvancedCard effect="glass" className="p-8 h-full">
                <blockquote className="text-xl font-medium text-slate-700 leading-relaxed mb-6 italic">
                  "Information is power. But like all power, there are those who want to keep it for themselves."
                </blockquote>
                <div className="text-red-600 font-semibold mb-2">— Aaron Swartz</div>
                <div className="text-sm text-slate-600 mb-4">From his 'Guerilla Open Access Manifesto'</div>
                <div className="text-sm text-slate-700">
                  <strong>Digital Polymat Relevance:</strong> Embodies our commitment to democratizing technology and knowledge sharing across all disciplines.
                </div>
              </AdvancedCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AdvancedCard effect="glass" className="p-8 h-full">
                <blockquote className="text-xl font-medium text-slate-700 leading-relaxed mb-6 italic">
                  "Think deeply about things. Don't just go along because that's the way things are or that's what your friends say. Consider the effects, consider the alternatives, but most importantly, just think."
                </blockquote>
                <div className="text-red-600 font-semibold mb-2">— Aaron Swartz</div>
                <div className="text-sm text-slate-600 mb-4">Encouraging critical thinking and independent analysis</div>
                <div className="text-sm text-slate-700">
                  <strong>Digital Polymat Relevance:</strong> Core principle of our mindset - questioning assumptions and thinking across disciplines to create innovative solutions.
                </div>
              </AdvancedCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Major Technology Trends */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <SpectacularText 
              effect="hologram"
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Defining Technologies of 2023-2026
            </SpectacularText>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Six transformative forces reshaping the digital landscape through convergence and acceleration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {techTrends.map((trend, index) => (
              <motion.div
                key={trend.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="h-full"
              >
                <AdvancedCard 
                  effect={trend.color as any} 
                  className="p-6 h-full flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <trend.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold mb-1">{trend.title}</h3>
                      <div className="text-xs text-primary-600 font-medium">{trend.timeline}</div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4 flex-1">{trend.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-slate-700 mb-2">Impact:</div>
                    <div className="text-sm text-slate-600 italic">{trend.impact}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold text-slate-700 mb-2">Key Applications:</div>
                    <div className="flex flex-wrap gap-2">
                      {trend.applications.map((app) => (
                        <span 
                          key={app}
                          className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </AdvancedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Convergence */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <SpectacularText 
              effect="neon"
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              Technology Convergence
            </SpectacularText>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              The most powerful innovations emerge at the intersection of multiple technologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {convergenceAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <AdvancedCard effect="quantum" className="p-6 bg-black/30 backdrop-blur-md border border-cyan-500/20 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <AnimatedIcon
                      icon={<area.icon />}
                      animation="pulse"
                      size="lg"
                      className="text-cyan-400"
                    />
                    <h3 className="text-xl font-semibold text-white">{area.title}</h3>
                  </div>
                  
                  <p className="text-cyan-100 mb-4">{area.description}</p>
                  
                  <div>
                    <div className="text-sm font-semibold text-cyan-400 mb-2">Core Technologies:</div>
                    <div className="grid grid-cols-2 gap-2">
                      {area.technologies.map((tech) => (
                        <div 
                          key={tech}
                          className="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </AdvancedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophical Reflection */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SpectacularText 
              effect="renaissance"
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              "The Renaissance Mind in the Digital Age"
            </SpectacularText>
            
            <AdvancedCard effect="renaissance" className="p-6 md:p-8">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Just as Leonardo da Vinci synthesized art, science, and engineering to envision flying machines 
                and hydraulic systems centuries before their time, today's digital polymaths must weave together 
                AI, quantum computing, and human-centered design to architect the future.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                The convergence of these technologies demands not just technical expertise, but the Renaissance 
                ability to see patterns across disciplines, to imagine what doesn't yet exist, and to bridge 
                the gap between human needs and technological possibility.
              </p>
            </AdvancedCard>
            
            {/* Innovation Quote */}
            <div className="mt-8">
              <SectionQuote category="innovation" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Continuous Quote Ticker */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <PolymathQuoteTicker 
          variant="horizontal" 
          category="all" 
          speed="medium"
          className="py-3"
        />
      </div>
    </div>
  )
}
