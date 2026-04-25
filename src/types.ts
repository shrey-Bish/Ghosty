export type IntentTag = 'recruiting' | 'mentor' | 'collaborator' | 'amplifier' | 'peer';

export type DraftType = 'linkedin' | 'email' | 'coverLetter';

export interface ScoreFactor {
  label: string;
  detail: string;
  value: number;
  max: number;
}

export interface DraftMessages {
  linkedin: string;
  email: string;
  coverLetter: string;
}

export interface Contact {
  id: string;
  name: string;
  initials: string;
  company: string;
  role: string;
  intentTag: IntentTag;
  contextSnippet: string;
  keyDetails: string[];
  followUpDate: string;
  dueLabel: string;
  urgency: 'overdue' | 'today' | 'soon' | 'later';
  valueScore: number;
  valueBreakdown: ScoreFactor[];
  estimatedCareerValue: number;
  salaryBand: {
    source: 'Levels.fyi fallback' | 'BLS fallback' | 'Demo salary band';
    low: number;
    high: number;
    role: string;
  };
  transcription: string;
  createdAt: string;
  followedUpAt?: string;
  draftMessages: DraftMessages;
}

export interface EventInfo {
  id: string;
  name: string;
  dateLabel: string;
  location: string;
}

export interface UserProfile {
  name: string;
  headline: string;
  careerGoal: string;
  resumeName: string;
  resumeSummary: string;
  topSkills: string[];
  targetRoles: string[];
}

export interface EventCompany {
  id: string;
  name: string;
  booth: string;
  hiringSignal: string;
  priority: 'High' | 'Medium' | 'Low';
  whyTarget: string;
  talkingPoints: string[];
}

export interface MeetingLog {
  id: string;
  source: 'voice' | 'zoom' | 'manual';
  assignedContactId: string;
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  createdAt: string;
}

export interface NetworkSearchResult {
  contact: Contact;
  reason: string;
  suggestedAsk: string;
}

export interface ExtractedContactCard {
  name: string;
  company: string | null;
  role: string | null;
  followUpDate: string | null;
  intentTag: IntentTag;
  contextSnippet: string;
  keyDetails: string[];
  uncertainFields: string[];
  estimatedSeniority: 'junior' | 'mid' | 'senior' | 'director' | 'vp' | 'c-suite' | 'unknown';
}

export type AppTab = 'home' | 'prep' | 'followup' | 'dashboard' | 'wand' | 'qr';
