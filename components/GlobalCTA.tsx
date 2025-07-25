'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Rocket, 
  Users, 
  MessageCircle, 
  Star, 
  ArrowRight,
  Briefcase,
  Lightbulb,
  Target,
  Globe,
  Zap
} from 'lucide-react'

interface GlobalCTAProps {
  variant?: 'primary' | 'secondary' | 'floating'
  position?: 'top' | 'bottom' | 'inline' | 'floating'
  showStats?: boolean
}

export function GlobalCTA({ variant = 'primary', position = 'inline', showStats = true }: GlobalCTAProps) {
  const [isHovered, setIsHovered] = useState(false)

  const ctaVariants = {
    primary: {
      container: "bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white",
      button1: "bg-white text-purple-900 hover:bg-gray-100",
      button2: "border-2 border-white text-white hover:bg-white hover:text-purple-900"
    },
    secondary: {
      container: "bg-gradient-to-r from-green-600 to-blue-600 text-white",
      button1: "bg-white text-green-700 hover:bg-gray-100",
      button2: "border-2 border-white text-white hover:bg-white hover:text-green-700"
    },
    floating: {
      container: "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-2xl",
      button1: "bg-white text-orange-600 hover:bg-gray-100",
      button2: "border-2 border-white text-white hover:bg-white hover:text-orange-600"
    }
  }

  const currentVariant = ctaVariants[variant]

  const stats = [
    { icon: Star, value: "35%", label: "SEO Traffic Increase" },
    { icon: Users, value: "300%", label: "Lead Generation Boost" },
    { icon: Target, value: "99.9%", label: "System Uptime" },
    { icon: Rocket, value: "100+", label: "Projects Delivered" }
  ]

  const services = [
    { icon: Lightbulb, title: "AI Engineering", desc: "RAG Systems, Agentic AI, MCP Protocols" },
    { icon: Globe, title: "Full Stack Development", desc: "React, Next.js, Node.js, Python, Java Spring" },
    { icon: Briefcase, title: "Cybersecurity", desc: "Cisco-verified threat management & ethical hacking" },
    { icon: Zap, title: "Creative Design", desc: "UI/UX, Video Production, Brand Identity" }
  ]

  if (position === 'floating') {
    return (
      <motion.div
        className={`fixed bottom-6 right-6 z-50 ${currentVariant.container} rounded-2xl p-6 max-w-sm shadow-2xl`}
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Transform?</h3>
          <p className="text-sm mb-4 opacity-90">
            Join 100+ satisfied clients who achieved remarkable results
          </p>
          <div className="space-y-2">
            <button className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${currentVariant.button1}`}>
              HIRE ME NOW
            </button>
            <button className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${currentVariant.button2}`}>
              GET CONSULTATION
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.section
      className={`py-16 px-4 sm:px-6 lg:px-8 ${currentVariant.container} ${position === 'top' ? 'mt-0' : 'mt-16'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main CTA Content */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            Ready to Transform Your Business?
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the ranks of successful organizations that have experienced 
            <span className="font-bold text-yellow-300"> 35% traffic increases</span>, 
            <span className="font-bold text-green-300"> 300% lead generation boosts</span>, and 
            <span className="font-bold text-blue-300"> 99.9% system reliability</span> 
            through Digital Polymat expertise.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.button
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${currentVariant.button1} shadow-lg`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <Briefcase className="w-6 h-6" />
                <span>HIRE ME NOW</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.button>

            <motion.button
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${currentVariant.button2} shadow-lg`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6" />
                <span>LET ME BE YOUR CONSULTANT</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Stats Section */}
        {showStats && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-10 h-10 mx-auto mb-4 text-blue-300" />
                <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                <p className="text-sm opacity-80">{service.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Final Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-lg mb-6 opacity-90">
            <span className="font-semibold">Digital Polymat</span> • 
            <span className="font-semibold"> Multipotentialite</span> • 
            <span className="font-semibold"> Creatively Divergent</span> • 
            <span className="font-semibold"> Design & Systems Thinker</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 text-sm opacity-75">
            <span className="bg-white/10 px-3 py-1 rounded-full">Multiple Intelligences</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Renaissance Mind</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Innovation Leader</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Remote-First Pioneer</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

// Floating CTA Hook for easy implementation
export function useFloatingCTA() {
  return <GlobalCTA variant="floating" position="floating" showStats={false} />
}
