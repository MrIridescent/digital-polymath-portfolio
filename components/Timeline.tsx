'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Lightbulb } from 'lucide-react'

const timelineEvents = [
  {
    year: '2024',
    type: 'work',
    icon: Briefcase,
    title: 'Senior Software Architect',
    company: 'Quantum Dynamics Inc.',
    description: 'Leading architectural design for enterprise SaaS products serving 5M+ users. Spearheaded cloud-native migration resulting in 40% performance improvement.',
    achievements: ['Reduced API response time by 40%', 'Achieved SOC 2 Type II compliance', '50% increase in deployment frequency']
  },
  {
    year: '2023',
    type: 'achievement',
    icon: Award,
    title: 'Technical Innovation Award',
    company: 'Industry Recognition',
    description: 'Recognized for developing novel edge computing solution that revolutionized IoT device management.',
    achievements: ['99.9% system uptime', 'Featured in TechCrunch', 'Open-sourced with 2K+ stars']
  },
  {
    year: '2020',
    type: 'work',
    icon: Briefcase,
    title: 'Lead Full-Stack Developer',
    company: 'Tech Solutions Inc.',
    description: 'Led cross-functional team in building scalable e-commerce platform. Implemented microservices architecture and modern frontend.',
    achievements: ['25% reduction in support tickets', '18% increase in customer satisfaction', '90% test coverage achieved']
  },
  {
    year: '2018',
    type: 'innovation',
    icon: Lightbulb,
    title: 'Polymath Methodology',
    company: 'Personal Development',
    description: 'Developed systematic approach to interdisciplinary problem-solving, combining principles from multiple domains.',
    achievements: ['Published research paper', 'Mentored 50+ developers', 'Speaking at conferences']
  },
  {
    year: '2015',
    type: 'education',
    icon: GraduationCap,
    title: 'Computer Science Degree',
    company: 'University of Technology',
    description: 'Graduated with honors, focusing on distributed systems and human-computer interaction.',
    achievements: ['Summa Cum Laude', 'Research in AI/ML', 'Founded coding bootcamp']
  }
]

const typeColors = {
  work: 'bg-primary-100 text-primary-600',
  education: 'bg-accent-100 text-accent-600',
  achievement: 'bg-emerald-100 text-emerald-600',
  innovation: 'bg-purple-100 text-purple-600'
}

export function Timeline() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Professional Journey
          </h2>
          <p className="text-xl text-slate-600">
            Key milestones in my evolution as a polymathic software architect
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start gap-8"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${typeColors[event.type as keyof typeof typeColors]}`}>
                    <event.icon className="h-8 w-8" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold text-primary-600">{event.year}</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                      <p className="text-slate-600 font-medium">{event.company}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2">
                    {event.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-slate-700 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

