'use client';

import { useEffect, useRef } from 'react';
import { initContentProtection } from '@/lib/contentProtection';

interface GlobalProtectionProviderProps {
  children: React.ReactNode;
}

/**
 * 🛡️ Global Protection Provider
 * Initializes and manages global content protection across the entire application
 */
export function GlobalProtectionProvider({ children }: GlobalProtectionProviderProps) {
  const initRef = useRef(false);

  useEffect(() => {
    // Ensure protection is only initialized once
    if (!initRef.current) {
      initRef.current = true;
      
      // Initialize global protection system
      initContentProtection();
      
      // Add additional global protection measures
      addGlobalProtectionMeasures();
      
      // Monitor for protection bypass attempts
      monitorProtectionBypass();
      
      // Add keyboard event listeners
      addGlobalKeyboardProtection();
      
      // Add mouse event listeners
      addGlobalMouseProtection();
      
      // Add touch event listeners for mobile
      addGlobalTouchProtection();
      
      // Add developer tools detection
      addDevToolsDetection();
      
      // Add print protection
      addPrintProtection();
      
      // Add clipboard protection
      addClipboardProtection();
    }
  }, []);

  /**
   * Add comprehensive global protection measures
   */
  const addGlobalProtectionMeasures = () => {
    if (typeof window === 'undefined') return;

    // Disable drag and drop globally
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, { passive: false });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showProtectionAlert('Drag and drop disabled');
    }, { passive: false });

    // Disable text selection globally
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, { passive: false });

    // Disable context menu globally
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showProtectionAlert('Right-click disabled');
      return false;
    }, { passive: false });

    // Disable image dragging
    document.addEventListener('dragstart', (e) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
        e.stopPropagation();
        showProtectionAlert('Image dragging disabled');
      }
    }, { passive: false });
  };

  /**
   * Monitor for protection bypass attempts
   */
  const monitorProtectionBypass = () => {
    if (typeof window === 'undefined') return;

    // Monitor for suspicious activity
    let suspiciousActivity = 0;
    
    const checkSuspiciousActivity = () => {
      suspiciousActivity++;
      if (suspiciousActivity > 5) {
        showProtectionAlert('Suspicious activity detected');
        // Optional: Redirect or take action
      }
    };

    // Monitor rapid key presses (potential automation)
    let keyPressCount = 0;
    document.addEventListener('keydown', () => {
      keyPressCount++;
      setTimeout(() => keyPressCount--, 1000);
      
      if (keyPressCount > 10) {
        checkSuspiciousActivity();
      }
    });

    // Monitor rapid mouse clicks
    let clickCount = 0;
    document.addEventListener('click', () => {
      clickCount++;
      setTimeout(() => clickCount--, 1000);
      
      if (clickCount > 20) {
        checkSuspiciousActivity();
      }
    });
  };

  /**
   * Add global keyboard protection
   */
  const addGlobalKeyboardProtection = () => {
    if (typeof window === 'undefined') return;

    document.addEventListener('keydown', (e) => {
      // Comprehensive list of disabled shortcuts
      const isDisabled = 
        // Developer tools
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u') ||
        
        // Copy/Paste/Save
        (e.ctrlKey && e.key === 'c') ||
        (e.ctrlKey && e.key === 'v') ||
        (e.ctrlKey && e.key === 'x') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'a') ||
        
        // Print
        (e.ctrlKey && e.key === 'p') ||
        
        // Refresh
        e.key === 'F5' ||
        (e.ctrlKey && e.key === 'r') ||
        
        // Find
        (e.ctrlKey && e.key === 'f') ||
        
        // Zoom
        (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) ||
        
        // History
        (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) ||
        
        // View source
        (e.ctrlKey && e.shiftKey && e.key === 'U');

      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        showProtectionAlert('Keyboard shortcut disabled');
        return false;
      }
    }, { passive: false });
  };

  /**
   * Add global mouse protection
   */
  const addGlobalMouseProtection = () => {
    if (typeof window === 'undefined') return;

    // Disable middle mouse button (often used for opening dev tools)
    document.addEventListener('mousedown', (e) => {
      if (e.button === 1) { // Middle mouse button
        e.preventDefault();
        e.stopPropagation();
        showProtectionAlert('Middle mouse button disabled');
      }
    }, { passive: false });

    // Disable mouse selection
    document.addEventListener('mousedown', (e) => {
      if (e.detail > 1) { // Double/triple click
        e.preventDefault();
        e.stopPropagation();
      }
    }, { passive: false });
  };

  /**
   * Add global touch protection for mobile devices
   */
  const addGlobalTouchProtection = () => {
    if (typeof window === 'undefined') return;

    // Disable long press on mobile
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
        showProtectionAlert('Multi-touch disabled');
      }
    }, { passive: false });

    // Disable touch callout
    document.addEventListener('touchend', (e) => {
      e.preventDefault();
    }, { passive: false });
  };

  /**
   * Add developer tools detection
   */
  const addDevToolsDetection = () => {
    if (typeof window === 'undefined') return;

    let devtools = false;
    
    // Method 1: Console detection
    Object.defineProperty(window, 'console', {
      get() {
        devtools = true;
        return console;
      }
    });

    // Method 2: Window size detection
    const checkWindowSize = () => {
      const threshold = 160;
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        handleDevToolsDetection();
      }
    };

    // Method 3: Performance timing
    const checkPerformance = () => {
      const start = performance.now();
      debugger; // This will pause if dev tools are open
      const end = performance.now();
      
      if (end - start > 100) {
        handleDevToolsDetection();
      }
    };

    // Run checks periodically
    setInterval(checkWindowSize, 1000);
    setInterval(checkPerformance, 5000);
    
    // Check for console usage
    setInterval(() => {
      if (devtools) {
        handleDevToolsDetection();
      }
    }, 1000);
  };

  /**
   * Handle developer tools detection
   */
  const handleDevToolsDetection = () => {
    document.body.classList.add('dev-tools-detected');
    showProtectionAlert('Developer tools detected - Access restricted');
    
    // Optional: More aggressive response
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  /**
   * Add print protection
   */
  const addPrintProtection = () => {
    if (typeof window === 'undefined') return;

    // Override print function
    window.print = () => {
      showProtectionAlert('Printing disabled');
    };

    // Listen for print events
    window.addEventListener('beforeprint', (e) => {
      e.preventDefault();
      showProtectionAlert('Printing disabled');
    });

    window.addEventListener('afterprint', (e) => {
      e.preventDefault();
    });
  };

  /**
   * Add clipboard protection
   */
  const addClipboardProtection = () => {
    if (typeof window === 'undefined') return;

    // Override clipboard API
    if (navigator.clipboard) {
      const originalWriteText = navigator.clipboard.writeText;
      navigator.clipboard.writeText = () => {
        showProtectionAlert('Clipboard access disabled');
        return Promise.reject(new Error('Clipboard access disabled'));
      };
    }

    // Listen for clipboard events
    document.addEventListener('copy', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showProtectionAlert('Copy disabled');
    }, { passive: false });

    document.addEventListener('cut', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showProtectionAlert('Cut disabled');
    }, { passive: false });

    document.addEventListener('paste', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showProtectionAlert('Paste disabled');
    }, { passive: false });
  };

  /**
   * Show protection alert
   */
  const showProtectionAlert = (message: string) => {
    console.warn(`🛡️ Content Protection: ${message}`);
    
    // Create visual notification
    const notification = document.createElement('div');
    notification.className = 'protection-notification';
    notification.textContent = `🛡️ ${message}`;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  return <>{children}</>;
}
