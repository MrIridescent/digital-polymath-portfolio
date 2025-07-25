// Comprehensive Service Knowledge Base - Everything David Offers
import { CurrencySystem, PriceRange } from './CurrencySystem'

export interface ServiceOffering {
  id: string
  name: string
  category: 'development' | 'ai' | 'security' | 'design' | 'consulting' | 'enterprise'
  subcategory: string
  description: string
  targetMarket: ('individual' | 'startup' | 'smb' | 'enterprise')[]
  
  // Pricing Structure
  pricing: {
    model: 'fixed' | 'hourly' | 'retainer' | 'equity' | 'custom'
    ranges: {
      individual?: string
      startup?: string
      smb?: string
      enterprise?: string
    }
    factors: string[] // What affects pricing
  }
  
  // Project Details
  timeline: {
    minimum: string
    typical: string
    complex: string
  }
  
  deliverables: string[]
  technologies: string[]
  requirements: string[]
  
  // Business Information
  valueProposition: string
  competitiveAdvantages: string[]
  successMetrics: string[]
  caseStudies: string[]
  
  // Qualification Criteria
  idealClient: {
    businessType: string[]
    budgetRange: string
    timelineExpectation: string
    technicalRequirements: string[]
  }
}

export class ServiceKnowledgeBase {
  private services: ServiceOffering[] = [
    // DEVELOPMENT SERVICES
    {
      id: 'web-development',
      name: 'Custom Web Development',
      category: 'development',
      subcategory: 'web-applications',
      description: 'Full-stack web applications using React, Next.js, TypeScript, and modern cloud infrastructure',
      targetMarket: ['individual', 'startup', 'smb', 'enterprise'],
      
      pricing: {
        model: 'fixed',
        ranges: {
          individual: '$3,000 - $8,000',
          startup: '$8,000 - $25,000',
          smb: '$15,000 - $50,000',
          enterprise: '$50,000 - $200,000+'
        },
        factors: ['Complexity', 'Integrations', 'Custom features', 'Timeline', 'Maintenance requirements']
      },
      
      timeline: {
        minimum: '2-4 weeks',
        typical: '6-12 weeks',
        complex: '3-6 months'
      },
      
      deliverables: [
        'Responsive web application',
        'Admin dashboard',
        'User authentication system',
        'Database design and setup',
        'API development',
        'Deployment and hosting setup',
        'Documentation and training',
        '3 months post-launch support'
      ],
      
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Vercel'],
      requirements: ['Clear project requirements', 'Content and assets', 'Hosting preferences', 'Timeline commitment'],
      
      valueProposition: 'Modern, scalable web applications that grow with your business, built with industry-leading technologies and security practices',
      competitiveAdvantages: [
        '20+ years of development experience',
        'Full-stack expertise from frontend to cloud infrastructure',
        'Security-first development approach',
        'Performance optimization expertise',
        'Ongoing support and maintenance'
      ],
      successMetrics: ['Page load speed < 2 seconds', '99.9% uptime', 'Mobile-responsive design', 'SEO optimized'],
      caseStudies: ['E-commerce platform with 40% conversion increase', 'Healthcare portal with HIPAA compliance'],
      
      idealClient: {
        businessType: ['SaaS', 'E-commerce', 'Professional services', 'Healthcare'],
        budgetRange: '$8,000+',
        timelineExpectation: '6+ weeks',
        technicalRequirements: ['Modern web application', 'Scalability', 'Security']
      }
    },

    {
      id: 'mobile-development',
      name: 'Mobile App Development',
      category: 'development',
      subcategory: 'mobile-applications',
      description: 'Cross-platform mobile applications using React Native and Flutter for iOS and Android',
      targetMarket: ['startup', 'smb', 'enterprise'],
      
      pricing: {
        model: 'fixed',
        ranges: {
          startup: '$15,000 - $40,000',
          smb: '$25,000 - $75,000',
          enterprise: '$75,000 - $300,000+'
        },
        factors: ['Platform complexity', 'Native features', 'Backend integration', 'App store requirements']
      },
      
      timeline: {
        minimum: '8-12 weeks',
        typical: '3-6 months',
        complex: '6-12 months'
      },
      
      deliverables: [
        'iOS and Android applications',
        'Backend API and database',
        'Admin panel',
        'App store submission',
        'User analytics setup',
        'Push notification system',
        'Documentation and training',
        '6 months post-launch support'
      ],
      
      technologies: ['React Native', 'Flutter', 'Firebase', 'AWS', 'Node.js', 'PostgreSQL'],
      requirements: ['App concept and wireframes', 'Target audience definition', 'App store accounts', 'Timeline commitment'],
      
      valueProposition: 'Native-quality mobile apps that work seamlessly across iOS and Android, with robust backend infrastructure',
      competitiveAdvantages: [
        'Cross-platform expertise reducing development costs',
        'Full-stack mobile development including backend',
        'App store optimization and submission experience',
        'Performance optimization for mobile devices'
      ],
      successMetrics: ['App store approval', 'Performance scores > 90', 'User retention > 70%', 'Crash rate < 1%'],
      caseStudies: ['Fintech app with 100K+ downloads', 'Healthcare app with real-time monitoring'],
      
      idealClient: {
        businessType: ['Fintech', 'Healthcare', 'E-commerce', 'Social platforms'],
        budgetRange: '$25,000+',
        timelineExpectation: '3+ months',
        technicalRequirements: ['Mobile-first experience', 'Cross-platform compatibility', 'Backend integration']
      }
    },

    // AI SERVICES
    {
      id: 'ai-chatbot-development',
      name: 'AI Chatbot & Virtual Assistant Development',
      category: 'ai',
      subcategory: 'conversational-ai',
      description: 'Custom AI chatbots and virtual assistants using LangChain, OpenAI, and advanced NLP technologies',
      targetMarket: ['startup', 'smb', 'enterprise'],
      
      pricing: {
        model: 'fixed',
        ranges: {
          startup: '$8,000 - $20,000',
          smb: '$15,000 - $40,000',
          enterprise: '$40,000 - $150,000+'
        },
        factors: ['Complexity of conversations', 'Integration requirements', 'Training data volume', 'Custom AI models']
      },
      
      timeline: {
        minimum: '4-6 weeks',
        typical: '8-12 weeks',
        complex: '3-6 months'
      },
      
      deliverables: [
        'Custom AI chatbot',
        'Natural language processing engine',
        'Integration with existing systems',
        'Admin dashboard for management',
        'Analytics and reporting',
        'Training and documentation',
        'Ongoing AI model optimization'
      ],
      
      technologies: ['LangChain', 'OpenAI GPT', 'Anthropic Claude', 'Vector databases', 'Python', 'FastAPI'],
      requirements: ['Use case definition', 'Training data or knowledge base', 'Integration requirements', 'Performance expectations'],
      
      valueProposition: 'Intelligent AI assistants that understand context, learn from interactions, and provide human-like customer service 24/7',
      competitiveAdvantages: [
        'Advanced RAG system implementation',
        'Custom AI model fine-tuning',
        'Multi-language support',
        'Enterprise-grade security and compliance'
      ],
      successMetrics: ['90%+ query resolution rate', 'Response time < 2 seconds', 'Customer satisfaction > 85%'],
      caseStudies: ['Customer service bot reducing support costs by 60%', 'Sales qualification bot increasing leads by 300%'],
      
      idealClient: {
        businessType: ['Customer service', 'E-commerce', 'Healthcare', 'Financial services'],
        budgetRange: '$15,000+',
        timelineExpectation: '8+ weeks',
        technicalRequirements: ['24/7 customer support', 'Scalable AI solution', 'Integration capabilities']
      }
    },

    {
      id: 'ai-automation',
      name: 'AI Process Automation',
      category: 'ai',
      subcategory: 'automation',
      description: 'Intelligent automation solutions using AI to streamline business processes and workflows',
      targetMarket: ['smb', 'enterprise'],
      
      pricing: {
        model: 'custom',
        ranges: {
          smb: '$20,000 - $75,000',
          enterprise: '$75,000 - $500,000+'
        },
        factors: ['Process complexity', 'Data volume', 'Integration scope', 'Custom AI model requirements']
      },
      
      timeline: {
        minimum: '8-12 weeks',
        typical: '3-6 months',
        complex: '6-12 months'
      },
      
      deliverables: [
        'Automated workflow systems',
        'AI-powered decision engines',
        'Data processing pipelines',
        'Integration with existing systems',
        'Monitoring and analytics dashboard',
        'Staff training and documentation',
        'Ongoing optimization and support'
      ],
      
      technologies: ['Python', 'TensorFlow', 'Apache Airflow', 'AWS', 'Docker', 'Kubernetes'],
      requirements: ['Current process documentation', 'Data access and quality', 'Stakeholder buy-in', 'Change management plan'],
      
      valueProposition: 'Transform manual processes into intelligent, automated workflows that reduce costs, eliminate errors, and scale with your business',
      competitiveAdvantages: [
        'End-to-end automation expertise',
        'Custom AI model development',
        'Enterprise integration experience',
        'ROI-focused implementation'
      ],
      successMetrics: ['50%+ time savings', '90%+ accuracy improvement', 'ROI within 12 months'],
      caseStudies: ['Document processing automation saving 40 hours/week', 'Inventory management AI reducing costs by 30%'],
      
      idealClient: {
        businessType: ['Manufacturing', 'Finance', 'Healthcare', 'Logistics'],
        budgetRange: '$50,000+',
        timelineExpectation: '3+ months',
        technicalRequirements: ['Process optimization', 'Data integration', 'Scalable automation']
      }
    },

    // SECURITY SERVICES
    {
      id: 'cybersecurity-assessment',
      name: 'Cybersecurity Assessment & Implementation',
      category: 'security',
      subcategory: 'security-audit',
      description: 'Comprehensive security audits, vulnerability assessments, and security framework implementation',
      targetMarket: ['smb', 'enterprise'],
      
      pricing: {
        model: 'fixed',
        ranges: {
          smb: '$5,000 - $25,000',
          enterprise: '$25,000 - $100,000+'
        },
        factors: ['System complexity', 'Compliance requirements', 'Remediation scope', 'Ongoing monitoring needs']
      },
      
      timeline: {
        minimum: '2-4 weeks',
        typical: '6-8 weeks',
        complex: '3-4 months'
      },
      
      deliverables: [
        'Comprehensive security audit report',
        'Vulnerability assessment and remediation plan',
        'Security policy documentation',
        'Implementation of security controls',
        'Staff security training',
        'Compliance certification assistance',
        'Ongoing monitoring setup'
      ],
      
      technologies: ['OWASP tools', 'Nessus', 'Burp Suite', 'Snyk', 'SonarQube', 'AWS Security Hub'],
      requirements: ['System access for assessment', 'Stakeholder availability', 'Compliance requirements', 'Budget for remediation'],
      
      valueProposition: 'Cisco-verified cybersecurity expertise protecting your business from threats while ensuring regulatory compliance',
      competitiveAdvantages: [
        'Cisco verified cybersecurity certifications',
        'DevSecOps implementation experience',
        'Compliance framework expertise (SOC 2, HIPAA, PCI DSS)',
        'Zero security incidents track record'
      ],
      successMetrics: ['Zero critical vulnerabilities', 'Compliance certification achieved', 'Security awareness > 90%'],
      caseStudies: ['Healthcare HIPAA compliance implementation', 'Fintech PCI DSS Level 1 certification'],
      
      idealClient: {
        businessType: ['Healthcare', 'Finance', 'E-commerce', 'SaaS'],
        budgetRange: '$15,000+',
        timelineExpectation: '6+ weeks',
        technicalRequirements: ['Security compliance', 'Risk mitigation', 'Regulatory requirements']
      }
    },

    // DESIGN SERVICES
    {
      id: 'brand-identity-design',
      name: 'Brand Identity & Visual Design',
      category: 'design',
      subcategory: 'branding',
      description: 'Complete brand identity development including logo design, visual systems, and brand guidelines',
      targetMarket: ['individual', 'startup', 'smb'],
      
      pricing: {
        model: 'fixed',
        ranges: {
          individual: '$2,000 - $5,000',
          startup: '$5,000 - $15,000',
          smb: '$10,000 - $30,000'
        },
        factors: ['Brand complexity', 'Deliverable scope', 'Timeline requirements', 'Usage rights']
      },
      
      timeline: {
        minimum: '3-4 weeks',
        typical: '6-8 weeks',
        complex: '10-12 weeks'
      },
      
      deliverables: [
        'Logo design and variations',
        'Brand color palette and typography',
        'Brand guidelines document',
        'Business card and letterhead design',
        'Social media templates',
        'Website design mockups',
        'Brand application examples'
      ],
      
      technologies: ['Adobe Illustrator', 'Photoshop', 'Figma', 'After Effects'],
      requirements: ['Brand brief and vision', 'Target audience definition', 'Competitive analysis', 'Feedback availability'],
      
      valueProposition: 'Professional brand identity that communicates your values, attracts your ideal customers, and stands out in the market',
      competitiveAdvantages: [
        'Technical background enabling digital-first design',
        'Understanding of brand implementation across digital platforms',
        'Video production capabilities for brand storytelling',
        'Long-term brand evolution planning'
      ],
      successMetrics: ['Brand recognition increase', 'Customer engagement improvement', 'Professional market positioning'],
      caseStudies: ['Startup rebrand leading to 200% growth', 'Professional services brand increasing client inquiries by 150%'],
      
      idealClient: {
        businessType: ['Professional services', 'Startups', 'Creative agencies', 'Consultants'],
        budgetRange: '$5,000+',
        timelineExpectation: '6+ weeks',
        technicalRequirements: ['Professional brand presence', 'Market differentiation', 'Digital brand assets']
      }
    },

    // CONSULTING SERVICES
    {
      id: 'digital-transformation',
      name: 'Digital Transformation Consulting',
      category: 'consulting',
      subcategory: 'strategy',
      description: 'Strategic consulting for digital transformation, technology roadmaps, and organizational change management',
      targetMarket: ['smb', 'enterprise'],
      
      pricing: {
        model: 'retainer',
        ranges: {
          smb: '$10,000 - $30,000/month',
          enterprise: '$25,000 - $100,000/month'
        },
        factors: ['Organization size', 'Transformation scope', 'Timeline', 'Implementation support level']
      },
      
      timeline: {
        minimum: '3 months',
        typical: '6-12 months',
        complex: '12-24 months'
      },
      
      deliverables: [
        'Digital maturity assessment',
        'Technology roadmap and strategy',
        'Implementation plan and timeline',
        'Change management framework',
        'ROI analysis and business case',
        'Vendor evaluation and selection',
        'Ongoing strategic guidance'
      ],
      
      technologies: ['Various based on needs', 'Cloud platforms', 'Enterprise software', 'Analytics tools'],
      requirements: ['Executive sponsorship', 'Stakeholder access', 'Current state documentation', 'Change readiness'],
      
      valueProposition: 'Strategic guidance from a technical expert who understands both the technology and business implications of digital transformation',
      competitiveAdvantages: [
        'Hands-on technical implementation experience',
        'Understanding of both startup agility and enterprise constraints',
        'Proven track record across multiple industries',
        'Focus on practical, achievable transformation'
      ],
      successMetrics: ['Digital maturity score improvement', 'Process efficiency gains', 'Technology ROI achievement'],
      caseStudies: ['Manufacturing company digital transformation reducing costs by 40%', 'Healthcare organization improving patient outcomes through technology'],
      
      idealClient: {
        businessType: ['Traditional industries', 'Growing companies', 'Organizations facing disruption'],
        budgetRange: '$50,000+',
        timelineExpectation: '6+ months',
        technicalRequirements: ['Strategic technology planning', 'Organizational change', 'Competitive advantage']
      }
    }
  ]

