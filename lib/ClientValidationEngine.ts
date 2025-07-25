// Advanced Client Validation Engine for Financial Commitment and Readiness Assessment
export interface ClientValidationData {
  // Financial Assessment
  budgetRange: string
  budgetConfirmed: boolean
  paymentCapability: 'verified' | 'likely' | 'uncertain' | 'unlikely'
  budgetSource: 'allocated' | 'approved' | 'pending' | 'unknown'
  paymentTermsAcceptance: boolean
  
  // Decision Making Authority
  decisionMaker: boolean
  decisionMakingProcess: 'individual' | 'committee' | 'board' | 'unknown'
  approvalRequired: boolean
  approvalTimeframe: string
  
  // Project Readiness
  projectUrgency: 'immediate' | 'urgent' | 'planned' | 'exploratory'
  timelineRealistic: boolean
  requirementsClear: boolean
  stakeholdersAligned: boolean
  
  // Business Validation
  businessType: 'startup' | 'smb' | 'enterprise' | 'individual' | 'nonprofit'
  businessStage: 'idea' | 'mvp' | 'growth' | 'established' | 'mature'
  previousProjectExperience: boolean
  referenceSource: string
  
  // Commitment Indicators
  engagementLevel: number // 0-100
  responseQuality: number // 0-100
  questionDepth: number // 0-100
  followThroughLikelihood: number // 0-100
}

export interface ValidationResult {
  isValidatedClient: boolean
  validationScore: number // 0-100
  confidenceLevel: 'high' | 'medium' | 'low'
  readyForHandoff: boolean
  recommendedAction: 'immediate_contact' | 'schedule_call' | 'send_proposal' | 'nurture_lead' | 'disqualify'
  validationSummary: string
  riskFactors: string[]
  strengths: string[]
  nextSteps: string[]
}

export class ClientValidationEngine {
  private validationCriteria = {
    // Minimum scores for validation
    minimumBudgetScore: 60,
    minimumAuthorityScore: 70,
    minimumReadinessScore: 65,
    minimumCommitmentScore: 75,
    
    // Weights for overall score calculation
    budgetWeight: 0.3,
    authorityWeight: 0.25,
    readinessWeight: 0.25,
    commitmentWeight: 0.2
  }

  public validateClient(data: ClientValidationData): ValidationResult {
    const budgetScore = this.assessBudgetReadiness(data)
    const authorityScore = this.assessDecisionAuthority(data)
    const readinessScore = this.assessProjectReadiness(data)
    const commitmentScore = this.assessCommitmentLevel(data)
    
    const overallScore = this.calculateOverallScore(budgetScore, authorityScore, readinessScore, commitmentScore)
    
    const isValidated = this.determineValidationStatus(budgetScore, authorityScore, readinessScore, commitmentScore)
    const confidenceLevel = this.determineConfidenceLevel(overallScore, data)
    const recommendedAction = this.determineRecommendedAction(overallScore, isValidated, data)
    
    return {
      isValidatedClient: isValidated,
      validationScore: overallScore,
      confidenceLevel,
      readyForHandoff: isValidated && overallScore >= 80,
      recommendedAction,
      validationSummary: this.generateValidationSummary(data, overallScore, isValidated),
      riskFactors: this.identifyRiskFactors(data),
      strengths: this.identifyStrengths(data),
      nextSteps: this.generateNextSteps(recommendedAction, data)
    }
  }

  private assessBudgetReadiness(data: ClientValidationData): number {
    let score = 0
    
    // Budget range assessment
    const budgetRanges = {
      'under-5k': 20,
      '5k-15k': 40,
      '15k-30k': 60,
      '30k-50k': 80,
      '50k-100k': 90,
      '100k+': 100
    }
    score += budgetRanges[data.budgetRange as keyof typeof budgetRanges] || 0
    
    // Budget confirmation
    if (data.budgetConfirmed) score += 20
    
    // Payment capability
    const capabilityScores = { verified: 30, likely: 20, uncertain: 10, unlikely: 0 }
    score += capabilityScores[data.paymentCapability]
    
    // Budget source
    const sourceScores = { allocated: 20, approved: 15, pending: 10, unknown: 0 }
    score += sourceScores[data.budgetSource]
    
    // Payment terms acceptance
    if (data.paymentTermsAcceptance) score += 10
    
    return Math.min(score, 100)
  }

