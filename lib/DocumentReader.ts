// Document Reader for Codex Knowledge Base
export interface DocumentContent {
  filename: string
  content: string
  category: 'strategy' | 'technical' | 'philosophy' | 'deployment' | 'branding' | 'manifesto'
  keywords: string[]
  summary: string
}

export class DocumentReader {
  private documents: DocumentContent[] = []
  private initialized = false

  constructor() {
    this.initializeDocuments()
  }

  private async initializeDocuments() {
    if (this.initialized) return

    // Core project documents - in production, these would be read from files
    this.documents = [
      {
        filename: 'The-Iridescent-Codex_ A Polymath\'s Strategy for Modern Patronage, Inspired by da Vinci.txt',
        content: `
        The Iridescent Codex: A Polymath's Strategy for Modern Patronage, Inspired by da Vinci

        Part I: The Renaissance Parallel - Understanding Modern Patronage
        
        In the Renaissance, a polymath like Leonardo da Vinci didn't simply wait for opportunities to find him. He strategically positioned himself, crafted compelling narratives around his capabilities, and secured patronage through a combination of demonstrated excellence and strategic communication. The modern Digital Polymat faces a similar challenge: how to secure consistent, high-value clients (modern patrons) in a crowded marketplace.

        Part II: The Strategic Framework
        
        1. Audience-Centric Communication: Like Leonardo's letter to Ludovico Sforza, modern polymaths must frame their diverse capabilities as direct solutions to patron needs.
        
        2. Risk Reversal: Demonstrate confidence through guarantees, case studies, and proven methodologies.
        
        3. Strategic Positioning: Position as the unique solution to complex, multi-disciplinary challenges.
        
        4. Conversion Optimization: Create clear pathways from initial contact to project engagement.

        Part III: The Digital Polymat Advantage
        
        The Digital Polymat combines:
        - Technical Excellence: 20+ years of coding experience
        - Business Acumen: Strategic thinking and ROI focus
        - Creative Vision: Design thinking and aesthetic sensibility
        - Security Expertise: Cisco-verified cybersecurity credentials
        - AI Innovation: Cutting-edge AI and automation capabilities

        Part IV: The Polymath's Automaton - Engineering a Modern 'Courtier' Bot
        
        The intelligent customer acquisition bot serves as a digital emissary, qualifying prospects and preparing them for direct consultation. This system handles initial project scoping, budget qualification, and technical assessment, allowing the polymath to focus on high-value strategic work.
        `,
        category: 'strategy',
        keywords: ['patronage', 'strategy', 'leonardo', 'positioning', 'conversion', 'polymat'],
        summary: 'Strategic framework for modern digital patronage inspired by Leonardo da Vinci\'s approach to securing Renaissance patrons.'
      },
      {
        filename: 'Da Vinci Letter, Digital Polymath_.txt',
        content: `
        Analysis of Leonardo da Vinci's Strategic Letter to Ludovico Sforza

        Leonardo's letter demonstrates masterful capability positioning:
        
        1. Military Engineering: "I have plans for very light, strong and easily portable bridges"
        2. Siege Warfare: "I will make covered vehicles, safe and unassailable"
        3. Naval Engineering: "I have methods for destroying every rock or other fortress"
        4. Architecture: "I can give perfect satisfaction in architecture"
        5. Hydraulics: "I can carry out sculpture in marble, bronze, or clay"

        Modern Application:
        - Diagnose client challenges first
        - Present capabilities as targeted solutions
        - Frame diverse skills as strategic advantages
        - Demonstrate confidence through specific examples
        - Create urgency through unique positioning

        The Digital Polymat Parallel:
        Instead of listing "full-stack developer, AI engineer, cybersecurity expert," frame as:
        "I architect scalable digital ecosystems that eliminate technical debt while ensuring enterprise-grade security and intelligent automation."
        `,
        category: 'strategy',
        keywords: ['leonardo', 'positioning', 'capabilities', 'solutions', 'patron', 'strategy'],
        summary: 'Analysis of Leonardo\'s strategic communication methods and their application to modern digital consulting.'
      },
      {
        filename: 'Architecting Value_ A Manifesto for the Digital Polymath.txt',
        content: `
        Architecting Value: A Manifesto for the Digital Polymath

        The Digital Polymat Principles:

        1. Synthesis Over Specialization
        True value comes from connecting disparate domains - combining AI with cybersecurity, merging creative design with technical architecture, integrating business strategy with implementation.

        2. Systems Thinking
        Every project is part of a larger ecosystem. The Digital Polymat sees connections, dependencies, and opportunities that specialists miss.

        3. Future-Focused Innovation
        While others solve today's problems with yesterday's tools, the Digital Polymat anticipates tomorrow's challenges and builds solutions that evolve.

        4. Human-Centered Technology
        Technology serves humanity, not the reverse. Every system must be intuitive, accessible, and emotionally resonant.

        5. Continuous Evolution
        The Digital Polymat never stops learning, adapting, and growing. Mastery is a journey, not a destination.

        Core Capabilities:
        - Full-Stack Development: React, Next.js, TypeScript, Node.js, Python, Java
        - AI Engineering: LangChain, OpenAI, RAG systems, agentic AI
        - Cybersecurity: Cisco-verified expertise in threat management and ethical hacking
        - Creative Design: Adobe Creative Suite, UI/UX, video production
        - Business Strategy: ROI optimization, digital transformation, process automation
        `,
        category: 'manifesto',
        keywords: ['polymat', 'manifesto', 'principles', 'synthesis', 'systems thinking', 'innovation'],
        summary: 'Core principles and philosophy of the Digital Polymat approach to technology and business.'
      },
      {
        filename: 'WebappTech Stack_.txt',
        content: `
        Modern Web Application Technology Stack

        Frontend Excellence:
        - React 18+ with TypeScript for type-safe, scalable applications
        - Next.js 14+ for SSR, SSG, and optimal performance
        - Tailwind CSS for responsive, maintainable styling
        - Framer Motion for smooth, professional animations
        - Lucide React for consistent, scalable iconography

        Backend Architecture:
        - Node.js with Express for JavaScript-based APIs
        - Java Spring Boot for enterprise-grade microservices
        - Python FastAPI for AI/ML integration
        - PostgreSQL for relational data
        - Redis for caching and session management

        AI Integration:
        - LangChain for agentic AI systems
        - OpenAI GPT models for natural language processing
        - Vector databases for RAG implementations
        - Custom AI agents for business automation

        Security Implementation:
        - OWASP security standards
        - JWT authentication with refresh tokens
        - Rate limiting and DDoS protection
        - HTTPS/TLS encryption
        - Regular security audits and penetration testing

        Deployment & DevOps:
        - Docker containerization
        - Kubernetes orchestration
        - CI/CD pipelines with GitHub Actions
        - AWS/Google Cloud infrastructure
        - Monitoring with Prometheus and Grafana
        `,
        category: 'technical',
        keywords: ['react', 'nextjs', 'typescript', 'ai', 'security', 'deployment', 'stack'],
        summary: 'Comprehensive technology stack for modern web applications with AI integration and enterprise security.'
      },
      {
        filename: 'Emerging Digital Tech_ 2023-2026_.txt',
        content: `
        Emerging Digital Technologies: 2023-2026 Outlook

        AI & Machine Learning Trends:
        - Agentic AI systems that can reason and take actions
        - Multimodal AI combining text, image, and audio processing
        - Edge AI for real-time, privacy-preserving applications
        - AI-powered code generation and software development

        Web Development Evolution:
        - Server Components and streaming for better performance
        - Progressive Web Apps becoming indistinguishable from native
        - WebAssembly for near-native performance in browsers
        - Micro-frontends for scalable enterprise applications

        Cybersecurity Advances:
        - Zero-trust architecture becoming standard
        - AI-powered threat detection and response
        - Quantum-resistant cryptography preparation
        - Automated compliance and audit systems

        Cloud & Infrastructure:
        - Serverless-first architecture
        - Edge computing for global performance
        - Multi-cloud strategies for resilience
        - Infrastructure as Code (IaC) standardization

        Business Impact:
        - Automation of knowledge work
        - Personalized customer experiences at scale
        - Real-time decision making with AI insights
        - Sustainable technology practices
        `,
        category: 'technical',
        keywords: ['ai', 'trends', 'web development', 'cybersecurity', 'cloud', 'automation'],
        summary: 'Analysis of emerging digital technologies and their business impact from 2023-2026.'
      }
    ]

    this.initialized = true
  }

