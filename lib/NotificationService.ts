// Notification Service for Lead Qualification and Real-time Alerts
export interface LeadData {
  sessionId: string
  timestamp: Date
  contactInfo: {
    name?: string
    email?: string
    phone?: string
    company?: string
  }
  projectDetails: {
    type?: string
    goal?: string
    budget?: string
    timeline?: string
    features?: string[]
    urgency?: string
  }
  conversationSummary: string
  score: number
  readyForProposal: boolean
}

export interface NotificationConfig {
  webhookUrl?: string
  smsEnabled: boolean
  whatsappEnabled: boolean
  emailEnabled: boolean
  phoneNumber?: string
  email?: string
}

export class NotificationService {
  private config: NotificationConfig
  private pendingLeads: Map<string, LeadData> = new Map()

  constructor(config: NotificationConfig) {
    this.config = config
  }

  // Main method to trigger notifications when lead is qualified
  public async notifyQualifiedLead(leadData: LeadData): Promise<boolean> {
    try {
      console.log('🚀 Qualified Lead Detected:', leadData)
      
      // Store lead data
      this.pendingLeads.set(leadData.sessionId, leadData)

      // Format notification message
      const message = this.formatLeadNotification(leadData)

      // Send notifications via multiple channels
      const results = await Promise.allSettled([
        this.sendWebhookNotification(leadData),
        this.sendSMSNotification(message),
        this.sendWhatsAppNotification(message),
        this.sendEmailNotification(leadData),
        this.storeLead(leadData)
      ])

      // Check if at least one notification succeeded
      const successCount = results.filter(result => result.status === 'fulfilled').length
      
      if (successCount > 0) {
        console.log(`✅ Lead notification sent via ${successCount} channels`)
        return true
      } else {
        console.error('❌ All notification channels failed')
        return false
      }
    } catch (error) {
      console.error('Notification service error:', error)
      return false
    }
  }

  // Format lead data into a concise notification message
  private formatLeadNotification(lead: LeadData): string {
    const { contactInfo, projectDetails } = lead
    
    return `🚨 NEW QUALIFIED LEAD!

👤 Contact: ${contactInfo.name || 'Not provided'}
🏢 Company: ${contactInfo.company || 'Not provided'}
📧 Email: ${contactInfo.email || 'Not provided'}
📱 Phone: ${contactInfo.phone || 'Not provided'}

🎯 Project: ${projectDetails.type || 'Not specified'}
💰 Budget: ${projectDetails.budget || 'Not specified'}
⏰ Timeline: ${projectDetails.timeline || 'Not specified'}
🔥 Urgency: ${projectDetails.urgency || 'Medium'}

📝 Goal: ${projectDetails.goal || 'Not specified'}

💯 Lead Score: ${lead.score}/100
${lead.readyForProposal ? '✅ Ready for proposal' : '⏳ Needs more qualification'}

Session: ${lead.sessionId}
Time: ${lead.timestamp.toLocaleString()}`
  }

