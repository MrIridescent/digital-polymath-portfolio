'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: 'Quantum Analytics Platform',
    description: 'Real-time data processing pipeline handling 1M+ events/second with Go microservices and React dashboard.',
    category: 'Full-Stack',
    tags: ['Go', 'React', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    year: '2024',
    impact: '70% reduction in query times',
    team: '5 engineers',
    duration: '8 months'
  },
  {
    id: 2,
    title: 'AI-Powered Code Review System',
    description: 'Machine learning system analyzing code quality with Python backend and TypeScript frontend.',
    category: 'AI/ML',
    tags: ['Python', 'TensorFlow', 'TypeScript', 'Docker', 'AWS'],
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    year: '2024',
    impact: '40% faster reviews',
    team: 'Solo project',
    duration: '6 months'
  },
  {
    id: 3,
    title: 'Distributed IoT Management',
    description: 'Edge computing solution for IoT devices using Rust and Next.js with WebAssembly optimization.',
    category: 'Systems',
    tags: ['Rust', 'Next.js', 'WebAssembly', 'MQTT', 'Edge Computing'],
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    year: '2023',
    impact: '99.9% uptime',
    team: '3 engineers',
    duration: '12 months'
  },
  {
    id: 4,
    title: 'Blockchain Supply Chain Tracker',
    description: 'Transparent supply chain tracking using smart contracts and real-time dashboard.',
    category: 'Blockchain',
    tags: ['Solidity', 'Web3.js', 'React', 'IPFS', 'Ethereum'],
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    year: '2023',
    impact: '100% transparency',
    team: '4 engineers',
    duration: '10 months'
  },
  {
    id: 5,
    title: 'Neural Network Visualization Tool',
    description: 'Interactive 3D visualization of neural networks using Three.js and Python backend.',
    category: 'Data Viz',
    tags: ['Python', 'Three.js', 'WebGL', 'TensorFlow', 'D3.js'],
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    year: '2023',
    impact: '90% better understanding',
    team: 'Solo project',
    duration: '4 months'
  },
  {
    id: 6,
    title: 'Microservices Orchestration Platform',
    description: 'Container orchestration platform with auto-scaling and service mesh integration.',
    category: 'DevOps',
    tags: ['Go', 'Kubernetes', 'Istio', 'Prometheus', 'Grafana'],
    image: '/api/placeholder/400/300',
    github: 'https://github.com',
    demo: 'https://demo.com',
    year: '2022',
    impact: '50% cost reduction',
    team: '6 engineers',
    duration: '14 months'
  }
]

const categories = ['All', 'Full-Stack', 'AI/ML', 'Systems', 'Blockchain', 'Data Viz', 'DevOps']

export function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative h-48 bg-gradient-to-br from-primary-500 to-accent-500">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
                  {project.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-medium">{project.impact}</div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className="text-sm text-slate-500">{project.year}</span>
              </div>
              
              <p className="text-slate-600 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="text-slate-500 text-sm">+{project.tags.length - 4} more</span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {project.team}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {project.duration}
                </div>
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
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
