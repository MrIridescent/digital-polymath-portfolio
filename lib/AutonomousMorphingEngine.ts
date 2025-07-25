export interface MorphingState {
  layoutMode: 'top-nav' | 'left-sidebar' | 'right-sidebar' | 'bottom-nav' | 'floating' | 'split'
  visualMode: 'minimal' | 'enhanced' | 'immersive' | 'cinematic'
  animationIntensity: 'subtle' | 'moderate' | 'dynamic' | 'extreme'
  colorScheme: 'primary' | 'secondary' | 'accent' | 'gradient'
  particleCount: number
  morphingSpeed: number
}

export interface MorphingSequence {
  id: string
  name: string
  duration: number
  states: MorphingState[]
  transitions: TransitionConfig[]
}

export interface TransitionConfig {
  duration: number
  easing: string
  stagger: number
  effects: string[]
}

export class AutonomousMorphingEngine {
  private currentState: MorphingState
  private sequences: MorphingSequence[]
  private activeSequence: MorphingSequence | null = null
  private sequenceIndex: number = 0
  private morphingTimer: NodeJS.Timeout | null = null
  private inactivityTimer: NodeJS.Timeout | null = null
  private listeners: ((state: MorphingState) => void)[] = []
  private isActive: boolean = false
  private isUserActive: boolean = true
  private inactivityDelay: number = 30000 // 30 seconds of inactivity before morphing

  constructor() {
    this.currentState = {
      layoutMode: 'top-nav',
      visualMode: 'enhanced',
      animationIntensity: 'moderate',
      colorScheme: 'primary',
      particleCount: 30,
      morphingSpeed: 1
    }

    this.sequences = this.createMorphingSequences()
  }

  private createMorphingSequences(): MorphingSequence[] {
    return [
      {
        id: 'exploration',
        name: 'Exploration Journey',
        duration: 300000, // 5 minutes - much slower for reading
        states: [
          {
            layoutMode: 'top-nav',
            visualMode: 'minimal',
            animationIntensity: 'subtle',
            colorScheme: 'primary',
            particleCount: 15,
            morphingSpeed: 0.8
          },
          {
            layoutMode: 'left-sidebar',
            visualMode: 'enhanced',
            animationIntensity: 'moderate',
            colorScheme: 'secondary',
            particleCount: 25,
            morphingSpeed: 1.2
          },
          {
            layoutMode: 'floating',
            visualMode: 'immersive',
            animationIntensity: 'dynamic',
            colorScheme: 'accent',
            particleCount: 40,
            morphingSpeed: 1.5
          }
        ],
        transitions: [
          {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            stagger: 100,
            effects: ['fade', 'slide', 'scale']
          },
          {
            duration: 2500,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            stagger: 150,
            effects: ['morph', 'rotate', 'glow']
          }
        ]
      },
      {
        id: 'showcase',
        name: 'Showcase Experience',
        duration: 360000, // 6 minutes - very slow for comfortable reading - slower for reading
        states: [
          {
            layoutMode: 'right-sidebar',
            visualMode: 'cinematic',
            animationIntensity: 'extreme',
            colorScheme: 'gradient',
            particleCount: 60,
            morphingSpeed: 2.0
          },
          {
            layoutMode: 'split',
            visualMode: 'immersive',
            animationIntensity: 'dynamic',
            colorScheme: 'accent',
            particleCount: 45,
            morphingSpeed: 1.8
          },
          {
            layoutMode: 'bottom-nav',
            visualMode: 'enhanced',
            animationIntensity: 'moderate',
            colorScheme: 'secondary',
            particleCount: 30,
            morphingSpeed: 1.0
          }
        ],
        transitions: [
          {
            duration: 3000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            stagger: 200,
            effects: ['wave', 'particle-burst', 'color-shift']
          },
          {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            stagger: 100,
            effects: ['fold', 'unfold', 'shimmer']
          }
        ]
      },
      {
        id: 'ambient',
        name: 'Ambient Flow',
        duration: 90000, // 1.5 minutes - slower for reading
        states: [
          {
            layoutMode: 'floating',
            visualMode: 'minimal',
            animationIntensity: 'subtle',
            colorScheme: 'primary',
            particleCount: 20,
            morphingSpeed: 0.6
          },
          {
            layoutMode: 'top-nav',
            visualMode: 'enhanced',
            animationIntensity: 'moderate',
            colorScheme: 'gradient',
            particleCount: 35,
            morphingSpeed: 1.0
          }
        ],
        transitions: [
          {
            duration: 4000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            stagger: 300,
            effects: ['breathe', 'pulse', 'flow']
          }
        ]
      }
    ]
  }

