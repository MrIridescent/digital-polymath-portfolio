/**
 * 🛡️ ULTIMATE CONTENT PROTECTION SYSTEM
 * Prevents all forms of content copying while maintaining bot accessibility
 */

export class ContentProtectionSystem {
  private static instance: ContentProtectionSystem;
  private protectionLevel: number = 4; // Maximum protection
  private isBot: boolean = false;
  private protectionActive: boolean = false;

  constructor() {
    this.detectBot();
    this.initializeProtection();
  }

  static getInstance(): ContentProtectionSystem {
    if (!ContentProtectionSystem.instance) {
      ContentProtectionSystem.instance = new ContentProtectionSystem();
    }
    return ContentProtectionSystem.instance;
  }

  /**
   * Detect if visitor is a bot (allow bots for SEO)
   */
  private detectBot(): void {
    if (typeof window === 'undefined') return;
    
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
      'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
      'whatsapp', 'telegrambot', 'applebot', 'crawler', 'spider',
      'bot', 'crawl', 'scrape', 'index'
    ];

    this.isBot = botPatterns.some(pattern => userAgent.includes(pattern));
    
    // Additional bot detection
    if (!this.isBot) {
      this.isBot = !window.navigator.webdriver && 
                   window.navigator.languages.length === 0 ||
                   /HeadlessChrome/.test(userAgent);
    }
  }

  /**
   * Initialize all protection mechanisms
   */
  private initializeProtection(): void {
    if (typeof window === 'undefined' || this.isBot) return;

    this.protectionActive = true;
    this.disableRightClick();
    this.disableKeyboardShortcuts();
    this.disableTextSelection();
    this.disableDragAndDrop();
    this.disablePrint();
    this.disableDeveloperTools();
    this.preventImageSaving();
    this.addProtectionStyles();
    this.monitorDevTools();
    this.addInvisibleCharacters();
  }

  /**
   * Disable right-click context menu
   */
  private disableRightClick(): void {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showProtectionMessage('Right-click disabled');
      return false;
    }, { passive: false });

    // Disable long press on mobile
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  /**
   * Disable keyboard shortcuts for copying, saving, etc.
   */
  private disableKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
          (e.ctrlKey && e.key === 'u') ||
          (e.ctrlKey && e.key === 's') ||
          (e.ctrlKey && e.key === 'a') ||
          (e.ctrlKey && e.key === 'c') ||
          (e.ctrlKey && e.key === 'v') ||
          (e.ctrlKey && e.key === 'x') ||
          (e.ctrlKey && e.key === 'p') ||
          (e.ctrlKey && e.shiftKey && e.key === 'Delete') ||
          (e.key === 'F5') ||
          (e.ctrlKey && e.key === 'r')) {
        e.preventDefault();
        e.stopPropagation();
        this.showProtectionMessage('Keyboard shortcut disabled');
        return false;
      }
    }, { passive: false });
  }

  /**
   * Disable text selection
   */
  private disableTextSelection(): void {
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    }, { passive: false });

    document.addEventListener('mousedown', (e) => {
      if (e.detail > 1) { // Prevent multiple clicks
        e.preventDefault();
      }
    }, { passive: false });
  }

  /**
   * Disable drag and drop
   */
  private disableDragAndDrop(): void {
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    }, { passive: false });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      return false;
    }, { passive: false });
  }

  /**
   * Disable printing
   */
  private disablePrint(): void {
    window.addEventListener('beforeprint', (e) => {
      e.preventDefault();
      this.showProtectionMessage('Printing disabled');
      return false;
    });

    // Override print function
    window.print = () => {
      this.showProtectionMessage('Printing disabled');
    };
  }

  /**
   * Detect and prevent developer tools
   */
  private disableDeveloperTools(): void {
    // Detect DevTools by checking console
    let devtools = { open: false, orientation: null };
    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          this.handleDevToolsOpen();
        }
      } else {
        devtools.open = false;
      }
    }, 500);
  }

  /**
   * Handle developer tools detection
   */
  private handleDevToolsOpen(): void {
    document.body.style.display = 'none';
    alert('Developer tools detected. Page access restricted.');
    window.location.reload();
  }

  /**
   * Prevent image saving
   */
  private preventImageSaving(): void {
    document.addEventListener('dragstart', (e) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    });

    // Add transparent overlay to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.pointerEvents = 'none';
      img.setAttribute('draggable', 'false');
    });
  }

  /**
   * Add protection CSS styles
   */
  private addProtectionStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      img {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
      
      ::selection {
        background: transparent !important;
      }
      
      ::-moz-selection {
        background: transparent !important;
      }
      
      .protected-content {
        position: relative;
      }
      
      .protected-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Monitor for developer tools
   */
  private monitorDevTools(): void {
    let devtools = false;
    
    Object.defineProperty(window, 'console', {
      get() {
        devtools = true;
        return console;
      }
    });

    // Check for console usage
    setInterval(() => {
      if (devtools) {
        this.handleDevToolsOpen();
      }
    }, 1000);
  }

  /**
   * Add invisible characters to break copying
   */
  private addInvisibleCharacters(): void {
    const textNodes = this.getTextNodes(document.body);
    textNodes.forEach(node => {
      if (node.textContent && node.textContent.length > 10) {
        const text = node.textContent;
        const obfuscated = this.obfuscateText(text);
        node.textContent = obfuscated;
      }
    });
  }

  /**
   * Get all text nodes in element
   */
  private getTextNodes(element: Element): Text[] {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }
    return textNodes;
  }

  /**
   * Obfuscate text with invisible characters
   */
  private obfuscateText(text: string): string {
    const invisibleChars = ['\u200B', '\u200C', '\u200D', '\uFEFF'];
    let obfuscated = '';
    
    for (let i = 0; i < text.length; i++) {
      obfuscated += text[i];
      if (i % 3 === 0 && i > 0) {
        obfuscated += invisibleChars[Math.floor(Math.random() * invisibleChars.length)];
      }
    }
    
    return obfuscated;
  }

  /**
   * Show protection message
   */
  private showProtectionMessage(message: string): void {
    console.warn(`🛡️ Content Protection: ${message}`);
    
    // Optional: Show visual feedback
    const notification = document.createElement('div');
    notification.textContent = `🛡️ ${message}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 10000;
      font-family: Arial, sans-serif;
      font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  }

  /**
   * Public method to enable protection
   */
  public enableProtection(): void {
    if (!this.protectionActive && !this.isBot) {
      this.initializeProtection();
    }
  }

  /**
   * Public method to check if protection is active
   */
  public isProtectionActive(): boolean {
    return this.protectionActive && !this.isBot;
  }
}

// Initialize protection system
export const initContentProtection = () => {
  if (typeof window !== 'undefined') {
    const protection = ContentProtectionSystem.getInstance();
    protection.enableProtection();
  }
};

// Export singleton instance
export const contentProtection = ContentProtectionSystem.getInstance();
