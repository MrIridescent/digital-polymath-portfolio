// Granular Service Catalog with Detailed Sub-services and Micro-services
import { CurrencySystem, PriceRange } from './CurrencySystem'

export interface MicroService {
  id: string
  name: string
  description: string
  estimatedHours: number
  complexity: 'simple' | 'moderate' | 'complex'
  prerequisites: string[]
  deliverables: string[]
  pricingUSD: {
    individual: number
    startup: number
    smb: number
    enterprise: number
  }
}

export interface ServicePackage {
  id: string
  name: string
  description: string
  category: string
  subcategory: string
  microServices: string[] // IDs of included micro-services
  bundleDiscount: number // Percentage discount for bundle
  estimatedDuration: string
  targetMarket: ('individual' | 'startup' | 'smb' | 'enterprise')[]
  customizable: boolean
  addOns: string[] // IDs of optional add-on services
}

export interface ProjectType {
  id: string
  name: string
  description: string
  category: string
  industry?: string[]
  complexity: 'simple' | 'moderate' | 'complex' | 'enterprise'
  typicalServices: string[] // Service package IDs
  commonFeatures: string[]
  estimatedTimeframe: string
  successMetrics: string[]
  examples: string[]
}

export class GranularServiceCatalog {
  private currencySystem: CurrencySystem
  private microServices: Map<string, MicroService> = new Map()
  private servicePackages: Map<string, ServicePackage> = new Map()
  private projectTypes: Map<string, ProjectType> = new Map()

  constructor() {
    this.currencySystem = new CurrencySystem()
    this.initializeMicroServices()
    this.initializeServicePackages()
    this.initializeProjectTypes()
  }

