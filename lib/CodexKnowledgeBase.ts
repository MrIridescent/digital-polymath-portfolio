// Advanced Knowledge Base for Codex AI System
export interface KnowledgeDocument {
  id: string
  title: string
  content: string
  category: 'strategy' | 'technical' | 'philosophy' | 'deployment' | 'branding'
  keywords: string[]
  lastUpdated: Date
}

export interface ProjectRequirement {
  type: 'web' | 'ai' | 'fintech' | 'security' | 'mobile' | 'enterprise' | 'custom'
  budget: 'startup' | 'growth' | 'enterprise'
  timeline: 'urgent' | 'standard' | 'flexible'
  complexity: 'simple' | 'moderate' | 'complex' | 'enterprise'
  technologies: string[]
  industry: string
  specificNeeds: string[]
}

export interface CodexResponse {
  message: string
  confidence: number
  recommendations: string[]
  nextQuestions: string[]
  documentReferences: string[]
  estimatedScope: {
    timeline: string
    budget: string
    complexity: string
    keyDeliverables: string[]
  }
}

export class CodexKnowledgeBase {
  private knowledgeBase: KnowledgeDocument[] = []
  private initialized = false

  constructor() {
    this.initializeKnowledgeBase()
  }

  private async initializeKnowledgeBase() {
    if (this.initialized) return

    // Core knowledge documents from project files
    this.knowledgeBase = [
      {
        id: 'iridescent-codex',
        title: 'The Iridescent Codex: Modern Patronage Strategy',
        content: `Strategic approach to securing modern digital patronage inspired by Leonardo da Vinci's methods. 
        Key principles: audience-centric communication, capability framing as solutions, strategic positioning, 
        risk reversal, and conversion optimization. The Digital Polymat combines technical excellence with 
        strategic business acumen.`,
        category: 'strategy',
        keywords: ['patronage', 'strategy', 'leonardo', 'positioning', 'conversion'],
        lastUpdated: new Date()
      },
      {
        id: 'da-vinci-letter',
        title: 'Da Vinci Letter Analysis',
        content: `Leonardo's strategic letter to Ludovico Sforza demonstrates masterful capability positioning. 
        He framed diverse skills as direct solutions to patron needs: military engineering, architecture, 
        hydraulics, and artistic capabilities. Modern application: diagnose client challenges first, 
        then present capabilities as targeted solutions.`,
        category: 'strategy',
        keywords: ['leonardo', 'positioning', 'capabilities', 'solutions', 'patron'],
        lastUpdated: new Date()
      },
      {
        id: 'technical-stack',
        title: 'Technical Capabilities & Stack',
        content: `Full-stack development: React, Next.js, TypeScript, Node.js, Python, Java Spring Boot.
        AI Engineering: LangChain, OpenAI, RAG systems, vector databases, agentic AI.
        Cybersecurity: Cisco-verified (CyberTM, Ethical Hacker, Endpoint Security, CyberOps Associate).
        Cloud: AWS, Google Cloud, Docker, Kubernetes, microservices architecture.
        Creative: Adobe Creative Suite, UI/UX design, video production, color grading.`,
        category: 'technical',
        keywords: ['react', 'nextjs', 'ai', 'cybersecurity', 'cloud', 'fullstack'],
        lastUpdated: new Date()
      },
      {
        id: 'polymath-manifesto',
        title: 'Digital Polymat Philosophy',
        content: `The Digital Polymat embodies all nine of Howard Gardner's Multiple Intelligences:
        Logical-Mathematical, Linguistic, Spatial, Musical, Bodily-Kinesthetic, Interpersonal,
        Intrapersonal, Naturalistic, and Existential. This rare combination enables unique
        problem-solving approaches that transcend traditional boundaries.`,
        category: 'philosophy',
        keywords: ['polymat', 'multiple intelligences', 'gardner', 'philosophy', 'renaissance'],
        lastUpdated: new Date()
      },
      {
        id: 'project-experience',
        title: 'Project Portfolio & Experience',
        content: `20+ years coding experience. 100+ projects delivered with 99.9% uptime.
        Zandbox Global: Scalable fintech platform development.
        Trinitas Foundation: 35% SEO traffic increase.
        Real Estate Clients: 300% lead generation improvement.
        Enterprise Security: Zero breaches across all managed systems.`,
        category: 'technical',
        keywords: ['experience', 'projects', 'fintech', 'seo', 'security', 'results'],
        lastUpdated: new Date()
      },
      {
        id: 'deployment-expertise',
        title: 'Deployment & Infrastructure',
        content: `Expert in multiple deployment platforms: Netlify, Vercel, AWS Amplify, cPanel hosting.
        Specializes in SSR applications, performance optimization, and global CDN deployment.
        Focus on sub-3-second loading times and mobile-first responsive design.`,
        category: 'deployment',
        keywords: ['deployment', 'netlify', 'performance', 'ssr', 'mobile-first'],
        lastUpdated: new Date()
      }
    ]

    this.initialized = true
  }

