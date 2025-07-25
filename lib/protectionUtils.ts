/**
 * 🛡️ Protection Utilities
 * Helper functions for content protection across the application
 */

/**
 * Bot detection utility
 */
export const isBot = (): boolean => {
  if (typeof window === 'undefined') return true; // SSR is considered bot-friendly
  
  const userAgent = navigator.userAgent.toLowerCase();
  const botPatterns = [
    'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
    'yandexbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
    'whatsapp', 'telegrambot', 'applebot', 'crawler', 'spider',
    'bot', 'crawl', 'scrape', 'index', 'fetch', 'preview'
  ];

  // Check user agent
  const isBotUA = botPatterns.some(pattern => userAgent.includes(pattern));
  
  // Additional bot detection methods
  const hasWebdriver = navigator.webdriver;
  const hasEmptyLanguages = navigator.languages.length === 0;
  const isHeadless = /HeadlessChrome/.test(userAgent);
  const hasPhantom = /PhantomJS/.test(userAgent);
  
  return isBotUA || hasWebdriver || hasEmptyLanguages || isHeadless || hasPhantom;
};

/**
 * Check if content should be protected
 */
export const shouldProtectContent = (): boolean => {
  return !isBot();
};

/**
 * Add invisible characters to text for copy protection
 */
export const addInvisibleCharacters = (text: string): string => {
  if (!shouldProtectContent()) return text;
  
  const invisibleChars = [
    '\u200B', // Zero-width space
    '\u200C', // Zero-width non-joiner
    '\u200D', // Zero-width joiner
    '\uFEFF', // Zero-width no-break space
    '\u2060', // Word joiner
    '\u180E'  // Mongolian vowel separator
  ];
  
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += text[i];
    
    // Add invisible character every 3-5 characters
    if (i > 0 && i % (3 + Math.floor(Math.random() * 3)) === 0) {
      const randomChar = invisibleChars[Math.floor(Math.random() * invisibleChars.length)];
      result += randomChar;
    }
  }
  
  return result;
};

/**
 * Obfuscate email addresses
 */
export const obfuscateEmail = (email: string): string => {
  if (!shouldProtectContent()) return email;
  
  return email
    .split('')
    .map((char, index) => {
      if (index % 2 === 0) {
        return `&#${char.charCodeAt(0)};`;
      }
      return char;
    })
    .join('');
};

/**
 * Obfuscate phone numbers
 */
export const obfuscatePhone = (phone: string): string => {
  if (!shouldProtectContent()) return phone;
  
  return phone.replace(/(\d)/g, (match, digit) => {
    return Math.random() > 0.5 ? `&#${digit.charCodeAt(0)};` : digit;
  });
};

/**
 * Create protected text spans
 */
export const createProtectedSpans = (text: string): string => {
  if (!shouldProtectContent()) return text;
  
  return text
    .split('')
    .map((char, index) => {
      const style = index % 3 === 0 ? 'position:relative;' : '';
      return `<span style="user-select:none;${style}">${char}</span>`;
    })
    .join('');
};

/**
 * Generate decoy content for scrapers
 */
export const generateDecoyContent = (): string => {
  const decoyTexts = [
    'PROTECTED CONTENT - UNAUTHORIZED ACCESS DETECTED',
    'COPYRIGHT VIOLATION MONITORING ACTIVE',
    'CONTENT SCRAPING ATTEMPT LOGGED',
    'LEGAL ACTION WILL BE TAKEN FOR UNAUTHORIZED COPYING',
    'THIS CONTENT IS PROTECTED BY DIGITAL RIGHTS MANAGEMENT'
  ];
  
  return decoyTexts[Math.floor(Math.random() * decoyTexts.length)];
};

/**
 * Check for developer tools
 */
export const isDevToolsOpen = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const threshold = 160;
  return (
    window.outerHeight - window.innerHeight > threshold ||
    window.outerWidth - window.innerWidth > threshold
  );
};

/**
 * Disable specific keyboard shortcuts
 */
