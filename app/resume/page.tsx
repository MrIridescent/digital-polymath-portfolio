import { Metadata } from 'next'
import { Mail, Phone, Globe, Github, Linkedin } from 'lucide-react'
import { PrintButton } from '@/components/PrintButton'

export const metadata: Metadata = {
  title: 'Resume | Polymathic Coder',
  description: 'Professional resume featuring the Polymathic Skills Matrix and detailed experience in interdisciplinary software development.',
}

const skillsDomains = [
  {
    domain: 'Architectural Paradigms & Systems Thinking',
    coreExpertise: [
      'Microservices, Event-Driven Architecture, Domain-Driven Design (DDD)',
      'RESTful & GraphQL APIs, Systems Design & Modeling',
      'Cloud-Native Patterns'
    ],
    broadProficiency: [
      'Serverless Architecture, Service-Oriented Architecture (SOA)',
      'Monolithic Decomposition Strategies, SRE Principles'
    ]
  },
  {
    domain: 'Frontend & UX Ecosystems',
    coreExpertise: [
      'JavaScript (ESNext), TypeScript, React, Redux Toolkit',
      'HTML5, CSS3/SASS, Webpack',
      'Responsive & Accessible Design (WCAG)'
    ],
    broadProficiency: [
      'Vue.js, Angular, WebSockets, WebGL',
      'UI/UX Prototyping (Figma), Next.js (Server-Side Rendering)'
    ]
  },
  {
    domain: 'Backend & Data Persistence',
    coreExpertise: [
      'Node.js, Express.js, Fastify, NestJS',
      'Relational Databases (PostgreSQL, MySQL)',
      'NoSQL Databases (MongoDB, Redis)'
    ],
    broadProficiency: [
      'Python (Django, Flask), Go, Java (Spring Boot)',
      'Message Queues (RabbitMQ, Kafka), Elasticsearch'
    ]
  },
  {
    domain: 'Cloud, DevOps & Security',
    coreExpertise: [
      'AWS (EC2, S3, Lambda, RDS, EKS), Docker, Kubernetes',
      'CI/CD Pipelines (Jenkins, GitLab CI)',
      'Terraform (IaC), Nginx'
    ],
    broadProficiency: [
      'Google Cloud Platform (GCP), Azure',
      'Prometheus, Grafana, Threat Modeling, OWASP Top 10, GitOps'
    ]
  },
  {
    domain: 'Methodologies & Leadership',
    coreExpertise: [
      'Agile & Scrum Methodologies, Test-Driven Development (TDD)',
      'Technical Leadership & Mentoring',
      'Cross-Functional Collaboration'
    ],
    broadProficiency: [
      'Kanban, Lean Principles, Project Management',
      'Stakeholder Communication, Product Strategy'
    ]
  }
]

const experience = [
  {
    title: 'Senior Full Stack Architect',
    company: 'Quantum Dynamics Inc.',
    location: 'Remote',
    period: '2020 – Present',
    achievements: [
      'Architected and spearheaded the migration of a monolithic legacy platform to a scalable, cloud-native microservices architecture on AWS Kubernetes (EKS), resulting in a 40% reduction in average API response time, a 60% decrease in deployment failures, and a 50% increase in team deployment frequency.',
      'Engineered a new real-time data processing pipeline using Node.js, Kafka, and PostgreSQL to provide customers with instant analytics dashboards. Achieved sub-200ms data ingestion-to-visualization latency and enabled the launch of a new premium product tier, contributing to a 15% uplift in annual recurring revenue.',
      'Implemented a comprehensive security overhaul across all applications, integrating static analysis (SAST), dynamic analysis (DAST), and dependency scanning into the CI/CD pipeline. Eliminated 95% of identified critical vulnerabilities within one quarter and achieved SOC 2 Type II compliance.',
      'Mentored and guided a team of 8 mid-level and junior engineers, fostering a culture of collaborative problem-solving and continuous learning. Improved code quality and consistency through rigorous code reviews and the introduction of shared component libraries, reducing bug resolution time by 30%.'
    ]
  },
  {
    title: 'Full Stack Developer',
    company: 'Innovate Solutions Co.',
    location: 'Remote',
    period: '2016 – 2020',
    achievements: [
      'Developed and launched a new customer-facing portal using React, Redux, and TypeScript, providing self-service tools that were previously handled by support staff. Reduced customer support ticket volume by 25% and increased customer satisfaction scores by 18%.',
      'Optimized database performance by identifying and rewriting inefficient SQL queries and implementing a Redis caching layer for frequently accessed data. Decreased average page load time for the main dashboard from 4 seconds to under 800ms (a 75% improvement).',
      'Collaborated with the UX team to redesign the application\'s primary workflow, resulting in a more intuitive user journey. Increased user engagement with key features by 35% and reduced the user error rate by 20%.',
      'Automated the end-to-end testing suite using Cypress and integrated it into the GitLab CI pipeline, which increased test coverage from 40% to 90% and allowed the team to catch critical bugs before production.'
    ]
  }
]

