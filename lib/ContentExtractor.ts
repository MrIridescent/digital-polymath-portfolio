export interface Quote {
  text: string
  author: string
  category: 'vision' | 'innovation' | 'technology' | 'philosophy' | 'execution'
  source?: string
}

export interface PortfolioContent {
  quotes: Quote[]
  features: string[]
  skills: string[]
  philosophies: string[]
  achievements: string[]
}

export class ContentExtractor {
  private static instance: ContentExtractor
  private content: PortfolioContent

  private constructor() {
    this.content = this.extractContent()
  }

  public static getInstance(): ContentExtractor {
    if (!ContentExtractor.instance) {
      ContentExtractor.instance = new ContentExtractor()
    }
    return ContentExtractor.instance
  }

  private extractContent(): PortfolioContent {
    return {
      quotes: [
        // Vision & Future
        {
          text: "The present is theirs; the future, for which I really worked, is mine.",
          author: "Nikola Tesla",
          category: "vision"
        },
        {
          text: "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.",
          author: "Tim Berners-Lee",
          category: "vision"
        },
        {
          text: "When wireless is perfectly applied the whole earth will be converted into a huge brain... A man will be able to carry one in his vest pocket.",
          author: "Nikola Tesla",
          category: "vision"
        },
        {
          text: "If you get up in the morning and think the future is going to be better, it is a bright day. Otherwise, it's not.",
          author: "Elon Musk",
          category: "vision"
        },

        // Innovation & Technology
        {
          text: "Innovation distinguishes between a leader and a follower.",
          author: "Steve Jobs",
          category: "innovation"
        },
        {
          text: "People don't know what they want until you show it to them... Our task is to read things that are not yet on the page.",
          author: "Steve Jobs",
          category: "innovation"
        },
        {
          text: "Innovation is saying no to 1,000 things.",
          author: "Steve Jobs",
          category: "innovation"
        },
        {
          text: "The people who are crazy enough to think they can change the world are the ones who do.",
          author: "Steve Jobs",
          category: "innovation"
        },
        {
          text: "Disruptors don't have to discover something new; they just have to discover a practical use for new discoveries.",
          author: "Jay Samit",
          category: "innovation"
        },

        // Technology & Computing
        {
          text: "The introduction of parallel computing into mathematics is a quantum shift that's comparable to the introduction of quantum mechanics into physics.",
          author: "Philip Emeagwali",
          category: "technology"
        },
        {
          text: "Today, your cell phone has more computer power than all of NASA back in 1969... The Sony PlayStation of today... has the power of a military supercomputer of 1997.",
          author: "Michio Kaku",
          category: "technology"
        },
        {
          text: "The advance of technology is really about making it disappear.",
          author: "Mark Weiser",
          category: "technology"
        },
        {
          text: "By placing intelligence at the edges rather than control in the middle of the network, the Internet has created a platform for innovation.",
          author: "Vint Cerf",
          category: "technology"
        },

        // Philosophy & Thinking
        {
          text: "If you are not completely confused by quantum mechanics, you do not understand it.",
          author: "John Wheeler",
          category: "philosophy"
        },
        {
          text: "The 'paradox' is only a conflict between reality and your feeling of what reality 'ought to be'.",
          author: "Richard Feynman",
          category: "philosophy"
        },
        {
          text: "The internet is a reflection of our society and that mirror is going to be reflecting what we see. If we do not like what we see... we have to fix society.",
          author: "Vint Cerf",
          category: "philosophy"
        },
        {
          text: "The web is more a social creation than a technical one. I designed it for a social effect – to help people work together...",
          author: "Tim Berners-Lee",
          category: "philosophy"
        },

        // Execution & Building
        {
          text: "Great execution is at least 10 times more important and a 100 times harder than a good idea.",
          author: "Sam Altman",
          category: "execution"
        },
        {
          text: "Brilliant thinking is rare, but courage is in even shorter supply than genius.",
          author: "Peter Thiel",
          category: "execution"
        },
        {
          text: "Failure is an option here. If things are not failing, you are not innovating enough.",
          author: "Elon Musk",
          category: "execution"
        },
        {
          text: "A startup is the largest endeavor over which you can have definite mastery. You can have agency not just over your own life, but over a small and important part of the world.",
          author: "Peter Thiel",
          category: "execution"
        }
      ],

      features: [
        "Polymathic approach to software engineering",
        "Full-stack development with systems thinking",
        "Cybersecurity expertise and threat mitigation",
        "AI/ML implementation and optimization",
        "Blockchain and emerging technology integration",
        "Cloud architecture and microservices design",
        "DevOps and CI/CD pipeline automation",
        "Technical leadership and team mentoring",
        "Cross-functional collaboration and communication",
        "Rapid prototyping and MVP development"
      ],

      skills: [
        "React.js & Next.js ecosystem mastery",
        "Node.js & TypeScript backend development",
        "Python for AI/ML and data science",
        "Cybersecurity frameworks and penetration testing",
        "Cloud platforms (AWS, Azure, GCP)",
        "Docker & Kubernetes orchestration",
        "Database design and optimization",
        "API design and microservices architecture",
        "Blockchain development and smart contracts",
        "Technical writing and documentation"
      ],

      philosophies: [
        "Systems over Silos: View software as living systems where every component influences the whole",
        "Outcomes over Output: Measure success by tangible impact delivered to users and business",
        "Resilience over Rigidity: Design systems that anticipate and embrace change",
        "Craft over Code: Approach development with craftsperson mindset prioritizing quality and elegance",
        "Context over Content: Understand that right context is more critical than more information",
        "Curiosità: Maintain insatiable curiosity and continuous learning",
        "Dimostrazione: Test knowledge through real-world application and learn from mistakes",
        "Sfumato: Embrace ambiguity and find opportunity in uncertainty",
        "Arte/Scienza: Balance analytical expertise with creative and strategic understanding",
        "Connessione: Recognize and appreciate the interconnectedness of all systems"
      ],

      achievements: [
        "University Graduate (2015) - Computer Science Foundation",
        "NIIT Training (2004) - Early Technology Immersion",
        "Industry Certifications - A+, N+, Cisco, Cybersecurity",
        "Freelance Security Consulting - Independent Practice",
        "Open Source Contributions - Community Engagement",
        "Technical Writing - Knowledge Sharing",
        "Polymathic Portfolio Development - Interdisciplinary Approach",
        "AI/ML Project Implementation - Cutting-edge Technology",
        "Blockchain Development - Emerging Technology Adoption",
        "Full-Stack Architecture - Comprehensive System Design"
      ]
    }
  }

  public getQuotes(): Quote[] {
    return this.content.quotes
  }

  public getQuotesByCategory(category: Quote['category']): Quote[] {
    return this.content.quotes.filter(quote => quote.category === category)
  }

  public getRandomQuote(): Quote {
    const quotes = this.content.quotes
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  public getRandomQuotes(count: number): Quote[] {
    const quotes = [...this.content.quotes]
    const selected: Quote[] = []
    
    for (let i = 0; i < count && quotes.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      selected.push(quotes.splice(randomIndex, 1)[0])
    }
    
    return selected
  }

  public getFeatures(): string[] {
    return this.content.features
  }

  public getSkills(): string[] {
    return this.content.skills
  }

  public getPhilosophies(): string[] {
    return this.content.philosophies
  }

  public getAchievements(): string[] {
    return this.content.achievements
  }

  public getAllContent(): PortfolioContent {
    return { ...this.content }
  }
}
