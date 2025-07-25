/**
 * 🚀 Enhanced Vonage Notification Service
 * Implements multi-channel notifications using Vonage Communications API
 * Based on blueprint recommendations for superior lead notification system
 */

import { LeadData } from './NotificationService'

interface VonageConfig {
  apiKey: string
  apiSecret: string
  applicationId: string
  privateKey: string
  whatsappNumber: string
  smsNumber: string
}

interface VonageMessage {
  to: string
  from: string
  text: string
  type: 'sms' | 'whatsapp' | 'voice'
  priority: 'high' | 'normal' | 'low'
}

interface VonageResponse {
  messageId: string
  status: 'sent' | 'delivered' | 'failed'
  timestamp: Date
  cost?: number
  errorMessage?: string
}

export class VonageNotificationService {
  private config: VonageConfig
  private baseUrl = 'https://rest.nexmo.com'
  private whatsappUrl = 'https://messages-sandbox.nexmo.com'
  
  constructor() {
    this.config = {
      apiKey: process.env.VONAGE_API_KEY || '',
      apiSecret: process.env.VONAGE_API_SECRET || '',
      applicationId: process.env.VONAGE_APPLICATION_ID || '',
      privateKey: process.env.VONAGE_PRIVATE_KEY || '',
      whatsappNumber: process.env.VONAGE_WHATSAPP_NUMBER || '14157386102', // Sandbox number
      smsNumber: process.env.VONAGE_SMS_NUMBER || 'DigitalPolymat'
    }
  }

  /**
   * Send qualified lead notification via multiple channels
   */
  public async sendQualifiedLeadNotification(leadData: LeadData): Promise<boolean> {
    try {
      console.log('🚀 Sending Vonage qualified lead notification...')
      
      const message = this.formatLeadMessage(leadData)
      const urgentMessage = this.formatUrgentLeadMessage(leadData)
      
      // Send via multiple channels for redundancy
      const results = await Promise.allSettled([
        this.sendSMS(message, 'high'),
        this.sendWhatsApp(urgentMessage, 'high'),
        this.sendEmail(leadData) // Fallback email
      ])
      
      // Check if at least one channel succeeded
      const successCount = results.filter(result => result.status === 'fulfilled').length
      
      if (successCount > 0) {
        console.log(`✅ Vonage notification sent successfully via ${successCount} channels`)
        await this.logNotification(leadData, 'success', results)
        return true
      } else {
        console.error('❌ All Vonage notification channels failed')
        await this.logNotification(leadData, 'failed', results)
        return false
      }
      
    } catch (error) {
      console.error('❌ Vonage notification service error:', error)
      return false
    }
  }

