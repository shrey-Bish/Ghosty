import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { Contact, DraftMessages } from '../types';

// ---------------------------------------------------------------------------
// Env helpers
// ---------------------------------------------------------------------------

function getEnv(key: string): string | undefined {
  return (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.[key];
}

const supabaseUrl = getEnv('EXPO_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getEnv('EXPO_PUBLIC_SUPABASE_ANON_KEY');

// ---------------------------------------------------------------------------
// Client — null when env vars are missing (demo mode)
// ---------------------------------------------------------------------------

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (client) return client;
  if (supabaseUrl && supabaseAnonKey) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}

export function isSupabaseConfigured(): boolean {
  return getClient() !== null;
}

async function getAuthenticatedUserId(sb: SupabaseClient): Promise<string | null> {
  const { data, error } = await sb.auth.getUser();
  if (error || !data.user?.id) {
    return null;
  }
  return data.user.id;
}

// ---------------------------------------------------------------------------
// In-memory fallback for demo mode
// ---------------------------------------------------------------------------

const localContacts = new Map<string, Contact>();

// ---------------------------------------------------------------------------
// Contacts
// ---------------------------------------------------------------------------

export async function saveContact(contact: Contact): Promise<Contact> {
  const sb = getClient();

  if (!sb) {
    localContacts.set(contact.id, contact);
    await wait(120);
    return contact;
  }

  const userId = await getAuthenticatedUserId(sb);
  if (!userId) {
    console.warn('[supabase] No authenticated user; saving contact locally.');
    localContacts.set(contact.id, contact);
    return contact;
  }

  const { error } = await sb.from('contacts').upsert({
    id: contact.id,
    user_id: userId,
    name: contact.name,
    company: contact.company,
    role: contact.role,
    intent_tag: contact.intentTag,
    context_snippet: contact.contextSnippet,
    key_details: contact.keyDetails,
    follow_up_date: contact.followUpDate || null,
    value_score: contact.valueScore,
    value_breakdown: contact.valueBreakdown,
    estimated_career_value: contact.estimatedCareerValue,
    salary_band: contact.salaryBand,
    transcription: contact.transcription,
    created_at: contact.createdAt,
    followed_up_at: contact.followedUpAt ?? null
  });

  if (error) {
    console.warn('[supabase] saveContact failed, falling back to local:', error.message);
    localContacts.set(contact.id, contact);
  }

  return contact;
}

export async function listContacts(): Promise<Contact[]> {
  const sb = getClient();

  if (!sb) {
    await wait(80);
    return Array.from(localContacts.values());
  }

  const userId = await getAuthenticatedUserId(sb);
  if (!userId) {
    return Array.from(localContacts.values());
  }

  const { data, error } = await sb
    .from('contacts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.warn('[supabase] listContacts failed:', error?.message);
    return Array.from(localContacts.values());
  }

  return data.map(rowToContact);
}

export async function markContactFollowedUp(contactId: string): Promise<void> {
  const sb = getClient();
  const now = new Date().toISOString();

  if (!sb) {
    const local = localContacts.get(contactId);
    if (local) localContacts.set(contactId, { ...local, followedUpAt: now });
    return;
  }

  const userId = await getAuthenticatedUserId(sb);
  if (!userId) {
    const local = localContacts.get(contactId);
    if (local) localContacts.set(contactId, { ...local, followedUpAt: now });
    return;
  }

  await sb.from('contacts').update({ followed_up_at: now }).eq('id', contactId).eq('user_id', userId);
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export async function saveEvent(event: {
  id: string;
  name: string;
  date: string;
  location: string;
  totalCapitalValue?: number;
}): Promise<void> {
  const sb = getClient();
  if (!sb) return;

  const userId = await getAuthenticatedUserId(sb);
  if (!userId) return;

  await sb.from('events').upsert({
    id: event.id,
    user_id: userId,
    name: event.name,
    date: event.date,
    location: event.location,
    total_capital_value: event.totalCapitalValue ?? 0
  });
}

// ---------------------------------------------------------------------------
// Follow-up drafts
// ---------------------------------------------------------------------------

export async function saveDrafts(
  contactId: string,
  drafts: DraftMessages
): Promise<void> {
  const sb = getClient();
  if (!sb) return;

  const userId = await getAuthenticatedUserId(sb);
  if (!userId) return;

  const { data: contact } = await sb
    .from('contacts')
    .select('id')
    .eq('id', contactId)
    .eq('user_id', userId)
    .maybeSingle();

  if (!contact) return;

  const rows = [
    { contact_id: contactId, type: 'linkedin', content: drafts.linkedin },
    { contact_id: contactId, type: 'email', content: drafts.email },
    { contact_id: contactId, type: 'cover_letter', content: drafts.coverLetter }
  ];

  await sb.from('follow_up_drafts').upsert(rows);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowToContact(row: any): Contact {
  return {
    id: row.id,
    name: row.name ?? 'Unknown',
    initials: getInitials(row.name ?? 'Unknown'),
    company: row.company ?? '',
    role: row.role ?? '',
    intentTag: row.intent_tag ?? 'peer',
    contextSnippet: row.context_snippet ?? '',
    keyDetails: row.key_details ?? [],
    followUpDate: row.follow_up_date ?? '',
    dueLabel: getDueLabel(row.follow_up_date),
    urgency: getUrgency(row.follow_up_date),
    valueScore: Number(row.value_score ?? 0),
    valueBreakdown: row.value_breakdown ?? [],
    estimatedCareerValue: Number(row.estimated_career_value ?? 0),
    salaryBand: row.salary_band ?? { source: 'Demo salary band', low: 0, high: 0, role: '' },
    transcription: row.transcription ?? '',
    createdAt: row.created_at ?? new Date().toISOString(),
    followedUpAt: row.followed_up_at ?? undefined,
    draftMessages: { linkedin: '', email: '', coverLetter: '' }
  };
}

function getInitials(name: string) {
  const parts = name.split(' ').filter(Boolean);
  return `${parts[0]?.[0] ?? 'G'}${parts[1]?.[0] ?? ''}`.toUpperCase();
}

function getDueLabel(date: string | null) {
  if (!date) return 'Due today';
  const diffDays = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  return `Due in ${diffDays} days`;
}

function getUrgency(date: string | null): Contact['urgency'] {
  if (!date) return 'today';
  const diffDays = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'overdue';
  if (diffDays === 0) return 'today';
  if (diffDays <= 3) return 'soon';
  return 'later';
}