  public async analyzeProjectRequirements(userInput: string, conversationHistory: string[]): Promise<CodexResponse> {
    await this.initializeKnowledgeBase()

    const requirements = this.extractRequirements(userInput, conversationHistory)
    const relevantKnowledge = this.findRelevantKnowledge(requirements)
    const response = this.generateResponse(requirements, relevantKnowledge, userInput)

    return response
  }

  private extractRequirements(userInput: string, history: string[]): ProjectRequirement {
    const input = userInput.toLowerCase()
    const fullContext = [...history, userInput].join(' ').toLowerCase()

    // Project type detection
    let type: ProjectRequirement['type'] = 'custom'
    if (input.includes('web') || input.includes('website')) type = 'web'
    else if (input.includes('ai') || input.includes('machine learning') || input.includes('intelligent')) type = 'ai'
    else if (input.includes('fintech') || input.includes('financial') || input.includes('payment')) type = 'fintech'
    else if (input.includes('security') || input.includes('cybersecurity')) type = 'security'
    else if (input.includes('mobile') || input.includes('app')) type = 'mobile'
    else if (input.includes('enterprise') || input.includes('large scale')) type = 'enterprise'

    // Budget estimation
    let budget: ProjectRequirement['budget'] = 'growth'
    if (fullContext.includes('startup') || fullContext.includes('small budget') || fullContext.includes('mvp')) budget = 'startup'
    else if (fullContext.includes('enterprise') || fullContext.includes('large scale') || fullContext.includes('50k')) budget = 'enterprise'

    // Timeline detection
    let timeline: ProjectRequirement['timeline'] = 'standard'
    if (input.includes('urgent') || input.includes('asap') || input.includes('quickly')) timeline = 'urgent'
    else if (input.includes('flexible') || input.includes('no rush')) timeline = 'flexible'

    // Complexity assessment
    let complexity: ProjectRequirement['complexity'] = 'moderate'
    if (input.includes('simple') || input.includes('basic')) complexity = 'simple'
    else if (input.includes('complex') || input.includes('advanced') || input.includes('enterprise')) complexity = 'enterprise'
    else if (input.includes('sophisticated') || input.includes('multiple')) complexity = 'complex'

    // Technology extraction
    const technologies: string[] = []
    const techKeywords = ['react', 'nextjs', 'ai', 'python', 'java', 'node', 'typescript', 'aws', 'docker']
    techKeywords.forEach(tech => {
      if (fullContext.includes(tech)) technologies.push(tech)
    })

    // Industry detection
    let industry = 'general'
    if (fullContext.includes('fintech') || fullContext.includes('financial')) industry = 'financial'
    else if (fullContext.includes('healthcare') || fullContext.includes('medical')) industry = 'healthcare'
    else if (fullContext.includes('education') || fullContext.includes('edtech')) industry = 'education'
    else if (fullContext.includes('real estate') || fullContext.includes('property')) industry = 'real-estate'

    return {
      type,
      budget,
      timeline,
      complexity,
      technologies,
      industry,
      specificNeeds: [userInput]
    }
  }