  /**
   * Send SMS notification via Vonage SMS API
   */
  private async sendSMS(message: string, priority: 'high' | 'normal' | 'low' = 'normal'): Promise<VonageResponse> {
    try {
      const payload = {
        from: this.config.smsNumber,
        to: process.env.NOTIFICATION_PHONE || '+234XXXXXXXXXX', // Replace with actual number
        text: message,
        type: 'unicode' // Support for emojis and special characters
      }

      const response = await fetch(`${this.baseUrl}/sms/json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          api_key: this.config.apiKey,
          api_secret: this.config.apiSecret,
          ...payload
        })
      })

      const data = await response.json()
      
      if (data.messages && data.messages[0].status === '0') {
        return {
          messageId: data.messages[0]['message-id'],
          status: 'sent',
          timestamp: new Date(),
          cost: parseFloat(data.messages[0]['remaining-balance'])
        }
      } else {
        throw new Error(data.messages[0]['error-text'] || 'SMS send failed')
      }
      
    } catch (error) {
      console.error('❌ Vonage SMS error:', error)
      throw error
    }
  }

  /**
   * Send WhatsApp message via Vonage Messages API
   */
  private async sendWhatsApp(message: string, priority: 'high' | 'normal' | 'low' = 'normal'): Promise<VonageResponse> {
    try {
      const payload = {
        from: this.config.whatsappNumber,
        to: process.env.NOTIFICATION_WHATSAPP || '+234XXXXXXXXXX', // Replace with actual WhatsApp number
        message_type: 'text',
        text: message,
        channel: 'whatsapp'
      }

      // Generate JWT token for authentication
      const jwt = this.generateJWT()

      const response = await fetch(`${this.whatsappUrl}/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      
      if (response.ok) {
        return {
          messageId: data.message_uuid,
          status: 'sent',
          timestamp: new Date()
        }
      } else {
        throw new Error(data.detail || 'WhatsApp send failed')
      }
      
    } catch (error) {
      console.error('❌ Vonage WhatsApp error:', error)
      throw error
    }
  }

  /**
   * Send voice call notification for high-priority leads
   */
  private async sendVoiceCall(message: string): Promise<VonageResponse> {
    try {
      const payload = {
        to: process.env.NOTIFICATION_PHONE || '+234XXXXXXXXXX',
        from: this.config.smsNumber,
        text: message,
        lg: 'en-us' // Language
      }

      const response = await fetch(`${this.baseUrl}/tts/json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          api_key: this.config.apiKey,
          api_secret: this.config.apiSecret,
          ...payload
        })
      })

      const data = await response.json()
      
      if (data.status === '0') {
        return {
          messageId: data.call_id,
          status: 'sent',
          timestamp: new Date()
        }
      } else {
        throw new Error(data.error_text || 'Voice call failed')
      }
      
    } catch (error) {
      console.error('❌ Vonage Voice error:', error)
      throw error
    }
  }

  /**
   * Fallback email notification
   */
  private async sendEmail(leadData: LeadData): Promise<boolean> {
    try {
      // Use existing email service or implement Vonage Email API
      const emailContent = this.formatEmailMessage(leadData)
      
      // This would integrate with your existing email service
      // For now, we'll just log it
      console.log('📧 Email notification (fallback):', emailContent)
      return true
      
    } catch (error) {
      console.error('❌ Email fallback error:', error)
      return false
    }
  }

  /**
   * Format lead message for SMS/WhatsApp
   */
  private formatLeadMessage(leadData: LeadData): string {
    const lagosFlag = leadData.isLagosMarket ? '🇳🇬 ' : ''
    const urgencyEmoji = leadData.extractedInfo.urgency === 'high' ? '🚨 ' : '⭐ '
    
    return `${urgencyEmoji}${lagosFlag}QUALIFIED LEAD ALERT!

👤 Session: ${leadData.sessionId.slice(-8)}
💼 Project: ${leadData.extractedInfo.projectType}
💰 Budget: ${leadData.extractedInfo.budget}
⏰ Timeline: ${leadData.extractedInfo.timeline}
📊 Score: ${leadData.score}/100

📝 Last Message: "${leadData.userInput.slice(0, 100)}..."

${leadData.isLagosMarket ? '🎯 Lagos Market Opportunity!' : '🌍 Global Client'}

Reply ASAP to secure this lead!`
  }

  /**
   * Format urgent lead message for high-priority notifications
   */
  private formatUrgentLeadMessage(leadData: LeadData): string {
    return `🚨 URGENT: High-Value Lead Detected!

${leadData.isLagosMarket ? '🇳🇬 Lagos Client' : '🌍 Global Client'} - Score: ${leadData.score}

Project: ${leadData.extractedInfo.projectType}
Budget: ${leadData.extractedInfo.budget}
Timeline: ${leadData.extractedInfo.timeline}

Contact immediately: ${leadData.extractedInfo.contactInfo.email || 'No email provided'}

This lead is ready to proceed!`
  }

  /**
   * Format email message
   */
  private formatEmailMessage(leadData: LeadData): string {
    return `
Subject: 🚨 Qualified Lead Alert - ${leadData.isLagosMarket ? 'Lagos' : 'Global'} Client

New qualified lead from your portfolio:

Session ID: ${leadData.sessionId}
Timestamp: ${leadData.timestamp.toLocaleString()}
Lead Score: ${leadData.score}/100

Project Details:
- Type: ${leadData.extractedInfo.projectType}
- Budget: ${leadData.extractedInfo.budget}
- Timeline: ${leadData.extractedInfo.timeline}
- Urgency: ${leadData.extractedInfo.urgency}

Contact Information:
- Email: ${leadData.extractedInfo.contactInfo.email || 'Not provided'}
- Name: ${leadData.extractedInfo.contactInfo.name || 'Not provided'}
- Company: ${leadData.extractedInfo.contactInfo.company || 'Not provided'}

Features Requested:
${leadData.extractedInfo.mustHaveFeatures?.join(', ') || 'None specified'}

Conversation History:
${leadData.conversationHistory.slice(-3).join('\n')}

Last User Message: "${leadData.userInput}"

${leadData.isLagosMarket ? '🎯 This is a Lagos market opportunity!' : ''}

Action Required: Contact this lead within 24 hours for best conversion rate.
    `
  }

  /**
   * Generate JWT token for Vonage API authentication
   */
  private generateJWT(): string {
    // In a real implementation, you would use a JWT library like 'jsonwebtoken'
    // For now, return a placeholder that would be replaced with actual JWT generation
    return 'JWT_TOKEN_PLACEHOLDER'
  }

  /**
   * Log notification attempt for monitoring
   */
  private async logNotification(leadData: LeadData, status: 'success' | 'failed', results: any[]): Promise<void> {
    try {
      const logEntry = {
        timestamp: new Date(),
        sessionId: leadData.sessionId,
        status,
        channels: results.map((result, index) => ({
          channel: ['sms', 'whatsapp', 'email'][index],
          status: result.status,
          error: result.status === 'rejected' ? result.reason : null
        })),
        leadScore: leadData.score,
        isLagosMarket: leadData.isLagosMarket
      }
      
      // Store in your preferred logging system
      console.log('📊 Vonage notification log:', logEntry)
      
    } catch (error) {
      console.error('❌ Failed to log notification:', error)
    }
  }

  /**
   * Get delivery status for a message
   */
  public async getDeliveryStatus(messageId: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/search/message?id=${messageId}`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.config.apiKey}:${this.config.apiSecret}`).toString('base64')}`
        }
      })
      
      const data = await response.json()
      return data.status || 'unknown'
      
    } catch (error) {
      console.error('❌ Failed to get delivery status:', error)
      return 'error'
    }
  }

  /**
   * Test the notification system
   */
  public async testNotification(): Promise<boolean> {
    try {
      const testMessage = "🧪 Test notification from Digital Polymat portfolio system"
      
      const result = await this.sendSMS(testMessage, 'normal')
      console.log('✅ Vonage test notification sent:', result)
      return true
      
    } catch (error) {
      console.error('❌ Vonage test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const vonageNotificationService = new VonageNotificationService()
