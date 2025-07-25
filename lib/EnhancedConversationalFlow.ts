// Enhanced Conversational Flow with Complete Client Validation and Service Knowledge
import { IntelligentFunnelManager, ProspectProfile, FunnelResponse } from './IntelligentFunnelManager'
import { ServiceKnowledgeBase } from './ServiceKnowledgeBase'
import { ClientValidationEngine, ValidationResult } from './ClientValidationEngine'
import { PreProjectValidationSystem, ClientHandoffPackage } from './PreProjectValidationSystem'
import { CurrencySystem, LocationCurrencyData } from './CurrencySystem'
import { GranularServiceCatalog } from './GranularServiceCatalog'
import { CustomProjectIntelligence, CustomProjectAnalysis } from './CustomProjectIntelligence'

export interface EnhancedConversationContext {
  sessionId: string
  userInput: string
  conversationHistory: string[]
  prospectProfile?: ProspectProfile
  currentStage: string
  extractedInfo: any
  score: number
}

export interface EnhancedConversationResponse {
  message: string
  nextStage: string
  extractedData?: any
  shouldNotify: boolean
  shouldHandoff: boolean
  confidence: number
  followUpQuestions?: string[]
  serviceRecommendations?: any[]
  proposalGenerated?: boolean
  validationResult?: ValidationResult
  handoffPackage?: ClientHandoffPackage
  quickButtons?: string[]
  actions: string[]
  customProjectAnalysis?: CustomProjectAnalysis
  currencyInfo?: {
    userCurrency: 'USD' | 'NGN'
    exchangeRate: string
    locationData: LocationCurrencyData
  }
}

export class EnhancedConversationalFlow {
  private funnelManager: IntelligentFunnelManager
  private serviceKB: ServiceKnowledgeBase
  private validationEngine: ClientValidationEngine
  private preProjectValidator: PreProjectValidationSystem
  private currencySystem: CurrencySystem
  private granularCatalog: GranularServiceCatalog
  private customProjectAI: CustomProjectIntelligence
  private activeProspects: Map<string, ProspectProfile> = new Map()
  private userLocationData: Map<string, LocationCurrencyData> = new Map()

  constructor() {
    this.funnelManager = new IntelligentFunnelManager()
    this.serviceKB = new ServiceKnowledgeBase()
    this.validationEngine = new ClientValidationEngine()
    this.preProjectValidator = new PreProjectValidationSystem()
    this.currencySystem = new CurrencySystem()
    this.granularCatalog = new GranularServiceCatalog()
    this.customProjectAI = new CustomProjectIntelligence()
  }

  public processConversation(context: EnhancedConversationContext): EnhancedConversationResponse {
    // Get or create prospect profile
    let prospect = this.activeProspects.get(context.sessionId)
    if (!prospect) {
      prospect = this.funnelManager.createNewProspect(context.sessionId)
      this.activeProspects.set(context.sessionId, prospect)
    }

    // Detect and store user location/currency preferences
    let locationData = this.userLocationData.get(context.sessionId)
    if (!locationData) {
      locationData = this.currencySystem.detectUserCurrency(context.extractedInfo.locationContext)
      this.userLocationData.set(context.sessionId, locationData)
    }

    // Update currency rates if needed
    if (this.currencySystem.needsRateUpdate()) {
      this.currencySystem.forceRateUpdate().catch(console.error)
    }

    // Process budget information with currency awareness
    if (context.userInput.includes('$') || context.userInput.includes('₦') ||
        context.userInput.toLowerCase().includes('budget') ||
        context.userInput.toLowerCase().includes('cost')) {
      const budgetInfo = this.currencySystem.parseBudgetFromText(context.userInput)
      if (budgetInfo.amount && budgetInfo.currency) {
        prospect.projectDetails.budget = budgetInfo.range || `${budgetInfo.amount} ${budgetInfo.currency}`
      }
    }

    // Process through intelligent funnel
    const funnelResponse = this.funnelManager.processProspectInteraction(
      prospect,
      context.userInput,
      context.conversationHistory
    )

    // Analyze custom project if mentioned
    let customProjectAnalysis: CustomProjectAnalysis | undefined
    if (this.isCustomProjectMention(context.userInput) || prospect.currentStage === 'discovery') {
      customProjectAnalysis = this.analyzeCustomProject(
        context.userInput,
        prospect,
        locationData.primaryCurrency
      )
    }

    // Generate service recommendations if appropriate
    const serviceRecommendations = this.generateServiceRecommendations(prospect, locationData)

    // Check if client validation is needed
    let validationResult: ValidationResult | undefined
    let handoffPackage: ClientHandoffPackage | undefined

    if (funnelResponse.handoffReady) {
      validationResult = this.performClientValidation(prospect, context.conversationHistory)

      if (validationResult.isValidatedClient) {
        handoffPackage = this.generateHandoffPackage(prospect, validationResult, context.conversationHistory)
      }
    }

    // Generate enhanced response
    const enhancedResponse = this.generateEnhancedResponse(
      funnelResponse,
      prospect,
      serviceRecommendations,
      validationResult,
      handoffPackage,
      customProjectAnalysis,
      locationData
    )

    // Update prospect in storage
    this.activeProspects.set(context.sessionId, prospect)

    return enhancedResponse
  }