  // Service discovery and recommendation methods
  public findServicesByCategory(category: ServiceOffering['category']): ServiceOffering[] {
    return this.services.filter(service => service.category === category)
  }

  public findServicesByBudget(budgetRange: string, clientType: 'individual' | 'startup' | 'smb' | 'enterprise'): ServiceOffering[] {
    return this.services.filter(service => {
      const pricing = service.pricing.ranges[clientType]
      if (!pricing) return false
      
      // Simple budget matching logic - would be more sophisticated in practice
      return pricing.toLowerCase().includes(budgetRange.toLowerCase()) || 
             this.budgetInRange(budgetRange, pricing)
    })
  }

  public recommendServices(requirements: {
    businessType: string
    budget: string
    timeline: string
    goals: string[]
  }): ServiceOffering[] {
    return this.services.filter(service => {
      // Match business type
      const businessMatch = service.idealClient.businessType.some(type => 
        type.toLowerCase().includes(requirements.businessType.toLowerCase())
      )
      
      // Match budget range
      const budgetMatch = this.budgetInRange(requirements.budget, service.idealClient.budgetRange)
      
      // Match timeline
      const timelineMatch = this.timelineCompatible(requirements.timeline, service.timeline.typical)
      
      return businessMatch || budgetMatch || timelineMatch
    }).sort((a, b) => {
      // Sort by relevance score
      return this.calculateRelevanceScore(b, requirements) - this.calculateRelevanceScore(a, requirements)
    })
  }

