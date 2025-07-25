# 🚨 Lead Notification System Setup Guide

This guide will help you set up real-time SMS and WhatsApp notifications when qualified leads interact with your Codex chatbot.

## 🎯 **What This System Does**

When a visitor on your portfolio:
1. **Chats with Codex** about a project
2. **Provides project details** (type, budget, timeline)
3. **Shows readiness to proceed** (high lead score)
4. **Shares contact information**

You get **instant notifications** via:
- 📱 **SMS** to your phone
- 💬 **WhatsApp** message
- 📧 **Email** with detailed lead information

## 🛠️ **Setup Options**

### **Option 1: Zapier Integration (Recommended - No Code)**

This is the easiest setup using Zapier to connect webhooks to SMS/WhatsApp services.

#### **Step 1: Create Zapier Account**
1. Go to [zapier.com](https://zapier.com) and create an account
2. Choose the free plan (includes 100 tasks/month)

#### **Step 2: Create SMS Notification Zap**
1. **Create New Zap**
2. **Trigger**: Webhooks by Zapier → Catch Hook
3. **Copy the webhook URL** (you'll need this)
4. **Action**: SMS by Zapier → Send SMS
   - **To**: Your phone number
   - **Message**: Use the webhook data to format the message

#### **Step 3: Create WhatsApp Notification Zap**
1. **Create Another Zap**
2. **Trigger**: Webhooks by Zapier → Catch Hook
3. **Action**: WhatsApp Business by Zapier → Send Message
   - **To**: Your WhatsApp number
   - **Message**: Use the webhook data

#### **Step 4: Create Email Notification Zap**
1. **Create Third Zap**
2. **Trigger**: Webhooks by Zapier → Catch Hook
3. **Action**: Gmail/Outlook → Send Email
   - **To**: Your email
   - **Subject**: "New Qualified Lead: {{name}} - {{project_type}}"
   - **Body**: Format using webhook data

#### **Step 5: Configure Environment Variables**
Add to your `.env.local` file:
```env
NEXT_PUBLIC_NOTIFICATION_PHONE="+1234567890"
NEXT_PUBLIC_NOTIFICATION_EMAIL="your-email@example.com"
NEXT_PUBLIC_SMS_WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/YOUR_SMS_WEBHOOK_ID/"
NEXT_PUBLIC_WHATSAPP_WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/YOUR_WHATSAPP_WEBHOOK_ID/"
NEXT_PUBLIC_EMAIL_WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/YOUR_EMAIL_WEBHOOK_ID/"
```

### **Option 2: Make.com Integration (Alternative)**

Similar to Zapier but with Make.com (formerly Integromat):

1. Create account at [make.com](https://make.com)
2. Create scenarios instead of Zaps
3. Use webhook triggers and SMS/WhatsApp actions
4. Configure environment variables with Make webhook URLs

### **Option 3: Direct API Integration (Advanced)**

For developers who want direct control:

#### **Twilio Setup**
1. Create [Twilio account](https://twilio.com)
2. Get Account SID, Auth Token, and phone number
3. Enable WhatsApp sandbox for testing

```env
TWILIO_ACCOUNT_SID="your-account-sid"
TWILIO_AUTH_TOKEN="your-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"
TWILIO_WHATSAPP_NUMBER="whatsapp:+14155238886"
```

#### **Email Setup**
Use SendGrid or SMTP:

```env
SENDGRID_API_KEY="your-sendgrid-key"
# OR
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## 🧪 **Testing Your Setup**

### **Test the Chatbot Flow**
1. Open your portfolio in incognito mode
2. Click the Codex chatbot
3. Have a conversation about a project:
   - "I need a web application"
   - "Budget is around $15,000"
   - "Timeline is 2 months"
   - "I'm ready to proceed"
4. Provide contact information when asked

### **Verify Notifications**
You should receive:
- SMS with lead summary
- WhatsApp message with details
- Email with comprehensive lead information

### **Debug Issues**
Check browser console for:
- Webhook response errors
- Network connectivity issues
- Environment variable problems

## 📊 **Lead Scoring System**

The system automatically scores leads based on:

| Factor | Points | Description |
|--------|--------|-------------|
| **Project Type** | 20 | Clear project category identified |
| **Budget Range** | 25 | Budget information provided |
| **Timeline** | 15 | Timeline or deadline mentioned |
| **Email** | 20 | Email address provided |
| **Phone** | 10 | Phone number provided |
| **Engagement** | 10 | Length and quality of conversation |

**Notification Triggers:**
- **Score 70+** + Ready to proceed = Immediate notification
- **Score 50+** + Contact info = Qualified lead notification

## 🔧 **Customization Options**

### **Message Templates**
Edit `lib/NotificationService.ts` to customize:
- SMS message format
- WhatsApp message content
- Email templates
- Lead scoring criteria

### **Notification Timing**
Adjust when notifications are sent:
- Immediate (current)
- Batched (hourly/daily)
- Threshold-based (score requirements)

### **Additional Channels**
Add more notification methods:
- Slack messages
- Discord webhooks
- Microsoft Teams
- Push notifications

## 🚀 **Advanced Features**

### **Lead Management Dashboard**
Create a simple dashboard to:
- View all leads
- Mark leads as contacted
- Track conversion rates
- Export lead data

### **Follow-up Automation**
Set up automated follow-ups:
- Thank you emails
- Project questionnaires
- Scheduling links
- Proposal templates

### **Analytics Integration**
Track lead quality:
- Conversion rates by source
- Response times
- Project types in demand
- Budget distributions

## 🔒 **Security & Privacy**

### **Data Protection**
- Lead data is stored temporarily in memory
- No persistent storage of personal information
- GDPR-compliant data handling
- Secure webhook transmission

### **Rate Limiting**
Prevent spam and abuse:
- Limit notifications per session
- Cooldown periods between notifications
- IP-based rate limiting

## 💰 **Cost Estimates**

### **Zapier (Recommended)**
- **Free Plan**: 100 tasks/month (sufficient for most portfolios)
- **Paid Plans**: $19.99/month for 750 tasks

### **Direct APIs**
- **Twilio SMS**: $0.0075 per message
- **Twilio WhatsApp**: $0.005 per message
- **SendGrid Email**: Free for 100 emails/day

### **Expected Monthly Costs**
- **Low Traffic** (10 leads): $0-5
- **Medium Traffic** (50 leads): $5-15
- **High Traffic** (200+ leads): $15-30

## 🎯 **Success Metrics**

Track these KPIs:
- **Response Time**: How quickly you respond to leads
- **Conversion Rate**: Leads to actual projects
- **Lead Quality**: Score distribution
- **Channel Effectiveness**: SMS vs WhatsApp vs Email response rates

## 🆘 **Troubleshooting**

### **Common Issues**

**No notifications received:**
- Check webhook URLs in environment variables
- Verify Zapier/Make scenarios are active
- Test webhook endpoints manually

**Partial notifications:**
- Check individual service configurations
- Verify phone number formats (+1234567890)
- Test each notification channel separately

**Low lead scores:**
- Review conversation flow logic
- Adjust scoring criteria
- Test with different conversation patterns

### **Support Resources**
- [Zapier Documentation](https://zapier.com/help)
- [Twilio Documentation](https://twilio.com/docs)
- [Make.com Documentation](https://make.com/en/help)

## 🎉 **You're All Set!**

Once configured, your portfolio will automatically:
1. **Engage visitors** with natural conversation
2. **Qualify leads** through intelligent questioning
3. **Notify you instantly** when someone's ready to hire
4. **Provide detailed context** for your follow-up

This system transforms your portfolio from a static showcase into an active lead generation machine! 🚀
