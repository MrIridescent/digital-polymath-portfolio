// Pre-Project Validation System - Comprehensive Client Readiness Assessment
export interface PreProjectValidation {
  // Financial Validation
  budgetValidation: {
    budgetConfirmed: boolean
    budgetAllocated: boolean
    paymentTermsAgreed: boolean
    financialCapabilityVerified: boolean
    budgetRealistic: boolean
    contingencyPlanned: boolean
  }
  
  // Authority Validation
  authorityValidation: {
    decisionMakerIdentified: boolean
    approvalProcessClear: boolean
    stakeholdersAligned: boolean
    contractSigningAuthority: boolean
    projectChampionPresent: boolean
  }
  
  // Project Readiness
  projectReadiness: {
    requirementsClear: boolean
    scopeWellDefined: boolean
    timelineRealistic: boolean
    resourcesAvailable: boolean
    dependenciesIdentified: boolean
    risksAssessed: boolean
  }
  
  // Technical Validation
  technicalValidation: {
    technicalRequirementsClear: boolean
    infrastructureReady: boolean
    integrationRequirementsMapped: boolean
    performanceExpectationsDefined: boolean
    securityRequirementsUnderstood: boolean
    complianceRequirementsClear: boolean
  }
  
  // Communication & Process
  communicationValidation: {
    communicationChannelsEstablished: boolean
    meetingCadenceAgreed: boolean
    reportingRequirementsClear: boolean
    feedbackProcessDefined: boolean
    escalationPathClear: boolean
    documentationRequirementsSet: boolean
  }
  
  // Success Criteria
  successCriteria: {
    successMetricsDefined: boolean
    acceptanceCriteriaClear: boolean
    testingRequirementsSet: boolean
    launchCriteriaDefined: boolean
    postLaunchSupportPlanned: boolean
    maintenanceRequirementsSet: boolean
  }
}

export interface ValidationScore {
  overall: number
  financial: number
  authority: number
  project: number
  technical: number
  communication: number
  success: number
}

export interface ValidationResult {
  isReadyForProject: boolean
  validationScore: ValidationScore
  confidenceLevel: 'high' | 'medium' | 'low'
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  blockers: string[]
  recommendations: string[]
  nextSteps: string[]
  estimatedStartDate: string
  projectSuccessProbability: number
}

export interface ClientHandoffPackage {
  // Client Information
  clientProfile: {
    contactInfo: any
    businessProfile: any
    decisionMakers: string[]
    stakeholders: string[]
    communicationPreferences: any
  }
  
  // Project Details
  projectSpecification: {
    projectType: string
    scope: string
    requirements: string[]
    constraints: string[]
    assumptions: string[]
    deliverables: string[]
  }
  
  // Commercial Terms
  commercialTerms: {
    budget: string
    paymentTerms: string
    timeline: string
    milestones: string[]
    changeRequestProcess: string
  }
  
  // Technical Specifications
  technicalSpecs: {
    technologies: string[]
    integrations: string[]
    performance: string[]
    security: string[]
    compliance: string[]
  }
  
  // Validation Results
  validationResults: {
    preProjectValidation: PreProjectValidation
    validationScore: ValidationScore
    riskAssessment: string[]
    successFactors: string[]
  }
  
  // Conversation Context
  conversationContext: {
    conversationSummary: string
    keyInsights: string[]
    clientConcerns: string[]
    opportunityAreas: string[]
    competitiveFactors: string[]
  }
  
  // Recommended Actions
  recommendedActions: {
    immediateActions: string[]
    firstMeetingAgenda: string[]
    proposalElements: string[]
    contractConsiderations: string[]
  }
}

export class PreProjectValidationSystem {
  private validationWeights = {
    financial: 0.25,
    authority: 0.20,
    project: 0.20,
    technical: 0.15,
    communication: 0.10,
    success: 0.10
  }

