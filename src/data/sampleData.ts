import { Contact, EventCompany, EventInfo, MeetingLog, UserProfile } from '../types';

export const currentEvent: EventInfo = {
  id: 'event-asu-kiro',
  name: 'ASU Kiro Spark Challenge',
  dateLabel: 'Friday, April 24',
  location: 'Tempe, AZ'
};

export const userContext = {
  careerGoal: 'Land a product or growth role',
  targetRoles: ['Product', 'PM', 'Growth', 'Engineer']
};

export const breadcrumbProfile: UserProfile = {
  name: 'Alex Rivera',
  headline: 'Product-minded builder focused on growth systems',
  careerGoal: 'Land a product or growth role',
  resumeName: 'Alex_Rivera_Resume.pdf',
  resumeSummary:
    'Built analytics dashboards, shipped AI workflow prototypes, and led growth experiments for student-founder tools.',
  topSkills: ['Product strategy', 'Growth analytics', 'AI prototyping', 'React Native', 'SQL'],
  targetRoles: ['Product Manager', 'Growth PM', 'AI Product Builder']
};

export const eventBattlePlan: EventCompany[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    booth: 'B12',
    hiringSignal: 'Consumer growth PM roles open',
    priority: 'High',
    whyTarget: 'Matches product strategy, growth analytics, and fintech curiosity.',
    talkingPoints: ['Ask about consumer growth loops', 'Mention dashboard experiments', 'Ask who owns data team hiring']
  },
  {
    id: 'google',
    name: 'Google',
    booth: 'A04',
    hiringSignal: 'Infra and AI platform teams recruiting',
    priority: 'High',
    whyTarget: 'Strong fit for AI prototyping and systems-facing product work.',
    talkingPoints: ['Ask about AI workflow tooling', 'Reference React Native prototype work', 'Ask about early career PM paths']
  },
  {
    id: 'devseed',
    name: 'DevSeed',
    booth: 'C08',
    hiringSignal: 'Climate data partnership conversations',
    priority: 'Medium',
    whyTarget: 'Good collaboration target for analytics, maps, and open-source tooling.',
    talkingPoints: ['Ask about climate data workflows', 'Mention SQL/dashboard skills', 'Explore open-source contribution']
  }
];

export const sampleMeetingLogs: MeetingLog[] = [
  {
    id: 'log-priya-1',
    source: 'voice',
    assignedContactId: 'contact-priya',
    summary:
      'Priya discussed Stripe consumer growth, May 15 timing, and a possible warm path to the data team hiring manager.',
    keyPoints: ['Consumer growth role in SF', 'Follow up after May 15', 'Knows data team hiring manager'],
    actionItems: ['Send a concise product/growth profile', 'Reference analytics dashboard experience'],
    createdAt: '2026-04-24T18:08:00.000Z'
  }
];

