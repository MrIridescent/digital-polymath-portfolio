# 🧪 Codex Chatbot Testing Guide

This guide will help you test the enhanced conversational Codex chatbot and notification system.

## 🎯 **What's New**

### **Enhanced Features:**
- ✅ **Natural Conversation Flow** - No more scripted responses
- ✅ **Intelligent Lead Qualification** - Automatically scores and qualifies leads
- ✅ **Real-time Notifications** - SMS, WhatsApp, and Email alerts
- ✅ **Dynamic Quick Buttons** - Context-aware response options
- ✅ **Lead Dashboard** - View and manage qualified leads
- ✅ **API Integration** - Store and track leads

## 🚀 **Testing the Conversation Flow**

### **Test Scenario 1: Project Inquiry (High-Value Lead)**

1. **Open your portfolio** in incognito mode
2. **Click the Codex chatbot** (purple floating button)
3. **Follow this conversation path:**

```
You: "Hi there!"
Codex: [Natural greeting - varies each time]

You: "I'm thinking about starting a new project"
Codex: [Asks about project type]

You: "I need a web application for my business"
Codex: [Asks about goals/budget]

You: "My budget is around $25,000"
Codex: [Asks about timeline]

You: "I need it completed in 3 months"
Codex: [Asks if you're decision maker]

You: "Yes, I'm ready to proceed"
Codex: [Should trigger notification and ask for contact info]

You: "My email is test@example.com and phone is +1234567890"
Codex: [Should confirm and notify David]
```

**Expected Result:**
- Lead score should reach 70+
- Notification should be triggered
- You should see confirmation message
- Lead should appear in dashboard

### **Test Scenario 2: Casual Browser (Low-Value Lead)**

```
You: "Just browsing"
Codex: [Casual response]

You: "Tell me about David"
Codex: [Shares background info]

You: "Interesting, thanks"
Codex: [Polite follow-up]
```

**Expected Result:**
- No notification triggered
- Lower lead score
- Conversation remains friendly but doesn't push

### **Test Scenario 3: Budget-Conscious Lead**

```
You: "I need a website but have a small budget"
Codex: [Asks about budget range]

You: "Under $5,000"
Codex: [Adjusts approach, still helpful]

You: "Can David work with that?"
Codex: [Honest about capabilities, suggests alternatives]
```

**Expected Result:**
- Qualified but different approach
- Still captures lead information
- Sets appropriate expectations

## 🔧 **Testing Quick Response Buttons**

### **Stage 1: Greeting Buttons**
- 🚀 New Project
- 👤 David's Background  
- 🤖 AI Solutions
- 👀 Just Looking

### **Stage 2: Project Type Buttons** (appears when project mentioned)
- 🌐 Website
- 💻 Web App
- 📱 Mobile App
- 🤖 AI Solution

### **Stage 3: Budget Buttons** (appears when project type selected)
- 💰 Under $10K
- 💰 $10K-25K
- 💰 $25K-50K
- 💰 $50K+

**Test:** Click through different button combinations to ensure smooth flow.

## 📊 **Testing Lead Dashboard**

### **Access Dashboard:**
1. Look for **Users icon** (👥) in bottom-left corner
2. Click to open lead dashboard
3. View leads, stats, and details

### **Dashboard Features:**
- **Lead List** - All captured leads
- **Status Updates** - Change lead status
- **Lead Details** - Full conversation and contact info
- **Stats** - New vs Qualified leads count

### **Test Actions:**
- Click on a lead to view details
- Update lead status (New → Contacted → Qualified → Converted)
- Close and reopen dashboard

## 🚨 **Testing Notification System**

### **Setup Test Environment:**

1. **Copy environment file:**
```bash
cp .env.example .env.local
```

