'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Quote } from 'lucide-react'

interface QuoteData {
  text: string
  author: string
  context: string
  category: 'vision' | 'innovation' | 'philosophy' | 'future' | 'creativity'
}

const polymathQuotes: QuoteData[] = [
  // Leonardo da Vinci - The Ultimate Polymath
  {
    text: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
    context: "Renaissance Polymath, Artist, Inventor, Scientist",
    category: "philosophy"
  },
  {
    text: "Obstacles cannot crush me; every obstacle yields to stern resolve.",
    author: "Leonardo da Vinci", 
    context: "Master of Art, Science, and Engineering",
    category: "vision"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    context: "Renaissance Master of Multiple Disciplines",
    category: "philosophy"
  },

  // Nikola Tesla - Visionary Inventor
  {
    text: "The present is theirs; the future, for which I really worked, is mine.",
    author: "Nikola Tesla",
    context: "Electrical Engineer, Inventor, Futurist",
    category: "future"
  },
  {
    text: "When wireless is perfectly applied the whole earth will be converted into a huge brain.",
    author: "Nikola Tesla",
    context: "Predicting the Internet in 1926",
    category: "vision"
  },
  {
    text: "Invention is the most important product of man's creative brain.",
    author: "Nikola Tesla",
    context: "Pioneer of Modern Electrical Systems",
    category: "creativity"
  },

  // Benjamin Franklin - Founding Polymath
  {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
    context: "Scientist, Inventor, Diplomat, Writer",
    category: "philosophy"
  },
  {
    text: "Tell me and I forget, teach me and I may remember, involve me and I learn.",
    author: "Benjamin Franklin",
    context: "Polymath of the Enlightenment",
    category: "philosophy"
  },

  // Modern Tech Visionaries
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    context: "Computer Scientist, Inventor of Object-Oriented Programming",
    category: "future"
  },
  {
    text: "Technology is nothing. What's important is that you have a faith in people.",
    author: "Steve Jobs",
    context: "Co-founder of Apple, Design Visionary",
    category: "philosophy"
  },
  {
    text: "The Internet is becoming the town square for the global village of tomorrow.",
    author: "Bill Gates",
    context: "Microsoft Co-founder, Philanthropist",
    category: "vision"
  },

  // Scientific Polymaths
  {
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
    context: "Theoretical Physicist, Philosopher of Science",
    category: "creativity"
  },
  {
    text: "The important thing is not to stop questioning.",
    author: "Albert Einstein",
    context: "Nobel Prize Winner, Renaissance Mind",
    category: "philosophy"
  },
  {
    text: "If I have seen further it is by standing on the shoulders of giants.",
    author: "Isaac Newton",
    context: "Mathematician, Physicist, Astronomer, Alchemist",
    category: "philosophy"
  },

  // Contemporary Innovators
  {
    text: "The future belongs to those who learn more skills and combine them in creative ways.",
    author: "Robert Greene",
    context: "Author of 'Mastery', Student of Human Excellence",
    category: "future"
  },
  {
    text: "In the beginner's mind there are many possibilities, in the expert's mind there are few.",
    author: "Shunryu Suzuki",
    context: "Zen Master, Philosophy of Continuous Learning",
    category: "philosophy"
  },

  // African Innovators & Polymaths
  {
    text: "The introduction of parallel computing into mathematics is a quantum shift comparable to quantum mechanics in physics.",
    author: "Philip Emeagwali",
    context: "Nigerian Computer Scientist, Supercomputing Pioneer",
    category: "innovation"
  },

  // Modern Multipotentialites
  {
    text: "Your greatest strength is your ability to synthesize ideas from different fields.",
    author: "Emilie Wapnick",
    context: "Author of 'How to Be Everything', Multipotentialite Advocate",
    category: "creativity"
  },
  {
    text: "The future belongs to those who can navigate complexity and synthesize knowledge across domains.",
    author: "David Epstein",
    context: "Author of 'Range', Advocate for Generalist Thinking",
    category: "future"
  },

  // Experience & Mastery
  {
    text: "Experience is not what happens to you; it's what you do with what happens to you.",
    author: "Aldous Huxley",
    context: "Author and Philosopher",
    category: "philosophy"
  },
  {
    text: "True knowledge exists in knowing that you know nothing.",
    author: "Socrates",
    context: "Ancient Greek Philosopher",
    category: "philosophy"
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
    context: "Actress and Lifelong Learner",
    category: "philosophy"
  }
]

