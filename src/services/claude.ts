/**
 * Claude extraction & drafting service.
 *
 * When EXPO_PUBLIC_ANTHROPIC_API_KEY is set, real API calls are made.
 * Otherwise deterministic demo data is returned.
 *
 * Extraction follows .kiro/steering/extraction-prompt.md.
 */

import { ExtractedContactCard } from '../types';

// ---------------------------------------------------------------------------
// Demo fallbacks
// ---------------------------------------------------------------------------

const demoExtraction: ExtractedContactCard = {
  name: 'Priya Kumar',
  company: 'Stripe',
  role: 'Senior PM',
  followUpDate: '2026-05-15',
  intentTag: 'recruiting',
  contextSnippet:
    'Priya is hiring for a consumer growth role in San Francisco and offered a warm path to the data team hiring manager.',
  keyDetails: ['Follow up after May 15', 'Consumer growth in SF', 'Knows data team hiring manager'],
  uncertainFields: [],
  estimatedSeniority: 'senior'
};

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

export async function extractContactFromTranscript(
  transcript: string,
  userContext: { careerGoal: string; targetRoles: string[] }
): Promise<ExtractedContactCard> {
  const apiKey = getEnv('EXPO_PUBLIC_ANTHROPIC_API_KEY');

  if (!apiKey) {
    await wait(650);
    return pickDemoExtraction(transcript);
  }

  const today = new Date().toISOString().slice(0, 10);

  const systemPrompt = `You are the extraction engine for Ghosty, a conference networking app.
Your job: convert informal voice memo transcripts into structured contact cards.

TRANSCRIPT CHARACTERISTICS:
- Captured immediately after conversations in noisy conference environments.
- Speaker is narrating from memory, not reading from notes.
- Names may be partial (first name only, or phonetically spelled).
- Dates may be relative ("after the 15th", "next week", "end of month").
- Roles may be informal ("she does product for their growth team").

EXTRACTION RULES:
1. Extract what is stated. Do not infer what is not there.
2. For relative dates: today is ${today}. Convert to YYYY-MM-DD.
3. For phonetic names: preserve as heard, mark in uncertainFields.
4. Intent tag inference:
   - Hiring/role/opportunity language → "recruiting"
   - "advice", "pick your brain", "learn from" → "mentor"
   - "build together", "work on", "partner" → "collaborator"
   - "introduce you", "feature you", "write about" → "amplifier"
   - Default → "peer"
5. contextSnippet: ≤ 2 sentences, past tense, third-person.
6. keyDetails: 2–5 specific, memorable facts.
7. Do not hallucinate details not present in the transcript.
8. Mark ambiguous fields in uncertainFields.

User career goal: ${userContext.careerGoal}
Target roles: ${userContext.targetRoles.join(', ')}

OUTPUT: Return ONLY valid JSON. No preamble. No markdown fences.

SCHEMA:
{
  "name": "string",
  "company": "string | null",
  "role": "string | null",
  "followUpDate": "YYYY-MM-DD | null",
  "intentTag": "recruiting | mentor | collaborator | amplifier | peer",
  "contextSnippet": "string",
  "keyDetails": ["string"],
  "uncertainFields": ["string"],
  "estimatedSeniority": "junior | mid | senior | director | vp | c-suite | unknown"
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Extract contact information from this voice memo transcript:\n\n"${transcript}"`
        }
      ]
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Claude extraction failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as { content?: Array<{ text?: string }> };
  const raw = data.content?.[0]?.text ?? '{}';
  return JSON.parse(raw) as ExtractedContactCard;
}

// ---------------------------------------------------------------------------
// Follow-up drafting
// ---------------------------------------------------------------------------

