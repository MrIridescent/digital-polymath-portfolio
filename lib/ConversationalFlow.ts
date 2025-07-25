// Enhanced Conversational Flow for Natural Lead Qualification
export interface ConversationContext {
  stage: string
  userInput: string
  conversationHistory: string[]
  extractedInfo: {
    projectType?: string
    budget?: string
    timeline?: string
    contactInfo?: any
    urgency?: string
    features?: string[]
  }
  score: number
}

export interface ConversationResponse {
  message: string
  nextStage: string
  extractedData?: any
  shouldNotify: boolean
  confidence: number
  followUpQuestions?: string[]
}

export class ConversationalFlow {
  private projectTypes = [
    'website', 'web app', 'mobile app', 'e-commerce', 'ai solution', 'automation',
    'dashboard', 'api', 'integration', 'redesign', 'optimization', 'security',
    'fintech', 'saas', 'marketplace', 'portfolio', 'blog', 'cms'
  ]

  private budgetRanges = [
    'under 5k', '5k-15k', '15k-30k', '30k-50k', '50k+', 'enterprise'
  ]

  private timelineKeywords = [
    'asap', 'urgent', 'rush', 'immediately', 'week', 'month', 'quarter',
    'flexible', 'no rush', 'when possible'
  ]

  public processConversation(context: ConversationContext): ConversationResponse {
    const input = context.userInput.toLowerCase()
    
    // Analyze what the user is saying
    const analysis = this.analyzeUserInput(input, context)
    
    // Determine appropriate response based on stage and analysis
    const response = this.generateResponse(analysis, context)
    
    return response
  }

  private analyzeUserInput(input: string, context: ConversationContext) {
    return {
      projectType: this.extractProjectType(input),
      budget: this.extractBudget(input),
      timeline: this.extractTimeline(input),
      urgency: this.extractUrgency(input),
      features: this.extractFeatures(input),
      intent: this.determineIntent(input),
      sentiment: this.analyzeSentiment(input),
      contactInfo: this.extractContactInfo(input),
      readyToMove: this.isReadyToMove(input)
    }
  }

  private generateResponse(analysis: any, context: ConversationContext): ConversationResponse {
    const { stage, extractedInfo, score } = context
    
    // Update extracted info with new analysis
    const updatedInfo = { ...extractedInfo, ...analysis }
    
    // Calculate new score
    const newScore = this.calculateLeadScore(updatedInfo, context.conversationHistory)
    
    // Determine response based on stage and analysis
    switch (stage) {
      case 'greeting':
        return this.handleGreetingStage(analysis, context)
      
      case 'discovery':
        return this.handleDiscoveryStage(analysis, context, updatedInfo)
      
      case 'qualification':
        return this.handleQualificationStage(analysis, context, updatedInfo)
      
      case 'analysis':
        return this.handleAnalysisStage(analysis, context, updatedInfo)
      
      default:
        return this.handleDefaultResponse(analysis, context)
    }
  }

  private handleGreetingStage(analysis: any, context: ConversationContext): ConversationResponse {
    if (analysis.intent === 'project_inquiry') {
      return {
        message: `That sounds exciting! ${this.getProjectTypeResponse(analysis.projectType)} I'd love to learn more about what you have in mind. Could you tell me a bit about the main goal you're trying to achieve?`,
        nextStage: 'discovery',
        extractedData: analysis,
        shouldNotify: false,
        confidence: 0.7
      }
    }
    
    if (analysis.intent === 'about_david') {
      return {
        message: `Great question! David is a Digital Polymath with 20+ years of coding experience. He's currently a Full Stack Engineer at Zandbox and has Cisco cybersecurity certifications. He's built 100+ applications with 99.9% uptime. What specifically interests you about his background?`,
        nextStage: 'discovery',
        extractedData: analysis,
        shouldNotify: false,
        confidence: 0.6
      }
    }

    return {
      message: `I'm curious to learn more! Are you thinking about starting a new project, or would you like to know more about David's experience and approach?`,
      nextStage: 'discovery',
      extractedData: analysis,
      shouldNotify: false,
      confidence: 0.5
    }
  }

