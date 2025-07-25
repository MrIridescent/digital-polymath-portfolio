'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { DynamicLayoutSystem } from '@/components/DynamicLayoutSystem'
import { SpectacularText } from '@/components/SpectacularText'
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Rocket,
  Target,
  Globe,
  Zap,
  Heart,
  Star,
  ArrowUp,
  BarChart3,
  PieChart,
  Activity,
  Award
} from 'lucide-react'

const clientSuccessMetrics = [
  {
    category: "Digital Transformation",
    icon: Rocket,
    color: "from-blue-500 to-cyan-600",
    stats: [
      { metric: "Website Performance", before: "3.2s", after: "0.8s", improvement: "75% faster loading" },
      { metric: "User Engagement", before: "2.1 min", after: "5.7 min", improvement: "171% increase" },
      { metric: "Conversion Rate", before: "1.8%", after: "4.2%", improvement: "133% boost" },
      { metric: "Mobile Responsiveness", before: "Poor", after: "Excellent", improvement: "100% mobile optimized" }
    ]
  },
  {
    category: "SEO & Traffic Growth",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-600",
    stats: [
      { metric: "Organic Traffic", before: "1,200/month", after: "4,800/month", improvement: "300% increase" },
      { metric: "Search Rankings", before: "Page 3-5", after: "Page 1", improvement: "Top 3 positions" },
      { metric: "Keyword Visibility", before: "15 keywords", after: "127 keywords", improvement: "747% expansion" },
      { metric: "Local Search Presence", before: "Not visible", after: "Top 3 local", improvement: "Dominant local presence" }
    ]
  },
  {
    category: "Security & Compliance",
    icon: Shield,
    color: "from-red-500 to-rose-600",
    stats: [
      { metric: "Security Vulnerabilities", before: "23 critical", after: "0 critical", improvement: "100% secure" },
      { metric: "Data Breach Risk", before: "High", after: "Minimal", improvement: "Enterprise-grade protection" },
      { metric: "Compliance Score", before: "42%", after: "98%", improvement: "133% improvement" },
      { metric: "Uptime Reliability", before: "94.2%", after: "99.9%", improvement: "6x more reliable" }
    ]
  },
  {
    category: "Business Growth",
    icon: BarChart3,
    color: "from-purple-500 to-pink-600",
    stats: [
      { metric: "Revenue Growth", before: "Baseline", after: "+45%", improvement: "Average client increase" },
      { metric: "Customer Acquisition", before: "12/month", after: "38/month", improvement: "217% more customers" },
      { metric: "Operational Efficiency", before: "Manual processes", after: "80% automated", improvement: "5x faster operations" },
      { metric: "Market Reach", before: "Local only", after: "Global presence", improvement: "International expansion" }
    ]
  }
]

const industryImpacts = [
  {
    industry: "FinTech Startups",
    icon: Target,
    achievements: [
      "Reduced transaction processing time by 67%",
      "Implemented security protocols preventing 100% of attempted breaches",
      "Enabled global payment processing in 15+ countries",
      "Achieved 99.9% uptime for critical financial operations"
    ],
    clientQuote: "David's polymathic approach transformed our fintech platform from a local solution to a globally competitive product.",
    clientRole: "CTO, Zandbox Global"
  },
  {
    industry: "Non-Profit Organizations",
    icon: Heart,
    achievements: [
      "Increased online donations by 156% through optimized user experience",
      "Expanded digital reach to 50,000+ new supporters",
      "Automated fundraising processes saving 20 hours/week",
      "Created multilingual platforms serving diverse communities"
    ],
    clientQuote: "The 35% SEO traffic increase David achieved helped us reach more children in need of education support.",
    clientRole: "Director, Trinitas Foundation"
  },
  {
    industry: "Real Estate",
    icon: Globe,
    achievements: [
      "Generated 300% more qualified leads through digital marketing",
      "Reduced property listing time by 45% with virtual tours",
      "Implemented CRM systems increasing client retention by 78%",
      "Created mobile-first platforms capturing 65% more mobile traffic"
    ],
    clientQuote: "Our property sales doubled after implementing David's comprehensive digital strategy.",
    clientRole: "Managing Director, Michel Holmes Properties"
  },
  {
    industry: "Tech Startups",
    icon: Zap,
    achievements: [
      "Accelerated MVP development by 60% using agile methodologies",
      "Reduced infrastructure costs by 40% through cloud optimization",
      "Implemented CI/CD pipelines increasing deployment frequency by 10x",
      "Created scalable architectures supporting 100x user growth"
    ],
    clientQuote: "David's technical leadership and remote team management skills were instrumental in our successful product launch.",
    clientRole: "Founder, Multiple Startup Clients"
  }
]

