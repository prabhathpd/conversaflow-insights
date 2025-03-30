import { Call, CallTone, Lead, LeadIntent, DealStage, DashboardStats, User, EmailThread, FollowUp } from "./types";

// Mock calls data
export const mockCalls: Call[] = [
  {
    id: "call-1",
    leadId: "lead-1",
    date: "2023-09-15T14:30:00",
    duration: 356, // 5m 56s
    recordingUrl: "https://example.com/recordings/call-1.mp3",
    transcriptUrl: "https://example.com/transcripts/call-1.json",
    summary: "Discussed product features and pricing. Client showed interest in enterprise plan.",
    score: 4,
    tone: "happy",
    aiInsights: [
      "Client mentioned budget approval next quarter",
      "Shows interest in automation features",
      "Concerned about implementation time"
    ],
    followUpSuggestions: [
      "Send case studies about implementation time",
      "Schedule demo with technical team",
      "Follow up about budget approval in October"
    ]
  },
  {
    id: "call-2",
    leadId: "lead-2",
    date: "2023-09-14T11:15:00",
    duration: 245, // 4m 5s
    recordingUrl: "https://example.com/recordings/call-2.mp3",
    transcriptUrl: "https://example.com/transcripts/call-2.json",
    summary: "Brief introduction call. Lead was busy but agreed to a follow-up next week.",
    score: 2,
    tone: "busy",
    aiInsights: [
      "Limited engagement during call",
      "Mentioned competing solution they're evaluating",
      "Best time to reach: mornings"
    ],
    followUpSuggestions: [
      "Send comparison sheet with competitor",
      "Schedule morning follow-up next week",
      "Keep email brief and highlight time-saving benefits"
    ]
  },
  {
    id: "call-3",
    leadId: "lead-3",
    date: "2023-09-13T16:45:00",
    duration: 612, // 10m 12s
    recordingUrl: "https://example.com/recordings/call-3.mp3",
    transcriptUrl: "https://example.com/transcripts/call-3.json",
    summary: "In-depth discussion about technical requirements. Lead had many questions about API integration.",
    score: 5,
    tone: "neutral",
    aiInsights: [
      "Technical decision maker with specific API needs",
      "Currently using manual process, high pain point",
      "Timeframe: wants to implement within 30 days"
    ],
    followUpSuggestions: [
      "Share API documentation",
      "Connect with solutions engineer",
      "Propose accelerated onboarding package"
    ]
  },
  {
    id: "call-4",
    leadId: "lead-4",
    date: "2023-09-12T13:20:00",
    duration: 183, // 3m 3s
    recordingUrl: "https://example.com/recordings/call-4.mp3",
    transcriptUrl: "https://example.com/transcripts/call-4.json",
    summary: "Lead was not interested in the product. They already have a solution in place.",
    score: 1,
    tone: "annoyed",
    aiInsights: [
      "Currently locked in contract with competitor",
      "Not the right timing",
      "Potential to revisit in 6-12 months"
    ],
    followUpSuggestions: [
      "No immediate follow-up recommended",
      "Add to nurture campaign",
      "Set reminder to check in after 6 months"
    ]
  },
  {
    id: "call-5",
    leadId: "lead-5",
    date: "2023-09-11T10:00:00",
    duration: 425, // 7m 5s
    recordingUrl: "https://example.com/recordings/call-5.mp3",
    transcriptUrl: "https://example.com/transcripts/call-5.json",
    summary: "Detailed pricing discussion. Lead requested a custom quote for their team of 50.",
    score: 4,
    tone: "happy",
    aiInsights: [
      "Decision maker with budget authority",
      "Price sensitive but values quality",
      "Looking to make decision within 2 weeks"
    ],
    followUpSuggestions: [
      "Send custom pricing proposal",
      "Highlight volume discounts",
      "Include ROI calculator"
    ]
  }
];

// Mock email threads
const mockEmailThreads: Record<string, EmailThread[]> = {
  "lead-1": [
    {
      id: "thread-1",
      subject: "Enterprise Plan Discussion",
      lastMessageDate: "2023-09-14T10:30:00",
      messages: [
        {
          id: "msg-1",
          sender: "sales@conversaflow.com",
          recipient: "john.smith@techcorp.com",
          subject: "Enterprise Plan Discussion",
          body: "Hello John, following up on our call about the enterprise plan. I've attached the pricing details as requested.",
          date: "2023-09-13T15:30:00",
          attachments: ["pricing.pdf"]
        },
        {
          id: "msg-2",
          sender: "john.smith@techcorp.com",
          recipient: "sales@conversaflow.com",
          subject: "Re: Enterprise Plan Discussion",
          body: "Thanks for the information. I'll review with my team and get back to you by next week.",
          date: "2023-09-14T10:30:00"
        }
      ]
    }
  ],
  "lead-2": [
    {
      id: "thread-2",
      subject: "Marketing Solutions Demo",
      lastMessageDate: "2023-09-13T16:45:00",
      messages: [
        {
          id: "msg-3",
          sender: "sales@conversaflow.com",
          recipient: "sarah.j@marketingsolutions.co",
          subject: "Marketing Solutions Demo",
          body: "Hi Sarah, I'd like to schedule a demo of our product for your team. When would be a good time?",
          date: "2023-09-12T11:20:00"
        },
        {
          id: "msg-4",
          sender: "sarah.j@marketingsolutions.co",
          recipient: "sales@conversaflow.com",
          subject: "Re: Marketing Solutions Demo",
          body: "Let's do next Tuesday at 2pm. Can you send a calendar invite?",
          date: "2023-09-13T16:45:00"
        }
      ]
    }
  ]
};

