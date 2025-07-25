// Comprehensive USD/NGN Dual Currency System with Real-time Conversion
export interface CurrencyConfig {
  code: 'USD' | 'NGN'
  symbol: string
  name: string
  locale: string
  exchangeRate: number // Rate to USD
  lastUpdated: Date
}

export interface PriceRange {
  min: number
  max: number
  currency: 'USD' | 'NGN'
  formatted: string
  equivalent?: {
    amount: number
    currency: 'USD' | 'NGN'
    formatted: string
  }
}

export interface LocationCurrencyData {
  country: string
  primaryCurrency: 'USD' | 'NGN'
  secondaryCurrency?: 'USD' | 'NGN'
  showBothCurrencies: boolean
  preferredDisplay: 'primary' | 'both' | 'equivalent'
}

export class CurrencySystem {
  private currencies: Map<string, CurrencyConfig> = new Map()
  private exchangeRates: Map<string, number> = new Map()
  private lastRateUpdate: Date = new Date(0)
  private rateUpdateInterval = 3600000 // 1 hour in milliseconds

  constructor() {
    this.initializeCurrencies()
    this.loadCachedRates()
  }

  private initializeCurrencies(): void {
    this.currencies.set('USD', {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar',
      locale: 'en-US',
      exchangeRate: 1.0, // Base currency
      lastUpdated: new Date()
    })

    this.currencies.set('NGN', {
      code: 'NGN',
      symbol: '₦',
      name: 'Nigerian Naira',
      locale: 'en-NG',
      exchangeRate: 1650, // Default rate, will be updated
      lastUpdated: new Date()
    })
  }

