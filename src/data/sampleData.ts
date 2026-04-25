import { Contact, EventCompany, EventInfo, EventItem, MeetingLog, UserProfile } from '../types';

export const currentEvent: EventInfo = {
  id: 'event-kiro-spark',
  name: 'Kiro Spark Challenge',
  dateLabel: 'Friday, April 24',
  location: 'Tempe, AZ'
};

export const userContext = {
  careerGoal: 'Land a product or growth role at a top tech company',
  targetRoles: ['Product', 'PM', 'Growth', 'Engineer', 'Solutions Architect']
};

export const ghostyProfile: UserProfile = {
  name: 'Shrey Bishnoi',
  headline: 'Product-minded builder focused on AI and growth systems',
  title: 'Software Engineer',
  school: 'Arizona State University',
  linkedin: 'linkedin.com/in/shrey-bishnoi',
  bio:
    'Software engineer and AI builder focused on growth, analytics, and tools that help people find opportunity faster. Passionate about building products that turn invisible data into actionable insight.',
  careerGoal: 'Land a product or growth role at a top tech company',
  currentFocus: 'Software Engineer',
  graduation: 'May 2026',
  resumeName: 'Shrey_Bishnoi_Resume.pdf',
  resumeSummary:
    'Built analytics dashboards, shipped AI workflow prototypes, and led growth experiments for developer tools.',
  resumes: ['Software_Engineering_Resume.pdf', 'Product_Management_Resume.pdf'],
  urls: [
    { label: 'LinkedIn', value: 'linkedin.com/in/shrey-bishnoi' },
    { label: 'GitHub', value: 'github.com/shrey-Bish' },
    { label: 'Portfolio', value: 'shreybishnoi.dev' }
  ],
  topSkills: ['React Native', 'TypeScript', 'AI prototyping', 'Growth analytics', 'SQL'],
  skills: ['Software Engineering', 'TypeScript', 'React Native', 'SQL', 'AI/ML'],
  targetRoles: ['Software Engineer', 'Product Manager', 'Growth PM', 'AI Product Builder']
};

// ---------------------------------------------------------------------------
// Mentors from the Kiro Spark Challenge (from the event slide)
// ---------------------------------------------------------------------------

