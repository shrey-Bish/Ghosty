import { StyleSheet, View } from 'react-native';

import { colors } from '../../theme/colors';

interface WaveformAnimationProps {
  bars: number[];
  active: boolean;
  color?: string;
}

export function WaveformAnimation({ bars, active, color = colors.red }: WaveformAnimationProps) {
  return (
    <View style={styles.waveform} accessibilityLabel="Live audio waveform">
      {bars.map((height, index) => (
        <View
          key={`${height}-${index}`}
          style={[
            styles.bar,
            {
              height: active ? height : 22 + (index % 4) * 8,
              backgroundColor: color,
              opacity: active ? 0.95 : 0.35
            }
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  waveform: {
    width: '100%',
    maxWidth: 310,
    minHeight: 112,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'center'
  },
  bar: {
    width: 9,
    borderRadius: 999
  }
});
