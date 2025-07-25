// Production Monitoring and Analytics System for Conversational Codex
export interface ConversationMetrics {
  sessionId: string
  timestamp: Date
  
  // Engagement Metrics
  totalMessages: number
  conversationDuration: number
  averageResponseTime: number
  userEngagementScore: number
  
  // Funnel Metrics
  entryStage: string
  exitStage: string
  stagesCompleted: string[]
  conversionRate: number
  dropOffPoint?: string
  
  // Lead Quality Metrics
  leadScore: number
  validationScore: number
  qualificationLevel: 'unqualified' | 'lead' | 'qualified' | 'validated'
  
  // Business Metrics
  projectValue?: number
  serviceInterest: string[]
  budgetRange?: string
  urgencyLevel: string
  
  // Technical Metrics
  responseLatency: number[]
  errorCount: number
  systemPerformance: number
}

export interface SystemHealth {
  timestamp: Date
  
  // Performance Metrics
  averageResponseTime: number
  systemUptime: number
  errorRate: number
  throughput: number
  
  // Conversation Quality
  averageConversationLength: number
  averageLeadScore: number
  conversionRate: number
  qualificationRate: number
  
  // Business Impact
  totalLeadsGenerated: number
  qualifiedLeadsGenerated: number
  estimatedPipelineValue: number
  averageProjectValue: number
  
  // User Experience
  userSatisfactionScore: number
  conversationCompletionRate: number
  returnVisitorRate: number
}

export interface AlertConfig {
  lowConversionRate: number // Alert if below this %
  highErrorRate: number // Alert if above this %
  slowResponseTime: number // Alert if above this ms
  lowLeadQuality: number // Alert if average score below this
  systemDowntime: number // Alert if uptime below this %
}

export class ProductionMonitoringSystem {
  private metrics: ConversationMetrics[] = []
  private systemHealth: SystemHealth[] = []
  private alertConfig: AlertConfig = {
    lowConversionRate: 15, // 15%
    highErrorRate: 5, // 5%
    slowResponseTime: 3000, // 3 seconds
    lowLeadQuality: 60, // Score of 60
    systemDowntime: 99 // 99% uptime
  }

