'use client'

import { useEffect, useState } from 'react'

interface UltraFastLoaderProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function UltraFastLoader({ 
  children, 
  delay = 0,
  className = "" 
}: UltraFastLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!isLoaded) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-lg h-full w-full"></div>
      </div>
    )
  }

  return <>{children}</>
}

// Skeleton components for ultra-fast perceived loading
export const SkeletonCard = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-lg h-48 w-full"></div>
  </div>
)

export const SkeletonText = ({ lines = 3, className = "" }: { lines?: number; className?: string }) => (
  <div className={`animate-pulse space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i}
        className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] h-4 rounded"
        style={{ width: `${Math.random() * 40 + 60}%` }}
      ></div>
    ))}
  </div>
)

export const SkeletonHero = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
    <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
      {/* Profile image skeleton */}
      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
      
      {/* Title skeleton */}
      <div className="space-y-4">
        <div className="h-12 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-lg mx-auto w-3/4"></div>
        <div className="h-8 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-lg mx-auto w-1/2"></div>
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded w-full"></div>
        <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded w-4/5 mx-auto"></div>
        <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded w-3/5 mx-auto"></div>
      </div>
      
      {/* Buttons skeleton */}
      <div className="flex gap-4 justify-center">
        <div className="h-12 w-32 bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-600 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-lg"></div>
        <div className="h-12 w-32 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded-lg"></div>
      </div>
    </div>
  </div>
)

// Progressive loading indicator
export const ProgressiveLoader = ({ progress = 0 }: { progress?: number }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
    <div 
      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
)
