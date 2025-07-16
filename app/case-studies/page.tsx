import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Brain, Database, Cloud, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Case Studies | Polymathic Coder',
  description: 'Detailed case studies demonstrating polymathic problem-solving in action - where interdisciplinary thinking creates breakthrough solutions.',
}

const caseStudies = [
  {
    id: 'iot-anomaly-detection',
    title: 'Real-Time IoT Anomaly Detection Engine',
    subtitle: 'Architecting Agricultural Intelligence',
    challenge: 'A leading agricultural firm needed a scalable system to monitor thousands of in-field IoT sensors in real-time and alert farmers to equipment malfunctions before crop damage could occur.',
    polymathicApproach: 'Solving this challenge required synthesis of three distinct fields: high-throughput systems programming for the data firehose, data science for lightweight predictive modeling, and human-centered design for actionable mobile interfaces.',
    technologies: ['Go', 'Apache Kafka', 'TensorFlow Lite', 'React Native', 'PostgreSQL', 'Kubernetes'],
    outcomes: [
      'Processed 1M+ data points per minute with <200ms latency',
      'Identified 98% of critical equipment failures within 5 minutes',
      'Projected 15% reduction in crop loss for pilot program'
    ],
    icon: Database,
    color: 'emerald',
    featured: true
  },
  {
    id: 'financial-microservices',
    title: 'Enterprise Financial Platform Migration',
    subtitle: 'From Monolith to Microservices',
    challenge: 'A fintech company needed to modernize their legacy monolithic system to handle 10x growth while maintaining strict security and compliance requirements.',
    polymathicApproach: 'Combined deep systems architecture knowledge with financial domain expertise and regulatory understanding to design a migration strategy that minimized business disruption while maximizing technical benefits.',
    technologies: ['Java Spring Boot', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS'],
    outcomes: [
      '40% reduction in API response times',
      '60% decrease in deployment failures',
      'Achieved SOC 2 Type II compliance',
      '$500K annual infrastructure cost savings'
    ],
    icon: Cloud,
    color: 'primary',
    featured: true
  },
  {
    id: 'ai-recommendation-engine',
    title: 'Contextual AI Recommendation System',
    subtitle: 'Bridging ML and User Experience',
    challenge: 'An e-commerce platform needed to increase user engagement through personalized recommendations while maintaining transparency and avoiding filter bubbles.',
    polymathicApproach: 'Integrated machine learning algorithms with behavioral psychology principles and ethical AI considerations to create a system that was both effective and responsible.',
    technologies: ['Python', 'TensorFlow', 'React', 'GraphQL', 'MongoDB', 'Apache Spark'],
    outcomes: [
      '30% increase in user engagement',
      '25% improvement in conversion rates',
      '90% user satisfaction with recommendation transparency',
      'Featured in AI Ethics conference'
    ],
    icon: Brain,
    color: 'purple',
    featured: true
  },
  {
    id: 'distributed-team-platform',
    title: 'Global Team Collaboration Platform',
    subtitle: 'Designing for Human Connection',
    challenge: 'A multinational corporation needed a platform to facilitate effective collaboration across time zones while maintaining team cohesion and company culture.',
    polymathicApproach: 'Applied insights from organizational psychology, cultural anthropology, and distributed systems design to create a platform that enhanced both technical collaboration and human connection.',
    technologies: ['Node.js', 'WebRTC', 'React', 'WebSockets', 'MongoDB', 'Docker'],
    outcomes: [
      '50% reduction in meeting overhead',
      '35% improvement in cross-team collaboration scores',
      'Adopted by 15,000+ employees globally',
      'Won internal innovation award'
    ],
    icon: Users,
    color: 'accent',
    featured: false
  }
]

const colorClasses = {
  primary: {
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    text: 'text-primary-700',
    icon: 'text-primary-600',
    button: 'bg-primary-600 hover:bg-primary-700'
  },
  accent: {
    bg: 'bg-accent-50',
    border: 'border-accent-200',
    text: 'text-accent-700',
    icon: 'text-accent-600',
    button: 'bg-accent-600 hover:bg-accent-700'
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    icon: 'text-emerald-600',
    button: 'bg-emerald-600 hover:bg-emerald-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    icon: 'text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700'
  }
}

export default function CaseStudiesPage() {
  const featuredStudies = caseStudies.filter(study => study.featured)
  const otherStudies = caseStudies.filter(study => !study.featured)

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Case Studies in <span className="text-gradient">Synthesis</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Detailed explorations of how polymathic thinking creates breakthrough solutions. 
            Each case study demonstrates the power of interdisciplinary problem-solving in action.
          </p>
        </div>

        {/* Featured Case Studies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Projects</h2>
          <div className="grid gap-8">
            {featuredStudies.map((study) => {
              const colors = colorClasses[study.color as keyof typeof colorClasses]
              return (
                <div key={study.id} className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-8`}>
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <study.icon className={`h-10 w-10 ${colors.icon}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-6">
                        <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
                          {study.title}
                        </h3>
                        <p className="text-slate-600 font-medium text-lg">{study.subtitle}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-3">The Challenge</h4>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {study.challenge}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-3">Polymathic Approach</h4>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {study.polymathicApproach}
                          </p>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="font-semibold text-slate-800 mb-3">Technologies Synthesized</h4>
                        <div className="flex flex-wrap gap-2">
                          {study.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-white text-slate-700 rounded-full text-sm font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 className="font-semibold text-slate-800 mb-3">Outcomes</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {study.outcomes.map((outcome, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                              <span className="text-slate-700 text-sm">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/case-studies/${study.id}`}
                        className={`inline-flex items-center gap-2 ${colors.button} text-white px-6 py-3 rounded-lg font-semibold transition-colors`}
                      >
                        Read Full Case Study
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Other Projects */}
        {otherStudies.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Additional Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {otherStudies.map((study) => {
                const colors = colorClasses[study.color as keyof typeof colorClasses]
                return (
                  <div key={study.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center`}>
                        <study.icon className={`h-6 w-6 ${colors.icon}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                          {study.title}
                        </h3>
                        <p className="text-slate-600 text-sm">{study.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {study.challenge}
                    </p>

                    <Link
                      href={`/case-studies/${study.id}`}
                      className={`inline-flex items-center gap-2 ${colors.button} text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors`}
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Discuss Your Challenge?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's explore how polymathic thinking can create breakthrough solutions for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
              >
                Start a Conversation
              </Link>
              <Link
                href="/philosophy"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Learn My Approach
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
