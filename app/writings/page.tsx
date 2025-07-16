import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, BookOpen, Brain, Code } from 'lucide-react'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Writings | Polymathic Coder',
  description: 'Thought leadership articles on interdisciplinary software development, systems thinking, and the future of technology.',
}

const articles = [
  {
    id: 'beyond-full-stack',
    title: 'Beyond Full-Stack: Why the Future of Innovation Belongs to the Polymath Developer',
    excerpt: 'The most challenging problems of the 21st century will not be solved by code alone. They will be solved by people who can weave together threads of knowledge from multiple disciplines to create breakthrough solutions.',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Philosophy',
    featured: true,
    icon: Brain
  },
  {
    id: 'polyglot-mindset',
    title: 'The Polyglot Mindset: Choosing the Right Tool for Every Job',
    excerpt: 'True polyglot development isn\'t about collecting languages—it\'s about understanding paradigms and making pragmatic architectural decisions that serve the problem, not the preference.',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Technical',
    featured: true,
    icon: Code
  },
  {
    id: 'systems-thinking-software',
    title: 'Systems Thinking in Software: Lessons from Urban Planning',
    excerpt: 'What can the design of cities teach us about architecting software systems? Exploring how principles from urban planning can inform better microservices design.',
    date: '2024-01-05',
    readTime: '10 min read',
    category: 'Systems',
    featured: true,
    icon: BookOpen
  },
  {
    id: 'cognitive-load-architecture',
    title: 'Cognitive Load Theory in Software Architecture',
    excerpt: 'How understanding human cognitive limitations can guide better API design, documentation structure, and team organization in complex systems.',
    date: '2023-12-20',
    readTime: '7 min read',
    category: 'Philosophy',
    featured: false,
    icon: Brain
  },
  {
    id: 'biomimetic-algorithms',
    title: 'Biomimetic Algorithms: What Nature Teaches Us About Distributed Systems',
    excerpt: 'From ant colonies to neural networks, exploring how biological systems inspire more resilient and adaptive software architectures.',
    date: '2023-12-15',
    readTime: '9 min read',
    category: 'Technical',
    featured: false,
    icon: Code
  }
]

const categoryColors = {
  Philosophy: 'bg-purple-100 text-purple-700',
  Technical: 'bg-blue-100 text-blue-700',
  Systems: 'bg-emerald-100 text-emerald-700'
}

export default function WritingsPage() {
  const featuredArticles = articles.filter(article => article.featured)
  const otherArticles = articles.filter(article => !article.featured)

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Writings & <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Exploring the intersections of technology, design, and human experience through 
            the lens of polymathic thinking and interdisciplinary problem-solving.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Articles</h2>
          <div className="grid gap-8">
            {featuredArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <article.icon className="h-8 w-8 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[article.category as keyof typeof categoryColors]}`}>
                          {article.category}
                        </span>
                        <div className="flex items-center gap-4 text-slate-500 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(article.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        {article.title}
                      </h3>
                      
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {article.excerpt}
                      </p>

                      <Link
                        href={`/writings/${article.id}`}
                        className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                      >
                        Read Article
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Other Articles */}
        {otherArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">More Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {otherArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <article.icon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[article.category as keyof typeof categoryColors]}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-slate-500 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <Link
                      href={`/writings/${article.id}`}
                      className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </div>
    </div>
  )
}
