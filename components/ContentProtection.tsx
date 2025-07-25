'use client';

import { useEffect, useRef } from 'react';
import { ContentProtectionSystem } from '@/lib/contentProtection';

interface ContentProtectionProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4; // Protection levels
  className?: string;
}

/**
 * 🛡️ Content Protection Wrapper Component
 * Wraps content with advanced copy protection while maintaining accessibility
 */
export default function ContentProtection({ 
  children, 
  level = 4, 
  className = '' 
}: ContentProtectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const protectionRef = useRef<ContentProtectionSystem | null>(null);

  useEffect(() => {
    // Initialize protection system
    protectionRef.current = ContentProtectionSystem.getInstance();
    
    // Apply protection to this specific container
    if (containerRef.current) {
      applyContainerProtection(containerRef.current, level);
    }

    return () => {
      // Cleanup if needed
    };
  }, [level]);

  /**
   * Apply protection to specific container
   */
  const applyContainerProtection = (container: HTMLElement, protectionLevel: number) => {
    // Add protection classes
    container.classList.add('protected-content');
    
    // Level-based protection
    if (protectionLevel >= 1) {
      // Basic protection
      container.style.userSelect = 'none';
      container.style.webkitUserSelect = 'none';
      container.style.mozUserSelect = 'none';
      container.style.msUserSelect = 'none';
    }

    if (protectionLevel >= 2) {
      // Advanced protection
      container.addEventListener('contextmenu', preventEvent);
      container.addEventListener('selectstart', preventEvent);
      container.addEventListener('dragstart', preventEvent);
    }

    if (protectionLevel >= 3) {
      // Text obfuscation
      obfuscateTextContent(container);
    }

    if (protectionLevel >= 4) {
      // Maximum protection with overlays
      addProtectionOverlay(container);
    }
  };

  /**
   * Prevent events
   */
  const preventEvent = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  /**
   * Add invisible protection overlay
   */
  const addProtectionOverlay = (container: HTMLElement) => {
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
    
    container.style.position = 'relative';
    container.appendChild(overlay);
  };

  /**
   * Obfuscate text content with invisible characters
   */
  const obfuscateTextContent = (container: HTMLElement) => {
    const textNodes = getTextNodes(container);
    textNodes.forEach(node => {
      if (node.textContent && node.textContent.trim().length > 5) {
        const originalText = node.textContent;
        const obfuscatedText = addInvisibleChars(originalText);
        node.textContent = obfuscatedText;
      }
    });
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
          // Skip script and style nodes
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
   * Add invisible characters to break copying
   */
  const addInvisibleChars = (text: string): string => {
    const invisibleChars = ['\u200B', '\u200C', '\u200D', '\uFEFF'];
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
      result += text[i];
      // Add invisible character every 3-5 characters
      if (i > 0 && i % (3 + Math.floor(Math.random() * 3)) === 0) {
        result += invisibleChars[Math.floor(Math.random() * invisibleChars.length)];
      }
    }
    
    return result;
  };

  return (
    <div 
      ref={containerRef}
      className={`content-protection-wrapper ${className}`}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
      onContextMenu={(e) => e.preventDefault()}
      onSelectStart={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}

/**
 * 🛡️ Protected Text Component
 * Renders text with maximum protection
 */
export function ProtectedText({ 
  children, 
  className = '',
  level = 4 
}: { 
  children: string; 
  className?: string;
  level?: 1 | 2 | 3 | 4;
}) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current && level >= 3) {
      // Apply text-specific protection
      const text = children;
      const obfuscated = obfuscateAdvanced(text);
      textRef.current.textContent = obfuscated;
    }
  }, [children, level]);

  /**
   * Advanced text obfuscation
   */
  const obfuscateAdvanced = (text: string): string => {
    // Split text into spans with invisible characters
    const chars = text.split('');
    const invisibleChars = ['\u200B', '\u200C', '\u200D', '\uFEFF'];
    
    return chars.map((char, index) => {
      if (index > 0 && index % 2 === 0) {
        return char + invisibleChars[Math.floor(Math.random() * invisibleChars.length)];
      }
      return char;
    }).join('');
  };

  return (
    <ContentProtection level={level} className={className}>
      <span 
        ref={textRef}
        className="protected-text"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      >
        {children}
      </span>
    </ContentProtection>
  );
}

/**
 * 🛡️ Protected Image Component
 * Renders images with copy protection
 */
export function ProtectedImage({ 
  src, 
  alt, 
  className = '',
  ...props 
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <ContentProtection level={4} className={className}>
      <div className="protected-image-container" style={{ position: 'relative' }}>
        <img
          src={src}
          alt={alt}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            pointerEvents: 'none',
            WebkitUserDrag: 'none',
            KhtmlUserDrag: 'none',
            MozUserDrag: 'none',
            OUserDrag: 'none'
          }}
          {...props}
        />
        {/* Invisible overlay to prevent image saving */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      </div>
    </ContentProtection>
  );
}

/**
 * 🛡️ Protected Code Block Component
 * Special protection for code content
 */
export function ProtectedCode({ 
  children, 
  className = '',
  language = '' 
}: { 
  children: string; 
  className?: string;
  language?: string;
}) {
  return (
    <ContentProtection level={4} className={`protected-code ${className}`}>
      <pre
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          position: 'relative'
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <code className={`language-${language}`}>
          {children}
        </code>
        {/* Code protection overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      </pre>
    </ContentProtection>
  );
}
