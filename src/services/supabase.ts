import { Contact } from '../types';

const localContacts = new Map<string, Contact>();

export async function saveContact(contact: Contact) {
  localContacts.set(contact.id, contact);
  await new Promise((resolve) => setTimeout(resolve, 120));
  return contact;
}

export async function listContacts() {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return Array.from(localContacts.values());
}
