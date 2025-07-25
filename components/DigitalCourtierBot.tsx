'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  Sparkles,
  CheckCircle,
  Calendar,
  Mail,
  Download
} from 'lucide-react'
import { CodexAIEngine, EnhancedCodexResponse } from '@/lib/CodexAIEngine'
import { CodexNLPEngine, type CodexResponse } from '@/lib/CodexNLPEngine'
import { ConversationalFlow } from '@/lib/ConversationalFlow'
import { EnhancedConversationalFlow, EnhancedConversationContext } from '@/lib/EnhancedConversationalFlow'
import { EnhancedBlueprintFlow, BlueprintConversationContext, BlueprintResponse } from '@/lib/EnhancedBlueprintFlow'
import { ProductionMonitoringSystem, ConversationMetrics } from '@/lib/ProductionMonitoringSystem'
import { ClientHandoffProtocol } from '@/lib/ClientHandoffProtocol'
import { CurrencySystem } from '@/lib/CurrencySystem'
import { notificationService, type LeadData } from '@/lib/NotificationService'

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: Date
  quickReplies?: string[]
  intent?: string
  confidence?: number
}

interface ConversationState {
  stage: 'greeting' | 'discovery' | 'qualification' | 'analysis' | 'proposal' | 'conversion' | 'complete'
  projectType?: string
  budget?: string
  timeline?: string
  needs?: string
  contactInfo?: {
    name?: string
    email?: string
    phone?: string
    company?: string
  }
  score: number
  readyForNotification: boolean
  aiResponse?: EnhancedCodexResponse
  conversationHistory: string[]
  qualificationData?: {
    projectGoal?: string
    mustHaveFeatures?: string[]
    budgetRange?: string
    urgency?: string
    decisionMaker?: boolean
  }
}

