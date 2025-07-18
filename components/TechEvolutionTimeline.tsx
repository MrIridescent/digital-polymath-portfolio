'use client'

import { motion } from 'framer-motion'
import { Calendar, Code, Globe, Smartphone, Cloud, Brain, Shield } from 'lucide-react'
import { AdvancedCard } from './AdvancedCard'
import { SpectacularText } from './SpectacularText'

interface TimelineEvent {
  year: string
  era: string
  technologies: string[]
  milestone: string
  icon: any
  color: string
  description: string
}

const techEvolution: TimelineEvent[] = [
  {
    year: "1990s-2000s",
    era: "The Foundation Years",
    technologies: ["HTML 1.0", "MHTML", "SHTML", "Basic CSS", "JavaScript"],
    milestone: "Hand-crafted web pages, server-side includes",
    icon: Globe,
    color: "neon",
    description: "Where it all began—crafting every pixel by hand, learning the fundamental building blocks of the web."
  },
  {
    year: "2000s-2005",
    era: "Dynamic Web Era",
    technologies: ["XHTML", "DHTML", "CSS 2", "DOM Manipulation", "AJAX"],
    milestone: "Interactive web applications, cross-browser compatibility",
    icon: Code,
    color: "hologram",
    description: "The era of making static pages come alive—battling browser wars and creating the first truly dynamic experiences."
  },
  {
    year: "2005-2010",
    era: "Framework Revolution",
    technologies: ["jQuery", "PHP", "MySQL", "Web Standards", "Responsive Design"],
    milestone: "Standardized development practices, mobile-first thinking",
    icon: Smartphone,
    color: "quantum",
    description: "The rise of frameworks and the mobile revolution—learning to think beyond desktop screens."
  },
  {
    year: "2010-2015",
    era: "Modern Frontend",
    technologies: ["HTML5", "CSS3", "Node.js", "Angular", "React", "RESTful APIs"],
    milestone: "Single Page Applications, component-based architecture",
    icon: Brain,
    color: "magnetic",
    description: "The component revolution—moving from pages to applications, embracing the power of JavaScript everywhere."
  },
  {
    year: "2015-2020",
    era: "Full-Stack Mastery",
    technologies: ["React Native", "Flutter", "PostgreSQL", "Docker", "AWS", "GraphQL"],
    milestone: "Cross-platform development, cloud-native architecture",
    icon: Cloud,
    color: "liquid",
    description: "Expanding beyond the browser—mobile apps, cloud infrastructure, and truly full-stack thinking."
  },
  {
    year: "2020-Present",
    era: "AI & Security Era",
    technologies: ["Next.js", "Svelte", "Supabase", "AI/ML", "Cybersecurity", "Edge Computing"],
    milestone: "AI-powered development, advanced threat management",
    icon: Shield,
    color: "glass",
    description: "The convergence of AI and security—where decades of experience meet cutting-edge innovation."
  }
]

export function TechEvolutionTimeline() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-slate-50 to-primary-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <SpectacularText 
            effect="electric"
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Three Decades of Web Evolution
          </SpectacularText>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            From HTML 1.0 to AI-powered applications—a journey through every major revolution in web technology.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-accent-400 to-primary-600 transform md:-translate-x-0.5"></div>

          <div className="space-y-8 md:space-y-12">
            {techEvolution.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary-500 rounded-full transform -translate-x-1.5 md:-translate-x-1.5 z-10">
                  <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping"></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <AdvancedCard 
                    effect={event.color as any} 
                    className="p-6 hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <event.icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{event.era}</h3>
                        <div className="text-sm text-primary-600 font-medium">{event.year}</div>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-4 leading-relaxed">{event.description}</p>

                    <div className="mb-4">
                      <div className="text-sm font-semibold text-slate-700 mb-2">Key Milestone:</div>
                      <div className="text-sm text-slate-600 italic">{event.milestone}</div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-2">Technologies Mastered:</div>
                      <div className="flex flex-wrap gap-2">
                        {event.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </AdvancedCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <AdvancedCard effect="renaissance" className="p-8 max-w-4xl mx-auto">
            <SpectacularText 
              effect="plasma"
              className="text-xl md:text-2xl font-bold mb-4"
            >
              "Every Era Taught Me Something New"
            </SpectacularText>
            <p className="text-lg text-slate-700 leading-relaxed">
              This isn't just a career timeline—it's a testament to continuous adaptation and learning. 
              Each technological shift brought new challenges, new opportunities, and new ways of thinking. 
              From hand-coding HTML tables to architecting cloud-native applications, every step has built 
              the foundation for solving tomorrow's problems with today's innovations.
            </p>
          </AdvancedCard>
        </motion.div>
      </div>
    </section>
  )
}
