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
