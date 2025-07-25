'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { DynamicLayoutSystem } from '@/components/DynamicLayoutSystem'
import { SpectacularText } from '@/components/SpectacularText'
import {
  Brain,
  Target,
  Eye,
  Puzzle,
  Heart,
  Zap,
  Network,
  ChevronDown,
  Code,
  Shield,
  Rocket,
  Star
} from 'lucide-react'

const daVincianPrinciples = [
  {
    id: "curiosita",
    title: "Curiosità",
    subtitle: "Insatiable Digital Curiosity",
    icon: Eye,
    color: "from-blue-500 to-cyan-600",
    description: "An insatiably curious approach to life and an unrelenting quest for continuous learning.",
    digitalPolymatApplication: [
      "Constantly exploring emerging technologies like Web3, AI/ML, quantum computing, and edge computing",
      "Questioning established programming patterns and seeking innovative approaches to complex problems",
      "Maintaining beginner's mind across multiple technology stacks while building deep expertise",
      "Reading extensively about inspiring innovators and their breakthrough methodologies",
      "Following the stories of people who truly inspire transformative thinking"
    ],
    realWorldExample: "Like studying both React's component architecture and quantum computing principles to understand how parallel processing concepts can optimize frontend rendering.",
    personalConnection: "As an INTP/ENTP/INTJ with Enneagram Type 7 energy, my curiosity drives me to explore multiple domains simultaneously, from Cisco cybersecurity to fintech development at Zandbox."
  },
  {
    id: "dimostrazione", 
    title: "Dimostrazione", 
    subtitle: "Proof Through Digital Execution",
    icon: Target,
    color: "from-purple-500 to-pink-600",
    description: "A commitment to test knowledge through experience, persistence, and a willingness to learn from mistakes.",
    digitalPolymatApplication: [
      "Building proof-of-concepts before committing to full implementations",
      "Conducting thorough penetration testing and security audits on every system",
      "Validating business assumptions through MVP development and user feedback",
      "Learning from failed deployments and security incidents to strengthen future solutions",
      "Testing theoretical knowledge through hands-on Cisco cybersecurity training and real-world application"
    ],
    realWorldExample: "Developing fintech dashboards at Zandbox by first creating prototypes, testing with real users, then iterating based on actual usage patterns rather than assumptions.",
    personalConnection: "My 7+ years leading Iridescent Internet Solutions taught me that execution trumps theory - every digital badge and certification I've earned represents hands-on mastery, not just academic knowledge."
  },
  {
    id: "sensazione",
    title: "Sensazione",
    subtitle: "Refined Digital Senses",
    icon: Heart,
    color: "from-green-500 to-emerald-600", 
    description: "The continual refinement of the senses, especially sight, as the means to enliven experience.",
    digitalPolymatApplication: [
      "Developing acute sensitivity to user experience patterns and interface design principles",
      "Recognizing subtle performance bottlenecks and security vulnerabilities through pattern recognition",
      "Sensing when code architecture is becoming unwieldy before it becomes a critical issue",
      "Intuiting user needs and pain points through empathetic design thinking",
      "Detecting emerging trends in technology adoption and market shifts"
    ],
    realWorldExample: "Achieving 35% SEO traffic increase at Trinitas Foundation by sensing user search intent patterns and optimizing content accordingly.",
    personalConnection: "As a deep thinker and abstract conceptualizer, I've developed heightened sensitivity to the subtle patterns that indicate system health, user satisfaction, and emerging opportunities."
  },
  {
    id: "sfumato",
    title: "Sfumato",
    subtitle: "Embracing Digital Ambiguity",
    icon: Puzzle,
    color: "from-yellow-500 to-orange-600",
    description: "A willingness to embrace ambiguity, paradox, and uncertainty.",
    digitalPolymatApplication: [
      "Comfortable with the inherent uncertainty in software development and emerging technologies",
      "Embracing agile methodologies and iterative development in complex problem spaces",
      "Finding elegant solutions in ambiguous requirements and changing business needs",
      "Balancing security requirements with user experience in ways that seem paradoxical",
      "Working with incomplete information while maintaining forward momentum"
    ],
    realWorldExample: "Managing remote teams across different time zones at Zandbox while delivering high-quality solutions despite communication ambiguities and cultural differences.",
    personalConnection: "My Type 7 Enneagram energy thrives in ambiguous environments, seeing possibilities where others see obstacles, and my NT personality types help me navigate uncertainty with systematic thinking."
  },
  {
    id: "arte-scienza",
    title: "Arte/Scienza",
    subtitle: "Digital Renaissance Balance",
    icon: Brain,
    color: "from-red-500 to-rose-600",
    description: "The development of the balance between science and art, logic and imagination.",
    digitalPolymatApplication: [
      "Balancing analytical programming skills with creative problem-solving and innovative design",
      "Combining technical precision in cybersecurity with imaginative threat modeling",
      "Merging logical database architecture with artistic user interface design",
      "Integrating scientific testing methodologies with creative marketing strategies",
      "Applying both INTP analytical thinking and ENTP creative exploration in solution design"
    ],
    realWorldExample: "Creating scalable fintech products at Zandbox that are both technically robust and beautifully designed, satisfying both engineering excellence and user delight.",
    personalConnection: "My INTP/ENTP/INTJ cognitive flexibility allows me to seamlessly switch between analytical depth and creative exploration, embodying the true Renaissance ideal."
  },
  {
    id: "corporalita",
    title: "Corporalità",
    subtitle: "Digital Mental Fitness",
    icon: Zap,
    color: "from-indigo-500 to-purple-600",
    description: "The cultivation of grace, ambidexterity, fitness, and poise.",
    digitalPolymatApplication: [
      "Maintaining mental agility across multiple programming languages and frameworks",
      "Developing ambidextrous thinking between frontend creativity and backend logic",
      "Cultivating the stamina for sustained creative and technical work across 7+ years of leadership",
      "Building resilience to handle the stress of cybersecurity threat management",
      "Maintaining poise under pressure during critical system deployments and security incidents"
    ],
    realWorldExample: "Successfully managing both creative design work at Iridescent Creative Studio and technical cybersecurity responsibilities at NITDA simultaneously.",
    personalConnection: "As a futurist and deep thinker, I've developed the mental stamina to hold multiple complex concepts simultaneously while maintaining clarity and focus."
  },
  {
    id: "connessione",
    title: "Connessione",
    subtitle: "Digital Systems Thinking",
    icon: Network,
    color: "from-teal-500 to-blue-600",
    description: "A recognition of and appreciation for the connectedness of all things and phenomena.",
    digitalPolymatApplication: [
      "Understanding the interconnections between frontend, backend, security, and business systems",
      "Recognizing how changes in one microservice affect the entire distributed system",
      "Designing with ecosystem thinking that considers users, stakeholders, and technical infrastructure",
      "Connecting cybersecurity principles with user experience design for holistic protection",
      "Seeing the relationships between emerging technologies and their societal implications"
    ],
    realWorldExample: "Architecting solutions at Iridescent Internet Solutions that seamlessly integrate web development, mobile apps, cybersecurity, and business strategy as interconnected elements.",
    personalConnection: "My abstract conceptualization abilities allow me to see patterns and connections that others miss, understanding how seemingly disparate elements form coherent systems."
  }
]

