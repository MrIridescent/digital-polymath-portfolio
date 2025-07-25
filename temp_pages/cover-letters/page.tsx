import { Metadata } from 'next'
import { Download, FileText, Crown, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cover Letter Templates | Polymathic Coder',
  description: 'Professional cover letter templates: The Sforza Archetype (formal & audacious) and The Humanized Dialogue (conversational & authentic).',
}

export default function CoverLettersPage() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Cover Letter <span className="text-gradient">Templates</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Two strategic approaches to professional correspondence: one audacious and formal, 
            the other conversational and authentic. Both designed to demonstrate polymathic thinking.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sforza Archetype */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">The Sforza Archetype</h2>
                  <p className="opacity-90">Formal & Audacious</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">
                Inspired by Leonardo da Vinci's letter to Ludovico Sforza, this template is designed 
                to capture the attention of visionary leaders through bold, confident language.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">Best Used For:</h3>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Innovative startups and forward-thinking companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Senior leadership and C-suite positions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Companies that value bold thinking and innovation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Roles requiring strategic vision and leadership</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">Sample Opening:</h4>
                <blockquote className="text-slate-600 italic text-sm leading-relaxed">
                  "Having now sufficiently seen and considered the achievements of those who count 
                  themselves masters and artificers of modern digital instruments, and having noted 
                  that the invention and performance of the said instruments often do not differ 
                  from that in common usage, I shall endeavor, while intending no discredit to others, 
                  to make myself understood to Your Excellency..."
                </blockquote>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Template
                </button>
                <button className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-purple-600 hover:text-purple-600 transition-colors">
                  <FileText className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Humanized Dialogue */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">The Humanized Dialogue</h2>
                  <p className="opacity-90">Conversational & Authentic</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">
                A warm, genuine approach that builds rapport and demonstrates cultural alignment 
                while showcasing polymathic thinking in accessible language.
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">Best Used For:</h3>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Companies with strong cultural values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Remote-first organizations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Collaborative team environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Positions emphasizing team fit and communication</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-slate-900 mb-2">Sample Opening:</h4>
                <blockquote className="text-slate-600 italic text-sm leading-relaxed">
                  "I've been following [Company Name]'s work for some time, and your recent launch 
                  of [specific project] particularly caught my eye. Your approach to solving 
                  [specific problem] resonates deeply with my own philosophy—that technology's 
                  highest purpose is to create systems that are not only powerful but also 
                  elegantly simple and human-centric."
                </blockquote>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Template
                </button>
                <button className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-emerald-600 hover:text-emerald-600 transition-colors">
                  <FileText className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Strategic Usage Guidelines</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">The Sforza Approach</h3>
              <div className="space-y-3 text-slate-600 text-sm">
                <p><strong>Risk Level:</strong> High-risk, high-reward</p>
                <p><strong>Target Audience:</strong> Visionary leaders, innovative companies</p>
                <p><strong>Tone:</strong> Confident, bold, historically-inspired</p>
                <p><strong>Goal:</strong> Capture imagination through capability demonstration</p>
                <p><strong>When to Use:</strong> When you want to stand out dramatically and the company culture supports bold approaches</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">The Humanized Dialogue</h3>
              <div className="space-y-3 text-slate-600 text-sm">
                <p><strong>Risk Level:</strong> Low-risk, relationship-building</p>
                <p><strong>Target Audience:</strong> Collaborative teams, culture-focused companies</p>
                <p><strong>Tone:</strong> Warm, genuine, professionally conversational</p>
                <p><strong>Goal:</strong> Build connection and demonstrate cultural fit</p>
                <p><strong>When to Use:</strong> When cultural alignment is paramount and authenticity is valued</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Customization Tips</h3>
            <ul className="text-slate-700 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>Research the company's recent projects and mention specific initiatives</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>Adapt the technical examples to match the company's technology stack</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>Include quantifiable achievements relevant to the role requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>Reference the hiring manager by name when possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>Connect your polymathic approach to their specific business challenges</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Craft Your Message?</h2>
            <p className="text-xl mb-8 opacity-90">
              Choose the approach that best fits your target opportunity and company culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
              >
                Get Personalized Help
              </a>
              <a
                href="/case-studies"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                See Results in Action
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
