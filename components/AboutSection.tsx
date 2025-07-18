'use client'

import { motion } from 'framer-motion'
import { Shield, Code, Brain, Lightbulb, Award, GraduationCap, MapPin, Phone, Mail, Linkedin } from 'lucide-react'
import { SpectacularText } from './SpectacularText'
import { AdvancedCard } from './AdvancedCard'
import { SectionQuote } from './PolymathQuotes'
import { TechEvolutionTimeline } from './TechEvolutionTimeline'

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
      title: 'Frontend Mastery: HTML 1.0 to Modern Frameworks',
      description: 'Two decades of evolution from hand-coded MHTML/SHTML/XHTML/DHTML to React, Svelte, and cutting-edge web technologies. Authority built through witnessing and shaping every major frontend revolution.',
      icon: Code,
      color: 'hologram'
    },
    {
      title: 'Full-Stack Architecture & Backend Systems',
      description: 'From frontend foundations to backend mastery: Node.js, Python, PostgreSQL, Supabase, Firebase. Complete system design from database to deployment.',
      icon: Brain,
      color: 'quantum'
    },
    {
      title: 'Cybersecurity & Cyber Threat Management',
      description: 'Cisco-certified expertise in threat intelligence, risk assessment, incident response, and proactive cybersecurity measures',
      icon: Shield,
      color: 'neon'
    },
    {
      title: 'Abstract Conceptualization & Solution Architecture',
      description: 'Transforming complex business challenges into elegant technical solutions through systems thinking and interdisciplinary synthesis',
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
            From the HTML 1.0 era to today's quantum computing frontier, I've witnessed and shaped the evolution
            of web technology. My journey began in the foundational days of MHTML, SHTML, XHTML, and DHTML—when
            every pixel was hand-crafted and every interaction was an innovation. This deep historical perspective,
            combined with modern full-stack mastery and cybersecurity expertise, enables me to architect solutions
            that bridge decades of technological evolution with tomorrow's possibilities.
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

        {/* Philosophy of Experiential Knowledge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <AdvancedCard effect="renaissance" className="p-8 max-w-4xl mx-auto">
            <SpectacularText
              effect="electric"
              className="text-2xl font-bold mb-6 text-center"
            >
              "True Knowledge Cannot Be Quantified—Only Experienced"
            </SpectacularText>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-3">The Trial-and-Error Foundation</h4>
                <p className="text-slate-600 leading-relaxed mb-4">
                  My expertise wasn't built in classrooms but in the trenches of real-world problem-solving.
                  From debugging DHTML browser incompatibilities in the early 2000s to optimizing modern
                  React applications, every challenge has been a teacher.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  This hands-on methodology—breaking things, fixing them, and understanding why—has created
                  an intuitive grasp of technology that no certification can replicate.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-3">Solution-Oriented Thinking</h4>
                <p className="text-slate-600 leading-relaxed mb-4">
                  I don't just write code—I solve problems. Whether it's architecting a scalable backend,
                  securing against emerging threats, or creating intuitive user experiences, my approach
                  is always solution-first, technology-second.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  This abstract conceptualization ability allows me to see patterns across domains,
                  synthesizing insights from design, data science, and systems thinking into cohesive solutions.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg text-slate-700 italic">
                "My portfolio isn't just a showcase—it's a testament to decades of continuous learning,
                adaptation, and innovation in the ever-evolving landscape of web technology."
              </p>
            </div>
          </AdvancedCard>
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

            {/* Da Vinci Philosophy Quote */}
            <div className="mb-6">
              <SectionQuote category="philosophy" />
            </div>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              My coding odyssey began in 2004 during the dynamic web revolution—when XHTML was emerging
              and every line of code was an experiment. Through two decades of trial and error, breakthrough
              moments, and relentless hands-on exploration, I've evolved from crafting static pages to
              architecting dynamic, full-stack applications with modern frameworks and cloud infrastructure.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              This 20-year journey—from DHTML's early interactivity to React's virtual DOM, from server-side
              includes to today's AI-powered applications—has forged an understanding that transcends any
              single technology. My expertise isn't just theoretical knowledge from courses or certifications;
              it's battle-tested wisdom earned through countless hours of debugging, optimizing, and
              innovating across every layer of the web stack.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              As a Cisco Cyber Threat Manager (CyberTM), CyberOps Associate, and Verified Ethical Hacker,
              I now apply this deep technical foundation to cybersecurity, where my historical perspective
              on web vulnerabilities—from the early days of form exploits to modern API security—provides
              unique insights into threat intelligence
              gathering, risk assessment, incident response, and proactive cybersecurity measures.
              My mission is to turn bold ideas into real results using technology to build secure
              and effective platforms that help businesses succeed in the digital age.
            </p>
          </AdvancedCard>
        </motion.div>
      </div>

      {/* Technology Evolution Timeline */}
      <TechEvolutionTimeline />
    </section>
  )
}
