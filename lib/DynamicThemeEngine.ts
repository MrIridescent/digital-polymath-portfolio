// Dynamic Theme Engine - 12 Variants Portfolio System
// Based on the Dynamic, AI-Driven Portfolio Design blueprint

export interface ThemeVariant {
  id: string
  name: string
  category: 'cyberpunk' | 'minimalist' | 'organic' | 'retro' | 'futuristic' | 'artistic'
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
  }
  layout: {
    type: 'grid' | 'masonry' | 'asymmetric' | 'flowing' | 'centered' | 'split'
    columns: string
    rows: string
    areas: string
    gap: string
  }
  typography: {
    primary: string
    secondary: string
    scale: number
    weight: string
  }
  animations: {
    speed: 'slow' | 'medium' | 'fast'
    intensity: 'subtle' | 'medium' | 'dynamic'
    style: 'smooth' | 'bouncy' | 'elastic' | 'sharp'
  }
  effects: {
    particles: boolean
    gradients: boolean
    shadows: boolean
    blur: boolean
    glow: boolean
  }
  personality: {
    mood: 'professional' | 'creative' | 'mysterious' | 'energetic' | 'calm' | 'bold'
    energy: number // 1-10
    sophistication: number // 1-10
  }
}

export const THEME_VARIANTS: ThemeVariant[] = [
  {
    id: 'cyberpunk-matrix',
    name: 'Cyberpunk Matrix',
    category: 'cyberpunk',
    colors: {
      primary: '#00ff41',
      secondary: '#ff0080',
      accent: '#00ffff',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#00ff41',
      textSecondary: '#80ff80'
    },
    layout: {
      type: 'asymmetric',
      columns: '1fr 2fr 1fr',
      rows: 'auto 1fr auto',
      areas: '"header header sidebar" "main main sidebar" "footer footer footer"',
      gap: '2rem'
    },
    typography: {
      primary: 'JetBrains Mono',
      secondary: 'Inter',
      scale: 1.2,
      weight: '500'
    },
    animations: {
      speed: 'fast',
      intensity: 'dynamic',
      style: 'sharp'
    },
    effects: {
      particles: true,
      gradients: true,
      shadows: true,
      blur: false,
      glow: true
    },
    personality: {
      mood: 'mysterious',
      energy: 9,
      sophistication: 8
    }
  },
  {
    id: 'minimal-zen',
    name: 'Minimal Zen',
    category: 'minimalist',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b'
    },
    layout: {
      type: 'centered',
      columns: '1fr min(65ch, 100%) 1fr',
      rows: 'auto 1fr auto',
      areas: '"header header header" ". main ." "footer footer footer"',
      gap: '3rem'
    },
    typography: {
      primary: 'Inter',
      secondary: 'Inter',
      scale: 1.0,
      weight: '400'
    },
    animations: {
      speed: 'slow',
      intensity: 'subtle',
      style: 'smooth'
    },
    effects: {
      particles: false,
      gradients: false,
      shadows: true,
      blur: false,
      glow: false
    },
    personality: {
      mood: 'calm',
      energy: 3,
      sophistication: 9
    }
  },
  {
    id: 'organic-forest',
    name: 'Organic Forest',
    category: 'organic',
    colors: {
      primary: '#059669',
      secondary: '#92400e',
      accent: '#dc2626',
      background: '#f0fdf4',
      surface: '#ecfdf5',
      text: '#064e3b',
      textSecondary: '#065f46'
    },
    layout: {
      type: 'flowing',
      columns: 'repeat(auto-fit, minmax(300px, 1fr))',
      rows: 'masonry',
      areas: 'none',
      gap: '1.5rem'
    },
    typography: {
      primary: 'Inter',
      secondary: 'JetBrains Mono',
      scale: 1.1,
      weight: '500'
    },
    animations: {
      speed: 'medium',
      intensity: 'medium',
      style: 'elastic'
    },
    effects: {
      particles: true,
      gradients: true,
      shadows: false,
      blur: true,
      glow: false
    },
    personality: {
      mood: 'calm',
      energy: 5,
      sophistication: 7
    }
  },
  {
    id: 'retro-synthwave',
    name: 'Retro Synthwave',
    category: 'retro',
    colors: {
      primary: '#ff0080',
      secondary: '#00ffff',
      accent: '#ffff00',
      background: '#1a0033',
      surface: '#2d1b69',
      text: '#ffffff',
      textSecondary: '#ff80ff'
    },
    layout: {
      type: 'grid',
      columns: 'repeat(12, 1fr)',
      rows: 'auto 1fr auto',
      areas: '"h h h h h h h h h h h h" "s s m m m m m m m m e e" "f f f f f f f f f f f f"',
      gap: '1rem'
    },
    typography: {
      primary: 'JetBrains Mono',
      secondary: 'Inter',
      scale: 1.3,
      weight: '700'
    },
    animations: {
      speed: 'fast',
      intensity: 'dynamic',
      style: 'bouncy'
    },
    effects: {
      particles: true,
      gradients: true,
      shadows: true,
      blur: false,
      glow: true
    },
    personality: {
      mood: 'energetic',
      energy: 10,
      sophistication: 6
    }
  },
  {
    id: 'futuristic-hologram',
    name: 'Futuristic Hologram',
    category: 'futuristic',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#e2e8f0',
      textSecondary: '#94a3b8'
    },
    layout: {
      type: 'split',
      columns: '1fr 1fr',
      rows: 'auto 1fr auto',
      areas: '"header header" "main sidebar" "footer footer"',
      gap: '2rem'
    },
    typography: {
      primary: 'Inter',
      secondary: 'JetBrains Mono',
      scale: 1.1,
      weight: '600'
    },
    animations: {
      speed: 'medium',
      intensity: 'dynamic',
      style: 'smooth'
    },
    effects: {
      particles: true,
      gradients: true,
      shadows: true,
      blur: true,
      glow: true
    },
    personality: {
      mood: 'professional',
      energy: 7,
      sophistication: 9
    }
  },
  {
    id: 'artistic-watercolor',
    name: 'Artistic Watercolor',
    category: 'artistic',
    colors: {
      primary: '#7c3aed',
      secondary: '#ec4899',
      accent: '#f59e0b',
      background: '#fefce8',
      surface: '#fef3c7',
      text: '#581c87',
      textSecondary: '#7c2d12'
    },
    layout: {
      type: 'masonry',
      columns: 'repeat(auto-fill, minmax(250px, 1fr))',
      rows: 'masonry',
      areas: 'none',
      gap: '2rem'
    },
    typography: {
      primary: 'Inter',
      secondary: 'Inter',
      scale: 1.2,
      weight: '400'
    },
    animations: {
      speed: 'slow',
      intensity: 'medium',
      style: 'elastic'
    },
    effects: {
      particles: false,
      gradients: true,
      shadows: false,
      blur: true,
      glow: false
    },
    personality: {
      mood: 'creative',
      energy: 6,
      sophistication: 8
    }
  },
  {
    id: 'dark-professional',
    name: 'Dark Professional',
    category: 'minimalist',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#111827',
      surface: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#d1d5db'
    },
    layout: {
      type: 'grid',
      columns: 'repeat(4, 1fr)',
      rows: 'auto 1fr auto',
      areas: '"h h h h" "m m m s" "f f f f"',
      gap: '1.5rem'
    },
    typography: {
      primary: 'Inter',
      secondary: 'JetBrains Mono',
      scale: 1.0,
      weight: '500'
    },
    animations: {
      speed: 'medium',
      intensity: 'subtle',
      style: 'smooth'
    },
    effects: {
      particles: false,
      gradients: true,
      shadows: true,
      blur: false,
      glow: false
    },
    personality: {
      mood: 'professional',
      energy: 5,
      sophistication: 10
    }
  },
  {
    id: 'neon-city',
    name: 'Neon City',
    category: 'cyberpunk',
    colors: {
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
      accent: '#ffe66d',
      background: '#2c2c54',
      surface: '#40407a',
      text: '#ffffff',
      textSecondary: '#ddd'
    },
    layout: {
      type: 'asymmetric',
      columns: '2fr 1fr',
      rows: 'auto 1fr 1fr auto',
      areas: '"header sidebar" "main sidebar" "main extra" "footer footer"',
      gap: '1rem'
    },
    typography: {
      primary: 'JetBrains Mono',
      secondary: 'Inter',
      scale: 1.1,
      weight: '600'
    },
    animations: {
      speed: 'fast',
      intensity: 'dynamic',
      style: 'bouncy'
    },
    effects: {
      particles: true,
      gradients: true,
      shadows: true,
      blur: false,
      glow: true
    },
    personality: {
      mood: 'energetic',
      energy: 9,
      sophistication: 7
    }
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset Gradient',
    category: 'artistic',
    colors: {
      primary: '#f093fb',
      secondary: '#f5576c',
      accent: '#4facfe',
      background: '#667eea',
      surface: '#764ba2',
      text: '#ffffff',
      textSecondary: '#f0f0f0'
    },
    layout: {
      type: 'flowing',
      columns: 'repeat(auto-fit, minmax(280px, 1fr))',
      rows: 'auto',
      areas: 'none',
      gap: '2rem'
    },
    typography: {
      primary: 'Inter',
      secondary: 'Inter',
      scale: 1.15,
      weight: '500'
    },
    animations: {
      speed: 'slow',
      intensity: 'medium',
      style: 'smooth'
    },
    effects: {
      particles: true,
      gradients: true,
      shadows: false,
      blur: true,
      glow: true
    },
    personality: {
      mood: 'creative',
      energy: 7,
      sophistication: 8
    }
  },
  {
    id: 'monochrome-bold',
    name: 'Monochrome Bold',
    category: 'minimalist',
    colors: {
      primary: '#000000',
      secondary: '#333333',
      accent: '#ff0000',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#000000',
      textSecondary: '#666666'
    },
    layout: {
      type: 'split',
      columns: '1fr 2fr',
      rows: 'auto 1fr auto',
      areas: '"header header" "sidebar main" "footer footer"',
      gap: '3rem'
    },
    typography: {
      primary: 'Inter',
      secondary: 'JetBrains Mono',
      scale: 1.25,
      weight: '700'
    },
    animations: {
      speed: 'medium',
      intensity: 'subtle',
      style: 'sharp'
    },
    effects: {
      particles: false,
      gradients: false,
      shadows: true,
      blur: false,
      glow: false
    },
    personality: {
      mood: 'bold',
      energy: 8,
      sophistication: 9
    }
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    category: 'organic',
    colors: {
      primary: '#0077be',
      secondary: '#00a8cc',
      accent: '#ffd23f',
      background: '#001f3f',
      surface: '#003d5c',
      text: '#ffffff',
      textSecondary: '#b3d9ff'
    },
    layout: {
      type: 'masonry',
      columns: 'repeat(auto-fill, minmax(300px, 1fr))',
      rows: 'masonry',
      areas: 'none',
      gap: '1.5rem'
    },
    typography: {
      primary: 'Inter',
      secondary: 'Inter',
      scale: 1.1,
      weight: '400'
    },
    animations: {
      speed: 'slow',
      intensity: 'medium',
      style: 'elastic'
    },
    effects: {
      particles: true,
      gradients: true,
      shadows: false,
      blur: true,
      glow: false
    },
    personality: {
      mood: 'calm',
      energy: 4,
      sophistication: 8
    }
  },
  {
    id: 'cosmic-space',
    name: 'Cosmic Space',
    category: 'futuristic',
    colors: {
      primary: '#9d4edd',
      secondary: '#c77dff',
      accent: '#e0aaff',
      background: '#10002b',
      surface: '#240046',
      text: '#ffffff',
      textSecondary: '#c77dff'
    },
    layout: {
      type: 'centered',
      columns: '1fr min(70ch, 100%) 1fr',
      rows: 'auto 1fr auto',
      areas: '"header header header" ". main ." "footer footer footer"',
      gap: '2.5rem'
    },
    typography: {
      primary: 'Inter',
      secondary: 'JetBrains Mono',
      scale: 1.2,
      weight: '500'
    },
    animations: {
      speed: 'medium',
      intensity: 'dynamic',
      style: 'smooth'
    },
    effects: {
      particles: true,
      gradients: true,
      shadows: true,
      blur: true,
      glow: true
    },
    personality: {
      mood: 'mysterious',
      energy: 8,
      sophistication: 9
    }
  }
]