export default function PhilosophyPage() {
  const [expandedPrinciples, setExpandedPrinciples] = useState<string[]>(['curiosita'])

  const togglePrinciple = (principleId: string) => {
    setExpandedPrinciples(prev => 
      prev.includes(principleId) 
        ? prev.filter(id => id !== principleId)
        : [...prev, principleId]
    )
  }

  return (
    <DynamicLayoutSystem>
      <div className="pt-16 min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <SpectacularText
              effect="hologram"
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              The Digital Polymat Philosophy
            </SpectacularText>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Where Leonardo da Vinci's Seven Principles Meet Modern Digital Innovation and Remote-First Philosophy
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-xl"
            >
              <Brain className="w-6 h-6" />
              <span className="text-lg font-semibold">Deep Thinker • Abstract Conceptualizer • Futurist</span>
              <Star className="w-6 h-6" />
            </motion.div>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              The Renaissance Mind in the Digital Age
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a <strong>Creatively Divergent Multipotentialite</strong> with an <strong>Analytical Mind</strong>
                  and INTP/ENTP/INTJ cognitive patterns, I embody the intersection of Leonardo da Vinci's timeless
                  principles with cutting-edge digital innovation. This rare combination of all nine Multiple Intelligences
                  creates a unique problem-solving approach.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This philosophy drives my work as Founder of Iridescent Internet Solutions, Full Stack Engineer at Zandbox,
                  and Cisco-trained cybersecurity specialist. The <strong>Analytical Mind</strong> serves as the synthesizing
                  force that connects disparate domains into innovative solutions.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Core Identity</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>Cisco Cyber Threat Management Expert</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-green-500" />
                    <span>Full Stack + AI/ML Engineering</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-4 h-4 text-purple-500" />
                    <span>Digital Product Architecture</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Network className="w-4 h-4 text-orange-500" />
                    <span>Systems Thinking & Innovation</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Da Vincian Principles */}
          <div className="space-y-8">
            {daVincianPrinciples.map((principle, index) => {
              const isExpanded = expandedPrinciples.includes(principle.id)
              const Icon = principle.icon

              return (
                <motion.div
                  key={principle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl overflow-hidden"
                >
                  {/* Principle Header */}
                  <button
                    onClick={() => togglePrinciple(principle.id)}
                    className="w-full p-8 text-left hover:bg-white/50 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-r ${principle.color} text-white shadow-lg`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-800 mb-2">
                            {principle.title}
                          </h3>
                          <p className="text-xl text-gray-600 font-medium">
                            {principle.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400"
                      >
                        <ChevronDown className="w-8 h-8" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 mb-6">
                        <p className="text-lg text-gray-700 leading-relaxed italic">
                          "{principle.description}"
                        </p>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 mb-4">Digital Polymat Application</h4>
                          <ul className="space-y-3">
                            {principle.digitalPolymatApplication.map((application, appIndex) => (
                              <motion.li
                                key={appIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: appIndex * 0.1 }}
                                className="flex items-start space-x-3"
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{application}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h4 className="text-lg font-bold text-gray-800 mb-3">Real-World Example</h4>
                            <p className="text-gray-700 leading-relaxed">
                              {principle.realWorldExample}
                            </p>
                          </div>

                          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                            <h4 className="text-lg font-bold text-purple-800 mb-3">Personal Connection</h4>
                            <p className="text-purple-700 leading-relaxed">
                              {principle.personalConnection}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </DynamicLayoutSystem>
  )
}