  private findRelevantKnowledge(requirements: ProjectRequirement): KnowledgeDocument[] {
    const relevant: KnowledgeDocument[] = []

    this.knowledgeBase.forEach(doc => {
      let relevanceScore = 0

      // Check for keyword matches
      doc.keywords.forEach(keyword => {
        if (requirements.type.includes(keyword) || 
            requirements.technologies.includes(keyword) ||
            requirements.industry.includes(keyword)) {
          relevanceScore += 2
        }
      })

      // Check content relevance
      const contentLower = doc.content.toLowerCase()
      if (contentLower.includes(requirements.type)) relevanceScore += 3
      if (contentLower.includes(requirements.industry)) relevanceScore += 2
      requirements.technologies.forEach(tech => {
        if (contentLower.includes(tech)) relevanceScore += 1
      })

      if (relevanceScore > 0) {
        relevant.push(doc)
      }
    })

    return relevant.sort((a, b) => b.keywords.length - a.keywords.length).slice(0, 3)
  }

  private generateResponse(
    requirements: ProjectRequirement, 
    knowledge: KnowledgeDocument[], 
    userInput: string
  ): CodexResponse {
    const confidence = this.calculateConfidence(requirements, knowledge)
    
    // Generate contextual response based on project type and knowledge
    let message = this.generateContextualMessage(requirements, knowledge, userInput)
    
    const recommendations = this.generateRecommendations(requirements, knowledge)
    const nextQuestions = this.generateNextQuestions(requirements)
    const estimatedScope = this.generateScopeEstimate(requirements)

    return {
      message,
      confidence,
      recommendations,
      nextQuestions,
      documentReferences: knowledge.map(k => k.title),
      estimatedScope
    }
  }

  private calculateConfidence(requirements: ProjectRequirement, knowledge: KnowledgeDocument[]): number {
    let confidence = 0.5 // Base confidence

    // Increase confidence based on knowledge matches
    if (knowledge.length > 0) confidence += 0.2
    if (knowledge.length > 2) confidence += 0.1

    // Increase confidence for known project types
    if (['web', 'ai', 'fintech', 'security'].includes(requirements.type)) confidence += 0.2

    return Math.min(confidence, 0.95) // Cap at 95%
  }

  private generateContextualMessage(
    requirements: ProjectRequirement,
    knowledge: KnowledgeDocument[],
    userInput: string
  ): string {
    // Check for trust/credibility questions first
    const lowerInput = userInput.toLowerCase()
    if (lowerInput.includes('trustworthy') || lowerInput.includes('trust') || lowerInput.includes('reliable')) {
      return this.generateTrustResponse(userInput)
    }

    if (lowerInput.includes('who is') || lowerInput.includes('tell me about') || lowerInput.includes('mr iridescent')) {
      return this.generatePersonalityResponse(userInput)
    }

    const projectTypeResponses: Record<string, string> = {
      web: "Oh, web applications! 🚀 That's right in David's wheelhouse - he's been crafting digital experiences for over 20 years. Just recently at Zandbox, he's building scalable fintech platforms that handle serious transaction volumes. What kind of web application are you envisioning? Something customer-facing, an internal tool, or maybe a complex dashboard?",
      ai: "AI projects - now we're talking! 🤖 David is absolutely passionate about this space. He's currently implementing agentic AI systems that actually think and make decisions, not just chatbots. At Zandbox, he's integrating AI into financial workflows. Are you thinking about automating processes, building intelligent features, or maybe creating something entirely new with AI?",
      fintech: "FinTech! 💰 Perfect timing - David is literally working on this right now at Zandbox Global. He combines deep technical skills with Cisco-verified cybersecurity expertise, which is crucial in finance. Plus, he understands the regulatory landscape. What aspect of fintech interests you - payments, trading platforms, compliance tools, or something else?",
      security: "Security is where David really shines! 🛡️ His Cisco certifications in Ethical Hacking, Cyber Threat Management, and Endpoint Security aren't just certificates on the wall - he actively uses this knowledge. Every system he builds is security-first. Are you dealing with vulnerabilities, need a security audit, or building something that needs to be bulletproof from day one?",
      mobile: "Mobile development! 📱 David takes a mobile-first approach to everything. He believes if it doesn't work beautifully on mobile, it doesn't work at all. His responsive designs adapt flawlessly across devices. Are you thinking native app, progressive web app, or maybe a hybrid approach?",
      enterprise: "Enterprise solutions! 🏢 David has been scaling systems for years - from his own company Iridescent Internet Solutions to enterprise clients. He thinks in terms of microservices, cloud infrastructure, and systems that grow with your business. What scale are we talking about here?",
      custom: "A unique challenge! 🎯 This is exactly what David loves - problems that don't fit into neat categories. His Digital Polymat approach means he can pull from cybersecurity, AI, full-stack development, and creative design all at once. Tell me more about what you're trying to achieve - I'm genuinely curious!"
    }

    let baseMessage = projectTypeResponses[requirements.type] || 
      "I understand you have a unique technical challenge. The Digital Polymat approach means bringing together diverse expertise to create innovative solutions."

    // Add knowledge-based context
    if (knowledge.length > 0) {
      const relevantExperience = knowledge.find(k => k.category === 'technical')
      if (relevantExperience) {
        baseMessage += ` Based on similar projects, this aligns well with proven capabilities in ${requirements.technologies.join(', ')} and ${requirements.industry} domain expertise.`
      }
    }

    return baseMessage
  }