  public async searchDocuments(query: string, category?: DocumentContent['category']): Promise<DocumentContent[]> {
    await this.initializeDocuments()

    const queryLower = query.toLowerCase()
    const results: DocumentContent[] = []

    this.documents.forEach(doc => {
      if (category && doc.category !== category) return

      let relevanceScore = 0

      // Check keywords
      doc.keywords.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          relevanceScore += 3
        }
      })

      // Check content
      if (doc.content.toLowerCase().includes(queryLower)) {
        relevanceScore += 2
      }

      // Check summary
      if (doc.summary.toLowerCase().includes(queryLower)) {
        relevanceScore += 1
      }

      if (relevanceScore > 0) {
        results.push(doc)
      }
    })

    return results.sort((a, b) => b.keywords.length - a.keywords.length)
  }

  public async getDocumentByFilename(filename: string): Promise<DocumentContent | null> {
    await this.initializeDocuments()
    return this.documents.find(doc => doc.filename === filename) || null
  }

  public async getAllDocuments(): Promise<DocumentContent[]> {
    await this.initializeDocuments()
    return [...this.documents]
  }

  public async getDocumentsByCategory(category: DocumentContent['category']): Promise<DocumentContent[]> {
    await this.initializeDocuments()
    return this.documents.filter(doc => doc.category === category)
  }

  public extractKeyInsights(content: string): string[] {
    const insights: string[] = []
    
    // Extract numbered points
    const numberedPoints = content.match(/\d+\.\s+([^.]+\.)/g)
    if (numberedPoints) {
      insights.push(...numberedPoints.map(point => point.trim()))
    }

    // Extract bullet points
    const bulletPoints = content.match(/[-•]\s+([^.]+\.)/g)
    if (bulletPoints) {
      insights.push(...bulletPoints.map(point => point.replace(/^[-•]\s+/, '').trim()))
    }

    // Extract sentences with key phrases
    const keyPhrases = ['key', 'important', 'critical', 'essential', 'fundamental', 'core', 'primary']
    const sentences = content.split(/[.!?]+/)
    
    sentences.forEach(sentence => {
      const sentenceLower = sentence.toLowerCase()
      if (keyPhrases.some(phrase => sentenceLower.includes(phrase))) {
        insights.push(sentence.trim() + '.')
      }
    })

    return insights.slice(0, 5) // Return top 5 insights
  }

  public generateContextualResponse(query: string, documents: DocumentContent[]): string {
    if (documents.length === 0) {
      return "I understand you're interested in discussing a project. Based on my comprehensive experience as a Digital Polymat, I can help you explore innovative solutions that combine technical excellence with strategic business value."
    }

    const relevantDoc = documents[0]
    const insights = this.extractKeyInsights(relevantDoc.content)
    
    let response = `Based on the ${relevantDoc.category} expertise documented in "${relevantDoc.summary}", `
    
    if (insights.length > 0) {
      response += `here are key considerations: ${insights[0]} `
    }
    
    response += `This aligns with the Digital Polymat approach of combining ${relevantDoc.keywords.slice(0, 3).join(', ')} to create comprehensive solutions.`
    
    return response
  }
}
