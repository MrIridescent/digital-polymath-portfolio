'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles, Brain, Code, Lightbulb } from 'lucide-react'
import { ParticleSystem } from './ParticleSystem'
import { SpectacularText, GlitchText } from './SpectacularText'
import { SpectacularButton } from './SpectacularButton'

import { ProfileImage } from './ProfileImage'
import { HeroQuote } from './PolymathQuotes'
import { KineticBackground } from './KineticSystem'
import { TopQuotes } from './OrderedQuotes'
import { PolymathicManifesto } from './PolymathicManifesto'
import AdvancedContentProtection from './AdvancedContentProtection'
import { ProtectedText, ProtectedImage } from './ContentProtection'


export function HeroSection() {
  return (
    <AdvancedContentProtection level={5} watermark="© David Akpoviroro OKE - Digital Polymath">
      <section className="min-h-screen w-full flex items-center justify-center relative overflow-x-hidden py-8" style={{ background: 'var(--color-background)' }}>
      {/* Kinetic Background System */}
      <KineticBackground variant="neural" intensity="medium" />
      <KineticBackground variant="particles" intensity="subtle" />

      {/* Advanced Particle Background */}
      <ParticleSystem />

      {/* Additional spectacular background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-60 h-60 md:w-80 md:h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(139, 92, 246, 0.6) 50%, transparent 100%)'
          }}
          animate={{
            y: [-10, 10, -10],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -bottom-40 -left-40 w-60 h-60 md:w-80 md:h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(6, 182, 212, 0.6) 50%, transparent 100%)'
          }}
          animate={{
            y: [10, -10, 10],
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Floating geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border-2 border-primary-400/30 rounded-lg"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-7xl mx-auto"> {/* Responsive padding with max width */}
        <div className="text-center w-full max-w-5xl xl:mr-80 xl:ml-0"> {/* Content flows left, space for right-side cards */}
          {/* Profile Image for Mobile - Hidden on Large Screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="mb-12 flex justify-center relative lg:hidden" // Only show on mobile/tablet
          >
            <ProtectedImage
              src="/profile.jpg"
              alt="David Akpoviroro Oke - The Creative Renaissance Man"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
              </motion.div>
              Digital Polymath • Cyber Threat Manager • Creative Renaissance Man
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-2"
            >
              <ProtectedText level={5} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <SpectacularText
                  effect="neon"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                >
                  David Akpoviroro Oke
                </SpectacularText>
              </ProtectedText>
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <ProtectedText level={5} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
                  <SpectacularText
                    effect="hologram"
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold"
                  >
                    Mr. Iridescent
                  </SpectacularText>
                </ProtectedText>
              </motion.div>
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold dynamic-accent" style={{ color: 'var(--color-primary)' }}>
                <GlitchText>
                  Senior Full Stack Developer | Cyber Threat Manager | Computer Scientist
                </GlitchText>
              </div>
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              From the{' '}
              <motion.span
                className="text-primary-600 font-semibold"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                HTML 1.0 era
              </motion.span>{' '}to tomorrow's AI-powered applications, I synthesize{' '}
              <motion.span
                className="text-accent-600 font-semibold"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                20+ years of hands-on experience
              </motion.span>{' '}with cutting-edge innovation. My expertise transcends any single technology—it's the wisdom of witnessing and shaping two decades of web evolution.
            </motion.p>

            {/* Polymath Wisdom Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mb-16" // Added bottom margin for better spacing
            >
              <HeroQuote />
            </motion.div>

            {/* Moving Quotes in Main Content - Properly spaced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mb-16 mx-4 xl:mx-8" // Reduced margins since cards are at edges
            >
              <div className="bg-black/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-xl font-semibold text-white mb-6 text-center border-b border-white/20 pb-4">
                  Inspirational Wisdom
                </h3>
                <TopQuotes speed="slow" count={8} />
              </div>
            </motion.div>

            {/* Polymathic Manifesto Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="mb-16 mx-4 xl:mx-8"
            >
              <PolymathicManifesto />
            </motion.div>
          </motion.div>

          {/* Quick Navigation - Properly spaced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12 mx-8 xl:mx-16" // Added horizontal margins
          >
            <motion.a
              href="/skills"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">Skills Matrix</span>
            </motion.a>
            <motion.a
              href="/philosophy"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Lightbulb className="h-4 w-4" />
              <span className="text-sm font-medium">Philosophy</span>
            </motion.a>
            <motion.a
              href="/projects"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Code className="h-4 w-4" />
              <span className="text-sm font-medium">Projects</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <SpectacularButton
              variant="neon"
              size="lg"
              href="/case-studies"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Explore Case Studies
            </SpectacularButton>

            <SpectacularButton
              variant="hologram"
              size="lg"
              href="/philosophy"
              icon={<Brain className="h-5 w-5" />}
            >
              My Philosophy
            </SpectacularButton>

            <SpectacularButton
              variant="quantum"
              size="lg"
              href="/resume.pdf"
              icon={<Download className="h-5 w-5" />}
            >
              Resume
            </SpectacularButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 text-slate-500"
          >
            <p className="text-sm">Architecting solutions where Arte meets Scienza</p>
          </motion.div>
        </div>
      </div>
    </section>
    </AdvancedContentProtection>
  )
}