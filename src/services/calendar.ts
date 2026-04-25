/**
 * Calendar reminder adapter.
 *
 * For the demo, this returns a mock calendar event payload.
 * In production, this would integrate with Google Calendar MCP
 * to create real follow-up reminders.
 */

import { Contact } from '../types';

export async function createFollowUpReminder(contact: Contact) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    id: `calendar-${contact.id}`,
    title: `Follow up with ${contact.name} from ${contact.company}`,
    date: contact.followUpDate,
    notes: contact.draftMessages.linkedin,
    reminderMinutes: 1440
  };
}
