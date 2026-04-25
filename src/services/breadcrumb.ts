import { eventBattlePlan, sampleMeetingLogs } from '../data/sampleData';
import { Contact, EventCompany, MeetingLog, NetworkSearchResult, UserProfile } from '../types';

export async function analyzeEventUrl(eventUrl: string, profile: UserProfile): Promise<EventCompany[]> {
  await wait(450);

  const normalizedUrl = eventUrl.toLowerCase();
  const skillBoost = profile.topSkills.join(' ').toLowerCase();

  return eventBattlePlan.map((company) => {
    const relevant =
      normalizedUrl.includes(company.name.toLowerCase()) ||
      company.talkingPoints.some((point) => skillBoost.includes(point.split(' ')[0]?.toLowerCase() ?? ''));

    return {
      ...company,
      priority: relevant || company.priority === 'High' ? company.priority : 'Medium',
      whyTarget: `${company.whyTarget} Breadcrumb matched this against ${profile.topSkills.slice(0, 3).join(', ')}.`
    };
  });
}

export async function analyzeMeetingTranscript(
  transcript: string,
  assignedContactId: string
): Promise<MeetingLog> {
  await wait(300);
  const sentences = transcript
    .split(/[.!?]\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const actionItems = sentences
    .filter((sentence) => /follow|send|connect|intro|schedule|email|share/i.test(sentence))
    .slice(0, 3);

  return {
    id: `log-${Date.now()}`,
    source: transcript.toLowerCase().includes('zoom') ? 'zoom' : 'manual',
    assignedContactId,
    summary:
      sentences[0] ??
      'Breadcrumb captured the conversation and attached it to this relationship history.',
    keyPoints: sentences.slice(0, 4),
    actionItems: actionItems.length ? actionItems : ['Send a personalized follow-up while context is fresh'],
    createdAt: new Date().toISOString()
  };
}

export function searchNetwork(
  query: string,
  contacts: Contact[],
  logs: MeetingLog[] = sampleMeetingLogs
): NetworkSearchResult[] {
  const tokens = query.toLowerCase().split(/\W+/).filter((token) => token.length > 2);

  return contacts
    .map((contact) => {
      const contactLogs = logs.filter((log) => log.assignedContactId === contact.id);
      const haystack = [
        contact.name,
        contact.company,
        contact.role,
        contact.intentTag,
        contact.contextSnippet,
        contact.keyDetails.join(' '),
        contactLogs.map((log) => `${log.summary} ${log.keyPoints.join(' ')} ${log.actionItems.join(' ')}`).join(' ')
      ]
        .join(' ')
        .toLowerCase();

      const score = tokens.reduce((sum, token) => sum + (haystack.includes(token) ? 1 : 0), 0);
      const opportunityBoost = contact.intentTag === 'recruiting' ? 1 : 0;

      return {
        contact,
        score: score + opportunityBoost + contact.valueScore / 10,
        reason: buildReason(contact, tokens, contactLogs),
        suggestedAsk: buildSuggestedAsk(contact, query)
      };
    })
    .filter((result) => result.score > 0.8)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ contact, reason, suggestedAsk }) => ({ contact, reason, suggestedAsk }));
}

function buildReason(contact: Contact, tokens: string[], logs: MeetingLog[]) {
  const matchedToken = tokens.find((token) =>
    `${contact.company} ${contact.role} ${contact.contextSnippet}`.toLowerCase().includes(token)
  );

  if (matchedToken) {
    return `${contact.name} matches "${matchedToken}" through ${contact.role} at ${contact.company}.`;
  }

  if (logs.length > 0) {
    return `${contact.name} has meeting history with ${logs[0]?.actionItems[0] ?? 'a clear follow-up path'}.`;
  }

  return `${contact.name} is a high-value ${contact.intentTag} contact with relevant context.`;
}

function buildSuggestedAsk(contact: Contact, query: string) {
  if (contact.intentTag === 'recruiting') {
    return `Ask ${contact.name.split(' ')[0]} for the best next step related to: ${query}`;
  }
  return `Ask ${contact.name.split(' ')[0]} whether they can point you to the right person for: ${query}`;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
