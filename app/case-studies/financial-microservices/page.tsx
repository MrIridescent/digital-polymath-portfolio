import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Cloud, ExternalLink, Github, Play, CheckCircle, TrendingDown, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Enterprise Financial Platform Migration | Case Study',
  description: 'How polymathic thinking enabled a successful monolith-to-microservices migration while maintaining strict security and compliance requirements.',
}

const technologies = [
  { name: 'Java Spring Boot', category: 'Backend Framework', reason: 'Enterprise-grade security and transaction handling' },
  { name: 'Docker', category: 'Containerization', reason: 'Consistent deployment across environments' },
  { name: 'Kubernetes', category: 'Orchestration', reason: 'Auto-scaling and service mesh capabilities' },
  { name: 'PostgreSQL', category: 'Database', reason: 'ACID compliance for financial transactions' },
  { name: 'Redis', category: 'Caching', reason: 'High-performance session and data caching' },
  { name: 'AWS', category: 'Cloud Platform', reason: 'Managed services and compliance certifications' }
]

const outcomes = [
  { metric: '40%', description: 'Reduction in API response times', icon: Zap },
  { metric: '60%', description: 'Decrease in deployment failures', icon: TrendingDown },
  { metric: 'SOC 2', description: 'Type II compliance achieved', icon: Shield },
  { metric: '$500K', description: 'Annual infrastructure cost savings', icon: CheckCircle }
]

const migrationPhases = [
  {
    phase: 'Domain Analysis & Decomposition',
    description: 'Applied Domain-Driven Design principles to identify bounded contexts within the monolithic codebase, mapping business capabilities to potential microservices.',
    challenges: ['Legacy code with tight coupling', 'Unclear business domain boundaries', 'Shared database dependencies'],
    solutions: ['Event storming workshops with business stakeholders', 'Gradual extraction using the Strangler Fig pattern', 'Database decomposition with eventual consistency']
  },
  {
    phase: 'Security & Compliance Architecture',
    description: 'Designed a security-first microservices architecture that maintained regulatory compliance while enabling independent service deployment.',
    challenges: ['Distributed authentication and authorization', 'Audit trail across services', 'Data encryption in transit and at rest'],
    solutions: ['JWT-based service-to-service authentication', 'Centralized audit logging with correlation IDs', 'End-to-end encryption with key rotation']
  },
  {
    phase: 'Gradual Migration Strategy',
    description: 'Implemented a phased migration approach that allowed the business to continue operating while gradually moving functionality to microservices.',
    challenges: ['Zero-downtime migration requirements', 'Data consistency during transition', 'Team coordination across multiple services'],
    solutions: ['Blue-green deployment strategy', 'Event-driven architecture for data synchronization', 'Cross-functional team structure with service ownership']
  },
  {
    phase: 'Observability & Monitoring',
    description: 'Built comprehensive monitoring and observability into the new architecture to ensure system reliability and performance visibility.',
    challenges: ['Distributed tracing across services', 'Centralized logging and metrics', 'Alerting for business-critical workflows'],
    solutions: ['OpenTelemetry for distributed tracing', 'ELK stack for centralized logging', 'Custom business metrics and SLA monitoring']
  }
]

export default function FinancialMicroservicesCaseStudy() {
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
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Cloud className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                Enterprise Financial Platform Migration
              </h1>
              <p className="text-xl text-slate-600">From Monolith to Microservices</p>
            </div>
          </div>
        </div>

        {/* Challenge Section */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Challenge</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            A fintech company needed to modernize their legacy monolithic system to handle 10x growth while 
            maintaining strict security and compliance requirements. The existing system was becoming a bottleneck 
            for innovation, with deployment cycles taking weeks and any change risking the entire platform.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Scale Requirements</h3>
              <p className="text-slate-600 text-sm">Handle 10x transaction volume growth over 18 months</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Compliance Constraints</h3>
              <p className="text-slate-600 text-sm">Maintain SOC 2, PCI DSS, and regional financial regulations</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Business Continuity</h3>
              <p className="text-slate-600 text-sm">Zero-downtime migration with no service interruption</p>
            </div>
          </div>
        </div>

        {/* Polymathic Approach */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Polymathic Approach</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            This migration required more than technical expertise. Success demanded combining deep systems 
            architecture knowledge with financial domain expertise, regulatory understanding, and organizational 
            change management. The solution bridged technology, business operations, and compliance requirements.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Systems Architecture</h3>
              <p className="text-slate-600 text-sm">Distributed systems design with fault tolerance and scalability</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Financial Domain Expertise</h3>
              <p className="text-slate-600 text-sm">Understanding of financial workflows and regulatory requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Change Management</h3>
              <p className="text-slate-600 text-sm">Organizational transformation and team coordination strategies</p>
            </div>
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

        {/* Migration Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The Migration Process</h2>
          <div className="space-y-8">
            {migrationPhases.map((phase, index) => (
              <div key={index} className="flex gap-8">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold">{index + 1}</span>
                  </div>
                  {index < migrationPhases.length - 1 && (
                    <div className="w-0.5 h-16 bg-primary-200 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{phase.phase}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{phase.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-red-600 text-sm mb-2">Challenges:</h4>
                      <div className="space-y-1">
                        {phase.challenges.map((challenge, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                            <span className="text-slate-600 text-sm">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-emerald-600 text-sm mb-2">Solutions:</h4>
                      <div className="space-y-1">
                        {phase.solutions.map((solution, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                            <span className="text-slate-600 text-sm">{solution}</span>
                          </div>
                        ))}
                      </div>
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
              <div key={index} className="bg-primary-50 border border-primary-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <outcome.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-2">{outcome.metric}</div>
                <p className="text-slate-600 text-sm">{outcome.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Client Testimonial</h3>
            <blockquote className="text-slate-600 italic leading-relaxed">
              "The migration was flawless. Not only did we achieve our technical goals, but the new architecture 
              has enabled us to innovate faster than ever before. The team's understanding of both our technical 
              and business requirements was exceptional."
            </blockquote>
            <cite className="text-slate-500 text-sm mt-2 block">— Michael Chen, CTO, FinanceFlow Technologies</cite>
          </div>
        </div>

        {/* Architecture Diagram Placeholder */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Architecture Overview</h2>
          <div className="bg-slate-100 rounded-xl p-12 text-center">
            <div className="w-24 h-24 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cloud className="h-12 w-12 text-slate-500" />
            </div>
            <p className="text-slate-600">Interactive architecture diagram would be displayed here</p>
            <p className="text-slate-500 text-sm mt-2">Showing microservices topology, data flow, and security boundaries</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            View Architecture Details
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors"
          >
            <Github className="h-5 w-5" />
            Migration Playbook
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors"
          >
            <Play className="h-5 w-5" />
            Technical Presentation
          </a>
        </div>

        {/* Next Case Study */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Next Case Study</h3>
              <p className="text-slate-600">Contextual AI Recommendation System</p>
            </div>
            <Link
              href="/case-studies/ai-recommendation-engine"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Read Next →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
