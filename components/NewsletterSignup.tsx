'use client'

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'inline'
  className?: string
}

export function NewsletterSignup({ variant = 'default', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    if (!email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    try {
      // Simulate API call - replace with actual newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000))

      // For demo purposes, always succeed
      setStatus('success')
      setMessage('Thank you for subscribing! Check your email for confirmation.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-lg border border-slate-200 p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Mail className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Stay Updated</h3>
            <p className="text-slate-600 text-sm">Get polymathic insights</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            disabled={status === 'loading'}
          />
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <div className="mt-3 flex items-center gap-2 text-emerald-600 text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{message}</span>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <div className="mt-3 flex items-center gap-2 text-emerald-600">
            <CheckCircle className="h-5 w-5" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-3 flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>{message}</span>
          </div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={`bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-center text-white ${className}`}>
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail className="h-8 w-8" />
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
      <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
        Get notified when I publish new insights on polymathic development, systems thinking, 
        and interdisciplinary problem-solving.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>

      {status === 'success' && (
        <div className="mt-6 flex items-center justify-center gap-2 text-white">
          <CheckCircle className="h-5 w-5" />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 flex items-center justify-center gap-2 text-red-200">
          <AlertCircle className="h-5 w-5" />
          <span>{message}</span>
        </div>
      )}

      <p className="text-sm opacity-75 mt-6">
        No spam, ever. Unsubscribe at any time.
      </p>
    </div>
  )
}
