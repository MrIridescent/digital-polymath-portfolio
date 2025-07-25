'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
}

interface ViewportInfo {
  width: number
  height: number
  zoom: number
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'ultrawide'
  orientation: 'portrait' | 'landscape'
}

export function ResponsiveContainer({ children, className = '' }: ResponsiveContainerProps) {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: 1920,
    height: 1080,
    zoom: 1,
    deviceType: 'desktop',
    orientation: 'landscape'
  })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const zoom = window.devicePixelRatio || 1
      
      // Detect device type based on actual viewport
      let deviceType: ViewportInfo['deviceType'] = 'desktop'
      if (width < 640) deviceType = 'mobile'
      else if (width < 1024) deviceType = 'tablet'
      else if (width > 2560) deviceType = 'ultrawide'
      
      const orientation = width > height ? 'landscape' : 'portrait'
      
      setViewport({ width, height, zoom, deviceType, orientation })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('orientationchange', updateViewport)
    
    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('orientationchange', updateViewport)
    }
  }, [])

  // Dynamic container classes based on viewport
  const getContainerClasses = () => {
    const baseClasses = 'w-full min-h-screen overflow-x-hidden'
    
    // Responsive padding based on device and zoom
    let paddingClasses = ''
    switch (viewport.deviceType) {
      case 'mobile':
        paddingClasses = 'px-2 sm:px-4'
        break
      case 'tablet':
        paddingClasses = 'px-4 sm:px-6 md:px-8'
        break
      case 'desktop':
        paddingClasses = 'px-4 sm:px-6 lg:px-8 xl:px-12'
        break
      case 'ultrawide':
        paddingClasses = 'px-8 sm:px-12 lg:px-16 xl:px-24 2xl:px-32'
        break
    }
    
    // Zoom-aware adjustments
    const zoomClasses = viewport.zoom > 1.5 ? 'text-sm' : viewport.zoom < 0.8 ? 'text-lg' : ''
    
    return `${baseClasses} ${paddingClasses} ${zoomClasses} ${className}`
  }

  // Dynamic font scaling
  const getFontScale = () => {
    if (viewport.width < 640) return 0.9 // Mobile
    if (viewport.width < 1024) return 0.95 // Tablet
    if (viewport.width > 2560) return 1.1 // Ultrawide
    return 1 // Desktop
  }

  return (
    <motion.div
      className={getContainerClasses()}
      style={{
        fontSize: `${getFontScale()}rem`,
        '--viewport-width': `${viewport.width}px`,
        '--viewport-height': `${viewport.height}px`,
        '--device-type': viewport.deviceType,
      } as React.CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// Hook for accessing viewport information
export function useViewport() {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: 1920,
    height: 1080,
    zoom: 1,
    deviceType: 'desktop',
    orientation: 'landscape'
  })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const zoom = window.devicePixelRatio || 1
      
      let deviceType: ViewportInfo['deviceType'] = 'desktop'
      if (width < 640) deviceType = 'mobile'
      else if (width < 1024) deviceType = 'tablet'
      else if (width > 2560) deviceType = 'ultrawide'
      
      const orientation = width > height ? 'landscape' : 'portrait'
      
      setViewport({ width, height, zoom, deviceType, orientation })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('orientationchange', updateViewport)
    
    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('orientationchange', updateViewport)
    }
  }, [])

  return viewport
}

// Responsive text component
interface ResponsiveTextProps {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  className?: string
}

export function ResponsiveText({ children, size = 'base', className = '' }: ResponsiveTextProps) {
  const viewport = useViewport()
  
  const getSizeClasses = () => {
    const sizeMap = {
      xs: 'text-xs sm:text-sm',
      sm: 'text-sm sm:text-base',
      base: 'text-sm sm:text-base lg:text-lg',
      lg: 'text-base sm:text-lg lg:text-xl',
      xl: 'text-lg sm:text-xl lg:text-2xl',
      '2xl': 'text-xl sm:text-2xl lg:text-3xl',
      '3xl': 'text-2xl sm:text-3xl lg:text-4xl',
      '4xl': 'text-3xl sm:text-4xl lg:text-5xl',
      '5xl': 'text-4xl sm:text-5xl lg:text-6xl',
      '6xl': 'text-5xl sm:text-6xl lg:text-7xl'
    }
    
    let baseSize = sizeMap[size]
    
    // Adjust for device type
    if (viewport.deviceType === 'mobile') {
      baseSize = baseSize.replace(/lg:text-\w+/g, '') // Remove large screen sizes on mobile
    }
    
    return baseSize
  }
  
  return (
    <span className={`${getSizeClasses()} ${className} leading-relaxed`}>
      {children}
    </span>
  )
}

// Responsive spacing component
interface ResponsiveSpacingProps {
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function ResponsiveSpacing({ 
  children, 
  padding = 'md', 
  margin = 'none', 
  className = '' 
}: ResponsiveSpacingProps) {
  const viewport = useViewport()
  
  const getSpacingClasses = () => {
    const paddingMap = {
      none: '',
      sm: 'p-2 sm:p-3 lg:p-4',
      md: 'p-3 sm:p-4 lg:p-6 xl:p-8',
      lg: 'p-4 sm:p-6 lg:p-8 xl:p-12',
      xl: 'p-6 sm:p-8 lg:p-12 xl:p-16'
    }
    
    const marginMap = {
      none: '',
      sm: 'm-2 sm:m-3 lg:m-4',
      md: 'm-3 sm:m-4 lg:m-6 xl:m-8',
      lg: 'm-4 sm:m-6 lg:m-8 xl:m-12',
      xl: 'm-6 sm:m-8 lg:m-12 xl:m-16'
    }
    
    let classes = `${paddingMap[padding]} ${marginMap[margin]}`
    
    // Reduce spacing on mobile for better space utilization
    if (viewport.deviceType === 'mobile') {
      classes = classes.replace(/xl:\w+-\d+/g, '') // Remove xl spacing on mobile
    }
    
    return classes
  }
  
  return (
    <div className={`${getSpacingClasses()} ${className}`}>
      {children}
    </div>
  )
}