  private initializeMicroServices(): void {
    const microServices: MicroService[] = [
      // FRONTEND DEVELOPMENT MICRO-SERVICES
      {
        id: 'responsive-design',
        name: 'Responsive Web Design',
        description: 'Mobile-first responsive design implementation',
        estimatedHours: 8,
        complexity: 'moderate',
        prerequisites: ['design-mockups'],
        deliverables: ['Responsive CSS', 'Mobile optimization', 'Cross-browser testing'],
        pricingUSD: { individual: 800, startup: 1200, smb: 1600, enterprise: 2400 }
      },
      {
        id: 'react-component-library',
        name: 'Custom React Component Library',
        description: 'Reusable React components with TypeScript',
        estimatedHours: 16,
        complexity: 'complex',
        prerequisites: ['design-system'],
        deliverables: ['Component library', 'Storybook documentation', 'TypeScript definitions'],
        pricingUSD: { individual: 1600, startup: 2400, smb: 3200, enterprise: 4800 }
      },
      {
        id: 'ui-animations',
        name: 'UI Animations & Interactions',
        description: 'Smooth animations and micro-interactions',
        estimatedHours: 6,
        complexity: 'moderate',
        prerequisites: ['ui-design'],
        deliverables: ['Animation library', 'Interaction patterns', 'Performance optimization'],
        pricingUSD: { individual: 600, startup: 900, smb: 1200, enterprise: 1800 }
      },
      {
        id: 'pwa-implementation',
        name: 'Progressive Web App Features',
        description: 'PWA capabilities including offline support',
        estimatedHours: 12,
        complexity: 'complex',
        prerequisites: ['web-application'],
        deliverables: ['Service worker', 'Offline functionality', 'App manifest', 'Push notifications'],
        pricingUSD: { individual: 1200, startup: 1800, smb: 2400, enterprise: 3600 }
      },

      // BACKEND DEVELOPMENT MICRO-SERVICES
      {
        id: 'rest-api-development',
        name: 'RESTful API Development',
        description: 'Scalable REST API with documentation',
        estimatedHours: 20,
        complexity: 'moderate',
        prerequisites: ['database-design'],
        deliverables: ['REST API', 'API documentation', 'Authentication', 'Rate limiting'],
        pricingUSD: { individual: 2000, startup: 3000, smb: 4000, enterprise: 6000 }
      },
      {
        id: 'graphql-api',
        name: 'GraphQL API Implementation',
        description: 'Flexible GraphQL API with real-time subscriptions',
        estimatedHours: 24,
        complexity: 'complex',
        prerequisites: ['database-design'],
        deliverables: ['GraphQL schema', 'Resolvers', 'Subscriptions', 'GraphQL playground'],
        pricingUSD: { individual: 2400, startup: 3600, smb: 4800, enterprise: 7200 }
      },
      {
        id: 'database-optimization',
        name: 'Database Design & Optimization',
        description: 'Efficient database schema and query optimization',
        estimatedHours: 16,
        complexity: 'complex',
        prerequisites: ['requirements-analysis'],
        deliverables: ['Database schema', 'Indexes', 'Query optimization', 'Migration scripts'],
        pricingUSD: { individual: 1600, startup: 2400, smb: 3200, enterprise: 4800 }
      },
      {
        id: 'microservices-architecture',
        name: 'Microservices Architecture',
        description: 'Scalable microservices with Docker containers',
        estimatedHours: 40,
        complexity: 'complex',
        prerequisites: ['system-architecture'],
        deliverables: ['Service architecture', 'Docker containers', 'API gateway', 'Service mesh'],
        pricingUSD: { individual: 4000, startup: 6000, smb: 8000, enterprise: 12000 }
      },

      // AUTHENTICATION & SECURITY MICRO-SERVICES
      {
        id: 'jwt-authentication',
        name: 'JWT Authentication System',
        description: 'Secure JWT-based authentication',
        estimatedHours: 8,
        complexity: 'moderate',
        prerequisites: ['user-management'],
        deliverables: ['JWT implementation', 'Token refresh', 'Role-based access', 'Security middleware'],
        pricingUSD: { individual: 800, startup: 1200, smb: 1600, enterprise: 2400 }
      },
      {
        id: 'oauth-integration',
        name: 'OAuth Social Login Integration',
        description: 'Google, Facebook, GitHub OAuth integration',
        estimatedHours: 6,
        complexity: 'moderate',
        prerequisites: ['authentication-system'],
        deliverables: ['OAuth providers', 'Social login UI', 'Account linking', 'Profile sync'],
        pricingUSD: { individual: 600, startup: 900, smb: 1200, enterprise: 1800 }
      },
      {
        id: 'security-audit',
        name: 'Security Vulnerability Assessment',
        description: 'Comprehensive security audit and fixes',
        estimatedHours: 12,
        complexity: 'complex',
        prerequisites: ['application-deployment'],
        deliverables: ['Security report', 'Vulnerability fixes', 'Security headers', 'Penetration testing'],
        pricingUSD: { individual: 1200, startup: 1800, smb: 2400, enterprise: 3600 }
      },

      // PAYMENT & E-COMMERCE MICRO-SERVICES
      {
        id: 'stripe-integration',
        name: 'Stripe Payment Integration',
        description: 'Complete Stripe payment processing',
        estimatedHours: 10,
        complexity: 'moderate',
        prerequisites: ['user-accounts'],
        deliverables: ['Payment processing', 'Subscription billing', 'Webhook handling', 'Payment UI'],
        pricingUSD: { individual: 1000, startup: 1500, smb: 2000, enterprise: 3000 }
      },
      {
        id: 'paystack-integration',
        name: 'Paystack Payment Integration',
        description: 'Nigerian payment processing with Paystack',
        estimatedHours: 8,
        complexity: 'moderate',
        prerequisites: ['user-accounts'],
        deliverables: ['Paystack integration', 'Local payment methods', 'Currency conversion', 'Transaction tracking'],
        pricingUSD: { individual: 800, startup: 1200, smb: 1600, enterprise: 2400 }
      },
      {
        id: 'inventory-management',
        name: 'Inventory Management System',
        description: 'Product inventory tracking and management',
        estimatedHours: 20,
        complexity: 'complex',
        prerequisites: ['database-design'],
        deliverables: ['Inventory tracking', 'Stock alerts', 'Product variants', 'Reporting dashboard'],
        pricingUSD: { individual: 2000, startup: 3000, smb: 4000, enterprise: 6000 }
      },

      // AI & AUTOMATION MICRO-SERVICES
      {
        id: 'chatbot-integration',
        name: 'AI Chatbot Integration',
        description: 'Custom AI chatbot with natural language processing',
        estimatedHours: 16,
        complexity: 'complex',
        prerequisites: ['content-strategy'],
        deliverables: ['AI chatbot', 'Training data', 'Integration API', 'Analytics dashboard'],
        pricingUSD: { individual: 1600, startup: 2400, smb: 3200, enterprise: 4800 }
      },
      {
        id: 'workflow-automation',
        name: 'Business Process Automation',
        description: 'Automated workflows and business processes',
        estimatedHours: 24,
        complexity: 'complex',
        prerequisites: ['process-analysis'],
        deliverables: ['Automation workflows', 'Integration connectors', 'Monitoring dashboard', 'Error handling'],
        pricingUSD: { individual: 2400, startup: 3600, smb: 4800, enterprise: 7200 }
      },
      {
        id: 'data-analytics',
        name: 'Data Analytics & Reporting',
        description: 'Custom analytics and business intelligence',
        estimatedHours: 20,
        complexity: 'complex',
        prerequisites: ['data-collection'],
        deliverables: ['Analytics dashboard', 'Custom reports', 'Data visualization', 'KPI tracking'],
        pricingUSD: { individual: 2000, startup: 3000, smb: 4000, enterprise: 6000 }
      },

      // MOBILE DEVELOPMENT MICRO-SERVICES
      {
        id: 'react-native-app',
        name: 'React Native Mobile App',
        description: 'Cross-platform mobile application',
        estimatedHours: 40,
        complexity: 'complex',
        prerequisites: ['app-design'],
        deliverables: ['iOS app', 'Android app', 'App store deployment', 'Push notifications'],
        pricingUSD: { individual: 4000, startup: 6000, smb: 8000, enterprise: 12000 }
      },
      {
        id: 'mobile-api-integration',
        name: 'Mobile API Integration',
        description: 'Backend API integration for mobile apps',
        estimatedHours: 12,
        complexity: 'moderate',
        prerequisites: ['mobile-app', 'api-endpoints'],
        deliverables: ['API integration', 'Offline sync', 'Error handling', 'Performance optimization'],
        pricingUSD: { individual: 1200, startup: 1800, smb: 2400, enterprise: 3600 }
      },

      // DEVOPS & DEPLOYMENT MICRO-SERVICES
      {
        id: 'aws-deployment',
        name: 'AWS Cloud Deployment',
        description: 'Production deployment on AWS infrastructure',
        estimatedHours: 12,
        complexity: 'complex',
        prerequisites: ['application-ready'],
        deliverables: ['AWS setup', 'Auto-scaling', 'Load balancing', 'Monitoring'],
        pricingUSD: { individual: 1200, startup: 1800, smb: 2400, enterprise: 3600 }
      },
      {
        id: 'ci-cd-pipeline',
        name: 'CI/CD Pipeline Setup',
        description: 'Automated testing and deployment pipeline',
        estimatedHours: 8,
        complexity: 'moderate',
        prerequisites: ['version-control'],
        deliverables: ['CI/CD pipeline', 'Automated testing', 'Deployment automation', 'Environment management'],
        pricingUSD: { individual: 800, startup: 1200, smb: 1600, enterprise: 2400 }
      },
      {
        id: 'performance-optimization',
        name: 'Performance Optimization',
        description: 'Application performance tuning and optimization',
        estimatedHours: 10,
        complexity: 'complex',
        prerequisites: ['performance-audit'],
        deliverables: ['Performance improvements', 'Caching strategy', 'Code optimization', 'Monitoring setup'],
        pricingUSD: { individual: 1000, startup: 1500, smb: 2000, enterprise: 3000 }
      },

      // DESIGN & UX MICRO-SERVICES
      {
        id: 'ux-research',
        name: 'UX Research & User Testing',
        description: 'User experience research and usability testing',
        estimatedHours: 16,
        complexity: 'moderate',
        prerequisites: ['target-audience'],
        deliverables: ['User research report', 'Usability testing', 'User personas', 'Journey mapping'],
        pricingUSD: { individual: 1600, startup: 2400, smb: 3200, enterprise: 4800 }
      },
      {
        id: 'ui-design-system',
        name: 'UI Design System',
        description: 'Comprehensive design system and style guide',
        estimatedHours: 20,
        complexity: 'complex',
        prerequisites: ['brand-guidelines'],
        deliverables: ['Design system', 'Component library', 'Style guide', 'Design tokens'],
        pricingUSD: { individual: 2000, startup: 3000, smb: 4000, enterprise: 6000 }
      },
      {
        id: 'accessibility-compliance',
        name: 'Accessibility Compliance (WCAG)',
        description: 'Web accessibility implementation and testing',
        estimatedHours: 8,
        complexity: 'moderate',
        prerequisites: ['ui-implementation'],
        deliverables: ['Accessibility audit', 'WCAG compliance', 'Screen reader support', 'Keyboard navigation'],
        pricingUSD: { individual: 800, startup: 1200, smb: 1600, enterprise: 2400 }
      }
    ]

    microServices.forEach(service => {
      this.microServices.set(service.id, service)
    })
  }

