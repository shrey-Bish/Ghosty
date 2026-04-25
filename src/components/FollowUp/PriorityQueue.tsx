import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, SlidersHorizontal } from 'lucide-react-native';

import { colors, intentColors } from '../../theme/colors';
import { Contact } from '../../types';

interface PriorityQueueProps {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
}

export function PriorityQueue({ contacts, onSelect }: PriorityQueueProps) {
  const highPriority = contacts.filter((contact) => contact.valueScore >= 7);
  const mediumPriority = contacts.filter((contact) => contact.valueScore < 7);

  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <View style={styles.tabs}>
          <View style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Today {highPriority.length}</Text>
          </View>
          <View style={styles.tab}>
            <Text style={styles.tabText}>This Week {contacts.length + 5}</Text>
          </View>
        </View>
        <SlidersHorizontal size={20} color={colors.textMuted} />
      </View>

      <Text style={styles.sectionLabel}>High Priority</Text>
      <View style={styles.list}>
        {highPriority.map((contact) => (
          <QueueRow key={contact.id} contact={contact} onSelect={onSelect} />
        ))}
      </View>

      {mediumPriority.length > 0 && (
        <>
          <Text style={[styles.sectionLabel, styles.mutedSection]}>Medium Priority</Text>
          <View style={styles.list}>
            {mediumPriority.map((contact) => (
              <QueueRow key={contact.id} contact={contact} onSelect={onSelect} />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

function QueueRow({ contact, onSelect }: { contact: Contact; onSelect: (contact: Contact) => void }) {
  const urgencyColor =
    contact.urgency === 'today' || contact.urgency === 'overdue'
      ? colors.red
      : contact.urgency === 'soon'
        ? colors.amber
        : colors.teal;

  return (
    <Pressable style={styles.row} onPress={() => onSelect(contact)}>
      <View style={[styles.avatar, { borderColor: intentColors[contact.intentTag] }]}>
        <Text style={styles.avatarText}>{contact.initials}</Text>
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.subtitle}>
          {contact.role} · {contact.company}
        </Text>
        <View style={[styles.dueChip, { backgroundColor: `${urgencyColor}20` }]}>
          <Text style={[styles.dueText, { color: urgencyColor }]}>{contact.dueLabel}</Text>
        </View>
      </View>
      <Text style={styles.score}>{contact.valueScore.toFixed(1)}</Text>
      <ChevronRight size={19} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 18
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14
  },
  tabs: {
    flexDirection: 'row',
    gap: 10,
    flex: 1
  },
  tab: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.grayChip
  },
  activeTab: {
    backgroundColor: colors.amberSoft,
    borderColor: colors.borderStrong
  },
  tabText: {
    color: colors.textMuted,
    fontWeight: '800',
    fontSize: 13
  },
  activeTabText: {
    color: colors.amber,
    fontWeight: '900',
    fontSize: 13
  },
  sectionLabel: {
    color: colors.amber,
    fontSize: 11,
    letterSpacing: 0,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  mutedSection: {
    color: colors.textMuted,
    marginTop: 4
  },
  list: {
    gap: 12
  },
  row: {
    minHeight: 94,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: colors.grayChip,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: colors.amber,
    fontSize: 15,
    fontWeight: '900'
  },
  rowBody: {
    flex: 1,
    minWidth: 0,
    gap: 5
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12
  },
  dueChip: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5
  },
  dueText: {
    fontSize: 11,
    fontWeight: '900'
  },
  score: {
    color: colors.amber,
    fontSize: 20,
    fontWeight: '900'
  }
});
