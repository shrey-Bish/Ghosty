import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Copy, Send } from 'lucide-react-native';

import { colors } from '../../theme/colors';
import { Contact, DraftType } from '../../types';

const tabs: Array<{ value: DraftType; label: string }> = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'email', label: 'Email' },
  { value: 'coverLetter', label: 'Cover Letter' }
];

interface DraftMessageProps {
  contact: Contact;
  onSent?: (contactId: string) => void;
}

export function DraftMessage({ contact, onSent }: DraftMessageProps) {
  const [activeTab, setActiveTab] = useState<DraftType>('linkedin');
  const [copied, setCopied] = useState(false);
  const [drafts, setDrafts] = useState(contact.draftMessages);
  const activeDraft = drafts[activeTab];

  const actionLabel = useMemo(
    () => (activeTab === 'linkedin' ? 'Send via LinkedIn' : activeTab === 'email' ? 'Send Email' : 'Save Draft'),
    [activeTab]
  );

  const updateDraft = (value: string) => {
    setDrafts((existing) => ({ ...existing, [activeTab]: value }));
  };

  const copyDraft = async () => {
    await Clipboard.setStringAsync(activeDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Pressable key={tab.value} onPress={() => setActiveTab(tab.value)} style={styles.tab}>
            <Text style={[styles.tabText, activeTab === tab.value && styles.activeTabText]}>
              {tab.label}
            </Text>
            {activeTab === tab.value && <View style={styles.activeLine} />}
          </Pressable>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.aiLabel}>AI Draft - tap to edit</Text>
        <TextInput
          value={activeDraft}
          onChangeText={updateDraft}
          multiline
          style={styles.input}
          placeholderTextColor={colors.textMuted}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.quickPill}>Make shorter</Text>
        <Text style={styles.quickPill}>More formal</Text>
        <Text style={styles.quickPill}>Add skill highlight</Text>
      </View>

      <View style={styles.bottomActions}>
        <Pressable style={styles.copyButton} onPress={copyDraft}>
          <Copy size={18} color={colors.text} />
          <Text style={styles.copyText}>{copied ? 'Copied' : 'Copy'}</Text>
        </Pressable>
        <Pressable style={styles.sendButton} onPress={() => onSent?.(contact.id)}>
          <Send size={18} color={colors.black} />
          <Text style={styles.sendText}>{actionLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 16
  },
  tabs: {
    flexDirection: 'row',
    gap: 18
  },
  tab: {
    gap: 7
  },
  tabText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800'
  },
  activeTabText: {
    color: colors.text
  },
  activeLine: {
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.amber
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 10
  },
  aiLabel: {
    color: colors.amber,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  input: {
    minHeight: 220,
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
    padding: 0
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  quickPill: {
    color: colors.text,
    backgroundColor: colors.grayChip,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700'
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12
  },
  copyButton: {
    width: 104,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.grayChip,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },
  copyText: {
    color: colors.text,
    fontWeight: '800'
  },
  sendButton: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },
  sendText: {
    color: colors.black,
    fontWeight: '900'
  }
});
