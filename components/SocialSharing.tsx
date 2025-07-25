'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Copy, 
  Check,
  MessageCircle,
  Mail,
  ExternalLink
} from 'lucide-react'

interface SocialSharingProps {
  title?: string
  description?: string
  url?: string
  hashtags?: string[]
  variant?: 'floating' | 'inline' | 'modal'
}

export function SocialSharing({ 
  title = "Check out this amazing Digital Polymat portfolio!",
  description = "David Oke (Mr. Iridescent) - Full Stack Engineer, AI Specialist & Cybersecurity Expert with 20+ years experience. Hire him for transformative digital solutions!",
  url = "https://mriridescent-digitalpolymat.netlify.app",
  hashtags = ["DigitalPolymat", "FullStackDeveloper", "AIEngineer", "Cybersecurity", "HireMe", "TechConsultant", "RemoteWork", "Innovation"],
  variant = 'floating'
}: SocialSharingProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareText = `${title}\n\n${description}\n\n${hashtags.map(tag => `#${tag}`).join(' ')}`
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Share on Twitter'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: 'bg-blue-700 hover:bg-blue-800',
      description: 'Share on LinkedIn'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Share on Facebook'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Share on WhatsApp'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Share via Email'
    }
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (variant === 'floating') {
    return (
      <>
        {/* Floating Share Button */}
        <motion.button
          className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Share2 className="w-6 h-6" />
        </motion.button>

        {/* Floating Share Menu */}
        {isOpen && (
          <motion.div
            className="fixed bottom-20 left-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[280px]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Help Spread the Word! 🚀
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Share this portfolio to help connect me with potential clients and opportunities
            </p>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {shareLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors duration-200 ${link.color}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </motion.a>
                )
              })}
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </motion.div>
        )}

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
        )}
      </>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <Share2 className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">
            Help Me Get Hired! 🎯
          </h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          Love what you see? Share this portfolio to help connect me with potential clients, 
          employers, and exciting opportunities. Your share could be the key to my next big project!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          {shareLinks.map((link) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center space-y-2 px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 ${link.color}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={link.description}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </motion.a>
            )
          })}
        </div>

        <button
          onClick={copyToClipboard}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border border-gray-200 transition-colors duration-200 shadow-sm"
        >
          {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
          <span className={copied ? 'text-green-600' : ''}>{copied ? 'Link Copied!' : 'Copy Portfolio Link'}</span>
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Every share helps me reach the right people. Thank you! 🙏
          </p>
        </div>
      </div>
    )
  }

  return null
}

// Hook for easy integration
export function useSocialSharing() {
  return {
    FloatingShare: () => <SocialSharing variant="floating" />,
    InlineShare: () => <SocialSharing variant="inline" />
  }
}

// Pre-configured sharing for specific contexts
export function HireMeShare() {
  return (
    <SocialSharing
      title="🚀 Hire David Oke - Digital Polymat & Full Stack Engineer!"
      description="Looking for a game-changing developer? David combines 20+ years of coding expertise with AI engineering, cybersecurity, and creative design. Available for hire globally! 💼"
      hashtags={["HireMe", "FullStackDeveloper", "DigitalPolymat", "AIEngineer", "RemoteWork", "TechTalent", "Available", "Consultant"]}
      variant="inline"
    />
  )
}

export function ConsultantShare() {
  return (
    <SocialSharing
      title="💡 Need a Technology Consultant? Meet David Oke!"
      description="Transform your business with expert technology consulting. Specializing in digital transformation, AI implementation, cybersecurity, and scalable solutions. Let's discuss your project! 🎯"
      hashtags={["TechConsultant", "DigitalTransformation", "BusinessGrowth", "Innovation", "Consulting", "TechStrategy", "AI", "Cybersecurity"]}
      variant="inline"
    />
  )
}