export const sampleContacts: Contact[] = [
  {
    id: 'contact-priya',
    name: 'Priya Kumar',
    initials: 'PK',
    company: 'Stripe',
    role: 'Senior PM',
    intentTag: 'recruiting',
    contextSnippet:
      'Priya is hiring for a consumer growth role in San Francisco and knows the data team hiring manager.',
    keyDetails: ['Follow up after May 15', 'Consumer growth - SF', 'Knows data team HM'],
    followUpDate: '2026-05-15',
    dueLabel: 'Due in 4 hours',
    urgency: 'today',
    valueScore: 9.2,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'Senior PM', value: 2.8, max: 3 },
      { label: 'Company Tier', detail: 'Stripe', value: 2, max: 2 },
      { label: 'Opportunity Type', detail: '#recruiting', value: 2, max: 2 },
      { label: 'Career Relevance', detail: 'Product/Growth', value: 1.8, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 240000,
    salaryBand: {
      source: 'Demo salary band',
      low: 220000,
      high: 280000,
      role: 'Senior PM'
    },
    transcription:
      'Just met Priya from Stripe, senior PM hiring for a consumer growth role in SF. Reach out after May 15. She knows the data team hiring manager.',
    createdAt: '2026-04-24T18:05:00.000Z',
    draftMessages: {
      linkedin:
        "Hi Priya - your point about Stripe's consumer growth team really resonated with me. I am especially interested in the SF role you mentioned and would love to reconnect after May 15 as you suggested.",
      email:
        'Hi Priya,\n\nThanks again for taking a few minutes at the Spark Challenge. Your note about consumer growth at Stripe stood out because it matches the product problems I have been chasing.\n\nI would love to reconnect after May 15 and share a concise profile.\n\nBest,\nAlex',
      coverLetter:
        'Dear Stripe team,\n\nI am excited about the consumer growth opportunity Priya described. The role combines product judgment, experimentation, and customer empathy, which are the areas where I do my best work.'
    }
  },
  {
    id: 'contact-wei',
    name: 'Wei Chen',
    initials: 'WC',
    company: 'Google',
    role: 'VP Eng',
    intentTag: 'recruiting',
    contextSnippet:
      'Wei is hiring senior infrastructure engineers and recommended a direct LinkedIn follow-up.',
    keyDetails: ['Senior infra roles', 'Systems experience matters', 'Direct LinkedIn follow-up'],
    followUpDate: '2026-04-25',
    dueLabel: 'Due tomorrow',
    urgency: 'soon',
    valueScore: 8.7,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'VP Eng', value: 2.9, max: 3 },
      { label: 'Company Tier', detail: 'Google', value: 2, max: 2 },
      { label: 'Opportunity Type', detail: '#recruiting', value: 2, max: 2 },
      { label: 'Career Relevance', detail: 'Engineering', value: 1.2, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 272000,
    salaryBand: {
      source: 'Demo salary band',
      low: 240000,
      high: 385000,
      role: 'VP Eng'
    },
    transcription:
      'Met Wei from Google, VP of Engineering, hiring senior engineers for infrastructure. Follow up directly on LinkedIn next week.',
    createdAt: '2026-04-24T17:20:00.000Z',
    draftMessages: {
      linkedin:
        'Hi Wei - I appreciated your thoughts on systems experience for senior infra roles. I would love to stay in touch and send over a quick profile next week as you suggested.',
      email:
        'Hi Wei,\n\nThank you for the conversation at the event. Your framing around infrastructure engineering and systems depth stuck with me.\n\nI would love to follow up next week with a short profile and a few relevant projects.\n\nBest,\nAlex',
      coverLetter:
        'Dear Google team,\n\nWei described an infrastructure role where systems thinking and engineering judgment matter deeply. That is exactly the environment where I hope to contribute.'
    }
  },
  {
    id: 'contact-marcus',
    name: 'Marcus Reed',
    initials: 'MR',
    company: 'DevSeed',
    role: 'Founder',
    intentTag: 'collaborator',
    contextSnippet:
      'Marcus is exploring climate data tools and wants to compare notes on open-source geospatial workflows.',
    keyDetails: ['Climate data tools', 'Open-source geospatial', 'Coffee after demos'],
    followUpDate: '2026-04-27',
    dueLabel: 'Due in 3 days',
    urgency: 'later',
    valueScore: 7.4,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'Founder', value: 2.4, max: 3 },
      { label: 'Company Tier', detail: 'DevSeed', value: 1.5, max: 2 },
      { label: 'Opportunity Type', detail: '#collaborator', value: 1.1, max: 2 },
      { label: 'Career Relevance', detail: 'Product partnership', value: 1.5, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 181000,
    salaryBand: {
      source: 'Demo salary band',
      low: 140000,
      high: 350000,
      role: 'Founder'
    },
    transcription:
      'Marcus from DevSeed is building climate data tooling and wants to compare open source geospatial workflows.',
    createdAt: '2026-04-24T15:50:00.000Z',
    draftMessages: {
      linkedin:
        'Hi Marcus - I kept thinking about the climate data tooling conversation. I would enjoy comparing notes on open-source geospatial workflows after demos wrap.',
      email:
        'Hi Marcus,\n\nThanks for the conversation today. The climate data tooling direction you described is fascinating, especially the open-source geospatial angle.\n\nI would enjoy comparing notes after demos wrap.\n\nBest,\nAlex',
      coverLetter:
        'Marcus described a collaboration around climate data tooling and open-source geospatial workflows. I am excited by that intersection and would enjoy exploring it further.'
    }
  }
];
