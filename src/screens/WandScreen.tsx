import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { WandSparkles } from 'lucide-react-native';

import { searchNetwork } from '../services/breadcrumb';
import { colors } from '../theme/colors';
import { Contact, MeetingLog, NetworkSearchResult } from '../types';

interface WandScreenProps {
  contacts: Contact[];
  meetingLogs: MeetingLog[];
  onOpenContact: (contact: Contact) => void;
}

export function WandScreen({ contacts, meetingLogs, onOpenContact }: WandScreenProps) {
  const [query, setQuery] = useState('Who can help me get a product growth interview?');
  const [submittedQuery, setSubmittedQuery] = useState(query);

  const results: NetworkSearchResult[] = useMemo(
    () => searchNetwork(submittedQuery, contacts, meetingLogs),
    [contacts, meetingLogs, submittedQuery]
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.wandIcon}>
          <WandSparkles size={24} color={colors.black} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Magic Wand</Text>
          <Text style={styles.subtitle}>Ask Breadcrumb who in your network can help.</Text>
        </View>
      </View>

      <View style={styles.searchCard}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          multiline
          style={styles.input}
          placeholder="Ask about intros, roles, companies, mentors..."
          placeholderTextColor={colors.textMuted}
          textAlignVertical="top"
        />
        <Pressable style={styles.primaryButton} onPress={() => setSubmittedQuery(query)}>
          <WandSparkles size={17} color={colors.black} />
          <Text style={styles.primaryText}>Find My Best Breadcrumbs</Text>
        </Pressable>
      </View>

      <View style={styles.resultsBlock}>
        <Text style={styles.sectionLabel}>Best Matches</Text>
        {results.map((result) => (
          <Pressable
            key={result.contact.id}
            style={styles.resultCard}
            onPress={() => onOpenContact(result.contact)}
          >
            <View style={styles.resultTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{result.contact.initials}</Text>
              </View>
              <View style={styles.resultIdentity}>
                <Text style={styles.name}>{result.contact.name}</Text>
                <Text style={styles.meta}>
                  {result.contact.role} · {result.contact.company}
                </Text>
              </View>
              <Text style={styles.score}>{result.contact.valueScore.toFixed(1)}</Text>
            </View>
            <Text style={styles.reason}>{result.reason}</Text>
            <Text style={styles.ask}>{result.suggestedAsk}</Text>
          </Pressable>
        ))}
      </View>
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
    gap: 18
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  wandIcon: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4
  },
  searchCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 14
  },
  input: {
    minHeight: 118,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    lineHeight: 22
  },
  primaryButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },
  primaryText: {
    color: colors.black,
    fontWeight: '900'
  },
  resultsBlock: {
    gap: 12
  },
  sectionLabel: {
    color: colors.amber,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  resultCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 12
  },
  resultTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.amberSoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: colors.amber,
    fontWeight: '900'
  },
  resultIdentity: {
    flex: 1,
    minWidth: 0
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900'
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 3
  },
  score: {
    color: colors.amber,
    fontSize: 19,
    fontWeight: '900'
  },
  reason: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20
  },
  ask: {
    color: colors.teal,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '800'
  }
});