  private initializeServicePackages(): void {
    const packages: ServicePackage[] = [
      // WEBSITE PACKAGES
      {
        id: 'landing-page-package',
        name: 'Professional Landing Page',
        description: 'High-converting landing page with modern design',
        category: 'web-development',
        subcategory: 'landing-pages',
        microServices: ['responsive-design', 'ui-animations', 'performance-optimization'],
        bundleDiscount: 15,
        estimatedDuration: '1-2 weeks',
        targetMarket: ['individual', 'startup', 'smb'],
        customizable: true,
        addOns: ['analytics-integration', 'seo-optimization']
      },
      {
        id: 'business-website-package',
        name: 'Complete Business Website',
        description: 'Full business website with CMS and contact forms',
        category: 'web-development',
        subcategory: 'business-websites',
        microServices: ['responsive-design', 'ui-animations', 'cms-integration', 'contact-forms'],
        bundleDiscount: 20,
        estimatedDuration: '3-4 weeks',
        targetMarket: ['startup', 'smb'],
        customizable: true,
        addOns: ['blog-system', 'seo-optimization', 'analytics-integration']
      },

      // E-COMMERCE PACKAGES
      {
        id: 'ecommerce-starter-package',
        name: 'E-commerce Starter',
        description: 'Basic online store with payment processing',
        category: 'e-commerce',
        subcategory: 'online-stores',
        microServices: ['responsive-design', 'stripe-integration', 'inventory-management', 'user-accounts'],
        bundleDiscount: 25,
        estimatedDuration: '4-6 weeks',
        targetMarket: ['startup', 'smb'],
        customizable: true,
        addOns: ['paystack-integration', 'advanced-analytics', 'email-marketing']
      },
      {
        id: 'ecommerce-enterprise-package',
        name: 'Enterprise E-commerce Platform',
        description: 'Full-featured e-commerce platform with advanced features',
        category: 'e-commerce',
        subcategory: 'enterprise-platforms',
        microServices: ['responsive-design', 'stripe-integration', 'paystack-integration', 'inventory-management', 'user-accounts', 'admin-dashboard', 'analytics-dashboard'],
        bundleDiscount: 30,
        estimatedDuration: '8-12 weeks',
        targetMarket: ['enterprise'],
        customizable: true,
        addOns: ['multi-vendor-support', 'advanced-reporting', 'api-integrations']
      },

      // WEB APPLICATION PACKAGES
      {
        id: 'saas-mvp-package',
        name: 'SaaS MVP Development',
        description: 'Minimum viable product for SaaS applications',
        category: 'web-applications',
        subcategory: 'saas-platforms',
        microServices: ['react-component-library', 'rest-api-development', 'jwt-authentication', 'stripe-integration', 'database-optimization'],
        bundleDiscount: 25,
        estimatedDuration: '6-8 weeks',
        targetMarket: ['startup', 'smb'],
        customizable: true,
        addOns: ['advanced-analytics', 'email-notifications', 'api-documentation']
      },
      {
        id: 'enterprise-web-app-package',
        name: 'Enterprise Web Application',
        description: 'Scalable enterprise web application with advanced features',
        category: 'web-applications',
        subcategory: 'enterprise-applications',
        microServices: ['react-component-library', 'graphql-api', 'microservices-architecture', 'jwt-authentication', 'oauth-integration', 'security-audit', 'aws-deployment'],
        bundleDiscount: 30,
        estimatedDuration: '12-16 weeks',
        targetMarket: ['enterprise'],
        customizable: true,
        addOns: ['advanced-monitoring', 'disaster-recovery', 'compliance-features']
      },

      // MOBILE APP PACKAGES
      {
        id: 'mobile-app-package',
        name: 'Cross-Platform Mobile App',
        description: 'React Native app for iOS and Android',
        category: 'mobile-development',
        subcategory: 'cross-platform-apps',
        microServices: ['react-native-app', 'mobile-api-integration', 'push-notifications', 'app-store-deployment'],
        bundleDiscount: 20,
        estimatedDuration: '8-10 weeks',
        targetMarket: ['startup', 'smb', 'enterprise'],
        customizable: true,
        addOns: ['offline-sync', 'advanced-analytics', 'in-app-purchases']
      },

      // AI & AUTOMATION PACKAGES
      {
        id: 'ai-automation-package',
        name: 'AI Business Automation',
        description: 'AI-powered business process automation',
        category: 'ai-solutions',
        subcategory: 'business-automation',
        microServices: ['chatbot-integration', 'workflow-automation', 'data-analytics'],
        bundleDiscount: 25,
        estimatedDuration: '6-8 weeks',
        targetMarket: ['smb', 'enterprise'],
        customizable: true,
        addOns: ['machine-learning-models', 'predictive-analytics', 'custom-integrations']
      }
    ]

    packages.forEach(pkg => {
      this.servicePackages.set(pkg.id, pkg)
    })
  }

