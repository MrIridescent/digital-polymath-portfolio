/**
 * 🎯 Enhanced Conversational Flow Based on Blueprint Recommendations
 * Implements the 3-phase conversation structure from the document:
 * Phase 1: Greeting & Intent Discovery
 * Phase 2: Domain Knowledge Demonstration (Project Scoping)
 * Phase 3: Lead Qualification & Handoff Trigger
 */

export interface BlueprintConversationContext {
  phase: 'greeting' | 'domain_knowledge' | 'qualification'
  userInput: string
  conversationHistory: string[]
  extractedInfo: {
    businessGoal?: string
    existingAssets?: string
    coreFeatures?: string[]
    techPreference?: string
    budgetRange?: string
    timeline?: string
    contactInfo?: {
      name?: string
      email?: string
      company?: string
      phone?: string
    }
    readyToProceed?: boolean
  }
  score: number
  lagosMarket?: boolean // Track if client is Lagos-based
}

export interface BlueprintResponse {
  message: string
  nextPhase: 'greeting' | 'domain_knowledge' | 'qualification' | 'handoff'
  quickReplies?: string[]
  shouldNotify: boolean
  confidence: number
  extractedData?: any
  isQualified?: boolean
}

export class EnhancedBlueprintFlow {
  private lagosKeywords = [
    'lagos', 'nigeria', 'nigerian', 'naira', 'ikeja', 'victoria island', 
    'lekki', 'surulere', 'yaba', 'abuja', 'port harcourt', 'west africa'
  ]

  private businessGoalKeywords = [
    'generate leads', 'sell products', 'online store', 'e-commerce', 
    'brand awareness', 'customer portal', 'booking system', 'marketplace',
    'fintech', 'payment', 'banking', 'financial services'
  ]

  private techStackKeywords = {
    'wordpress': ['wordpress', 'wp', 'cms'],
    'shopify': ['shopify', 'e-commerce', 'online store'],
    'react': ['react', 'modern', 'interactive', 'dynamic'],
    'custom': ['custom', 'bespoke', 'unique', 'tailored'],
    'mobile': ['mobile', 'app', 'ios', 'android'],
    'ai': ['ai', 'artificial intelligence', 'chatbot', 'automation']
  }

  public processConversation(context: BlueprintConversationContext): BlueprintResponse {
    // Detect Lagos market opportunity
    const isLagosMarket = this.detectLagosMarket(context.userInput)
    if (isLagosMarket) {
      context.lagosMarket = true
    }

    switch (context.phase) {
      case 'greeting':
        return this.handleGreetingPhase(context)
      case 'domain_knowledge':
        return this.handleDomainKnowledgePhase(context)
      case 'qualification':
        return this.handleQualificationPhase(context)
      default:
        return this.handleGreetingPhase(context)
    }
  }

  /**
   * Phase 1: Greeting and Intent Discovery
   * Clear, welcoming, and purposeful introduction
   */
  private handleGreetingPhase(context: BlueprintConversationContext): BlueprintResponse {
    const input = context.userInput.toLowerCase()
    
    // Detect project intent
    const hasProjectIntent = this.detectProjectIntent(input)
    const hasPortfolioIntent = this.detectPortfolioIntent(input)
    const hasGeneralQuestion = this.detectGeneralQuestion(input)

    if (hasProjectIntent) {
      const lagosGreeting = context.lagosMarket ? 
        " I'm excited to help another Lagos business succeed online!" : ""
      
      return {
        message: `Hello! I'm the AI assistant for David Akpoviroro Oke's portfolio. I can see you're interested in a new project - that's fantastic!${lagosGreeting} I'd love to learn more about what you have in mind. To start, could you tell me a bit about your business and the primary objective for this new website? For example, are you looking to generate leads, sell products directly, or create an informational hub?`,
        nextPhase: 'domain_knowledge',
        quickReplies: [
          "Generate leads for my business",
          "Sell products online", 
          "Create a company website",
          "Build a mobile app",
          "Need e-commerce solution"
        ],
        shouldNotify: false,
        confidence: 0.8,
        extractedData: { projectIntent: true }
      }
    }

    if (hasPortfolioIntent) {
      return {
        message: "I'd be happy to show you David's work! You can explore his portfolio sections to see case studies and projects. Is there a particular type of project you're most interested in seeing? Or would you like to discuss a new project for your business?",
        nextPhase: 'greeting',
        quickReplies: [
          "Show me web development projects",
          "See mobile app projects", 
          "View e-commerce solutions",
          "I want to discuss a new project"
        ],
        shouldNotify: false,
        confidence: 0.7
      }
    }

    // Default greeting
    return {
      message: "Hello! I'm the AI assistant for David Akpoviroro Oke's portfolio. I can answer questions about his past work, or we can discuss your new project in detail. How can I help you today?",
      nextPhase: 'greeting',
      quickReplies: [
        "I have a new project",
        "Show me the portfolio",
        "What services are offered?",
        "Contact information"
      ],
      shouldNotify: false,
      confidence: 0.6
    }
  }

