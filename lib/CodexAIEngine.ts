// Advanced AI Engine for Codex with external API integration
import { CodexKnowledgeBase, ProjectRequirement, CodexResponse } from './CodexKnowledgeBase'
import { DocumentReader, DocumentContent } from './DocumentReader'

export interface ExternalAPIResponse {
  source: 'gemini' | 'web-search' | 'knowledge-base'
  content: string
  confidence: number
  timestamp: Date
}

export interface EnhancedCodexResponse extends CodexResponse {
  externalInsights: ExternalAPIResponse[]
  marketAnalysis?: string
  competitorInsights?: string
  technologyTrends?: string
  proposalDocument?: string
}

export class CodexAIEngine {
  private knowledgeBase: CodexKnowledgeBase
  private documentReader: DocumentReader
  private apiKeys: {
    gemini?: string
    serpapi?: string
  }

  constructor() {
    this.knowledgeBase = new CodexKnowledgeBase()
    this.documentReader = new DocumentReader()
    this.apiKeys = {
      // In production, these would come from environment variables
      gemini: process.env.GEMINI_API_KEY,
      serpapi: process.env.SERPAPI_KEY
    }
  }

  public async generateComprehensiveResponse(
    userInput: string,
    conversationHistory: string[]
  ): Promise<EnhancedCodexResponse> {
    // Search relevant documents
    const relevantDocs = await this.documentReader.searchDocuments(userInput)

    // Get base response from knowledge base
    const baseResponse = await this.knowledgeBase.analyzeProjectRequirements(userInput, conversationHistory)

    // Enhance response with document insights
    const enhancedMessage = await this.enhanceWithDocumentInsights(baseResponse.message, relevantDocs, userInput)

    // Enhance with external AI insights
    const externalInsights = await this.gatherExternalInsights(userInput, baseResponse)

    // Generate market analysis
    const marketAnalysis = await this.generateMarketAnalysis(userInput, baseResponse)

    // Generate proposal document if appropriate
    const proposalDocument = await this.generateProposalDocument(baseResponse, userInput, relevantDocs)

    return {
      ...baseResponse,
      message: enhancedMessage,
      externalInsights,
      marketAnalysis,
      proposalDocument,
      confidence: Math.min(baseResponse.confidence + 0.15, 0.98), // Higher boost with document integration
      documentReferences: [...baseResponse.documentReferences, ...relevantDocs.map(d => d.filename)]
    }
  }

  private async enhanceWithDocumentInsights(
    baseMessage: string,
    documents: DocumentContent[],
    userInput: string
  ): Promise<string> {
    if (documents.length === 0) return baseMessage

    const contextualResponse = this.documentReader.generateContextualResponse(userInput, documents)
    const relevantDoc = documents[0]

    // Extract key insights from the most relevant document
    const insights = this.documentReader.extractKeyInsights(relevantDoc.content)

    let enhancedMessage = baseMessage

    // Add strategic context from documents
    if (relevantDoc.category === 'strategy') {
      enhancedMessage += ` Drawing from the strategic framework in "${relevantDoc.summary}", this approach aligns with proven methodologies for ${relevantDoc.keywords.slice(0, 2).join(' and ')}.`
    } else if (relevantDoc.category === 'technical') {
      enhancedMessage += ` Based on the technical architecture documented in our knowledge base, this solution leverages ${relevantDoc.keywords.slice(0, 3).join(', ')} for optimal results.`
    }

    // Add specific insight if available
    if (insights.length > 0) {
      enhancedMessage += ` Key consideration: ${insights[0]}`
    }

    return enhancedMessage
  }

  private async gatherExternalInsights(userInput: string, baseResponse: CodexResponse): Promise<ExternalAPIResponse[]> {
    const insights: ExternalAPIResponse[] = []

    try {
      // Gemini AI insights
      if (this.apiKeys.gemini) {
        const geminiInsight = await this.queryGeminiAI(userInput, baseResponse)
        if (geminiInsight) insights.push(geminiInsight)
      }

      // Web search insights (simulated for now)
      const webInsight = await this.simulateWebSearch(userInput)
      if (webInsight) insights.push(webInsight)

    } catch (error) {
      console.warn('External API error:', error)
      // Gracefully degrade to knowledge base only
    }

    return insights
  }

