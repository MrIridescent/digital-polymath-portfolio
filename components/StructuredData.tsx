import { seoConfig } from '@/lib/seo-config'

interface StructuredDataProps {
  type?: 'person' | 'organization' | 'website' | 'article' | 'service'
  data?: any
}

export function StructuredData({ type = 'person', data }: StructuredDataProps) {
  let structuredData

  switch (type) {
    case 'person':
      structuredData = seoConfig.structuredData
      break
    
    case 'organization':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": seoConfig.business.name,
        "founder": {
          "@type": "Person",
          "name": seoConfig.business.founder
        },
        "foundingDate": seoConfig.business.established,
        "url": seoConfig.url,
        "logo": seoConfig.image,
        "description": "Digital transformation company specializing in full-stack development, AI engineering, and cybersecurity solutions",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "Nigeria"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+234-XXX-XXX-XXXX",
          "contactType": "customer service",
          "email": seoConfig.social.email
        },
        "sameAs": Object.values(seoConfig.social),
        "serviceArea": {
          "@type": "Place",
          "name": "Global"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Services",
          "itemListElement": [
            ...(seoConfig.business.globalServices || []).map(service => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service
              }
            })),
            ...(seoConfig.business.nigerianServices || []).map(service => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service
              }
            })),
            ...(seoConfig.business.governmentServices || []).map(service => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service
              }
            }))
          ]
        }
      }
      break
    
    case 'website':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": seoConfig.title,
        "url": seoConfig.url,
        "description": seoConfig.description,
        "author": {
          "@type": "Person",
          "name": seoConfig.name
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${seoConfig.url}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
      break
    
    case 'service':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Digital Polymat Consulting Services",
        "description": "Comprehensive technology consulting including full-stack development, AI engineering, cybersecurity, and digital transformation",
        "provider": {
          "@type": "Person",
          "name": seoConfig.name,
          "url": seoConfig.url
        },
        "areaServed": {
          "@type": "Place",
          "name": "Global"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Technology Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Full Stack Development",
                "description": "End-to-end web and mobile application development using modern technologies"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "AI Engineering",
                "description": "Custom AI solutions including RAG systems, agentic AI, and machine learning implementations"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Cybersecurity Consulting",
                "description": "Cisco-verified security assessments, threat management, and security implementation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Digital Transformation",
                "description": "Complete business digitization including process automation and system modernization"
              }
            }
          ]
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Organization",
            "name": "Trinitas Foundation"
          },
          "reviewBody": "David's polymathic approach transformed our digital presence with a 35% SEO traffic increase."
        }
      }
      break
    
    case 'article':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data?.title || "Digital Polymat Insights",
        "description": data?.description || seoConfig.description,
        "author": {
          "@type": "Person",
          "name": seoConfig.name,
          "url": seoConfig.url
        },
        "publisher": {
          "@type": "Organization",
          "name": seoConfig.business.name,
          "logo": {
            "@type": "ImageObject",
            "url": seoConfig.image
          }
        },
        "datePublished": data?.publishDate || new Date().toISOString(),
        "dateModified": data?.modifiedDate || new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": data?.url || seoConfig.url
        },
        "image": data?.image || seoConfig.image
      }
      break
    
    default:
      structuredData = seoConfig.structuredData
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

// Convenience components for specific types
export function PersonStructuredData() {
  return <StructuredData type="person" />
}

export function OrganizationStructuredData() {
  return <StructuredData type="organization" />
}

export function WebsiteStructuredData() {
  return <StructuredData type="website" />
}

export function ServiceStructuredData() {
  return <StructuredData type="service" />
}

// FAQ Structured Data for common questions
export function FAQStructuredData() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Digital Polymat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Digital Polymat is a modern renaissance professional who combines expertise across multiple domains - technology, design, business strategy, and creative arts - to solve complex problems with innovative, holistic solutions."
        }
      },
      {
        "@type": "Question",
        "name": "What services does David Oke offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "David offers full-stack development, AI engineering, cybersecurity consulting, digital transformation, UI/UX design, video production, and remote team leadership services globally."
        }
      },
      {
        "@type": "Question",
        "name": "Is David available for remote work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, David is a remote-first professional with 7+ years of experience leading distributed teams and delivering projects globally. He's available for full-time, contract, and consulting work."
        }
      },
      {
        "@type": "Question",
        "name": "What makes David's approach unique?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "David embodies all nine of Howard Gardner's Multiple Intelligences, making him a true Multipotentialite. He combines Design Thinking and Systems Thinking with 20+ years of coding experience and Cisco-verified cybersecurity expertise."
        }
      },
      {
        "@type": "Question",
        "name": "How can I hire David for my project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact David through his portfolio at mriridescent-digitalpolymat.netlify.app, email mriridescent@yahoo.com, or connect via LinkedIn. He offers free initial consultations to discuss your project needs."
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData, null, 2)
      }}
    />
  )
}
