'use client'

import { Download } from 'lucide-react'

interface PrintButtonProps {
  className?: string
  children?: React.ReactNode
}

export function PrintButton({ className = '', children = 'Download PDF' }: PrintButtonProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className={`inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors ${className}`}
    >
      <Download className="h-5 w-5" />
      {children}
    </button>
  )
}