  private initializeProjectTypes(): void {
    const projectTypes: ProjectType[] = [
      // BUSINESS WEBSITES
      {
        id: 'corporate-website',
        name: 'Corporate Website',
        description: 'Professional corporate website with company information',
        category: 'web-development',
        industry: ['professional-services', 'consulting', 'finance'],
        complexity: 'moderate',
        typicalServices: ['business-website-package'],
        commonFeatures: ['About page', 'Services page', 'Contact forms', 'Team profiles', 'Blog'],
        estimatedTimeframe: '3-4 weeks',
        successMetrics: ['Professional appearance', 'Lead generation', 'Brand credibility'],
        examples: ['Law firm website', 'Consulting company site', 'Accounting firm portal']
      },
      {
        id: 'restaurant-website',
        name: 'Restaurant Website',
        description: 'Restaurant website with menu and online ordering',
        category: 'web-development',
        industry: ['food-service', 'hospitality'],
        complexity: 'moderate',
        typicalServices: ['business-website-package'],
        commonFeatures: ['Menu display', 'Online reservations', 'Location info', 'Photo gallery', 'Reviews'],
        estimatedTimeframe: '2-3 weeks',
        successMetrics: ['Online orders', 'Reservations', 'Customer engagement'],
        examples: ['Fine dining restaurant', 'Fast casual chain', 'Food truck website']
      },

      // E-COMMERCE PROJECTS
      {
        id: 'fashion-ecommerce',
        name: 'Fashion E-commerce Store',
        description: 'Online fashion store with product catalog and shopping cart',
        category: 'e-commerce',
        industry: ['fashion', 'retail'],
        complexity: 'complex',
        typicalServices: ['ecommerce-starter-package'],
        commonFeatures: ['Product catalog', 'Size guides', 'Wishlist', 'Reviews', 'Payment processing'],
        estimatedTimeframe: '4-6 weeks',
        successMetrics: ['Sales conversion', 'Average order value', 'Customer retention'],
        examples: ['Clothing boutique', 'Shoe store', 'Accessories shop']
      },
      {
        id: 'marketplace-platform',
        name: 'Multi-Vendor Marketplace',
        description: 'Platform for multiple vendors to sell products',
        category: 'e-commerce',
        industry: ['marketplace', 'retail'],
        complexity: 'enterprise',
        typicalServices: ['ecommerce-enterprise-package'],
        commonFeatures: ['Vendor management', 'Commission tracking', 'Multi-payment', 'Reviews', 'Analytics'],
        estimatedTimeframe: '10-14 weeks',
        successMetrics: ['Vendor acquisition', 'Transaction volume', 'Platform revenue'],
        examples: ['Local marketplace', 'Niche product platform', 'Service marketplace']
      },

      // SAAS APPLICATIONS
      {
        id: 'project-management-saas',
        name: 'Project Management SaaS',
        description: 'Cloud-based project management application',
        category: 'web-applications',
        industry: ['software', 'productivity'],
        complexity: 'complex',
        typicalServices: ['saas-mvp-package'],
        commonFeatures: ['Task management', 'Team collaboration', 'Time tracking', 'Reporting', 'Integrations'],
        estimatedTimeframe: '8-10 weeks',
        successMetrics: ['User adoption', 'Feature usage', 'Subscription growth'],
        examples: ['Team task manager', 'Client project portal', 'Freelancer platform']
      },
      {
        id: 'fintech-application',
        name: 'Fintech Application',
        description: 'Financial technology application with secure transactions',
        category: 'web-applications',
        industry: ['fintech', 'finance'],
        complexity: 'enterprise',
        typicalServices: ['enterprise-web-app-package'],
        commonFeatures: ['Account management', 'Transaction processing', 'Security features', 'Compliance', 'Analytics'],
        estimatedTimeframe: '12-16 weeks',
        successMetrics: ['Transaction volume', 'Security compliance', 'User trust'],
        examples: ['Payment processor', 'Investment platform', 'Banking application']
      },

      // MOBILE APPLICATIONS
      {
        id: 'delivery-mobile-app',
        name: 'Delivery Mobile App',
        description: 'On-demand delivery application for iOS and Android',
        category: 'mobile-development',
        industry: ['logistics', 'food-delivery'],
        complexity: 'complex',
        typicalServices: ['mobile-app-package'],
        commonFeatures: ['GPS tracking', 'Real-time updates', 'Payment integration', 'Push notifications', 'Rating system'],
        estimatedTimeframe: '10-12 weeks',
        successMetrics: ['Order completion rate', 'Delivery time', 'User satisfaction'],
        examples: ['Food delivery app', 'Package delivery', 'Ride-sharing app']
      },

      // AI & AUTOMATION PROJECTS
      {
        id: 'customer-service-automation',
        name: 'Customer Service Automation',
        description: 'AI-powered customer service and support automation',
        category: 'ai-solutions',
        industry: ['customer-service', 'support'],
        complexity: 'complex',
        typicalServices: ['ai-automation-package'],
        commonFeatures: ['AI chatbot', 'Ticket routing', 'Knowledge base', 'Analytics', 'Escalation'],
        estimatedTimeframe: '6-8 weeks',
        successMetrics: ['Response time', 'Resolution rate', 'Customer satisfaction'],
        examples: ['Support chatbot', 'Help desk automation', 'FAQ system']
      },

      // CUSTOM PROJECTS
      {
        id: 'custom-web-application',
        name: 'Custom Web Application',
        description: 'Bespoke web application tailored to specific business needs',
        category: 'custom-development',
        complexity: 'enterprise',
        typicalServices: ['enterprise-web-app-package'],
        commonFeatures: ['Custom features', 'Business logic', 'Integrations', 'Scalability', 'Security'],
        estimatedTimeframe: 'Variable (8-20 weeks)',
        successMetrics: ['Business objectives', 'User adoption', 'ROI'],
        examples: ['Industry-specific software', 'Internal tools', 'Specialized platforms']
      }
    ]

    projectTypes.forEach(type => {
      this.projectTypes.set(type.id, type)
    })
  }

