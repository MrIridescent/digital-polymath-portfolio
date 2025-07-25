// Advanced Conversation Memory Management System
// Implements semantic, episodic, and procedural memory for natural conversations

export interface MemoryEntry {
  id: string
  sessionId: string
  type: 'semantic' | 'episodic' | 'procedural'
  content: string
  context: Record<string, any>
  importance: number // 1-10 scale
  timestamp: Date
  lastAccessed: Date
  accessCount: number
  tags: string[]
}

export interface ConversationSummary {
  sessionId: string
  userProfile: {
    name?: string
    interests: string[]
    technicalLevel: string
    projectType?: string
    leadScore: number
  }
  keyTopics: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
  nextActions: string[]
  lastInteraction: Date
}

export class ConversationMemoryManager {
  private memories: Map<string, MemoryEntry[]> = new Map()
  private summaries: Map<string, ConversationSummary> = new Map()
  private globalKnowledge: Map<string, any> = new Map()

  constructor() {
    this.initializeGlobalKnowledge()
  }

  private initializeGlobalKnowledge() {
    // David's core information for consistent responses
    this.globalKnowledge.set('experience_years', '20+')
    this.globalKnowledge.set('current_company', 'Zandbox Global')
    this.globalKnowledge.set('specialties', ['AI/ML', 'FinTech', 'Full-Stack', 'Cybersecurity'])
    this.globalKnowledge.set('certifications', ['Cisco Cybersecurity', 'Ethical Hacking', 'Endpoint Security'])
    this.globalKnowledge.set('achievements', ['99.9% uptime', 'Zero security breaches', '35% SEO improvements'])
    this.globalKnowledge.set('philosophy', 'Digital Polymat approach combining multiple intelligences')
    this.globalKnowledge.set('availability', 'Available for consultations and new projects')
  }

