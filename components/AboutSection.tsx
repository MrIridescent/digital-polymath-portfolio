'use client'

import { motion } from 'framer-motion'
import { Shield, Code, Brain, Lightbulb, Award, GraduationCap, MapPin, Phone, Mail, Linkedin } from 'lucide-react'
import { SpectacularText } from './SpectacularText'
import { AdvancedCard } from './AdvancedCard'

export function AboutSection() {
  const certifications = [
    { name: 'Cisco Certified Ethical Hacker', year: '2024', icon: Shield },
    { name: 'Cisco Cyber Threat Management (CyberTM)', year: '2024', icon: Shield },
    { name: 'Cisco Certified Endpoint Security Engineer', year: '2023', icon: Shield },
    { name: 'Cisco CyberOps Associate', year: '2022', icon: Shield },
    { name: 'AWS Educate Getting Started with Compute', year: '2023', icon: Code },
    { name: 'CompTIA A+ & N+', year: '2017', icon: Award }
  ]

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of the People',
      location: 'Pasadena, CA',
      status: 'In Progress, Expected 2026',
      icon: GraduationCap
    },
    {
      degree: 'Bachelor of Business Administration',
      institution: 'Les Cours Sonou University',
      location: 'Cotonou, Benin Republic',
      status: '2015',
      icon: GraduationCap
    }
  ]

  const coreCompetencies = [
    {
      title: 'Cybersecurity & Cyber Threat Management',
      description: 'Cisco-certified expertise in threat intelligence, risk assessment, incident response, and proactive cybersecurity measures',
      icon: Shield,
      color: 'neon'
    },
    {
      title: 'Software & Application Development',
      description: 'Python, Java, React Native, Flutter, Android - creating secure, high-performance apps',
      icon: Code,
      color: 'hologram'
    },
    {
      title: 'Digital Product Architecture',
      description: 'End-to-end strategy and execution for scalable, user-centered digital products',
      icon: Brain,
      color: 'quantum'
    },
    {
      title: 'Creative Innovation',
      description: 'AI, Web3, and cutting-edge solutions to complex problems',
      icon: Lightbulb,
      color: 'magnetic'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-primary-200/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SpectacularText 
            effect="renaissance"
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            The Creative Renaissance Man
          </SpectacularText>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            As a senior full stack developer and cybersecurity professional, I create robust digital solutions
            that help businesses grow while securing their futures. Combining Computer Science expertise
            with Business Administration insights to bridge technical innovation with strategic goals.
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <AdvancedCard effect="glass" className="p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary-600" />
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-sm text-slate-600">Lagos, Nigeria</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-600" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-sm text-slate-600">+234 904 125 8180</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-600" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-slate-600">mriridescent@yahoo.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-primary-600" />
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-sm text-slate-600">linkedin.com/in/mriridescent</div>
                </div>
              </div>
            </div>
          </AdvancedCard>
        </motion.div>

        {/* Core Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Core Competencies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreCompetencies.map((competency, index) => (
              <motion.div
                key={competency.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <AdvancedCard effect={competency.color as 'hologram' | 'neon' | 'glass' | 'magnetic' | 'liquid'} className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <competency.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{competency.title}</h4>
                      <p className="text-slate-600">{competency.description}</p>
                    </div>
                  </div>
                </AdvancedCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-8 text-center">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AdvancedCard effect="hologram" className="p-4">
                    <div className="flex items-center gap-4">
                      <cert.icon className="h-8 w-8 text-primary-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-sm text-slate-600">{cert.year}</p>
                      </div>
                    </div>
                  </AdvancedCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-8 text-center">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <AdvancedCard effect="quantum" className="p-6">
                    <div className="flex items-start gap-4">
                      <edu.icon className="h-8 w-8 text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-lg">{edu.degree}</h4>
                        <p className="text-primary-600 font-medium">{edu.institution}</p>
                        <p className="text-sm text-slate-600">{edu.location}</p>
                        <p className="text-sm text-slate-500 mt-1">{edu.status}</p>
                      </div>
                    </div>
                  </AdvancedCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Professional Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <AdvancedCard effect="renaissance" className="p-8 max-w-4xl mx-auto">
            <SpectacularText
              effect="plasma"
              className="text-2xl font-bold mb-6"
            >
              "Creating solutions where Arte meets Scienza"
            </SpectacularText>
            <p className="text-lg text-slate-700 leading-relaxed">
              Since 2017, I have led a talented team delivering exceptional web and mobile apps,
              secure software, and complete IT solutions. As a Cisco Cyber Threat Manager (CyberTM),
              CyberOps Associate, and Verified Ethical Hacker, I specialize in threat intelligence
              gathering, risk assessment, incident response, and proactive cybersecurity measures.
              My mission is to turn bold ideas into real results using technology to build secure
              and effective platforms that help businesses succeed in the digital age.
            </p>
          </AdvancedCard>
        </motion.div>
      </div>
    </section>
  )
}
