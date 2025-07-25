// Client Handoff Protocol - Seamless Transition from Bot to Direct Communication
import { ClientHandoffPackage } from './PreProjectValidationSystem'
import { ValidationResult } from './ClientValidationEngine'
import { ProspectProfile } from './IntelligentFunnelManager'

export interface HandoffNotification {
  // Urgency and Priority
  priority: 'immediate' | 'high' | 'medium' | 'low'
  urgency: 'critical' | 'urgent' | 'normal' | 'low'
  
  // Client Information
  clientSummary: {
    name: string
    company?: string
    email: string
    phone?: string
    preferredContact: 'email' | 'phone' | 'either'
    timezone: string
    bestTimeToContact: string
  }
  
  // Project Overview
  projectOverview: {
    type: string
    scope: string
    budget: string
    timeline: string
    urgency: string
    keyRequirements: string[]
    successCriteria: string[]
  }
  
  // Validation Results
  validation: {
    overallScore: number
    confidenceLevel: string
    readinessLevel: string
    riskFactors: string[]
    strengths: string[]
    recommendedApproach: string
  }
  
  // Business Context
  businessContext: {
    businessType: string
    industry: string
    stage: string
    challenges: string[]
    goals: string[]
    competitiveFactors: string[]
  }
  
  // Conversation Insights
  conversationInsights: {
    engagementLevel: string
    keyQuotes: string[]
    concernsRaised: string[]
    opportunityAreas: string[]
    personalityProfile: string
    communicationStyle: string
  }
  
  // Recommended Actions
  recommendedActions: {
    immediateActions: string[]
    firstCallAgenda: string[]
    proposalElements: string[]
    followUpStrategy: string[]
  }
  
  // Technical Details
  technicalDetails: {
    preferredTechnologies: string[]
    integrationRequirements: string[]
    performanceRequirements: string[]
    securityRequirements: string[]
    complianceNeeds: string[]
  }
}

export interface HandoffResponse {
  success: boolean
  handoffId: string
  notificationsSent: string[]
  estimatedResponseTime: string
  nextSteps: string[]
  clientMessage: string
}

export class ClientHandoffProtocol {
  private handoffHistory: Map<string, HandoffNotification> = new Map()
  
  public initiateClientHandoff(
    prospect: ProspectProfile,
    validationResult: ValidationResult,
    handoffPackage: ClientHandoffPackage,
    conversationHistory: string[]
  ): HandoffResponse {
    
    // Generate comprehensive handoff notification
    const notification = this.generateHandoffNotification(
      prospect,
      validationResult,
      handoffPackage,
      conversationHistory
    )
    
    // Determine priority and urgency
    const { priority, urgency } = this.assessPriorityAndUrgency(prospect, validationResult)
    notification.priority = priority
    notification.urgency = urgency
    
    // Generate unique handoff ID
    const handoffId = this.generateHandoffId(prospect.sessionId)
    
    // Store handoff for tracking
    this.handoffHistory.set(handoffId, notification)
    
    // Send notifications through multiple channels
    const notificationsSent = this.sendHandoffNotifications(notification, handoffId)
    
    // Generate client response message
    const clientMessage = this.generateClientHandoffMessage(notification)
    
    // Determine estimated response time
    const estimatedResponseTime = this.calculateEstimatedResponseTime(priority, urgency)
    
    return {
      success: true,
      handoffId,
      notificationsSent,
      estimatedResponseTime,
      nextSteps: notification.recommendedActions.immediateActions,
      clientMessage
    }
  }