  private assessDecisionAuthority(data: ClientValidationData): number {
    let score = 0
    
    // Decision maker status
    if (data.decisionMaker) {
      score += 50
    } else {
      score += 20 // Still valuable if they have influence
    }
    
    // Decision making process
    const processScores = { individual: 30, committee: 20, board: 10, unknown: 0 }
    score += processScores[data.decisionMakingProcess]
    
    // Approval requirements
    if (!data.approvalRequired) {
      score += 20
    } else {
      // Assess approval timeframe
      if (data.approvalTimeframe.includes('immediate') || data.approvalTimeframe.includes('week')) {
        score += 15
      } else if (data.approvalTimeframe.includes('month')) {
        score += 10
      } else {
        score += 5
      }
    }
    
    return Math.min(score, 100)
  }

  private assessProjectReadiness(data: ClientValidationData): number {
    let score = 0
    
    // Project urgency
    const urgencyScores = { immediate: 30, urgent: 25, planned: 20, exploratory: 10 }
    score += urgencyScores[data.projectUrgency]
    
    // Timeline realism
    if (data.timelineRealistic) score += 25
    
    // Requirements clarity
    if (data.requirementsClear) score += 25
    
    // Stakeholder alignment
    if (data.stakeholdersAligned) score += 20
    
    return Math.min(score, 100)
  }

  private assessCommitmentLevel(data: ClientValidationData): number {
    let score = 0
    
    // Engagement metrics
    score += data.engagementLevel * 0.3
    score += data.responseQuality * 0.3
    score += data.questionDepth * 0.2
    score += data.followThroughLikelihood * 0.2
    
    // Business validation factors
    if (data.previousProjectExperience) score += 10
    if (data.referenceSource && data.referenceSource !== 'unknown') score += 5
    
    return Math.min(score, 100)
  }

  private calculateOverallScore(budget: number, authority: number, readiness: number, commitment: number): number {
    const { budgetWeight, authorityWeight, readinessWeight, commitmentWeight } = this.validationCriteria
    
    return Math.round(
      budget * budgetWeight +
      authority * authorityWeight +
      readiness * readinessWeight +
      commitment * commitmentWeight
    )
  }

  private determineValidationStatus(budget: number, authority: number, readiness: number, commitment: number): boolean {
    const { minimumBudgetScore, minimumAuthorityScore, minimumReadinessScore, minimumCommitmentScore } = this.validationCriteria
    
    return budget >= minimumBudgetScore &&
           authority >= minimumAuthorityScore &&
           readiness >= minimumReadinessScore &&
           commitment >= minimumCommitmentScore
  }

  private determineConfidenceLevel(score: number, data: ClientValidationData): 'high' | 'medium' | 'low' {
    if (score >= 85 && data.budgetConfirmed && data.decisionMaker) return 'high'
    if (score >= 70) return 'medium'
    return 'low'
  }

  private determineRecommendedAction(score: number, isValidated: boolean, data: ClientValidationData): ValidationResult['recommendedAction'] {
    if (!isValidated) {
      if (score >= 60) return 'nurture_lead'
      return 'disqualify'
    }
    
    if (score >= 90 && data.projectUrgency === 'immediate') return 'immediate_contact'
    if (score >= 80) return 'schedule_call'
    if (score >= 70) return 'send_proposal'
    return 'nurture_lead'
  }

  private generateValidationSummary(data: ClientValidationData, score: number, isValidated: boolean): string {
    const status = isValidated ? 'VALIDATED CLIENT' : 'UNQUALIFIED LEAD'
    const confidence = score >= 85 ? 'HIGH' : score >= 70 ? 'MEDIUM' : 'LOW'
    
    return `${status} (Score: ${score}/100, Confidence: ${confidence}) - ${data.businessType.toUpperCase()} with ${data.budgetRange} budget, ${data.decisionMaker ? 'DECISION MAKER' : 'INFLUENCER'}, ${data.projectUrgency.toUpperCase()} urgency`
  }

