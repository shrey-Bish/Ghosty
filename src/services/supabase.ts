/**
 * Supabase persistence adapter.
 *
 * For the demo, all data is stored in-memory. The Supabase schema in
 * supabase/migrations/001_initial_schema.sql is ready for real persistence
 * with row-level security when EXPO_PUBLIC_SUPABASE_URL and
 * EXPO_PUBLIC_SUPABASE_ANON_KEY are configured.
 */

import { Contact, DraftMessages } from '../types';

const localContacts = new Map<string, Contact>();

export async function saveContact(contact: Contact): Promise<Contact> {
  localContacts.set(contact.id, contact);
  await wait(120);
  return contact;
}

export async function listContacts(): Promise<Contact[]> {
  await wait(80);
  return Array.from(localContacts.values());
}

export async function markContactFollowedUp(contactId: string): Promise<void> {
  const local = localContacts.get(contactId);
  if (local) {
    localContacts.set(contactId, { ...local, followedUpAt: new Date().toISOString() });
  }
}

export async function saveEvent(_event: {
  id: string;
  name: string;
  date: string;
  location: string;
  totalCapitalValue?: number;
}): Promise<void> {
  // No-op in demo mode — Supabase schema is ready for real persistence
  await wait(50);
}

export async function saveDrafts(
  _contactId: string,
  _drafts: DraftMessages
): Promise<void> {
  // No-op in demo mode — follow_up_drafts table is ready in the schema
  await wait(50);
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