  private async queryGeminiAI(userInput: string, baseResponse: CodexResponse): Promise<ExternalAPIResponse | null> {
    if (!this.apiKeys.gemini) {
      return this.simulateGeminiResponse(userInput, baseResponse)
    }

    try {
      // In production, this would make actual Gemini API calls
      const prompt = this.buildGeminiPrompt(userInput, baseResponse)
      
      // Simulated Gemini response for now
      return this.simulateGeminiResponse(userInput, baseResponse)
      
    } catch (error) {
      console.error('Gemini API error:', error)
      return null
    }
  }

  private buildGeminiPrompt(userInput: string, baseResponse: CodexResponse): string {
    return `
    As an expert technology consultant and Digital Polymat, analyze this client inquiry and provide strategic insights:

    Client Input: "${userInput}"
    
    Current Assessment:
    - Project Type: ${baseResponse.estimatedScope.complexity}
    - Timeline: ${baseResponse.estimatedScope.timeline}
    - Budget: ${baseResponse.estimatedScope.budget}
    
    Please provide:
    1. Technology trend analysis relevant to this project
    2. Potential challenges and mitigation strategies
    3. Competitive advantages of the proposed approach
    4. ROI considerations for the client
    5. Next steps for project initiation

    Focus on practical, actionable insights that demonstrate deep technical and business expertise.
    `
  }

  private async simulateGeminiResponse(userInput: string, baseResponse: CodexResponse): Promise<ExternalAPIResponse> {
    // Simulate intelligent AI response based on project type
    const projectType = this.extractProjectType(userInput)
    
    const responses = {
      ai: "Current AI trends favor agentic systems and RAG implementations. The market is moving toward specialized AI applications rather than general-purpose tools. Key considerations: data privacy, model fine-tuning, and integration complexity. ROI typically realized within 6-12 months through automation savings.",
      
      fintech: "FinTech regulations are tightening globally, making security-first development crucial. Open banking APIs and blockchain integration are trending. Key challenges: compliance costs, security audits, and user trust. Success factors: regulatory expertise, robust testing, and gradual feature rollout.",
      
      web: "Modern web development emphasizes performance, accessibility, and mobile-first design. JAMstack architecture and edge computing are gaining traction. Key trends: Core Web Vitals optimization, progressive enhancement, and sustainable development practices.",
      
      security: "Cybersecurity landscape is evolving with AI-powered threats and zero-trust architectures. Key trends: automated threat detection, compliance automation, and security-by-design principles. Investment in security typically prevents 10x costs in breach remediation.",
      
      default: "Technology landscape is rapidly evolving with AI integration, cloud-native architectures, and sustainability focus. Key success factors: scalable design, user-centric approach, and iterative development methodology."
    }

    const content = responses[projectType as keyof typeof responses] || responses.default

    return {
      source: 'gemini',
      content,
      confidence: 0.85,
      timestamp: new Date()
    }
  }

  private async simulateWebSearch(userInput: string): Promise<ExternalAPIResponse | null> {
    // Simulate web search insights
    const searchInsights = {
      market: "Recent market research indicates strong demand for integrated digital solutions. Companies are prioritizing vendors who can handle multiple aspects of digital transformation.",
      technology: "Latest technology surveys show preference for proven, scalable solutions over cutting-edge but unproven technologies.",
      competition: "Competitive analysis reveals that specialized expertise combined with broad capabilities creates significant market advantage."
    }

    return {
      source: 'web-search',
      content: `Market Intelligence: ${searchInsights.market} Technology Trends: ${searchInsights.technology} Competitive Landscape: ${searchInsights.competition}`,
      confidence: 0.75,
      timestamp: new Date()
    }
  }

  private async generateMarketAnalysis(userInput: string, baseResponse: CodexResponse): Promise<string> {
    const projectType = this.extractProjectType(userInput)
    
    const marketAnalyses = {
      ai: "AI market is experiencing 40% YoY growth with enterprise adoption accelerating. Key drivers: automation needs, competitive pressure, and cost reduction. Success rate highest for focused, domain-specific implementations.",
      
      fintech: "FinTech sector showing resilience with 25% growth despite economic headwinds. Regulatory compliance and security are primary concerns. Success factors: proven security track record and regulatory expertise.",
      
      web: "Web development market is mature but evolving toward performance and accessibility. Mobile-first approach is no longer optional. Success depends on technical excellence and user experience focus.",
      
      security: "Cybersecurity market growing 15% annually driven by increasing threat landscape. Organizations prioritizing proactive security over reactive measures. Premium pricing for proven expertise.",
      
      default: "Technology services market favors specialists who can demonstrate clear ROI and risk mitigation. Clients increasingly value strategic partnership over transactional relationships."
    }

    return marketAnalyses[projectType as keyof typeof marketAnalyses] || marketAnalyses.default
  }

