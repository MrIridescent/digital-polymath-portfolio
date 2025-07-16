import { Metadata } from 'next'
import { Brain, Code, Lightbulb, Target, Eye, Puzzle, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Philosophy | Digital Polymath',
  description: 'The philosophical foundation of the Polymathic Coder approach - where Arte meets Scienza in software development.',
}

const daVincianPrinciples = [
  {
    name: 'Curiosità',
    title: 'Insatiable Curiosity',
    description: 'An unrelenting quest for continuous learning beyond the confines of any single domain.',
    icon: Brain,
    example: 'Exploring machine learning algorithms to enhance user experience design, or studying urban planning principles to architect better microservices.'
  },
  {
    name: 'Dimostrazione',
    title: 'Learning from Experience',
    description: 'Testing knowledge through real-world application and learning from both successes and failures.',
    icon: Target,
    example: 'Every project becomes a laboratory for validating theoretical knowledge against practical constraints and measurable outcomes.'
  },
  {
    name: 'Sensazione',
    title: 'Sharpening the Senses',
    description: 'Continual refinement of perception to create systems that are not just functional but elegantly intuitive.',
    icon: Eye,
    example: 'Designing interfaces that feel natural and building APIs that developers love to use, focusing on the human experience of technology.'
  },
  {
    name: 'Sfumato',
    title: 'Embracing Ambiguity',
    description: 'Thriving in uncertainty and finding opportunity in the unknown - essential for modern tech leadership.',
    icon: Puzzle,
    example: 'Navigating agile environments where requirements evolve, and architecting systems that can adapt to changing business needs.'
  },
  {
    name: 'Arte/Scienza',
    title: 'Art & Science Balance',
    description: 'The development of whole-brain thinking that balances analytical rigor with creative problem-solving.',
    icon: Lightbulb,
    example: 'Combining the precision of algorithms with the aesthetics of user interface design to create solutions that are both powerful and beautiful.'
  },
  {
    name: 'Corporalità',
    title: 'Mind-Body Balance',
    description: 'Cultivating the stamina and composure required to lead high-stakes projects and mentor teams effectively.',
    icon: Heart,
    example: 'Maintaining clarity and resilience under pressure, enabling sustained creative output and effective team leadership.'
  },
  {
    name: 'Connessione',
    title: 'Systems Thinking',
    description: 'Recognition of the interconnectedness of all things - the foundation of architectural excellence.',
    icon: Code,
    example: 'Understanding how frontend choices affect backend performance, how team structure influences code architecture, and how technical decisions impact business outcomes.'
  }
]

export default function PhilosophyPage() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            The Polymathic <span className="text-gradient">Manifesto</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            In an era of accelerating complexity, the most challenging problems emerge at the intersections of disciplines. 
            The Polymathic Coder specializes in these intersections, architecting solutions that transcend traditional boundaries.
          </p>
        </div>

        {/* Core Philosophy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Systems over Silos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-primary-600 mb-4">The Challenge</h3>
              <p className="text-slate-600 leading-relaxed">
                While the industry has been conditioned to seek specialists, the most profound and resilient solutions 
                arise from a synthesis of disparate ideas. The 'wicked' problems that define the frontier of innovation 
                do not respect the tidy boundaries of a single discipline.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent-600 mb-4">The Solution</h3>
              <p className="text-slate-600 leading-relaxed">
                The Polymathic Coder is a meta-specialist: a specialist in integration, learning, and complexity. 
                Their expertise lies in understanding how different technological components, business requirements, 
                and user needs interact within a larger system.
              </p>
            </div>
          </div>
        </div>

        {/* Da Vincian Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            The Seven Da Vincian Principles
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            These principles, inspired by Leonardo da Vinci's approach to learning and creation, 
            form the foundation of the Polymathic Coder methodology.
          </p>
          
          <div className="grid gap-8">
            {daVincianPrinciples.map((principle) => (
              <div key={principle.name} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <principle.icon className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-slate-900">{principle.title}</h3>
                      <span className="text-sm font-medium text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
                        {principle.name}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {principle.description}
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">In Practice:</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {principle.example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to See This Philosophy in Action?</h2>
          <p className="text-xl mb-8 opacity-90">
            Explore detailed case studies that demonstrate how these principles create breakthrough solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/case-studies"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              View Case Studies
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              My Journey
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
