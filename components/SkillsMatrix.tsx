'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Server, Monitor, Database, Cloud, Users, Brain, Shield } from 'lucide-react'
import { AnimatedText, GradientText } from './AnimatedText'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const skillDomains = [
  {
    domain: 'Cybersecurity & Cyber Threat Management',
    icon: Shield,
    coreExpertise: [
      'Cisco Cyber Threat Management (CyberTM)',
      'Ethical Hacking & Penetration Testing',
      'Endpoint Security Engineering',
      'Threat Intelligence & Analysis',
      'Incident Response & Remediation',
      'Risk Assessment & Vulnerability Management'
    ],
    broadProficiency: [
      'Security Architecture Design',
      'Continuous Monitoring & Surveillance',
      'Compliance & Governance',
      'Red Team Operations',
      'Security Awareness Training',
      'Threat Modeling & Simulation'
    ],
    color: 'red'
  },
  {
    domain: 'Architectural Paradigms & Systems Thinking',
    icon: Brain,
    coreExpertise: [
      'Microservices Architecture',
      'Event-Driven Architecture',
      'Domain-Driven Design (DDD)',
      'RESTful & GraphQL APIs',
      'Systems Design & Modeling',
      'Cloud-Native Patterns'
    ],
    broadProficiency: [
      'Serverless Architecture',
      'Service-Oriented Architecture (SOA)',
      'Monolithic Decomposition Strategies',
      'SRE Principles'
    ],
    color: 'primary'
  },
  {
    domain: 'Frontend & UX Ecosystems',
    icon: Monitor,
    coreExpertise: [
      'JavaScript (ESNext)',
      'TypeScript',
      'React & Next.js',
      'Redux Toolkit',
      'HTML5 & CSS3/SASS',
      'Responsive & Accessible Design (WCAG)'
    ],
    broadProficiency: [
      'Vue.js',
      'Angular',
      'WebSockets',
      'WebGL',
      'UI/UX Prototyping (Figma)',
      'Server-Side Rendering'
    ],
    color: 'accent'
  },
  {
    domain: 'Backend & Data Persistence',
    icon: Server,
    coreExpertise: [
      'Node.js & Express.js',
      'Python (Django, Flask)',
      'Java (Spring Boot)',
      'PostgreSQL & MySQL',
      'MongoDB & Redis',
      'API Design & Security'
    ],
    broadProficiency: [
      'Go',
      'Rust',
      'Message Queues (RabbitMQ, Kafka)',
      'Elasticsearch',
      'GraphQL Federation'
    ],
    color: 'indigo'
  },
  {
    domain: 'Cloud, DevOps & Security',
    icon: Cloud,
    coreExpertise: [
      'AWS (EC2, S3, Lambda, RDS, EKS)',
      'Docker & Kubernetes',
      'CI/CD Pipelines (Jenkins, GitLab CI)',
      'Terraform (IaC)',
      'Nginx & Load Balancing',
      'Security Best Practices'
    ],
    broadProficiency: [
      'Google Cloud Platform (GCP)',
      'Azure',
      'Prometheus & Grafana',
      'Threat Modeling',
      'OWASP Top 10',
      'GitOps'
    ],
    color: 'emerald'
  },
  {
    domain: 'Data & AI Integration',
    icon: Database,
    coreExpertise: [
      'SQL & NoSQL Databases',
      'Data Modeling & ETL',
      'Machine Learning Integration',
      'TensorFlow & PyTorch',
      'Natural Language Processing',
      'Real-time Analytics'
    ],
    broadProficiency: [
      'Apache Spark',
      'Data Visualization (D3.js)',
      'Statistical Analysis',
      'Computer Vision',
      'MLOps Pipelines'
    ],
    color: 'purple'
  },
  {
    domain: 'Methodologies & Leadership',
    icon: Users,
    coreExpertise: [
      'Agile & Scrum Methodologies',
      'Test-Driven Development (TDD)',
      'Technical Leadership & Mentoring',
      'Cross-Functional Collaboration',
      'Code Review & Quality Assurance',
      'Project Architecture Planning'
    ],
    broadProficiency: [
      'Kanban',
      'Lean Principles',
      'Stakeholder Communication',
      'Product Strategy',
      'Team Building',
      'Technical Writing'
    ],
    color: 'orange'
  }
]

const colorClasses = {
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    icon: 'text-red-600'
  },
  primary: {
    bg: 'bg-primary-50',
    border: 'border-primary-200',
    text: 'text-primary-700',
    icon: 'text-primary-600'
  },
  accent: {
    bg: 'bg-accent-50',
    border: 'border-accent-200',
    text: 'text-accent-700',
    icon: 'text-accent-600'
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    icon: 'text-indigo-600'
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    icon: 'text-emerald-600'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    icon: 'text-purple-600'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    icon: 'text-orange-600'
  }
}

export function SkillsMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="section-padding bg-white relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeInUp}>
            <GradientText className="text-3xl sm:text-4xl font-bold mb-6 block">
              The Polymathic Skills Matrix
            </GradientText>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <AnimatedText
              text="This 'Comb-Shaped' skillset represents multiple areas of deep expertise built upon a broad, interconnected foundation of knowledge, enabling cross-disciplinary innovation and problem-solving."
              className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
              type="reveal"
              delay={0.5}
            />
          </motion.div>

          <motion.div
            className="mt-8 flex justify-center"
            variants={fadeInUp}
          >
            <motion.div
              className="bg-slate-100 rounded-lg p-4 text-sm text-slate-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-4 h-4 bg-primary-600 rounded"></div>
                  <span>Core Expertise (The Teeth of the Comb)</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-4 h-4 bg-slate-400 rounded"></div>
                  <span>Broad Proficiency (The Spine of the Comb)</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="grid gap-8">
          {skillDomains.map((domain, index) => {
            const colors = colorClasses[domain.color as keyof typeof colorClasses]
            return (
              <motion.div
                key={domain.domain}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 sm:p-8`}
              >
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <domain.icon className={`h-8 w-8 ${colors.icon}`} />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className={`text-xl sm:text-2xl font-bold ${colors.text} mb-6`}>
                      {domain.domain}
                    </h3>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                          <div className="w-3 h-3 bg-slate-800 rounded"></div>
                          Core Expertise (The Teeth of the Comb)
                        </h4>
                        <div className="space-y-2">
                          {domain.coreExpertise.map((skill) => (
                            <div key={skill} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                              <span className="text-slate-700 font-medium">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-600 mb-4 flex items-center gap-2">
                          <div className="w-3 h-3 bg-slate-400 rounded"></div>
                          Broad Proficiency (The Spine of the Comb)
                        </h4>
                        <div className="space-y-2">
                          {domain.broadProficiency.map((skill) => (
                            <div key={skill} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                              <span className="text-slate-600">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              The Polymathic Advantage
            </h3>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              This interdisciplinary expertise enables me to architect solutions that bridge domains, 
              select the optimal technology for each challenge, and communicate effectively across 
              technical and business stakeholders.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
