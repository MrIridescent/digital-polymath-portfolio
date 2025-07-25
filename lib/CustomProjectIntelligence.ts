// Custom Project Intelligence System - AI-powered understanding of unique project concepts
import { GranularServiceCatalog, ProjectType, ServicePackage, MicroService } from './GranularServiceCatalog'
import { CurrencySystem, PriceRange } from './CurrencySystem'

export interface CustomProjectAnalysis {
  projectConcept: string
  understoodRequirements: string[]
  inferredFeatures: string[]
  technicalRequirements: string[]
  businessObjectives: string[]
  targetAudience: string[]
  industryContext: string
  complexityAssessment: {
    level: 'simple' | 'moderate' | 'complex' | 'enterprise'
    factors: string[]
    score: number
  }
  recommendedApproach: {
    architecture: string
    technologies: string[]
    developmentPhases: string[]
    timeline: string
  }
  serviceRecommendations: {
    coreServices: ServicePackage[]
    additionalMicroServices: MicroService[]
    customComponents: string[]
  }
  pricingEstimate: {
    primary: PriceRange
    breakdown: Array<{
      component: string
      price: PriceRange
      justification: string
    }>
  }
  riskFactors: string[]
  successFactors: string[]
  similarProjects: ProjectType[]
}

export interface ProjectKeywords {
  category: string
  keywords: string[]
  weight: number
  implications: string[]
}

export class CustomProjectIntelligence {
  private serviceCatalog: GranularServiceCatalog
  private currencySystem: CurrencySystem
  private projectKeywords: ProjectKeywords[]
  private technologyStack: Map<string, string[]>
  private industryPatterns: Map<string, string[]>

  constructor() {
    this.serviceCatalog = new GranularServiceCatalog()
    this.currencySystem = new CurrencySystem()
    this.initializeProjectKeywords()
    this.initializeTechnologyStack()
    this.initializeIndustryPatterns()
  }

  private initializeProjectKeywords(): void {
    this.projectKeywords = [
      // E-commerce & Marketplace
      {
        category: 'e-commerce',
        keywords: ['shop', 'store', 'marketplace', 'sell', 'buy', 'product', 'cart', 'checkout', 'payment', 'inventory'],
        weight: 1.0,
        implications: ['Payment processing', 'Product management', 'User accounts', 'Order management']
      },
      
      // Social & Community
      {
        category: 'social',
        keywords: ['social', 'community', 'forum', 'chat', 'messaging', 'feed', 'post', 'share', 'follow', 'like'],
        weight: 1.0,
        implications: ['User profiles', 'Real-time features', 'Content moderation', 'Notification system']
      },
      
      // Business & Productivity
      {
        category: 'business',
        keywords: ['crm', 'erp', 'management', 'dashboard', 'analytics', 'reporting', 'workflow', 'automation', 'productivity'],
        weight: 1.0,
        implications: ['Admin dashboard', 'Data visualization', 'User permissions', 'Business logic']
      },
      
      // Education & Learning
      {
        category: 'education',
        keywords: ['learning', 'course', 'education', 'training', 'quiz', 'exam', 'student', 'teacher', 'curriculum'],
        weight: 1.0,
        implications: ['User progress tracking', 'Content management', 'Assessment system', 'Certification']
      },
      
      // Healthcare & Medical
      {
        category: 'healthcare',
        keywords: ['health', 'medical', 'patient', 'doctor', 'appointment', 'clinic', 'hospital', 'telemedicine'],
        weight: 1.0,
        implications: ['HIPAA compliance', 'Secure data handling', 'Appointment scheduling', 'Patient records']
      },
      
      // Finance & Fintech
      {
        category: 'fintech',
        keywords: ['finance', 'banking', 'payment', 'wallet', 'transaction', 'investment', 'trading', 'cryptocurrency'],
        weight: 1.0,
        implications: ['Security compliance', 'Transaction processing', 'KYC verification', 'Audit trails']
      },
      
      // Real Estate
      {
        category: 'real-estate',
        keywords: ['property', 'real estate', 'listing', 'rent', 'lease', 'mortgage', 'agent', 'broker'],
        weight: 1.0,
        implications: ['Property listings', 'Search filters', 'Map integration', 'Contact management']
      },
      
      // Food & Restaurant
      {
        category: 'food-service',
        keywords: ['restaurant', 'food', 'menu', 'order', 'delivery', 'reservation', 'recipe', 'kitchen'],
        weight: 1.0,
        implications: ['Menu management', 'Order processing', 'Delivery tracking', 'Table reservations']
      },
      
      // Travel & Tourism
      {
        category: 'travel',
        keywords: ['travel', 'booking', 'hotel', 'flight', 'vacation', 'tour', 'destination', 'itinerary'],
        weight: 1.0,
        implications: ['Booking system', 'Calendar integration', 'Payment processing', 'Review system']
      },
      
      // Entertainment & Media
      {
        category: 'entertainment',
        keywords: ['streaming', 'video', 'music', 'game', 'entertainment', 'media', 'content', 'subscription'],
        weight: 1.0,
        implications: ['Content delivery', 'Subscription management', 'User engagement', 'Media processing']
      }
    ]
  }

