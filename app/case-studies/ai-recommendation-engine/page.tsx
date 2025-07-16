import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Brain, ExternalLink, Github, Play, CheckCircle, TrendingUp, Users, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contextual AI Recommendation System | Case Study',
  description: 'How polymathic thinking created an ethical AI recommendation system that balanced effectiveness with transparency and user agency.',
}

const technologies = [
  { name: 'Python', category: 'ML Backend', reason: 'Rich ecosystem for machine learning and data processing' },
  { name: 'TensorFlow', category: 'ML Framework', reason: 'Scalable neural network training and inference' },
  { name: 'React', category: 'Frontend', reason: 'Interactive user interface with real-time updates' },
  { name: 'GraphQL', category: 'API Layer', reason: 'Flexible data fetching for personalized content' },
  { name: 'MongoDB', category: 'Database', reason: 'Flexible schema for diverse user interaction data' },
  { name: 'Apache Spark', category: 'Data Processing', reason: 'Large-scale batch processing for model training' }
]

const outcomes = [
  { metric: '30%', description: 'Increase in user engagement', icon: TrendingUp },
  { metric: '25%', description: 'Improvement in conversion rates', icon: CheckCircle },
  { metric: '90%', description: 'User satisfaction with transparency', icon: Users },
  { metric: 'Featured', description: 'At AI Ethics conference', icon: Award }
]

const developmentPhases = [
  {
    phase: 'Ethical AI Framework Design',
    description: 'Established principles for responsible AI that balanced business objectives with user agency and transparency, drawing from behavioral psychology and ethics research.',
    insights: ['Users prefer explainable recommendations over black-box accuracy', 'Diversity in recommendations prevents filter bubbles', 'User control over recommendation factors increases trust'],
    implementation: 'Built configurable recommendation weights and explanation interfaces'
  },
  {
    phase: 'Multi-Modal Data Integration',
    description: 'Designed a system to incorporate diverse data sources while respecting privacy boundaries and providing users with control over their data usage.',
    insights: ['Implicit feedback (clicks, time spent) more reliable than explicit ratings', 'Contextual factors (time, device, location) significantly impact preferences', 'Cold start problem requires content-based fallbacks'],
    implementation: 'Created unified user profile system with privacy controls and data source transparency'
  },
  {
    phase: 'Hybrid Recommendation Architecture',
    description: 'Developed a sophisticated system combining collaborative filtering, content-based filtering, and contextual bandits to optimize for both accuracy and diversity.',
    insights: ['Ensemble methods outperform single algorithms', 'Real-time adaptation improves user satisfaction', 'Serendipity factor prevents recommendation staleness'],
    implementation: 'Built modular ML pipeline with A/B testing framework for algorithm optimization'
  },
  {
    phase: 'Transparency & User Control Interface',
    description: 'Created intuitive interfaces that explain recommendation reasoning and allow users to adjust their recommendation preferences in real-time.',
    insights: ['Visual explanations more effective than text descriptions', 'Granular controls increase user engagement', 'Feedback loops improve recommendation quality'],
    implementation: 'Developed interactive recommendation dashboard with explanation tooltips and preference sliders'
  }
]

const ethicalPrinciples = [
  {
    principle: 'Transparency',
    description: 'Users can see why items were recommended and what data influenced the decision',
    implementation: 'Explanation interface showing recommendation factors and weights'
  },
  {
    principle: 'User Agency',
    description: 'Users have control over their recommendation preferences and can opt out of certain data usage',
    implementation: 'Preference dashboard with granular privacy controls'
  },
  {
    principle: 'Diversity',
    description: 'Recommendations include diverse content to prevent filter bubbles and echo chambers',
    implementation: 'Diversity injection algorithm with configurable exploration parameters'
  },
  {
    principle: 'Fairness',
    description: 'Recommendation algorithms avoid bias and provide equal opportunity for content discovery',
    implementation: 'Bias detection metrics and fairness constraints in model training'
  }
]