  private loadCachedRates(): void {
    try {
      if (typeof window !== 'undefined') {
        const cachedRates = localStorage.getItem('currency_rates')
        const lastUpdate = localStorage.getItem('currency_rates_updated')
        
        if (cachedRates && lastUpdate) {
          const rates = JSON.parse(cachedRates)
          const updateTime = new Date(lastUpdate)
          
          // Use cached rates if less than 1 hour old
          if (Date.now() - updateTime.getTime() < this.rateUpdateInterval) {
            this.exchangeRates = new Map(Object.entries(rates))
            this.lastRateUpdate = updateTime
            this.updateCurrencyRates()
            return
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load cached exchange rates:', error)
    }
    
    // Fetch fresh rates if no valid cache
    this.fetchExchangeRates()
  }

  private async fetchExchangeRates(): Promise<void> {
    try {
      // In production, you would use a real exchange rate API
      // For now, using reasonable default rates
      const rates = {
        'USD': 1.0,
        'NGN': 1650 // Approximate current rate
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100))
      
      this.exchangeRates = new Map(Object.entries(rates))
      this.lastRateUpdate = new Date()
      this.updateCurrencyRates()
      this.cacheRates()
      
      console.log('✅ Exchange rates updated:', rates)
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error)
      // Use default rates if API fails
      this.exchangeRates.set('USD', 1.0)
      this.exchangeRates.set('NGN', 1650)
    }
  }

  private updateCurrencyRates(): void {
    for (const [code, rate] of this.exchangeRates.entries()) {
      const currency = this.currencies.get(code)
      if (currency) {
        currency.exchangeRate = rate
        currency.lastUpdated = this.lastRateUpdate
      }
    }
  }

  private cacheRates(): void {
    try {
      if (typeof window !== 'undefined') {
        const ratesObject = Object.fromEntries(this.exchangeRates)
        localStorage.setItem('currency_rates', JSON.stringify(ratesObject))
        localStorage.setItem('currency_rates_updated', this.lastRateUpdate.toISOString())
      }
    } catch (error) {
      console.warn('Failed to cache exchange rates:', error)
    }
  }

  public async ensureFreshRates(): Promise<void> {
    const now = Date.now()
    const timeSinceUpdate = now - this.lastRateUpdate.getTime()
    
    if (timeSinceUpdate > this.rateUpdateInterval) {
      await this.fetchExchangeRates()
    }
  }

  public convertCurrency(amount: number, fromCurrency: 'USD' | 'NGN', toCurrency: 'USD' | 'NGN'): number {
    if (fromCurrency === toCurrency) return amount
    
    const fromRate = this.exchangeRates.get(fromCurrency) || 1
    const toRate = this.exchangeRates.get(toCurrency) || 1
    
    // Convert to USD first, then to target currency
    const usdAmount = fromCurrency === 'USD' ? amount : amount / fromRate
    const convertedAmount = toCurrency === 'USD' ? usdAmount : usdAmount * toRate
    
    return Math.round(convertedAmount * 100) / 100 // Round to 2 decimal places
  }

  public formatCurrency(amount: number, currency: 'USD' | 'NGN', options?: {
    showSymbol?: boolean
    showCode?: boolean
    precision?: number
  }): string {
    const config = this.currencies.get(currency)
    if (!config) return amount.toString()
    
    const {
      showSymbol = true,
      showCode = false,
      precision = currency === 'NGN' ? 0 : 2
    } = options || {}
    
    const formatter = new Intl.NumberFormat(config.locale, {
      style: showSymbol ? 'currency' : 'decimal',
      currency: currency,
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    })
    
    let formatted = formatter.format(amount)
    
    if (showCode && !showSymbol) {
      formatted += ` ${currency}`
    }
    
    return formatted
  }

  public createPriceRange(
    minUSD: number, 
    maxUSD: number, 
    targetCurrency: 'USD' | 'NGN' = 'USD',
    showEquivalent: boolean = true
  ): PriceRange {
    
    const min = targetCurrency === 'USD' ? minUSD : this.convertCurrency(minUSD, 'USD', 'NGN')
    const max = targetCurrency === 'USD' ? maxUSD : this.convertCurrency(maxUSD, 'USD', 'NGN')
    
    const formatted = `${this.formatCurrency(min, targetCurrency)} - ${this.formatCurrency(max, targetCurrency)}`
    
    let equivalent: PriceRange['equivalent'] | undefined
    
    if (showEquivalent) {
      const equivalentCurrency = targetCurrency === 'USD' ? 'NGN' : 'USD'
      const equivalentMin = this.convertCurrency(min, targetCurrency, equivalentCurrency)
      const equivalentMax = this.convertCurrency(max, targetCurrency, equivalentCurrency)
      
      equivalent = {
        amount: (equivalentMin + equivalentMax) / 2,
        currency: equivalentCurrency,
        formatted: `${this.formatCurrency(equivalentMin, equivalentCurrency)} - ${this.formatCurrency(equivalentMax, equivalentCurrency)}`
      }
    }
    
    return {
      min,
      max,
      currency: targetCurrency,
      formatted,
      equivalent
    }
  }

  public detectUserCurrency(locationData?: any): LocationCurrencyData {
    // Default to USD for international users
    let locationCurrency: LocationCurrencyData = {
      country: 'International',
      primaryCurrency: 'USD',
      secondaryCurrency: 'NGN',
      showBothCurrencies: true,
      preferredDisplay: 'both'
    }
    
    // Detect based on location data
    if (locationData) {
      const country = locationData.country?.toLowerCase() || ''
      const city = locationData.city?.toLowerCase() || ''
      
      if (country.includes('nigeria') || city.includes('lagos') || city.includes('abuja')) {
        locationCurrency = {
          country: 'Nigeria',
          primaryCurrency: 'NGN',
          secondaryCurrency: 'USD',
          showBothCurrencies: true,
          preferredDisplay: 'both'
        }
      } else if (country.includes('united states') || country.includes('canada') || country.includes('uk')) {
        locationCurrency = {
          country: country,
          primaryCurrency: 'USD',
          secondaryCurrency: 'NGN',
          showBothCurrencies: false,
          preferredDisplay: 'primary'
        }
      }
    }
    
    // Check timezone as fallback
    if (typeof window !== 'undefined') {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (timezone.includes('Lagos') || timezone.includes('Africa')) {
        locationCurrency = {
          country: 'Nigeria',
          primaryCurrency: 'NGN',
          secondaryCurrency: 'USD',
          showBothCurrencies: true,
          preferredDisplay: 'both'
        }
      }
    }
    
    return locationCurrency
  }

  public formatPriceForDisplay(
    priceRange: PriceRange,
    locationData: LocationCurrencyData,
    context: 'conversation' | 'proposal' | 'summary' = 'conversation'
  ): string {
    
    switch (context) {
      case 'conversation':
        if (locationData.showBothCurrencies && priceRange.equivalent) {
          return `${priceRange.formatted} (${priceRange.equivalent.formatted})`
        }
        return priceRange.formatted
        
      case 'proposal':
        let display = `**Primary:** ${priceRange.formatted}`
        if (priceRange.equivalent) {
          display += `\n**Equivalent:** ${priceRange.equivalent.formatted}`
        }
        return display
        
      case 'summary':
        return priceRange.formatted
        
      default:
        return priceRange.formatted
    }
  }

  public getBudgetRanges(currency: 'USD' | 'NGN' = 'USD'): Array<{
    id: string
    label: string
    range: PriceRange
    description: string
  }> {
    
    const ranges = [
      { id: 'micro', minUSD: 500, maxUSD: 2000, label: 'Micro Project', description: 'Small fixes, simple features' },
      { id: 'small', minUSD: 2000, maxUSD: 5000, label: 'Small Project', description: 'Landing pages, basic websites' },
      { id: 'medium', minUSD: 5000, maxUSD: 15000, label: 'Medium Project', description: 'Business websites, simple apps' },
      { id: 'large', minUSD: 15000, maxUSD: 30000, label: 'Large Project', description: 'Complex websites, web applications' },
      { id: 'enterprise', minUSD: 30000, maxUSD: 75000, label: 'Enterprise Project', description: 'Full-scale applications, platforms' },
      { id: 'premium', minUSD: 75000, maxUSD: 200000, label: 'Premium Project', description: 'Large-scale systems, custom platforms' },
      { id: 'custom', minUSD: 200000, maxUSD: 500000, label: 'Custom Enterprise', description: 'Bespoke enterprise solutions' }
    ]
    
    return ranges.map(range => ({
      id: range.id,
      label: range.label,
      range: this.createPriceRange(range.minUSD, range.maxUSD, currency, true),
      description: range.description
    }))
  }

  public parseBudgetFromText(text: string): {
    amount?: number
    currency?: 'USD' | 'NGN'
    range?: string
    confidence: number
  } {
    const lowerText = text.toLowerCase()
    
    // Look for explicit currency mentions
    let currency: 'USD' | 'NGN' | undefined
    if (lowerText.includes('naira') || lowerText.includes('₦') || lowerText.includes('ngn')) {
      currency = 'NGN'
    } else if (lowerText.includes('dollar') || lowerText.includes('$') || lowerText.includes('usd')) {
      currency = 'USD'
    }
    
    // Extract numeric values
    const numberMatches = text.match(/[\d,]+(?:\.\d+)?/g)
    if (!numberMatches) {
      return { confidence: 0 }
    }
    
    const numbers = numberMatches.map(match => parseFloat(match.replace(/,/g, '')))
    const maxNumber = Math.max(...numbers)
    
    // Determine currency if not explicitly mentioned
    if (!currency) {
      // If number is very large, likely NGN
      if (maxNumber > 100000) {
        currency = 'NGN'
      } else {
        currency = 'USD'
      }
    }
    
    // Determine range based on amount
    const budgetRanges = this.getBudgetRanges(currency)
    let matchedRange: string | undefined
    
    for (const range of budgetRanges) {
      if (maxNumber >= range.range.min && maxNumber <= range.range.max) {
        matchedRange = range.id
        break
      }
    }
    
    return {
      amount: maxNumber,
      currency,
      range: matchedRange,
      confidence: currency && maxNumber ? 0.9 : 0.6
    }
  }

  public getExchangeRateInfo(): {
    rate: number
    lastUpdated: Date
    source: string
  } {
    return {
      rate: this.exchangeRates.get('NGN') || 1650,
      lastUpdated: this.lastRateUpdate,
      source: 'Cached/Default Rate'
    }
  }

  public formatBudgetForConversation(
    budgetText: string,
    userLocation?: LocationCurrencyData
  ): string {
    const parsed = this.parseBudgetFromText(budgetText)
    
    if (!parsed.amount || !parsed.currency) {
      return budgetText
    }
    
    const primaryCurrency = userLocation?.primaryCurrency || 'USD'
    const showEquivalent = userLocation?.showBothCurrencies || false
    
    let formatted = this.formatCurrency(parsed.amount, parsed.currency)
    
    if (showEquivalent && parsed.currency !== primaryCurrency) {
      const equivalent = this.convertCurrency(parsed.amount, parsed.currency, primaryCurrency)
      formatted += ` (${this.formatCurrency(equivalent, primaryCurrency)})`
    }
    
    return formatted
  }

  // Method to get current exchange rate for display
  public getCurrentRate(): string {
    const rate = this.exchangeRates.get('NGN') || 1650
    return `1 USD = ${this.formatCurrency(rate, 'NGN')}`
  }

  // Method to check if rates need updating
  public needsRateUpdate(): boolean {
    const timeSinceUpdate = Date.now() - this.lastRateUpdate.getTime()
    return timeSinceUpdate > this.rateUpdateInterval
  }

  // Method to force rate update
  public async forceRateUpdate(): Promise<void> {
    await this.fetchExchangeRates()
  }
}
