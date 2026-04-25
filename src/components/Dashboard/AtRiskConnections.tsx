import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';

import { colors } from '../../theme/colors';
import { Contact } from '../../types';

interface AtRiskConnectionsProps {
  contacts: Contact[];
  onView: () => void;
}

export function AtRiskConnections({ contacts, onView }: AtRiskConnectionsProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <AlertTriangle size={18} color={colors.red} />
        <Text style={styles.title}>At Risk</Text>
      </View>
      <Text style={styles.body}>
        {contacts.length} high-value contacts need attention before the follow-up window cools off.
      </Text>
      <Pressable style={styles.button} onPress={onView}>
        <Text style={styles.buttonText}>View Queue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(244,63,94,0.32)',
    backgroundColor: colors.redSoft,
    padding: 16,
    gap: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  title: {
    color: colors.red,
    fontSize: 15,
    fontWeight: '900'
  },
  body: {
    color: colors.text,
    lineHeight: 20,
    fontSize: 13
  },
  button: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.red,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  buttonText: {
    color: colors.red,
    fontWeight: '900',
    fontSize: 12
  }
});