  private identifyRiskFactors(data: ClientValidationData): string[] {
    const risks: string[] = []
    
    if (!data.budgetConfirmed) risks.push('Budget not confirmed')
    if (!data.decisionMaker) risks.push('Not the decision maker')
    if (data.approvalRequired) risks.push('Requires additional approval')
    if (!data.timelineRealistic) risks.push('Unrealistic timeline expectations')
    if (!data.requirementsClear) risks.push('Unclear project requirements')
    if (data.paymentCapability === 'uncertain' || data.paymentCapability === 'unlikely') risks.push('Payment capability concerns')
    if (data.projectUrgency === 'exploratory') risks.push('Still in exploration phase')
    
    return risks
  }

  private identifyStrengths(data: ClientValidationData): string[] {
    const strengths: string[] = []
    
    if (data.budgetConfirmed) strengths.push('Budget confirmed and allocated')
    if (data.decisionMaker) strengths.push('Direct decision making authority')
    if (data.paymentCapability === 'verified') strengths.push('Verified payment capability')
    if (data.projectUrgency === 'immediate' || data.projectUrgency === 'urgent') strengths.push('High project urgency')
    if (data.requirementsClear) strengths.push('Clear project requirements')
    if (data.stakeholdersAligned) strengths.push('Stakeholder alignment achieved')
    if (data.previousProjectExperience) strengths.push('Previous project experience')
    if (data.engagementLevel >= 80) strengths.push('High engagement level')
    
    return strengths
  }

  private generateNextSteps(action: ValidationResult['recommendedAction'], data: ClientValidationData): string[] {
    const steps: string[] = []
    
    switch (action) {
      case 'immediate_contact':
        steps.push('Contact client within 1 hour')
        steps.push('Prepare detailed proposal')
        steps.push('Schedule project kickoff meeting')
        break
        
      case 'schedule_call':
        steps.push('Send calendar link for consultation call')
        steps.push('Prepare project discovery questions')
        steps.push('Review similar case studies')
        break
        
      case 'send_proposal':
        steps.push('Create customized project proposal')
        steps.push('Include detailed timeline and pricing')
        steps.push('Schedule follow-up call in 3-5 days')
        break
        
      case 'nurture_lead':
        steps.push('Add to nurture email sequence')
        steps.push('Send relevant case studies')
        steps.push('Follow up in 1-2 weeks')
        break
        
      case 'disqualify':
        steps.push('Send polite decline message')
        steps.push('Offer alternative resources')
        steps.push('Keep in database for future opportunities')
        break
    }
    
    return steps
  }

  // Method to extract validation data from conversation
  public extractValidationData(conversationHistory: string[], extractedInfo: any): ClientValidationData {
    // This would analyze the conversation to extract validation data
    // Implementation would use NLP and pattern matching
    return {
      budgetRange: extractedInfo.budget || 'unknown',
      budgetConfirmed: this.detectBudgetConfirmation(conversationHistory),
      paymentCapability: this.assessPaymentCapability(conversationHistory, extractedInfo),
      budgetSource: this.detectBudgetSource(conversationHistory),
      paymentTermsAcceptance: this.detectPaymentTermsAcceptance(conversationHistory),
      
      decisionMaker: this.detectDecisionMaker(conversationHistory),
      decisionMakingProcess: this.detectDecisionProcess(conversationHistory),
      approvalRequired: this.detectApprovalRequirement(conversationHistory),
      approvalTimeframe: this.extractApprovalTimeframe(conversationHistory),
      
      projectUrgency: this.detectProjectUrgency(conversationHistory),
      timelineRealistic: this.assessTimelineRealism(conversationHistory, extractedInfo),
      requirementsClear: this.assessRequirementsClarity(conversationHistory),
      stakeholdersAligned: this.detectStakeholderAlignment(conversationHistory),
      
      businessType: this.detectBusinessType(conversationHistory),
      businessStage: this.detectBusinessStage(conversationHistory),
      previousProjectExperience: this.detectPreviousExperience(conversationHistory),
      referenceSource: this.detectReferenceSource(conversationHistory),
      
      engagementLevel: this.calculateEngagementLevel(conversationHistory),
      responseQuality: this.assessResponseQuality(conversationHistory),
      questionDepth: this.assessQuestionDepth(conversationHistory),
      followThroughLikelihood: this.assessFollowThroughLikelihood(conversationHistory, extractedInfo)
    }
  }

  // Helper methods for conversation analysis
  private detectBudgetConfirmation(history: string[]): boolean {
    const confirmationPhrases = ['confirmed', 'allocated', 'approved', 'set aside', 'budgeted for']
    return history.some(msg => confirmationPhrases.some(phrase => msg.toLowerCase().includes(phrase)))
  }

