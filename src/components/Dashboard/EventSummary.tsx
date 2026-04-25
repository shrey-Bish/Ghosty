import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { Contact } from '../../types';

interface EventSummaryProps {
  contacts: Contact[];
  onClose: () => void;
}

export function EventSummary({ contacts, onClose }: EventSummaryProps) {
  const topContacts = [...contacts].sort((a, b) => b.valueScore - a.valueScore).slice(0, 3);
  const value = contacts.reduce((sum, contact) => sum + contact.estimatedCareerValue, 0);

  return (
    <View style={styles.overlay}>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Event Wrapped</Text>
        <Text style={styles.subtitle}>ASU Kiro Spark Challenge · Apr 24</Text>

        <View style={styles.statsRow}>
          <Stat label="Contacts" value={String(contacts.length + 8)} tone={colors.teal} />
          <Stat label="Value" value={formatMoney(value)} tone={colors.amber} />
          <Stat label="High Priority" value="73%" tone={colors.amber} />
        </View>

        <Text style={styles.sectionLabel}>Top Connections</Text>
        <View style={styles.topList}>
          {topContacts.map((contact, index) => (
            <View key={contact.id} style={styles.topRow}>
              <Text style={styles.rank}>{index + 1}</Text>
              <Text style={styles.initials}>{contact.initials}</Text>
              <View style={styles.topBody}>
                <Text style={styles.name}>{contact.name}</Text>
                <Text style={styles.company}>{contact.company}</Text>
              </View>
              <Text style={styles.score}>{contact.valueScore.toFixed(1)}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={onClose}>
          <Text style={styles.primaryText}>Send All Follow-ups Now</Text>
        </Pressable>
        <Pressable onPress={onClose}>
          <Text style={styles.reviewLink}>Review individually</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: tone }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function formatMoney(value: number) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${Math.round(value / 1000)}K`;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,7,10,0.72)',
    justifyContent: 'flex-end',
    zIndex: 20
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
    gap: 16
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.grayChip,
    alignSelf: 'center',
    marginBottom: 2
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center'
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10
  },
  stat: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    padding: 12,
    alignItems: 'center',
    gap: 4
  },
  statValue: {
    fontWeight: '900',
    fontSize: 18
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center'
  },
  sectionLabel: {
    color: colors.amber,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  topList: {
    gap: 10
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  rank: {
    color: colors.textMuted,
    width: 18,
    fontWeight: '900'
  },
  initials: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: colors.amberSoft,
    color: colors.amber,
    textAlign: 'center',
    lineHeight: 34,
    fontWeight: '900',
    overflow: 'hidden'
  },
  topBody: {
    flex: 1
  },
  name: {
    color: colors.text,
    fontWeight: '900'
  },
  company: {
    color: colors.textMuted,
    fontSize: 12
  },
  score: {
    color: colors.amber,
    fontWeight: '900'
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryText: {
    color: colors.black,
    fontWeight: '900'
  },
  reviewLink: {
    color: colors.textMuted,
    textAlign: 'center',
    fontWeight: '800'
  }
});