  private handleDiscoveryStage(analysis: any, context: ConversationContext, updatedInfo: any): ConversationResponse {
    const missingInfo = this.identifyMissingInfo(updatedInfo)
    
    if (missingInfo.length === 0) {
      return {
        message: `Perfect! I have a good understanding now. Based on what you've shared - a ${updatedInfo.projectType} with a ${updatedInfo.budget} budget and ${updatedInfo.timeline} timeline - this sounds like a great fit for David's expertise. Are you the decision-maker for this project?`,
        nextStage: 'qualification',
        extractedData: updatedInfo,
        shouldNotify: false,
        confidence: 0.8
      }
    }

    // Ask for the most important missing information
    const nextQuestion = this.getNextQuestion(missingInfo[0], updatedInfo)
    
    return {
      message: nextQuestion,
      nextStage: 'discovery',
      extractedData: updatedInfo,
      shouldNotify: false,
      confidence: 0.6
    }
  }

  private handleQualificationStage(analysis: any, context: ConversationContext, updatedInfo: any): ConversationResponse {
    const score = this.calculateLeadScore(updatedInfo, context.conversationHistory)
    
    if (score >= 70 && analysis.readyToMove) {
      return {
        message: `Excellent! This sounds like a perfect project for David. I'm going to connect you with him directly so you can discuss the details and next steps. He'll reach out to you shortly. In the meantime, could you share your contact information so he can get in touch?`,
        nextStage: 'conversion',
        extractedData: updatedInfo,
        shouldNotify: true,
        confidence: 0.9
      }
    }

    if (score >= 50) {
      return {
        message: `This is definitely something David can help with! Based on your requirements, I'd estimate this project would take about ${this.estimateTimeline(updatedInfo)} and fall in the ${this.estimateBudget(updatedInfo)} range. Does that align with your expectations?`,
        nextStage: 'analysis',
        extractedData: updatedInfo,
        shouldNotify: false,
        confidence: 0.7
      }
    }

    return {
      message: `I want to make sure this is a good fit for both of you. Could you tell me more about ${this.getQualificationQuestion(updatedInfo)}?`,
      nextStage: 'qualification',
      extractedData: updatedInfo,
      shouldNotify: false,
      confidence: 0.6
    }
  }

  private handleAnalysisStage(analysis: any, context: ConversationContext, updatedInfo: any): ConversationResponse {
    if (analysis.readyToMove || analysis.intent === 'ready_to_proceed') {
      return {
        message: `Perfect! I can see you're ready to move forward. Let me get David involved in this conversation. He'll be able to provide you with a detailed proposal and discuss the technical approach. What's the best way for him to reach you?`,
        nextStage: 'conversion',
        extractedData: updatedInfo,
        shouldNotify: true,
        confidence: 0.9
      }
    }

    return {
      message: `Based on everything we've discussed, this sounds like an excellent project for David's expertise. He's worked on similar ${updatedInfo.projectType} projects and has a proven track record. Would you like to schedule a consultation to discuss the technical details?`,
      nextStage: 'conversion',
      extractedData: updatedInfo,
      shouldNotify: false,
      confidence: 0.8
    }
  }

  private handleDefaultResponse(analysis: any, context: ConversationContext): ConversationResponse {
    return {
      message: `That's interesting! I want to make sure I understand what you're looking for. Could you tell me more about your project or what brought you here today?`,
      nextStage: 'discovery',
      extractedData: analysis,
      shouldNotify: false,
      confidence: 0.4
    }
  }

  // Helper methods for extraction and analysis
  private extractProjectType(input: string): string | undefined {
    for (const type of this.projectTypes) {
      if (input.includes(type)) {
        return type
      }
    }
    return undefined
  }

  private extractBudget(input: string): string | undefined {
    for (const range of this.budgetRanges) {
      if (input.includes(range.replace('-', ' to ')) || input.includes(range)) {
        return range
      }
    }
    
    // Look for specific numbers
    const budgetMatch = input.match(/\$?(\d+)k?/)
    if (budgetMatch) {
      const amount = parseInt(budgetMatch[1])
      if (amount < 5) return 'under 5k'
      if (amount <= 15) return '5k-15k'
      if (amount <= 30) return '15k-30k'
      if (amount <= 50) return '30k-50k'
      return '50k+'
    }
    
    return undefined
  }

  private extractTimeline(input: string): string | undefined {
    for (const keyword of this.timelineKeywords) {
      if (input.includes(keyword)) {
        return keyword
      }
    }
    return undefined
  }

  private extractUrgency(input: string): string {
    if (input.includes('urgent') || input.includes('asap') || input.includes('rush')) {
      return 'high'
    }
    if (input.includes('flexible') || input.includes('no rush')) {
      return 'low'
    }
    return 'medium'
  }

  private extractFeatures(input: string): string[] {
    const features = []
    const featureKeywords = [
      'login', 'payment', 'dashboard', 'admin', 'api', 'mobile', 'responsive',
      'search', 'chat', 'notifications', 'analytics', 'integration', 'security'
    ]
    
    for (const feature of featureKeywords) {
      if (input.includes(feature)) {
        features.push(feature)
      }
    }
    
    return features
  }