  // Public methods for accessing services
  public getMicroService(id: string): MicroService | undefined {
    return this.microServices.get(id)
  }

  public getServicePackage(id: string): ServicePackage | undefined {
    return this.servicePackages.get(id)
  }

  public getProjectType(id: string): ProjectType | undefined {
    return this.projectTypes.get(id)
  }

  public getAllMicroServices(): MicroService[] {
    return Array.from(this.microServices.values())
  }

  public getAllServicePackages(): ServicePackage[] {
    return Array.from(this.servicePackages.values())
  }

  public getAllProjectTypes(): ProjectType[] {
    return Array.from(this.projectTypes.values())
  }

  public getMicroServicesByCategory(category: string): MicroService[] {
    return this.getAllMicroServices().filter(service => 
      service.name.toLowerCase().includes(category.toLowerCase()) ||
      service.description.toLowerCase().includes(category.toLowerCase())
    )
  }

  public getServicePackagesByCategory(category: string): ServicePackage[] {
    return this.getAllServicePackages().filter(pkg => 
      pkg.category === category || pkg.subcategory === category
    )
  }

  public getProjectTypesByIndustry(industry: string): ProjectType[] {
    return this.getAllProjectTypes().filter(type => 
      type.industry?.includes(industry) || 
      type.category.includes(industry)
    )
  }

