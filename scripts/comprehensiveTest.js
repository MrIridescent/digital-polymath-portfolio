#!/usr/bin/env node

/**
 * 🧪 Comprehensive System Testing Script
 * Tests all features, interactions, and system components
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class ComprehensiveTestSuite {
  constructor() {
    this.browser = null;
    this.page = null;
    this.testResults = {
      passed: 0,
      failed: 0,
      total: 0,
      details: []
    };
    this.baseUrl = 'http://localhost:3000';
  }

  async initialize() {
    console.log('🚀 Initializing Comprehensive Test Suite...\n');
    
    try {
      this.browser = await puppeteer.launch({
        headless: false, // Set to true for CI/CD
        defaultViewport: { width: 1920, height: 1080 },
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      this.page = await this.browser.newPage();
      
      // Set user agent to simulate real user
      await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      console.log('✅ Browser initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize browser:', error);
      return false;
    }
  }

  async runTest(testName, testFunction) {
    this.testResults.total++;
    console.log(`\n🧪 Running: ${testName}`);
    
    try {
      const result = await testFunction();
      if (result) {
        this.testResults.passed++;
        console.log(`✅ PASSED: ${testName}`);
        this.testResults.details.push({ test: testName, status: 'PASSED', details: result });
      } else {
        this.testResults.failed++;
        console.log(`❌ FAILED: ${testName}`);
        this.testResults.details.push({ test: testName, status: 'FAILED', details: 'Test returned false' });
      }
    } catch (error) {
      this.testResults.failed++;
      console.log(`❌ ERROR: ${testName} - ${error.message}`);
      this.testResults.details.push({ test: testName, status: 'ERROR', details: error.message });
    }
  }

  // Test 1: Page Loading and Basic Functionality
  async testPageLoading() {
    await this.page.goto(this.baseUrl, { waitUntil: 'networkidle2' });
    
    // Check if main elements are present
    const heroSection = await this.page.$('.hero-section, [data-testid="hero-section"]');
    const navigation = await this.page.$('nav, [data-testid="navigation"]');
    const title = await this.page.title();
    
    return heroSection && navigation && title.includes('David');
  }

  // Test 2: Content Protection System
  async testContentProtection() {
    await this.page.goto(this.baseUrl);
    
    // Test right-click prevention
    const rightClickPrevented = await this.page.evaluate(() => {
      let prevented = false;
      document.addEventListener('contextmenu', (e) => {
        if (e.defaultPrevented) prevented = true;
      });
      
      const event = new MouseEvent('contextmenu', { bubbles: true });
      document.body.dispatchEvent(event);
      return prevented;
    });

    // Test text selection prevention
    const selectionPrevented = await this.page.evaluate(() => {
      const selection = window.getSelection();
      selection.selectAllChildren(document.body);
      return selection.toString().length === 0;
    });

    // Test keyboard shortcuts
    const keyboardPrevented = await this.page.evaluate(() => {
      let prevented = false;
      document.addEventListener('keydown', (e) => {
        if (e.defaultPrevented && (e.key === 'F12' || (e.ctrlKey && e.key === 'c'))) {
          prevented = true;
        }
      });
      
      // Simulate F12
      const f12Event = new KeyboardEvent('keydown', { key: 'F12', bubbles: true });
      document.dispatchEvent(f12Event);
      
      // Simulate Ctrl+C
      const ctrlCEvent = new KeyboardEvent('keydown', { key: 'c', ctrlKey: true, bubbles: true });
      document.dispatchEvent(ctrlCEvent);
      
      return prevented;
    });

    return rightClickPrevented && selectionPrevented;
  }

  // Test 3: DigitalCourtierBot Functionality
  async testDigitalCourtierBot() {
    await this.page.goto(this.baseUrl);
    
    // Wait for bot to load
    await this.page.waitForSelector('[data-testid="chatbot"], .chatbot, .digital-courtier-bot', { timeout: 10000 });
    
    // Check if bot is visible
    const botVisible = await this.page.$('[data-testid="chatbot"], .chatbot, .digital-courtier-bot');
    
    if (!botVisible) {
      // Try to find and click bot trigger
      const botTrigger = await this.page.$('[data-testid="chat-trigger"], .chat-trigger, .bot-trigger');
      if (botTrigger) {
        await botTrigger.click();
        await this.page.waitForTimeout(2000);
      }
    }

    // Test sending a message
    const messageInput = await this.page.$('input[placeholder*="message"], textarea[placeholder*="message"], .message-input');
    const sendButton = await this.page.$('[data-testid="send-button"], .send-button, button[type="submit"]');
    
    if (messageInput && sendButton) {
      await messageInput.type('I need a website for my business');
      await sendButton.click();
      
      // Wait for response
      await this.page.waitForTimeout(3000);
      
      // Check if bot responded
      const botResponse = await this.page.$('.bot-message, .ai-response, [data-testid="bot-message"]');
      return !!botResponse;
    }

    return !!botVisible;
  }

  // Test 4: Navigation and Routing
  async testNavigation() {
    await this.page.goto(this.baseUrl);
    
    const navigationLinks = await this.page.$$('nav a, [data-testid="nav-link"]');
    let allLinksWork = true;
    
    for (const link of navigationLinks.slice(0, 3)) { // Test first 3 links
      try {
        const href = await link.evaluate(el => el.href);
        if (href && !href.includes('mailto:') && !href.includes('tel:')) {
          await link.click();
          await this.page.waitForTimeout(2000);
          
          const currentUrl = this.page.url();
          if (!currentUrl.includes(this.baseUrl)) {
            allLinksWork = false;
          }
        }
      } catch (error) {
        console.log(`Navigation link error: ${error.message}`);
      }
    }
    
    return allLinksWork;
  }

  // Test 5: Mobile Responsiveness
  async testMobileResponsiveness() {
    // Test mobile viewport
    await this.page.setViewport({ width: 375, height: 667 });
    await this.page.goto(this.baseUrl);
    
    // Check if mobile menu exists or navigation adapts
    const mobileMenu = await this.page.$('.mobile-menu, [data-testid="mobile-menu"], .hamburger');
    const responsiveNav = await this.page.$('nav');
    
    // Check if content is readable on mobile
    const bodyWidth = await this.page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 375;
    
    // Reset viewport
    await this.page.setViewport({ width: 1920, height: 1080 });
    
    return (mobileMenu || responsiveNav) && bodyWidth <= viewportWidth + 50; // Allow small margin
  }

  // Test 6: Performance and Loading Speed
  async testPerformance() {
    const startTime = Date.now();
    
    await this.page.goto(this.baseUrl, { waitUntil: 'networkidle2' });
    
    const loadTime = Date.now() - startTime;
    
    // Check for performance metrics
    const performanceMetrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0
      };
    });
    
    console.log(`📊 Performance Metrics:`, performanceMetrics);
    console.log(`⏱️ Total Load Time: ${loadTime}ms`);
    
    // Pass if load time is under 5 seconds
    return loadTime < 5000;
  }

  // Test 7: SEO and Meta Tags
  async testSEOMetaTags() {
    await this.page.goto(this.baseUrl);
    
    const title = await this.page.title();
    const metaDescription = await this.page.$eval('meta[name="description"]', el => el.content).catch(() => null);
    const ogTitle = await this.page.$eval('meta[property="og:title"]', el => el.content).catch(() => null);
    const structuredData = await this.page.$$('script[type="application/ld+json"]');
    
    console.log(`📄 SEO Check:`, {
      title: title?.length > 0,
      description: metaDescription?.length > 0,
      ogTitle: ogTitle?.length > 0,
      structuredData: structuredData.length > 0
    });
    
    return title?.length > 0 && metaDescription?.length > 0 && structuredData.length > 0;
  }

  // Test 8: Form Functionality
  async testFormFunctionality() {
    await this.page.goto(this.baseUrl);
    
    // Look for contact forms or newsletter signup
    const forms = await this.page.$$('form');
    
    if (forms.length === 0) {
      console.log('ℹ️ No forms found to test');
      return true; // Not a failure if no forms exist
    }
    
    // Test first form
    const form = forms[0];
    const inputs = await form.$$('input, textarea');
    
    if (inputs.length > 0) {
      // Fill out form
      for (const input of inputs) {
        const type = await input.evaluate(el => el.type);
        const name = await input.evaluate(el => el.name);
        
        if (type === 'email') {
          await input.type('test@example.com');
        } else if (type === 'text' || type === 'textarea') {
          await input.type('Test message');
        }
      }
      
      // Check if form can be submitted (don't actually submit)
      const submitButton = await form.$('button[type="submit"], input[type="submit"]');
      return !!submitButton;
    }
    
    return true;
  }

  // Test 9: Error Handling
  async testErrorHandling() {
    // Test 404 page
    const response = await this.page.goto(`${this.baseUrl}/non-existent-page`, { waitUntil: 'networkidle2' });
    
    // Check if custom 404 page exists or if it handles gracefully
    const pageContent = await this.page.content();
    const has404Content = pageContent.includes('404') || pageContent.includes('Not Found') || pageContent.includes('Page not found');
    
    return response.status() === 404 || has404Content;
  }

  // Test 10: Accessibility
  async testAccessibility() {
    await this.page.goto(this.baseUrl);
    
    // Check for basic accessibility features
    const hasAltTags = await this.page.evaluate(() => {
      const images = document.querySelectorAll('img');
      return Array.from(images).every(img => img.alt !== undefined);
    });
    
    const hasAriaLabels = await this.page.$$('[aria-label]');
    const hasHeadingStructure = await this.page.$$('h1, h2, h3');
    
    return hasAltTags && hasAriaLabels.length > 0 && hasHeadingStructure.length > 0;
  }

  async runAllTests() {
    console.log('🎯 Starting Comprehensive Test Suite\n');
    console.log('=' .repeat(50));
    
    await this.runTest('Page Loading and Basic Functionality', () => this.testPageLoading());
    await this.runTest('Content Protection System', () => this.testContentProtection());
    await this.runTest('DigitalCourtierBot Functionality', () => this.testDigitalCourtierBot());
    await this.runTest('Navigation and Routing', () => this.testNavigation());
    await this.runTest('Mobile Responsiveness', () => this.testMobileResponsiveness());
    await this.runTest('Performance and Loading Speed', () => this.testPerformance());
    await this.runTest('SEO and Meta Tags', () => this.testSEOMetaTags());
    await this.runTest('Form Functionality', () => this.testFormFunctionality());
    await this.runTest('Error Handling', () => this.testErrorHandling());
    await this.runTest('Accessibility', () => this.testAccessibility());
  }

  async generateReport() {
    console.log('\n' + '=' .repeat(50));
    console.log('📊 COMPREHENSIVE TEST RESULTS');
    console.log('=' .repeat(50));
    
    console.log(`\n✅ Passed: ${this.testResults.passed}`);
    console.log(`❌ Failed: ${this.testResults.failed}`);
    console.log(`📊 Total: ${this.testResults.total}`);
    console.log(`📈 Success Rate: ${((this.testResults.passed / this.testResults.total) * 100).toFixed(1)}%`);
    
    console.log('\n📋 Detailed Results:');
    this.testResults.details.forEach(result => {
      const icon = result.status === 'PASSED' ? '✅' : result.status === 'FAILED' ? '❌' : '⚠️';
      console.log(`${icon} ${result.test}: ${result.status}`);
      if (result.status !== 'PASSED' && result.details) {
        console.log(`   Details: ${result.details}`);
      }
    });

    // Save report to file
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        passed: this.testResults.passed,
        failed: this.testResults.failed,
        total: this.testResults.total,
        successRate: ((this.testResults.passed / this.testResults.total) * 100).toFixed(1)
      },
      details: this.testResults.details
    };

    fs.writeFileSync('test-report.json', JSON.stringify(reportData, null, 2));
    console.log('\n💾 Test report saved to test-report.json');
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('\n🧹 Browser closed successfully');
    }
  }
}

// Main execution
async function main() {
  const testSuite = new ComprehensiveTestSuite();
  
  try {
    const initialized = await testSuite.initialize();
    if (!initialized) {
      console.error('❌ Failed to initialize test suite');
      process.exit(1);
    }
    
    await testSuite.runAllTests();
    await testSuite.generateReport();
    
  } catch (error) {
    console.error('❌ Test suite error:', error);
  } finally {
    await testSuite.cleanup();
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = ComprehensiveTestSuite;
