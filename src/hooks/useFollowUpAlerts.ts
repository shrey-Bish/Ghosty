import { useMemo } from 'react';

import { Contact } from '../types';

export function useFollowUpAlerts(contacts: Contact[]) {
  return useMemo(
    () =>
      contacts.filter(
        (contact) =>
          !contact.followedUpAt &&
          contact.valueScore >= 7 &&
          (contact.urgency === 'today' || contact.urgency === 'overdue')
      ),
    [contacts]
  );
}
