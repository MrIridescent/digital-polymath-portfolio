'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react'

interface Lead {
  id: string
  timestamp: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
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
    urgency?: string
  }
  score: number
  conversationSummary: string
}

export function LeadDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [showDashboard, setShowDashboard] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads')

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setLeads(data.leads)
          setLoading(false)
          return
        }
      }

      // If API is unavailable, try local storage
      throw new Error('API unavailable')
    } catch (error) {
      console.log('API unavailable, checking local storage for leads')

      // Fallback to local storage
      try {
        const localLeads = localStorage.getItem('codex_leads')
        if (localLeads) {
          const leads = JSON.parse(localLeads)
          setLeads(leads.reverse()) // Show newest first
        }
      } catch (localError) {
        console.error('Failed to fetch leads from local storage:', localError)
      }
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId, status })
      })

      if (response.ok) {
        fetchLeads() // Refresh leads
        return
      }

      throw new Error('API unavailable')
    } catch (error) {
      console.log('API unavailable, updating lead status locally')

      // Update local storage
      try {
        const localLeads = localStorage.getItem('codex_leads')
        if (localLeads) {
          const leads = JSON.parse(localLeads)
          const leadIndex = leads.findIndex((lead: any) => lead.id === leadId || lead.sessionId === leadId)

          if (leadIndex !== -1) {
            leads[leadIndex].status = status
            leads[leadIndex].updatedAt = new Date().toISOString()
            localStorage.setItem('codex_leads', JSON.stringify(leads))
            fetchLeads() // Refresh from local storage
          }
        }
      } catch (localError) {
        console.error('Failed to update lead locally:', localError)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      case 'converted': return 'bg-purple-100 text-purple-800'
      case 'lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (!showDashboard) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setShowDashboard(true)}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          title="View Lead Dashboard"
        >
          <Users className="w-5 h-5" />
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="fixed left-6 top-6 bottom-6 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50"
    >
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <h3 className="font-semibold">Lead Dashboard</h3>
          </div>
          <button
            onClick={() => setShowDashboard(false)}
            className="text-gray-300 hover:text-white"
          >
            <EyeOff className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-300 mt-1">
          {leads.length} total leads
        </p>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {leads.filter(l => l.status === 'new').length}
            </div>
            <div className="text-xs text-gray-500">New</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.status === 'qualified').length}
            </div>
            <div className="text-xs text-gray-500">Qualified</div>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="text-center text-gray-500 py-8">
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No leads yet
          </div>
        ) : (
          leads.map((lead) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setSelectedLead(lead)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium text-sm">
                    {lead.contactInfo.name || 'Anonymous'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {lead.projectDetails.type || 'Unknown project'}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                  <span className={`text-xs font-medium ${getScoreColor(lead.score)}`}>
                    {lead.score}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                {lead.contactInfo.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span>Email</span>
                  </div>
                )}
                {lead.contactInfo.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>Phone</span>
                  </div>
                )}
                {lead.projectDetails.budget && (
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-3 h-3" />
                    <span>{lead.projectDetails.budget}</span>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-400 mt-2">
                {new Date(lead.timestamp).toLocaleDateString()}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLead(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-semibold mb-4">
              {selectedLead.contactInfo.name || 'Anonymous Lead'}
            </h4>
            
            <div className="space-y-3 text-sm">
              <div>
                <strong>Contact:</strong>
                <div className="text-gray-600">
                  {selectedLead.contactInfo.email && <div>📧 {selectedLead.contactInfo.email}</div>}
                  {selectedLead.contactInfo.phone && <div>📱 {selectedLead.contactInfo.phone}</div>}
                  {selectedLead.contactInfo.company && <div>🏢 {selectedLead.contactInfo.company}</div>}
                </div>
              </div>
              
              <div>
                <strong>Project:</strong>
                <div className="text-gray-600">
                  <div>Type: {selectedLead.projectDetails.type || 'Not specified'}</div>
                  <div>Budget: {selectedLead.projectDetails.budget || 'Not specified'}</div>
                  <div>Timeline: {selectedLead.projectDetails.timeline || 'Not specified'}</div>
                </div>
              </div>
              
              <div>
                <strong>Status:</strong>
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                  className="ml-2 px-2 py-1 border rounded text-sm"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedLead(null)}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