  public validateProjectReadiness(
    conversationData: any,
    clientProfile: any,
    projectDetails: any
  ): ValidationResult {
    
    const validation = this.performComprehensiveValidation(conversationData, clientProfile, projectDetails)
    const scores = this.calculateValidationScores(validation)
    const riskLevel = this.assessRiskLevel(scores, validation)
    const blockers = this.identifyBlockers(validation)
    const recommendations = this.generateRecommendations(validation, scores)
    
    return {
      isReadyForProject: scores.overall >= 75 && blockers.length === 0,
      validationScore: scores,
      confidenceLevel: this.determineConfidenceLevel(scores.overall),
      riskLevel,
      blockers,
      recommendations,
      nextSteps: this.generateNextSteps(validation, scores),
      estimatedStartDate: this.estimateStartDate(validation, blockers),
      projectSuccessProbability: this.calculateSuccessProbability(scores, validation)
    }
  }

  private performComprehensiveValidation(
    conversationData: any,
    clientProfile: any,
    projectDetails: any
  ): PreProjectValidation {
    
    return {
      budgetValidation: {
        budgetConfirmed: this.isBudgetConfirmed(conversationData),
        budgetAllocated: this.isBudgetAllocated(conversationData),
        paymentTermsAgreed: this.arePaymentTermsAgreed(conversationData),
        financialCapabilityVerified: this.isFinancialCapabilityVerified(clientProfile),
        budgetRealistic: this.isBudgetRealistic(projectDetails),
        contingencyPlanned: this.isContingencyPlanned(conversationData)
      },
      
      authorityValidation: {
        decisionMakerIdentified: this.isDecisionMakerIdentified(clientProfile),
        approvalProcessClear: this.isApprovalProcessClear(conversationData),
        stakeholdersAligned: this.areStakeholdersAligned(conversationData),
        contractSigningAuthority: this.hasContractSigningAuthority(clientProfile),
        projectChampionPresent: this.isProjectChampionPresent(conversationData)
      },
      
      projectReadiness: {
        requirementsClear: this.areRequirementsClear(projectDetails),
        scopeWellDefined: this.isScopeWellDefined(projectDetails),
        timelineRealistic: this.isTimelineRealistic(projectDetails),
        resourcesAvailable: this.areResourcesAvailable(conversationData),
        dependenciesIdentified: this.areDependenciesIdentified(projectDetails),
        risksAssessed: this.areRisksAssessed(conversationData)
      },
      
      technicalValidation: {
        technicalRequirementsClear: this.areTechnicalRequirementsClear(projectDetails),
        infrastructureReady: this.isInfrastructureReady(conversationData),
        integrationRequirementsMapped: this.areIntegrationRequirementsMapped(projectDetails),
        performanceExpectationsDefined: this.arePerformanceExpectationsDefined(projectDetails),
        securityRequirementsUnderstood: this.areSecurityRequirementsUnderstood(projectDetails),
        complianceRequirementsClear: this.areComplianceRequirementsClear(projectDetails)
      },
      
      communicationValidation: {
        communicationChannelsEstablished: this.areCommunicationChannelsEstablished(clientProfile),
        meetingCadenceAgreed: this.isMeetingCadenceAgreed(conversationData),
        reportingRequirementsClear: this.areReportingRequirementsClear(conversationData),
        feedbackProcessDefined: this.isFeedbackProcessDefined(conversationData),
        escalationPathClear: this.isEscalationPathClear(conversationData),
        documentationRequirementsSet: this.areDocumentationRequirementsSet(conversationData)
      },
      
      successCriteria: {
        successMetricsDefined: this.areSuccessMetricsDefined(projectDetails),
        acceptanceCriteriaClear: this.areAcceptanceCriteriaClear(projectDetails),
        testingRequirementsSet: this.areTestingRequirementsSet(projectDetails),
        launchCriteriaDefined: this.areLaunchCriteriaDefined(projectDetails),
        postLaunchSupportPlanned: this.isPostLaunchSupportPlanned(conversationData),
        maintenanceRequirementsSet: this.areMaintenanceRequirementsSet(conversationData)
      }
    }
  }

