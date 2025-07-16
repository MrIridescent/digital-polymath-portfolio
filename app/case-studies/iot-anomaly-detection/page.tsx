import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Database, ExternalLink, Github, Play, CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Real-Time IoT Anomaly Detection Engine | Case Study',
  description: 'How polymathic thinking solved agricultural IoT challenges by synthesizing systems programming, data science, and human-centered design.',
}

const technologies = [
  { name: 'Go', category: 'Backend', reason: 'High-concurrency performance for data ingestion' },
  { name: 'Apache Kafka', category: 'Data Pipeline', reason: 'Reliable message streaming at scale' },
  { name: 'TensorFlow Lite', category: 'ML/AI', reason: 'Lightweight edge deployment of ML models' },
  { name: 'React Native', category: 'Mobile', reason: 'Cross-platform farmer interface' },
  { name: 'PostgreSQL', category: 'Database', reason: 'ACID compliance for critical agricultural data' },
  { name: 'Kubernetes', category: 'Infrastructure', reason: 'Auto-scaling for seasonal workload variations' }
]

const outcomes = [
  { metric: '1M+', description: 'Data points processed per minute', icon: TrendingUp },
  { metric: '<200ms', description: 'Average processing latency', icon: Zap },
  { metric: '98%', description: 'Critical failure detection accuracy', icon: CheckCircle },
  { metric: '15%', description: 'Projected reduction in crop loss', icon: Shield }
]

const processSteps = [
  {
    phase: 'Discovery & Domain Research',
    description: 'Immersed myself in agricultural operations, studying crop cycles, equipment failure patterns, and farmer workflows to understand the human context behind the technical requirements.',
    insights: ['Equipment failures follow seasonal patterns', 'Farmers need actionable alerts, not raw data', 'Network connectivity varies significantly across rural areas']
  },
  {
    phase: 'Systems Architecture Design',
    description: 'Designed a distributed architecture that could handle massive data ingestion while maintaining real-time processing capabilities and edge computing requirements.',
    insights: ['Edge processing reduces latency and bandwidth costs', 'Kafka provides fault-tolerant message streaming', 'Microservices enable independent scaling of components']
  },
  {
    phase: 'ML Model Development',
    description: 'Developed lightweight anomaly detection models that could run efficiently on edge devices while maintaining high accuracy for agricultural equipment monitoring.',
    insights: ['TensorFlow Lite enables edge deployment', 'Domain-specific features improve accuracy', 'Model compression maintains performance with reduced size']
  },
  {
    phase: 'Human-Centered Interface Design',
    description: 'Created mobile interfaces that translate complex sensor data into clear, actionable insights that farmers can understand and act upon immediately.',
    insights: ['Visual alerts work better than numerical data', 'Context-aware notifications reduce alert fatigue', 'Offline capability essential for rural connectivity']
  }
]

export default function IoTAnomalyDetectionCaseStudy() {
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
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <Database className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                Real-Time IoT Anomaly Detection Engine
              </h1>
              <p className="text-xl text-slate-600">Architecting Agricultural Intelligence</p>
            </div>
          </div>
        </div>

        {/* Challenge Section */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Challenge</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            A leading agricultural firm needed a scalable system to monitor thousands of in-field IoT sensors 
            in real-time and alert farmers to equipment malfunctions or anomalous environmental conditions 
            before crop damage could occur. The existing system was reactive rather than predictive, leading 
            to significant crop losses and equipment downtime.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Scale Challenge</h3>
              <p className="text-slate-600 text-sm">10,000+ sensors across multiple farms generating continuous data streams</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Latency Requirements</h3>
              <p className="text-slate-600 text-sm">Sub-5-minute detection for critical equipment failures</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Edge Constraints</h3>
              <p className="text-slate-600 text-sm">Limited connectivity and processing power in rural environments</p>
            </div>
          </div>
        </div>

        {/* Polymathic Approach */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Polymathic Approach</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Solving this challenge required more than just backend engineering. The solution demanded a synthesis 
            of three distinct fields: high-throughput systems programming to handle the data firehose, data science 
            to build a lightweight predictive model for anomaly detection, and human-centered design to present 
            complex alerts to farmers in a simple, actionable mobile interface.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Systems Programming</h3>
              <p className="text-slate-600 text-sm">High-throughput data ingestion and real-time processing architecture</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Data Science</h3>
              <p className="text-slate-600 text-sm">Lightweight ML models for edge-based anomaly detection</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Human-Centered Design</h3>
              <p className="text-slate-600 text-sm">Intuitive mobile interfaces for actionable farmer insights</p>
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

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The Process</h2>
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-8">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">{index + 1}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="w-0.5 h-16 bg-emerald-200 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{step.phase}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{step.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-800 text-sm">Key Insights:</h4>
                    {step.insights.map((insight, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                        <span className="text-slate-600 text-sm">{insight}</span>
                      </div>
                    ))}
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
              <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <outcome.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">{outcome.metric}</div>
                <p className="text-slate-600 text-sm">{outcome.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Client Testimonial</h3>
            <blockquote className="text-slate-600 italic leading-relaxed">
              "They didn't just build what we asked for; they understood our business problem on a deeper level 
              and delivered a solution that was more robust and insightful than we had imagined. The system has 
              transformed how we approach preventive maintenance."
            </blockquote>
            <cite className="text-slate-500 text-sm mt-2 block">— Sarah Johnson, Head of Operations, AgriTech Solutions</cite>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            View Live Demo
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-colors"
          >
            <Github className="h-5 w-5" />
            View Source Code
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-colors"
          >
            <Play className="h-5 w-5" />
            Technical Deep Dive
          </a>
        </div>

        {/* Next Case Study */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Next Case Study</h3>
              <p className="text-slate-600">Enterprise Financial Platform Migration</p>
            </div>
            <Link
              href="/case-studies/financial-microservices"
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