export const sampleContacts: Contact[] = [
  {
    id: 'contact-aditya-challa',
    name: 'Aditya Challa',
    initials: 'AC',
    company: 'AWS',
    role: 'Senior Solutions Architect',
    intentTag: 'mentor',
    contextSnippet:
      'Aditya shared insights on cloud architecture patterns and offered to review my system design approach for interviews.',
    keyDetails: ['Cloud architecture patterns', 'System design review', 'AWS best practices'],
    followUpDate: '2026-04-28',
    dueLabel: 'Due in 4 days',
    urgency: 'soon',
    valueScore: 8.9,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'Senior Solutions Architect', value: 2.6, max: 3 },
      { label: 'Company Tier', detail: 'AWS', value: 2, max: 2 },
      { label: 'Opportunity Type', detail: '#mentor', value: 1.5, max: 2 },
      { label: 'Career Relevance', detail: 'Engineering', value: 1.8, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 245000,
    salaryBand: { source: 'Demo salary band', low: 180000, high: 280000, role: 'Senior Solutions Architect' },
    transcription:
      'Met Aditya Challa from AWS, senior solutions architect. He gave great advice on cloud architecture and offered to review my system design prep.',
    createdAt: '2026-04-24T10:15:00.000Z',
    draftMessages: {
      linkedin:
        "Hi Aditya - your insights on cloud architecture patterns at the Kiro Spark Challenge were incredibly helpful. The way you broke down system design thinking is exactly the kind of mentorship I have been looking for. I would love to take you up on the offer to review my approach and get your feedback on a few design decisions I have been working through.",
      email:
        'Hi Aditya,\n\nThank you for the conversation at the Kiro Spark Challenge. Your advice on cloud architecture patterns and system design was exactly what I needed to hear.\n\nI would love to take you up on the offer to review my system design approach. Happy to send over a brief write-up whenever works for you.\n\nBest,\nShrey',
      coverLetter:
        'Dear AWS team,\n\nAfter speaking with Aditya Challa about cloud architecture and system design, I am even more excited about the engineering culture at AWS. The depth of technical mentorship he described aligns perfectly with how I want to grow as an engineer.'
    }
  },
  {
    id: 'contact-brian-eisenlauer',
    name: 'Brian Eisenlauer',
    initials: 'BE',
    company: 'AWS',
    role: 'Senior Solutions Architect Manager',
    intentTag: 'recruiting',
    contextSnippet:
      'Brian manages the solutions architecture team and mentioned open roles for early-career engineers with strong product instincts.',
    keyDetails: ['SA team hiring', 'Early-career roles', 'Product-minded engineers valued'],
    followUpDate: '2026-04-26',
    dueLabel: 'Due in 2 days',
    urgency: 'soon',
    valueScore: 9.1,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'SA Manager', value: 2.8, max: 3 },
      { label: 'Company Tier', detail: 'AWS', value: 2, max: 2 },
      { label: 'Opportunity Type', detail: '#recruiting', value: 2, max: 2 },
      { label: 'Career Relevance', detail: 'Engineering/Product', value: 1.8, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 260000,
    salaryBand: { source: 'Demo salary band', low: 200000, high: 300000, role: 'SA Manager' },
    transcription:
      'Brian Eisenlauer from AWS, manages the solutions architecture team. They have open roles for early-career engineers who think like product builders.',
    createdAt: '2026-04-24T10:30:00.000Z',
    draftMessages: {
      linkedin:
        "Hi Brian - I really appreciated hearing about the solutions architecture team at AWS and the emphasis on product-minded engineers. The early-career roles you described sound like a strong fit for the kind of work I have been doing with AI prototyping and developer tools. I would love to follow up and learn more about the team and the application process.",
      email:
        'Hi Brian,\n\nThank you for taking the time to chat at the Kiro Spark Challenge. The SA team roles you described, especially the focus on product-minded engineers, really resonated with me.\n\nI would love to follow up and learn more about the application process. Happy to share my resume and a few relevant projects.\n\nBest,\nShrey',
      coverLetter:
        'Dear AWS team,\n\nBrian Eisenlauer described a solutions architecture team that values product instincts alongside technical depth. That combination is exactly where I want to build my career, and I would welcome the chance to contribute.'
    }
  },
  {
    id: 'contact-harsh-tita',
    name: 'Harsh Tita',
    initials: 'HT',
    company: 'AI Cloud Innovation Center',
    role: 'AI Full-Stack Developer',
    intentTag: 'collaborator',
    contextSnippet:
      'Harsh builds AI-powered applications and was interested in collaborating on voice-first product ideas.',
    keyDetails: ['AI full-stack development', 'Voice-first products', 'Potential collaboration'],
    followUpDate: '2026-04-29',
    dueLabel: 'Due in 5 days',
    urgency: 'later',
    valueScore: 7.8,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'AI Full-Stack Developer', value: 2.0, max: 3 },
      { label: 'Company Tier', detail: 'AI Cloud Innovation Center', value: 1.4, max: 2 },
      { label: 'Opportunity Type', detail: '#collaborator', value: 1.2, max: 2 },
      { label: 'Career Relevance', detail: 'AI/Product', value: 1.8, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 175000,
    salaryBand: { source: 'Demo salary band', low: 140000, high: 220000, role: 'AI Full-Stack Developer' },
    transcription:
      'Harsh Tita from the AI Cloud Innovation Center, full-stack AI developer. Interested in collaborating on voice-first product ideas.',
    createdAt: '2026-04-24T11:00:00.000Z',
    draftMessages: {
      linkedin:
        "Hi Harsh - I really enjoyed our conversation about AI-powered voice products at the Kiro Spark Challenge. The work you are doing at the AI Cloud Innovation Center is fascinating, and I think there is a lot of overlap with the voice-first tools I have been building. Would love to explore a collaboration and compare notes on our approaches.",
      email:
        'Hi Harsh,\n\nGreat meeting you at the Kiro Spark Challenge. Your work on AI full-stack applications is impressive, and I see a lot of overlap with the voice-first tools I have been prototyping.\n\nWould love to compare notes and explore a potential collaboration.\n\nBest,\nShrey',
      coverLetter:
        'Harsh described AI-powered application development that aligns closely with the voice-first product work I have been building. I am excited about the potential for collaboration.'
    }
  },
  {
    id: 'contact-aditya-vikram',
    name: 'Aditya Vikram Parakala',
    initials: 'AP',
    company: 'AWS',
    role: 'Technical Account Manager',
    intentTag: 'mentor',
    contextSnippet:
      'Aditya Vikram shared advice on navigating large tech companies and building relationships with engineering teams as a TAM.',
    keyDetails: ['TAM career path', 'Navigating big tech', 'Customer-facing engineering'],
    followUpDate: '2026-04-30',
    dueLabel: 'Due in 6 days',
    urgency: 'later',
    valueScore: 8.2,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'Technical Account Manager', value: 2.2, max: 3 },
      { label: 'Company Tier', detail: 'AWS', value: 2, max: 2 },
      { label: 'Opportunity Type', detail: '#mentor', value: 1.5, max: 2 },
      { label: 'Career Relevance', detail: 'Engineering', value: 1.5, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 210000,
    salaryBand: { source: 'Demo salary band', low: 160000, high: 250000, role: 'Technical Account Manager' },
    transcription:
      'Aditya Vikram Parakala from AWS, technical account manager. Great advice on navigating big tech and building relationships with engineering teams.',
    createdAt: '2026-04-24T11:20:00.000Z',
    draftMessages: {
      linkedin:
        "Hi Aditya - your advice on navigating large tech companies and the TAM career path was really valuable. I appreciated hearing how you build relationships with engineering teams at AWS. I would love to stay in touch and learn more about how you transitioned into the role and what skills mattered most early on.",
      email:
        'Hi Aditya,\n\nThank you for the mentorship conversation at the Kiro Spark Challenge. Your perspective on the TAM career path and navigating big tech was exactly what I needed.\n\nI would love to stay in touch and hear more about your journey.\n\nBest,\nShrey',
      coverLetter:
        'Dear AWS team,\n\nAfter speaking with Aditya Vikram Parakala about the TAM role and customer-facing engineering, I am excited about the opportunity to combine technical depth with relationship building at AWS.'
    }
  },
  {
    id: 'contact-danny-kim',
    name: 'Danny Kim',
    initials: 'DK',
    company: 'AWS',
    role: 'Principal Private Equity Advisor',
    intentTag: 'amplifier',
    contextSnippet:
      'Danny advises private equity firms on cloud strategy and offered to connect me with founders in the AWS ecosystem.',
    keyDetails: ['PE cloud strategy', 'Founder introductions', 'AWS ecosystem connections'],
    followUpDate: '2026-05-01',
    dueLabel: 'Due in 7 days',
    urgency: 'later',
    valueScore: 8.5,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'Principal Advisor', value: 2.8, max: 3 },
      { label: 'Company Tier', detail: 'AWS', value: 2, max: 2 },
      { label: 'Opportunity Type', detail: '#amplifier', value: 1.2, max: 2 },
      { label: 'Career Relevance', detail: 'Network/Growth', value: 1.5, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 230000,
    salaryBand: { source: 'Demo salary band', low: 200000, high: 350000, role: 'Principal Advisor' },
    transcription:
      'Danny Kim from AWS, principal private equity advisor. He advises PE firms on cloud strategy and offered to connect me with founders in the AWS ecosystem.',
    createdAt: '2026-04-24T11:45:00.000Z',
    draftMessages: {
      linkedin:
        "Hi Danny - I really appreciated your perspective on cloud strategy in the PE space at the Kiro Spark Challenge. The founder introductions you mentioned would be incredibly valuable as I explore product and engineering opportunities. I would love to take you up on that offer and stay connected as I build out my network in the AWS ecosystem.",
      email:
        'Hi Danny,\n\nThank you for the conversation at the Kiro Spark Challenge. Your work advising PE firms on cloud strategy is fascinating, and the founder connections you mentioned would be incredibly helpful.\n\nI would love to follow up and stay connected.\n\nBest,\nShrey',
      coverLetter:
        'Danny Kim described a network of founders and PE firms in the AWS ecosystem that aligns with the kind of high-impact product work I want to pursue.'
    }
  },
  {
    id: 'contact-jeffrey-mills',
    name: 'Jeffrey Mills',
    initials: 'JM',
    company: 'Toptal',
    role: 'Chief Customer Officer, AI Services',
    intentTag: 'recruiting',
    contextSnippet:
      'Jeffrey leads AI services at Toptal and is looking for engineers who can build AI-powered products end-to-end.',
    keyDetails: ['AI services leadership', 'End-to-end AI product builders', 'Toptal hiring'],
    followUpDate: '2026-04-27',
    dueLabel: 'Due in 3 days',
    urgency: 'soon',
    valueScore: 9.0,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'Chief Customer Officer', value: 3.0, max: 3 },
      { label: 'Company Tier', detail: 'Toptal', value: 1.6, max: 2 },
      { label: 'Opportunity Type', detail: '#recruiting', value: 2, max: 2 },
      { label: 'Career Relevance', detail: 'AI/Engineering', value: 1.8, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 255000,
    salaryBand: { source: 'Demo salary band', low: 190000, high: 320000, role: 'Chief Customer Officer' },
    transcription:
      'Jeffrey Mills from Toptal, chief customer officer for AI services. Looking for engineers who build AI products end-to-end.',
    createdAt: '2026-04-24T12:00:00.000Z',
    draftMessages: {
      linkedin:
        "Hi Jeffrey - your vision for AI services at Toptal really resonated with me at the Kiro Spark Challenge. I have been building AI-powered products end-to-end, including voice-first tools and analytics dashboards, and the kind of work you described is exactly where I want to focus my career. I would love to learn more about the team and explore how I might contribute.",
      email:
        'Hi Jeffrey,\n\nThank you for the conversation at the Kiro Spark Challenge. Your description of the AI services team at Toptal and the focus on end-to-end AI product builders really stood out.\n\nI have been building in this space and would love to learn more about the opportunities.\n\nBest,\nShrey',
      coverLetter:
        'Dear Toptal team,\n\nJeffrey Mills described an AI services team that values engineers who can build products end-to-end. That is exactly the kind of work I do best, combining AI prototyping with product thinking and user empathy.'
    }
  },
  {
    id: 'contact-arun-arunachalam',
    name: 'Arun Arunachalam',
    initials: 'AA',
    company: 'Amazon',
    role: 'Senior Solutions Architect',
    intentTag: 'mentor',
    contextSnippet:
      'Arun shared his journey from engineering to solutions architecture at Amazon and offered career guidance.',
    keyDetails: ['Engineering to SA path', 'Amazon culture insights', 'Career guidance offered'],
    followUpDate: '2026-04-29',
    dueLabel: 'Due in 5 days',
    urgency: 'later',
    valueScore: 8.6,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'Senior Solutions Architect', value: 2.6, max: 3 },
      { label: 'Company Tier', detail: 'Amazon', value: 2, max: 2 },
      { label: 'Opportunity Type', detail: '#mentor', value: 1.5, max: 2 },
      { label: 'Career Relevance', detail: 'Engineering', value: 1.5, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 235000,
    salaryBand: { source: 'Demo salary band', low: 180000, high: 280000, role: 'Senior Solutions Architect' },
    transcription:
      'Arun Arunachalam from Amazon, senior solutions architect. Shared his journey from engineering to SA and offered career guidance.',
    createdAt: '2026-04-24T12:30:00.000Z',
    draftMessages: {
      linkedin:
        "Hi Arun - I really valued hearing about your journey from engineering to solutions architecture at Amazon. The career guidance you offered at the Kiro Spark Challenge was exactly the kind of mentorship I have been looking for. I would love to stay in touch and hear more about how you made the transition and what advice you would give someone early in their career.",
      email:
        'Hi Arun,\n\nThank you for sharing your career journey at the Kiro Spark Challenge. Your path from engineering to solutions architecture at Amazon is inspiring.\n\nI would love to stay in touch and get your advice as I navigate my own career decisions.\n\nBest,\nShrey',
      coverLetter:
        'Dear Amazon team,\n\nAfter speaking with Arun Arunachalam about the solutions architecture role and Amazon engineering culture, I am excited about the opportunity to combine technical depth with customer impact.'
    }
  },
  {
    id: 'contact-evan-elezaj',
    name: 'Evan Elezaj',
    initials: 'EE',
    company: 'Toptal',
    role: 'Solutions Architect',
    intentTag: 'collaborator',
    contextSnippet:
      'Evan builds solutions for Toptal clients and was interested in the voice-first approach to networking tools.',
    keyDetails: ['Client solutions at Toptal', 'Voice-first product interest', 'Technical collaboration'],
    followUpDate: '2026-05-02',
    dueLabel: 'Due in 8 days',
    urgency: 'later',
    valueScore: 7.5,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'Solutions Architect', value: 2.2, max: 3 },
      { label: 'Company Tier', detail: 'Toptal', value: 1.4, max: 2 },
      { label: 'Opportunity Type', detail: '#collaborator', value: 1.2, max: 2 },
      { label: 'Career Relevance', detail: 'Engineering', value: 1.5, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 185000,
    salaryBand: { source: 'Demo salary band', low: 150000, high: 240000, role: 'Solutions Architect' },
    transcription:
      'Evan Elezaj from Toptal, solutions architect. Interested in the voice-first approach to networking tools.',
    createdAt: '2026-04-24T13:00:00.000Z',
    draftMessages: {
      linkedin:
        "Hi Evan - I enjoyed our conversation about voice-first product design at the Kiro Spark Challenge. The solutions work you do at Toptal sounds like a great fit for the kind of technical collaboration I am looking for. I would love to compare notes on our approaches and explore how we might work together on something interesting.",
      email:
        'Hi Evan,\n\nGreat meeting you at the Kiro Spark Challenge. Your work at Toptal and interest in voice-first tools aligns well with what I have been building.\n\nWould love to compare notes and explore a collaboration.\n\nBest,\nShrey',
      coverLetter:
        'Evan described client solutions work at Toptal that overlaps with the voice-first product tools I have been prototyping. I am excited about the potential for technical collaboration.'
    }
  },
  {
    id: 'contact-madhu-nagaraj',
    name: 'Madhu Nagaraj',
    initials: 'MN',
    company: 'AWS',
    role: 'Senior Technical Account Manager',
    intentTag: 'mentor',
    contextSnippet:
      'Madhu shared deep insights on the TAM role at AWS and how to position yourself for customer-facing technical roles.',
    keyDetails: ['TAM role deep dive', 'Customer-facing positioning', 'AWS career paths'],
    followUpDate: '2026-04-30',
    dueLabel: 'Due in 6 days',
    urgency: 'later',
    valueScore: 8.4,
    valueBreakdown: [
      { label: 'Role Seniority', detail: 'Senior TAM', value: 2.4, max: 3 },
      { label: 'Company Tier', detail: 'AWS', value: 2, max: 2 },
      { label: 'Opportunity Type', detail: '#mentor', value: 1.5, max: 2 },
      { label: 'Career Relevance', detail: 'Engineering', value: 1.5, max: 2 },
      { label: 'Recency Bonus', detail: 'Today', value: 1, max: 1 }
    ],
    estimatedCareerValue: 220000,
    salaryBand: { source: 'Demo salary band', low: 170000, high: 260000, role: 'Senior TAM' },
    transcription:
      'Madhu Nagaraj from AWS, senior technical account manager. Deep insights on the TAM role and positioning for customer-facing technical roles.',
    createdAt: '2026-04-24T13:30:00.000Z',
    draftMessages: {
      linkedin:
        "Hi Madhu - your deep dive on the TAM role at AWS during the Kiro Spark Challenge was incredibly insightful. The way you described positioning for customer-facing technical roles is exactly the kind of career advice I have been looking for. I would love to stay in touch and learn more about your experience navigating the AWS career paths.",
      email:
        'Hi Madhu,\n\nThank you for the mentorship conversation at the Kiro Spark Challenge. Your insights on the TAM role and customer-facing positioning at AWS were exactly what I needed.\n\nI would love to stay connected and continue learning from your experience.\n\nBest,\nShrey',
      coverLetter:
        'Dear AWS team,\n\nAfter speaking with Madhu Nagaraj about the Senior TAM role, I am excited about the opportunity to combine technical expertise with customer relationship building at AWS.'
    }
  }
];