  private async generateProposalDocument(
    baseResponse: CodexResponse,
    userInput: string,
    relevantDocs: DocumentContent[]
  ): Promise<string> {
    const projectType = this.extractProjectType(userInput)
    
    return `
# Project Proposal: ${this.getProjectTitle(projectType)}

## Executive Summary
Based on our discussion, I've identified a strategic opportunity to leverage Digital Polymat expertise for your ${projectType} initiative. This proposal outlines a comprehensive approach that addresses your specific requirements while ensuring scalable, secure, and maintainable solutions.

## Proposed Solution
${baseResponse.message}

## Key Deliverables
${baseResponse.estimatedScope.keyDeliverables.map(item => `• ${item}`).join('\n')}

## Strategic Recommendations
${baseResponse.recommendations.map(item => `• ${item}`).join('\n')}

## Investment & Timeline
- **Estimated Timeline**: ${baseResponse.estimatedScope.timeline}
- **Investment Range**: ${baseResponse.estimatedScope.budget}
- **Complexity Level**: ${baseResponse.estimatedScope.complexity}

## Why Digital Polymat Approach
The unique combination of technical expertise, business acumen, and creative problem-solving ensures solutions that are not just functional, but strategically valuable. With 20+ years of experience and proven results across diverse industries, this project aligns perfectly with demonstrated capabilities.

## Next Steps
1. Schedule detailed technical consultation
2. Finalize project scope and requirements
3. Develop comprehensive project plan
4. Begin implementation with regular milestone reviews

## Contact Information
Ready to discuss this proposal in detail and answer any technical questions.

**David Akpoviroro Oke (Mr. Iridescent)**  
Digital Polymat | Full Stack Engineer | AI Specialist  
📧 mriridescent@yahoo.com  
🌐 https://mriridescent-digitalpolymat.netlify.app

*This proposal is valid for 30 days and can be customized based on your specific requirements.*
    `
  }

  private extractProjectType(userInput: string): string {
    const input = userInput.toLowerCase()
    if (input.includes('ai') || input.includes('machine learning')) return 'ai'
    if (input.includes('fintech') || input.includes('financial')) return 'fintech'
    if (input.includes('security') || input.includes('cybersecurity')) return 'security'
    if (input.includes('web') || input.includes('website')) return 'web'
    return 'custom'
  }

  private getProjectTitle(projectType: string): string {
    const titles = {
      ai: 'AI-Powered Intelligent System',
      fintech: 'Secure FinTech Platform',
      security: 'Cybersecurity Enhancement',
      web: 'Modern Web Application',
      custom: 'Custom Digital Solution'
    }
    return titles[projectType as keyof typeof titles] || titles.custom
  }

  public async generateFollowUpQuestions(conversationHistory: string[], userResponse: string): Promise<string[]> {
    // Analyze conversation to generate intelligent follow-up questions
    const context = conversationHistory.join(' ').toLowerCase()
    const questions: string[] = []

    if (!context.includes('budget') && !context.includes('investment')) {
      questions.push("What's your anticipated investment range for this project?")
    }

    if (!context.includes('timeline') && !context.includes('deadline')) {
      questions.push("What's your ideal timeline for project completion?")
    }

    if (!context.includes('team') && !context.includes('stakeholder')) {
      questions.push("Who are the key stakeholders and decision-makers for this project?")
    }

    if (!context.includes('existing') && !context.includes('current')) {
      questions.push("Do you have any existing systems or technologies that need to be integrated?")
    }

    if (!context.includes('goal') && !context.includes('objective')) {
      questions.push("What's the primary business objective you're hoping to achieve?")
    }

    return questions.slice(0, 2) // Return top 2 most relevant questions
  }
}
