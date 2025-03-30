
import { Call, CallTone, Lead, LeadIntent, DealStage, DashboardStats, User } from "./types";

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

// Mock leads data
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
    dealStage: "meeting"
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
    dealStage: "contacted"
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
    dealStage: "proposal"
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
    dealStage: "new"
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
    dealStage: "proposal"
  }
];

// Mock users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@conversaflow.com",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
  },
  {
    id: "user-2",
    name: "Sales Rep",
    email: "sales@conversaflow.com",
    role: "sales",
    avatar: "https://ui-avatars.com/api/?name=Sales+Rep&background=2563EB&color=fff"
  }
];

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