  private isCustomProjectMention(userInput: string): boolean {
    const customIndicators = [
      'custom', 'unique', 'specific', 'specialized', 'bespoke', 'tailored',
      'never seen', 'different from', 'unlike', 'special requirements'
    ]

    const lowerInput = userInput.toLowerCase()
    return customIndicators.some(indicator => lowerInput.includes(indicator)) ||
           userInput.length > 100 // Long descriptions often indicate custom projects
  }

  private analyzeCustomProject(
    userInput: string,
    prospect: ProspectProfile,
    currency: 'USD' | 'NGN'
  ): CustomProjectAnalysis {
    return this.customProjectAI.analyzeCustomProject(
      userInput,
      prospect.businessProfile.type,
      prospect.projectDetails.budget,
      prospect.projectDetails.timeline,
      currency
    )
  }

  private generateServiceRecommendations(
    prospect: ProspectProfile,
    locationData: LocationCurrencyData
  ): any[] {
    if (!prospect.projectDetails.type) return []

    const requirements = {
      businessType: prospect.businessProfile.type,
      budget: prospect.projectDetails.budget || '',
      timeline: prospect.projectDetails.timeline || '',
      goals: prospect.businessProfile.goals
    }

    // Get recommendations from both service catalogs
    const basicRecommendations = this.serviceKB.recommendServices(requirements)
    const granularRecommendations = this.granularCatalog.findRelevantServices(
      prospect.projectDetails.type || '',
      prospect.projectDetails.budget,
      prospect.businessProfile.type
    )

    // Combine and enhance with currency information
    const allRecommendations = [...basicRecommendations, ...granularRecommendations.servicePackages]

    return allRecommendations.slice(0, 3).map(service => ({
      ...service,
      pricing: this.enhanceServicePricing(service, locationData)
    }))
  }

  private enhanceServicePricing(service: any, locationData: LocationCurrencyData): any {
    if (!service.pricing) return service.pricing

    // Convert pricing to user's preferred currency
    const currency = locationData.primaryCurrency
    const showEquivalent = locationData.showBothCurrencies

    if (service.pricing.ranges) {
      const enhancedRanges: any = {}

      for (const [clientType, priceRange] of Object.entries(service.pricing.ranges)) {
        if (typeof priceRange === 'string') {
          // Parse existing price range and convert
          const parsed = this.currencySystem.parseBudgetFromText(priceRange)
          if (parsed.amount && parsed.currency) {
            const convertedAmount = this.currencySystem.convertCurrency(
              parsed.amount,
              parsed.currency,
              currency
            )
            enhancedRanges[clientType] = this.currencySystem.formatCurrency(convertedAmount, currency)

            if (showEquivalent && parsed.currency !== currency) {
              const equivalent = this.currencySystem.formatCurrency(parsed.amount, parsed.currency)
              enhancedRanges[clientType] += ` (${equivalent})`
            }
          } else {
            enhancedRanges[clientType] = priceRange
          }
        }
      }

      return {
        ...service.pricing,
        ranges: enhancedRanges,
        currency: currency,
        exchangeRate: this.currencySystem.getCurrentRate()
      }
    }

    return service.pricing
  }

