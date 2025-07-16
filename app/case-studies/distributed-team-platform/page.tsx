import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Users, ExternalLink, Github, Play, CheckCircle, TrendingUp, Globe, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Global Team Collaboration Platform | Case Study',
  description: 'How polymathic thinking created a collaboration platform that enhanced both technical productivity and human connection across global teams.',
}

const technologies = [
  { name: 'Node.js', category: 'Backend Runtime', reason: 'Event-driven architecture for real-time collaboration' },
  { name: 'WebRTC', category: 'Communication', reason: 'Peer-to-peer video/audio with low latency' },
  { name: 'React', category: 'Frontend Framework', reason: 'Component-based UI for complex collaboration interfaces' },
  { name: 'WebSockets', category: 'Real-time Protocol', reason: 'Bidirectional communication for live collaboration' },
  { name: 'MongoDB', category: 'Database', reason: 'Flexible schema for diverse collaboration data' },
  { name: 'Docker', category: 'Containerization', reason: 'Consistent deployment across global regions' }
]

const outcomes = [
  { metric: '50%', description: 'Reduction in meeting overhead', icon: TrendingUp },
  { metric: '35%', description: 'Improvement in collaboration scores', icon: CheckCircle },
  { metric: '15,000+', description: 'Employees using globally', icon: Globe },
  { metric: 'Winner', description: 'Internal innovation award', icon: Award }
]

const designPrinciples = [
  {
    principle: 'Asynchronous-First Design',
    description: 'Prioritize asynchronous collaboration to respect different time zones and work styles',
    implementation: 'Threaded discussions, async video messages, and time-shifted collaboration tools',
    psychology: 'Reduces pressure and allows for thoughtful responses'
  },
  {
    principle: 'Cultural Context Awareness',
    description: 'Adapt interface and interaction patterns to different cultural communication styles',
    implementation: 'Configurable communication preferences and cultural sensitivity features',
    psychology: 'Increases comfort and participation across diverse teams'
  },
  {
    principle: 'Presence Without Pressure',
    description: 'Show availability and activity without creating surveillance or pressure',
    implementation: 'Ambient awareness indicators and optional status sharing',
    psychology: 'Maintains team connection while preserving autonomy'
  },
  {
    principle: 'Serendipitous Interaction',
    description: 'Create opportunities for informal interactions that build team cohesion',
    implementation: 'Virtual coffee breaks, random team matching, and shared interest spaces',
    psychology: 'Replicates office spontaneity in distributed environment'
  }
]

const developmentPhases = [
  {
    phase: 'Anthropological Research',
    description: 'Conducted extensive research into how different cultures approach collaboration, communication styles, and relationship building in professional contexts.',
    insights: ['High-context vs low-context communication preferences vary by culture', 'Hierarchy expectations differ significantly across regions', 'Trust-building mechanisms vary between individualistic and collectivistic cultures'],
    implementation: 'Cultural adaptation framework with configurable communication styles'
  },
  {
    phase: 'Distributed Systems Architecture',
    description: 'Designed a globally distributed system that could provide low-latency collaboration while maintaining data consistency and reliability.',
    insights: ['Edge computing reduces latency for real-time collaboration', 'Eventual consistency acceptable for most collaboration data', 'Regional data residency requirements affect architecture decisions'],
    implementation: 'Multi-region deployment with intelligent routing and data synchronization'
  },
  {
    phase: 'Human Connection Features',
    description: 'Developed features specifically designed to foster human connection and team cohesion in a distributed environment.',
    insights: ['Informal interactions are crucial for team bonding', 'Shared experiences create stronger team connections', 'Visual cues help maintain human connection in digital spaces'],
    implementation: 'Virtual spaces, team rituals, and ambient awareness features'
  },
  {
    phase: 'Organizational Psychology Integration',
    description: 'Applied organizational psychology principles to design workflows and features that enhance team dynamics and productivity.',
    insights: ['Psychological safety increases participation in virtual meetings', 'Clear role definitions reduce confusion in distributed teams', 'Recognition systems boost morale in remote environments'],
    implementation: 'Team health metrics, role clarity tools, and peer recognition systems'
  }
]