  /**
   * Phase 2: Domain Knowledge Demonstration (Project Scoping)
   * Intelligent qualifying questions that demonstrate expertise
   */
  private handleDomainKnowledgePhase(context: BlueprintConversationContext): BlueprintResponse {
    const input = context.userInput.toLowerCase()
    const { extractedInfo } = context

    // Business Goal Discovery
    if (!extractedInfo.businessGoal) {
      const businessGoal = this.extractBusinessGoal(input)
      if (businessGoal) {
        extractedInfo.businessGoal = businessGoal
        
        const lagosContext = context.lagosMarket ? 
          " Given that you're in Lagos, I have experience with the local market dynamics and can recommend solutions that work well for Nigerian businesses." : ""

        return {
          message: `Excellent! ${this.getBusinessGoalResponse(businessGoal)}${lagosContext} Do you have an existing website or brand guidelines? If so, sharing the URL would be very helpful for context.`,
          nextPhase: 'domain_knowledge',
          quickReplies: [
            "Yes, here's my current site",
            "No existing website",
            "Have brand guidelines",
            "Starting from scratch"
          ],
          shouldNotify: false,
          confidence: 0.8,
          extractedData: { businessGoal }
        }
      }
    }

    // Existing Assets Discovery
    if (!extractedInfo.existingAssets && extractedInfo.businessGoal) {
      const assets = this.extractExistingAssets(input)
      extractedInfo.existingAssets = assets || "none specified"

      return {
        message: `Got it! ${this.getAssetsResponse(assets)} Now, are there any specific features you know you'll need? This could include e-commerce capabilities, a blog, a secure client portal, or integration with a specific CRM like HubSpot.`,
        nextPhase: 'domain_knowledge',
        quickReplies: [
          "E-commerce/online store",
          "Client portal/dashboard", 
          "Blog and content management",
          "CRM integration",
          "Payment processing"
        ],
        shouldNotify: false,
        confidence: 0.8,
        extractedData: { existingAssets: assets }
      }
    }

    // Core Features Discovery
    if (!extractedInfo.coreFeatures && extractedInfo.existingAssets) {
      const features = this.extractCoreFeatures(input)
      extractedInfo.coreFeatures = features

      const lagosFintech = context.lagosMarket && features.some(f => 
        f.includes('payment') || f.includes('fintech') || f.includes('banking')
      ) ? " I have specific experience with Nigerian payment systems and fintech regulations." : ""

      return {
        message: `Perfect! ${this.getFeaturesResponse(features)}${lagosFintech} Do you have a preference for the underlying technology, or are you looking for a recommendation? I have experience with a range of solutions, from WordPress and Shopify for rapid deployment to custom applications using React and Node.js for unique requirements.`,
        nextPhase: 'domain_knowledge',
        quickReplies: [
          "WordPress/CMS solution",
          "Shopify for e-commerce",
          "Custom React application",
          "Need your recommendation",
          "Mobile app development"
        ],
        shouldNotify: false,
        confidence: 0.9,
        extractedData: { coreFeatures: features }
      }
    }

    // Technology Preference Discovery
    if (!extractedInfo.techPreference && extractedInfo.coreFeatures) {
      const techPref = this.extractTechPreference(input)
      extractedInfo.techPreference = techPref

      return {
        message: `Excellent choice! ${this.getTechResponse(techPref)} Finally, do you have an estimated budget range and timeline for this project? This information is key to suggesting the most appropriate and effective solutions that align with your goals.`,
        nextPhase: 'qualification',
        quickReplies: [
          "$5K - $15K budget",
          "$15K - $30K budget", 
          "$30K+ enterprise budget",
          "Need timeline discussion",
          "Flexible on both"
        ],
        shouldNotify: false,
        confidence: 0.9,
        extractedData: { techPreference: techPref }
      }
    }

    // Fallback for incomplete information
    return {
      message: "I'd like to understand your project better. Could you tell me more about what you're looking to achieve with this website or application?",
      nextPhase: 'domain_knowledge',
      quickReplies: [
        "Generate more leads",
        "Sell products online",
        "Improve brand presence", 
        "Automate business processes"
      ],
      shouldNotify: false,
      confidence: 0.5
    }
  }