  private generateHandoffNotification(
    prospect: ProspectProfile,
    validationResult: ValidationResult,
    handoffPackage: ClientHandoffPackage,
    conversationHistory: string[]
  ): HandoffNotification {
    
    return {
      priority: 'high', // Will be set later
      urgency: 'urgent', // Will be set later
      
      clientSummary: {
        name: prospect.contactInfo.name || 'Prospect',
        company: prospect.contactInfo.company,
        email: prospect.contactInfo.email || '',
        phone: prospect.contactInfo.phone,
        preferredContact: prospect.contactInfo.phone ? 'either' : 'email',
        timezone: this.detectTimezone(conversationHistory),
        bestTimeToContact: this.detectBestContactTime(conversationHistory)
      },
      
      projectOverview: {
        type: prospect.projectDetails.type || 'Custom Development',
        scope: this.generateProjectScope(prospect),
        budget: prospect.projectDetails.budget || 'To be discussed',
        timeline: prospect.projectDetails.timeline || 'To be determined',
        urgency: prospect.projectDetails.urgency,
        keyRequirements: prospect.projectDetails.requirements,
        successCriteria: this.extractSuccessCriteria(conversationHistory)
      },
      
      validation: {
        overallScore: validationResult.validationScore,
        confidenceLevel: validationResult.confidenceLevel,
        readinessLevel: validationResult.isValidatedClient ? 'Ready for Project' : 'Needs Further Qualification',
        riskFactors: validationResult.riskFactors,
        strengths: validationResult.strengths,
        recommendedApproach: validationResult.recommendedAction
      },
      
      businessContext: {
        businessType: prospect.businessProfile.type,
        industry: prospect.businessProfile.industry || 'Not specified',
        stage: prospect.businessProfile.stage,
        challenges: prospect.businessProfile.challenges,
        goals: prospect.businessProfile.goals,
        competitiveFactors: this.extractCompetitiveFactors(conversationHistory)
      },
      
      conversationInsights: {
        engagementLevel: this.assessEngagementLevel(prospect.engagement.engagementLevel),
        keyQuotes: this.extractKeyQuotes(conversationHistory),
        concernsRaised: this.extractConcerns(conversationHistory),
        opportunityAreas: this.identifyOpportunities(conversationHistory),
        personalityProfile: this.assessPersonalityProfile(conversationHistory),
        communicationStyle: this.assessCommunicationStyle(conversationHistory)
      },
      
      recommendedActions: {
        immediateActions: this.generateImmediateActions(prospect, validationResult),
        firstCallAgenda: this.generateFirstCallAgenda(prospect),
        proposalElements: this.generateProposalElements(prospect),
        followUpStrategy: this.generateFollowUpStrategy(prospect, validationResult)
      },
      
      technicalDetails: {
        preferredTechnologies: this.extractTechnicalPreferences(conversationHistory),
        integrationRequirements: this.extractIntegrationNeeds(conversationHistory),
        performanceRequirements: this.extractPerformanceNeeds(conversationHistory),
        securityRequirements: this.extractSecurityNeeds(conversationHistory),
        complianceNeeds: this.extractComplianceNeeds(conversationHistory)
      }
    }
  }

  private assessPriorityAndUrgency(
    prospect: ProspectProfile,
    validationResult: ValidationResult
  ): { priority: HandoffNotification['priority'], urgency: HandoffNotification['urgency'] } {
    
    let priority: HandoffNotification['priority'] = 'medium'
    let urgency: HandoffNotification['urgency'] = 'normal'
    
    // Assess priority based on validation score and project value
    if (validationResult.validationScore >= 90) priority = 'immediate'
    else if (validationResult.validationScore >= 80) priority = 'high'
    else if (validationResult.validationScore >= 70) priority = 'medium'
    else priority = 'low'
    
    // Assess urgency based on project urgency and timeline
    if (prospect.projectDetails.urgency === 'critical') urgency = 'critical'
    else if (prospect.projectDetails.urgency === 'high') urgency = 'urgent'
    else if (prospect.projectDetails.urgency === 'medium') urgency = 'normal'
    else urgency = 'low'
    
    // Boost priority for high-value projects
    if (prospect.projectDetails.budget?.includes('50k+') || prospect.projectDetails.budget?.includes('100k+')) {
      priority = priority === 'low' ? 'medium' : priority === 'medium' ? 'high' : 'immediate'
    }
    
    return { priority, urgency }
  }

  private sendHandoffNotifications(notification: HandoffNotification, handoffId: string): string[] {
    const notificationsSent: string[] = []
    
    // Generate notification content
    const notificationContent = this.formatNotificationContent(notification, handoffId)
    
    // Send via multiple channels based on priority
    if (notification.priority === 'immediate' || notification.urgency === 'critical') {
      // Send immediate notifications
      this.sendSMSNotification(notificationContent)
      this.sendEmailNotification(notificationContent)
      this.sendSlackNotification(notificationContent)
      notificationsSent.push('SMS', 'Email', 'Slack')
    } else if (notification.priority === 'high') {
      // Send high priority notifications
      this.sendEmailNotification(notificationContent)
      this.sendSlackNotification(notificationContent)
      notificationsSent.push('Email', 'Slack')
    } else {
      // Send standard notifications
      this.sendEmailNotification(notificationContent)
      notificationsSent.push('Email')
    }
    
    // Log notification for tracking
    console.log(`🚀 CLIENT HANDOFF INITIATED - ${handoffId}`, {
      priority: notification.priority,
      urgency: notification.urgency,
      client: notification.clientSummary.name,
      project: notification.projectOverview.type,
      score: notification.validation.overallScore
    })
    
    return notificationsSent
  }

