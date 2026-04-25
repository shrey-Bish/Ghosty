import { useCallback, useMemo, useState } from 'react';

import { currentEvent, sampleContacts, userContext } from '../data/sampleData';
import { draftFollowUp, extractContactFromTranscript } from '../services/claude';
import { createFollowUpReminder } from '../services/calendar';
import { calculateConnectionValue, rankFollowUps } from '../services/scoring';
import { saveContact } from '../services/supabase';
import { Contact, ExtractedContactCard } from '../types';

export function useContactQueue() {
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts);

  const rankedContacts = useMemo(() => rankFollowUps(contacts), [contacts]);

  const createContactFromTranscript = useCallback(async (transcript: string) => {
    const extracted = await extractContactFromTranscript(transcript, userContext);
    return createContactFromExtraction(extracted, transcript);
  }, []);

  const confirmContact = useCallback(async (contact: Contact) => {
    setContacts((existing) => [contact, ...existing.filter((item) => item.id !== contact.id)]);
    await saveContact(contact);

    if (contact.followUpDate) {
      await createFollowUpReminder(contact);
    }
  }, []);

  const markFollowedUp = useCallback((contactId: string) => {
    setContacts((existing) =>
      existing.map((contact) =>
        contact.id === contactId ? { ...contact, followedUpAt: new Date().toISOString() } : contact
      )
    );
  }, []);

  return {
    contacts,
    rankedContacts,
    currentEvent,
    createContactFromTranscript,
    confirmContact,
    markFollowedUp
  };
}

async function createContactFromExtraction(extracted: ExtractedContactCard, transcript: string) {
  const createdAt = new Date().toISOString();
  const scoring = calculateConnectionValue(extracted, userContext, createdAt);
  const name = extracted.name || 'Unknown contact';
  const company = extracted.company ?? 'Unknown company';
  const role = extracted.role ?? 'Unknown role';
  const keyDetails = extracted.keyDetails.length ? extracted.keyDetails : ['Captured from voice memo'];
  const drafts = await draftFollowUp(name, company, extracted.contextSnippet, keyDetails);

  return {
    id: `contact-${Date.now()}`,
    name,
    initials: getInitials(name),
    company,
    role,
    intentTag: extracted.intentTag,
    contextSnippet: extracted.contextSnippet,
    keyDetails,
    followUpDate: extracted.followUpDate ?? new Date().toISOString().slice(0, 10),
    dueLabel: getDueLabel(extracted.followUpDate),
    urgency: 'today' as const,
    valueScore: scoring.score,
    valueBreakdown: scoring.valueBreakdown,
    estimatedCareerValue: scoring.estimatedCareerValue,
    salaryBand: scoring.salaryBand,
    transcription: transcript,
    createdAt,
    draftMessages: drafts
  };
}

function getInitials(name: string) {
  const parts = name.split(' ').filter(Boolean);
  return `${parts[0]?.[0] ?? 'G'}${parts[1]?.[0] ?? ''}`.toUpperCase();
}

function getDueLabel(date: string | null) {
  if (!date) {
    return 'Due today';
  }

  const diffDays = Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) {
    return 'Due today';
  }
  if (diffDays === 1) {
    return 'Due tomorrow';
  }
  return `Due in ${diffDays} days`;
}