  public getServiceDetails(serviceId: string): ServiceOffering | undefined {
    return this.services.find(service => service.id === serviceId)
  }

  public getAllServices(): ServiceOffering[] {
    return this.services
  }

  // Helper methods
  private budgetInRange(clientBudget: string, serviceBudget: string): boolean {
    // Extract numbers from budget strings and compare
    const clientAmount = this.extractBudgetAmount(clientBudget)
    const serviceRange = this.extractBudgetRange(serviceBudget)
    
    return clientAmount >= serviceRange.min && clientAmount <= serviceRange.max
  }

  private extractBudgetAmount(budget: string): number {
    const match = budget.match(/(\d+)/)
    return match ? parseInt(match[1]) * 1000 : 0
  }

  private extractBudgetRange(range: string): { min: number, max: number } {
    const matches = range.match(/(\d+)/g)
    if (!matches) return { min: 0, max: Infinity }
    
    const amounts = matches.map(m => parseInt(m) * 1000)
    return { min: Math.min(...amounts), max: Math.max(...amounts) }
  }

  private timelineCompatible(clientTimeline: string, serviceTimeline: string): boolean {
    // Simple timeline compatibility check
    const clientWeeks = this.extractWeeks(clientTimeline)
    const serviceWeeks = this.extractWeeks(serviceTimeline)
    
    return clientWeeks >= serviceWeeks * 0.8 // Allow 20% flexibility
  }