  private formatNotificationContent(notification: HandoffNotification, handoffId: string): string {
    return `
🚀 **VALIDATED CLIENT READY FOR HANDOFF** - ${handoffId}

**CLIENT:** ${notification.clientSummary.name} ${notification.clientSummary.company ? `(${notification.clientSummary.company})` : ''}
**CONTACT:** ${notification.clientSummary.email} ${notification.clientSummary.phone ? `| ${notification.clientSummary.phone}` : ''}
**PRIORITY:** ${notification.priority.toUpperCase()} | **URGENCY:** ${notification.urgency.toUpperCase()}

**PROJECT OVERVIEW:**
• Type: ${notification.projectOverview.type}
• Budget: ${notification.projectOverview.budget}
• Timeline: ${notification.projectOverview.timeline}
• Urgency: ${notification.projectOverview.urgency}

**VALIDATION RESULTS:**
• Overall Score: ${notification.validation.overallScore}/100
• Confidence: ${notification.validation.confidenceLevel}
• Readiness: ${notification.validation.readinessLevel}

**KEY STRENGTHS:**
${notification.validation.strengths.map(s => `• ${s}`).join('\n')}

**IMMEDIATE ACTIONS:**
${notification.recommendedActions.immediateActions.map(a => `• ${a}`).join('\n')}

**BEST TIME TO CONTACT:** ${notification.clientSummary.bestTimeToContact}
**PREFERRED METHOD:** ${notification.clientSummary.preferredContact}

**CONVERSATION INSIGHTS:**
• Engagement: ${notification.conversationInsights.engagementLevel}
• Communication Style: ${notification.conversationInsights.communicationStyle}
• Key Concerns: ${notification.conversationInsights.concernsRaised.join(', ')}

View full handoff package: [Dashboard Link]
    `.trim()
  }

  private generateClientHandoffMessage(notification: HandoffNotification): string {
    const responseTime = this.calculateEstimatedResponseTime(notification.priority, notification.urgency)
    
    return `Perfect! I have all the information I need about your ${notification.projectOverview.type} project. 

Based on our conversation, this looks like an excellent fit for David's expertise. Here's what happens next:

✅ **Your project details have been compiled** and sent directly to David
✅ **Priority level:** ${notification.priority} (based on your requirements and timeline)
✅ **Expected response time:** ${responseTime}

David will reach out to you ${notification.clientSummary.preferredContact === 'phone' ? 'by phone' : 'via email'} to:
• Discuss your project in detail
• Answer any technical questions
• Provide a detailed proposal and timeline
• Schedule a project kickoff if you're ready to proceed

**Your project summary:**
• ${notification.projectOverview.type} with ${notification.projectOverview.budget} budget
• ${notification.projectOverview.timeline} timeline
• Key focus: ${notification.projectOverview.keyRequirements.slice(0, 2).join(' and ')}

Thank you for taking the time to share your requirements. David is excited about the possibility of working with you on this project!

*If you have any urgent questions before David contacts you, feel free to reach out directly at mriridescent@yahoo.com*`
  }

  private calculateEstimatedResponseTime(
    priority: HandoffNotification['priority'],
    urgency: HandoffNotification['urgency']
  ): string {
    if (priority === 'immediate' || urgency === 'critical') return 'within 1 hour'
    if (priority === 'high' || urgency === 'urgent') return 'within 2-4 hours'
    if (priority === 'medium') return 'within 24 hours'
    return 'within 48 hours'
  }

  // Helper methods for extracting insights from conversation
  private generateProjectScope(prospect: ProspectProfile): string {
    const type = prospect.projectDetails.type || 'custom development'
    const requirements = prospect.projectDetails.requirements.slice(0, 3).join(', ')
    return `${type} project${requirements ? ` including ${requirements}` : ''}`
  }

  private extractSuccessCriteria(history: string[]): string[] {
    const criteria: string[] = []
    
    history.forEach(msg => {
      if (msg.toLowerCase().includes('success') || msg.toLowerCase().includes('goal')) {
        criteria.push(msg.substring(0, 100) + '...')
      }
    })
    
    return criteria.slice(0, 3)
  }

  private assessEngagementLevel(score: number): string {
    if (score >= 80) return 'Very High'
    if (score >= 60) return 'High'
    if (score >= 40) return 'Medium'
    return 'Low'
  }

  private extractKeyQuotes(history: string[]): string[] {
    // Extract meaningful quotes from conversation
    return history
      .filter(msg => msg.length > 30 && msg.length < 150)
      .filter(msg => msg.includes('need') || msg.includes('want') || msg.includes('important'))
      .slice(0, 3)
  }

  private extractConcerns(history: string[]): string[] {
    const concerns: string[] = []
    const concernKeywords = ['concern', 'worry', 'problem', 'issue', 'challenge', 'difficult']
    
    history.forEach(msg => {
      if (concernKeywords.some(keyword => msg.toLowerCase().includes(keyword))) {
        concerns.push(msg.substring(0, 80) + '...')
      }
    })
    
    return concerns.slice(0, 3)
  }