  private generateTrustResponse(userInput: string): string {
    const trustResponses = [
      "Absolutely! 💯 David (Mr. Iridescent) has built his reputation over 20+ years with zero security breaches across 100+ projects. His Cisco certifications in Ethical Hacking and Cyber Threat Management aren't just for show - he actively protects every system he builds. Plus, he's currently trusted by Zandbox Global with their fintech platform. What specific aspect of trustworthiness concerns you?",
      "Great question! 🤝 David's track record speaks volumes - 99.9% uptime across all managed systems, 7+ years running Iridescent Internet Solutions, and currently employed at Zandbox Global. His clients have seen 35% SEO improvements and 300% lead generation increases. He's also transparent about his methods and always provides detailed documentation. What would help you feel more confident?",
      "I'm glad you asked! 🛡️ David's approach is security-first, transparency-focused, and results-driven. He's Cisco-verified in cybersecurity, has never had a client data breach, and provides regular progress updates. His philosophy is that trust is earned through consistent delivery and open communication. Would you like to see some specific client results or testimonials?"
    ]
    return trustResponses[Math.floor(Math.random() * trustResponses.length)]
  }

  private generatePersonalityResponse(userInput: string): string {
    const personalityResponses = [
      "David is fascinating! 🌟 He's what you'd call a 'Creatively Divergent Multipotentialite' - basically a modern Renaissance person. He embodies all nine of Howard Gardner's Multiple Intelligences, which is incredibly rare. Think Leonardo da Vinci but for the digital age. He's INTP/ENTP/INTJ personality-wise, loves solving complex puzzles, and has this amazing ability to see connections others miss. What specifically would you like to know about him?",
      "Mr. Iridescent (David) is genuinely one of the most interesting people I've learned about! 🎨 He started coding at 20 in 2004, founded his company in 2017, and now works at Zandbox while running his own consultancy. He's got this unique analytical mind that can jump from cybersecurity to AI to creative design seamlessly. Plus, he's studying Computer Science while working full-time - talk about dedication! What aspect of his background interests you most?",
      "David is the real deal! 🚀 He's not just technically brilliant (20+ years coding, Cisco cybersecurity expert, AI specialist) but also incredibly creative (Adobe Creative Suite master, video editing, color grading). He calls himself a Digital Polymat because he bridges multiple worlds - technology, security, creativity, and business strategy. He's also surprisingly philosophical, always thinking about the bigger picture. What draws you to want to know more about him?"
    ]
    return personalityResponses[Math.floor(Math.random() * personalityResponses.length)]
  }

