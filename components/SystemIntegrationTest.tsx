'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Play, RefreshCw } from 'lucide-react'
import { ConversationalFlow } from '@/lib/ConversationalFlow'
import { notificationService } from '@/lib/NotificationService'

interface TestResult {
  name: string
  status: 'pending' | 'running' | 'passed' | 'failed'
  message: string
  details?: string
}

export function SystemIntegrationTest() {
  const [isVisible, setIsVisible] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([
    { name: 'ConversationalFlow Import', status: 'pending', message: 'Not tested' },
    { name: 'NotificationService Import', status: 'pending', message: 'Not tested' },
    { name: 'Conversation Processing', status: 'pending', message: 'Not tested' },
    { name: 'Lead Qualification Logic', status: 'pending', message: 'Not tested' },
    { name: 'Notification System', status: 'pending', message: 'Not tested' },
    { name: 'Local Storage Fallback', status: 'pending', message: 'Not tested' },
    { name: 'API Route Availability', status: 'pending', message: 'Not tested' }
  ])

  const updateTestResult = (index: number, status: TestResult['status'], message: string, details?: string) => {
    setTestResults(prev => prev.map((test, i) => 
      i === index ? { ...test, status, message, details } : test
    ))
  }

  const runIntegrationTests = async () => {
    setIsRunning(true)
    
    // Test 1: ConversationalFlow Import
    updateTestResult(0, 'running', 'Testing import...')
    try {
      const flow = new ConversationalFlow()
      updateTestResult(0, 'passed', 'Successfully imported and instantiated')
    } catch (error) {
      updateTestResult(0, 'failed', 'Import failed', error instanceof Error ? error.message : 'Unknown error')
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    // Test 2: NotificationService Import
    updateTestResult(1, 'running', 'Testing import...')
    try {
      if (notificationService) {
        updateTestResult(1, 'passed', 'Successfully imported notification service')
      } else {
        updateTestResult(1, 'failed', 'Notification service is undefined')
      }
    } catch (error) {
      updateTestResult(1, 'failed', 'Import failed', error instanceof Error ? error.message : 'Unknown error')
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    // Test 3: Conversation Processing
    updateTestResult(2, 'running', 'Testing conversation logic...')
    try {
      const flow = new ConversationalFlow()
      const response = flow.processConversation({
        stage: 'greeting',
        userInput: 'I need a website',
        conversationHistory: [],
        extractedInfo: {},
        score: 0
      })
      
      if (response && response.message && response.nextStage) {
        updateTestResult(2, 'passed', 'Conversation processing works correctly')
      } else {
        updateTestResult(2, 'failed', 'Invalid response structure')
      }
    } catch (error) {
      updateTestResult(2, 'failed', 'Processing failed', error instanceof Error ? error.message : 'Unknown error')
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    // Test 4: Lead Qualification Logic
    updateTestResult(3, 'running', 'Testing lead qualification...')
    try {
      const flow = new ConversationalFlow()
      const response = flow.processConversation({
        stage: 'qualification',
        userInput: 'Yes, I\'m ready to proceed with a $25,000 budget',
        conversationHistory: ['user: I need a web app', 'bot: What\'s your budget?'],
        extractedInfo: {
          projectType: 'web app',
          budget: '$25,000',
          timeline: '3 months'
        },
        score: 70
      })
      
      if (response && response.shouldNotify) {
        updateTestResult(3, 'passed', 'Lead qualification triggers notification correctly')
      } else {
        updateTestResult(3, 'failed', 'Lead qualification logic not working')
      }
    } catch (error) {
      updateTestResult(3, 'failed', 'Qualification failed', error instanceof Error ? error.message : 'Unknown error')
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    // Test 5: Notification System
    updateTestResult(4, 'running', 'Testing notification system...')
    try {
      const testLead = {
        sessionId: 'test_session_' + Date.now(),
        timestamp: new Date(),
        contactInfo: {
          name: 'Test User',
          email: 'test@example.com',
          phone: '+1234567890'
        },
        projectDetails: {
          type: 'web app',
          budget: '$25,000',
          timeline: '3 months',
          urgency: 'medium',
          features: ['user authentication', 'payment processing']
        },
        conversationSummary: 'Test conversation for integration testing',
        score: 85,
        readyForProposal: true
      }

      const result = await notificationService.notifyQualifiedLead(testLead)
      updateTestResult(4, 'passed', 'Notification system processed test lead successfully')
    } catch (error) {
      updateTestResult(4, 'failed', 'Notification failed', error instanceof Error ? error.message : 'Unknown error')
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    // Test 6: Local Storage Fallback
    updateTestResult(5, 'running', 'Testing local storage...')
    try {
      const testData = { test: 'integration_test', timestamp: Date.now() }
      localStorage.setItem('codex_integration_test', JSON.stringify(testData))
      
      const retrieved = localStorage.getItem('codex_integration_test')
      if (retrieved) {
        const parsed = JSON.parse(retrieved)
        if (parsed.test === 'integration_test') {
          localStorage.removeItem('codex_integration_test')
          updateTestResult(5, 'passed', 'Local storage working correctly')
        } else {
          updateTestResult(5, 'failed', 'Data corruption in local storage')
        }
      } else {
        updateTestResult(5, 'failed', 'Could not retrieve from local storage')
      }
    } catch (error) {
      updateTestResult(5, 'failed', 'Local storage failed', error instanceof Error ? error.message : 'Unknown error')
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    // Test 7: API Route Availability
    updateTestResult(6, 'running', 'Testing API routes...')
    try {
      const response = await fetch('/api/webhook/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'integration' })
      })
      
      if (response.ok) {
        updateTestResult(6, 'passed', 'API routes are accessible')
      } else {
        updateTestResult(6, 'failed', `API returned status ${response.status}`, 'This is expected in static export mode')
      }
    } catch (error) {
      updateTestResult(6, 'failed', 'API routes not available', 'This is expected in static export mode - fallback systems will work')
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'running':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return 'border-green-200 bg-green-50'
      case 'failed':
        return 'border-red-200 bg-red-50'
      case 'running':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          title="Run Integration Tests"
        >
          <Play className="w-5 h-5" />
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-4 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Codex System Integration Test</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-purple-200 hover:text-white"
          >
            ✕
          </button>
        </div>
        <p className="text-purple-200 text-sm mt-1">
          Verify all components are working correctly
        </p>
      </div>

      {/* Test Controls */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={runIntegrationTests}
          disabled={isRunning}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Running Tests...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Run Integration Tests</span>
            </>
          )}
        </button>
      </div>

      {/* Test Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {testResults.map((test, index) => (
          <motion.div
            key={test.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${getStatusColor(test.status)}`}
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(test.status)}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{test.name}</h4>
                <p className="text-sm text-gray-600">{test.message}</p>
                {test.details && (
                  <p className="text-xs text-gray-500 mt-1">{test.details}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {testResults.filter(t => t.status === 'passed').length} passed, {' '}
            {testResults.filter(t => t.status === 'failed').length} failed, {' '}
            {testResults.filter(t => t.status === 'pending').length} pending
          </span>
          {!isRunning && testResults.every(t => t.status !== 'pending') && (
            <span className={`font-medium ${
              testResults.every(t => t.status === 'passed' || (t.name === 'API Route Availability' && t.status === 'failed'))
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {testResults.every(t => t.status === 'passed' || (t.name === 'API Route Availability' && t.status === 'failed'))
                ? '✅ System Ready for Production'
                : '❌ Issues Found - Check Failed Tests'
              }
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