  private performClientValidation(prospect: ProspectProfile, conversationHistory: string[]): ValidationResult {
    const validationData = this.validationEngine.extractValidationData(conversationHistory, prospect)
    return this.validationEngine.validateClient(validationData)
  }

  private generateHandoffPackage(
    prospect: ProspectProfile,
    validationResult: ValidationResult,
    conversationHistory: string[]
  ): ClientHandoffPackage {
    
    const preProjectValidation = this.preProjectValidator.validateProjectReadiness(
      { conversationHistory },
      prospect,
      prospect.projectDetails
    )

    return this.preProjectValidator.generateClientHandoffPackage(
      preProjectValidation,
      prospect,
      prospect.projectDetails,
      conversationHistory
    )
  }

  private generateEnhancedResponse(
    funnelResponse: FunnelResponse,
    prospect: ProspectProfile,
    serviceRecommendations: any[],
    validationResult?: ValidationResult,
    handoffPackage?: ClientHandoffPackage,
    customProjectAnalysis?: CustomProjectAnalysis,
    locationData?: LocationCurrencyData
  ): EnhancedConversationResponse {

    let enhancedMessage = funnelResponse.message

    // Add custom project analysis if available
    if (customProjectAnalysis && prospect.currentStage === 'discovery') {
      const projectSummary = this.customProjectAI.getProjectSummary(customProjectAnalysis)
      enhancedMessage = projectSummary
    }

    // Add service recommendations if appropriate
    if (serviceRecommendations.length > 0 && prospect.currentStage === 'proposal') {
      const primaryService = serviceRecommendations[0]
      enhancedMessage += `\n\nBased on your requirements, I'd recommend my ${primaryService.name} service. ${primaryService.valueProposition}`

      // Add pricing with currency context
      if (primaryService.pricing && locationData) {
        const pricingDisplay = this.formatPricingForDisplay(primaryService.pricing, locationData)
        enhancedMessage += `\n\n**Investment:** ${pricingDisplay}`
      }
    }

    // Add validation insights if available
    if (validationResult && !validationResult.isValidatedClient) {
      enhancedMessage += `\n\nTo ensure I can provide the best service, I'd like to understand a bit more about ${validationResult.riskFactors[0]?.toLowerCase() || 'your project timeline'}.`
    }

    // Generate contextual quick buttons with currency awareness
    const quickButtons = this.generateQuickButtons(prospect, funnelResponse, locationData)

    // Prepare currency information
    const currencyInfo = locationData ? {
      userCurrency: locationData.primaryCurrency,
      exchangeRate: this.currencySystem.getCurrentRate(),
      locationData
    } : undefined

    return {
      message: enhancedMessage,
      nextStage: funnelResponse.nextStage,
      extractedData: this.extractDataFromProspect(prospect),
      shouldNotify: funnelResponse.shouldNotify && (validationResult?.isValidatedClient || false),
      shouldHandoff: funnelResponse.handoffReady && (validationResult?.isValidatedClient || false),
      confidence: this.calculateConfidence(prospect, validationResult),
      followUpQuestions: funnelResponse.questions,
      serviceRecommendations,
      proposalGenerated: funnelResponse.proposalReady,
      validationResult,
      handoffPackage,
      quickButtons,
      actions: funnelResponse.actions,
      customProjectAnalysis,
      currencyInfo
    }
  }