export async function draftFollowUp(
  contactName: string,
  company: string,
  contextSnippet: string,
  keyDetails: string[]
) {
  const apiKey = getEnv('EXPO_PUBLIC_ANTHROPIC_API_KEY');

  if (!apiKey) {
    await wait(250);
    return buildDemoDrafts(contactName, company, contextSnippet, keyDetails);
  }

  const firstName = contactName.split(' ')[0] ?? contactName;
  const detailsList = keyDetails.join('; ');

  const systemPrompt = `You are a follow-up message drafter for Ghosty, a conference networking app.
Write warm, specific messages that reference the actual conversation. Never use filler phrases like "It was great meeting you" or "Hope this finds you well".

Rules:
- LinkedIn message: 3-4 sentences max.
- Email: 150-200 words.
- Cover letter: 200-250 words, professional but personal.
- Reference at least one specific detail from the conversation.

Return ONLY valid JSON with keys: linkedin, email, coverLetter. No markdown fences.`;

  const userPrompt = `Draft follow-up messages for ${contactName} at ${company}.
Context: ${contextSnippet}
Key details: ${detailsList}
My first name: Alex`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });

  if (!response.ok) {
    // Fall back to deterministic drafts on API failure
    return buildDemoDrafts(contactName, company, contextSnippet, keyDetails);
  }

  const data = (await response.json()) as { content?: Array<{ text?: string }> };
  try {
    const parsed = JSON.parse(data.content?.[0]?.text ?? '{}') as {
      linkedin?: string;
      email?: string;
      coverLetter?: string;
    };
    return {
      linkedin: parsed.linkedin ?? buildDemoDrafts(firstName, company, contextSnippet, keyDetails).linkedin,
      email: parsed.email ?? buildDemoDrafts(firstName, company, contextSnippet, keyDetails).email,
      coverLetter: parsed.coverLetter ?? buildDemoDrafts(firstName, company, contextSnippet, keyDetails).coverLetter
    };
  } catch {
    return buildDemoDrafts(contactName, company, contextSnippet, keyDetails);
  }
}

// ---------------------------------------------------------------------------
// Demo draft builder
// ---------------------------------------------------------------------------

function buildDemoDrafts(
  contactName: string,
  company: string,
  contextSnippet: string,
  keyDetails: string[]
) {
  const firstName = contactName.split(' ')[0] ?? contactName;
  const detail = keyDetails[1] ?? keyDetails[0] ?? 'the opportunity';

  return {
    linkedin: `Hi ${firstName} - I loved your point about ${detail} at ${company}. The way you described ${contextSnippet.toLowerCase()} maps closely to the product and growth problems I want to work on. I would love to reconnect after the timing you mentioned and share a little more about my background. Happy to send a concise profile or a few examples of relevant work if that would be helpful.`,
    email: `Hi ${firstName},\n\nThanks again for the conversation today. Your note about ${detail} at ${company} stuck with me, especially because it lines up with the kind of product work I am aiming for next.\n\nI would be grateful to stay in touch after the follow-up window you mentioned. I am happy to send a concise profile or a few examples of relevant work if helpful.\n\nBest,\nAlex`,
    coverLetter: `Dear ${company} team,\n\nI am excited about the opportunity we discussed because it sits directly at the intersection of product judgment, growth systems, and user empathy. In my conversation with ${contactName}, the detail that stood out was ${detail}, which is exactly the type of high-context problem I enjoy translating into product momentum.\n\nI would welcome the chance to contribute and continue the conversation.`
  };
}

// ---------------------------------------------------------------------------
// Demo extraction picker
// ---------------------------------------------------------------------------

function pickDemoExtraction(transcript: string): ExtractedContactCard {
  if (transcript.toLowerCase().includes('wei')) {
    return {
      name: 'Wei Chen',
      company: 'Google',
      role: 'VP Engineering',
      followUpDate: '2026-04-25',
      intentTag: 'recruiting',
      contextSnippet:
        'Wei is hiring senior infrastructure engineers and asked for a direct LinkedIn follow-up next week.',
      keyDetails: ['Senior infra roles', 'Values systems experience', 'Direct LinkedIn follow-up'],
      uncertainFields: [],
      estimatedSeniority: 'vp'
    };
  }
  return demoExtraction;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getEnv(key: string) {
  // Expo inlines EXPO_PUBLIC_* at build time via Metro bundler
  const vars: Record<string, string | undefined> = {
    EXPO_PUBLIC_ANTHROPIC_API_KEY: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
  };
  return vars[key];
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