export default function DistributedTeamPlatformCaseStudy() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Navigation */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Case Studies
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-accent-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                Global Team Collaboration Platform
              </h1>
              <p className="text-xl text-slate-600">Designing for Human Connection</p>
            </div>
          </div>
        </div>

        {/* Challenge Section */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Challenge</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            A multinational corporation needed a platform to facilitate effective collaboration across time zones 
            while maintaining team cohesion and company culture. Existing tools were fragmented, and remote teams 
            were struggling with isolation and communication barriers.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Cultural Barriers</h3>
              <p className="text-slate-600 text-sm">Different communication styles and cultural expectations across 12 countries</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Time Zone Challenges</h3>
              <p className="text-slate-600 text-sm">24-hour operations with minimal overlap between team members</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Team Cohesion</h3>
              <p className="text-slate-600 text-sm">Maintaining company culture and personal connections in distributed teams</p>
            </div>
          </div>
        </div>

        {/* Polymathic Approach */}
        <div className="bg-gradient-to-r from-accent-50 to-blue-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Polymathic Approach</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            This project required applying insights from organizational psychology, cultural anthropology, and 
            distributed systems design to create a platform that enhanced both technical collaboration and human 
            connection. The solution bridged technology with deep understanding of human behavior and cultural dynamics.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Organizational Psychology</h3>
              <p className="text-slate-600 text-sm">Understanding team dynamics and motivation in distributed environments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Cultural Anthropology</h3>
              <p className="text-slate-600 text-sm">Adapting to diverse communication styles and cultural expectations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Distributed Systems</h3>
              <p className="text-slate-600 text-sm">Global architecture for low-latency, reliable collaboration</p>
            </div>
          </div>
        </div>

        {/* Design Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Human-Centered Design Principles</h2>
          <div className="grid gap-6">
            {designPrinciples.map((principle, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{principle.principle}</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{principle.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-accent-50 rounded-lg p-4">
                    <p className="text-accent-700 text-sm font-medium mb-1">Implementation:</p>
                    <p className="text-accent-600 text-sm">{principle.implementation}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-700 text-sm font-medium mb-1">Psychology:</p>
                    <p className="text-blue-600 text-sm">{principle.psychology}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Synthesized */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Technologies Synthesized</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{tech.name}</h3>
                    <span className="text-sm text-slate-500">{tech.category}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{tech.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Development Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The Development Process</h2>
          <div className="space-y-8">
            {developmentPhases.map((phase, index) => (
              <div key={index} className="flex gap-8">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                    <span className="text-accent-600 font-bold">{index + 1}</span>
                  </div>
                  {index < developmentPhases.length - 1 && (
                    <div className="w-0.5 h-16 bg-accent-200 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{phase.phase}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{phase.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-accent-600 text-sm mb-2">Key Insights:</h4>
                      <div className="space-y-1">
                        {phase.insights.map((insight, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2"></div>
                            <span className="text-slate-600 text-sm">{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-emerald-600 text-sm mb-2">Implementation:</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{phase.implementation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The Outcomes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {outcomes.map((outcome, index) => (
              <div key={index} className="bg-accent-50 border border-accent-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <outcome.icon className="h-6 w-6 text-accent-600" />
                </div>
                <div className="text-3xl font-bold text-accent-600 mb-2">{outcome.metric}</div>
                <p className="text-slate-600 text-sm">{outcome.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Client Testimonial</h3>
            <blockquote className="text-slate-600 italic leading-relaxed">
              "This platform didn't just solve our technical collaboration challenges—it actually brought our 
              global teams closer together. The cultural sensitivity and human-centered design made all the 
              difference. Our teams report feeling more connected than ever before."
            </blockquote>
            <cite className="text-slate-500 text-sm mt-2 block">— David Kim, VP of Global Operations, TechGlobal Corp</cite>
          </div>
        </div>

        {/* Feature Showcase Placeholder */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Platform Features</h2>
          <div className="bg-slate-100 rounded-xl p-12 text-center">
            <div className="w-24 h-24 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-12 w-12 text-slate-500" />
            </div>
            <p className="text-slate-600">Interactive platform demo would be displayed here</p>
            <p className="text-slate-500 text-sm mt-2">Showing virtual spaces, collaboration tools, and cultural adaptation features</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            Try Platform Demo
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-accent-600 hover:text-accent-600 transition-colors"
          >
            <Github className="h-5 w-5" />
            View Architecture
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-accent-600 hover:text-accent-600 transition-colors"
          >
            <Play className="h-5 w-5" />
            Cultural Design Talk
          </a>
        </div>

        {/* Back to Case Studies */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Explore More</h3>
              <p className="text-slate-600">View all case studies in polymathic problem-solving</p>
            </div>
            <Link
              href="/case-studies"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              All Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
