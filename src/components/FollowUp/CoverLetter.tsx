import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { Contact } from '../../types';

export function CoverLetter({ contact }: { contact: Contact }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Cover Letter Draft</Text>
      <Text style={styles.content}>{contact.draftMessages.coverLetter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 10
  },
  label: {
    color: colors.amber,
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase'
  },
  content: {
    color: colors.text,
    lineHeight: 22,
    fontSize: 14
  }
});