// Mock follow-ups
const mockFollowUps: Record<string, FollowUp[]> = {
  "lead-1": [
    {
      id: "followup-1",
      type: "email",
      dueDate: "2023-09-20T10:00:00",
      notes: "Send case studies about implementation time",
      completed: false,
      notificationSent: false
    },
    {
      id: "followup-2",
      type: "call",
      dueDate: "2023-09-22T15:00:00",
      notes: "Follow up about budget approval",
      completed: false,
      notificationSent: false
    }
  ],
  "lead-3": [
    {
      id: "followup-3",
      type: "meeting",
      dueDate: "2023-09-18T13:00:00",
      notes: "Technical demo with their engineering team",
      completed: false,
      notificationSent: true
    }
  ]
};

// Mock leads data with new fields
export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    name: "John Smith",
    company: "TechCorp Inc.",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    intent: "high",
    score: 85,
    calls: ["call-1"],
    lastContact: "2023-09-15T14:30:00",
    notes: "Decision maker, interested in enterprise plan",
    dealStage: "meeting",
    industry: "Technology",
    designation: "CTO",
    projectValue: 75000,
    emailThreads: mockEmailThreads["lead-1"],
    followUps: mockFollowUps["lead-1"]
  },
  {
    id: "lead-2",
    name: "Sarah Johnson",
    company: "Marketing Solutions",
    email: "sarah.j@marketingsolutions.co",
    phone: "+1 (555) 234-5678",
    intent: "medium",
    score: 60,
    calls: ["call-2"],
    lastContact: "2023-09-14T11:15:00",
    notes: "Marketing Director, evaluating several solutions",
    dealStage: "contacted",
    industry: "Marketing",
    designation: "Marketing Director",
    projectValue: 45000,
    emailThreads: mockEmailThreads["lead-2"],
    followUps: []
  },
  {
    id: "lead-3",
    name: "Michael Chen",
    company: "DevOps Pro",
    email: "mchen@devopspro.tech",
    phone: "+1 (555) 345-6789",
    intent: "high",
    score: 92,
    calls: ["call-3"],
    lastContact: "2023-09-13T16:45:00",
    notes: "Technical decision maker, needs API integration",
    dealStage: "proposal",
    industry: "Software",
    designation: "DevOps Lead",
    projectValue: 120000,
    emailThreads: [],
    followUps: mockFollowUps["lead-3"]
  },
  {
    id: "lead-4",
    name: "Emma Williams",
    company: "Retail Group",
    email: "ewilliams@retailgroup.com",
    phone: "+1 (555) 456-7890",
    intent: "low",
    score: 25,
    calls: ["call-4"],
    lastContact: "2023-09-12T13:20:00",
    notes: "Not interested currently, has existing contract",
    dealStage: "new",
    industry: "Retail",
    designation: "Operations Manager",
    projectValue: 0,
    emailThreads: [],
    followUps: []
  },
  {
    id: "lead-5",
    name: "David Martinez",
    company: "Financial Services LLC",
    email: "dmartinez@finserv.com",
    phone: "+1 (555) 567-8901",
    intent: "high",
    score: 78,
    calls: ["call-5"],
    lastContact: "2023-09-11T10:00:00",
    notes: "Price sensitive but ready to move quickly",
    dealStage: "proposal",
    industry: "Finance",
    designation: "CFO",
    projectValue: 95000,
    emailThreads: [],
    followUps: []
  }
];

// Helper functions to get mock data
export function getCalls(): Call[] {
  return mockCalls;
}

export function getCallById(id: string): Call | undefined {
  return mockCalls.find(call => call.id === id);
}

export function getLeads(): Lead[] {
  return mockLeads;
}

export function getLeadById(id: string): Lead | undefined {
  return mockLeads.find(lead => lead.id === id);
}

export function getDashboardStats(): DashboardStats {
  return mockDashboardStats;
}

export function getLeadsByIntent(intent: LeadIntent): Lead[] {
  return mockLeads.filter(lead => lead.intent === intent);
}

export function getLeadsByDealStage(stage: DealStage): Lead[] {
  return mockLeads.filter(lead => lead.dealStage === stage);
}

export function getCallsForLead(leadId: string): Call[] {
  return mockCalls.filter(call => call.leadId === leadId);
}

// Additional helper functions for email threads and follow-ups
export function getEmailThreadsForLead(leadId: string): EmailThread[] {
  const lead = getLeadById(leadId);
  return lead?.emailThreads || [];
}

export function getFollowUpsForLead(leadId: string): FollowUp[] {
  const lead = getLeadById(leadId);
  return lead?.followUps || [];
}

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalCalls: 27,
  totalLeads: 15,
  avgCallScore: 3.7,
  newLeadsThisWeek: 5,
  highIntentLeads: 7,
  dealsPipeline: {
    new: 3,
    contacted: 5,
    meeting: 4,
    proposal: 2,
    closed: 1
  }
};
