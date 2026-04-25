import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Check, RotateCcw } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { IntentTagPicker } from './IntentTagPicker';
import { ValueScore } from './ValueScore';
import { colors, intentColors } from '../../theme/colors';
import { Contact } from '../../types';

interface SwipeCardProps {
  contact: Contact;
  onConfirm: (contact: Contact) => void;
  onRerecord: () => void;
  onOpenScore?: (contact: Contact) => void;
}

export function SwipeCard({ contact, onConfirm, onRerecord, onOpenScore }: SwipeCardProps) {
  const tagColor = intentColors[contact.intentTag];

  const handleConfirm = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
    onConfirm(contact);
  };

  const handleRerecord = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    onRerecord();
  };

  return (
    <View style={styles.card}>
      <View style={styles.identityRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{contact.initials}</Text>
        </View>
        <View style={styles.identityText}>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.subtitle}>
            {contact.role} · {contact.company}
          </Text>
        </View>
      </View>

      <View style={[styles.intentBadge, { borderColor: tagColor, backgroundColor: `${tagColor}20` }]}>
        <Text style={[styles.intentText, { color: tagColor }]}>#{contact.intentTag}</Text>
      </View>

      <Pressable onPress={() => onOpenScore?.(contact)} style={styles.scoreBlock}>
        <ValueScore score={contact.valueScore} breakdown={contact.valueBreakdown} compact />
        <Text style={styles.salary}>
          {formatMoney(contact.salaryBand.low)}-{formatMoney(contact.salaryBand.high)} median band ·{' '}
          {contact.salaryBand.source}
        </Text>
      </Pressable>

      <View style={styles.chips}>
        {contact.keyDetails.map((detail) => (
          <Text key={detail} style={styles.chip}>
            {detail}
          </Text>
        ))}
      </View>

      <IntentTagPicker value={contact.intentTag} />

      <View style={styles.actions}>
        <Pressable style={[styles.actionButton, styles.secondary]} onPress={handleRerecord}>
          <RotateCcw size={17} color={colors.textMuted} />
          <Text style={styles.secondaryText}>Re-record</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.primary]} onPress={handleConfirm}>
          <Check size={18} color={colors.black} strokeWidth={3} />
          <Text style={styles.primaryText}>Confirm</Text>
        </Pressable>
      </View>
      <Text style={styles.swipeHint}>Swipe right to confirm · swipe left to re-record</Text>
    </View>
  );
}

function formatMoney(value: number) {
  return `$${Math.round(value / 1000)}K`;
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    padding: 20,
    gap: 18,
    shadowColor: colors.amber,
    shadowOpacity: 0.25,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 }
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.amberSoft,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: colors.amber,
    fontSize: 19,
    fontWeight: '900'
  },
  identityText: {
    flex: 1,
    minWidth: 0
  },
  name: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 3
  },
  intentBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7
  },
  intentText: {
    fontSize: 12,
    fontWeight: '900'
  },
  scoreBlock: {
    paddingVertical: 4,
    gap: 8
  },
  salary: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  chip: {
    color: colors.text,
    backgroundColor: colors.grayChip,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 12,
    overflow: 'hidden'
  },
  actions: {
    flexDirection: 'row',
    gap: 12
  },
  actionButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.grayChip
  },
  primary: {
    backgroundColor: colors.amber
  },
  secondaryText: {
    color: colors.textMuted,
    fontWeight: '800'
  },
  primaryText: {
    color: colors.black,
    fontWeight: '900'
  },
  swipeHint: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 12
  }
});
