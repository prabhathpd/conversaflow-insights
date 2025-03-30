
export type LeadIntent = "high" | "medium" | "low";
export type CallTone = "happy" | "neutral" | "busy" | "annoyed";
export type DealStage = "new" | "contacted" | "meeting" | "proposal" | "closed";
export type NotificationType = "email" | "sms" | "call" | "meeting" | "other";

export interface EmailThread {
  id: string;
  subject: string;
  lastMessageDate: string;
  messages: EmailMessage[];
}

export interface EmailMessage {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  date: string;
  attachments?: string[];
}

export interface FollowUp {
  id: string;
  type: NotificationType;
  dueDate: string;
  notes?: string;
  completed: boolean;
  notificationSent: boolean;
}

export interface Call {
  id: string;
  leadId: string;
  date: string;
  duration: number; // in seconds
  recordingUrl: string;
  transcriptUrl?: string;
  summary?: string;
  score: number; // 1-5
  tone: CallTone;
  aiInsights?: string[];
  followUpSuggestions?: string[];
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  intent: LeadIntent;
  score: number; // 1-100
  calls: string[]; // reference to call ids
  lastContact: string;
  notes?: string;
  dealStage?: DealStage;
  industry?: string;
  designation?: string;
  projectValue?: number; // Added field for project value
  emailThreads?: EmailThread[]; // Added for email threads
  followUps?: FollowUp[]; // Added for follow-ups
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "sales" | "marketing" | "support";
  avatar?: string;
}

export interface DashboardStats {
  totalCalls: number;
  totalLeads: number;
  avgCallScore: number;
  newLeadsThisWeek: number;
  highIntentLeads: number;
  dealsPipeline: {
    new: number;
    contacted: number;
    meeting: number;
    proposal: number;
    closed: number;
  };
}