// ---------------------------------------------------------------------------
// Event companies for the Events screen
// ---------------------------------------------------------------------------

export const eventBattlePlan: EventCompany[] = [
  {
    id: 'aws',
    name: 'AWS',
    booth: 'A01',
    hiringSignal: 'Solutions Architect and TAM roles open',
    priority: 'High',
    attendingCount: 6,
    about: 'Amazon Web Services — the leading cloud platform powering businesses worldwide.',
    pitchHint: 'Ask about early-career SA roles and how product thinking helps in cloud architecture.',
    recruiters: ['Aditya Challa', 'Brian Eisenlauer', 'Aditya Vikram Parakala', 'Danny Kim', 'Madhu Nagaraj'],
    logoText: 'A',
    whyTarget: 'Multiple mentors and recruiters present. Strong fit for engineering and product roles.',
    talkingPoints: ['Ask about SA career path', 'Mention AI prototyping experience', 'Ask about early-career programs']
  },
  {
    id: 'toptal',
    name: 'Toptal',
    booth: 'B03',
    hiringSignal: 'AI services and solutions architecture hiring',
    priority: 'High',
    attendingCount: 3,
    about: 'Toptal connects businesses with top freelance talent in engineering, design, and AI.',
    pitchHint: 'Ask about end-to-end AI product building and the AI services team.',
    recruiters: ['Jeffrey Mills', 'Evan Elezaj'],
    logoText: 'T',
    whyTarget: 'AI services leadership present. Direct fit for AI product building skills.',
    talkingPoints: ['Ask about AI services team', 'Reference voice-first product work', 'Ask about freelance vs full-time paths']
  },
  {
    id: 'amazon',
    name: 'Amazon',
    booth: 'A02',
    hiringSignal: 'Solutions architecture and engineering roles',
    priority: 'High',
    attendingCount: 1,
    about: 'Amazon — building the future of e-commerce, cloud, and AI at massive scale.',
    pitchHint: 'Ask about the engineering to SA transition and what skills matter most.',
    recruiters: ['Arun Arunachalam'],
    logoText: 'Am',
    whyTarget: 'Senior SA mentor present. Great for career guidance on the engineering path.',
    talkingPoints: ['Ask about engineering to SA path', 'Mention system design interest', 'Ask about Amazon culture']
  },
  {
    id: 'ai-cloud',
    name: 'AI Cloud Innovation Center',
    booth: 'C05',
    hiringSignal: 'AI development and research collaboration',
    priority: 'Medium',
    attendingCount: 1,
    about: 'AI Cloud Innovation Center — building AI-powered solutions for real-world problems.',
    pitchHint: 'Ask about AI full-stack development and voice-first product opportunities.',
    recruiters: ['Harsh Tita'],
    logoText: 'AI',
    whyTarget: 'Collaboration opportunity for AI and voice-first product development.',
    talkingPoints: ['Ask about AI development stack', 'Mention Ghosty prototype', 'Explore collaboration']
  }
];