  private determineIntent(input: string): string {
    if (input.includes('project') || input.includes('build') || input.includes('need')) {
      return 'project_inquiry'
    }
    if (input.includes('about') || input.includes('experience') || input.includes('background')) {
      return 'about_david'
    }
    if (input.includes('ready') || input.includes('proceed') || input.includes('next step')) {
      return 'ready_to_proceed'
    }
    if (input.includes('price') || input.includes('cost') || input.includes('budget')) {
      return 'pricing_inquiry'
    }
    return 'general_inquiry'
  }

  private analyzeSentiment(input: string): string {
    const positive = ['great', 'excellent', 'perfect', 'love', 'amazing', 'awesome']
    const negative = ['bad', 'terrible', 'awful', 'hate', 'worst']
    
    for (const word of positive) {
      if (input.includes(word)) return 'positive'
    }
    for (const word of negative) {
      if (input.includes(word)) return 'negative'
    }
    return 'neutral'
  }

  private extractContactInfo(input: string): any {
    const emailMatch = input.match(/[\w.-]+@[\w.-]+\.\w+/)
    const phoneMatch = input.match(/[\+]?[\d\s\-\(\)]{10,}/)
    
    return {
      email: emailMatch ? emailMatch[0] : undefined,
      phone: phoneMatch ? phoneMatch[0] : undefined
    }
  }

  private isReadyToMove(input: string): boolean {
    const readyKeywords = [
      'ready', 'proceed', 'next step', 'let\'s do it', 'sounds good',
      'yes', 'absolutely', 'definitely', 'perfect', 'let\'s go'
    ]
    
    return readyKeywords.some(keyword => input.includes(keyword))
  }

  private calculateLeadScore(info: any, history: string[]): number {
    let score = 0
    
    // Project type clarity
    if (info.projectType) score += 20
    
    // Budget information
    if (info.budget) score += 25
    
    // Timeline information
    if (info.timeline) score += 15
    
    // Contact information
    if (info.contactInfo?.email) score += 20
    if (info.contactInfo?.phone) score += 10
    
    // Engagement level (based on conversation length)
    score += Math.min(history.length * 2, 10)
    
    return Math.min(score, 100)
  }

  private identifyMissingInfo(info: any): string[] {
    const missing = []
    
    if (!info.projectType) missing.push('projectType')
    if (!info.budget) missing.push('budget')
    if (!info.timeline) missing.push('timeline')
    
    return missing
  }

  private getNextQuestion(missingInfo: string, currentInfo: any): string {
    switch (missingInfo) {
      case 'projectType':
        return `That sounds interesting! What type of project are you thinking about? For example, a website, mobile app, e-commerce platform, or something else?`
      
      case 'budget':
        return `To help me understand the scope better, do you have a rough budget range in mind? This helps ensure we're aligned on what's possible.`
      
      case 'timeline':
        return `When are you hoping to have this completed? Are you working with any specific deadlines?`
      
      default:
        return `Could you tell me more about what you're envisioning?`
    }
  }

  private getProjectTypeResponse(projectType?: string): string {
    if (!projectType) return ''
    
    const responses = {
      'website': 'A website project - David has built tons of those!',
      'web app': 'A web application - that\'s right in David\'s wheelhouse!',
      'mobile app': 'A mobile app - David works with React Native and Flutter!',
      'ai solution': 'An AI solution - perfect! David specializes in AI engineering!',
      'e-commerce': 'An e-commerce platform - David has extensive experience with those!',
      'fintech': 'A fintech project - David currently works at Zandbox in fintech!'
    }
    
    return responses[projectType] || 'That sounds like a great project!'
  }

  private estimateTimeline(info: any): string {
    // Simple estimation logic based on project type and features
    if (info.projectType === 'website') return '2-4 weeks'
    if (info.projectType === 'web app') return '6-12 weeks'
    if (info.projectType === 'mobile app') return '8-16 weeks'
    return '4-8 weeks'
  }

  private estimateBudget(info: any): string {
    // Simple estimation logic
    if (info.projectType === 'website') return '$5K-15K'
    if (info.projectType === 'web app') return '$15K-30K'
    if (info.projectType === 'mobile app') return '$25K-50K'
    return '$10K-25K'
  }

  private getQualificationQuestion(info: any): string {
    if (!info.urgency) return 'your timeline and any deadlines you\'re working with'
    if (!info.features) return 'the key features you need in this project'
    return 'your specific requirements and goals'
  }
}