  private calculateValidationScores(validation: PreProjectValidation): ValidationScore {
    const financial = this.calculateCategoryScore(validation.budgetValidation)
    const authority = this.calculateCategoryScore(validation.authorityValidation)
    const project = this.calculateCategoryScore(validation.projectReadiness)
    const technical = this.calculateCategoryScore(validation.technicalValidation)
    const communication = this.calculateCategoryScore(validation.communicationValidation)
    const success = this.calculateCategoryScore(validation.successCriteria)
    
    const overall = Math.round(
      financial * this.validationWeights.financial +
      authority * this.validationWeights.authority +
      project * this.validationWeights.project +
      technical * this.validationWeights.technical +
      communication * this.validationWeights.communication +
      success * this.validationWeights.success
    )
    
    return { overall, financial, authority, project, technical, communication, success }
  }

  private calculateCategoryScore(category: any): number {
    const values = Object.values(category) as boolean[]
    const trueCount = values.filter(v => v).length
    return Math.round((trueCount / values.length) * 100)
  }

  private assessRiskLevel(scores: ValidationScore, validation: PreProjectValidation): 'low' | 'medium' | 'high' | 'critical' {
    if (scores.overall >= 85 && scores.financial >= 80 && scores.authority >= 80) return 'low'
    if (scores.overall >= 70 && scores.financial >= 60 && scores.authority >= 60) return 'medium'
    if (scores.overall >= 50) return 'high'
    return 'critical'
  }

  private identifyBlockers(validation: PreProjectValidation): string[] {
    const blockers: string[] = []
    
    if (!validation.budgetValidation.budgetConfirmed) blockers.push('Budget not confirmed')
    if (!validation.authorityValidation.decisionMakerIdentified) blockers.push('Decision maker not identified')
    if (!validation.projectReadiness.requirementsClear) blockers.push('Requirements not clear')
    if (!validation.technicalValidation.technicalRequirementsClear) blockers.push('Technical requirements unclear')
    
    return blockers
  }

  private generateRecommendations(validation: PreProjectValidation, scores: ValidationScore): string[] {
    const recommendations: string[] = []
    
    if (scores.financial < 70) {
      recommendations.push('Clarify budget allocation and payment terms')
      recommendations.push('Verify financial capability and approval process')
    }
    
    if (scores.authority < 70) {
      recommendations.push('Identify all decision makers and stakeholders')
      recommendations.push('Establish clear approval process and authority levels')
    }
    
    if (scores.project < 70) {
      recommendations.push('Define project scope and requirements more clearly')
      recommendations.push('Establish realistic timeline and resource allocation')
    }
    
    if (scores.technical < 70) {
      recommendations.push('Clarify technical requirements and constraints')
      recommendations.push('Assess infrastructure readiness and integration needs')
    }
    
    return recommendations
  }

  private generateNextSteps(validation: PreProjectValidation, scores: ValidationScore): string[] {
    const steps: string[] = []
    
    if (scores.overall >= 75) {
      steps.push('Schedule project kickoff meeting')
      steps.push('Prepare detailed project proposal')
      steps.push('Draft project agreement')
    } else if (scores.overall >= 60) {
      steps.push('Address identified blockers and concerns')
      steps.push('Schedule follow-up discovery session')
      steps.push('Prepare risk mitigation plan')
    } else {
      steps.push('Conduct comprehensive requirements gathering')
      steps.push('Clarify budget and authority structure')
      steps.push('Reassess project feasibility')
    }
    
    return steps
  }

  private estimateStartDate(validation: PreProjectValidation, blockers: string[]): string {
    const baseDate = new Date()
    let daysToAdd = 7 // Base preparation time
    
    // Add time for each blocker
    daysToAdd += blockers.length * 3
    
    // Add time based on complexity
    if (!validation.projectReadiness.requirementsClear) daysToAdd += 7
    if (!validation.authorityValidation.approvalProcessClear) daysToAdd += 5
    
    baseDate.setDate(baseDate.getDate() + daysToAdd)
    return baseDate.toISOString().split('T')[0]
  }