export const sampleEvent: EventItem = {
  id: 'kiro-spark-2026',
  title: 'Kiro Spark Challenge 2026',
  location: 'Arizona State University, Tempe',
  date: '04/24/2026',
  time: '9:00 AM - 9:00 PM',
  status: 'Live',
  homepageUrl: 'https://kirospark.dev',
  sponsorUrl: 'https://kirospark.dev/sponsors',
  companies: eventBattlePlan
};

export const sampleMeetingLogs: MeetingLog[] = [
  {
    id: 'log-aditya-1',
    source: 'voice',
    assignedContactId: 'contact-aditya-challa',
    summary:
      'Aditya discussed cloud architecture patterns, system design interview prep, and AWS best practices for early-career engineers.',
    keyPoints: ['Cloud architecture patterns', 'System design review offered', 'AWS best practices'],
    actionItems: ['Send system design write-up for review', 'Follow up on AWS SA career path'],
    createdAt: '2026-04-24T10:18:00.000Z'
  },
  {
    id: 'log-brian-1',
    source: 'voice',
    assignedContactId: 'contact-brian-eisenlauer',
    summary:
      'Brian described open SA team roles and the value of product-minded engineers in solutions architecture.',
    keyPoints: ['SA team hiring', 'Product-minded engineers valued', 'Early-career roles available'],
    actionItems: ['Send resume and relevant projects', 'Ask about application timeline'],
    createdAt: '2026-04-24T10:35:00.000Z'
  }
];
