// Intelligent Funnel Management System - Complete Prospect to Client Journey
import { ServiceKnowledgeBase, ServiceOffering } from './ServiceKnowledgeBase'
import { ClientValidationEngine, ClientValidationData, ValidationResult } from './ClientValidationEngine'

export interface FunnelStage {
  id: string
  name: string
  description: string
  objectives: string[]
  questions: string[]
  qualificationCriteria: string[]
  nextStages: string[]
  exitCriteria: string[]
}

export interface ProspectProfile {
  sessionId: string
  currentStage: string
  stageHistory: string[]
  
  // Basic Information
  contactInfo: {
    name?: string
    email?: string
    phone?: string
    company?: string
    role?: string
  }
  
  // Business Context
  businessProfile: {
    type: 'individual' | 'startup' | 'smb' | 'enterprise'
    industry: string
    size: string
    stage: 'idea' | 'mvp' | 'growth' | 'established' | 'mature'
    challenges: string[]
    goals: string[]
  }
  
  // Project Information
  projectDetails: {
    type?: string
    scope?: string
    budget?: string
    timeline?: string
    urgency: 'low' | 'medium' | 'high' | 'critical'
    requirements: string[]
    constraints: string[]
  }
  
  // Engagement Metrics
  engagement: {
    conversationLength: number
    responseQuality: number
    questionDepth: number
    interactionCount: number
    timeSpent: number
    lastActivity: Date
  }
  
  // Qualification Status
  qualification: {
    score: number
    validationData?: ClientValidationData
    validationResult?: ValidationResult
    readyForHandoff: boolean
    disqualificationReasons: string[]
  }
  
  // Service Matching
  serviceInterest: {
    primaryService?: string
    secondaryServices: string[]
    customRequirements: string[]
    proposalGenerated: boolean
  }
}

export interface FunnelResponse {
  message: string
  nextStage: string
  questions: string[]
  actions: string[]
  shouldAdvance: boolean
  shouldNotify: boolean
  proposalReady: boolean
  handoffReady: boolean
}

export class IntelligentFunnelManager {
  private serviceKB: ServiceKnowledgeBase
  private validationEngine: ClientValidationEngine
  
  private funnelStages: FunnelStage[] = [
    {
      id: 'awareness',
      name: 'Awareness & Interest',
      description: 'Initial contact and interest generation',
      objectives: ['Capture attention', 'Understand visitor intent', 'Build initial rapport'],
      questions: [
        'What brings you here today?',
        'What type of project are you considering?',
        'What challenges are you trying to solve?'
      ],
      qualificationCriteria: ['Shows genuine interest', 'Has a specific need', 'Willing to engage'],
      nextStages: ['discovery'],
      exitCriteria: ['No genuine interest', 'Not a good fit', 'Just browsing']
    },
    
    {
      id: 'discovery',
      name: 'Discovery & Needs Assessment',
      description: 'Deep dive into requirements and business context',
      objectives: ['Understand business context', 'Identify specific needs', 'Assess project scope'],
      questions: [
        'Tell me more about your business',
        'What specific outcomes are you looking for?',
        'What\'s driving this project right now?',
        'What challenges have you faced with similar projects?'
      ],
      qualificationCriteria: ['Clear business need', 'Specific requirements', 'Realistic expectations'],
      nextStages: ['qualification'],
      exitCriteria: ['Unclear requirements', 'Unrealistic expectations', 'No clear need']
    },
    
    {
      id: 'qualification',
      name: 'Budget & Authority Qualification',
      description: 'Assess financial capability and decision-making authority',
      objectives: ['Confirm budget availability', 'Identify decision makers', 'Assess timeline'],
      questions: [
        'What budget range are you working with?',
        'Who else is involved in this decision?',
        'What\'s your ideal timeline for this project?',
        'Have you allocated budget for this project?'
      ],
      qualificationCriteria: ['Adequate budget', 'Decision-making authority', 'Realistic timeline'],
      nextStages: ['proposal'],
      exitCriteria: ['Insufficient budget', 'No authority', 'Unrealistic timeline']
    },
    
    {
      id: 'proposal',
      name: 'Solution Presentation',
      description: 'Present tailored solution and build value',
      objectives: ['Present solution', 'Demonstrate value', 'Address concerns'],
      questions: [
        'Does this solution address your main concerns?',
        'What questions do you have about the approach?',
        'How does this timeline work for you?'
      ],
      qualificationCriteria: ['Solution fit confirmed', 'Value understood', 'Concerns addressed'],
      nextStages: ['commitment'],
      exitCriteria: ['Poor solution fit', 'Value not clear', 'Major concerns']
    },
    
    {
      id: 'commitment',
      name: 'Commitment & Closing',
      description: 'Secure commitment and prepare for handoff',
      objectives: ['Secure commitment', 'Finalize details', 'Prepare handoff'],
      questions: [
        'Are you ready to move forward with this project?',
        'When would you like to start?',
        'What\'s the best way for David to reach you?'
      ],
      qualificationCriteria: ['Commitment expressed', 'Start date agreed', 'Contact info provided'],
      nextStages: ['handoff'],
      exitCriteria: ['No commitment', 'Needs more time', 'Changed requirements']
    },
    
    {
      id: 'handoff',
      name: 'Client Handoff',
      description: 'Transfer validated client to direct communication',
      objectives: ['Complete validation', 'Prepare handoff package', 'Initiate contact'],
      questions: [],
      qualificationCriteria: ['Full validation complete', 'All requirements clear', 'Ready for project start'],
      nextStages: [],
      exitCriteria: []
    }
  ]

