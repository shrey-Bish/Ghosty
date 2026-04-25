import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, intentColors } from '../../theme/colors';
import { IntentTag } from '../../types';

const labels: Array<{ value: IntentTag; label: string }> = [
  { value: 'recruiting', label: '#recruiting' },
  { value: 'mentor', label: '#mentor' },
  { value: 'collaborator', label: '#collab' },
  { value: 'amplifier', label: '#amplify' },
  { value: 'peer', label: '#peer' }
];

interface IntentTagPickerProps {
  value: IntentTag;
  onChange?: (value: IntentTag) => void;
}

export function IntentTagPicker({ value, onChange }: IntentTagPickerProps) {
  return (
    <View style={styles.wrap}>
      {labels.map((item) => {
        const selected = item.value === value;
        const color = intentColors[item.value];
        return (
          <Pressable
            key={item.value}
            accessibilityRole="button"
            onPress={() => onChange?.(item.value)}
            style={[
              styles.pill,
              selected && {
                borderColor: color,
                backgroundColor: `${color}24`
              }
            ]}
          >
            <Text style={[styles.label, selected && { color }]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.grayChip,
    borderWidth: 1,
    borderColor: colors.border
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800'
  }
});