  /**
   * Phase 3: Lead Qualification and Handoff Trigger
   * Validation, ready-to-pay signal, and notification trigger
   */
  private handleQualificationPhase(context: BlueprintConversationContext): BlueprintResponse {
    const input = context.userInput.toLowerCase()
    const { extractedInfo } = context

    // Budget and Timeline Discovery
    if (!extractedInfo.budgetRange || !extractedInfo.timeline) {
      const budget = this.extractBudget(input)
      const timeline = this.extractTimeline(input)
      
      if (budget) extractedInfo.budgetRange = budget
      if (timeline) extractedInfo.timeline = timeline

      if (budget && timeline) {
        // Validation with tact
        const lagosNote = context.lagosMarket ? 
          " As a Lagos-based project, I can also provide on-site consultations if needed." : ""

        return {
          message: `Thank you! Just to confirm, you're looking for ${this.summarizeProject(extractedInfo)}${lagosNote} Is that correct?`,
          nextPhase: 'qualification',
          quickReplies: [
            "Yes, that's correct",
            "Need to adjust budget",
            "Timeline is flexible", 
            "Add more features"
          ],
          shouldNotify: false,
          confidence: 0.9,
          extractedData: { budget, timeline }
        }
      }
    }

    // Ready to proceed signal
    if (this.isReadyToProceed(input)) {
      const lagosBonus = context.lagosMarket ? 
        " Since you're in Lagos, David can also meet in person if needed for project kickoff." : ""

      return {
        message: `Fantastic! This sounds like an excellent project and a great fit for David's skillset.${lagosBonus} The next step is a formal proposal and an initial deposit to secure your project in his schedule. Shall I notify David that you are ready to move forward?`,
        nextPhase: 'handoff',
        quickReplies: [
          "Yes, let's proceed",
          "Send me the proposal",
          "I'm ready to start",
          "Contact me with details"
        ],
        shouldNotify: true,
        confidence: 0.95,
        isQualified: true,
        extractedData: { readyToProceed: true }
      }
    }

    // Confirmation received - trigger handoff
    if (this.isConfirmationReceived(input)) {
      return {
        message: `Perfect! I've notified David about your project. He'll reach out within 24 hours with a detailed proposal and next steps. In the meantime, feel free to explore more of his portfolio. Thank you for choosing David for your project!`,
        nextPhase: 'handoff',
        shouldNotify: true,
        confidence: 1.0,
        isQualified: true,
        extractedData: { confirmed: true }
      }
    }

    return {
      message: "I'd love to help you move forward with this project. Do you have any other questions, or are you ready to discuss next steps?",
      nextPhase: 'qualification',
      quickReplies: [
        "I'm ready to proceed",
        "Need more information",
        "What's the next step?",
        "Send me a proposal"
      ],
      shouldNotify: false,
      confidence: 0.6
    }
  }

  // Helper methods for detection and extraction
  private detectLagosMarket(input: string): boolean {
    return this.lagosKeywords.some(keyword => 
      input.toLowerCase().includes(keyword)
    )
  }

  private detectProjectIntent(input: string): boolean {
    const projectKeywords = [
      'project', 'website', 'app', 'build', 'create', 'develop', 
      'need', 'want', 'looking for', 'hire', 'quote', 'estimate'
    ]
    return projectKeywords.some(keyword => 
      input.toLowerCase().includes(keyword)
    )
  }

  private detectPortfolioIntent(input: string): boolean {
    const portfolioKeywords = [
      'portfolio', 'work', 'examples', 'projects', 'case studies', 
      'show me', 'see', 'view', 'previous work'
    ]
    return portfolioKeywords.some(keyword => 
      input.toLowerCase().includes(keyword)
    )
  }

  private detectGeneralQuestion(input: string): boolean {
    const questionKeywords = [
      'what', 'how', 'when', 'where', 'why', 'who', 'can you', 'do you'
    ]
    return questionKeywords.some(keyword => 
      input.toLowerCase().startsWith(keyword)
    )
  }

