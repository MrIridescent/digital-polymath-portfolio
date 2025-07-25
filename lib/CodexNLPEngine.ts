// Advanced Natural Language Processing Engine for Codex
// Implements sophisticated conversation understanding and context management

import { ConversationMemoryManager, type MemoryEntry, type ConversationSummary } from './ConversationMemoryManager'

export interface ConversationContext {
  sessionId: string
  userId?: string
  currentPage?: string
  visitHistory: string[]
  userProfile: UserProfile
  conversationMemory: ConversationMemory
  intentHistory: Intent[]
  lastActivity: Date
}

export interface UserProfile {
  name?: string
  company?: string
  role?: string
  interests: string[]
  technicalLevel: 'beginner' | 'intermediate' | 'expert'
  projectType?: string
  budget?: string
  timeline?: string
  previousInteractions: number
  leadScore: number
  tags: string[]
}

export interface ConversationMemory {
  shortTerm: {
    currentTopic: string
    mentionedProjects: string[]
    askedQuestions: string[]
    shownContent: string[]
    userPreferences: Record<string, any>
  }
  longTerm: {
    semanticFacts: string[]
    episodicMemories: string[]
    proceduralKnowledge: string[]
    relationshipHistory: string[]
  }
}

export interface Intent {
  type: 'greeting' | 'question' | 'request' | 'objection' | 'interest' | 'booking' | 'goodbye'
  confidence: number
  entities: Entity[]
  sentiment: 'positive' | 'neutral' | 'negative'
  urgency: 'low' | 'medium' | 'high'
  timestamp: Date
}

export interface Entity {
  type: 'project' | 'technology' | 'service' | 'timeline' | 'budget' | 'person' | 'company'
  value: string
  confidence: number
}

export interface CodexResponse {
  message: string
  intent: Intent
  suggestedActions: string[]
  quickReplies: string[]
  confidence: number
  reasoning: string
  toolsUsed: string[]
  memoryUpdates: string[]
  nextBestAction: string
}

export class CodexNLPEngine {
  private conversationContexts: Map<string, ConversationContext> = new Map()
  private intentPatterns: Map<string, RegExp[]> = new Map()
  private entityPatterns: Map<string, RegExp[]> = new Map()
  private responseTemplates: Map<string, string[]> = new Map()
  private memoryManager: ConversationMemoryManager

  constructor() {
    this.memoryManager = new ConversationMemoryManager()
    this.initializePatterns()
    this.initializeResponseTemplates()
  }

