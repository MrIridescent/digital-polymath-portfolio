/**
 * 🌍 Global Market SEO Component
 * Optimizes for international markets + strategic Nigerian focus + government/military contracts
 */

import { seoConfig } from '@/lib/seo-config'

interface GlobalMarketSEOProps {
  page?: 'home' | 'services' | 'about' | 'contact' | 'projects'
  market?: 'global' | 'nigeria' | 'government' | 'military'
  service?: string
}

export function GlobalMarketSEO({ 
  page = 'home', 
  market = 'global',
  service 
}: GlobalMarketSEOProps) {
  
  // Global business structured data
  const globalBusinessData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "name": "David Akpoviroro Oke - Digital Polymat",
    "alternateName": ["Mr. Iridescent", "Iridescent Internet Solutions Limited"],
    "description": "Global software development and digital transformation consultant with strategic focus on Nigerian markets and government contracts",
    "url": seoConfig.url,
    "email": seoConfig.social.email,
    "foundingDate": "2017",
    "founder": {
      "@type": "Person",
      "name": "David Akpoviroro Oke",
      "alternateName": "Mr. Iridescent",
      "jobTitle": "Digital Polymat & Full Stack Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Iridescent Internet Solutions Limited"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos State",
      "addressCountry": "Nigeria",
      "addressCountryCode": "NG"
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "Global"
      },
      {
        "@type": "Country",
        "name": "Nigeria"
      },
      {
        "@type": "City",
        "name": "Lagos"
      },
      {
        "@type": "City",
        "name": "Abuja"
      },
      {
        "@type": "City",
        "name": "Port Harcourt"
      },
      {
        "@type": "Place",
        "name": "United States"
      },
      {
        "@type": "Place",
        "name": "United Kingdom"
      },
      {
        "@type": "Place",
        "name": "Canada"
      },
      {
        "@type": "Place",
        "name": "West Africa"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "6.5244",
        "longitude": "3.3792"
      },
      "geoRadius": "20000000" // Global reach
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Global Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Global Software Development",
            "description": "International software development services for businesses worldwide"
          },
          "areaServed": "Global"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Nigerian Government IT Solutions",
            "description": "Specialized IT solutions for Nigerian federal, state, and local government agencies"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Nigeria"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Military & Defense Software",
            "description": "Secure software solutions for military and defense organizations"
          },
          "category": "Defense Technology"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "International Fintech Development",
            "description": "Global fintech solutions with expertise in Nigerian payment systems"
          },
          "category": "Financial Technology"
        }
      ]
    },
    "knowsAbout": [
      "Software Development",
      "Cybersecurity",
      "Artificial Intelligence",
      "Government IT Solutions",
      "Military Software",
      "Fintech Development",
      "Digital Transformation",
      "Cloud Architecture",
      "Mobile App Development",
      "Web Development"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Cisco Networking Academy"
      },
      {
        "@type": "Organization", 
        "name": "University of the People"
      }
    ],
    "award": [
      "Cisco Cybersecurity Certification",
      "Multiple Intelligence Assessment - All 9 Types",
      "20+ Years Coding Experience"
    ],
    "sameAs": Object.values(seoConfig.social)
  }

  // Government contract specific data
  const governmentContractData = market === 'government' ? {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": "Government IT Contracting Services",
    "description": "Specialized IT solutions for Nigerian federal agencies, military, and government organizations",
    "provider": {
      "@type": "Person",
      "name": "David Akpoviroro Oke"
    },
    "serviceType": "Information Technology",
    "category": "Government Contracting",
    "areaServed": {
      "@type": "Country",
      "name": "Nigeria"
    },
    "audience": [
      {
        "@type": "Audience",
        "name": "Federal Government Agencies"
      },
      {
        "@type": "Audience",
        "name": "Military Organizations"
      },
      {
        "@type": "Audience",
        "name": "State Governments"
      }
    ]
  } : null

  // Get market-specific keywords
  const getMarketKeywords = () => {
    const baseKeywords = [
      "global software developer",
      "international web developer", 
      "remote full stack engineer"
    ]

    switch (market) {
      case 'nigeria':
        return [
          ...baseKeywords,
          "Nigeria software developer",
          "Lagos web developer",
          "Abuja tech consultant",
          "Port Harcourt developer"
        ]
      case 'government':
        return [
          ...baseKeywords,
          "government software contractor",
          "federal IT services Nigeria",
          "government web developer",
          "federal contract developer"
        ]
      case 'military':
        return [
          ...baseKeywords,
          "military software developer",
          "defense contractor Nigeria",
          "military IT solutions",
          "defense technology consultant"
        ]
      default:
        return [
          ...baseKeywords,
          "international software consultant",
          "global tech solutions",
          "worldwide digital transformation"
        ]
    }
  }

  return (
    <>
      {/* Global Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(globalBusinessData, null, 2)
        }}
      />

      {/* Government Contract Schema */}
      {governmentContractData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(governmentContractData, null, 2)
          }}
        />
      )}

      {/* Global market meta tags */}
      <meta name="global-reach" content="true" />
      <meta name="international-services" content="software development, cybersecurity, AI" />
      <meta name="target-markets" content="Global, Nigeria, USA, UK, Canada, West Africa" />
      
      {/* Nigerian market meta tags */}
      <meta name="nigeria-focus" content="Lagos, Abuja, Port Harcourt" />
      <meta name="nigerian-services" content="government IT, military software, fintech" />
      
      {/* Government contract meta tags */}
      {market === 'government' && (
        <>
          <meta name="government-contractor" content="true" />
          <meta name="federal-services" content="IT solutions, software development, cybersecurity" />
          <meta name="security-clearance" content="available" />
          <meta name="compliance" content="federal standards, security protocols" />
        </>
      )}

      {/* Military contract meta tags */}
      {market === 'military' && (
        <>
          <meta name="defense-contractor" content="true" />
          <meta name="military-software" content="secure applications, defense systems" />
          <meta name="security-expertise" content="cybersecurity, secure coding, threat assessment" />
        </>
      )}

      {/* Market-specific keywords */}
      <meta name="market-keywords" content={getMarketKeywords().join(', ')} />
      
      {/* Service-specific optimization */}
      {service && (
        <meta name="service-focus" content={`${service} - ${market} market`} />
      )}

      {/* Global business signals */}
      <meta name="business-type" content="Global Technology Consulting" />
      <meta name="service-delivery" content="Remote, On-site, Hybrid" />
      <meta name="time-zones" content="GMT, WAT, EST, PST" />
      <meta name="languages" content="English, Yoruba" />
      <meta name="currencies" content="USD, NGN, GBP, CAD" />
    </>
  )
}

// Convenience components for specific markets
export function GlobalHomeSEO() {
  return <GlobalMarketSEO page="home" market="global" />
}

export function NigerianMarketSEO({ page }: { page?: string }) {
  return <GlobalMarketSEO page={page as any} market="nigeria" />
}

export function GovernmentContractSEO({ page }: { page?: string }) {
  return <GlobalMarketSEO page={page as any} market="government" />
}

export function MilitaryContractSEO({ page }: { page?: string }) {
  return <GlobalMarketSEO page={page as any} market="military" />
}