  private generateQuickButtons(
    prospect: ProspectProfile,
    funnelResponse: FunnelResponse,
    locationData?: LocationCurrencyData
  ): string[] {
    const buttons: string[] = []
    const currency = locationData?.primaryCurrency || 'USD'

    switch (prospect.currentStage) {
      case 'awareness':
        buttons.push('I need a website', 'I want a mobile app', 'I need AI automation', 'Custom project idea')
        break

      case 'discovery':
        if (!prospect.projectDetails.budget) {
          // Generate currency-aware budget buttons
          const budgetRanges = this.currencySystem.getBudgetRanges(currency)
          const relevantRanges = budgetRanges.slice(1, 5) // Skip micro and show 4 main ranges

          relevantRanges.forEach(range => {
            const displayText = locationData?.showBothCurrencies && range.range.equivalent
              ? `${range.range.formatted} (${range.range.equivalent.formatted})`
              : range.range.formatted
            buttons.push(displayText)
          })
        } else if (!prospect.projectDetails.timeline) {
          buttons.push('1-2 months', '3-4 months', '6+ months', 'Flexible timeline')
        }
        break

      case 'qualification':
        if (!prospect.qualification.validationData?.decisionMaker) {
          buttons.push('Yes, I make the decisions', 'I need to get approval', 'I\'m gathering information')
        }
        break

      case 'proposal':
        buttons.push('This looks perfect', 'I have some questions', 'Can we schedule a call?', 'Send me a proposal')
        break

      case 'commitment':
        buttons.push('I\'m ready to proceed', 'I need to think about it', 'Let\'s schedule a call', 'What are the next steps?')
        break
    }

    return buttons
  }

  private formatPricingForDisplay(pricing: any, locationData: LocationCurrencyData): string {
    if (!pricing || !pricing.ranges) return 'Custom pricing available'

    const clientType = 'startup' // Default for display
    const priceRange = pricing.ranges[clientType]

    if (!priceRange) return 'Custom pricing available'

    return priceRange
  }

  private extractDataFromProspect(prospect: ProspectProfile): any {
    return {
      projectType: prospect.projectDetails.type,
      budget: prospect.projectDetails.budget,
      timeline: prospect.projectDetails.timeline,
      urgency: prospect.projectDetails.urgency,
      contactInfo: prospect.contactInfo,
      businessType: prospect.businessProfile.type,
      stage: prospect.currentStage,
      score: prospect.qualification.score,
      readyForHandoff: prospect.qualification.readyForHandoff
    }
  }

  private calculateConfidence(prospect: ProspectProfile, validationResult?: ValidationResult): number {
    let confidence = prospect.qualification.score

    if (validationResult) {
      confidence = Math.max(confidence, validationResult.validationScore)
    }

    // Boost confidence for complete information
    if (prospect.contactInfo.email) confidence += 5
    if (prospect.contactInfo.phone) confidence += 5
    if (prospect.projectDetails.budget) confidence += 10
    if (prospect.projectDetails.timeline) confidence += 5

    return Math.min(confidence, 100)
  }

  // Public methods for external access
  public getProspectProfile(sessionId: string): ProspectProfile | undefined {
    return this.activeProspects.get(sessionId)
  }

  public getAllServices() {
    return this.serviceKB.getAllServices()
  }

  public getServicesByCategory(category: string) {
    return this.serviceKB.findServicesByCategory(category as any)
  }

  public generateServiceProposal(serviceId: string, clientRequirements: any): string {
    return this.serviceKB.generateServiceProposal(serviceId, clientRequirements)
  }

  // Method to handle specific business questions with currency and service awareness
  public handleBusinessInquiry(
    question: string,
    prospect: ProspectProfile,
    locationData?: LocationCurrencyData
  ): string {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes('experience') || lowerQuestion.includes('background')) {
      return this.generateExperienceResponse(prospect)
    }

    if (lowerQuestion.includes('price') || lowerQuestion.includes('cost') || lowerQuestion.includes('budget')) {
      return this.generatePricingResponse(prospect, locationData)
    }

    if (lowerQuestion.includes('timeline') || lowerQuestion.includes('how long')) {
      return this.generateTimelineResponse(prospect)
    }

    if (lowerQuestion.includes('process') || lowerQuestion.includes('how do you work')) {
      return this.generateProcessResponse(prospect)
    }

    if (lowerQuestion.includes('portfolio') || lowerQuestion.includes('examples')) {
      return this.generatePortfolioResponse(prospect)
    }

    if (lowerQuestion.includes('services') || lowerQuestion.includes('what do you offer')) {
      return this.generateServicesResponse(prospect, locationData)
    }

    if (lowerQuestion.includes('custom') || lowerQuestion.includes('unique') || lowerQuestion.includes('specific')) {
      return this.generateCustomProjectResponse(prospect, locationData)
    }