  public calculatePackagePrice(
    packageId: string, 
    clientType: 'individual' | 'startup' | 'smb' | 'enterprise',
    currency: 'USD' | 'NGN' = 'USD'
  ): PriceRange | null {
    
    const servicePackage = this.getServicePackage(packageId)
    if (!servicePackage) return null

    let totalPrice = 0
    let hasAllServices = true

    // Calculate total price from micro-services
    for (const microServiceId of servicePackage.microServices) {
      const microService = this.getMicroService(microServiceId)
      if (microService) {
        totalPrice += microService.pricingUSD[clientType]
      } else {
        hasAllServices = false
      }
    }

    if (!hasAllServices) return null

    // Apply bundle discount
    const discountedPrice = totalPrice * (1 - servicePackage.bundleDiscount / 100)
    
    // Create price range (±20% for customization)
    const minPrice = discountedPrice * 0.8
    const maxPrice = discountedPrice * 1.2

    return this.currencySystem.createPriceRange(minPrice, maxPrice, currency, true)
  }

  public estimateCustomProjectPrice(
    description: string,
    complexity: 'simple' | 'moderate' | 'complex' | 'enterprise',
    clientType: 'individual' | 'startup' | 'smb' | 'enterprise',
    currency: 'USD' | 'NGN' = 'USD'
  ): PriceRange {
    
    // Base pricing by complexity
    const basePricing = {
      simple: { individual: 2000, startup: 3000, smb: 4000, enterprise: 6000 },
      moderate: { individual: 5000, startup: 8000, smb: 12000, enterprise: 18000 },
      complex: { individual: 15000, startup: 25000, smb: 40000, enterprise: 60000 },
      enterprise: { individual: 40000, startup: 60000, smb: 100000, enterprise: 200000 }
    }

    const basePrice = basePricing[complexity][clientType]
    
    // Adjust based on description keywords
    let multiplier = 1.0
    const lowerDesc = description.toLowerCase()
    
    // AI/ML features
    if (lowerDesc.includes('ai') || lowerDesc.includes('machine learning') || lowerDesc.includes('automation')) {
      multiplier += 0.3
    }
    
    // Real-time features
    if (lowerDesc.includes('real-time') || lowerDesc.includes('live') || lowerDesc.includes('streaming')) {
      multiplier += 0.2
    }
    
    // Mobile app
    if (lowerDesc.includes('mobile') || lowerDesc.includes('app store') || lowerDesc.includes('ios') || lowerDesc.includes('android')) {
      multiplier += 0.4
    }
    
    // E-commerce features
    if (lowerDesc.includes('payment') || lowerDesc.includes('ecommerce') || lowerDesc.includes('shopping')) {
      multiplier += 0.2
    }
    
    // Integration complexity
    if (lowerDesc.includes('integration') || lowerDesc.includes('api') || lowerDesc.includes('third-party')) {
      multiplier += 0.15
    }

    const adjustedPrice = basePrice * multiplier
    const minPrice = adjustedPrice * 0.8
    const maxPrice = adjustedPrice * 1.5

    return this.currencySystem.createPriceRange(minPrice, maxPrice, currency, true)
  }

  public findRelevantServices(
    projectDescription: string,
    budget?: string,
    clientType: 'individual' | 'startup' | 'smb' | 'enterprise' = 'startup'
  ): {
    projectTypes: ProjectType[]
    servicePackages: ServicePackage[]
    microServices: MicroService[]
    estimatedPrice?: PriceRange
  } {
    
    const lowerDesc = projectDescription.toLowerCase()
    const relevantProjectTypes: ProjectType[] = []
    const relevantPackages: ServicePackage[] = []
    const relevantMicroServices: MicroService[] = []

    // Find matching project types
    for (const projectType of this.getAllProjectTypes()) {
      const nameMatch = projectType.name.toLowerCase().includes(lowerDesc) || 
                       lowerDesc.includes(projectType.name.toLowerCase())
      const descMatch = projectType.description.toLowerCase().includes(lowerDesc) ||
                       lowerDesc.includes(projectType.description.toLowerCase())
      const featureMatch = projectType.commonFeatures.some(feature => 
        lowerDesc.includes(feature.toLowerCase())
      )
      
      if (nameMatch || descMatch || featureMatch) {
        relevantProjectTypes.push(projectType)
      }
    }

    // Find matching service packages
    for (const servicePackage of this.getAllServicePackages()) {
      const nameMatch = servicePackage.name.toLowerCase().includes(lowerDesc) ||
                       lowerDesc.includes(servicePackage.name.toLowerCase())
      const descMatch = servicePackage.description.toLowerCase().includes(lowerDesc) ||
                       lowerDesc.includes(servicePackage.description.toLowerCase())
      const targetMatch = servicePackage.targetMarket.includes(clientType)
      
      if ((nameMatch || descMatch) && targetMatch) {
        relevantPackages.push(servicePackage)
      }
    }

    // Find matching micro-services
    for (const microService of this.getAllMicroServices()) {
      const nameMatch = microService.name.toLowerCase().includes(lowerDesc) ||
                       lowerDesc.includes(microService.name.toLowerCase())
      const descMatch = microService.description.toLowerCase().includes(lowerDesc) ||
                       lowerDesc.includes(microService.description.toLowerCase())
      
      if (nameMatch || descMatch) {
        relevantMicroServices.push(microService)
      }
    }

    // Estimate price if no specific matches found
    let estimatedPrice: PriceRange | undefined
    if (relevantPackages.length === 0) {
      const complexity = this.estimateComplexity(projectDescription)
      estimatedPrice = this.estimateCustomProjectPrice(projectDescription, complexity, clientType)
    }

    return {
      projectTypes: relevantProjectTypes,
      servicePackages: relevantPackages,
      microServices: relevantMicroServices,
      estimatedPrice
    }
  }

  private estimateComplexity(description: string): 'simple' | 'moderate' | 'complex' | 'enterprise' {
    const lowerDesc = description.toLowerCase()
    let complexityScore = 0

    // Simple indicators
    if (lowerDesc.includes('landing page') || lowerDesc.includes('simple') || lowerDesc.includes('basic')) {
      return 'simple'
    }

    // Complex indicators
    const complexKeywords = ['ai', 'machine learning', 'real-time', 'microservices', 'enterprise', 'scalable', 'integration']
    complexKeywords.forEach(keyword => {
      if (lowerDesc.includes(keyword)) complexityScore += 2
    })

    // Moderate indicators
    const moderateKeywords = ['dashboard', 'admin', 'user management', 'payment', 'api', 'mobile']
    moderateKeywords.forEach(keyword => {
      if (lowerDesc.includes(keyword)) complexityScore += 1
    })

    if (complexityScore >= 6) return 'enterprise'
    if (complexityScore >= 4) return 'complex'
    if (complexityScore >= 2) return 'moderate'
    return 'simple'
  }
}