  private generateRecommendations(requirements: ProjectRequirement, knowledge: KnowledgeDocument[]): string[] {
    const recommendations: string[] = []

    // Technology recommendations
    if (requirements.type === 'web') {
      recommendations.push("Consider Next.js with TypeScript for optimal performance and developer experience")
      recommendations.push("Implement progressive web app features for mobile-first experience")
    }

    if (requirements.type === 'ai') {
      recommendations.push("Utilize LangChain framework for robust AI agent architecture")
      recommendations.push("Implement RAG systems for knowledge-based AI responses")
    }

    if (requirements.type === 'fintech') {
      recommendations.push("Prioritize security-first development with comprehensive audit trails")
      recommendations.push("Implement microservices architecture for scalability and compliance")
    }

    // Budget-based recommendations
    if (requirements.budget === 'startup') {
      recommendations.push("Focus on MVP with core features, plan for iterative enhancement")
    } else if (requirements.budget === 'enterprise') {
      recommendations.push("Implement comprehensive testing, monitoring, and documentation")
    }

    return recommendations
  }

  private generateNextQuestions(requirements: ProjectRequirement): string[] {
    const questions: string[] = []

    // More conversational, human-like questions
    if (!requirements.technologies.length) {
      questions.push("I'm curious - what technologies are you currently working with? Or are you starting fresh and open to recommendations? 🤔")
    }

    if (requirements.timeline === 'standard') {
      questions.push("Timeline-wise, are you working towards a specific launch date, or do you have some flexibility? ⏰")
    }

    if (requirements.complexity === 'moderate') {
      questions.push("This sounds interesting! Are there any specific integrations or unique features that would make this project special? ✨")
    }

    // More engaging follow-up questions
    const engagingQuestions = [
      "Who's your target audience? I love understanding the human side of technology! 👥",
      "What's the main problem you're trying to solve for your users? 🎯",
      "Do you have any existing systems we'd need to play nicely with? 🔗",
      "What would success look like for this project? 📈",
      "Any particular challenges keeping you up at night about this project? 😅"
    ]

    questions.push(...engagingQuestions.slice(0, 2))

    return questions.slice(0, 2) // Keep it conversational, not overwhelming
  }

  private generateScopeEstimate(requirements: ProjectRequirement): CodexResponse['estimatedScope'] {
    const timelineMap = {
      simple: { startup: '2-4 weeks', growth: '3-6 weeks', enterprise: '4-8 weeks' },
      moderate: { startup: '4-8 weeks', growth: '6-12 weeks', enterprise: '8-16 weeks' },
      complex: { startup: '8-16 weeks', growth: '12-24 weeks', enterprise: '16-32 weeks' },
      enterprise: { startup: '16-24 weeks', growth: '20-40 weeks', enterprise: '24-52 weeks' }
    }

    const budgetMap = {
      simple: { startup: '$5K-15K', growth: '$10K-25K', enterprise: '$20K-50K' },
      moderate: { startup: '$15K-35K', growth: '$25K-60K', enterprise: '$50K-120K' },
      complex: { startup: '$35K-75K', growth: '$60K-150K', enterprise: '$120K-300K' },
      enterprise: { startup: '$75K-200K', growth: '$150K-500K', enterprise: '$300K-1M+' }
    }

    const deliverables = this.generateDeliverables(requirements)

    return {
      timeline: timelineMap[requirements.complexity][requirements.budget],
      budget: budgetMap[requirements.complexity][requirements.budget],
      complexity: requirements.complexity,
      keyDeliverables: deliverables
    }
  }

  private generateDeliverables(requirements: ProjectRequirement): string[] {
    const baseDeliverables = [
      'Technical architecture documentation',
      'Project timeline and milestones',
      'Regular progress updates and demos'
    ]

    const typeSpecificDeliverables: Record<string, string[]> = {
      web: ['Responsive web application', 'Performance optimization', 'SEO implementation'],
      ai: ['AI model training and deployment', 'API integration', 'Performance monitoring'],
      fintech: ['Security audit and compliance', 'Payment processing integration', 'Regulatory documentation'],
      security: ['Security assessment report', 'Vulnerability remediation', 'Security monitoring setup'],
      mobile: ['Cross-platform mobile app', 'App store deployment', 'Push notification system'],
      enterprise: ['Scalable infrastructure', 'Enterprise integrations', 'Comprehensive testing suite'],
      custom: ['Custom solution development', 'Integration planning', 'Technical documentation']
    }

    return [...baseDeliverables, ...(typeSpecificDeliverables[requirements.type] || [])]
  }
}