const futureProjections = [
  {
    title: "AI-Powered Automation",
    description: "Implementing intelligent automation systems",
    expectedImpact: "40-70% reduction in manual tasks",
    timeframe: "3-6 months",
    icon: Activity
  },
  {
    title: "Cybersecurity Hardening",
    description: "Enterprise-grade security implementation",
    expectedImpact: "99.9% threat prevention rate",
    timeframe: "2-4 months",
    icon: Shield
  },
  {
    title: "Global Market Expansion",
    description: "Multi-language, multi-currency platforms",
    expectedImpact: "200-500% market reach expansion",
    timeframe: "4-8 months",
    icon: Globe
  },
  {
    title: "Performance Optimization",
    description: "Speed and efficiency improvements",
    expectedImpact: "50-80% faster load times",
    timeframe: "1-3 months",
    icon: Rocket
  }
]

export default function StatisticsPage() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <DynamicLayoutSystem>
      <div className="pt-24 min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <SpectacularText
              effect="hologram"
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Impact & Statistics
            </SpectacularText>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Measurable results that demonstrate the transformative power of <strong>Digital Polymat</strong> expertise.
              These metrics showcase the intersection of <strong>Analytical Mind</strong> precision with
              <strong>Creatively Divergent Multipotentialite</strong> innovation across all nine Multiple Intelligences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center space-x-4 bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl"
            >
              <TrendingUp className="w-6 h-6" />
              <span className="text-lg font-semibold">Proven Results • Measurable Impact</span>
              <Award className="w-6 h-6" />
            </motion.div>
          </motion.div>

          {/* Client Success Metrics */}
          <section className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-12 text-gray-800"
            >
              Client Success Metrics
            </motion.h2>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {clientSuccessMetrics.map((category, index) => {
                const Icon = category.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                      activeCategory === index
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{category.category}</span>
                  </button>
                )
              })}
            </div>

            {/* Active Category Stats */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {clientSuccessMetrics[activeCategory].stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{stat.metric}</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Before:</span>
                      <span className="text-red-600 font-medium">{stat.before}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">After:</span>
                      <span className="text-green-600 font-bold">{stat.after}</span>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-semibold text-green-600">{stat.improvement}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Industry Impact Stories */}
          <section className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-12 text-gray-800"
            >
              Industry Impact Stories
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {industryImpacts.map((impact, index) => {
                const Icon = impact.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{impact.industry}</h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      {impact.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                      <blockquote className="text-gray-700 italic mb-3">
                        "{impact.clientQuote}"
                      </blockquote>
                      <div className="text-sm text-blue-600 font-semibold">
                        — {impact.clientRole}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* Future Projections */}
          <section>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-12 text-gray-800"
            >
              What Your Organization Could Achieve
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {futureProjections.map((projection, index) => {
                const Icon = projection.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-xl border border-blue-200"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">{projection.title}</h4>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">{projection.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-green-600">{projection.expectedImpact}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Timeline: {projection.timeframe}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-12 text-white"
            >
              <h3 className="text-3xl font-bold mb-6">
                Ready to Transform Your Organization?
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                These results aren't just statistics—they're proof of what's possible when you combine 
                technical excellence with strategic vision. Let's discuss how we can achieve similar 
                transformations for your organization.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-purple-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Schedule Consultation
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-900 transition-colors duration-300">
                  View Portfolio
                </button>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </DynamicLayoutSystem>
  )
}
