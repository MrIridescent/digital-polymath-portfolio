'use client';

import { useEffect, useRef, useState } from 'react';

interface AdvancedContentProtectionProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5; // 5 levels of protection
  watermark?: string;
  blurOnInspect?: boolean;
  className?: string;
}

/**
 * 🛡️ Advanced Content Protection Component
 * Maximum security for sensitive content with multiple protection layers
 */
export default function AdvancedContentProtection({
  children,
  level = 5,
  watermark = '© David Akpoviroro OKE',
  blurOnInspect = true,
  className = ''
}: AdvancedContentProtectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [protectionActive, setProtectionActive] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      initializeAdvancedProtection();
    }
  }, [level]);

  /**
   * Initialize advanced protection measures
   */
  const initializeAdvancedProtection = () => {
    if (!containerRef.current) return;

    setProtectionActive(true);
    
    // Apply protection based on level
    if (level >= 1) applyBasicProtection();
    if (level >= 2) applyTextObfuscation();
    if (level >= 3) applyVisualProtection();
    if (level >= 4) applyAdvancedProtection();
    if (level >= 5) applyMaximumProtection();
  };

  /**
   * Level 1: Basic Protection
   */
  const applyBasicProtection = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Disable selection and interaction
    container.style.userSelect = 'none';
    (container.style as any).webkitUserSelect = 'none';
    (container.style as any).mozUserSelect = 'none';
    (container.style as any).msUserSelect = 'none';
    (container.style as any).webkitTouchCallout = 'none';
    
    // Add event listeners
    container.addEventListener('contextmenu', preventEvent);
    container.addEventListener('selectstart', preventEvent);
    container.addEventListener('dragstart', preventEvent);
    container.addEventListener('copy', preventEvent);
    container.addEventListener('cut', preventEvent);
  };

  /**
   * Level 2: Text Obfuscation
   */
  const applyTextObfuscation = () => {
    if (!containerRef.current) return;

    const textNodes = getTextNodes(containerRef.current);
    textNodes.forEach(node => {
      if (node.textContent && node.textContent.trim().length > 3) {
        const obfuscated = obfuscateText(node.textContent);
        node.textContent = obfuscated;
      }
    });
  };

  /**
   * Level 3: Visual Protection
   */
  const applyVisualProtection = () => {
    if (!containerRef.current) return;

    // Add watermark overlay
    addWatermarkOverlay();
    
    // Add protection overlay
    addProtectionOverlay();
    
    // Apply blur on suspicious activity
    if (blurOnInspect) {
      monitorSuspiciousActivity();
    }
  };

  /**
   * Level 4: Advanced Protection
   */
  const applyAdvancedProtection = () => {
    if (!containerRef.current) return;

    // Convert text to canvas (harder to copy)
    convertTextToCanvas();
    
    // Add decoy content
    addDecoyContent();
    
    // Monitor for automation
    detectAutomation();
  };

  /**
   * Level 5: Maximum Protection
   */
  const applyMaximumProtection = () => {
    if (!containerRef.current) return;

    // Dynamic content generation
    dynamicContentGeneration();
    
    // Advanced obfuscation
    advancedObfuscation();
    
    // Real-time monitoring
    realTimeMonitoring();
  };

  /**
   * Prevent events
   */
  const preventEvent = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  /**
   * Get all text nodes
   */
  const getTextNodes = (element: HTMLElement): Text[] => {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }
    return textNodes;
  };

  /**
   * Obfuscate text with invisible characters
   */
  const obfuscateText = (text: string): string => {
    const invisibleChars = ['\u200B', '\u200C', '\u200D', '\uFEFF', '\u2060'];
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      result += text[i];
      // Add invisible character every 2-4 characters
      if (i > 0 && i % (2 + Math.floor(Math.random() * 3)) === 0) {
        result += invisibleChars[Math.floor(Math.random() * invisibleChars.length)];
      }
    }
    
    return result;
  };

  /**
   * Add watermark overlay
   */
  const addWatermarkOverlay = () => {
    if (!containerRef.current) return;

    const watermarkDiv = document.createElement('div');
    watermarkDiv.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
      background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 100px,
        rgba(0,0,0,0.02) 100px,
        rgba(0,0,0,0.02) 200px
      );
    `;
    
    // Add text watermarks
    for (let i = 0; i < 5; i++) {
      const textWatermark = document.createElement('div');
      textWatermark.textContent = watermark;
      textWatermark.style.cssText = `
        position: absolute;
        top: ${20 + i * 20}%;
        left: ${10 + i * 15}%;
        opacity: 0.03;
        font-size: 12px;
        color: #000;
        transform: rotate(-15deg);
        pointer-events: none;
        user-select: none;
      `;
      watermarkDiv.appendChild(textWatermark);
    }
    
    containerRef.current.style.position = 'relative';
    containerRef.current.appendChild(watermarkDiv);
  };

  /**
   * Add protection overlay
   */
  const addProtectionOverlay = () => {
    if (!containerRef.current) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      background: transparent;
    `;
    
    containerRef.current.appendChild(overlay);
  };

  /**
   * Monitor suspicious activity
   */
  const monitorSuspiciousActivity = () => {
    let suspiciousCount = 0;
    
    const checkActivity = () => {
      suspiciousCount++;
      if (suspiciousCount > 3) {
        setIsBlurred(true);
        setTimeout(() => setIsBlurred(false), 5000);
      }
    };

    // Monitor rapid interactions
    document.addEventListener('keydown', checkActivity);
    document.addEventListener('mousedown', checkActivity);
  };

  /**
   * Convert text to canvas (advanced protection)
   */
  const convertTextToCanvas = () => {
    if (!containerRef.current) return;

    const textElements = containerRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
    textElements.forEach(element => {
      if (element.textContent && element.textContent.trim().length > 20) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          const text = element.textContent;
          ctx.font = '16px Arial';
          const metrics = ctx.measureText(text);
          
          canvas.width = metrics.width + 20;
          canvas.height = 30;
          
          ctx.font = '16px Arial';
          ctx.fillStyle = '#333';
          ctx.fillText(text, 10, 20);
          
          // Replace text with canvas
          element.innerHTML = '';
          element.appendChild(canvas);
        }
      }
    });
  };

  /**
   * Add decoy content
   */
  const addDecoyContent = () => {
    if (!containerRef.current) return;

    // Add hidden decoy text that will confuse scrapers
    const decoy = document.createElement('div');
    decoy.style.cssText = `
      position: absolute;
      left: -9999px;
      opacity: 0;
      font-size: 1px;
      color: transparent;
    `;
    decoy.textContent = 'PROTECTED CONTENT - UNAUTHORIZED ACCESS DETECTED';
    
    containerRef.current.appendChild(decoy);
  };

  /**
   * Detect automation
   */
  const detectAutomation = () => {
    // Check for headless browsers
    if (navigator.webdriver || 
        window.navigator.languages.length === 0 ||
        /HeadlessChrome/.test(navigator.userAgent)) {
      setIsBlurred(true);
    }
  };

  /**
   * Dynamic content generation
   */
  const dynamicContentGeneration = () => {
    // Regenerate content periodically to confuse scrapers
    setInterval(() => {
      if (containerRef.current) {
        // Add random invisible characters
        const textNodes = getTextNodes(containerRef.current);
        textNodes.forEach(node => {
          if (node.textContent) {
            node.textContent = obfuscateText(node.textContent);
          }
        });
      }
    }, 30000); // Every 30 seconds
  };

  /**
   * Advanced obfuscation
   */
  const advancedObfuscation = () => {
    if (!containerRef.current) return;

    // Split text into multiple spans with CSS to make copying harder
    const textElements = containerRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    textElements.forEach(element => {
      if (element.textContent) {
        const text = element.textContent;
        const spans = text.split('').map((char, index) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.cssText = `
            display: inline;
            user-select: none;
            ${index % 2 === 0 ? 'position: relative;' : ''}
          `;
          return span;
        });
        
        element.innerHTML = '';
        spans.forEach(span => element.appendChild(span));
      }
    });
  };

  /**
   * Real-time monitoring
   */
  const realTimeMonitoring = () => {
    // Monitor for any attempts to access content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          // Content was modified - potential scraping attempt
          console.warn('🛡️ Content modification detected');
        }
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`advanced-content-protection ${className} ${isBlurred ? 'blur-sm' : ''}`}
      style={{
        position: 'relative',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        filter: isBlurred ? 'blur(5px)' : 'none',
        transition: 'filter 0.3s ease'
      }}
      onContextMenu={preventEvent}
      onSelectStart={preventEvent}
      onDragStart={preventEvent}
      onCopy={preventEvent}
      onCut={preventEvent}
      onPaste={preventEvent}
    >
      {children}
      {protectionActive && (
        <div className="protection-indicator" style={{
          position: 'absolute',
          bottom: '5px',
          right: '5px',
          fontSize: '10px',
          opacity: 0.3,
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          🛡️
        </div>
      )}
    </div>
  );
}