  private calculateSuccessProbability(scores: ValidationScore, validation: PreProjectValidation): number {
    let probability = scores.overall
    
    // Adjust based on critical factors
    if (validation.budgetValidation.budgetConfirmed) probability += 5
    if (validation.authorityValidation.decisionMakerIdentified) probability += 5
    if (validation.projectReadiness.requirementsClear) probability += 5
    
    // Reduce for risk factors
    if (!validation.projectReadiness.timelineRealistic) probability -= 10
    if (!validation.budgetValidation.budgetRealistic) probability -= 15
    
    return Math.max(0, Math.min(100, probability))
  }

  private determineConfidenceLevel(score: number): 'high' | 'medium' | 'low' {
    if (score >= 85) return 'high'
    if (score >= 65) return 'medium'
    return 'low'
  }

  // Validation helper methods (simplified implementations)
  private isBudgetConfirmed(data: any): boolean { return data.budgetConfirmed || false }
  private isBudgetAllocated(data: any): boolean { return data.budgetAllocated || false }
  private arePaymentTermsAgreed(data: any): boolean { return data.paymentTermsAgreed || false }
  private isFinancialCapabilityVerified(profile: any): boolean { return profile.businessType === 'enterprise' || profile.businessType === 'smb' }
  private isBudgetRealistic(details: any): boolean { return details.budget && !details.budget.includes('under-5k') }
  private isContingencyPlanned(data: any): boolean { return data.contingencyPlanned || false }
  
  private isDecisionMakerIdentified(profile: any): boolean { return profile.decisionMaker || false }
  private isApprovalProcessClear(data: any): boolean { return data.approvalProcessClear || false }
  private areStakeholdersAligned(data: any): boolean { return data.stakeholdersAligned || true }
  private hasContractSigningAuthority(profile: any): boolean { return profile.decisionMaker || false }
  private isProjectChampionPresent(data: any): boolean { return data.projectChampionPresent || true }
  
  private areRequirementsClear(details: any): boolean { return details.requirements && details.requirements.length > 0 }
  private isScopeWellDefined(details: any): boolean { return details.scope && details.scope.length > 50 }
  private isTimelineRealistic(details: any): boolean { return details.timeline && !details.timeline.includes('asap') }
  private areResourcesAvailable(data: any): boolean { return data.resourcesAvailable || true }
  private areDependenciesIdentified(details: any): boolean { return details.dependencies || true }
  private areRisksAssessed(data: any): boolean { return data.risksAssessed || false }
  
  private areTechnicalRequirementsClear(details: any): boolean { return details.technicalRequirements || true }
  private isInfrastructureReady(data: any): boolean { return data.infrastructureReady || true }
  private areIntegrationRequirementsMapped(details: any): boolean { return details.integrations || true }
  private arePerformanceExpectationsDefined(details: any): boolean { return details.performance || true }
  private areSecurityRequirementsUnderstood(details: any): boolean { return details.security || true }
  private areComplianceRequirementsClear(details: any): boolean { return details.compliance || true }
  
  private areCommunicationChannelsEstablished(profile: any): boolean { return profile.email || profile.phone }
  private isMeetingCadenceAgreed(data: any): boolean { return data.meetingCadence || false }
  private areReportingRequirementsClear(data: any): boolean { return data.reporting || false }
  private isFeedbackProcessDefined(data: any): boolean { return data.feedback || false }
  private isEscalationPathClear(data: any): boolean { return data.escalation || false }
  private areDocumentationRequirementsSet(data: any): boolean { return data.documentation || false }
  
  private areSuccessMetricsDefined(details: any): boolean { return details.successMetrics || false }
  private areAcceptanceCriteriaClear(details: any): boolean { return details.acceptanceCriteria || false }
  private areTestingRequirementsSet(details: any): boolean { return details.testing || false }
  private areLaunchCriteriaDefined(details: any): boolean { return details.launch || false }
  private isPostLaunchSupportPlanned(data: any): boolean { return data.postLaunch || false }
  private areMaintenanceRequirementsSet(data: any): boolean { return data.maintenance || false }