  // Send webhook notification (for Zapier/Make integration)
  private async sendWebhookNotification(leadData: LeadData): Promise<void> {
    if (!this.config.webhookUrl) {
      throw new Error('Webhook URL not configured')
    }

    const response = await fetch(this.config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'qualified_lead',
        timestamp: leadData.timestamp.toISOString(),
        lead: leadData
      })
    })

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`)
    }
  }

  // Send SMS notification (via webhook to Zapier/Make -> Twilio)
  private async sendSMSNotification(message: string): Promise<void> {
    if (!this.config.smsEnabled || !this.config.phoneNumber) {
      throw new Error('SMS not configured')
    }

    // This would integrate with your SMS service (Twilio, etc.)
    // For now, we'll use a webhook approach that can be connected to Zapier
    const smsWebhook = process.env.NEXT_PUBLIC_SMS_WEBHOOK_URL
    
    if (smsWebhook) {
      await fetch(smsWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: this.config.phoneNumber,
          message: message.substring(0, 1600) // SMS length limit
        })
      })
    } else {
      // Fallback: log to console for development
      console.log('📱 SMS Notification:', message)
    }
  }

  // Send WhatsApp notification (via webhook to Zapier/Make -> Twilio WhatsApp)
  private async sendWhatsAppNotification(message: string): Promise<void> {
    if (!this.config.whatsappEnabled || !this.config.phoneNumber) {
      throw new Error('WhatsApp not configured')
    }

    const whatsappWebhook = process.env.NEXT_PUBLIC_WHATSAPP_WEBHOOK_URL
    
    if (whatsappWebhook) {
      await fetch(whatsappWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: this.config.phoneNumber,
          message: message
        })
      })
    } else {
      // Fallback: log to console for development
      console.log('💬 WhatsApp Notification:', message)
    }
  }

  // Send email notification with detailed lead information
  private async sendEmailNotification(leadData: LeadData): Promise<void> {
    if (!this.config.emailEnabled || !this.config.email) {
      throw new Error('Email not configured')
    }

    const emailWebhook = process.env.NEXT_PUBLIC_EMAIL_WEBHOOK_URL
    
    const emailContent = this.formatEmailNotification(leadData)
    
    if (emailWebhook) {
      await fetch(emailWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: this.config.email,
          subject: `🚨 New Qualified Lead: ${leadData.contactInfo.name || 'Anonymous'} - ${leadData.projectDetails.type || 'Project'}`,
          html: emailContent
        })
      })
    } else {
      // Fallback: log to console for development
      console.log('📧 Email Notification:', emailContent)
    }
  }

  // Format detailed email notification
  private formatEmailNotification(lead: LeadData): string {
    return `
    <h2>🚨 New Qualified Lead Alert</h2>
    
    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${lead.contactInfo.name || 'Not provided'}</li>
      <li><strong>Email:</strong> ${lead.contactInfo.email || 'Not provided'}</li>
      <li><strong>Phone:</strong> ${lead.contactInfo.phone || 'Not provided'}</li>
      <li><strong>Company:</strong> ${lead.contactInfo.company || 'Not provided'}</li>
    </ul>

    <h3>Project Details</h3>
    <ul>
      <li><strong>Type:</strong> ${lead.projectDetails.type || 'Not specified'}</li>
      <li><strong>Goal:</strong> ${lead.projectDetails.goal || 'Not specified'}</li>
      <li><strong>Budget:</strong> ${lead.projectDetails.budget || 'Not specified'}</li>
      <li><strong>Timeline:</strong> ${lead.projectDetails.timeline || 'Not specified'}</li>
      <li><strong>Urgency:</strong> ${lead.projectDetails.urgency || 'Medium'}</li>
      <li><strong>Features:</strong> ${lead.projectDetails.features?.join(', ') || 'None specified'}</li>
    </ul>

    <h3>Lead Quality</h3>
    <ul>
      <li><strong>Score:</strong> ${lead.score}/100</li>
      <li><strong>Ready for Proposal:</strong> ${lead.readyForProposal ? 'Yes ✅' : 'No ⏳'}</li>
      <li><strong>Session ID:</strong> ${lead.sessionId}</li>
      <li><strong>Timestamp:</strong> ${lead.timestamp.toLocaleString()}</li>
    </ul>

    <h3>Conversation Summary</h3>
    <p>${lead.conversationSummary}</p>

    <hr>
    <p><em>This lead was automatically qualified by the Codex AI system.</em></p>
    `
  }

  // Get pending leads for review
  public getPendingLeads(): LeadData[] {
    return Array.from(this.pendingLeads.values())
  }

  // Mark lead as contacted
  public markLeadContacted(sessionId: string): void {
    this.pendingLeads.delete(sessionId)
  }

  // Store lead in API for management
  private async storeLead(leadData: LeadData): Promise<void> {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        console.log('📝 Lead storage skipped (server-side)')
        return
      }

      // Use Netlify Function for production deployment
      const apiUrl = process.env.NODE_ENV === 'production'
        ? '/.netlify/functions/leads'
        : '/api/leads';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      })

      if (!response.ok) {
        // If API is not available (e.g., static export), store locally
        if (response.status === 404 || response.status === 500) {
          this.storeLeadLocally(leadData)
          return
        }
        throw new Error(`Lead storage failed: ${response.status}`)
      }

      console.log('✅ Lead stored in API')
    } catch (error) {
      console.log('📝 API unavailable, storing lead locally')
      this.storeLeadLocally(leadData)
      // Don't throw - this shouldn't break notifications
    }
  }

  // Fallback local storage for leads when API is unavailable
  private storeLeadLocally(leadData: LeadData): void {
    try {
      if (typeof window !== 'undefined') {
        const existingLeads = localStorage.getItem('codex_leads')
        const leads = existingLeads ? JSON.parse(existingLeads) : []

        leads.push({
          ...leadData,
          id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          storedLocally: true
        })

        // Keep only last 50 leads to prevent storage bloat
        if (leads.length > 50) {
          leads.splice(0, leads.length - 50)
        }

        localStorage.setItem('codex_leads', JSON.stringify(leads))
        console.log('✅ Lead stored locally')
      }
    } catch (error) {
      console.error('Failed to store lead locally:', error)
    }
  }

  // Update notification configuration
  public updateConfig(newConfig: Partial<NotificationConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }
}

// Default notification service instance
export const defaultNotificationConfig: NotificationConfig = {
  smsEnabled: true,
  whatsappEnabled: true,
  emailEnabled: true,
  phoneNumber: process.env.NEXT_PUBLIC_NOTIFICATION_PHONE,
  email: process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL,
  webhookUrl: process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL
}

export const notificationService = new NotificationService(defaultNotificationConfig)
