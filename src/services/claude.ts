import { ExtractedContactCard } from '../types';

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

export async function extractContactFromTranscript(
  transcript: string,
  userContext: { careerGoal: string; targetRoles: string[] }
): Promise<ExtractedContactCard> {
  const apiKey = getEnv('EXPO_PUBLIC_ANTHROPIC_API_KEY');

  if (!apiKey) {
    await wait(650);
    return transcript.toLowerCase().includes('wei')
      ? {
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
        }
      : demoExtraction;
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You are a contact extraction engine for Ghosty. Extract structured contact data from informal conference voice memo transcripts. User career goal: ${userContext.careerGoal}. Target roles: ${userContext.targetRoles.join(', ')}. Return only valid JSON matching the ContactCard schema.`,
      messages: [
        {
          role: 'user',
          content: `Extract contact information from this voice memo transcript:\n\n"${transcript}"`
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Claude extraction failed: ${response.status}`);
  }

  const data = (await response.json()) as { content?: Array<{ text?: string }> };
  return JSON.parse(data.content?.[0]?.text ?? '{}') as ExtractedContactCard;
}

export async function draftFollowUp(
  contactName: string,
  company: string,
  contextSnippet: string,
  keyDetails: string[]
) {
  await wait(250);
  const firstName = contactName.split(' ')[0] ?? contactName;

  return {
    linkedin: `Hi ${firstName} - I loved your point about ${keyDetails[1] ?? 'the team you are building'} at ${company}. The way you described ${contextSnippet.toLowerCase()} maps closely to the product and growth problems I want to work on. I would love to reconnect after the timing you mentioned and share a little more about my background.`,
    email: `Hi ${firstName},\n\nThanks again for the conversation today. Your note about ${keyDetails[1] ?? 'the opportunity'} at ${company} stuck with me, especially because it lines up with the kind of product work I am aiming for next.\n\nI would be grateful to stay in touch after the follow-up window you mentioned. I am happy to send a concise profile or a few examples of relevant work if helpful.\n\nBest,\nAlex`,
    coverLetter: `Dear ${company} team,\n\nI am excited about the opportunity we discussed because it sits directly at the intersection of product judgment, growth systems, and user empathy. In my conversation with ${contactName}, the detail that stood out was ${keyDetails[1] ?? 'the team focus'}, which is exactly the type of high-context problem I enjoy translating into product momentum.\n\nI would welcome the chance to contribute and continue the conversation.`
  };
}

function getEnv(key: string) {
  return (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.[key];
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
