
import { Metadata } from 'next'
import { Timeline } from '@/components/Timeline'
import { SkillsMatrix } from '@/components/SkillsMatrix'
import { PersonalPhilosophy } from '@/components/PersonalPhilosophy'

export const metadata: Metadata = {
  title: 'About | Polymathic Coder',
  description: 'The journey of a polymathic software architect bridging multiple disciplines.',
}

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            The <span className="text-gradient">Polymathic Journey</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            For over a decade, I've been driven by a fascination with the intersection 
            of complex systems and intuitive design—the place where Arte and Scienza meet. 
            My journey has led me from crafting pixel-perfect user interfaces to 
            architecting resilient, high-traffic backend systems.
          </p>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold mb-8">From Curiosity to Craft</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              My path into technology wasn't linear. It began with an insatiable curiosity 
              about how things work—from the elegant algorithms that power search engines 
              to the distributed systems that keep our digital world running. This curiosity 
              led me to explore not just one domain, but the intersections between them.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              At my previous role, I had the opportunity to lead the migration of a legacy 
              monolith to a microservices architecture. It was a challenging puzzle, 
              embracing the initial ambiguity to ultimately deliver a system that cut 
              API response times by 40% and reduced infrastructure costs by over $500,000 annually.
            </p>
            <p className="text-slate-600 leading-relaxed">
              This experience crystallized my belief that the most impactful solutions 
              arise from interdisciplinary thinking—combining the analytical rigor of 
              systems architecture with the empathetic understanding of user experience.
            </p>
          </div>
        </div>
      </section>

      <PersonalPhilosophy />
      <Timeline />
      <SkillsMatrix />
    </div>
  )
}