  public start(): void {
    if (this.isActive) return

    this.isActive = true
    this.setupInactivityDetection()
    this.startInactivityTimer()
  }

  public stop(): void {
    this.isActive = false
    if (this.morphingTimer) {
      clearTimeout(this.morphingTimer)
      this.morphingTimer = null
    }
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer)
      this.inactivityTimer = null
    }
    if (this.removeInactivityDetection) {
      this.removeInactivityDetection()
    }
  }

  public addListener(callback: (state: MorphingState) => void): void {
    this.listeners.push(callback)
  }

  public removeListener(callback: (state: MorphingState) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback)
  }

  private startSequence(): void {
    if (!this.isActive || this.isUserActive) return

    // Select random sequence
    this.activeSequence = this.sequences[Math.floor(Math.random() * this.sequences.length)]
    this.sequenceIndex = 0

    this.executeNextMorph()
  }

  private executeNextMorph(): void {
    if (!this.isActive || !this.activeSequence || this.isUserActive) return

    const currentSequenceState = this.activeSequence.states[this.sequenceIndex]
    const transition = this.activeSequence.transitions[this.sequenceIndex] || this.activeSequence.transitions[0]

    // Update current state
    this.currentState = { ...currentSequenceState }

    // Notify listeners
    this.notifyListeners()

    // Schedule next morph
    this.sequenceIndex++
    
    if (this.sequenceIndex >= this.activeSequence.states.length) {
      // Sequence complete, start new sequence after delay
      this.morphingTimer = setTimeout(() => {
        this.startSequence()
      }, 5000) // 5 second pause between sequences
    } else {
      // Continue with next state in sequence
      this.morphingTimer = setTimeout(() => {
        this.executeNextMorph()
      }, transition.duration + 3000) // State duration + transition time
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => {
      try {
        callback(this.currentState)
      } catch (error) {
        console.error('Error in morphing listener:', error)
      }
    })
  }

  public getCurrentState(): MorphingState {
    return { ...this.currentState }
  }

  public getActiveSequence(): MorphingSequence | null {
    return this.activeSequence
  }

  public forceNextMorph(): void {
    if (this.morphingTimer) {
      clearTimeout(this.morphingTimer)
    }
    this.executeNextMorph()
  }

  public setMorphingSpeed(speed: number): void {
    this.currentState.morphingSpeed = Math.max(0.1, Math.min(3.0, speed))
    this.notifyListeners()
  }

  public setParticleCount(count: number): void {
    this.currentState.particleCount = Math.max(0, Math.min(100, count))
    this.notifyListeners()
  }

  private setupInactivityDetection(): void {
    if (typeof window === 'undefined') return

    // Clean up existing listeners first
    if (this.removeInactivityDetection) {
      this.removeInactivityDetection()
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

    const resetInactivityTimer = () => {
      this.isUserActive = true
      this.startInactivityTimer()
    }

    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer, { passive: true })
    })

    // Store cleanup function
    this.removeInactivityDetection = () => {
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer)
      })
    }
  }

  private removeInactivityDetection: (() => void) | null = null

  private startInactivityTimer(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer)
    }

    this.inactivityTimer = setTimeout(() => {
      if (this.isActive) {
        this.isUserActive = false
        // Use requestAnimationFrame for smoother transitions
        requestAnimationFrame(() => {
          this.startSequence()
        })
      }
    }, this.inactivityDelay)
  }

  public onUserActivity(): void {
    this.isUserActive = true
    this.startInactivityTimer()

    // Pause current morphing if user becomes active
    if (this.morphingTimer) {
      clearTimeout(this.morphingTimer)
      this.morphingTimer = null
    }
  }
}