  private identifyOpportunities(history: string[]): string[] {
    const opportunities: string[] = []
    const opportunityKeywords = ['also need', 'future', 'expand', 'additional', 'more']
    
    history.forEach(msg => {
      if (opportunityKeywords.some(keyword => msg.toLowerCase().includes(keyword))) {
        opportunities.push(msg.substring(0, 80) + '...')
      }
    })
    
    return opportunities.slice(0, 3)
  }

  private assessPersonalityProfile(history: string[]): string {
    const messageLength = history.reduce((sum, msg) => sum + msg.length, 0) / history.length
    const questionCount = history.filter(msg => msg.includes('?')).length
    const detailLevel = history.filter(msg => msg.length > 100).length
    
    if (questionCount > 5 && detailLevel > 3) return 'Analytical and Detail-Oriented'
    if (messageLength > 50 && detailLevel > 2) return 'Thorough and Thoughtful'
    if (questionCount > 3) return 'Inquisitive and Engaged'
    if (messageLength < 30) return 'Direct and Concise'
    return 'Balanced Communicator'
  }

  private assessCommunicationStyle(history: string[]): string {
    const formalWords = history.join(' ').match(/\b(please|thank you|appreciate|professional|formal)\b/gi)?.length || 0
    const casualWords = history.join(' ').match(/\b(hey|cool|awesome|great|nice)\b/gi)?.length || 0
    
    if (formalWords > casualWords * 2) return 'Formal and Professional'
    if (casualWords > formalWords * 2) return 'Casual and Friendly'
    return 'Balanced Professional'
  }

  // Notification sending methods (would integrate with actual services)
  private sendSMSNotification(content: string): void {
    console.log('📱 SMS Notification:', content.substring(0, 100) + '...')
  }

  private sendEmailNotification(content: string): void {
    console.log('📧 Email Notification:', content.substring(0, 100) + '...')
  }

  private sendSlackNotification(content: string): void {
    console.log('💬 Slack Notification:', content.substring(0, 100) + '...')
  }

  // Additional helper methods
  private detectTimezone(history: string[]): string {
    // Would analyze conversation for timezone clues
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  private detectBestContactTime(history: string[]): string {
    // Would analyze conversation for time preferences
    return 'Business hours (9 AM - 5 PM local time)'
  }

  private generateImmediateActions(prospect: ProspectProfile, validation: ValidationResult): string[] {
    const actions = ['Contact client within estimated timeframe']
    
    if (validation.validationScore >= 90) {
      actions.push('Prepare detailed proposal')
      actions.push('Schedule project kickoff meeting')
    } else if (validation.validationScore >= 70) {
      actions.push('Prepare project consultation call')
      actions.push('Review similar case studies')
    }
    
    return actions
  }

  private generateFirstCallAgenda(prospect: ProspectProfile): string[] {
    return [
      'Project overview and objectives review',
      'Detailed requirements discussion',
      'Technical approach and architecture',
      'Timeline and milestone planning',
      'Investment and payment terms',
      'Next steps and project kickoff'
    ]
  }

  private generateProposalElements(prospect: ProspectProfile): string[] {
    return [
      'Detailed scope of work',
      'Technical architecture and approach',
      'Project timeline and milestones',
      'Investment breakdown and payment terms',
      'Team structure and communication plan',
      'Success metrics and deliverables'
    ]
  }

  private generateFollowUpStrategy(prospect: ProspectProfile, validation: ValidationResult): string[] {
    const strategy = ['Send initial response within estimated timeframe']
    
    if (validation.validationScore >= 80) {
      strategy.push('Schedule consultation call within 48 hours')
      strategy.push('Send proposal within 1 week')
    } else {
      strategy.push('Conduct discovery call to clarify requirements')
      strategy.push('Follow up with detailed proposal')
    }
    
    return strategy
  }

  // Technical extraction methods (simplified)
  private extractTechnicalPreferences(history: string[]): string[] { return [] }
  private extractIntegrationNeeds(history: string[]): string[] { return [] }
  private extractPerformanceNeeds(history: string[]): string[] { return [] }
  private extractSecurityNeeds(history: string[]): string[] { return [] }
  private extractComplianceNeeds(history: string[]): string[] { return [] }
  private extractCompetitiveFactors(history: string[]): string[] { return [] }

  private generateHandoffId(sessionId: string): string {
    return `HANDOFF_${Date.now()}_${sessionId.substring(0, 8)}`
  }

  // Public methods for tracking and management
  public getHandoffHistory(): HandoffNotification[] {
    return Array.from(this.handoffHistory.values())
  }

  public getHandoffById(handoffId: string): HandoffNotification | undefined {
    return this.handoffHistory.get(handoffId)
  }
}
