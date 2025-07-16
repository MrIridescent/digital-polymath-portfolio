'use client'

import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  className?: string
  children?: React.ReactNode
}

export function BackButton({ className = '', children = 'Go Back' }: BackButtonProps) {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {children}
    </button>
  )
}
