import Link from 'next/link'
import { Search, Home } from 'lucide-react'
import { BackButton } from '@/components/BackButton'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Search className="h-12 w-12 text-primary-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-slate-600 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          
          <BackButton />
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-slate-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/about" className="text-sm text-primary-600 hover:text-primary-700 underline">
              About
            </Link>
            <Link href="/philosophy" className="text-sm text-primary-600 hover:text-primary-700 underline">
              Philosophy
            </Link>
            <Link href="/case-studies" className="text-sm text-primary-600 hover:text-primary-700 underline">
              Case Studies
            </Link>
            <Link href="/writings" className="text-sm text-primary-600 hover:text-primary-700 underline">
              Writings
            </Link>
            <Link href="/contact" className="text-sm text-primary-600 hover:text-primary-700 underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