export default function AIRecommendationEngineCaseStudy() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Navigation */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Case Studies
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                Contextual AI Recommendation System
              </h1>
              <p className="text-xl text-slate-600">Bridging ML and User Experience</p>
            </div>
          </div>
        </div>

        {/* Challenge Section */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Challenge</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            An e-commerce platform needed to increase user engagement through personalized recommendations 
            while maintaining transparency and avoiding filter bubbles. The existing system was a black box 
            that users didn't trust, and recommendations often felt repetitive or irrelevant.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">User Trust Issues</h3>
              <p className="text-slate-600 text-sm">Low user confidence in recommendation quality and relevance</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Filter Bubble Problem</h3>
              <p className="text-slate-600 text-sm">Users trapped in narrow recommendation loops limiting discovery</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Ethical AI Requirements</h3>
              <p className="text-slate-600 text-sm">Need for transparent, fair, and user-controlled recommendations</p>
            </div>
          </div>
        </div>

        {/* Polymathic Approach */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Polymathic Approach</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            This project required integrating machine learning algorithms with behavioral psychology principles 
            and ethical AI considerations. The solution bridged technical ML capabilities with human psychology 
            insights and moral philosophy to create a system that was both effective and responsible.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Machine Learning</h3>
              <p className="text-slate-600 text-sm">Advanced recommendation algorithms with real-time adaptation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Behavioral Psychology</h3>
              <p className="text-slate-600 text-sm">Understanding user decision-making and preference formation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Ethical AI</h3>
              <p className="text-slate-600 text-sm">Responsible AI principles ensuring fairness and transparency</p>
            </div>
          </div>
        </div>

        {/* Ethical AI Framework */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Ethical AI Framework</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {ethicalPrinciples.map((principle, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{principle.principle}</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{principle.description}</p>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-purple-700 text-sm font-medium">Implementation:</p>
                  <p className="text-purple-600 text-sm">{principle.implementation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Synthesized */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Technologies Synthesized</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{tech.name}</h3>
                    <span className="text-sm text-slate-500">{tech.category}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{tech.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Development Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The Development Process</h2>
          <div className="space-y-8">
            {developmentPhases.map((phase, index) => (
              <div key={index} className="flex gap-8">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">{index + 1}</span>
                  </div>
                  {index < developmentPhases.length - 1 && (
                    <div className="w-0.5 h-16 bg-purple-200 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{phase.phase}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{phase.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-purple-600 text-sm mb-2">Key Insights:</h4>
                      <div className="space-y-1">
                        {phase.insights.map((insight, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                            <span className="text-slate-600 text-sm">{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-emerald-600 text-sm mb-2">Implementation:</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{phase.implementation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The Outcomes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {outcomes.map((outcome, index) => (
              <div key={index} className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <outcome.icon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{outcome.metric}</div>
                <p className="text-slate-600 text-sm">{outcome.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Client Testimonial</h3>
            <blockquote className="text-slate-600 italic leading-relaxed">
              "This recommendation system transformed our user experience. Not only did we see significant 
              improvements in engagement and conversion, but our users actually trust and enjoy the 
              recommendations. The transparency features were a game-changer for user satisfaction."
            </blockquote>
            <cite className="text-slate-500 text-sm mt-2 block">— Lisa Rodriguez, VP of Product, ShopSmart</cite>
          </div>
        </div>

        {/* Algorithm Visualization Placeholder */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Recommendation Algorithm Flow</h2>
          <div className="bg-slate-100 rounded-xl p-12 text-center">
            <div className="w-24 h-24 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-12 w-12 text-slate-500" />
            </div>
            <p className="text-slate-600">Interactive algorithm visualization would be displayed here</p>
            <p className="text-slate-500 text-sm mt-2">Showing data flow, ML models, and decision points with user controls</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            Try Interactive Demo
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-purple-600 hover:text-purple-600 transition-colors"
          >
            <Github className="h-5 w-5" />
            View Source Code
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-purple-600 hover:text-purple-600 transition-colors"
          >
            <Play className="h-5 w-5" />
            Ethics Conference Talk
          </a>
        </div>

        {/* Next Case Study */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Next Case Study</h3>
              <p className="text-slate-600">Global Team Collaboration Platform</p>
            </div>
            <Link
              href="/case-studies/distributed-team-platform"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Read Next →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
