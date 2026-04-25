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

export type AppTab = 'home' | 'followup' | 'dashboard' | 'qr';
