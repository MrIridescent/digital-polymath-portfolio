import { ProjectGrid } from '@/components/ProjectGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of full-stack applications, AI/ML projects, and innovative solutions.',
}

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Featured Projects
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A showcase of innovative solutions spanning full-stack development, 
            AI/ML integration, and system architecture.
          </p>
        </div>
        
        <ProjectGrid />
      </div>
    </div>
  )
}