    return "That's a great question! Let me provide you with detailed information about that."
  }

  private generateExperienceResponse(prospect: ProspectProfile): string {
    const projectType = prospect.projectDetails.type || 'development'
    return `I have over 20 years of programming experience and have been specializing in ${projectType} projects for the past 7+ years. I've successfully delivered 100+ applications with a 99.9% uptime record. My background includes both technical development and business strategy, which helps me create solutions that truly serve your business goals.`
  }

  private generatePricingResponse(prospect: ProspectProfile, locationData?: LocationCurrencyData): string {
    const currency = locationData?.primaryCurrency || 'USD'
    const showBothCurrencies = locationData?.showBothCurrencies || false

    if (prospect.projectDetails.type) {
      // Check granular catalog first
      const granularServices = this.granularCatalog.getServicePackagesByCategory(prospect.projectDetails.type)
      if (granularServices.length > 0) {
        const service = granularServices[0]
        const pricing = this.granularCatalog.calculatePackagePrice(service.id, prospect.businessProfile.type, currency)

        if (pricing) {
          const priceDisplay = showBothCurrencies && pricing.equivalent
            ? `${pricing.formatted} (${pricing.equivalent.formatted})`
            : pricing.formatted

          return `For ${service.name.toLowerCase()}, my pricing typically ranges ${priceDisplay} depending on complexity and specific requirements. This includes a comprehensive package with ${service.bundleDiscount}% bundle savings. The investment reflects the quality, expertise, and ongoing support I provide.`
        }
      }

      // Fallback to basic service catalog
      const services = this.serviceKB.findServicesByCategory(prospect.projectDetails.type as any)
      if (services.length > 0) {
        const service = services[0]
        const businessType = prospect.businessProfile.type
        const pricing = service.pricing.ranges[businessType]

        if (pricing) {
          // Convert pricing to user's currency
          const convertedPricing = this.convertPricingToCurrency(pricing, currency, showBothCurrencies)
          return `For ${service.name.toLowerCase()}, my pricing typically ranges ${convertedPricing} depending on complexity and specific requirements. This includes ${service.deliverables.slice(0, 3).join(', ')} and more. The investment reflects the comprehensive approach and ongoing support I provide.`
        }
      }
    }

    // General pricing response with currency context
    const budgetRanges = this.currencySystem.getBudgetRanges(currency)
    const exampleRange = budgetRanges[2] // Medium project range
    const priceDisplay = showBothCurrencies && exampleRange.range.equivalent
      ? `${exampleRange.range.formatted} (${exampleRange.range.equivalent.formatted})`
      : exampleRange.range.formatted

    return `My pricing is based on the specific requirements and complexity of your project. For example, ${exampleRange.description} typically range ${priceDisplay}. I provide transparent, fixed-price quotes after understanding your needs. This ensures you know exactly what you're investing and what you'll receive. Would you like to discuss your specific requirements so I can provide accurate pricing?`
  }

  private convertPricingToCurrency(pricing: string, targetCurrency: 'USD' | 'NGN', showEquivalent: boolean): string {
    const parsed = this.currencySystem.parseBudgetFromText(pricing)
    if (!parsed.amount || !parsed.currency) return pricing

    if (parsed.currency === targetCurrency) {
      return pricing
    }

    const convertedAmount = this.currencySystem.convertCurrency(parsed.amount, parsed.currency, targetCurrency)
    const convertedFormatted = this.currencySystem.formatCurrency(convertedAmount, targetCurrency)

    if (showEquivalent) {
      const originalFormatted = this.currencySystem.formatCurrency(parsed.amount, parsed.currency)
      return `${convertedFormatted} (${originalFormatted})`
    }

    return convertedFormatted
  }

  private generateTimelineResponse(prospect: ProspectProfile): string {
    if (prospect.projectDetails.type) {
      const services = this.serviceKB.findServicesByCategory(prospect.projectDetails.type as any)
      if (services.length > 0) {
        const service = services[0]
        return `For ${service.name.toLowerCase()}, the typical timeline is ${service.timeline.typical}, though this can vary based on complexity and your specific requirements. I always provide realistic timelines and keep you updated throughout the project. What's your ideal timeline for this project?`
      }
    }

    return "Project timelines depend on scope and complexity. I believe in setting realistic expectations and delivering on time. Most projects range from 6-12 weeks, but I can work with urgent timelines when needed. What's your target timeline for this project?"
  }

  private generateProcessResponse(prospect: ProspectProfile): string {
    return `My process is designed to ensure your success: 1) Discovery & Planning - We define requirements and create a detailed roadmap, 2) Design & Development - Regular updates and milestone reviews, 3) Testing & Refinement - Thorough testing and your feedback integration, 4) Launch & Support - Smooth deployment and ongoing support. Throughout, you'll have direct access to me and regular progress updates.`
  }

  private generatePortfolioResponse(prospect: ProspectProfile): string {
    const projectType = prospect.projectDetails.type || 'applications'
    return `I've built ${projectType} for clients ranging from startups to Fortune 500 companies. Recent highlights include a fintech platform handling millions of transactions, an e-commerce site that increased conversions by 40%, and AI automation systems saving clients 60% in operational costs. You can see detailed case studies and examples at my portfolio. Would you like me to share specific examples relevant to your industry?`
  }

  private generateServicesResponse(prospect: ProspectProfile, locationData?: LocationCurrencyData): string {
    const currency = locationData?.primaryCurrency || 'USD'
    const allPackages = this.granularCatalog.getAllServicePackages()
    const categories = [...new Set(allPackages.map(pkg => pkg.category))]

    let response = "I offer a comprehensive range of services across multiple categories:\n\n"

    categories.slice(0, 4).forEach(category => {
      const categoryPackages = allPackages.filter(pkg => pkg.category === category)
      const examplePackage = categoryPackages[0]

      if (examplePackage) {
        const pricing = this.granularCatalog.calculatePackagePrice(
          examplePackage.id,
          prospect.businessProfile.type,
          currency
        )

        const priceDisplay = pricing
          ? (locationData?.showBothCurrencies && pricing.equivalent
              ? `${pricing.formatted} (${pricing.equivalent.formatted})`
              : pricing.formatted)
          : 'Custom pricing'

        response += `**${category.replace('-', ' ').toUpperCase()}**\n`
        response += `• ${examplePackage.name}: ${examplePackage.description}\n`
        response += `• Starting from: ${priceDisplay}\n\n`
      }
    })

    response += "I also handle custom projects and unique requirements. What type of project are you considering?"

    return response
  }

  private generateCustomProjectResponse(prospect: ProspectProfile, locationData?: LocationCurrencyData): string {
    const currency = locationData?.primaryCurrency || 'USD'

    return `I specialize in custom and unique projects! My approach to custom development includes:

**🎯 Custom Project Process:**
• **Deep Discovery:** Understanding your unique requirements and business goals
• **Tailored Architecture:** Designing solutions specifically for your needs
• **Flexible Development:** Adapting to your specific workflows and preferences
• **Ongoing Collaboration:** Regular feedback and iteration throughout development

**💡 Recent Custom Projects:**
• Industry-specific CRM with custom workflows
• AI-powered automation for unique business processes
• Specialized e-commerce platforms with custom features
• Bespoke mobile apps with unique functionality

**💰 Custom Project Investment:**
Custom projects typically range from ${this.currencySystem.formatCurrency(15000, currency)} to ${this.currencySystem.formatCurrency(200000, currency)}${locationData?.showBothCurrencies ? ` (${this.currencySystem.formatCurrency(15000, currency === 'USD' ? 'NGN' : 'USD')} to ${this.currencySystem.formatCurrency(200000, currency === 'USD' ? 'NGN' : 'USD')})` : ''} depending on complexity and scope.

What unique challenge or idea are you looking to solve? I'd love to understand your vision and see how I can bring it to life!`
  }

  // Method to clean up old prospects (call periodically)
  public cleanupOldProspects(): void {
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
    
    for (const [sessionId, prospect] of this.activeProspects.entries()) {
      if (prospect.engagement.lastActivity < cutoffTime) {
        this.activeProspects.delete(sessionId)
      }
    }
  }
}
