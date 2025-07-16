'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, AlertTriangle, Lock, Zap, Target, Search } from 'lucide-react'
import { SpectacularText } from './SpectacularText'
import { AdvancedCard } from './AdvancedCard'
import { AnimatedIcon } from './AnimatedIcons'

export function CyberThreatShowcase() {
  const threatManagementCapabilities = [
    {
      title: 'Threat Intelligence Gathering',
      description: 'Advanced analysis of emerging cyber threats and attack vectors',
      icon: Search,
      color: 'neon'
    },
    {
      title: 'Risk Assessment & Analysis',
      description: 'Comprehensive vulnerability management and security posture evaluation',
      icon: Target,
      color: 'hologram'
    },
    {
      title: 'Incident Response & Remediation',
      description: 'Rapid threat containment and system recovery protocols',
      icon: Zap,
      color: 'quantum'
    },
    {
      title: 'Continuous Monitoring',
      description: 'Real-time surveillance and threat detection systems',
      icon: Eye,
      color: 'magnetic'
    },
    {
      title: 'Security Architecture Design',
      description: 'Designing robust security frameworks and defense strategies',
      icon: Lock,
      color: 'plasma'
    },
    {
      title: 'Penetration Testing',
      description: 'Ethical hacking and red team operations for security validation',
      icon: AlertTriangle,
      color: 'neon'
    }
  ]

  const ciscoExpertise = [
    'Cisco Cyber Threat Management (CyberTM)',
    'Cisco Certified Ethical Hacker',
    'Cisco Certified Endpoint Security Engineer',
    'Cisco CyberOps Associate'
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cyber grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Floating threat indicators */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <Shield className="w-6 h-6 text-cyan-400" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SpectacularText 
            effect="neon"
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Cisco Cyber Threat Management
          </SpectacularText>
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatedIcon
              icon={<Shield />}
              animation="glow"
              size="xl"
              className="text-cyan-400"
            />
          </motion.div>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
            Certified expertise in identifying, assessing, and mitigating cyber threats 
            with advanced Cisco security technologies and methodologies.
          </p>
        </motion.div>

        {/* Cisco Certifications Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <AdvancedCard effect="hologram" className="p-6 bg-black/30 backdrop-blur-md">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Cisco Security Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ciscoExpertise.map((cert, index) => (
                  <motion.div
                    key={cert}
                    className="flex items-center gap-3 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Shield className="h-5 w-5 text-cyan-400" />
                    <span className="text-cyan-100 font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AdvancedCard>
        </motion.div>

        {/* Threat Management Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Cyber Threat Management Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {threatManagementCapabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <AdvancedCard
                  effect={capability.color as 'hologram' | 'neon' | 'glass' | 'magnetic' | 'liquid'}
                  className="p-6 h-full bg-black/20 backdrop-blur-md border border-cyan-500/20"
                >
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      <AnimatedIcon
                        icon={<capability.icon />}
                        animation="pulse"
                        size="lg"
                        className="text-cyan-400"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                      {capability.title}
                    </h4>
                    <p className="text-cyan-100 text-sm leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </AdvancedCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Responsibilities Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <AdvancedCard effect="quantum" className="p-8 bg-black/30 backdrop-blur-md max-w-4xl mx-auto">
            <SpectacularText 
              effect="electric"
              className="text-2xl font-bold mb-6 text-white"
            >
              NITDA Nigeria - Cyber Threat Manager (CyberTM)
            </SpectacularText>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-3">Core Responsibilities:</h4>
                <ul className="space-y-2 text-cyan-100 text-sm">
                  <li>• Threat intelligence gathering and analysis</li>
                  <li>• Risk assessments and vulnerability management</li>
                  <li>• Incident response and remediation</li>
                  <li>• Continuous monitoring and surveillance</li>
                  <li>• Compliance and governance</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-3">Advanced Operations:</h4>
                <ul className="space-y-2 text-cyan-100 text-sm">
                  <li>• Security architecture and design</li>
                  <li>• Penetration testing and red teaming</li>
                  <li>• Security awareness training</li>
                  <li>• Threat modeling and simulation</li>
                  <li>• Stakeholder collaboration</li>
                </ul>
              </div>
            </div>
          </AdvancedCard>
        </motion.div>
      </div>
    </section>
  )
}