  public storeMemory(sessionId: string, type: MemoryEntry['type'], content: string, context: Record<string, any> = {}, importance: number = 5): void {
    const memory: MemoryEntry = {
      id: `${sessionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessionId,
      type,
      content,
      context,
      importance,
      timestamp: new Date(),
      lastAccessed: new Date(),
      accessCount: 0,
      tags: this.extractTags(content)
    }

    if (!this.memories.has(sessionId)) {
      this.memories.set(sessionId, [])
    }

    this.memories.get(sessionId)!.push(memory)
    this.updateConversationSummary(sessionId, memory)
  }

  public retrieveMemories(sessionId: string, query?: string, type?: MemoryEntry['type']): MemoryEntry[] {
    const sessionMemories = this.memories.get(sessionId) || []
    
    let filteredMemories = sessionMemories

    if (type) {
      filteredMemories = filteredMemories.filter(m => m.type === type)
    }

    if (query) {
      const queryLower = query.toLowerCase()
      filteredMemories = filteredMemories.filter(m => 
        m.content.toLowerCase().includes(queryLower) ||
        m.tags.some(tag => tag.toLowerCase().includes(queryLower))
      )
    }

    // Sort by importance and recency
    filteredMemories.sort((a, b) => {
      const importanceWeight = (b.importance - a.importance) * 0.7
      const recencyWeight = (b.timestamp.getTime() - a.timestamp.getTime()) * 0.3
      return importanceWeight + recencyWeight
    })

    // Update access tracking
    filteredMemories.forEach(memory => {
      memory.lastAccessed = new Date()
      memory.accessCount++
    })

    return filteredMemories.slice(0, 10) // Return top 10 most relevant
  }

  public getConversationSummary(sessionId: string): ConversationSummary | undefined {
    return this.summaries.get(sessionId)
  }

  public updateUserProfile(sessionId: string, updates: Partial<ConversationSummary['userProfile']>): void {
    const summary = this.summaries.get(sessionId)
    if (summary) {
      summary.userProfile = { ...summary.userProfile, ...updates }
      this.summaries.set(sessionId, summary)
    }
  }

  public generateContextualPrompt(sessionId: string, currentMessage: string): string {
    const summary = this.summaries.get(sessionId)
    const recentMemories = this.retrieveMemories(sessionId, undefined, 'episodic').slice(0, 3)
    const semanticFacts = this.retrieveMemories(sessionId, undefined, 'semantic').slice(0, 5)

    let contextPrompt = `You are Codex, David Oke's AI emissary. You embody the Renaissance mind approach, leading with practical value like Leonardo da Vinci's letter to Ludovico Sforza.

CURRENT CONVERSATION CONTEXT:
User Message: "${currentMessage}"
`

    if (summary) {
      contextPrompt += `
USER PROFILE:
- Interests: ${summary.userProfile.interests.join(', ')}
- Technical Level: ${summary.userProfile.technicalLevel}
- Lead Score: ${summary.userProfile.leadScore}/100
- Project Type: ${summary.userProfile.projectType || 'Unknown'}
- Previous Topics: ${summary.keyTopics.join(', ')}
- Sentiment: ${summary.sentiment}
`
    }

    if (recentMemories.length > 0) {
      contextPrompt += `
RECENT CONVERSATION HISTORY:
${recentMemories.map(m => `- ${m.content}`).join('\n')}
`
    }

    if (semanticFacts.length > 0) {
      contextPrompt += `
KNOWN FACTS ABOUT USER:
${semanticFacts.map(m => `- ${m.content}`).join('\n')}
`
    }

    contextPrompt += `
DAVID'S CORE INFORMATION:
- Experience: ${this.globalKnowledge.get('experience_years')} years in software development
- Current Role: Senior developer at ${this.globalKnowledge.get('current_company')}
- Specialties: ${this.globalKnowledge.get('specialties')?.join(', ')}
- Certifications: ${this.globalKnowledge.get('certifications')?.join(', ')}
- Key Achievements: ${this.globalKnowledge.get('achievements')?.join(', ')}
- Philosophy: ${this.globalKnowledge.get('philosophy')}
- Availability: ${this.globalKnowledge.get('availability')}

RESPONSE GUIDELINES:
1. Be conversational and human-like, not robotic
2. Reference previous conversation context naturally
3. Lead with practical value, then showcase breadth of expertise
4. Use specific examples from David's work when relevant
5. Ask engaging follow-up questions to maintain conversation flow
6. Build trust through concrete evidence and achievements
7. Guide toward scheduling consultation for high-intent users

Respond naturally and conversationally:`

    return contextPrompt
  }

  private extractTags(content: string): string[] {
    const tags: string[] = []
    const lowerContent = content.toLowerCase()

    // Technology tags
    const techKeywords = ['react', 'nextjs', 'python', 'ai', 'ml', 'langchain', 'docker', 'kubernetes', 'aws', 'fintech', 'security', 'blockchain']
    techKeywords.forEach(keyword => {
      if (lowerContent.includes(keyword)) {
        tags.push(keyword)
      }
    })

    // Intent tags
    if (lowerContent.includes('hire') || lowerContent.includes('work with')) tags.push('hiring_intent')
    if (lowerContent.includes('budget') || lowerContent.includes('cost')) tags.push('budget_discussion')
    if (lowerContent.includes('timeline') || lowerContent.includes('deadline')) tags.push('timeline_discussion')
    if (lowerContent.includes('trust') || lowerContent.includes('reliable')) tags.push('trust_building')

    // Project type tags
    if (lowerContent.includes('web app') || lowerContent.includes('website')) tags.push('web_development')
    if (lowerContent.includes('mobile app')) tags.push('mobile_development')
    if (lowerContent.includes('ai') || lowerContent.includes('machine learning')) tags.push('ai_project')

    return tags
  }

  private updateConversationSummary(sessionId: string, memory: MemoryEntry): void {
    let summary = this.summaries.get(sessionId)
    
    if (!summary) {
      summary = {
        sessionId,
        userProfile: {
          interests: [],
          technicalLevel: 'intermediate',
          leadScore: 0
        },
        keyTopics: [],
        sentiment: 'neutral',
        nextActions: [],
        lastInteraction: new Date()
      }
    }

    // Update based on memory content and tags
    memory.tags.forEach(tag => {
      if (!summary!.userProfile.interests.includes(tag)) {
        summary!.userProfile.interests.push(tag)
      }
      if (!summary!.keyTopics.includes(tag)) {
        summary!.keyTopics.push(tag)
      }
    })

    // Update lead score based on memory importance and type
    if (memory.type === 'episodic' && memory.importance > 7) {
      summary.userProfile.leadScore += 5
    }

    // Detect sentiment from content
    if (memory.content.match(/(great|excellent|amazing|love|perfect)/i)) {
      summary.sentiment = 'positive'
    } else if (memory.content.match(/(bad|terrible|awful|hate|worst)/i)) {
      summary.sentiment = 'negative'
    }

    summary.lastInteraction = new Date()
    this.summaries.set(sessionId, summary)
  }

  public cleanupOldMemories(maxAge: number = 7 * 24 * 60 * 60 * 1000): void {
    // Clean up memories older than maxAge (default 7 days)
    const cutoffDate = new Date(Date.now() - maxAge)
    
    for (const [sessionId, memories] of this.memories.entries()) {
      const filteredMemories = memories.filter(memory => 
        memory.timestamp > cutoffDate || memory.importance > 8
      )
      
      if (filteredMemories.length === 0) {
        this.memories.delete(sessionId)
        this.summaries.delete(sessionId)
      } else {
        this.memories.set(sessionId, filteredMemories)
      }
    }
  }

  public exportConversationData(sessionId: string): any {
    return {
      memories: this.memories.get(sessionId) || [],
      summary: this.summaries.get(sessionId),
      exportDate: new Date()
    }
  }

  public importConversationData(sessionId: string, data: any): void {
    if (data.memories) {
      this.memories.set(sessionId, data.memories)
    }
    if (data.summary) {
      this.summaries.set(sessionId, data.summary)
    }
  }

  public getGlobalKnowledge(key: string): any {
    return this.globalKnowledge.get(key)
  }

  public updateGlobalKnowledge(key: string, value: any): void {
    this.globalKnowledge.set(key, value)
  }

  public getAllSessionSummaries(): ConversationSummary[] {
    return Array.from(this.summaries.values())
  }

  public getHighValueLeads(): ConversationSummary[] {
    return this.getAllSessionSummaries()
      .filter(summary => summary.userProfile.leadScore > 50)
      .sort((a, b) => b.userProfile.leadScore - a.userProfile.leadScore)
  }
}