  // Generate comprehensive handoff package
  public generateClientHandoffPackage(
    validationResult: ValidationResult,
    clientProfile: any,
    projectDetails: any,
    conversationHistory: string[]
  ): ClientHandoffPackage {
    
    return {
      clientProfile: {
        contactInfo: clientProfile.contactInfo,
        businessProfile: clientProfile.businessProfile,
        decisionMakers: [clientProfile.contactInfo.name || 'Primary Contact'],
        stakeholders: [],
        communicationPreferences: {
          preferredChannel: 'email',
          timezone: 'UTC',
          availability: 'business hours'
        }
      },
      
      projectSpecification: {
        projectType: projectDetails.type || 'Custom Development',
        scope: projectDetails.scope || 'To be defined in discovery phase',
        requirements: projectDetails.requirements || [],
        constraints: projectDetails.constraints || [],
        assumptions: ['Client will provide necessary access and resources', 'Requirements are stable'],
        deliverables: ['Fully functional application', 'Documentation', 'Training', 'Support']
      },
      
      commercialTerms: {
        budget: projectDetails.budget || 'To be determined',
        paymentTerms: '50% upfront, 50% on completion',
        timeline: projectDetails.timeline || 'To be determined',
        milestones: ['Discovery & Planning', 'Development', 'Testing', 'Launch'],
        changeRequestProcess: 'Formal change request with impact assessment'
      },
      
      technicalSpecs: {
        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
        integrations: [],
        performance: ['Page load < 2 seconds', '99.9% uptime'],
        security: ['HTTPS', 'Data encryption', 'Secure authentication'],
        compliance: []
      },
      
      validationResults: {
        preProjectValidation: validationResult.isReadyForProject ? {} as PreProjectValidation : {} as PreProjectValidation,
        validationScore: validationResult.validationScore,
        riskAssessment: validationResult.blockers,
        successFactors: ['Clear requirements', 'Committed stakeholders', 'Realistic timeline']
      },
      
      conversationContext: {
        conversationSummary: this.generateConversationSummary(conversationHistory),
        keyInsights: this.extractKeyInsights(conversationHistory),
        clientConcerns: this.extractClientConcerns(conversationHistory),
        opportunityAreas: this.identifyOpportunityAreas(conversationHistory),
        competitiveFactors: []
      },
      
      recommendedActions: {
        immediateActions: validationResult.nextSteps,
        firstMeetingAgenda: [
          'Project overview and objectives',
          'Detailed requirements review',
          'Timeline and milestone planning',
          'Team introductions and communication plan'
        ],
        proposalElements: [
          'Detailed scope of work',
          'Technical architecture',
          'Project timeline',
          'Investment and payment terms'
        ],
        contractConsiderations: [
          'Intellectual property rights',
          'Change request process',
          'Support and maintenance terms',
          'Termination clauses'
        ]
      }
    }
  }

  private generateConversationSummary(history: string[]): string {
    return `Client engaged in comprehensive discussion about their project needs. Demonstrated clear understanding of requirements and showed strong commitment to moving forward. Key discussion points included project scope, timeline, and budget considerations.`
  }

  private extractKeyInsights(history: string[]): string[] {
    return [
      'Client has clear vision for the project',
      'Budget is allocated and realistic',
      'Timeline expectations are reasonable',
      'Strong business case for the project'
    ]
  }

  private extractClientConcerns(history: string[]): string[] {
    return [
      'Ensuring project delivers on time',
      'Maintaining quality standards',
      'Effective communication throughout project'
    ]
  }

  private identifyOpportunityAreas(history: string[]): string[] {
    return [
      'Potential for additional features',
      'Opportunity for ongoing maintenance contract',
      'Possible future projects'
    ]
  }
}
