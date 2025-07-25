'use client'

import { motion } from 'framer-motion'

import { DynamicLayoutSystem } from '@/components/DynamicLayoutSystem'
import {
  Code,
  Shield,
  Brain,
  Cloud,
  Database,
  Layers,
  GitBranch,
  Cpu,
  Zap,
  Target,
  Building
} from 'lucide-react'

const skills = [
  {
    category: "Frontend Development",
    icon: Code,
    skills: [
      "React.js & Next.js ecosystem mastery",
      "TypeScript & Modern JavaScript (ES6+)",
      "Tailwind CSS & Advanced Styling",
      "Framer Motion & Animation Libraries",
      "Progressive Web Apps (PWA)",
      "Responsive & Mobile-First Design"
    ]
  },
  {
    category: "Backend Development",
    icon: Database,
    skills: [
      "Node.js & TypeScript backend development",
      "RESTful APIs & GraphQL",
      "Microservices Architecture",
      "Database Design (SQL & NoSQL)",
      "Authentication & Authorization",
      "Performance Optimization"
    ]
  },
  {
    category: "Enterprise Solutions",
    icon: Building,
    skills: [
      "Java Spring Framework & Spring Boot",
      "Enterprise Integration Patterns",
      "Apache Kafka & Message Queues",
      "Hibernate & JPA for Data Persistence",
      "Maven & Gradle Build Systems",
      "Enterprise Security (OAuth2, JWT)",
      "Microservices with Spring Cloud",
      "Enterprise API Gateway Solutions"
    ]
  },
  {
    category: "AI/ML & Data Science",
    icon: Brain,
    skills: [
      "Python for AI/ML and data science",
      "Machine Learning Algorithms",
      "Deep Learning & Neural Networks",
      "Data Analysis & Visualization",
      "Natural Language Processing",
      "Computer Vision Applications"
    ]
  },
  {
    category: "Cybersecurity",
    icon: Shield,
    skills: [
      "Cybersecurity frameworks and penetration testing",
      "Security Auditing & Vulnerability Assessment",
      "Network Security & Monitoring",
      "Incident Response & Forensics",
      "Compliance & Risk Management",
      "Ethical Hacking & Red Team Operations"
    ]
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      "Cloud platforms (AWS, Azure, GCP)",
      "Docker & Kubernetes orchestration",
      "CI/CD Pipeline Development",
      "Infrastructure as Code (Terraform)",
      "Monitoring & Logging Solutions",
      "Serverless Architecture"
    ]
  },
  {
    category: "System Architecture",
    icon: Layers,
    skills: [
      "Distributed Systems Design",
      "Scalable Architecture Patterns",
      "API Gateway & Load Balancing",
      "Event-Driven Architecture",
      "System Integration & Middleware",
      "Performance & Reliability Engineering"
    ]
  }
]

export default function SkillsPage() {
  return (
    <DynamicLayoutSystem>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section - Responsive spacing */}
        <section className="relative pt-24 pb-16 w-full overflow-x-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-7xl"> {/* Responsive padding with max width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                className="inline-flex items-center space-x-3 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="w-8 h-8 text-yellow-400" />
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  The Polymathic Skills Matrix
                </h1>
                <Target className="w-8 h-8 text-green-400" />
              </motion.div>
              
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                A comprehensive ecosystem of interdisciplinary expertise spanning full-stack development,
                cybersecurity, AI/ML, digital product architecture, and emerging technologies. Each skill
                represents years of hands-on experience and continuous learning across the Digital Polymat spectrum.
              </p>
              <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-xl">
                <span className="text-lg font-semibold">20+ Years of Evolution | 7+ Years Leading Innovation</span>
              </div>
            </motion.div>

            {/* Live Features Component */}
            {/* LiveFeatures removed to prevent duplicate cards during scrolling */}

            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {skills && skills.map((skillCategory, categoryIndex) => {
                const Icon = skillCategory.icon
                
                return (
                  <motion.div
                    key={skillCategory.category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Category Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <motion.div
                        className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          delay: categoryIndex * 0.5 
                        }}
                      >
                        <Icon className="w-6 h-6 text-blue-400" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white">
                        {skillCategory.category}
                      </h3>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-3">
                      {skillCategory.skills && skillCategory.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 
                          }}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                          whileHover={{ x: 4 }}
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: skillIndex * 0.2 
                            }}
                          />
                          
                          <span className="text-gray-200 text-sm font-medium leading-relaxed">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Skill Count Badge */}
                    <motion.div
                      className="mt-6 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Cpu className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-mono text-blue-300">
                        {skillCategory.skills.length} Core Skills
                      </span>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            {/* Skills Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Polymathic Approach to Technology
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  My skill set reflects a polymathic approach to technology, combining deep technical expertise 
                  with broad interdisciplinary knowledge. This enables me to architect comprehensive solutions 
                  that bridge multiple domains and deliver exceptional value across the entire technology stack.
                </p>
                
                <div className="mt-6 flex justify-center space-x-8 text-sm text-gray-400">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{skills.length}</div>
                    <div>Skill Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {skills.reduce((total, category) => total + category.skills.length, 0)}
                    </div>
                    <div>Core Competencies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">20+</div>
                    <div>Years Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </DynamicLayoutSystem>
  )
}