export class DynamicThemeEngine {
  private currentTheme: ThemeVariant | null = null
  private visitCount: number = 0
  private lastVisitDate: string = ''
  
  constructor() {
    this.loadVisitData()
  }

  private loadVisitData(): void {
    if (typeof window !== 'undefined') {
      this.visitCount = parseInt(localStorage.getItem('portfolio-visit-count') || '0')
      this.lastVisitDate = localStorage.getItem('portfolio-last-visit') || ''
    }
  }

  private saveVisitData(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-visit-count', this.visitCount.toString())
      localStorage.setItem('portfolio-last-visit', new Date().toDateString())
    }
  }

  public getThemeForVisit(): ThemeVariant {
    this.incrementVisitCount()
    
    // Ensure different theme each visit within a day
    const today = new Date().toDateString()
    const isNewDay = this.lastVisitDate !== today
    
    let themeIndex: number
    
    if (isNewDay) {
      // New day - reset and pick based on date
      themeIndex = this.getThemeIndexByDate()
    } else {
      // Same day - cycle through themes
      themeIndex = (this.visitCount - 1) % THEME_VARIANTS.length
    }
    
    this.currentTheme = THEME_VARIANTS[themeIndex]
    this.saveVisitData()
    
    return this.currentTheme
  }

  private incrementVisitCount(): void {
    this.visitCount++
  }

  private getThemeIndexByDate(): number {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    return dayOfYear % THEME_VARIANTS.length
  }

  public getCurrentTheme(): ThemeVariant | null {
    return this.currentTheme
  }

  public applyTheme(theme: ThemeVariant): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const root = document.documentElement

    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // Apply layout variables
    Object.entries(theme.layout).forEach(([key, value]) => {
      root.style.setProperty(`--layout-${key}`, value)
    })

    // Apply typography variables
    Object.entries(theme.typography).forEach(([key, value]) => {
      root.style.setProperty(`--typography-${key}`, value.toString())
    })

    // Apply animation variables
    Object.entries(theme.animations).forEach(([key, value]) => {
      root.style.setProperty(`--animation-${key}`, value.toString())
    })

    // Apply effect flags
    Object.entries(theme.effects).forEach(([key, value]) => {
      root.style.setProperty(`--effect-${key}`, value ? '1' : '0')
    })

    // Apply personality variables
    Object.entries(theme.personality).forEach(([key, value]) => {
      root.style.setProperty(`--personality-${key}`, value.toString())
    })

    // Add theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${theme.id}`)
  }

  public getThemeStats(): { visitCount: number; currentTheme: string; totalThemes: number } {
    return {
      visitCount: this.visitCount,
      currentTheme: this.currentTheme?.name || 'None',
      totalThemes: THEME_VARIANTS.length
    }
  }
}
