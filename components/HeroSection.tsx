'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles, Brain, Code, Lightbulb } from 'lucide-react'
import { ParticleSystem } from './ParticleSystem'
import { SpectacularText, GlitchText } from './SpectacularText'
import { SpectacularButton } from './SpectacularButton'
import { ProfileImage } from './ProfileImage'
import { HeroQuote } from './PolymathQuotes'

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
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

      <div className="container relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Professional Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center"
          >
            <ProfileImage
              size="xl"
              effect="renaissance"
              src="/profile.jpg"
              alt="David Akpoviroro OKE - The Creative Renaissance Man"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
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
              className="mb-6"
            >
              <SpectacularText
                effect="neon"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                David Akpoviroro OKE
              </SpectacularText>
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <SpectacularText
                  effect="hologram"
                  className="text-2xl sm:text-3xl md:text-4xl font-semibold"
                >
                  Mr. Iridescent
                </SpectacularText>
              </motion.div>
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <GlitchText className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-600">
                Senior Full Stack Developer | Cyber Threat Manager | Computer Scientist
              </GlitchText>
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
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
            >
              <HeroQuote />
            </motion.div>
          </motion.div>

          {/* Da Vincian Principles Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
          >
            <div className="flex items-center gap-2 text-slate-600">
              <Brain className="h-5 w-5 text-primary-600" />
              <span className="text-sm font-medium">Historical Authority</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Code className="h-5 w-5 text-accent-600" />
              <span className="text-sm font-medium">Trial & Error Mastery</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Lightbulb className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium">Solution Architecture</span>
            </div>
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
  )
}