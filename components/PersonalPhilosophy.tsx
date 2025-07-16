'use client'

import { motion } from 'framer-motion'
import { Brain, Code, Users, Target, BookOpen } from 'lucide-react'

const philosophyPrinciples = [
  {
    icon: Brain,
    title: 'Systems over Silos',
    description: 'View software not as isolated components but as living systems where every line of code influences the organizational structure, user workflow, and business goals.',
    color: 'primary'
  },
  {
    icon: Target,
    title: 'Outcomes over Output',
    description: 'Measure success not by features shipped or lines written, but by tangible impact delivered to users and business value created.',
    color: 'accent'
  },
  {
    icon: Code,
    title: 'Resilience over Rigidity',
    description: 'Design systems that anticipate and embrace change, capable of evolving without collapsing under their own weight.',
    color: 'indigo'
  },
  {
    icon: Users,
    title: 'Context over Content',
    description: 'Understand that the most critical element in decision-making is not more information, but the right context and empathy.',
    color: 'emerald'
  }
]

const ignoranceList = [
  'Quantum Computing Applications in Web Development',
  'Biomimetic Algorithms for Distributed Systems', 
  'Behavioral Economics in User Interface Design',
  'Sustainable Computing and Green Software Architecture',
  'Neuroscience-Informed API Design Patterns',
  'Game Theory Applications in Microservices Communication'
]

const colorClasses = {
  primary: 'bg-primary-100 text-primary-600',
  accent: 'bg-accent-100 text-accent-600',
  indigo: 'bg-indigo-100 text-indigo-600',
  emerald: 'bg-emerald-100 text-emerald-600'
}

export function PersonalPhilosophy() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Philosophy Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            My Philosophy
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            The Polymathic Coder approach is built on core principles that reframe software development 
            from a technical practice to an interdisciplinary art form.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {philosophyPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-8"
            >
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${colorClasses[principle.color as keyof typeof colorClasses]}`}>
                  <principle.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {principle.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Brand Story */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">The Polymathic Approach</h3>
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-600 leading-relaxed mb-6">
              I am a Digital Polymath and Senior Full Stack Architect with over a decade of experience 
              engineering solutions that transcend traditional boundaries. My journey began with a simple 
              realization: the most challenging problems in technology don't respect the neat divisions 
              between frontend and backend, between code and design, between technical and human.
            </p>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              While others specialized deeper into single domains, I chose a different path. I became 
              fluent in multiple programming paradigms—from the object-oriented elegance of Java to 
              the functional beauty of Haskell, from the event-driven nature of JavaScript to the 
              systems-level precision of Rust. But more importantly, I learned to think across disciplines.
            </p>
            
            <p className="text-slate-600 leading-relaxed">
              Today, I don't just write code—I architect experiences. I don't just solve technical 
              problems—I bridge the gap between what's possible and what's needed. I am a translator 
              between the language of machines and the language of human needs, a systems thinker 
              who sees the whole picture and builds the connections that drive true innovation.
            </p>
          </div>
        </div>

        {/* Ignorance List */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">My Ignorance List</h3>
          </div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            True to the polymathic spirit, I maintain a curated list of topics I'm currently 
            curious about and actively learning. This demonstrates intellectual humility, 
            a voracious appetite for knowledge, and commitment to continuous growth.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {ignoranceList.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                <span className="text-slate-700">{topic}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