export const disableKeyboardShortcuts = (event: KeyboardEvent): boolean => {
  const { key, ctrlKey, shiftKey, altKey, metaKey } = event;
  
  // List of disabled shortcuts
  const disabledShortcuts = [
    // Developer tools
    { key: 'F12' },
    { key: 'I', ctrlKey: true, shiftKey: true },
    { key: 'J', ctrlKey: true, shiftKey: true },
    { key: 'C', ctrlKey: true, shiftKey: true },
    { key: 'u', ctrlKey: true },
    
    // Copy/Paste/Save
    { key: 'c', ctrlKey: true },
    { key: 'v', ctrlKey: true },
    { key: 'x', ctrlKey: true },
    { key: 's', ctrlKey: true },
    { key: 'a', ctrlKey: true },
    
    // Print
    { key: 'p', ctrlKey: true },
    
    // Refresh
    { key: 'F5' },
    { key: 'r', ctrlKey: true },
    
    // Find
    { key: 'f', ctrlKey: true },
    
    // Zoom
    { key: '+', ctrlKey: true },
    { key: '-', ctrlKey: true },
    { key: '0', ctrlKey: true },
    { key: '=', ctrlKey: true },
    
    // View source
    { key: 'U', ctrlKey: true, shiftKey: true }
  ];
  
  return disabledShortcuts.some(shortcut => {
    return (
      shortcut.key === key &&
      (shortcut.ctrlKey === undefined || shortcut.ctrlKey === ctrlKey) &&
      (shortcut.shiftKey === undefined || shortcut.shiftKey === shiftKey) &&
      (shortcut.altKey === undefined || shortcut.altKey === altKey) &&
      (shortcut.metaKey === undefined || shortcut.metaKey === metaKey)
    );
  });
};

/**
 * Create watermark overlay
 */
export const createWatermarkOverlay = (text: string = '© David Akpoviroro OKE'): HTMLElement => {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 100px,
      rgba(0,0,0,0.01) 100px,
      rgba(0,0,0,0.01) 200px
    );
  `;
  
  // Add multiple watermark texts
  for (let i = 0; i < 8; i++) {
    const watermark = document.createElement('div');
    watermark.textContent = text;
    watermark.style.cssText = `
      position: absolute;
      top: ${10 + (i * 12)}%;
      left: ${5 + (i * 11)}%;
      opacity: 0.02;
      font-size: 10px;
      color: #000;
      transform: rotate(-15deg);
      pointer-events: none;
      user-select: none;
      font-family: Arial, sans-serif;
    `;
    overlay.appendChild(watermark);
  }
  
  return overlay;
};

/**
 * Monitor for suspicious activity
 */
export const createActivityMonitor = (callback: (activity: string) => void) => {
  let keyPressCount = 0;
  let mouseClickCount = 0;
  let rightClickCount = 0;
  
  const resetCounters = () => {
    keyPressCount = 0;
    mouseClickCount = 0;
    rightClickCount = 0;
  };
  
  // Reset counters every second
  setInterval(resetCounters, 1000);
  
  const keydownHandler = () => {
    keyPressCount++;
    if (keyPressCount > 15) {
      callback('Rapid keyboard activity detected');
    }
  };
  
  const clickHandler = () => {
    mouseClickCount++;
    if (mouseClickCount > 25) {
      callback('Rapid mouse clicking detected');
    }
  };
  
  const contextMenuHandler = () => {
    rightClickCount++;
    if (rightClickCount > 5) {
      callback('Multiple right-click attempts detected');
    }
  };
  
  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', contextMenuHandler);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('click', clickHandler);
    document.removeEventListener('contextmenu', contextMenuHandler);
  };
};

/**
 * Create protection notification
 */
export const showProtectionNotification = (message: string, duration: number = 3000) => {
  const notification = document.createElement('div');
  notification.className = 'protection-notification';
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 16px;">🛡️</span>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove notification
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.animation = 'slideOut 0.3s ease-in forwards';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, duration);
};

/**
 * Protect images from saving
 */
export const protectImages = (container: HTMLElement) => {
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    // Disable dragging
    img.draggable = false;
    img.style.userDrag = 'none';
    img.style.webkitUserDrag = 'none';
    img.style.pointerEvents = 'none';
    
    // Add protection overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      z-index: 1;
      pointer-events: none;
    `;
    
    // Make parent relative if not already
    const parent = img.parentElement;
    if (parent) {
      parent.style.position = 'relative';
      parent.appendChild(overlay);
    }
    
    // Prevent right-click on image
    img.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showProtectionNotification('Image saving disabled');
    });
  });
};

/**
 * Advanced text protection with canvas rendering
 */
export const renderTextToCanvas = (text: string, fontSize: number = 16): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return canvas;
  
  ctx.font = `${fontSize}px Arial, sans-serif`;
  const metrics = ctx.measureText(text);
  
  canvas.width = Math.ceil(metrics.width) + 20;
  canvas.height = fontSize + 10;
  
  // Set font again after canvas resize
  ctx.font = `${fontSize}px Arial, sans-serif`;
  ctx.fillStyle = '#333333';
  ctx.textBaseline = 'top';
  ctx.fillText(text, 10, 5);
  
  // Make canvas non-selectable
  canvas.style.userSelect = 'none';
  canvas.style.webkitUserSelect = 'none';
  canvas.style.pointerEvents = 'none';
  
  return canvas;
};