  constructor() {
    this.serviceKB = new ServiceKnowledgeBase()
    this.validationEngine = new ClientValidationEngine()
  }

  public processProspectInteraction(
    prospect: ProspectProfile,
    userInput: string,
    conversationHistory: string[]
  ): FunnelResponse {
    
    // Update engagement metrics
    this.updateEngagementMetrics(prospect, userInput)
    
    // Extract information from conversation
    this.extractInformationFromInput(prospect, userInput, conversationHistory)
    
    // Determine current stage and next actions
    const currentStage = this.getCurrentStage(prospect.currentStage)
    const stageProgress = this.assessStageProgress(prospect, currentStage)
    
    // Generate appropriate response
    const response = this.generateStageResponse(prospect, currentStage, stageProgress, userInput)
    
    // Update prospect profile
    this.updateProspectProfile(prospect, response)
    
    return response
  }

  private updateEngagementMetrics(prospect: ProspectProfile, userInput: string): void {
    prospect.engagement.conversationLength += userInput.length
    prospect.engagement.responseQuality = this.assessResponseQuality(userInput)
    prospect.engagement.questionDepth = this.assessQuestionDepth(userInput)
    prospect.engagement.interactionCount += 1
    prospect.engagement.lastActivity = new Date()
  }

  private extractInformationFromInput(prospect: ProspectProfile, input: string, history: string[]): void {
    const lowerInput = input.toLowerCase()
    
    // Extract contact information
    const emailMatch = input.match(/[\w.-]+@[\w.-]+\.\w+/)
    if (emailMatch) prospect.contactInfo.email = emailMatch[0]
    
    const phoneMatch = input.match(/[\+]?[\d\s\-\(\)]{10,}/)
    if (phoneMatch) prospect.contactInfo.phone = phoneMatch[0]
    
    // Extract business information
    if (lowerInput.includes('startup') || lowerInput.includes('new business')) {
      prospect.businessProfile.type = 'startup'
    } else if (lowerInput.includes('enterprise') || lowerInput.includes('corporation')) {
      prospect.businessProfile.type = 'enterprise'
    } else if (lowerInput.includes('small business') || lowerInput.includes('smb')) {
      prospect.businessProfile.type = 'smb'
    }
    
    // Extract project information
    this.extractProjectDetails(prospect, input)
    
    // Extract budget information
    this.extractBudgetInformation(prospect, input)
    
    // Extract timeline information
    this.extractTimelineInformation(prospect, input)
  }

