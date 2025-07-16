'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const featuredProjects = [
  {
    id: 1,
    title: 'Quantum Analytics Platform',
    description: 'Real-time data processing pipeline using Go microservices and React dashboard. Handles 1M+ events/second with sub-200ms latency.',
    image: '/api/placeholder/600/400',
    tags: ['Go', 'React', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    impact: '70% reduction in query times'
  },
  {
    id: 2,
    title: 'AI-Powered Code Review System',
    description: 'Machine learning system that analyzes code quality and suggests improvements. Built with Python, TensorFlow, and TypeScript frontend.',
    image: '/api/placeholder/600/400',
    tags: ['Python', 'TensorFlow', 'TypeScript', 'Docker', 'AWS'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    impact: '40% faster code reviews'
  },
  {
    id: 3,
    title: 'Distributed IoT Management',
    description: 'Edge computing solution for IoT device management using Rust for performance-critical components and Next.js for the dashboard.',
    image: '/api/placeholder/600/400',
    tags: ['Rust', 'Next.js', 'WebAssembly', 'MQTT', 'Edge Computing'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    impact: '99.9% uptime achieved'
  }
]

export function FeaturedProjects() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Showcasing interdisciplinary solutions that bridge multiple domains
            and deliver measurable business impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-500 to-accent-500">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-medium">{project.impact}</div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      className="text-slate-600 hover:text-primary-600 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={project.demo}
                      className="text-slate-600 hover:text-primary-600 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
                  >
                    Case Study <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            View All Projects <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