const projects = [
  {
    title: 'Project Synapse: Neural Network Visualization Tool',
    description: 'Designed and built an open-source tool for visualizing neural network architectures using Three.js and Python, featured in a leading AI newsletter.',
    link: 'github.com/polymathiccoder/synapse'
  },
  {
    title: 'Acoustic Atlas: Bird Song Data Analysis',
    description: 'A personal project analyzing and mapping bird song data from across North America, involving data scraping, audio processing in Python, and a web-based interactive map.',
    link: 'acousticatlas.dev'
  }
]

export default function ResumePage() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Print/Download Controls */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <h1 className="text-2xl font-bold text-slate-900">Professional Resume</h1>
          <PrintButton />
        </div>

        {/* Resume Content */}
        <div className="bg-white shadow-lg print:shadow-none" id="resume-content">
          {/* Header */}
          <div className="border-b-2 border-slate-200 pb-6 mb-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">The Polymathic Coder</h1>
              <div className="flex justify-center items-center gap-6 text-slate-600 text-sm">
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>hello@polymathiccoder.dev</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>polymathiccoder.dev</span>
                </div>
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" />
                  <span>linkedin.com/in/polymathiccoder</span>
                </div>
                <div className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  <span>github.com/polymathiccoder</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Monograph */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Professional Monograph</h2>
            <p className="text-slate-700 leading-relaxed">
              Digital Polymath and Senior Full Stack Architect with 10+ years of experience engineering and deploying 
              scalable, resilient, and secure enterprise applications. A systems thinker dedicated to bridging the gap 
              between elegant, human-centered user experience (Arte) and robust, performant backend architecture (Scienza). 
              Proven ability to lead cross-functional teams in Agile environments, spearheading a cloud-native platform 
              overhaul that reduced infrastructure costs by 30% and improved system uptime to 99.99%. Adept at leveraging 
              a comb-shaped skill set to transform complex business requirements into high-value, maintainable software solutions.
            </p>
          </div>

          {/* Core Competencies: The Digital Polymath's Toolkit */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Core Competencies: The Digital Polymath's Toolkit</h2>
            <p className="text-sm text-slate-600 mb-6 italic">
              This profile represents a "Comb-Shaped" skillset, indicating multiple areas of deep expertise built upon 
              a broad, interconnected foundation of knowledge, enabling cross-disciplinary innovation and problem-solving.
            </p>
            
            <div className="space-y-6">
              {skillsDomains.map((domain, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-bold text-slate-900 mb-3">{domain.domain}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm mb-2">Core Expertise (The Teeth of the Comb)</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        {domain.coreExpertise.map((skill, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400 mt-1">•</span>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-600 text-sm mb-2">Broad Proficiency (The Spine of the Comb)</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {domain.broadProficiency.map((skill, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400 mt-1">•</span>
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Professional Experience: A Record of Demonstration</h2>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900">{job.title}</h3>
                      <p className="text-slate-700">{job.company} | {job.location}</p>
                    </div>
                    <span className="text-slate-600 font-medium">{job.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Interdisciplinary Projects */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Interdisciplinary Projects</h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-slate-900">{project.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-1">{project.description}</p>
                  <p className="text-sm text-primary-600">({project.link})</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Education & Certifications</h2>
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-slate-900">M.S. in Computer Science</h3>
                <p className="text-slate-700">Stanford University | Stanford, CA</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">B.A. in Philosophy</h3>
                <p className="text-slate-700">Swarthmore College | Swarthmore, PA</p>
              </div>
              <div className="mt-4">
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Certified Kubernetes Application Developer (CKAD)</li>
                  <li>• AWS Certified Solutions Architect – Associate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
