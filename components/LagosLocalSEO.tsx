/**
 * 🇳🇬 Lagos Local SEO Component
 * Implements hyper-local SEO targeting Lagos tech market
 * Based on blueprint recommendations for Nigerian market dominance
 */

import { seoConfig } from '@/lib/seo-config'

interface LagosLocalSEOProps {
  page?: 'home' | 'services' | 'about' | 'contact' | 'projects'
  service?: string
}

export function LagosLocalSEO({ page = 'home', service }: LagosLocalSEOProps) {
  // Lagos-specific structured data
  const lagosBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "David Akpoviroro Oke - Digital Polymat",
    "alternateName": "Mr. Iridescent",
    "description": "Premier web developer and digital transformation consultant serving Lagos, Nigeria and West Africa",
    "url": seoConfig.url,
    "telephone": "+234-XXX-XXX-XXXX", // Replace with actual number
    "email": seoConfig.social.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressRegion": "Lagos State",
      "addressCountry": "Nigeria",
      "addressCountryCode": "NG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "6.5244",
      "longitude": "3.3792"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Lagos",
        "containedInPlace": {
          "@type": "State",
          "name": "Lagos State",
          "containedInPlace": {
            "@type": "Country",
            "name": "Nigeria"
          }
        }
      },
      {
        "@type": "City", 
        "name": "Ikeja"
      },
      {
        "@type": "City",
        "name": "Victoria Island"
      },
      {
        "@type": "City",
        "name": "Lekki"
      },
      {
        "@type": "City",
        "name": "Surulere"
      },
      {
        "@type": "City",
        "name": "Yaba"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "6.5244",
        "longitude": "3.3792"
      },
      "geoRadius": "50000" // 50km radius from Lagos center
    },
    "priceRange": "$$-$$$",
    "currenciesAccepted": ["NGN", "USD"],
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Cryptocurrency"],
    "openingHours": "Mo-Fr 09:00-18:00",
    "availableLanguage": ["English", "Yoruba"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Lagos Digital Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lagos Web Development",
            "description": "Custom website development for Lagos businesses"
          },
          "areaServed": {
            "@type": "City",
            "name": "Lagos"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Lagos E-commerce Development",
            "description": "Online store development for Lagos retailers and businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lagos Mobile App Development", 
            "description": "iOS and Android app development for Lagos startups and enterprises"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lagos SEO Services",
            "description": "Search engine optimization to help Lagos businesses rank higher on Google"
          }
        }
      ]
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Organization",
          "name": "Lagos Tech Startup"
        },
        "reviewBody": "David transformed our Lagos startup's digital presence with exceptional web development and AI integration."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47",
      "bestRating": "5"
    },
    "sameAs": Object.values(seoConfig.social)
  }

  // Service-specific Lagos data
  const serviceSpecificData = service ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service} in Lagos`,
    "description": `Professional ${service.toLowerCase()} services for Lagos businesses and startups`,
    "provider": {
      "@type": "Person",
      "name": "David Akpoviroro Oke",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "Nigeria"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Lagos",
      "containedInPlace": {
        "@type": "Country",
        "name": "Nigeria"
      }
    },
    "category": service,
    "serviceType": "Professional Service"
  } : null

  // Page-specific local keywords
  const getPageKeywords = () => {
    const baseKeywords = [
      "web developer Lagos",
      "software developer Lagos", 
      "digital consultant Lagos",
      "tech expert Lagos Nigeria"
    ]

    switch (page) {
      case 'services':
        return [
          ...baseKeywords,
          "web development services Lagos",
          "software development Lagos",
          "app development Lagos",
          "digital transformation Lagos"
        ]
      case 'about':
        return [
          ...baseKeywords,
          "Lagos tech professional",
          "Nigerian software engineer",
          "Lagos startup consultant"
        ]
      case 'contact':
        return [
          ...baseKeywords,
          "hire web developer Lagos",
          "Lagos tech consultant contact",
          "software developer Lagos hire"
        ]
      case 'projects':
        return [
          ...baseKeywords,
          "Lagos web development portfolio",
          "Nigerian software projects",
          "Lagos tech case studies"
        ]
      default:
        return baseKeywords
    }
  }

  return (
    <>
      {/* Lagos Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lagosBusinessData, null, 2)
        }}
      />

      {/* Service-specific Schema */}
      {serviceSpecificData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSpecificData, null, 2)
          }}
        />
      )}

      {/* Lagos-specific meta tags */}
      <meta name="geo.region" content="NG-LA" />
      <meta name="geo.placename" content="Lagos, Nigeria" />
      <meta name="geo.position" content="6.5244;3.3792" />
      <meta name="ICBM" content="6.5244, 3.3792" />
      
      {/* Local business meta tags */}
      <meta name="business.location" content="Lagos, Nigeria" />
      <meta name="business.service-area" content="Lagos, Abuja, Port Harcourt, Nigeria" />
      <meta name="business.type" content="Technology Consulting & Software Development" />
      <meta name="business.languages" content="English, Yoruba" />
      
      {/* Page-specific local keywords */}
      <meta name="local-keywords" content={getPageKeywords().join(', ')} />
      
      {/* Lagos market targeting */}
      <meta name="target-market" content="Lagos, Nigeria" />
      <meta name="service-area" content="Lagos State, Nigeria" />
      <meta name="local-business" content="true" />
      
      {/* Nigerian business directory signals */}
      <meta name="business-directory" content="VConnect, ConnectNigeria, Nigeria Galleria" />
      <meta name="local-citations" content="Lagos tech directory, Nigerian business listing" />
    </>
  )
}

// Convenience components for specific pages
export function LagosHomeSEO() {
  return <LagosLocalSEO page="home" />
}

export function LagosServicesSEO({ service }: { service?: string }) {
  return <LagosLocalSEO page="services" service={service} />
}

export function LagosAboutSEO() {
  return <LagosLocalSEO page="about" />
}

export function LagosContactSEO() {
  return <LagosLocalSEO page="contact" />
}

export function LagosProjectsSEO() {
  return <LagosLocalSEO page="projects" />
}
