export class InactivityTimer {
  private timer: NodeJS.Timeout | null = null
  private callback: () => void
  private delay: number
  private isActive: boolean = false

  constructor(callback: () => void, delay: number = 60000) { // 1 minute default
    this.callback = callback
    this.delay = delay
    this.setupEventListeners()
  }

  private setupEventListeners() {
    if (typeof window === 'undefined') return

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'wheel'
    ]

    const resetTimer = () => {
      this.resetTimer()
    }

    events.forEach(event => {
      window.addEventListener(event, resetTimer, { passive: true })
    })

    // Store cleanup function
    this.cleanup = () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }

  private cleanup: (() => void) | null = null

  public start() {
    this.isActive = true
    this.resetTimer()
  }

  public stop() {
    this.isActive = false
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  public resetTimer() {
    if (!this.isActive) return

    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      if (this.isActive) {
        this.callback()
      }
    }, this.delay)
  }

  public setDelay(newDelay: number) {
    this.delay = newDelay
    if (this.isActive) {
      this.resetTimer()
    }
  }

  public destroy() {
    this.stop()
    if (this.cleanup) {
      this.cleanup()
    }
  }
}