export function DigitalCourtierBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiEngine] = useState(() => new CodexAIEngine())
  const [nlpEngine] = useState(() => new CodexNLPEngine())
  const [conversationalFlow] = useState(() => new ConversationalFlow())
  const [enhancedFlow] = useState(() => new EnhancedConversationalFlow())
  const [blueprintFlow] = useState(() => new EnhancedBlueprintFlow())
  const [monitoringSystem] = useState(() => new ProductionMonitoringSystem())
  const [handoffProtocol] = useState(() => new ClientHandoffProtocol())
  const [currencySystem] = useState(() => new CurrencySystem())
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`)
  const [conversationState, setConversationState] = useState<ConversationState>({
    stage: 'greeting',
    score: 0,
    readyForNotification: false,
    conversationHistory: []
  })
  const [showProposal, setShowProposal] = useState(false)
  const [conversationStartTime] = useState(() => Date.now())
  const [responseLatencies, setResponseLatencies] = useState<number[]>([])
  const [errorCount, setErrorCount] = useState(0)
  const [quickButtons, setQuickButtons] = useState<string[]>([])
  const [isValidatedClient, setIsValidatedClient] = useState(false)
  const [userCurrency, setUserCurrency] = useState<'USD' | 'NGN'>('USD')
  const [exchangeRate, setExchangeRate] = useState<string>('')
  const [showCurrencyInfo, setShowCurrencyInfo] = useState(false)

  // Auto-open after 10 seconds on first visit
  useEffect(() => {
    const hasSeenBot = localStorage.getItem('hasSeenCourtierBot')
    if (!hasSeenBot) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('hasSeenCourtierBot', 'true')
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // More natural, conversational greeting
      const greetings = [
        "Hey there! 👋 Welcome to David's digital space. I'm Codex, and I'm genuinely curious - what brought you here today?",
        "Hi! 😊 I'm Codex, David's AI assistant. I love meeting new people! What's on your mind today?",
        "Hello! 👋 Great to see you here. I'm Codex, and I'm here to chat about anything you're curious about. What brings you by?",
        "Hey! 😊 Welcome! I'm Codex, David's digital companion. I'm genuinely interested to know - what sparked your visit today?"
      ]

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
      addBotMessage(randomGreeting)
    }
  }, [isOpen])

  const addBotMessage = (content: string) => {
    setIsTyping(true)

    // More realistic typing delay based on message length and complexity
    const baseDelay = 800 // Base thinking time
    const typingSpeed = 30 // ms per character (slower for more natural feel)
    const complexityBonus = content.includes('🤔') || content.includes('💰') || content.includes('🚀') ? 500 : 0
    const totalDelay = baseDelay + (content.length * typingSpeed) + complexityBonus

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }, Math.min(totalDelay, 4000)) // Cap at 4 seconds max
  }

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }])
  }

  const processUserInput = async (input: string) => {
    addUserMessage(input)
    setCurrentInput('')

    // Update conversation history
    const updatedHistory = [...conversationState.conversationHistory, input]
    setConversationState(prev => ({
      ...prev,
      conversationHistory: updatedHistory
    }))

    setIsTyping(true)
    const startTime = Date.now()

    // Use enhanced conversational flow for natural lead qualification
    setTimeout(async () => {
      try {
        // First, try the Blueprint Flow (3-phase structure from document)
        const blueprintContext: BlueprintConversationContext = {
          phase: conversationState.stage === 'greeting' ? 'greeting' :
                 conversationState.stage === 'discovery' ? 'domain_knowledge' : 'qualification',
          userInput: input,
          conversationHistory: updatedHistory,
          extractedInfo: {
            businessGoal: conversationState.qualificationData?.businessGoal,
            existingAssets: conversationState.qualificationData?.existingAssets,
            coreFeatures: conversationState.qualificationData?.mustHaveFeatures || [],
            techPreference: conversationState.qualificationData?.techPreference,
            budgetRange: conversationState.budget,
            timeline: conversationState.timeline,
            contactInfo: conversationState.contactInfo,
            readyToProceed: conversationState.readyForNotification
          },
          score: conversationState.score,
          lagosMarket: false // Will be detected automatically
        }

        const blueprintResponse = blueprintFlow.processConversation(blueprintContext)

        // If blueprint flow provides a good response, use it
        if (blueprintResponse.confidence > 0.7) {
          await handleBlueprintResponse(blueprintResponse, input, Date.now() - startTime)
          return
        }

        // Otherwise, fall back to enhanced conversational flow engine
        const enhancedContext: EnhancedConversationContext = {
          sessionId,
          userInput: input,
          conversationHistory: updatedHistory,
          currentStage: conversationState.stage,
          extractedInfo: {
            projectType: conversationState.projectType,
            budget: conversationState.budget,
            timeline: conversationState.timeline,
            contactInfo: conversationState.contactInfo,
            urgency: conversationState.qualificationData?.urgency,
            features: conversationState.qualificationData?.mustHaveFeatures || []
          },
          score: conversationState.score
        }

        const enhancedResponse = enhancedFlow.processConversation(enhancedContext)

        // Track response latency
        const responseTime = Date.now() - startTime
        setResponseLatencies(prev => [...prev.slice(-9), responseTime])

        // Handle the enhanced conversational response
        await handleEnhancedConversationalResponse(enhancedResponse, input, responseTime)

      } catch (error) {
        console.error('Enhanced Conversational Flow error:', error)
        setErrorCount(prev => prev + 1)
        // Fallback to basic conversational flow
        try {
          const flowResponse = conversationalFlow.processConversation({
            stage: conversationState.stage,
            userInput: input,
            conversationHistory: updatedHistory,
            extractedInfo: {
              projectType: conversationState.projectType,
              budget: conversationState.budget,
              timeline: conversationState.timeline,
              contactInfo: conversationState.contactInfo,
              urgency: conversationState.qualificationData?.urgency,
              features: conversationState.qualificationData?.mustHaveFeatures
            },
            score: conversationState.score
          })
          handleConversationalResponse(flowResponse, input)
        } catch (fallbackError) {
          console.error('Fallback Conversational Flow error:', fallbackError)
          handleAIFallback(input, updatedHistory)
        }
      }
    }, 500)
  }

  const handleBlueprintResponse = async (blueprintResponse: BlueprintResponse, userInput: string, responseTime: number) => {
    setIsTyping(false)

    // Add bot response
    addBotMessage(blueprintResponse.message)

    // Update conversation state based on blueprint response
    setConversationState(prev => ({
      ...prev,
      stage: blueprintResponse.nextPhase === 'handoff' ? 'conversion' :
             blueprintResponse.nextPhase === 'qualification' ? 'qualification' :
             blueprintResponse.nextPhase === 'domain_knowledge' ? 'discovery' : 'greeting',
      score: prev.score + (blueprintResponse.isQualified ? 20 : 5),
      readyForNotification: blueprintResponse.shouldNotify,
      qualificationData: {
        ...prev.qualificationData,
        businessGoal: blueprintResponse.extractedData?.businessGoal || prev.qualificationData?.businessGoal,
        existingAssets: blueprintResponse.extractedData?.existingAssets || prev.qualificationData?.existingAssets,
        techPreference: blueprintResponse.extractedData?.techPreference || prev.qualificationData?.techPreference,
        mustHaveFeatures: blueprintResponse.extractedData?.coreFeatures || prev.qualificationData?.mustHaveFeatures || []
      },
      budget: blueprintResponse.extractedData?.budget || prev.budget,
      timeline: blueprintResponse.extractedData?.timeline || prev.timeline
    }))

    // Set quick replies if provided
    if (blueprintResponse.quickReplies) {
      setQuickButtons(blueprintResponse.quickReplies)
    }

    // Handle notifications for qualified leads
    if (blueprintResponse.shouldNotify && blueprintResponse.isQualified) {
      await handleQualifiedLead(userInput, blueprintResponse)
    }

    // Track metrics
    const metrics: ConversationMetrics = {
      sessionId,
      timestamp: new Date(),
      userInput,
      botResponse: blueprintResponse.message,
      stage: blueprintResponse.nextPhase,
      responseTime,
      confidence: blueprintResponse.confidence,
      isQualified: blueprintResponse.isQualified || false,
      extractedData: blueprintResponse.extractedData
    }

    monitoringSystem.trackConversation(metrics)
  }

  const handleQualifiedLead = async (userInput: string, blueprintResponse: BlueprintResponse) => {
    try {
      const leadData: LeadData = {
        sessionId,
        timestamp: new Date(),
        userInput,
        botResponse: blueprintResponse.message,
        extractedInfo: {
          projectType: blueprintResponse.extractedData?.businessGoal || 'Not specified',
          budget: blueprintResponse.extractedData?.budget || 'Not specified',
          timeline: blueprintResponse.extractedData?.timeline || 'Not specified',
          contactInfo: blueprintResponse.extractedData?.contactInfo || {},
          urgency: blueprintResponse.isQualified ? 'high' : 'medium',
          mustHaveFeatures: blueprintResponse.extractedData?.coreFeatures || []
        },
        score: conversationState.score + 20,
        conversationHistory: conversationState.conversationHistory,
        isLagosMarket: blueprintResponse.extractedData?.lagosMarket || false
      }

      await notificationService.sendQualifiedLeadNotification(leadData)
      console.log('✅ Blueprint qualified lead notification sent successfully')
    } catch (error) {
      console.error('❌ Failed to send blueprint lead notification:', error)
    }
  }

  const handleEnhancedConversationalResponse = async (enhancedResponse: any, userInput: string, responseTime: number) => {
    setIsTyping(false)

    // Update conversation state with enhanced data
    setConversationState(prev => ({
      ...prev,
      stage: enhancedResponse.nextStage,
      score: enhancedResponse.extractedData?.score || prev.score,
      projectType: enhancedResponse.extractedData?.projectType || prev.projectType,
      budget: enhancedResponse.extractedData?.budget || prev.budget,
      timeline: enhancedResponse.extractedData?.timeline || prev.timeline,
      contactInfo: {
        ...prev.contactInfo,
        ...enhancedResponse.extractedData?.contactInfo
      },
      readyForNotification: enhancedResponse.shouldNotify
    }))

    // Update quick buttons
    if (enhancedResponse.quickButtons) {
      setQuickButtons(enhancedResponse.quickButtons)
    }

    // Set validation status
    if (enhancedResponse.validationResult) {
      setIsValidatedClient(enhancedResponse.validationResult.isValidatedClient)
    }

    // Update currency information
    if (enhancedResponse.currencyInfo) {
      setUserCurrency(enhancedResponse.currencyInfo.userCurrency)
      setExchangeRate(enhancedResponse.currencyInfo.exchangeRate)
      setShowCurrencyInfo(enhancedResponse.currencyInfo.locationData.showBothCurrencies)
    }

    // Add bot response
    addBotMessage(enhancedResponse.message)

    // Handle client handoff if ready
    if (enhancedResponse.shouldHandoff && enhancedResponse.handoffPackage) {
      await handleClientHandoff(enhancedResponse.handoffPackage, enhancedResponse.validationResult)
    }

    // Handle notifications for qualified leads
    if (enhancedResponse.shouldNotify && !enhancedResponse.shouldHandoff) {
      await handleLeadNotification(enhancedResponse.extractedData, userInput)
    }

    // Track conversation metrics
    trackConversationMetrics(enhancedResponse, userInput, responseTime)

    // Add follow-up questions if available
    if (enhancedResponse.followUpQuestions && enhancedResponse.followUpQuestions.length > 0) {
      setTimeout(() => {
        const followUp = enhancedResponse.followUpQuestions[0]
        addBotMessage(followUp)
      }, 2000)
    }
  }

  const handleConversationalResponse = async (flowResponse: any, userInput: string) => {
    // Update conversation state with extracted data
    setConversationState(prev => ({
      ...prev,
      stage: flowResponse.nextStage,
      score: prev.score + 10,
      projectType: flowResponse.extractedData?.projectType || prev.projectType,
      budget: flowResponse.extractedData?.budget || prev.budget,
      timeline: flowResponse.extractedData?.timeline || prev.timeline,
      contactInfo: {
        ...prev.contactInfo,
        ...flowResponse.extractedData?.contactInfo
      },
      qualificationData: {
        ...prev.qualificationData,
        urgency: flowResponse.extractedData?.urgency || prev.qualificationData?.urgency,
        mustHaveFeatures: flowResponse.extractedData?.features || prev.qualificationData?.mustHaveFeatures
      },
      readyForNotification: flowResponse.shouldNotify
    }))

    // Send the conversational response
    addBotMessage(flowResponse.message)

    // Handle notification if lead is qualified
    if (flowResponse.shouldNotify) {
      await handleLeadNotification(flowResponse.extractedData, userInput)
    }

    // Add follow-up questions if available
    if (flowResponse.followUpQuestions && flowResponse.followUpQuestions.length > 0) {
      setTimeout(() => {
        const followUp = flowResponse.followUpQuestions[0]
        addBotMessage(followUp)
      }, 2000)
    }
  }

  const handleClientHandoff = async (handoffPackage: any, validationResult: any) => {
    try {
      const prospect = enhancedFlow.getProspectProfile(sessionId)
      if (!prospect) {
        console.error('No prospect profile found for handoff')
        return
      }

      const handoffResponse = handoffProtocol.initiateClientHandoff(
        prospect,
        validationResult,
        handoffPackage,
        conversationState.conversationHistory
      )

      if (handoffResponse.success) {
        console.log('✅ Client handoff initiated successfully:', handoffResponse.handoffId)

        // Show handoff confirmation to user
        setTimeout(() => {
          addBotMessage(handoffResponse.clientMessage)
        }, 1000)

        // Send notifications
        await notificationService.notifyQualifiedLead({
          sessionId,
          timestamp: new Date(),
          contactInfo: prospect.contactInfo,
          projectDetails: {
            type: prospect.projectDetails.type,
            budget: prospect.projectDetails.budget,
            timeline: prospect.projectDetails.timeline,
            urgency: prospect.projectDetails.urgency,
            features: prospect.projectDetails.requirements
          },
          conversationSummary: conversationState.conversationHistory.join('\n'),
          score: prospect.qualification.score,
          readyForProposal: true
        })
      }
    } catch (error) {
      console.error('Failed to initiate client handoff:', error)
    }
  }

  const trackConversationMetrics = (enhancedResponse: any, _userInput: string, _responseTime: number) => {
    try {
      const prospect = enhancedFlow.getProspectProfile(sessionId)
      if (!prospect) return

      const metrics: ConversationMetrics = {
        sessionId,
        timestamp: new Date(),

        // Engagement Metrics
        totalMessages: messages.length + 1,
        conversationDuration: Date.now() - conversationStartTime,
        averageResponseTime: responseLatencies.reduce((sum, time) => sum + time, 0) / responseLatencies.length,
        userEngagementScore: prospect.engagement.responseQuality,

        // Funnel Metrics
        entryStage: 'awareness',
        exitStage: prospect.currentStage,
        stagesCompleted: prospect.stageHistory,
        conversionRate: prospect.qualification.score,
        dropOffPoint: prospect.currentStage === 'awareness' ? 'awareness' : undefined,

        // Lead Quality Metrics
        leadScore: prospect.qualification.score,
        validationScore: enhancedResponse.validationResult?.validationScore || 0,
        qualificationLevel: prospect.qualification.readyForHandoff ? 'validated' :
                           prospect.qualification.score >= 70 ? 'qualified' :
                           prospect.qualification.score >= 40 ? 'lead' : 'unqualified',

        // Business Metrics
        projectValue: estimateProjectValue(prospect.projectDetails.budget),
        serviceInterest: [prospect.projectDetails.type || 'unknown'],
        budgetRange: prospect.projectDetails.budget,
        urgencyLevel: prospect.projectDetails.urgency,

        // Technical Metrics
        responseLatency: responseLatencies,
        errorCount,
        systemPerformance: 95 // Would be calculated from actual system metrics
      }

      monitoringSystem.trackConversation(metrics)
    } catch (error) {
      console.error('Failed to track conversation metrics:', error)
    }
  }

  const estimateProjectValue = (budgetRange?: string): number => {
    if (!budgetRange) return 0

    const budgetMap: { [key: string]: number } = {
      'under-5k': 3000,
      '5k-15k': 10000,
      '15k-30k': 22500,
      '30k-50k': 40000,
      '50k-100k': 75000,
      '100k+': 150000
    }

    return budgetMap[budgetRange] || 0
  }

  const handleLeadNotification = async (extractedData: any, _userInput: string) => {
    try {
      const leadData: LeadData = {
        sessionId,
        timestamp: new Date(),
        contactInfo: {
          name: extractedData?.contactInfo?.name,
          email: extractedData?.contactInfo?.email,
          phone: extractedData?.contactInfo?.phone,
          company: extractedData?.contactInfo?.company
        },
        projectDetails: {
          type: extractedData?.projectType || conversationState.projectType,
          goal: extractedData?.projectGoal || conversationState.qualificationData?.projectGoal,
          budget: extractedData?.budget || conversationState.budget,
          timeline: extractedData?.timeline || conversationState.timeline,
          features: extractedData?.features || conversationState.qualificationData?.mustHaveFeatures || [],
          urgency: extractedData?.urgency || conversationState.qualificationData?.urgency || 'medium'
        },
        conversationSummary: messages.map(m => `${m.type}: ${m.content}`).join('\n'),
        score: conversationState.score,
        readyForProposal: true
      }

      // Send notification
      const notificationSent = await notificationService.notifyQualifiedLead(leadData)

      if (notificationSent) {
        console.log('✅ Lead notification sent successfully')
        // Optionally show a subtle confirmation to the user
        setTimeout(() => {
          addBotMessage("Perfect! I've notified David about your project. He'll be in touch with you shortly to discuss the details and next steps. 🚀")
        }, 3000)
      }
    } catch (error) {
      console.error('Failed to send lead notification:', error)
    }
  }

  const handleAIFallback = async (input: string, history: string[]) => {
    try {
      // Process with NLP engine for sophisticated understanding
      const nlpResponse = await nlpEngine.processMessage(sessionId, input, {
        currentPage: typeof window !== 'undefined' ? window.location.pathname : '/',
        userId: undefined
      })

      // Generate enhanced response using both engines
      const aiResponse = await aiEngine.generateComprehensiveResponse(input, history)

      // Combine NLP insights with AI response for more natural conversation
      handleEnhancedAIResponse(nlpResponse, aiResponse, input)
    } catch (error) {
      console.error('AI Fallback error:', error)
      handleFallbackResponse(input)
    }
  }

  const handleEnhancedAIResponse = (nlpResponse: CodexResponse, aiResponse: EnhancedCodexResponse, userInput: string) => {
    // Update conversation state with combined AI insights
    setConversationState(prev => ({
      ...prev,
      aiResponse,
      score: prev.score + nlpResponse.intent.confidence * 10,
      stage: determineNextStage(prev.stage, Math.max(aiResponse.confidence, nlpResponse.confidence))
    }))

    // Use NLP response if it's more confident and natural
    const primaryResponse = nlpResponse.confidence > aiResponse.confidence ? nlpResponse.message : aiResponse.message

    // Send the most appropriate response
    addBotMessage(primaryResponse)

    // Add quick replies if available from NLP engine
    if (nlpResponse.quickReplies.length > 0) {
      setTimeout(() => {
        const quickReplyMessage = `Quick options: ${nlpResponse.quickReplies.join(' • ')}`
        addBotMessage(quickReplyMessage)
      }, 1500)
    }

    // Handle high-confidence scenarios for proposal generation
    if (nlpResponse.confidence > 0.8 && nlpResponse.intent.type === 'booking') {
      setTimeout(() => {
        addBotMessage(
          "Perfect! I can see you're ready to move forward. Let me connect you with David directly for a consultation."
        )
        setConversationState(prev => ({ ...prev, stage: 'proposal' }))
      }, 2000)
    } else if (aiResponse.confidence > 0.8 && aiResponse.proposalDocument) {
      setTimeout(() => {
        addBotMessage(
          "Based on our discussion, I've generated a comprehensive project analysis. Would you like me to share the detailed proposal document?"
        )
        setConversationState(prev => ({ ...prev, stage: 'proposal' }))
      }, 2000)
    }
  }

  const handleAIResponse = (aiResponse: EnhancedCodexResponse, userInput: string) => {
    // Update conversation state with AI insights
    setConversationState(prev => ({
      ...prev,
      aiResponse,
      score: prev.score + 1,
      stage: determineNextStage(prev.stage, aiResponse.confidence)
    }))

    // Send AI-generated response
    addBotMessage(aiResponse.message)

    // If we have high confidence and comprehensive analysis, offer proposal
    if (aiResponse.confidence > 0.8 && aiResponse.proposalDocument) {
      setTimeout(() => {
        addBotMessage(
          "Based on our discussion, I've generated a comprehensive project analysis and proposal. Would you like me to share the detailed proposal document with you?"
        )
        setConversationState(prev => ({ ...prev, stage: 'proposal' }))
      }, 2000)
    } else if (aiResponse.nextQuestions.length > 0) {
      // Ask follow-up questions for better understanding
      setTimeout(() => {
        const nextQuestion = aiResponse.nextQuestions[0]
        addBotMessage(nextQuestion)
      }, 1500)
    }
  }

  const handleFallbackResponse = (input: string) => {
    const lowerInput = input.toLowerCase()

    // More human-like responses based on input
    let fallbackMessage = ""

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      fallbackMessage = "Hey there! 👋 Great to meet you! I'm Codex, and I'm here to chat about anything related to David's work or your potential projects. What's on your mind today?"
    } else if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      fallbackMessage = "I'd love to help! 😊 I can tell you all about David's experience (20+ years of coding, Cisco cybersecurity expert, AI specialist), discuss potential projects, or just chat about technology. I'm also pretty good at understanding what kind of digital solution might work best for your needs. What interests you most?"
    } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('budget')) {
      fallbackMessage = "Ah, the budget question! 💰 I totally get it - that's usually one of the first things people want to know. David's projects typically range from focused solutions around $5K-15K to comprehensive platforms $25K-60K, and enterprise systems can go higher. But honestly, it really depends on what you're trying to build. Want to tell me more about your project so I can give you a better sense?"
    } else if (lowerInput.includes('time') || lowerInput.includes('how long')) {
      fallbackMessage = "Timeline questions - smart thinking! ⏰ It really depends on the complexity, but David typically delivers focused solutions in 2-6 weeks, comprehensive platforms in 6-16 weeks, and complex enterprise systems can take longer. He's pretty good at breaking things into phases so you can see progress quickly. What kind of timeline are you working with?"
    } else {
      fallbackMessage = "That's interesting! 🤔 I want to make sure I understand what you're looking for. Are you thinking about a new project, curious about David's background, or maybe exploring what's possible with technology? I'm genuinely curious to learn more about what brought you here today!"
    }

    addBotMessage(fallbackMessage)
    setConversationState(prev => ({ ...prev, stage: 'discovery' }))
  }

  const determineNextStage = (currentStage: ConversationState['stage'], confidence: number): ConversationState['stage'] => {
    if (confidence > 0.9) return 'conversion'
    if (confidence > 0.8) return 'proposal'
    if (confidence > 0.6) return 'analysis'
    if (currentStage === 'greeting') return 'discovery'
    return currentStage
  }

  const handleProposalRequest = (input: string) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes('yes') || lowerInput.includes('sure') || lowerInput.includes('show')) {
      setShowProposal(true)
      addBotMessage(
        "Excellent! I've prepared a comprehensive project proposal based on our discussion. You can view it below. This includes technical recommendations, timeline estimates, and next steps. After reviewing, the best next step is to schedule a direct consultation with Mr. Iridescent to discuss implementation details."
      )
      setConversationState(prev => ({ ...prev, stage: 'conversion' }))
    } else {
      addBotMessage(
        "No problem! Based on our conversation, I believe this project has strong potential. The next step would be a direct consultation with Mr. Iridescent to discuss your specific requirements in detail. Would you prefer to schedule a call or begin with an email discussion?"
      )
      setConversationState(prev => ({ ...prev, stage: 'conversion' }))
    }
  }

  const handleSend = () => {
    if (currentInput.trim()) {
      if (conversationState.stage === 'proposal') {
        handleProposalRequest(currentInput.trim())
      } else {
        processUserInput(currentInput.trim())
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Bot Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Codex</h3>
                    <p className="text-sm opacity-90">Digital Emissary</p>
                  </div>
                </div>

                {/* Currency Info */}
                {showCurrencyInfo && exchangeRate && (
                  <div className="text-right">
                    <div className="text-xs opacity-75">Currency: {userCurrency}</div>
                    {userCurrency === 'NGN' && (
                      <div className="text-xs opacity-75">{exchangeRate}</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                      {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`p-3 rounded-2xl ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Response Buttons */}
            {conversationState.stage === 'greeting' && messages.length <= 2 && (
              <div className="p-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-3 text-center">I'm curious about...</div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={() => processUserInput("I'm thinking about starting a new project")}
                    className="text-xs bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    🚀 New Project
                  </button>
                  <button
                    onClick={() => processUserInput("Tell me about David's experience")}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    👤 David's Background
                  </button>
                  <button
                    onClick={() => processUserInput("I need help with AI and automation")}
                    className="text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    🤖 AI Solutions
                  </button>
                  <button
                    onClick={() => processUserInput("Just browsing and exploring")}
                    className="text-xs bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    👀 Just Looking
                  </button>
                </div>
              </div>
            )}

            {/* Project Type Quick Buttons */}
            {conversationState.stage === 'discovery' && !conversationState.projectType && (
              <div className="p-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-3 text-center">What type of project?</div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={() => processUserInput("I need a website")}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    🌐 Website
                  </button>
                  <button
                    onClick={() => processUserInput("I want a web application")}
                    className="text-xs bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    💻 Web App
                  </button>
                  <button
                    onClick={() => processUserInput("I need a mobile app")}
                    className="text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    📱 Mobile App
                  </button>
                  <button
                    onClick={() => processUserInput("I want AI automation")}
                    className="text-xs bg-orange-50 text-orange-700 px-3 py-2 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    🤖 AI Solution
                  </button>
                </div>
              </div>
            )}

            {/* Budget Range Quick Buttons */}
            {conversationState.stage === 'discovery' && conversationState.projectType && !conversationState.budget && (
              <div className="p-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-3 text-center">What's your budget range?</div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={() => processUserInput("My budget is under $10,000")}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    💰 Under $10K
                  </button>
                  <button
                    onClick={() => processUserInput("I have $10,000 to $25,000")}
                    className="text-xs bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    💰 $10K-25K
                  </button>
                  <button
                    onClick={() => processUserInput("My budget is $25,000 to $50,000")}
                    className="text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    💰 $25K-50K
                  </button>
                  <button
                    onClick={() => processUserInput("I have a flexible budget over $50,000")}
                    className="text-xs bg-orange-50 text-orange-700 px-3 py-2 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    💰 $50K+
                  </button>
                </div>
              </div>
            )}

            {/* Quick Buttons */}
            {quickButtons.length > 0 && conversationState.stage !== 'complete' && (
              <div className="p-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {quickButtons.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentInput(button)
                        processUserInput(button)
                        setQuickButtons([]) // Clear buttons after use
                      }}
                      disabled={isTyping}
                      className="px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {button}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            {conversationState.stage !== 'complete' && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isTyping ? "Codex is thinking..." : "Type your message..."}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!currentInput.trim() || isTyping}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Validation Status Indicator */}
                {isValidatedClient && (
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Validated Client - Ready for Handoff
                  </div>
                )}
              </div>
            )}

            {/* Proposal Display */}
            {showProposal && conversationState.aiResponse?.proposalDocument && (
              <div className="p-4 border-t border-gray-200 max-h-60 overflow-y-auto">
                <div className="bg-gray-50 rounded-lg p-3 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Project Proposal</h4>
                    <button
                      onClick={() => {
                        const blob = new Blob([conversationState.aiResponse?.proposalDocument || ''], { type: 'text/plain' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = 'Project-Proposal.txt'
                        a.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {conversationState.aiResponse.proposalDocument.substring(0, 500)}...
                  </div>
                  <div className="mt-2 text-purple-600 text-xs">
                    Click download icon to get full proposal document
                  </div>
                </div>
              </div>
            )}

            {/* Conversion Actions */}
            {(conversationState.stage === 'conversion' || conversationState.stage === 'complete') && (
              <div className="p-4 border-t border-gray-200 space-y-2">
                <a
                  href="/contact"
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                </a>
                <a
                  href="mailto:mriridescent@yahoo.com"
                  className="w-full flex items-center justify-center space-x-2 border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Directly</span>
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
