
'use client'

import { motion } from 'framer-motion'
import { DynamicLayoutSystem } from '@/components/DynamicLayoutSystem'
import { SpectacularText } from '@/components/SpectacularText'
import { Timeline } from '@/components/Timeline'
import { SkillsMatrix } from '@/components/SkillsMatrix'
import { PersonalPhilosophy } from '@/components/PersonalPhilosophy'
import {
  Brain,
  BookOpen,
  Palette,
  Music,
  Users,
  Target,
  Leaf,
  Infinity,
  Heart,
  Zap,
  Eye,
  Lightbulb,
  Puzzle,
  Globe
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center w-full"> {/* Responsive padding with full width */}
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-gradient">MY POLYMATHIC JOURNEY</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            For over two decades, I've been driven by an innate fascination with the intersection
            of technology, security, and human experience. Starting my coding journey in 2004
            at age 20, I've evolved from a curious beginner to a seasoned Digital Polymat, Polyglot
            founding Iridescent Internet Solutions in 2015 and finalizing Incorporation in 2017 to leading innovation across multiple domains.
          </p>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold mb-8">Professional Journey: Key Milestones</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              <strong>2004-2016:</strong> Started as a Junior Frontend Developer, spending 11 years
              mastering the fundamentals while working freelance across Nigeria. This period taught me
              the importance of solid foundations and client relationship management.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              <strong>2017-2019:</strong> Joined ITChef Nigeria Ltd as Digital Project Manager,
              where I learned to translate client objectives into actionable project plans and
              manage cross-functional teams. This role bridged my technical skills with business acumen.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              <strong>2017-Present:</strong> Founded Iridescent Internet Solutions Limited,
              growing from a solo venture to leading a team of developers, cybersecurity experts,
              and IT professionals. We've delivered scalable web and mobile apps plus secure systems
              for startups and established companies.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              <strong>2020-2022:</strong> Expanded into marketing as SMS Marketing Specialist at
              Michel Holmes Properties, achieving significant engagement improvements through
              data-driven campaigns and A/B testing methodologies.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              <strong>2021-2022:</strong> Specialized in SEO and Email Marketing at Trinitas Foundation,
              achieving a 35% increase in organic search traffic and leading successful fundraising
              campaigns for children's education initiatives.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              <strong>2023-2024:</strong> Extensively trained by NITDA Nigeria in advanced cybersecurity,
              earning expertise in Cisco Cyber Threat Management, Ethical Hacking, and Endpoint Security.
              This training solidified my security-first approach to all development projects.
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong>2025-Present:</strong> Currently serving as Full Stack Engineer at Zandbox (Global),
              developing scalable fintech products while maintaining my role as founder of Iridescent
              Internet Solutions and Creative Studio.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Impact Statistics */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Impact by the Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real clients who trusted the Digital Polymat approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">35%</div>
              <div className="text-gray-700 font-medium">SEO Traffic Increase</div>
              <div className="text-sm text-gray-500 mt-1">Trinitas Foundation</div>
            </div>

            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">300%</div>
              <div className="text-gray-700 font-medium">Lead Generation Boost</div>
              <div className="text-sm text-gray-500 mt-1">Real Estate Clients</div>
            </div>

            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-700 font-medium">System Uptime</div>
              <div className="text-sm text-gray-500 mt-1">All Managed Systems</div>
            </div>

            <div className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-orange-600 mb-2">100+</div>
              <div className="text-gray-700 font-medium">Projects Delivered</div>
              <div className="text-sm text-gray-500 mt-1">7+ Years Leadership</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/statistics"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <span>View Detailed Statistics</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Multiple Intelligences Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Multiple Intelligences Mastery
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              As a <strong>Creatively Divergent Multipotentialite</strong> with an <strong>Analytical Mind</strong>,
              I embody all nine of Howard Gardner's Multiple Intelligences - a rare combination that defines
              the true <strong>Digital Polymat</strong> approach to problem-solving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Logical-Mathematical */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Logical-Mathematical</h3>
              <p className="text-sm text-gray-600 mb-3">Pattern recognition, logical reasoning, mathematical thinking</p>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Evidence</h4>
                <p className="text-xs text-gray-600">20+ years coding, complex algorithms, AI/ML systems, cybersecurity protocols</p>
              </div>
            </div>

            {/* Linguistic */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Linguistic</h3>
              <p className="text-sm text-gray-600 mb-3">Language mastery, communication, storytelling</p>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Evidence</h4>
                <p className="text-xs text-gray-600">Technical writing, documentation, strategic communication, content creation</p>
              </div>
            </div>

            {/* Spatial */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Spatial</h3>
              <p className="text-sm text-gray-600 mb-3">Visual thinking, design, spatial relationships</p>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Evidence</h4>
                <p className="text-xs text-gray-600">UI/UX design, Adobe Creative Suite, video editing, color grading</p>
              </div>
            </div>

            {/* Musical */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Musical</h3>
              <p className="text-sm text-gray-600 mb-3">Rhythm, harmony, pattern in sound and code</p>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Evidence</h4>
                <p className="text-xs text-gray-600">Elegant code structure, harmonious designs, rhythmic problem-solving</p>
              </div>
            </div>

            {/* Bodily-Kinesthetic */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Bodily-Kinesthetic</h3>
              <p className="text-sm text-gray-600 mb-3">Physical coordination, hands-on learning</p>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Evidence</h4>
                <p className="text-xs text-gray-600">A+ certification, hardware troubleshooting, hands-on development</p>
              </div>
            </div>

            {/* Interpersonal */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Interpersonal</h3>
              <p className="text-sm text-gray-600 mb-3">Understanding others, leadership, collaboration</p>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Evidence</h4>
                <p className="text-xs text-gray-600">Team leadership, client relations, successful collaborations</p>
              </div>
            </div>

            {/* Intrapersonal */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Intrapersonal</h3>
              <p className="text-sm text-gray-600 mb-3">Self-awareness, reflection, personal growth</p>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Evidence</h4>
                <p className="text-xs text-gray-600">Continuous learning, self-reflection, personal development</p>
              </div>
            </div>

            {/* Naturalistic */}
            <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl p-6 border border-green-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-lime-600 flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Naturalistic</h3>
              <p className="text-sm text-gray-600 mb-3">Pattern recognition in nature, systems thinking</p>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Evidence</h4>
                <p className="text-xs text-gray-600">Systems architecture, ecosystem thinking, holistic solutions</p>
              </div>
            </div>

            {/* Existential */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center mb-4">
                <Infinity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Existential</h3>
              <p className="text-sm text-gray-600 mb-3">Big-picture thinking, philosophical inquiry</p>
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">Evidence</h4>
                <p className="text-xs text-gray-600">Digital Polymat philosophy, strategic vision, meaning-centered approach</p>
              </div>
            </div>
          </div>

          {/* Analytical Mind Highlight */}
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">The Analytical Mind</h3>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Beyond multiple intelligences, my <strong>analytical mindset</strong> serves as the synthesizing force
                that connects disparate domains. This systematic approach combines systems thinking, critical analysis,
                and strategic synthesis to create innovative solutions that transcend traditional boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PersonalPhilosophy />
      <Timeline />
      <SkillsMatrix />
    </div>
  )
}

