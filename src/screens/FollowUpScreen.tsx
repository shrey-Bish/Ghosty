import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

import { DraftMessage } from '../components/FollowUp/DraftMessage';
import { PriorityQueue } from '../components/FollowUp/PriorityQueue';
import { colors } from '../theme/colors';
import { Contact } from '../types';

interface FollowUpScreenProps {
  contacts: Contact[];
  initialContact?: Contact | null;
  onSent: (contactId: string) => void;
}

export function FollowUpScreen({ contacts, initialContact = null, onSent }: FollowUpScreenProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(initialContact);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {selectedContact ? (
        <>
          <View style={styles.topBar}>
            <Pressable onPress={() => setSelectedContact(null)} style={styles.iconButton}>
              <ArrowLeft size={21} color={colors.text} />
            </Pressable>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>Draft Message</Text>
              <Text style={styles.subtitle}>
                {selectedContact.name} · {selectedContact.company}
              </Text>
            </View>
          </View>
          <DraftMessage contact={selectedContact} onSent={onSent} />
        </>
      ) : (
        <>
          <View style={styles.pageHeader}>
            <Text style={styles.title}>Follow Up</Text>
            <Text style={styles.subtitle}>Highest-value relationships first</Text>
          </View>
          <PriorityQueue contacts={contacts} onSelect={setSelectedContact} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 124,
    gap: 22
  },
  pageHeader: {
    gap: 5
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleBlock: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13
  }
});