  private assessPaymentCapability(history: string[], info: any): ClientValidationData['paymentCapability'] {
    // Analyze business indicators, budget size, and conversation tone
    if (info.businessType === 'enterprise' || info.budget?.includes('100k+')) return 'verified'
    if (info.budget?.includes('50k') || info.businessType === 'established') return 'likely'
    if (info.budget?.includes('under') || info.businessStage === 'startup') return 'uncertain'
    return 'likely'
  }

  private detectDecisionMaker(history: string[]): boolean {
    const decisionPhrases = ['i decide', 'my decision', 'i approve', 'i can sign', 'my company', 'i own']
    return history.some(msg => decisionPhrases.some(phrase => msg.toLowerCase().includes(phrase)))
  }

  private detectProjectUrgency(history: string[]): ClientValidationData['projectUrgency'] {
    const urgencyKeywords = {
      immediate: ['asap', 'immediately', 'urgent', 'rush', 'emergency'],
      urgent: ['soon', 'quickly', 'fast', 'priority'],
      planned: ['planning', 'scheduled', 'timeline', 'roadmap'],
      exploratory: ['exploring', 'considering', 'thinking about', 'maybe']
    }
    
    for (const [level, keywords] of Object.entries(urgencyKeywords)) {
      if (history.some(msg => keywords.some(keyword => msg.toLowerCase().includes(keyword)))) {
        return level as ClientValidationData['projectUrgency']
      }
    }
    
    return 'planned'
  }

  private calculateEngagementLevel(history: string[]): number {
    // Calculate based on message length, questions asked, detail provided
    const avgMessageLength = history.reduce((sum, msg) => sum + msg.length, 0) / history.length
    const questionCount = history.filter(msg => msg.includes('?')).length
    const detailLevel = history.filter(msg => msg.length > 50).length
    
    return Math.min(Math.round((avgMessageLength / 10) + (questionCount * 10) + (detailLevel * 5)), 100)
  }

  private assessResponseQuality(history: string[]): number {
    // Assess completeness, specificity, and thoughtfulness of responses
    const specificAnswers = history.filter(msg => 
      msg.includes('$') || msg.includes('month') || msg.includes('week') || 
      msg.includes('need') || msg.includes('want') || msg.includes('require')
    ).length
    
    return Math.min(specificAnswers * 15, 100)
  }

  private assessQuestionDepth(history: string[]): number {
    // Assess the depth and quality of questions asked by the prospect
    const deepQuestions = history.filter(msg => 
      msg.includes('how') || msg.includes('why') || msg.includes('what if') ||
      msg.includes('process') || msg.includes('experience') || msg.includes('approach')
    ).length
    
    return Math.min(deepQuestions * 20, 100)
  }

  private assessFollowThroughLikelihood(history: string[], info: any): number {
    // Assess likelihood of following through based on conversation patterns
    let score = 50 // Base score
    
    if (info.contactInfo?.email) score += 20
    if (info.contactInfo?.phone) score += 15
    if (info.timeline && !info.timeline.includes('flexible')) score += 10
    if (history.some(msg => msg.includes('next step'))) score += 15
    
    return Math.min(score, 100)
  }

  // Additional helper methods would be implemented for other detection functions
  private detectBudgetSource(history: string[]): ClientValidationData['budgetSource'] { return 'unknown' }
  private detectPaymentTermsAcceptance(history: string[]): boolean { return false }
  private detectDecisionProcess(history: string[]): ClientValidationData['decisionMakingProcess'] { return 'unknown' }
  private detectApprovalRequirement(history: string[]): boolean { return false }
  private extractApprovalTimeframe(history: string[]): string { return 'unknown' }
  private assessTimelineRealism(history: string[], info: any): boolean { return true }
  private assessRequirementsClarity(history: string[]): boolean { return true }
  private detectStakeholderAlignment(history: string[]): boolean { return true }
  private detectBusinessType(history: string[]): ClientValidationData['businessType'] { return 'smb' }
  private detectBusinessStage(history: string[]): ClientValidationData['businessStage'] { return 'established' }
  private detectPreviousExperience(history: string[]): boolean { return false }
  private detectReferenceSource(history: string[]): string { return 'unknown' }
}
