// AI-Powered Personalization Engine
// Context-aware theme selection and dynamic content adaptation

export interface UserContext {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  location?: {
    city?: string
    country?: string
    timezone?: string
    coordinates?: { lat: number; lng: number }
  }
  device: {
    type: 'mobile' | 'tablet' | 'desktop'
    performance: 'low' | 'medium' | 'high'
    preferredMotion: boolean
  }
  weather?: {
    condition: string
    temperature: number
    description: string
  }
  visitHistory: {
    count: number
    lastThemes: string[]
    preferences: string[]
  }
}

export interface PersonalizationRules {
  themeAffinity: { [key: string]: number }
  layoutPreference: string[]
  animationIntensity: number
  colorTemperature: 'warm' | 'cool' | 'neutral'
  energyLevel: number
}

export class AIPersonalizationEngine {
  private context: UserContext | null = null
  private rules: PersonalizationRules | null = null

  constructor() {
    this.initializeContext()
  }

  private async initializeContext(): Promise<void> {
    this.context = {
      timeOfDay: this.getTimeOfDay(),
      location: await this.getLocationContext(),
      device: this.getDeviceContext(),
      weather: await this.getWeatherContext(),
      visitHistory: this.getVisitHistory()
    }

    this.rules = this.generatePersonalizationRules()
  }