  private extractBusinessGoal(input: string): string | null {
    for (const [goal, keywords] of Object.entries({
      'lead_generation': ['leads', 'customers', 'inquiries', 'contacts'],
      'e_commerce': ['sell', 'store', 'shop', 'products', 'e-commerce'],
      'information': ['information', 'about', 'company', 'services'],
      'portal': ['portal', 'dashboard', 'login', 'members'],
      'booking': ['booking', 'appointments', 'schedule', 'calendar']
    })) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return goal
      }
    }
    return null
  }

  private extractExistingAssets(input: string): string | null {
    if (input.includes('http') || input.includes('www.') || input.includes('.com')) {
      return 'website_provided'
    }
    if (input.includes('no') || input.includes('none') || input.includes('starting')) {
      return 'none'
    }
    if (input.includes('brand') || input.includes('guidelines') || input.includes('logo')) {
      return 'brand_assets'
    }
    return null
  }

  private extractCoreFeatures(input: string): string[] {
    const features: string[] = []
    const featureMap = {
      'e-commerce': ['ecommerce', 'e-commerce', 'store', 'shop', 'sell'],
      'blog': ['blog', 'content', 'articles', 'news'],
      'portal': ['portal', 'dashboard', 'login', 'members'],
      'crm': ['crm', 'hubspot', 'salesforce', 'customer management'],
      'payment': ['payment', 'stripe', 'paypal', 'checkout'],
      'booking': ['booking', 'calendar', 'appointments', 'schedule']
    }

    for (const [feature, keywords] of Object.entries(featureMap)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        features.push(feature)
      }
    }

    return features
  }

  private extractTechPreference(input: string): string {
    for (const [tech, keywords] of Object.entries(this.techStackKeywords)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return tech
      }
    }
    return 'recommendation_needed'
  }

  private extractBudget(input: string): string | null {
    const budgetPatterns = [
      { pattern: /(\$?\d+k?\s*-?\s*\$?\d+k?)/i, type: 'range' },
      { pattern: /under\s*\$?(\d+k?)/i, type: 'under' },
      { pattern: /around\s*\$?(\d+k?)/i, type: 'around' },
      { pattern: /\$?(\d+k?)\s*budget/i, type: 'budget' }
    ]

    for (const { pattern } of budgetPatterns) {
      const match = input.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  private extractTimeline(input: string): string | null {
    const timelineKeywords = {
      'asap': ['asap', 'urgent', 'immediately', 'rush'],
      '1-2 weeks': ['week', 'weeks', 'quickly'],
      '1-2 months': ['month', 'months'],
      'flexible': ['flexible', 'no rush', 'when ready']
    }

    for (const [timeline, keywords] of Object.entries(timelineKeywords)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return timeline
      }
    }
    return null
  }

  private isReadyToProceed(input: string): boolean {
    const readyKeywords = [
      'ready', 'proceed', 'move forward', 'next step', 'let\'s do it',
      'sounds good', 'perfect', 'yes', 'go ahead'
    ]
    return readyKeywords.some(keyword => input.includes(keyword))
  }

  private isConfirmationReceived(input: string): boolean {
    const confirmKeywords = [
      'yes', 'correct', 'right', 'exactly', 'that\'s it', 'perfect'
    ]
    return confirmKeywords.some(keyword => input.includes(keyword))
  }

  // Response generators
  private getBusinessGoalResponse(goal: string): string {
    const responses = {
      'lead_generation': 'Lead generation is crucial for business growth!',
      'e_commerce': 'E-commerce is a fantastic way to expand your reach!',
      'information': 'A strong informational presence builds trust and authority.',
      'portal': 'Client portals are excellent for improving customer experience.',
      'booking': 'Automated booking systems save time and reduce friction.'
    }
    return responses[goal as keyof typeof responses] || 'That sounds like a great objective!'
  }

  private getAssetsResponse(assets: string | null): string {
    if (assets === 'website_provided') return 'Thanks for sharing your current site - I\'ll make sure David reviews it.'
    if (assets === 'none') return 'Starting fresh gives us complete creative freedom!'
    if (assets === 'brand_assets') return 'Having brand guidelines will ensure consistency across your new site.'
    return 'Understanding your current assets helps us plan the best approach.'
  }

  private getFeaturesResponse(features: string[]): string {
    if (features.length === 0) return 'We can explore feature options based on your goals.'
    if (features.length === 1) return `${features[0]} is a great feature to include!`
    return `Excellent! ${features.join(', ')} will create a comprehensive solution.`
  }

  private getTechResponse(tech: string): string {
    const responses = {
      'wordpress': 'WordPress is perfect for content-rich sites with easy management.',
      'shopify': 'Shopify is the gold standard for e-commerce - excellent choice!',
      'react': 'React enables highly interactive and performant applications.',
      'custom': 'Custom development gives you exactly what you need, nothing more.',
      'recommendation_needed': 'I\'ll have David recommend the best technology for your specific needs.'
    }
    return responses[tech as keyof typeof responses] || 'That\'s a solid technology choice!'
  }

  private summarizeProject(info: any): string {
    const parts = []
    if (info.businessGoal) parts.push(`a ${info.businessGoal.replace('_', ' ')} focused website`)
    if (info.techPreference && info.techPreference !== 'recommendation_needed') {
      parts.push(`built with ${info.techPreference}`)
    }
    if (info.budgetRange) parts.push(`with a budget around ${info.budgetRange}`)
    if (info.timeline) parts.push(`and a ${info.timeline} timeline`)
    
    return parts.join(', ') || 'your project'
  }
}
