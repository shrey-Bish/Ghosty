import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { ScoreFactor } from '../../types';

interface ValueScoreProps {
  score: number;
  breakdown: ScoreFactor[];
  compact?: boolean;
}

export function ValueScore({ score, breakdown, compact = false }: ValueScoreProps) {
  return (
    <View style={[styles.wrap, compact && styles.compact]}>
      <View style={styles.header}>
        <Text style={styles.label}>Connection Value</Text>
        <Text style={styles.score}>{score.toFixed(1)} / 10</Text>
      </View>
      {!compact && (
        <View style={styles.breakdown}>
          {breakdown.map((factor) => {
            const percentage = `${Math.min(100, (factor.value / factor.max) * 100)}%` as `${number}%`;
            return (
              <View key={factor.label} style={styles.row}>
                <View style={styles.rowText}>
                  <Text style={styles.factor}>{factor.label}</Text>
                  <Text style={styles.detail}>{factor.detail}</Text>
                </View>
                <View style={styles.track}>
                  <View style={[styles.fill, { width: percentage }]} />
                </View>
                <Text style={styles.points}>
                  {factor.value.toFixed(1)}/{factor.max.toFixed(1)}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 18
  },
  compact: {
    gap: 8
  },
  header: {
    gap: 4
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  score: {
    color: colors.amber,
    fontSize: 30,
    fontWeight: '900'
  },
  breakdown: {
    gap: 16
  },
  row: {
    gap: 8
  },
  rowText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  factor: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700'
  },
  detail: {
    color: colors.textMuted,
    fontSize: 12,
    flexShrink: 1,
    textAlign: 'right'
  },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.grayChip,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.amber
  },
  points: {
    alignSelf: 'flex-end',
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700'
  }
});
