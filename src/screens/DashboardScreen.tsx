import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Download } from 'lucide-react-native';

import { AtRiskConnections } from '../components/Dashboard/AtRiskConnections';
import { CapitalTimeline } from '../components/Dashboard/CapitalTimeline';
import { EventSummary } from '../components/Dashboard/EventSummary';
import { colors, intentColors } from '../theme/colors';
import { AppTab, Contact, IntentTag } from '../types';

interface DashboardScreenProps {
  contacts: Contact[];
  atRiskContacts: Contact[];
  onNavigate: (tab: AppTab) => void;
}

const intentLabels: Record<IntentTag, string> = {
  recruiting: 'Recruiting',
  mentor: 'Mentor',
  collaborator: 'Collab',
  amplifier: 'Amplify',
  peer: 'Peer'
};

export function DashboardScreen({ contacts, atRiskContacts, onNavigate }: DashboardScreenProps) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const intentCounts = useMemo(() => {
    return contacts.reduce<Record<IntentTag, number>>(
      (counts, contact) => ({ ...counts, [contact.intentTag]: counts[contact.intentTag] + 1 }),
      { recruiting: 0, mentor: 0, collaborator: 0, amplifier: 0, peer: 0 }
    );
  }, [contacts]);

  return (
    <View style={styles.root}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>April 2026</Text>
          </View>
          <Pressable style={styles.exportButton} onPress={() => setSummaryOpen(true)}>
            <Download size={16} color={colors.teal} />
            <Text style={styles.exportText}>Export</Text>
          </Pressable>
        </View>

        <CapitalTimeline contacts={contacts} />

        <View style={styles.intentBlock}>
          <Text style={styles.sectionTitle}>By Intent Tag</Text>
          <View style={styles.intentRow}>
            {(Object.keys(intentCounts) as IntentTag[]).map((intent) => (
              <View key={intent} style={[styles.intentPill, { borderColor: intentColors[intent] }]}>
                <Text style={[styles.intentText, { color: intentColors[intent] }]}>
                  {intentLabels[intent]} {intentCounts[intent]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <AtRiskConnections contacts={atRiskContacts} onView={() => onNavigate('followup')} />

        <Pressable style={styles.summaryButton} onPress={() => setSummaryOpen(true)}>
          <Text style={styles.summaryText}>Open Event Wrapped</Text>
        </Pressable>
      </ScrollView>
      {summaryOpen && <EventSummary contacts={contacts} onClose={() => setSummaryOpen(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  screen: {
    flex: 1
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 124,
    gap: 22
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 4
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 999,
    backgroundColor: colors.tealSoft,
    borderWidth: 1,
    borderColor: 'rgba(20,184,166,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  exportText: {
    color: colors.teal,
    fontWeight: '900',
    fontSize: 12
  },
  intentBlock: {
    gap: 12
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900'
  },
  intentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  intentPill: {
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: 11,
    paddingVertical: 8
  },
  intentText: {
    fontSize: 12,
    fontWeight: '900'
  },
  summaryButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.amberSoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  summaryText: {
    color: colors.amber,
    fontWeight: '900'
  }
});