  private extractWeeks(timeline: string): number {
    if (timeline.includes('week')) {
      const match = timeline.match(/(\d+)/)
      return match ? parseInt(match[1]) : 12
    }
    if (timeline.includes('month')) {
      const match = timeline.match(/(\d+)/)
      return match ? parseInt(match[1]) * 4 : 12
    }
    return 12 // Default
  }

  private calculateRelevanceScore(service: ServiceOffering, requirements: any): number {
    let score = 0
    
    // Business type match
    if (service.idealClient.businessType.some(type => 
      type.toLowerCase().includes(requirements.businessType.toLowerCase())
    )) {
      score += 30
    }
    
    // Budget compatibility
    if (this.budgetInRange(requirements.budget, service.idealClient.budgetRange)) {
      score += 25
    }
    
    // Timeline compatibility
    if (this.timelineCompatible(requirements.timeline, service.timeline.typical)) {
      score += 20
    }
    
    // Goal alignment
    requirements.goals.forEach((goal: string) => {
      if (service.valueProposition.toLowerCase().includes(goal.toLowerCase()) ||
          service.competitiveAdvantages.some(adv => adv.toLowerCase().includes(goal.toLowerCase()))) {
        score += 10
      }
    })
    
    return score
  }

  // Generate detailed service proposal
  public generateServiceProposal(serviceId: string, clientRequirements: any): string {
    const service = this.getServiceDetails(serviceId)
    if (!service) return 'Service not found'

    return `
## ${service.name} Proposal

### Overview
${service.description}

### What You'll Get
${service.deliverables.map(item => `• ${item}`).join('\n')}

### Investment
${service.pricing.ranges[clientRequirements.businessType] || 'Custom pricing based on requirements'}

### Timeline
${service.timeline.typical} (may vary based on complexity)

### Why Choose David for This Project
${service.competitiveAdvantages.map(adv => `• ${adv}`).join('\n')}

### Success Metrics
${service.successMetrics.map(metric => `• ${metric}`).join('\n')}

### Next Steps
1. Schedule a consultation call to discuss your specific requirements
2. Receive a detailed project proposal with timeline and pricing
3. Sign agreement and begin project kickoff
4. Regular progress updates and milestone reviews

Ready to get started? Let's schedule a call to discuss your project in detail.
    `.trim()
  }
}
