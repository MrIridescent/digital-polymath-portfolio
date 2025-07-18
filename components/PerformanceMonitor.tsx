'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  interactionTime: number
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Measure performance metrics
    const measurePerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        const loadTime = navigation.loadEventEnd - navigation.fetchStart
        const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
        const interactionTime = navigation.domInteractive - navigation.fetchStart

        setMetrics({
          loadTime: Math.round(loadTime),
          renderTime: Math.round(renderTime),
          interactionTime: Math.round(interactionTime)
        })
      }
    }

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance()
    } else {
      window.addEventListener('load', measurePerformance)
    }

    // Show/hide with keyboard shortcut (Ctrl+Shift+P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('load', measurePerformance)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isVisible])

  if (!metrics || !isVisible) return null

  const getPerformanceColor = (time: number, thresholds: [number, number]) => {
    if (time <= thresholds[0]) return 'text-green-500'
    if (time <= thresholds[1]) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-lg z-50 font-mono text-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="font-semibold">Performance Monitor</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span>Load Time:</span>
          <span className={getPerformanceColor(metrics.loadTime, [1000, 3000])}>
            {metrics.loadTime}ms
          </span>
        </div>
        
        <div className="flex justify-between gap-4">
          <span>Render Time:</span>
          <span className={getPerformanceColor(metrics.renderTime, [100, 300])}>
            {metrics.renderTime}ms
          </span>
        </div>
        
        <div className="flex justify-between gap-4">
          <span>Interactive:</span>
          <span className={getPerformanceColor(metrics.interactionTime, [500, 1500])}>
            {metrics.interactionTime}ms
          </span>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-gray-400">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  )
}

// Web Vitals monitoring
export function WebVitalsMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime)
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', (entry as any).processingStart - entry.startTime)
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', (entry as any).value)
          }
        }
      })

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        console.log('Performance monitoring not fully supported')
      }

      return () => observer.disconnect()
    }
  }, [])

  return null
}
