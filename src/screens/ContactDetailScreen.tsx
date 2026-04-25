import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft, MessageSquareText } from 'lucide-react-native';

import { ValueScore } from '../components/ContactCard/ValueScore';
import { colors } from '../theme/colors';
import { Contact } from '../types';

interface ContactDetailScreenProps {
  contact: Contact;
  onBack: () => void;
  onDraft: (contact: Contact) => void;
}

export function ContactDetailScreen({ contact, onBack, onDraft }: ContactDetailScreenProps) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <Pressable onPress={onBack} style={styles.iconButton}>
          <ArrowLeft size={21} color={colors.text} />
        </Pressable>
        <View>
          <Text style={styles.title}>Connection Value</Text>
          <Text style={styles.subtitle}>
            {contact.name} · {contact.company}
          </Text>
        </View>
      </View>

      <View style={styles.gaugeWrap}>
        <View style={styles.gauge}>
          <Text style={styles.gaugeScore}>{contact.valueScore.toFixed(1)}</Text>
          <Text style={styles.gaugeLabel}>out of 10</Text>
        </View>
        <Text style={styles.priorityLabel}>High Priority Connection</Text>
      </View>

      <View style={styles.contextCard}>
        <Text style={styles.contextLabel}>Captured Context</Text>
        <Text style={styles.contextText}>{contact.contextSnippet}</Text>
        <View style={styles.details}>
          {contact.keyDetails.map((detail) => (
            <Text key={detail} style={styles.detailChip}>
              {detail}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.breakdownCard}>
        <ValueScore score={contact.valueScore} breakdown={contact.valueBreakdown} />
        <Text style={styles.infoNote}>Score decays 10% per week without follow-up.</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => onDraft(contact)}>
        <MessageSquareText size={18} color={colors.black} />
        <Text style={styles.primaryText}>Draft Follow-up Message</Text>
      </Pressable>
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
    paddingTop: 54,
    paddingBottom: 48,
    gap: 22
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
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 3
  },
  gaugeWrap: {
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12
  },
  gauge: {
    width: 188,
    height: 188,
    borderRadius: 999,
    borderWidth: 16,
    borderColor: colors.amber,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.amber,
    shadowOpacity: 0.28,
    shadowRadius: 28
  },
  gaugeScore: {
    color: colors.amber,
    fontSize: 46,
    fontWeight: '900'
  },
  gaugeLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800'
  },
  priorityLabel: {
    color: colors.amber,
    fontWeight: '900',
    fontSize: 16
  },
  contextCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 12
  },
  contextLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '900'
  },
  contextText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  detailChip: {
    color: colors.text,
    backgroundColor: colors.grayChip,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700'
  },
  breakdownCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 18
  },
  infoNote: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: '700'
  },
  primaryButton: {
    height: 54,
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
  }
});
