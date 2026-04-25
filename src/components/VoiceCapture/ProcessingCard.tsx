import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';

export function ProcessingCard() {
  return (
    <View style={styles.wrap}>
      <View style={styles.orb}>
        <Text style={styles.ghost}>G</Text>
      </View>
      <Text style={styles.title}>Ghosty is thinking...</Text>
      <View style={styles.steps}>
        <Text style={[styles.step, styles.done]}>Transcribed</Text>
        <Text style={[styles.step, styles.active]}>Extracting</Text>
        <Text style={styles.step}>Scoring</Text>
      </View>
      <View style={styles.skeleton}>
        <View style={styles.lineLong} />
        <View style={styles.lineShort} />
        <View style={styles.lineMedium} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 16,
    alignItems: 'center',
    paddingHorizontal: 24
  },
  orb: {
    width: 86,
    height: 86,
    borderRadius: 999,
    backgroundColor: colors.amberSoft,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.amber,
    shadowOpacity: 0.35,
    shadowRadius: 24
  },
  ghost: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '900'
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700'
  },
  steps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10
  },
  step: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700'
  },
  done: {
    color: colors.teal
  },
  active: {
    color: colors.amber
  },
  skeleton: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 12,
    opacity: 0.82
  },
  lineLong: {
    height: 16,
    width: '82%',
    borderRadius: 999,
    backgroundColor: colors.grayChip
  },
  lineShort: {
    height: 16,
    width: '48%',
    borderRadius: 999,
    backgroundColor: colors.grayChip
  },
  lineMedium: {
    height: 16,
    width: '64%',
    borderRadius: 999,
    backgroundColor: colors.grayChip
  }
});
