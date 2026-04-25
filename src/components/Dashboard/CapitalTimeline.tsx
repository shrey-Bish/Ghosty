import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { Contact } from '../../types';

interface CapitalTimelineProps {
  contacts: Contact[];
}

const bars = [28, 42, 36, 58, 52, 74, 88];
const labels = ['18', '19', '20', '21', '22', '23', '24'];

export function CapitalTimeline({ contacts }: CapitalTimelineProps) {
  const pipeline = contacts.reduce((sum, contact) => sum + contact.estimatedCareerValue, 0);

  return (
    <View style={styles.wrap}>
      <View style={styles.heroCard}>
        <Text style={styles.pipeline}>{formatMoney(pipeline)}</Text>
        <Text style={styles.label}>Estimated Career Pipeline Value</Text>
        <Text style={styles.delta}>+ {contacts.length} connections today</Text>
      </View>

      <View style={styles.chart}>
        <View style={styles.barRow}>
          {bars.map((height, index) => (
            <View key={labels[index]} style={styles.barColumn}>
              <View style={[styles.bar, { height }]} />
              <Text style={styles.axisLabel}>{labels[index]}</Text>
            </View>
          ))}
        </View>
      </View>
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
  wrap: {
    gap: 16
  },
  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 22,
    gap: 7
  },
  pipeline: {
    color: colors.amber,
    fontSize: 42,
    fontWeight: '900'
  },
  label: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700'
  },
  delta: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4
  },
  chart: {
    height: 176,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    justifyContent: 'flex-end'
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 9
  },
  bar: {
    width: '100%',
    maxWidth: 22,
    borderRadius: 999,
    backgroundColor: colors.amber
  },
  axisLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700'
  }
});