  // Track individual conversation metrics
  public trackConversation(metrics: ConversationMetrics): void {
    this.metrics.push(metrics)
    
    // Keep only last 1000 conversations to prevent memory bloat
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000)
    }
    
    // Check for alerts
    this.checkAlerts(metrics)
    
    // Update system health
    this.updateSystemHealth()
  }

  // Generate comprehensive analytics report
  public generateAnalyticsReport(timeframe: 'hour' | 'day' | 'week' | 'month' = 'day'): any {
    const cutoffTime = this.getCutoffTime(timeframe)
    const recentMetrics = this.metrics.filter(m => m.timestamp >= cutoffTime)
    
    if (recentMetrics.length === 0) {
      return { error: 'No data available for the specified timeframe' }
    }

    return {
      timeframe,
      period: `${cutoffTime.toISOString()} to ${new Date().toISOString()}`,
      
      // Conversation Analytics
      conversationAnalytics: this.analyzeConversations(recentMetrics),
      
      // Funnel Analytics
      funnelAnalytics: this.analyzeFunnel(recentMetrics),
      
      // Lead Quality Analytics
      leadQualityAnalytics: this.analyzeLeadQuality(recentMetrics),
      
      // Business Impact Analytics
      businessImpactAnalytics: this.analyzeBusinessImpact(recentMetrics),
      
      // Performance Analytics
      performanceAnalytics: this.analyzePerformance(recentMetrics),
      
      // Recommendations
      recommendations: this.generateRecommendations(recentMetrics)
    }
  }

  private analyzeConversations(metrics: ConversationMetrics[]): any {
    const totalConversations = metrics.length
    const avgDuration = metrics.reduce((sum, m) => sum + m.conversationDuration, 0) / totalConversations
    const avgMessages = metrics.reduce((sum, m) => sum + m.totalMessages, 0) / totalConversations
    const avgEngagement = metrics.reduce((sum, m) => sum + m.userEngagementScore, 0) / totalConversations
    
    const completionRate = metrics.filter(m => m.exitStage === 'handoff' || m.exitStage === 'commitment').length / totalConversations * 100
    
    return {
      totalConversations,
      averageDuration: Math.round(avgDuration),
      averageMessages: Math.round(avgMessages),
      averageEngagementScore: Math.round(avgEngagement),
      completionRate: Math.round(completionRate * 100) / 100,
      
      // Engagement distribution
      engagementDistribution: {
        high: metrics.filter(m => m.userEngagementScore >= 80).length,
        medium: metrics.filter(m => m.userEngagementScore >= 60 && m.userEngagementScore < 80).length,
        low: metrics.filter(m => m.userEngagementScore < 60).length
      }
    }
  }

  private analyzeFunnel(metrics: ConversationMetrics[]): any {
    const stageAnalysis = {
      awareness: metrics.filter(m => m.entryStage === 'awareness').length,
      discovery: metrics.filter(m => m.stagesCompleted.includes('discovery')).length,
      qualification: metrics.filter(m => m.stagesCompleted.includes('qualification')).length,
      proposal: metrics.filter(m => m.stagesCompleted.includes('proposal')).length,
      commitment: metrics.filter(m => m.stagesCompleted.includes('commitment')).length,
      handoff: metrics.filter(m => m.exitStage === 'handoff').length
    }
    
    const dropOffAnalysis = this.analyzeDropOffPoints(metrics)
    const conversionRates = this.calculateConversionRates(stageAnalysis)
    
    return {
      stageAnalysis,
      dropOffAnalysis,
      conversionRates,
      overallConversionRate: Math.round((stageAnalysis.handoff / stageAnalysis.awareness) * 10000) / 100
    }
  }

  private analyzeLeadQuality(metrics: ConversationMetrics[]): any {
    const qualifiedLeads = metrics.filter(m => m.qualificationLevel === 'qualified' || m.qualificationLevel === 'validated')
    const avgLeadScore = metrics.reduce((sum, m) => sum + m.leadScore, 0) / metrics.length
    const avgValidationScore = qualifiedLeads.reduce((sum, m) => sum + m.validationScore, 0) / (qualifiedLeads.length || 1)
    
    const qualityDistribution = {
      unqualified: metrics.filter(m => m.qualificationLevel === 'unqualified').length,
      lead: metrics.filter(m => m.qualificationLevel === 'lead').length,
      qualified: metrics.filter(m => m.qualificationLevel === 'qualified').length,
      validated: metrics.filter(m => m.qualificationLevel === 'validated').length
    }
    
    return {
      totalLeads: metrics.length,
      qualifiedLeads: qualifiedLeads.length,
      qualificationRate: Math.round((qualifiedLeads.length / metrics.length) * 10000) / 100,
      averageLeadScore: Math.round(avgLeadScore * 100) / 100,
      averageValidationScore: Math.round(avgValidationScore * 100) / 100,
      qualityDistribution
    }
  }

  private analyzeBusinessImpact(metrics: ConversationMetrics[]): any {
    const projectValues = metrics.filter(m => m.projectValue).map(m => m.projectValue!)
    const totalPipelineValue = projectValues.reduce((sum, value) => sum + value, 0)
    const avgProjectValue = projectValues.length > 0 ? totalPipelineValue / projectValues.length : 0
    
    const serviceInterestAnalysis = this.analyzeServiceInterest(metrics)
    const budgetAnalysis = this.analyzeBudgetDistribution(metrics)
    const urgencyAnalysis = this.analyzeUrgencyDistribution(metrics)
    
    return {
      totalPipelineValue,
      averageProjectValue: Math.round(avgProjectValue),
      projectsWithValue: projectValues.length,
      serviceInterestAnalysis,
      budgetAnalysis,
      urgencyAnalysis
    }
  }

  private analyzePerformance(metrics: ConversationMetrics[]): any {
    const allResponseTimes = metrics.flatMap(m => m.responseLatency)
    const avgResponseTime = allResponseTimes.reduce((sum, time) => sum + time, 0) / allResponseTimes.length
    const maxResponseTime = Math.max(...allResponseTimes)
    const minResponseTime = Math.min(...allResponseTimes)
    
    const totalErrors = metrics.reduce((sum, m) => sum + m.errorCount, 0)
    const errorRate = (totalErrors / metrics.length) * 100
    
    const avgSystemPerformance = metrics.reduce((sum, m) => sum + m.systemPerformance, 0) / metrics.length
    
    return {
      averageResponseTime: Math.round(avgResponseTime),
      maxResponseTime: Math.round(maxResponseTime),
      minResponseTime: Math.round(minResponseTime),
      errorRate: Math.round(errorRate * 100) / 100,
      totalErrors,
      averageSystemPerformance: Math.round(avgSystemPerformance * 100) / 100
    }
  }

  private generateRecommendations(metrics: ConversationMetrics[]): string[] {
    const recommendations: string[] = []
    const analytics = {
      funnel: this.analyzeFunnel(metrics),
      leadQuality: this.analyzeLeadQuality(metrics),
      performance: this.analyzePerformance(metrics)
    }
    
    // Conversion rate recommendations
    if (analytics.funnel.overallConversionRate < 20) {
      recommendations.push('Consider optimizing conversation flow - conversion rate is below 20%')
    }
    
    // Lead quality recommendations
    if (analytics.leadQuality.averageLeadScore < 60) {
      recommendations.push('Focus on improving lead qualification questions - average lead score is low')
    }
    
    // Performance recommendations
    if (analytics.performance.averageResponseTime > 2000) {
      recommendations.push('Optimize response generation - average response time exceeds 2 seconds')
    }
    
    if (analytics.performance.errorRate > 3) {
      recommendations.push('Investigate and fix system errors - error rate is above acceptable threshold')
    }
    
    // Funnel optimization recommendations
    const dropOffStage = this.identifyHighestDropOffStage(metrics)
    if (dropOffStage) {
      recommendations.push(`Optimize ${dropOffStage} stage - highest drop-off point identified`)
    }
    
    return recommendations
  }

  // Real-time alerting system
  private checkAlerts(metrics: ConversationMetrics): void {
    const alerts: string[] = []
    
    // Check response time
    const avgResponseTime = metrics.responseLatency.reduce((sum, time) => sum + time, 0) / metrics.responseLatency.length
    if (avgResponseTime > this.alertConfig.slowResponseTime) {
      alerts.push(`Slow response time detected: ${avgResponseTime}ms`)
    }
    
    // Check error rate
    if (metrics.errorCount > 0) {
      alerts.push(`Errors detected in conversation: ${metrics.errorCount} errors`)
    }
    
    // Check lead quality
    if (metrics.leadScore < this.alertConfig.lowLeadQuality) {
      alerts.push(`Low quality lead detected: Score ${metrics.leadScore}`)
    }
    
    // Send alerts if any
    if (alerts.length > 0) {
      this.sendAlerts(alerts, metrics.sessionId)
    }
  }

  private sendAlerts(alerts: string[], sessionId: string): void {
    // In production, this would send to monitoring service, Slack, email, etc.
    console.warn(`🚨 CODEX ALERTS for session ${sessionId}:`, alerts)
    
    // Store alerts for dashboard
    if (typeof window !== 'undefined') {
      const existingAlerts = localStorage.getItem('codex_alerts') || '[]'
      const alertHistory = JSON.parse(existingAlerts)
      
      alertHistory.push({
        timestamp: new Date().toISOString(),
        sessionId,
        alerts
      })
      
      // Keep only last 50 alerts
      if (alertHistory.length > 50) {
        alertHistory.splice(0, alertHistory.length - 50)
      }
      
      localStorage.setItem('codex_alerts', JSON.stringify(alertHistory))
    }
  }

  // Helper methods
  private getCutoffTime(timeframe: string): Date {
    const now = new Date()
    switch (timeframe) {
      case 'hour':
        return new Date(now.getTime() - 60 * 60 * 1000)
      case 'day':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000)
      case 'week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      case 'month':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      default:
        return new Date(now.getTime() - 24 * 60 * 60 * 1000)
    }
  }

  private analyzeDropOffPoints(metrics: ConversationMetrics[]): any {
    const dropOffs = {
      awareness: 0,
      discovery: 0,
      qualification: 0,
      proposal: 0,
      commitment: 0
    }
    
    metrics.forEach(m => {
      if (m.dropOffPoint && dropOffs.hasOwnProperty(m.dropOffPoint)) {
        dropOffs[m.dropOffPoint as keyof typeof dropOffs]++
      }
    })
    
    return dropOffs
  }

  private calculateConversionRates(stageAnalysis: any): any {
    return {
      awarenessToDiscovery: Math.round((stageAnalysis.discovery / stageAnalysis.awareness) * 10000) / 100,
      discoveryToQualification: Math.round((stageAnalysis.qualification / stageAnalysis.discovery) * 10000) / 100,
      qualificationToProposal: Math.round((stageAnalysis.proposal / stageAnalysis.qualification) * 10000) / 100,
      proposalToCommitment: Math.round((stageAnalysis.commitment / stageAnalysis.proposal) * 10000) / 100,
      commitmentToHandoff: Math.round((stageAnalysis.handoff / stageAnalysis.commitment) * 10000) / 100
    }
  }

  private analyzeServiceInterest(metrics: ConversationMetrics[]): any {
    const serviceCount: { [key: string]: number } = {}
    
    metrics.forEach(m => {
      m.serviceInterest.forEach(service => {
        serviceCount[service] = (serviceCount[service] || 0) + 1
      })
    })
    
    return Object.entries(serviceCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10) // Top 10 services
      .reduce((obj, [service, count]) => ({ ...obj, [service]: count }), {})
  }

  private analyzeBudgetDistribution(metrics: ConversationMetrics[]): any {
    const budgetCount: { [key: string]: number } = {}
    
    metrics.forEach(m => {
      if (m.budgetRange) {
        budgetCount[m.budgetRange] = (budgetCount[m.budgetRange] || 0) + 1
      }
    })
    
    return budgetCount
  }

  private analyzeUrgencyDistribution(metrics: ConversationMetrics[]): any {
    const urgencyCount: { [key: string]: number } = {}
    
    metrics.forEach(m => {
      urgencyCount[m.urgencyLevel] = (urgencyCount[m.urgencyLevel] || 0) + 1
    })
    
    return urgencyCount
  }

  private identifyHighestDropOffStage(metrics: ConversationMetrics[]): string | null {
    const dropOffs = this.analyzeDropOffPoints(metrics)
    const maxDropOff = Math.max(...Object.values(dropOffs))
    
    if (maxDropOff === 0) return null
    
    return Object.keys(dropOffs).find(stage => dropOffs[stage as keyof typeof dropOffs] === maxDropOff) || null
  }

  private updateSystemHealth(): void {
    const recentMetrics = this.metrics.slice(-100) // Last 100 conversations
    
    if (recentMetrics.length === 0) return
    
    const health: SystemHealth = {
      timestamp: new Date(),
      
      averageResponseTime: this.calculateAverageResponseTime(recentMetrics),
      systemUptime: 99.9, // Would be calculated from actual uptime monitoring
      errorRate: this.calculateErrorRate(recentMetrics),
      throughput: recentMetrics.length,
      
      averageConversationLength: recentMetrics.reduce((sum, m) => sum + m.totalMessages, 0) / recentMetrics.length,
      averageLeadScore: recentMetrics.reduce((sum, m) => sum + m.leadScore, 0) / recentMetrics.length,
      conversionRate: recentMetrics.filter(m => m.exitStage === 'handoff').length / recentMetrics.length * 100,
      qualificationRate: recentMetrics.filter(m => m.qualificationLevel === 'qualified' || m.qualificationLevel === 'validated').length / recentMetrics.length * 100,
      
      totalLeadsGenerated: recentMetrics.length,
      qualifiedLeadsGenerated: recentMetrics.filter(m => m.qualificationLevel === 'qualified' || m.qualificationLevel === 'validated').length,
      estimatedPipelineValue: recentMetrics.reduce((sum, m) => sum + (m.projectValue || 0), 0),
      averageProjectValue: recentMetrics.filter(m => m.projectValue).reduce((sum, m) => sum + m.projectValue!, 0) / (recentMetrics.filter(m => m.projectValue).length || 1),
      
      userSatisfactionScore: recentMetrics.reduce((sum, m) => sum + m.userEngagementScore, 0) / recentMetrics.length,
      conversationCompletionRate: recentMetrics.filter(m => m.exitStage === 'handoff' || m.exitStage === 'commitment').length / recentMetrics.length * 100,
      returnVisitorRate: 0 // Would need session tracking to calculate
    }
    
    this.systemHealth.push(health)
    
    // Keep only last 24 hours of health data
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
    this.systemHealth = this.systemHealth.filter(h => h.timestamp >= cutoff)
  }

  private calculateAverageResponseTime(metrics: ConversationMetrics[]): number {
    const allTimes = metrics.flatMap(m => m.responseLatency)
    return allTimes.reduce((sum, time) => sum + time, 0) / allTimes.length
  }

  private calculateErrorRate(metrics: ConversationMetrics[]): number {
    const totalErrors = metrics.reduce((sum, m) => sum + m.errorCount, 0)
    return (totalErrors / metrics.length) * 100
  }

  // Public methods for dashboard access
  public getCurrentSystemHealth(): SystemHealth | undefined {
    return this.systemHealth[this.systemHealth.length - 1]
  }

  public getRecentAlerts(): any[] {
    if (typeof window === 'undefined') return []
    
    const alerts = localStorage.getItem('codex_alerts')
    return alerts ? JSON.parse(alerts) : []
  }

  public exportMetrics(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      return this.convertToCSV(this.metrics)
    }
    return JSON.stringify(this.metrics, null, 2)
  }

  private convertToCSV(data: any[]): string {
    if (data.length === 0) return ''
    
    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
    ].join('\n')
    
    return csvContent
  }
}
