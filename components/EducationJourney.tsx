'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Award, Shield, Code, Palette, Server, Brain, Globe } from 'lucide-react'
import { AdvancedCard } from './AdvancedCard'
import { SpectacularText } from './SpectacularText'
import { KineticContainer, KineticCard } from './KineticSystem'

interface EducationItem {
  year: string
  institution: string
  program: string
  specializations: string[]
  achievements: string[]
  icon: any
  color: string
  status: 'completed' | 'in-progress'
  location: string
}

const educationJourney: EducationItem[] = [
  {
    year: "2004-2015",
    institution: "University (Bachelor's Degree)",
    program: "Computer Science & Technology",
    specializations: ["Programming Fundamentals", "Web Development", "Software Engineering", "Database Systems"],
    achievements: ["Bachelor's Degree Completed", "Foundation in Computer Science", "Early Web Development Skills"],
    icon: GraduationCap,
    color: "neon",
    status: "completed",
    location: "Nigeria"
  },
  {
    year: "2017",
    institution: "New Horizons Computer Learning Centers",
    program: "IT Infrastructure & Networking",
    specializations: ["CompTIA A+ Certification", "CompTIA Network+ Certification", "Hardware & Software Troubleshooting", "Network Administration"],
    achievements: ["CompTIA A+ Certified", "CompTIA Network+ Certified", "IT Support Specialist Skills"],
    icon: Server,
    color: "hologram",
    status: "completed",
    location: "Nigeria"
  },
  {
    year: "2018-2019",
    institution: "Afrihub GDLI",
    program: "Digital Design & Development Institute",
    specializations: ["Graphic Design (Photoshop Mastery)", "Web Development (LAMP Stack)", "Web Development (MERN Stack)", "UI/UX Design Principles"],
    achievements: ["Advanced Photoshop Certification", "Full-Stack Web Development", "Modern JavaScript Frameworks", "Responsive Design Mastery"],
    icon: Palette,
    color: "quantum",
    status: "completed",
    location: "Abuja, Nigeria"
  },
  {
    year: "2020-2021",
    institution: "Afrihub GDLI (Advanced Programs)",
    program: "Cybersecurity & Programming Specialization",
    specializations: ["Cisco CyberOps Associate", "Python Programming", "Security Operations", "Threat Analysis"],
    achievements: ["Cisco CyberOps Associate Certified", "Python Programming Proficiency", "Security Operations Skills"],
    icon: Shield,
    color: "magnetic",
    status: "completed",
    location: "Abuja, Nigeria"
  },
  {
    year: "2022-2023",
    institution: "NITDA Local Academy",
    program: "Advanced Cybersecurity Specialization",
    specializations: ["Ethical Hacking (CEH)", "Cyber Threat Management", "Endpoint Security", "Security Consulting"],
    achievements: ["Certified Ethical Hacker", "Cisco Cyber Threat Manager", "Endpoint Security Specialist", "Freelance Security Consultant"],
    icon: Brain,
    color: "liquid",
    status: "completed",
    location: "Nigeria"
  },
  {
    year: "2024-2026",
    institution: "University of the People",
    program: "Computer Science (Bachelor's Completion)",
    specializations: ["Advanced Computer Science", "Software Engineering", "Data Structures & Algorithms", "Modern Development Practices"],
    achievements: ["Currently Enrolled", "Expected Graduation 2026", "Enhancing CS Foundation", "Global Online Education"],
    icon: Globe,
    color: "glass",
    status: "in-progress",
    location: "Online (Accredited US University)"
  }
]

export function EducationJourney() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <SpectacularText 
            effect="hologram"
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Educational Excellence Journey
          </SpectacularText>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Continuous learning through formal education, professional certifications, and specialized training programs 
            spanning two decades of technological advancement.
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {educationJourney.map((education, index) => (
            <KineticContainer
              key={education.year}
              variant={['flow', 'pulse', 'magnetic'][index % 3] as any}
              intensity="subtle"
            >
              <KineticCard variant="hover-lift" className="w-full">
                <AdvancedCard 
                  effect={education.color as any} 
                  className="p-6 md:p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Institution Info */}
                    <div className="flex items-start gap-4 lg:w-1/3">
                      <div className="p-3 bg-primary-100 rounded-lg flex-shrink-0">
                        <education.icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-slate-800">{education.institution}</h3>
                          {education.status === 'in-progress' && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-primary-600 font-semibold mb-1">{education.program}</p>
                        <p className="text-sm text-slate-500 mb-1">{education.year}</p>
                        <p className="text-sm text-slate-500">{education.location}</p>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="lg:w-1/3">
                      <h4 className="text-lg font-semibold text-slate-700 mb-3">Specializations</h4>
                      <div className="space-y-2">
                        {education.specializations.map((spec, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-primary-500 mt-1">•</span>
                            <span className="text-sm text-slate-600">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="lg:w-1/3">
                      <h4 className="text-lg font-semibold text-slate-700 mb-3">Key Achievements</h4>
                      <div className="space-y-2">
                        {education.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-accent-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AdvancedCard>
              </KineticCard>
            </KineticContainer>
          ))}
        </div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <AdvancedCard effect="renaissance" className="p-8 max-w-4xl mx-auto">
            <SpectacularText 
              effect="electric"
              className="text-xl md:text-2xl font-bold mb-4"
            >
              "Continuous Learning, Continuous Growth"
            </SpectacularText>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Currently pursuing Computer Science completion at University of the People while maintaining 
              active freelance security consulting practice. This combination of formal education and 
              real-world application ensures both theoretical depth and practical expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                🎓 University of the People (2024-2026)
              </span>
              <span className="px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                🛡️ Freelance Security Consultant
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                📚 Continuous Professional Development
              </span>
            </div>
          </AdvancedCard>
        </motion.div>
      </div>
    </section>
  )
}