  private extractProjectDetails(prospect: ProspectProfile, input: string): void {
    const projectKeywords = {
      'website': ['website', 'web app', 'web application', 'online platform'],
      'mobile': ['mobile app', 'ios app', 'android app', 'mobile application'],
      'ai': ['ai', 'artificial intelligence', 'chatbot', 'automation', 'machine learning'],
      'security': ['security', 'cybersecurity', 'secure', 'protection', 'compliance'],
      'design': ['design', 'branding', 'logo', 'visual identity', 'brand'],
      'consulting': ['consulting', 'strategy', 'transformation', 'advisory']
    }
    
    for (const [type, keywords] of Object.entries(projectKeywords)) {
      if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
        prospect.projectDetails.type = type
        break
      }
    }
  }

  private extractBudgetInformation(prospect: ProspectProfile, input: string): void {
    const budgetMatch = input.match(/\$?(\d+)k?/)
    if (budgetMatch) {
      const amount = parseInt(budgetMatch[1])
      if (amount < 5) prospect.projectDetails.budget = 'under-5k'
      else if (amount <= 15) prospect.projectDetails.budget = '5k-15k'
      else if (amount <= 30) prospect.projectDetails.budget = '15k-30k'
      else if (amount <= 50) prospect.projectDetails.budget = '30k-50k'
      else prospect.projectDetails.budget = '50k+'
    }
  }

  private extractTimelineInformation(prospect: ProspectProfile, input: string): void {
    if (input.toLowerCase().includes('asap') || input.toLowerCase().includes('urgent')) {
      prospect.projectDetails.urgency = 'critical'
    } else if (input.toLowerCase().includes('soon') || input.toLowerCase().includes('quickly')) {
      prospect.projectDetails.urgency = 'high'
    } else if (input.toLowerCase().includes('flexible') || input.toLowerCase().includes('no rush')) {
      prospect.projectDetails.urgency = 'low'
    } else {
      prospect.projectDetails.urgency = 'medium'
    }
  }

  private getCurrentStage(stageId: string): FunnelStage {
    return this.funnelStages.find(stage => stage.id === stageId) || this.funnelStages[0]
  }

  private assessStageProgress(prospect: ProspectProfile, stage: FunnelStage): number {
    // Calculate completion percentage for current stage
    let progress = 0
    const totalCriteria = stage.qualificationCriteria.length
    
    stage.qualificationCriteria.forEach(criteria => {
      if (this.criteriaIsMet(prospect, criteria)) {
        progress += 1
      }
    })
    
    return (progress / totalCriteria) * 100
  }

  private criteriaIsMet(prospect: ProspectProfile, criteria: string): boolean {
    // Implement criteria checking logic
    switch (criteria.toLowerCase()) {
      case 'shows genuine interest':
        return prospect.engagement.interactionCount >= 3
      case 'has a specific need':
        return !!prospect.projectDetails.type
      case 'clear business need':
        return prospect.businessProfile.challenges.length > 0
      case 'adequate budget':
        return !!prospect.projectDetails.budget && prospect.projectDetails.budget !== 'under-5k'
      case 'decision-making authority':
        return prospect.qualification.validationData?.decisionMaker || false
      case 'realistic timeline':
        return !!prospect.projectDetails.timeline
      default:
        return false
    }
  }

  private generateStageResponse(
    prospect: ProspectProfile,
    stage: FunnelStage,
    progress: number,
    userInput: string
  ): FunnelResponse {
    
    let shouldAdvance = progress >= 80
    let nextStage = shouldAdvance ? (stage.nextStages[0] || stage.id) : stage.id
    
    // Generate contextual message based on stage and progress
    let message = this.generateContextualMessage(prospect, stage, userInput)
    
    // Determine if validation and handoff are ready
    const shouldNotify = this.shouldTriggerNotification(prospect, stage)
    const handoffReady = stage.id === 'handoff' || (stage.id === 'commitment' && shouldAdvance)
    
    // Generate proposal if in proposal stage
    const proposalReady = stage.id === 'proposal' && prospect.projectDetails.type
    
    return {
      message,
      nextStage,
      questions: this.getNextQuestions(prospect, stage),
      actions: this.getRecommendedActions(prospect, stage),
      shouldAdvance,
      shouldNotify,
      proposalReady,
      handoffReady
    }
  }

  private generateContextualMessage(prospect: ProspectProfile, stage: FunnelStage, userInput: string): string {
    // Generate intelligent, contextual responses based on stage and prospect profile
    switch (stage.id) {
      case 'awareness':
        return this.generateAwarenessMessage(prospect, userInput)
      case 'discovery':
        return this.generateDiscoveryMessage(prospect, userInput)
      case 'qualification':
        return this.generateQualificationMessage(prospect, userInput)
      case 'proposal':
        return this.generateProposalMessage(prospect, userInput)
      case 'commitment':
        return this.generateCommitmentMessage(prospect, userInput)
      case 'handoff':
        return this.generateHandoffMessage(prospect, userInput)
      default:
        return "I'd love to learn more about your project. Could you tell me what you're looking to accomplish?"
    }
  }

  private generateAwarenessMessage(prospect: ProspectProfile, input: string): string {
    if (prospect.projectDetails.type) {
      const service = this.serviceKB.findServicesByCategory(prospect.projectDetails.type as any)[0]
      if (service) {
        return `A ${prospect.projectDetails.type} project - that's exactly what I specialize in! I've helped many businesses like yours with ${service.name.toLowerCase()}. What specific challenges are you trying to solve with this project?`
      }
    }
    
    return "That sounds like an interesting project! I'd love to understand more about what you're trying to accomplish. What's the main challenge or opportunity that's driving this project?"
  }

  private generateDiscoveryMessage(prospect: ProspectProfile, input: string): string {
    const businessType = prospect.businessProfile.type || 'business'
    return `I can see this is important for your ${businessType}. To make sure I understand your needs completely, could you tell me more about your current situation and what success would look like for this project?`
  }

  private generateQualificationMessage(prospect: ProspectProfile, input: string): string {
    if (!prospect.projectDetails.budget) {
      return "To ensure I can provide the best solution for your needs, could you share what budget range you're working with for this project? This helps me recommend the most appropriate approach."
    }
    
    if (!prospect.qualification.validationData?.decisionMaker) {
      return "That budget range works well for what you're describing. Are you the person who would make the final decision on this project, or are there others involved in the decision-making process?"
    }
    
    return "Perfect! Based on everything you've shared, I can see this is a well-planned project with clear objectives. Let me put together some specific recommendations for you."
  }

  private generateProposalMessage(prospect: ProspectProfile, input: string): string {
    if (prospect.projectDetails.type && !prospect.serviceInterest.proposalGenerated) {
      const service = this.serviceKB.getServiceDetails(prospect.projectDetails.type)
      if (service) {
        prospect.serviceInterest.proposalGenerated = true
        return this.serviceKB.generateServiceProposal(service.id, prospect.businessProfile)
      }
    }
    
    return "Based on your requirements, I believe I can create an excellent solution for you. Does the approach I've outlined address your main concerns and objectives?"
  }

  private generateCommitmentMessage(prospect: ProspectProfile, input: string): string {
    return "I'm excited about the possibility of working together on this project! It sounds like a perfect fit for my expertise. Are you ready to move forward, and what would be the best way for me to get in touch with you directly?"
  }

  private generateHandoffMessage(prospect: ProspectProfile, input: string): string {
    return "Excellent! I have all the information I need. David will be in touch with you within the next few hours to discuss the project details and next steps. Thank you for taking the time to share your requirements - this is going to be a great project!"
  }

  private getNextQuestions(prospect: ProspectProfile, stage: FunnelStage): string[] {
    // Return contextual follow-up questions based on missing information
    const questions: string[] = []
    
    if (!prospect.contactInfo.name) questions.push("What's your name?")
    if (!prospect.contactInfo.company && prospect.businessProfile.type !== 'individual') {
      questions.push("What's your company name?")
    }
    if (!prospect.projectDetails.timeline) questions.push("What's your ideal timeline?")
    
    return questions.slice(0, 2) // Limit to 2 questions to avoid overwhelming
  }

  private getRecommendedActions(prospect: ProspectProfile, stage: FunnelStage): string[] {
    const actions: string[] = []
    
    if (stage.id === 'proposal') actions.push('Generate detailed proposal')
    if (stage.id === 'commitment') actions.push('Prepare contract and next steps')
    if (stage.id === 'handoff') actions.push('Notify David for immediate contact')
    
    return actions
  }

  private shouldTriggerNotification(prospect: ProspectProfile, stage: FunnelStage): boolean {
    return stage.id === 'handoff' || 
           (stage.id === 'commitment' && prospect.contactInfo.email && prospect.projectDetails.budget)
  }

  private updateProspectProfile(prospect: ProspectProfile, response: FunnelResponse): void {
    if (response.shouldAdvance && response.nextStage !== prospect.currentStage) {
      prospect.stageHistory.push(prospect.currentStage)
      prospect.currentStage = response.nextStage
    }
    
    // Update qualification score
    prospect.qualification.score = this.calculateOverallScore(prospect)
    
    // Run validation if in qualification stage or later
    if (['qualification', 'proposal', 'commitment', 'handoff'].includes(prospect.currentStage)) {
      this.runClientValidation(prospect)
    }
  }

  private calculateOverallScore(prospect: ProspectProfile): number {
    let score = 0
    
    // Engagement score (0-25)
    score += Math.min(prospect.engagement.interactionCount * 3, 25)
    
    // Information completeness (0-25)
    if (prospect.projectDetails.type) score += 5
    if (prospect.projectDetails.budget) score += 10
    if (prospect.projectDetails.timeline) score += 5
    if (prospect.contactInfo.email) score += 5
    
    // Business qualification (0-25)
    if (prospect.businessProfile.type !== 'individual') score += 10
    if (prospect.businessProfile.challenges.length > 0) score += 10
    if (prospect.businessProfile.goals.length > 0) score += 5
    
    // Commitment indicators (0-25)
    if (prospect.projectDetails.urgency === 'high' || prospect.projectDetails.urgency === 'critical') score += 10
    if (prospect.engagement.responseQuality > 70) score += 10
    if (prospect.engagement.questionDepth > 60) score += 5
    
    return Math.min(score, 100)
  }

  private runClientValidation(prospect: ProspectProfile): void {
    // Extract validation data from prospect profile
    const validationData = this.validationEngine.extractValidationData(
      [], // Would pass conversation history
      prospect
    )
    
    prospect.qualification.validationData = validationData
    prospect.qualification.validationResult = this.validationEngine.validateClient(validationData)
    prospect.qualification.readyForHandoff = prospect.qualification.validationResult.readyForHandoff
  }

  // Helper methods for response quality assessment
  private assessResponseQuality(input: string): number {
    let quality = 50 // Base quality
    
    if (input.length > 50) quality += 20
    if (input.includes('$') || input.includes('budget')) quality += 15
    if (input.includes('?')) quality += 10
    if (input.split(' ').length > 10) quality += 15
    
    return Math.min(quality, 100)
  }

  private assessQuestionDepth(input: string): number {
    let depth = 30 // Base depth
    
    const deepQuestionWords = ['how', 'why', 'what if', 'process', 'approach', 'experience']
    deepQuestionWords.forEach(word => {
      if (input.toLowerCase().includes(word)) depth += 15
    })
    
    return Math.min(depth, 100)
  }

  // Public method to create new prospect
  public createNewProspect(sessionId: string): ProspectProfile {
    return {
      sessionId,
      currentStage: 'awareness',
      stageHistory: [],
      contactInfo: {},
      businessProfile: {
        type: 'smb',
        industry: '',
        size: '',
        stage: 'established',
        challenges: [],
        goals: []
      },
      projectDetails: {
        urgency: 'medium',
        requirements: [],
        constraints: []
      },
      engagement: {
        conversationLength: 0,
        responseQuality: 50,
        questionDepth: 30,
        interactionCount: 0,
        timeSpent: 0,
        lastActivity: new Date()
      },
      qualification: {
        score: 0,
        readyForHandoff: false,
        disqualificationReasons: []
      },
      serviceInterest: {
        secondaryServices: [],
        customRequirements: [],
        proposalGenerated: false
      }
    }
  }
}