2. **Add test webhook URL:**
```env
NEXT_PUBLIC_NOTIFICATION_PHONE="+1234567890"
NEXT_PUBLIC_NOTIFICATION_EMAIL="your-email@example.com"
NEXT_PUBLIC_SMS_WEBHOOK_URL="https://your-test-webhook.com/sms"
NEXT_PUBLIC_WHATSAPP_WEBHOOK_URL="https://your-test-webhook.com/whatsapp"
NEXT_PUBLIC_EMAIL_WEBHOOK_URL="https://your-test-webhook.com/email"
```

3. **Use test webhook service:**
   - Go to [webhook.site](https://webhook.site)
   - Copy the unique URL
   - Use it as your webhook URL for testing

### **Test Notification Trigger:**

1. **Complete a high-value conversation** (see Scenario 1 above)
2. **Check webhook.site** for received data
3. **Verify notification payload** contains:
   - Contact information
   - Project details
   - Lead score
   - Conversation summary

### **Expected Webhook Payload:**
```json
{
  "event": "qualified_lead",
  "timestamp": "2024-01-15T10:30:00Z",
  "lead": {
    "sessionId": "session_123...",
    "contactInfo": {
      "email": "test@example.com",
      "phone": "+1234567890"
    },
    "projectDetails": {
      "type": "web app",
      "budget": "$25K-50K",
      "timeline": "3 months"
    },
    "score": 85,
    "conversationSummary": "..."
  }
}
```

## 🔍 **Debugging Common Issues**

### **Chatbot Not Responding:**
- Check browser console for errors
- Verify all imports are working
- Test with simple "Hello" message

### **Notifications Not Sending:**
- Check environment variables are set
- Verify webhook URLs are accessible
- Test webhook endpoint manually
- Check browser network tab for failed requests

### **Lead Dashboard Empty:**
- Complete a full conversation first
- Check API endpoint `/api/leads` manually
- Verify lead storage is working

### **Quick Buttons Not Appearing:**
- Check conversation stage
- Verify conditions for button display
- Test different conversation paths

## 🛠️ **Development Testing**

### **API Endpoints:**

**Test Lead Storage:**
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

**Test Lead Retrieval:**
```bash
curl http://localhost:3000/api/leads
```

**Test Webhook Endpoint:**
```bash
curl -X POST http://localhost:3000/api/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"test": "webhook"}'
```

### **Console Debugging:**

Enable debug mode by adding to `.env.local`:
```env
CODEX_DEBUG_MODE=true
```

Look for these console messages:
- `🚀 Qualified Lead Detected:`
- `✅ Lead notification sent successfully`
- `💼 New Lead Stored:`
- `🔔 Webhook Test Endpoint Received:`

## 📈 **Performance Testing**

### **Load Testing:**
1. Open multiple browser tabs
2. Start conversations simultaneously
3. Verify each gets unique session ID
4. Check for memory leaks or slowdowns

### **Mobile Testing:**
1. Test on mobile devices
2. Verify chatbot is responsive
3. Check touch interactions work
4. Test quick buttons on small screens

## ✅ **Success Criteria**

### **Conversation Quality:**
- [ ] Natural, non-scripted responses
- [ ] Appropriate follow-up questions
- [ ] Context awareness throughout conversation
- [ ] Smooth transitions between stages

### **Lead Qualification:**
- [ ] Accurate lead scoring
- [ ] Proper qualification triggers
- [ ] Complete data capture
- [ ] Appropriate notification timing

### **Technical Performance:**
- [ ] Fast response times (<2 seconds)
- [ ] No console errors
- [ ] Proper error handling
- [ ] Mobile responsiveness

### **Notification System:**
- [ ] Reliable webhook delivery
- [ ] Complete payload data
- [ ] Multiple channel support
- [ ] Proper error handling

## 🎉 **Ready for Production**

Once all tests pass:

1. **Set up production webhooks** (Zapier/Make)
2. **Configure real notification channels**
3. **Add production environment variables**
4. **Monitor lead quality and conversion rates**
5. **Iterate based on real user feedback**

Your conversational Codex is now ready to automatically qualify leads and notify you in real-time! 🚀