interface PolymathQuoteTickerProps {
  variant?: 'horizontal' | 'vertical' | 'fade'
  speed?: 'slow' | 'medium' | 'fast'
  category?: 'vision' | 'innovation' | 'philosophy' | 'future' | 'creativity' | 'all'
  className?: string
}

export function PolymathQuoteTicker({ 
  variant = 'horizontal', 
  speed = 'medium',
  category = 'all',
  className = ""
}: PolymathQuoteTickerProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  
  const filteredQuotes = category === 'all' 
    ? polymathQuotes 
    : polymathQuotes.filter(quote => quote.category === category)

  const speedConfig = {
    slow: 8000,
    medium: 6000,
    fast: 4000
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % filteredQuotes.length)
    }, speedConfig[speed])

    return () => clearInterval(interval)
  }, [filteredQuotes.length, speed])

  const currentQuote = filteredQuotes[currentQuoteIndex]

  if (variant === 'horizontal') {
    return (
      <div className={`overflow-hidden bg-gradient-to-r from-primary-50 to-accent-50 border-l-4 border-primary-500 ${className}`}>
        <motion.div
          key={currentQuoteIndex}
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{ 
            duration: speedConfig[speed] / 1000,
            ease: 'linear',
            repeat: Infinity
          }}
          className="whitespace-nowrap py-3 px-4"
        >
          <span className="text-sm md:text-base font-medium text-slate-700">
            <Quote className="inline h-4 w-4 mr-2 text-primary-600" />
            "{currentQuote.text}" 
            <span className="text-primary-600 font-semibold ml-2">— {currentQuote.author}</span>
            <span className="text-slate-500 text-xs ml-2">({currentQuote.context})</span>
          </span>
        </motion.div>
      </div>
    )
  }

  if (variant === 'fade') {
    return (
      <motion.div
        key={currentQuoteIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        className={`text-center p-6 bg-gradient-to-br from-slate-50 to-primary-50 rounded-lg border border-primary-200 ${className}`}
      >
        <Quote className="h-8 w-8 text-primary-600 mx-auto mb-4" />
        <blockquote className="text-lg md:text-xl font-medium text-slate-700 mb-4 italic">
          "{currentQuote.text}"
        </blockquote>
        <div className="text-primary-600 font-semibold">— {currentQuote.author}</div>
        <div className="text-sm text-slate-500 mt-1">{currentQuote.context}</div>
      </motion.div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <motion.div
        key={currentQuoteIndex}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="border-l-4 border-primary-500 pl-4 py-2"
      >
        <blockquote className="text-base md:text-lg font-medium text-slate-700 mb-2">
          "{currentQuote.text}"
        </blockquote>
        <div className="text-primary-600 font-semibold text-sm">— {currentQuote.author}</div>
        <div className="text-xs text-slate-500">{currentQuote.context}</div>
      </motion.div>
    </div>
  )
}

// Specific quote components for different sections
export function HeroQuote() {
  return (
    <PolymathQuoteTicker 
      variant="fade" 
      category="vision" 
      speed="slow"
      className="max-w-2xl mx-auto mt-8"
    />
  )
}

export function FooterQuote() {
  return (
    <PolymathQuoteTicker 
      variant="horizontal" 
      category="philosophy" 
      speed="medium"
      className="mt-8"
    />
  )
}

export function SectionQuote({ category }: { category: 'vision' | 'innovation' | 'philosophy' | 'future' | 'creativity' }) {
  return (
    <PolymathQuoteTicker 
      variant="vertical" 
      category={category} 
      speed="fast"
      className="mb-8"
    />
  )
}