  private initializePatterns() {
    // Intent recognition patterns
    this.intentPatterns.set('greeting', [
      /^(hi|hello|hey|good\s+(morning|afternoon|evening)|greetings)/i,
      /^(what's\s+up|how\s+are\s+you|nice\s+to\s+meet)/i
    ])

    this.intentPatterns.set('question', [
      /^(what|how|when|where|why|who|which|can\s+you|do\s+you|is\s+it|are\s+you)/i,
      /\?$/,
      /(tell\s+me|explain|describe|show\s+me)/i
    ])

    this.intentPatterns.set('request', [
      /(i\s+need|i\s+want|i'm\s+looking\s+for|help\s+me|can\s+you\s+help)/i,
      /(schedule|book|arrange|set\s+up|contact)/i,
      /(send\s+me|give\s+me|provide|share)/i
    ])

    this.intentPatterns.set('interest', [
      /(interested\s+in|curious\s+about|want\s+to\s+know|tell\s+me\s+more)/i,
      /(sounds\s+good|looks\s+interesting|impressive|amazing)/i,
      /(hire|work\s+with|collaborate|partnership)/i
    ])

    this.intentPatterns.set('objection', [
      /(but|however|concern|worried|not\s+sure|doubt)/i,
      /(expensive|costly|too\s+much|budget|price)/i,
      /(time|timeline|deadline|urgent|rush)/i
    ])

    this.intentPatterns.set('booking', [
      /(schedule|book|meeting|call|consultation|appointment)/i,
      /(available|free|calendar|time)/i,
      /(talk|discuss|chat|speak)/i
    ])

    // Entity recognition patterns
    this.entityPatterns.set('project', [
      /\b(zandbox|trinitas|iridescent|portfolio|website|app|application|system|platform)\b/i
    ])

    this.entityPatterns.set('technology', [
      /\b(react|nextjs|python|java|ai|ml|langchain|docker|kubernetes|aws|gcp)\b/i,
      /\b(typescript|javascript|node|express|fastapi|postgresql|mongodb)\b/i
    ])

    this.entityPatterns.set('timeline', [
      /\b(\d+\s*(days?|weeks?|months?)|asap|urgent|soon|immediately)\b/i,
      /\b(next\s+(week|month)|by\s+\w+|before\s+\w+)\b/i
    ])

    this.entityPatterns.set('budget', [
      /\$[\d,]+|\b\d+k?\b.*budget|\bbudget.*\$?[\d,]+/i,
      /\b(cheap|affordable|expensive|premium|enterprise)\b/i
    ])
  }

  private initializeResponseTemplates() {
    this.responseTemplates.set('greeting_new_user', [
      "Welcome! I'm Codex, David's AI emissary. I'm here to help you explore his work and see if there's a perfect match for your project needs. What brings you here today?",
      "Hello! I'm Codex, and I know everything about David's expertise as a Digital Polymat. Whether you're curious about his projects, skills, or availability, I'm here to help. What would you like to know?",
      "Hi there! I'm Codex, David's intelligent assistant. I can tell you about his 20+ years of experience, show you specific projects, or help you understand how his unique approach might solve your challenges. What interests you most?"
    ])

    this.responseTemplates.set('greeting_returning_user', [
      "Welcome back! I remember our previous conversation about {previousTopic}. How can I help you today?",
      "Great to see you again! Last time we discussed {previousTopic}. Are you ready to take the next step, or do you have new questions?",
      "Hello again! I recall you were interested in {previousTopic}. What would you like to explore today?"
    ])

    this.responseTemplates.set('technical_question', [
      "That's a great technical question! Based on David's experience with {technology}, here's what I can tell you: {technicalAnswer}. Would you like me to show you a specific example from his portfolio?",
      "Excellent question about {technology}! David has extensive experience in this area. {technicalAnswer}. I can share the GitHub repository or walk you through the implementation details. What would be most helpful?",
      "I love technical discussions! Regarding {technology}, David's approach is {technicalAnswer}. This is actually demonstrated in the {project} project. Want to see the code?"
    ])

    this.responseTemplates.set('project_interest', [
      "The {project} project is fascinating! It showcases David's {skills} expertise. {projectDescription}. Would you like to see the technical architecture, the live demo, or the source code?",
      "Great choice! {project} is one of David's standout projects. {projectDescription}. I can show you the implementation details, the business impact, or connect you with David to discuss similar work. What interests you most?",
      "{project} is a perfect example of David's Digital Polymat approach! {projectDescription}. This project demonstrates {skills}. Want to dive deeper into the technical details?"
    ])

    this.responseTemplates.set('trust_building', [
      "I understand the importance of trust in choosing the right technical partner. David has {credentials} and a track record of {achievements}. {specificEvidence}. What specific concerns can I address for you?",
      "Trust is crucial, and David's reputation speaks for itself: {achievements}. {specificEvidence}. I can share client testimonials, show you his certifications, or connect you directly with David. What would help build your confidence?",
      "Absolutely! David's credibility is built on {achievements} and {credentials}. {specificEvidence}. Would you like to see specific examples of his work or speak with him directly?"
    ])
  }

  public async processMessage(
    sessionId: string,
    userMessage: string,
    context?: Partial<ConversationContext>
  ): Promise<CodexResponse> {
    // Get or create conversation context
    let conversationContext = this.conversationContexts.get(sessionId)
    if (!conversationContext) {
      conversationContext = this.createNewContext(sessionId, context)
      this.conversationContexts.set(sessionId, conversationContext)
    }

    // Update context with new information
    if (context) {
      conversationContext = { ...conversationContext, ...context }
    }

    // Analyze user message
    const intent = this.analyzeIntent(userMessage)
    const entities = this.extractEntities(userMessage)
    const sentiment = this.analyzeSentiment(userMessage)

    // Store user message in memory
    this.memoryManager.storeMemory(
      sessionId,
      'episodic',
      `User said: "${userMessage}"`,
      { intent: intent.type, entities, sentiment },
      this.calculateMessageImportance(intent, entities)
    )

    // Update conversation memory
    this.updateMemory(conversationContext, userMessage, intent, entities)

    // Retrieve relevant memories for context
    const relevantMemories = this.memoryManager.retrieveMemories(sessionId, userMessage)
    const conversationSummary = this.memoryManager.getConversationSummary(sessionId)

    // Generate contextual response with memory
    const response = await this.generateResponse(conversationContext, intent, entities, userMessage, relevantMemories, conversationSummary)

    // Store bot response in memory
    this.memoryManager.storeMemory(
      sessionId,
      'episodic',
      `Codex responded: "${response.message}"`,
      { intent: intent.type, confidence: response.confidence, reasoning: response.reasoning },
      response.confidence * 10
    )

    // Update conversation context
    conversationContext.intentHistory.push(intent)
    conversationContext.lastActivity = new Date()
    this.conversationContexts.set(sessionId, conversationContext)

    return response
  }

  private createNewContext(sessionId: string, context?: Partial<ConversationContext>): ConversationContext {
    return {
      sessionId,
      currentPage: context?.currentPage || '/',
      visitHistory: [context?.currentPage || '/'],
      userProfile: {
        interests: [],
        technicalLevel: 'intermediate',
        previousInteractions: 0,
        leadScore: 0,
        tags: []
      },
      conversationMemory: {
        shortTerm: {
          currentTopic: '',
          mentionedProjects: [],
          askedQuestions: [],
          shownContent: [],
          userPreferences: {}
        },
        longTerm: {
          semanticFacts: [],
          episodicMemories: [],
          proceduralKnowledge: [],
          relationshipHistory: []
        }
      },
      intentHistory: [],
      lastActivity: new Date(),
      ...context
    }
  }

  private analyzeIntent(message: string): Intent {
    const lowerMessage = message.toLowerCase()
    let bestMatch: Intent = {
      type: 'question',
      confidence: 0.5,
      entities: [],
      sentiment: 'neutral',
      urgency: 'medium',
      timestamp: new Date()
    }

    // Check each intent pattern
    for (const [intentType, patterns] of this.intentPatterns.entries()) {
      for (const pattern of patterns) {
        if (pattern.test(message)) {
          bestMatch = {
            ...bestMatch,
            type: intentType as Intent['type'],
            confidence: Math.min(bestMatch.confidence + 0.3, 0.95)
          }
          break
        }
      }
    }

    // Analyze sentiment
    if (/(great|excellent|amazing|love|perfect|awesome)/i.test(message)) {
      bestMatch.sentiment = 'positive'
    } else if (/(bad|terrible|awful|hate|worst|horrible)/i.test(message)) {
      bestMatch.sentiment = 'negative'
    }

    // Analyze urgency
    if (/(urgent|asap|immediately|rush|deadline)/i.test(message)) {
      bestMatch.urgency = 'high'
    } else if (/(whenever|no rush|flexible|eventually)/i.test(message)) {
      bestMatch.urgency = 'low'
    }

    return bestMatch
  }

  private extractEntities(message: string): Entity[] {
    const entities: Entity[] = []

    for (const [entityType, patterns] of this.entityPatterns.entries()) {
      for (const pattern of patterns) {
        const matches = message.match(pattern)
        if (matches) {
          entities.push({
            type: entityType as Entity['type'],
            value: matches[0],
            confidence: 0.8
          })
        }
      }
    }

    return entities
  }

  private analyzeSentiment(message: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = /(good|great|excellent|amazing|love|like|perfect|awesome|fantastic|wonderful)/gi
    const negativeWords = /(bad|terrible|awful|hate|dislike|worst|horrible|disappointing|frustrating)/gi

    const positiveMatches = (message.match(positiveWords) || []).length
    const negativeMatches = (message.match(negativeWords) || []).length

    if (positiveMatches > negativeMatches) return 'positive'
    if (negativeMatches > positiveMatches) return 'negative'
    return 'neutral'
  }

  private updateMemory(
    context: ConversationContext, 
    message: string, 
    intent: Intent, 
    entities: Entity[]
  ): void {
    // Update short-term memory
    if (entities.length > 0) {
      entities.forEach(entity => {
        if (entity.type === 'project') {
          context.conversationMemory.shortTerm.mentionedProjects.push(entity.value)
        }
        if (entity.type === 'technology') {
          if (!context.userProfile.interests.includes(entity.value)) {
            context.userProfile.interests.push(entity.value)
          }
        }
      })
    }

    // Update user profile based on conversation
    if (intent.type === 'interest') {
      context.userProfile.leadScore += 10
    }
    if (intent.type === 'booking') {
      context.userProfile.leadScore += 20
    }
    if (intent.sentiment === 'positive') {
      context.userProfile.leadScore += 5
    }

    // Add to conversation history
    context.conversationMemory.shortTerm.askedQuestions.push(message)
  }

  private async generateResponse(
    context: ConversationContext,
    intent: Intent,
    entities: Entity[],
    userMessage: string,
    relevantMemories?: MemoryEntry[],
    conversationSummary?: ConversationSummary
  ): Promise<CodexResponse> {
    let responseMessage = ""
    let suggestedActions: string[] = []
    let quickReplies: string[] = []
    let reasoning = ""

    // Determine response based on intent and context
    if (intent.type === 'greeting') {
      if (context.userProfile.previousInteractions === 0) {
        responseMessage = this.getRandomTemplate('greeting_new_user')
        quickReplies = [
          "Tell me about David's experience",
          "Show me recent projects",
          "I need help with AI/ML",
          "Looking for a full-stack developer"
        ]
      } else {
        responseMessage = this.getRandomTemplate('greeting_returning_user')
          .replace('{previousTopic}', context.conversationMemory.shortTerm.currentTopic || 'your project')
      }
      reasoning = "User greeting detected, providing appropriate welcome based on interaction history"
    }

    else if (intent.type === 'question') {
      const techEntities = entities.filter(e => e.type === 'technology')
      const projectEntities = entities.filter(e => e.type === 'project')

      if (techEntities.length > 0) {
        responseMessage = this.getRandomTemplate('technical_question')
          .replace('{technology}', techEntities[0].value)
          .replace('{technicalAnswer}', this.getTechnicalAnswer(techEntities[0].value))
        suggestedActions = ["Show GitHub repository", "Explain implementation", "Schedule technical discussion"]
      } else if (projectEntities.length > 0) {
        responseMessage = this.getRandomTemplate('project_interest')
          .replace('{project}', projectEntities[0].value)
          .replace('{projectDescription}', this.getProjectDescription(projectEntities[0].value))
          .replace('{skills}', this.getProjectSkills(projectEntities[0].value))
        suggestedActions = ["View live demo", "See source code", "Discuss similar projects"]
      } else {
        responseMessage = this.generateContextualAnswer(userMessage, context)
      }
      reasoning = "Question detected, providing technical or project-specific information"
    }

    else if (intent.type === 'interest' || intent.type === 'request') {
      responseMessage = "That's exactly the kind of challenge David excels at! " + 
        this.generatePersonalizedRecommendation(context, entities)
      suggestedActions = ["Schedule consultation", "See relevant case studies", "Get project estimate"]
      quickReplies = ["Tell me more", "What's the timeline?", "Let's schedule a call"]
      reasoning = "High interest detected, moving toward conversion"
    }

    else if (intent.type === 'booking') {
      responseMessage = "Perfect! I'd love to connect you with David directly. " +
        "He's currently available for consultations and new projects. " +
        "Would you prefer a quick 15-minute intro call or a detailed 45-minute technical discussion?"
      suggestedActions = ["Book 15-min intro call", "Book 45-min technical call", "Send email instead"]
      reasoning = "Booking intent detected, facilitating direct connection"
    }

    else {
      responseMessage = this.generateFallbackResponse(userMessage, context)
      reasoning = "Fallback response for unclear intent"
    }

    return {
      message: responseMessage,
      intent,
      suggestedActions,
      quickReplies,
      confidence: intent.confidence,
      reasoning,
      toolsUsed: [],
      memoryUpdates: [],
      nextBestAction: this.determineNextBestAction(context, intent)
    }
  }

  private getRandomTemplate(templateKey: string): string {
    const templates = this.responseTemplates.get(templateKey) || ["I'm here to help!"]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  private getTechnicalAnswer(technology: string): string {
    const answers: Record<string, string> = {
      'react': "David has 20+ years of React experience, building scalable applications with modern hooks, context, and performance optimization",
      'ai': "David specializes in agentic AI systems using LangChain, OpenAI, and RAG implementations for real business value",
      'python': "Expert-level Python development for web APIs, AI/ML systems, and automation with FastAPI, Django, and data science libraries",
      'nextjs': "Advanced Next.js development with SSR, SSG, and performance optimization for enterprise applications",
      'docker': "Container orchestration and DevOps expertise with Docker, Kubernetes, and cloud deployment strategies"
    }
    return answers[technology.toLowerCase()] || "David has extensive experience with this technology and can provide detailed insights"
  }

  private getProjectDescription(project: string): string {
    const descriptions: Record<string, string> = {
      'zandbox': "A scalable FinTech platform built with Spring Boot microservices, handling secure financial transactions with enterprise-grade architecture",
      'trinitas': "SEO optimization project that achieved 35% traffic increase through technical improvements and content strategy",
      'iridescent': "David's own company showcasing full-stack development, AI integration, and comprehensive digital solutions"
    }
    return descriptions[project.toLowerCase()] || "An innovative project showcasing David's technical expertise and problem-solving approach"
  }

  private getProjectSkills(project: string): string {
    const skills: Record<string, string> = {
      'zandbox': "Spring Boot, microservices, FinTech, security, scalability",
      'trinitas': "SEO, performance optimization, analytics, content strategy",
      'iridescent': "full-stack development, AI integration, business strategy"
    }
    return skills[project.toLowerCase()] || "technical architecture, problem-solving, innovation"
  }

  private generateContextualAnswer(message: string, context: ConversationContext): string {
    // Generate contextual responses based on conversation history and user profile
    if (message.toLowerCase().includes('trustworthy') || message.toLowerCase().includes('reliable')) {
      return this.getRandomTemplate('trust_building')
        .replace('{credentials}', "Cisco certifications in cybersecurity and 20+ years of experience")
        .replace('{achievements}', "99.9% uptime across 100+ projects and zero security breaches")
        .replace('{specificEvidence}', "Currently trusted by Zandbox Global with their FinTech platform")
    }

    return "That's an interesting question! Based on David's experience as a Digital Polymat, I can provide insights into " +
      "his technical expertise, project experience, or approach to solving complex challenges. What specific aspect would you like to explore?"
  }

  private generatePersonalizedRecommendation(context: ConversationContext, entities: Entity[]): string {
    const interests = context.userProfile.interests
    const techLevel = context.userProfile.technicalLevel

    if (interests.includes('ai') || entities.some(e => e.value.toLowerCase().includes('ai'))) {
      return "David's AI expertise with LangChain and agentic systems would be perfect for your needs. " +
        "He's currently implementing intelligent automation at Zandbox that's reducing manual work by 40-70%."
    }

    if (interests.includes('fintech') || entities.some(e => e.value.toLowerCase().includes('fintech'))) {
      return "FinTech is David's current focus at Zandbox Global. His combination of technical skills and " +
        "Cisco-verified cybersecurity expertise ensures both functionality and regulatory compliance."
    }

    return "David's Digital Polymat approach means he can combine multiple expertise areas to create " +
      "innovative solutions that traditional specialists might miss. His unique perspective could be exactly what your project needs."
  }

  private generateFallbackResponse(message: string, context: ConversationContext): string {
    return "I want to make sure I understand exactly what you're looking for. " +
      "I can help you explore David's projects, technical expertise, or discuss how his Digital Polymat approach " +
      "might solve your specific challenges. What would be most valuable for you right now?"
  }

  private determineNextBestAction(context: ConversationContext, intent: Intent): string {
    if (context.userProfile.leadScore > 30) {
      return "schedule_consultation"
    }
    if (intent.type === 'interest') {
      return "show_case_study"
    }
    if (intent.type === 'question') {
      return "provide_technical_details"
    }
    return "continue_conversation"
  }

  public getConversationContext(sessionId: string): ConversationContext | undefined {
    return this.conversationContexts.get(sessionId)
  }

  public updateUserProfile(sessionId: string, updates: Partial<UserProfile>): void {
    const context = this.conversationContexts.get(sessionId)
    if (context) {
      context.userProfile = { ...context.userProfile, ...updates }
      this.conversationContexts.set(sessionId, context)
    }

    // Also update in memory manager
    this.memoryManager.updateUserProfile(sessionId, updates)
  }

  private calculateMessageImportance(intent: Intent, entities: Entity[]): number {
    let importance = 5 // Base importance

    // High importance for booking/hiring intents
    if (intent.type === 'booking') importance += 3
    if (intent.type === 'interest') importance += 2
    if (intent.type === 'request') importance += 2

    // High importance for technical entities
    if (entities.some(e => e.type === 'technology')) importance += 1
    if (entities.some(e => e.type === 'project')) importance += 1

    // Sentiment affects importance
    if (intent.sentiment === 'positive') importance += 1
    if (intent.sentiment === 'negative') importance += 2 // Negative feedback is important to address

    // Urgency affects importance
    if (intent.urgency === 'high') importance += 2

    return Math.min(importance, 10) // Cap at 10
  }

  public getMemoryManager(): ConversationMemoryManager {
    return this.memoryManager
  }

  public generateContextualPrompt(sessionId: string, userMessage: string): string {
    return this.memoryManager.generateContextualPrompt(sessionId, userMessage)
  }

  public getConversationSummary(sessionId: string): ConversationSummary | undefined {
    return this.memoryManager.getConversationSummary(sessionId)
  }

  public exportConversationData(sessionId: string): any {
    return this.memoryManager.exportConversationData(sessionId)
  }

  public getHighValueLeads(): ConversationSummary[] {
    return this.memoryManager.getHighValueLeads()
  }
}