  private getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 17) return 'afternoon'
    if (hour >= 17 && hour < 21) return 'evening'
    return 'night'
  }

  private async getLocationContext(): Promise<UserContext['location']> {
    try {
      // Check if we have cached location data
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('location_context')
        if (cached) {
          try {
            const cachedData = JSON.parse(cached)
            const cacheTime = cachedData.timestamp
            const now = Date.now()
            // Use cached data if less than 1 hour old
            if (now - cacheTime < 3600000) {
              return cachedData.location
            }
          } catch {
            // Clear invalid cached data
            localStorage.removeItem('location_context')
          }
        }
      }

      // Try IP-based geolocation with timeout and error handling
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000) // Reduced to 3 second timeout

      const response = await fetch('https://ipapi.co/json/', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      })
      clearTimeout(timeoutId)

      if (!response.ok) {
        // Silently handle rate limiting and other errors
        return this.getFallbackLocation()
      }

      const text = await response.text()
      let data

      try {
        data = JSON.parse(text)
      } catch {
        // Invalid JSON response, use fallback
        return this.getFallbackLocation()
      }

      // Validate required fields
      if (!data || typeof data !== 'object') {
        return this.getFallbackLocation()
      }

      const locationData = {
        city: data.city || 'Unknown',
        country: data.country_name || 'Unknown',
        timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        coordinates: { lat: data.latitude || 0, lng: data.longitude || 0 }
      }

      // Cache the result
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('location_context', JSON.stringify({
            location: locationData,
            timestamp: Date.now()
          }))
        } catch {
          // Ignore localStorage errors (e.g., quota exceeded)
        }
      }

      return locationData
    } catch (error) {
      // Handle AbortError and other errors silently
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was aborted due to timeout - this is expected behavior
        return this.getFallbackLocation()
      }

      // For other errors, use fallback without logging
      return this.getFallbackLocation()
    }
  }

  private getFallbackLocation(): UserContext['location'] {
    // Provide a reasonable fallback based on timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    // Simple timezone-based location inference
    let city = 'Unknown'
    let country = 'Unknown'

    if (timezone.includes('Lagos') || timezone.includes('Africa')) {
      city = 'Lagos'
      country = 'Nigeria'
    } else if (timezone.includes('New_York') || timezone.includes('America/New_York')) {
      city = 'New York'
      country = 'United States'
    } else if (timezone.includes('London') || timezone.includes('Europe/London')) {
      city = 'London'
      country = 'United Kingdom'
    }

    return {
      city,
      country,
      timezone,
      coordinates: { lat: 0, lng: 0 }
    }
  }

  private getDeviceContext(): UserContext['device'] {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return {
        type: 'desktop',
        performance: 'medium',
        preferredMotion: true
      }
    }

    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent)
    const isTablet = /tablet|ipad/i.test(userAgent)

    // Estimate performance based on device and connection
    const connection = (navigator as unknown as { connection?: { effectiveType?: string } }).connection
    const memoryGB = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4

    let performance: 'low' | 'medium' | 'high' = 'medium'
    if (memoryGB >= 8 && !isMobile) performance = 'high'
    if (memoryGB <= 2 || (connection && connection.effectiveType === '2g')) performance = 'low'

    return {
      type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      performance,
      preferredMotion: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  }

  private async getWeatherContext(): Promise<UserContext['weather']> {
    if (!this.context?.location?.coordinates) return undefined

    try {
      // Using OpenWeatherMap API (you'd need to add your API key)
      const { lat, lng } = this.context.location.coordinates
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=YOUR_API_KEY&units=metric`
      )
      const data = await response.json()
      
      return {
        condition: data.weather[0].main.toLowerCase(),
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description
      }
    } catch (error) {
      console.log('Weather context unavailable:', error)
      return undefined
    }
  }

  private getVisitHistory(): UserContext['visitHistory'] {
    if (typeof window === 'undefined') {
      return { count: 0, lastThemes: [], preferences: [] }
    }

    const count = parseInt(localStorage.getItem('portfolio-visit-count') || '0')
    const lastThemes = JSON.parse(localStorage.getItem('portfolio-last-themes') || '[]')
    const preferences = JSON.parse(localStorage.getItem('portfolio-preferences') || '[]')

    return { count, lastThemes, preferences }
  }

  private generatePersonalizationRules(): PersonalizationRules {
    if (!this.context) {
      return {
        themeAffinity: {},
        layoutPreference: ['centered'],
        animationIntensity: 0.5,
        colorTemperature: 'neutral',
        energyLevel: 5
      }
    }

    const rules: PersonalizationRules = {
      themeAffinity: {},
      layoutPreference: [],
      animationIntensity: 0.5,
      colorTemperature: 'neutral',
      energyLevel: 5
    }

    // Time-based preferences
    switch (this.context.timeOfDay) {
      case 'morning':
        rules.themeAffinity['minimal-zen'] = 0.8
        rules.themeAffinity['organic-forest'] = 0.7
        rules.colorTemperature = 'warm'
        rules.energyLevel = 6
        break
      case 'afternoon':
        rules.themeAffinity['dark-professional'] = 0.9
        rules.themeAffinity['futuristic-hologram'] = 0.7
        rules.energyLevel = 8
        break
      case 'evening':
        rules.themeAffinity['sunset-gradient'] = 0.9
        rules.themeAffinity['artistic-watercolor'] = 0.8
        rules.colorTemperature = 'warm'
        rules.energyLevel = 6
        break
      case 'night':
        rules.themeAffinity['cyberpunk-matrix'] = 0.9
        rules.themeAffinity['cosmic-space'] = 0.8
        rules.themeAffinity['neon-city'] = 0.7
        rules.colorTemperature = 'cool'
        rules.energyLevel = 7
        break
    }

    // Weather-based adjustments
    if (this.context.weather) {
      switch (this.context.weather.condition) {
        case 'rain':
        case 'drizzle':
          rules.themeAffinity['ocean-depths'] = 0.8
          rules.animationIntensity = 0.3
          break
        case 'snow':
          rules.themeAffinity['minimal-zen'] = 0.9
          rules.themeAffinity['monochrome-bold'] = 0.7
          break
        case 'clear':
          rules.themeAffinity['sunset-gradient'] = 0.8
          rules.energyLevel += 2
          break
        case 'clouds':
          rules.themeAffinity['artistic-watercolor'] = 0.7
          break
      }
    }

    // Device-based adjustments
    switch (this.context.device.type) {
      case 'mobile':
        rules.layoutPreference = ['centered', 'flowing']
        rules.animationIntensity *= 0.7
        break
      case 'tablet':
        rules.layoutPreference = ['grid', 'masonry']
        break
      case 'desktop':
        rules.layoutPreference = ['asymmetric', 'split', 'grid']
        if (this.context.device.performance === 'high') {
          rules.animationIntensity *= 1.3
        }
        break
    }

    // Performance adjustments
    if (this.context.device.performance === 'low') {
      rules.animationIntensity *= 0.5
      // Prefer simpler themes
      rules.themeAffinity['minimal-zen'] = (rules.themeAffinity['minimal-zen'] || 0) + 0.3
      rules.themeAffinity['monochrome-bold'] = (rules.themeAffinity['monochrome-bold'] || 0) + 0.3
    }

    // Motion preference
    if (!this.context.device.preferredMotion) {
      rules.animationIntensity = 0.1
    }

    // Visit history learning
    if (this.context.visitHistory.count > 5) {
      // Boost themes that haven't been seen recently
      const recentThemes = this.context.visitHistory.lastThemes.slice(-3)
      Object.keys(rules.themeAffinity).forEach(theme => {
        if (!recentThemes.includes(theme)) {
          rules.themeAffinity[theme] = (rules.themeAffinity[theme] || 0) + 0.2
        }
      })
    }

    return rules
  }

  public getPersonalizedThemeRecommendation(availableThemes: any[]): any {
    if (!this.rules) return availableThemes[0]

    // Score each theme based on personalization rules
    const scoredThemes = availableThemes.map(theme => {
      let score = 0

      // Theme affinity score
      score += this.rules!.themeAffinity[theme.id] || 0

      // Layout preference score
      if (this.rules!.layoutPreference.includes(theme.layout.type)) {
        score += 0.3
      }

      // Energy level matching
      const energyDiff = Math.abs(theme.personality.energy - this.rules!.energyLevel)
      score += (10 - energyDiff) / 10 * 0.2

      // Color temperature matching
      const isWarmTheme = ['sunset-gradient', 'artistic-watercolor', 'organic-forest'].includes(theme.id)
      const isCoolTheme = ['cyberpunk-matrix', 'futuristic-hologram', 'cosmic-space'].includes(theme.id)
      
      if (this.rules!.colorTemperature === 'warm' && isWarmTheme) score += 0.2
      if (this.rules!.colorTemperature === 'cool' && isCoolTheme) score += 0.2

      return { theme, score }
    })

    // Sort by score and return the best match
    scoredThemes.sort((a, b) => b.score - a.score)
    return scoredThemes[0].theme
  }

  public updatePreferences(themeId: string, interaction: 'like' | 'dislike' | 'neutral'): void {
    if (typeof window === 'undefined') return

    const preferences = JSON.parse(localStorage.getItem('portfolio-preferences') || '[]')
    const lastThemes = JSON.parse(localStorage.getItem('portfolio-last-themes') || '[]')

    // Update preferences
    const existingPref = preferences.find((p: any) => p.themeId === themeId)
    if (existingPref) {
      existingPref.score += interaction === 'like' ? 0.1 : interaction === 'dislike' ? -0.1 : 0
    } else {
      preferences.push({
        themeId,
        score: interaction === 'like' ? 0.1 : interaction === 'dislike' ? -0.1 : 0
      })
    }

    // Update last themes (keep last 10)
    lastThemes.unshift(themeId)
    const uniqueLastThemes = [...new Set(lastThemes)].slice(0, 10)

    localStorage.setItem('portfolio-preferences', JSON.stringify(preferences))
    localStorage.setItem('portfolio-last-themes', JSON.stringify(uniqueLastThemes))
  }

  public getContext(): UserContext | null {
    return this.context
  }

  public getRules(): PersonalizationRules | null {
    return this.rules
  }
}