  private initializeTechnologyStack(): void {
    this.technologyStack = new Map([
      ['web-application', ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis']],
      ['mobile-application', ['React Native', 'Expo', 'Firebase', 'Push Notifications']],
      ['e-commerce', ['Stripe', 'Paystack', 'Inventory Management', 'Shopping Cart', 'Order Processing']],
      ['real-time', ['WebSockets', 'Socket.io', 'Redis Pub/Sub', 'Real-time Database']],
      ['ai-ml', ['OpenAI API', 'TensorFlow', 'Python', 'Machine Learning Models', 'Natural Language Processing']],
      ['analytics', ['Google Analytics', 'Custom Analytics', 'Data Visualization', 'Reporting Dashboard']],
      ['authentication', ['JWT', 'OAuth', 'Multi-factor Authentication', 'Role-based Access Control']],
      ['payment', ['Stripe', 'Paystack', 'PayPal', 'Cryptocurrency', 'Subscription Billing']],
      ['cloud-infrastructure', ['AWS', 'Vercel', 'Docker', 'Kubernetes', 'CDN', 'Load Balancing']]
    ])
  }

  private initializeIndustryPatterns(): void {
    this.industryPatterns = new Map([
      ['healthcare', ['HIPAA compliance', 'Patient data security', 'Appointment scheduling', 'Medical records', 'Telemedicine']],
      ['fintech', ['PCI DSS compliance', 'KYC verification', 'AML compliance', 'Secure transactions', 'Audit trails']],
      ['education', ['Student management', 'Course content', 'Progress tracking', 'Certification', 'Online assessments']],
      ['e-commerce', ['Product catalog', 'Shopping cart', 'Payment processing', 'Inventory management', 'Order fulfillment']],
      ['real-estate', ['Property listings', 'Search and filters', 'Map integration', 'Lead management', 'Document management']],
      ['food-service', ['Menu management', 'Online ordering', 'Delivery tracking', 'Table reservations', 'Kitchen management']],
      ['travel', ['Booking system', 'Inventory management', 'Payment processing', 'Itinerary planning', 'Review system']],
      ['social-media', ['User profiles', 'Content feeds', 'Real-time messaging', 'Content moderation', 'Social features']]
    ])
  }

  public analyzeCustomProject(
    projectDescription: string,
    clientType: 'individual' | 'startup' | 'smb' | 'enterprise' = 'startup',
    budget?: string,
    timeline?: string,
    currency: 'USD' | 'NGN' = 'USD'
  ): CustomProjectAnalysis {
    
    const lowerDesc = projectDescription.toLowerCase()
    
    // Extract requirements and features
    const understoodRequirements = this.extractRequirements(projectDescription)
    const inferredFeatures = this.inferFeatures(projectDescription)
    const technicalRequirements = this.identifyTechnicalRequirements(projectDescription)
    const businessObjectives = this.extractBusinessObjectives(projectDescription)
    const targetAudience = this.identifyTargetAudience(projectDescription)
    const industryContext = this.determineIndustryContext(projectDescription)
    
    // Assess complexity
    const complexityAssessment = this.assessComplexity(projectDescription)
    
    // Recommend approach
    const recommendedApproach = this.recommendApproach(projectDescription, complexityAssessment.level)
    
    // Find service recommendations
    const serviceRecommendations = this.recommendServices(projectDescription, clientType)
    
    // Calculate pricing
    const pricingEstimate = this.estimatePricing(
      projectDescription, 
      complexityAssessment.level, 
      clientType, 
      currency,
      serviceRecommendations
    )
    
    // Identify risks and success factors
    const riskFactors = this.identifyRiskFactors(projectDescription, complexityAssessment.level)
    const successFactors = this.identifySuccessFactors(projectDescription, industryContext)
    
    // Find similar projects
    const similarProjects = this.findSimilarProjects(projectDescription)

    return {
      projectConcept: projectDescription,
      understoodRequirements,
      inferredFeatures,
      technicalRequirements,
      businessObjectives,
      targetAudience,
      industryContext,
      complexityAssessment,
      recommendedApproach,
      serviceRecommendations,
      pricingEstimate,
      riskFactors,
      successFactors,
      similarProjects
    }
  }

  private extractRequirements(description: string): string[] {
    const requirements: string[] = []
    const lowerDesc = description.toLowerCase()
    
    // Look for explicit requirements
    const requirementPatterns = [
      /need[s]?\s+([^.!?]+)/gi,
      /want[s]?\s+([^.!?]+)/gi,
      /require[s]?\s+([^.!?]+)/gi,
      /must\s+have\s+([^.!?]+)/gi,
      /should\s+([^.!?]+)/gi
    ]
    
    requirementPatterns.forEach(pattern => {
      const matches = description.match(pattern)
      if (matches) {
        matches.forEach(match => {
          const requirement = match.replace(/^(need[s]?|want[s]?|require[s]?|must have|should)\s+/i, '').trim()
          if (requirement.length > 3) {
            requirements.push(requirement)
          }
        })
      }
    })
    
    // Add common requirements based on keywords
    if (lowerDesc.includes('user') || lowerDesc.includes('account')) {
      requirements.push('User account management')
    }
    if (lowerDesc.includes('payment') || lowerDesc.includes('buy') || lowerDesc.includes('sell')) {
      requirements.push('Payment processing system')
    }
    if (lowerDesc.includes('mobile') || lowerDesc.includes('app')) {
      requirements.push('Mobile-responsive design')
    }
    if (lowerDesc.includes('admin') || lowerDesc.includes('manage')) {
      requirements.push('Administrative dashboard')
    }
    
    return [...new Set(requirements)] // Remove duplicates
  }

  private inferFeatures(description: string): string[] {
    const features: string[] = []
    const lowerDesc = description.toLowerCase()
    
    // Feature inference based on project type
    for (const keywordGroup of this.projectKeywords) {
      const matchCount = keywordGroup.keywords.filter(keyword => 
        lowerDesc.includes(keyword)
      ).length
      
      if (matchCount > 0) {
        features.push(...keywordGroup.implications)
      }
    }
    
    // Additional feature inference
    if (lowerDesc.includes('real-time') || lowerDesc.includes('live')) {
      features.push('Real-time updates', 'WebSocket integration', 'Live notifications')
    }
    
    if (lowerDesc.includes('ai') || lowerDesc.includes('smart') || lowerDesc.includes('intelligent')) {
      features.push('AI integration', 'Machine learning features', 'Intelligent recommendations')
    }
    
    if (lowerDesc.includes('search')) {
      features.push('Advanced search functionality', 'Search filters', 'Search optimization')
    }
    
    if (lowerDesc.includes('notification') || lowerDesc.includes('alert')) {
      features.push('Push notifications', 'Email notifications', 'SMS alerts')
    }
    
    return [...new Set(features)]
  }

  private identifyTechnicalRequirements(description: string): string[] {
    const techRequirements: string[] = []
    const lowerDesc = description.toLowerCase()
    
    // Database requirements
    if (lowerDesc.includes('user') || lowerDesc.includes('data') || lowerDesc.includes('store')) {
      techRequirements.push('Database design and implementation')
    }
    
    // API requirements
    if (lowerDesc.includes('mobile') || lowerDesc.includes('integration') || lowerDesc.includes('api')) {
      techRequirements.push('RESTful API development')
    }
    
    // Security requirements
    if (lowerDesc.includes('secure') || lowerDesc.includes('login') || lowerDesc.includes('account')) {
      techRequirements.push('Authentication and authorization system')
    }
    
    // Performance requirements
    if (lowerDesc.includes('fast') || lowerDesc.includes('performance') || lowerDesc.includes('scale')) {
      techRequirements.push('Performance optimization and caching')
    }
    
    // Cloud requirements
    if (lowerDesc.includes('cloud') || lowerDesc.includes('deploy') || lowerDesc.includes('host')) {
      techRequirements.push('Cloud infrastructure and deployment')
    }
    
    return techRequirements
  }

  private extractBusinessObjectives(description: string): string[] {
    const objectives: string[] = []
    const lowerDesc = description.toLowerCase()
    
    // Revenue objectives
    if (lowerDesc.includes('sell') || lowerDesc.includes('revenue') || lowerDesc.includes('profit')) {
      objectives.push('Generate revenue through online sales')
    }
    
    // Efficiency objectives
    if (lowerDesc.includes('automate') || lowerDesc.includes('efficient') || lowerDesc.includes('streamline')) {
      objectives.push('Improve operational efficiency')
    }
    
    // Customer objectives
    if (lowerDesc.includes('customer') || lowerDesc.includes('user experience') || lowerDesc.includes('engagement')) {
      objectives.push('Enhance customer experience and engagement')
    }
    
    // Growth objectives
    if (lowerDesc.includes('grow') || lowerDesc.includes('expand') || lowerDesc.includes('scale')) {
      objectives.push('Support business growth and scalability')
    }
    
    // Brand objectives
    if (lowerDesc.includes('brand') || lowerDesc.includes('presence') || lowerDesc.includes('visibility')) {
      objectives.push('Strengthen brand presence and visibility')
    }
    
    return objectives
  }

  private identifyTargetAudience(description: string): string[] {
    const audience: string[] = []
    const lowerDesc = description.toLowerCase()
    
    // Demographic indicators
    if (lowerDesc.includes('student') || lowerDesc.includes('education')) {
      audience.push('Students and educators')
    }
    if (lowerDesc.includes('business') || lowerDesc.includes('professional')) {
      audience.push('Business professionals')
    }
    if (lowerDesc.includes('consumer') || lowerDesc.includes('customer')) {
      audience.push('General consumers')
    }
    if (lowerDesc.includes('enterprise') || lowerDesc.includes('corporate')) {
      audience.push('Enterprise clients')
    }
    
    return audience.length > 0 ? audience : ['General users']
  }

  private determineIndustryContext(description: string): string {
    const lowerDesc = description.toLowerCase()
    
    for (const [industry, patterns] of this.industryPatterns.entries()) {
      const matchCount = patterns.filter(pattern => 
        lowerDesc.includes(pattern.toLowerCase())
      ).length
      
      if (matchCount > 0) {
        return industry
      }
    }
    
    // Check project keywords for industry context
    for (const keywordGroup of this.projectKeywords) {
      const matchCount = keywordGroup.keywords.filter(keyword => 
        lowerDesc.includes(keyword)
      ).length
      
      if (matchCount >= 2) {
        return keywordGroup.category
      }
    }
    
    return 'general-business'
  }

  private assessComplexity(description: string): CustomProjectAnalysis['complexityAssessment'] {
    const lowerDesc = description.toLowerCase()
    let score = 0
    const factors: string[] = []
    
    // Simple indicators (reduce score)
    if (lowerDesc.includes('simple') || lowerDesc.includes('basic') || lowerDesc.includes('landing page')) {
      score -= 2
      factors.push('Simple requirements specified')
    }
    
    // Moderate complexity indicators
    const moderateKeywords = ['dashboard', 'admin', 'user management', 'payment', 'api', 'mobile', 'database']
    moderateKeywords.forEach(keyword => {
      if (lowerDesc.includes(keyword)) {
        score += 1
        factors.push(`${keyword} functionality required`)
      }
    })
    
    // Complex indicators
    const complexKeywords = ['real-time', 'ai', 'machine learning', 'integration', 'scalable', 'microservices']
    complexKeywords.forEach(keyword => {
      if (lowerDesc.includes(keyword)) {
        score += 2
        factors.push(`${keyword} features required`)
      }
    })
    
    // Enterprise indicators
    const enterpriseKeywords = ['enterprise', 'compliance', 'security', 'audit', 'multi-tenant', 'high-availability']
    enterpriseKeywords.forEach(keyword => {
      if (lowerDesc.includes(keyword)) {
        score += 3
        factors.push(`${keyword} requirements`)
      }
    })
    
    // Determine complexity level
    let level: 'simple' | 'moderate' | 'complex' | 'enterprise'
    if (score <= 0) level = 'simple'
    else if (score <= 3) level = 'moderate'
    else if (score <= 6) level = 'complex'
    else level = 'enterprise'
    
    return { level, factors, score }
  }

  private recommendApproach(description: string, complexity: string): CustomProjectAnalysis['recommendedApproach'] {
    const lowerDesc = description.toLowerCase()
    
    // Determine architecture
    let architecture = 'Monolithic web application'
    if (complexity === 'enterprise' || lowerDesc.includes('microservices') || lowerDesc.includes('scalable')) {
      architecture = 'Microservices architecture'
    } else if (lowerDesc.includes('api') || lowerDesc.includes('mobile')) {
      architecture = 'API-first architecture'
    }
    
    // Recommend technologies
    const technologies: string[] = ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL']
    
    if (lowerDesc.includes('mobile')) {
      technologies.push('React Native')
    }
    if (lowerDesc.includes('real-time')) {
      technologies.push('WebSockets', 'Redis')
    }
    if (lowerDesc.includes('payment')) {
      technologies.push('Stripe', 'Paystack')
    }
    if (lowerDesc.includes('ai')) {
      technologies.push('OpenAI API', 'Python')
    }
    
    // Development phases
    const developmentPhases = [
      'Discovery and Planning',
      'UI/UX Design',
      'Backend Development',
      'Frontend Development',
      'Testing and QA',
      'Deployment and Launch'
    ]
    
    if (lowerDesc.includes('mobile')) {
      developmentPhases.splice(4, 0, 'Mobile App Development')
    }
    
    // Timeline estimation
    const timelineMap = {
      simple: '2-4 weeks',
      moderate: '4-8 weeks',
      complex: '8-16 weeks',
      enterprise: '16-24 weeks'
    }
    
    return {
      architecture,
      technologies,
      developmentPhases,
      timeline: timelineMap[complexity as keyof typeof timelineMap]
    }
  }

  private recommendServices(
    description: string,
    clientType: 'individual' | 'startup' | 'smb' | 'enterprise'
  ): CustomProjectAnalysis['serviceRecommendations'] {
    
    const relevantServices = this.serviceCatalog.findRelevantServices(description, undefined, clientType)
    
    return {
      coreServices: relevantServices.servicePackages,
      additionalMicroServices: relevantServices.microServices,
      customComponents: this.identifyCustomComponents(description)
    }
  }

  private identifyCustomComponents(description: string): string[] {
    const components: string[] = []
    const lowerDesc = description.toLowerCase()
    
    // Industry-specific components
    if (lowerDesc.includes('healthcare')) {
      components.push('HIPAA-compliant data handling', 'Patient portal', 'Appointment scheduling')
    }
    if (lowerDesc.includes('fintech')) {
      components.push('KYC verification system', 'Transaction monitoring', 'Compliance reporting')
    }
    if (lowerDesc.includes('education')) {
      components.push('Learning management system', 'Progress tracking', 'Certificate generation')
    }
    
    // Feature-specific components
    if (lowerDesc.includes('ai') || lowerDesc.includes('intelligent')) {
      components.push('Custom AI model training', 'Natural language processing', 'Recommendation engine')
    }
    if (lowerDesc.includes('real-time')) {
      components.push('Real-time synchronization', 'Live collaboration features', 'Event streaming')
    }
    
    return components
  }

  private estimatePricing(
    description: string,
    complexity: string,
    clientType: 'individual' | 'startup' | 'smb' | 'enterprise',
    currency: 'USD' | 'NGN',
    serviceRecommendations: CustomProjectAnalysis['serviceRecommendations']
  ): CustomProjectAnalysis['pricingEstimate'] {
    
    // Calculate base price from service packages
    let totalPrice = 0
    const breakdown: Array<{
      component: string
      price: PriceRange
      justification: string
    }> = []
    
    // Add core service packages
    for (const servicePackage of serviceRecommendations.coreServices) {
      const packagePrice = this.serviceCatalog.calculatePackagePrice(servicePackage.id, clientType, currency)
      if (packagePrice) {
        totalPrice += (packagePrice.min + packagePrice.max) / 2
        breakdown.push({
          component: servicePackage.name,
          price: packagePrice,
          justification: `${servicePackage.description} with ${servicePackage.bundleDiscount}% bundle discount`
        })
      }
    }
    
    // Add micro-services
    for (const microService of serviceRecommendations.additionalMicroServices.slice(0, 3)) {
      const servicePrice = microService.pricingUSD[clientType]
      const priceRange = this.currencySystem.createPriceRange(servicePrice * 0.9, servicePrice * 1.1, currency)
      totalPrice += servicePrice
      breakdown.push({
        component: microService.name,
        price: priceRange,
        justification: microService.description
      })
    }
    
    // Add custom components premium
    if (serviceRecommendations.customComponents.length > 0) {
      const customPremium = totalPrice * 0.3 // 30% premium for custom work
      const customRange = this.currencySystem.createPriceRange(customPremium * 0.8, customPremium * 1.2, currency)
      totalPrice += customPremium
      breakdown.push({
        component: 'Custom Development',
        price: customRange,
        justification: 'Custom components and specialized features'
      })
    }
    
    // If no specific services found, use complexity-based estimation
    if (totalPrice === 0) {
      const estimatedRange = this.serviceCatalog.estimateCustomProjectPrice(description, complexity as any, clientType, currency)
      totalPrice = (estimatedRange.min + estimatedRange.max) / 2
      breakdown.push({
        component: 'Custom Project Development',
        price: estimatedRange,
        justification: `${complexity} complexity project with custom requirements`
      })
    }
    
    // Create primary price range
    const primaryRange = this.currencySystem.createPriceRange(totalPrice * 0.8, totalPrice * 1.2, currency, true)
    
    return {
      primary: primaryRange,
      breakdown
    }
  }

  private identifyRiskFactors(description: string, complexity: string): string[] {
    const risks: string[] = []
    const lowerDesc = description.toLowerCase()
    
    // Complexity-based risks
    if (complexity === 'enterprise') {
      risks.push('High complexity may require extended timeline', 'Integration challenges with existing systems')
    }
    
    // Technology-specific risks
    if (lowerDesc.includes('ai') || lowerDesc.includes('machine learning')) {
      risks.push('AI model training may require additional time', 'Data quality affects AI performance')
    }
    
    if (lowerDesc.includes('real-time')) {
      risks.push('Real-time features require robust infrastructure', 'Scalability challenges with concurrent users')
    }
    
    if (lowerDesc.includes('integration')) {
      risks.push('Third-party API dependencies', 'Data migration complexity')
    }
    
    // Industry-specific risks
    if (lowerDesc.includes('healthcare') || lowerDesc.includes('finance')) {
      risks.push('Compliance requirements may extend timeline', 'Security audits required')
    }
    
    return risks
  }

  private identifySuccessFactors(description: string, industry: string): string[] {
    const factors: string[] = []
    
    // Universal success factors
    factors.push('Clear requirements and scope definition', 'Regular communication and feedback', 'Iterative development approach')
    
    // Industry-specific success factors
    const industryFactors = this.industryPatterns.get(industry)
    if (industryFactors) {
      factors.push(`Proper ${industry} industry compliance`, `Understanding of ${industry} user needs`)
    }
    
    // Feature-specific success factors
    const lowerDesc = description.toLowerCase()
    if (lowerDesc.includes('user experience') || lowerDesc.includes('ui')) {
      factors.push('User-centered design approach', 'Usability testing and optimization')
    }
    
    if (lowerDesc.includes('performance') || lowerDesc.includes('scale')) {
      factors.push('Performance optimization from day one', 'Scalable architecture design')
    }
    
    return factors
  }

  private findSimilarProjects(description: string): ProjectType[] {
    const allProjectTypes = this.serviceCatalog.getAllProjectTypes()
    const lowerDesc = description.toLowerCase()
    
    return allProjectTypes.filter(projectType => {
      const nameMatch = projectType.name.toLowerCase().includes(lowerDesc) || 
                       lowerDesc.includes(projectType.name.toLowerCase())
      const descMatch = projectType.description.toLowerCase().includes(lowerDesc)
      const featureMatch = projectType.commonFeatures.some(feature => 
        lowerDesc.includes(feature.toLowerCase())
      )
      
      return nameMatch || descMatch || featureMatch
    }).slice(0, 3) // Return top 3 similar projects
  }

  // Public method to get project analysis summary for conversation
  public getProjectSummary(analysis: CustomProjectAnalysis): string {
    const { projectConcept, complexityAssessment, pricingEstimate, recommendedApproach } = analysis
    
    return `I understand you're looking to build: **${projectConcept}**

**Project Analysis:**
• **Complexity:** ${complexityAssessment.level} (${complexityAssessment.score}/10)
• **Industry:** ${analysis.industryContext}
• **Timeline:** ${recommendedApproach.timeline}
• **Investment:** ${pricingEstimate.primary.formatted}${pricingEstimate.primary.equivalent ? ` (${pricingEstimate.primary.equivalent.formatted})` : ''}

**Key Features Identified:**
${analysis.inferredFeatures.slice(0, 4).map(feature => `• ${feature}`).join('\n')}

**Recommended Approach:**
• **Architecture:** ${recommendedApproach.architecture}
• **Core Technologies:** ${recommendedApproach.technologies.slice(0, 4).join(', ')}

This looks like an excellent project that aligns perfectly with my expertise. Would you like me to break down the development phases and provide more detailed pricing?`
  }
}
