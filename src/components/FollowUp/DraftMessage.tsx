import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Copy, Send } from 'lucide-react-native';

import { colors } from '../../theme/colors';
import { Contact, DraftType } from '../../types';

const tabs: Array<{ value: DraftType; label: string }> = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'email', label: 'Email' },
  { value: 'coverLetter', label: 'Cover Letter' }
];

type QuickAction = 'shorter' | 'formal' | 'skill';

const quickActions: Array<{ key: QuickAction; label: string; prompt: string }> = [
  {
    key: 'shorter',
    label: 'Make shorter',
    prompt: 'Rewrite this message to be significantly shorter and more concise. Keep the same tone and the specific conversation references. Cut filler. Aim for 2-3 sentences max for LinkedIn, 3-4 for email, or half the length for cover letters.'
  },
  {
    key: 'formal',
    label: 'More formal',
    prompt: 'Rewrite this message in a more formal, professional tone. Keep the specific conversation references but use polished business language. Do not add filler phrases like "Hope this finds you well".'
  },
  {
    key: 'skill',
    label: 'Add skill highlight',
    prompt: 'Rewrite this message to naturally weave in a brief mention of a relevant technical or product skill (e.g. analytics, prototyping, growth experimentation, SQL, React Native). Keep the conversation references and do not make it sound like a resume dump.'
  }
];

interface DraftMessageProps {
  contact: Contact;
  onSent?: (contactId: string) => void;
}

export function DraftMessage({ contact, onSent }: DraftMessageProps) {
  const [activeTab, setActiveTab] = useState<DraftType>('linkedin');
  const [copied, setCopied] = useState(false);
  const [drafts, setDrafts] = useState(contact.draftMessages);
  const [loading, setLoading] = useState<QuickAction | null>(null);
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

  const applyQuickAction = async (action: (typeof quickActions)[number]) => {
    if (loading) return;
    setLoading(action.key);

    try {
      const rewritten = await rewriteDraft(activeDraft, action.prompt, contact.name, contact.company);
      setDrafts((existing) => ({ ...existing, [activeTab]: rewritten }));
    } catch {
      // Silently keep the current draft on failure
    } finally {
      setLoading(null);
    }
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
        {quickActions.map((action) => (
          <Pressable
            key={action.key}
            style={[styles.quickPill, loading === action.key && styles.quickPillActive]}
            onPress={() => applyQuickAction(action)}
            disabled={loading !== null}
          >
            {loading === action.key ? (
              <ActivityIndicator size="small" color={colors.amber} />
            ) : (
              <Text style={[styles.quickPillText, loading !== null && styles.quickPillDisabled]}>
                {action.label}
              </Text>
            )}
          </Pressable>
        ))}
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

// ---------------------------------------------------------------------------
// AI rewrite helper
// ---------------------------------------------------------------------------

function getEnv(key: string) {
  // Expo inlines EXPO_PUBLIC_* at build time via Metro bundler
  const vars: Record<string, string | undefined> = {
    EXPO_PUBLIC_ANTHROPIC_API_KEY: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
  };
  return vars[key];
}

async function rewriteDraft(
  currentDraft: string,
  instruction: string,
  contactName: string,
  company: string
): Promise<string> {
  const apiKey = getEnv('EXPO_PUBLIC_ANTHROPIC_API_KEY');

  if (!apiKey) {
    // Demo fallback: apply a simple local transformation
    return applyDemoRewrite(currentDraft, instruction);
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: `You rewrite follow-up messages for Ghosty, a conference networking app. The message is to ${contactName} at ${company}. Return ONLY the rewritten message text. No preamble, no quotes, no explanation.`,
      messages: [
        {
          role: 'user',
          content: `${instruction}\n\nCurrent message:\n${currentDraft}`
        }
      ]
    })
  });

  if (!response.ok) {
    return applyDemoRewrite(currentDraft, instruction);
  }

  const data = (await response.json()) as { content?: Array<{ text?: string }> };
  const text = data.content?.[0]?.text?.trim();
  return text || currentDraft;
}

function applyDemoRewrite(draft: string, instruction: string): string {
  if (instruction.includes('shorter')) {
    // Aggressively shorten: take the core message only
    const sentences = draft.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length <= 2) {
      // Already short — trim to one punchy sentence
      const first = sentences[0] ?? draft;
      const trimmed = first.replace(/,\s*(especially|because|which|and)[^.]*/, '');
      return trimmed.endsWith('.') ? trimmed : `${trimmed}.`;
    }
    return sentences.slice(0, 2).join(' ');
  }

  if (instruction.includes('formal')) {
    return draft
      .replace(/Hi /g, 'Dear ')
      .replace(/I loved/g, 'I was impressed by')
      .replace(/I would love to/g, 'I would welcome the opportunity to')
      .replace(/stuck with me/g, 'resonated strongly')
      .replace(/I am happy to/g, 'I would be pleased to')
      .replace(/I kept thinking/g, 'I have been reflecting on')
      .replace(/I would enjoy/g, 'I would be delighted to');
  }

  if (instruction.includes('skill')) {
    const skillLine = '\n\nIn my recent work, I built analytics dashboards and AI workflow prototypes that directly relate to the challenges we discussed.';
    return draft.trimEnd() + skillLine;
  }

  return draft;
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
    minHeight: 34,
    backgroundColor: colors.grayChip,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quickPillActive: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.amberSoft
  },
  quickPillText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700'
  },
  quickPillDisabled: {
    opacity: 0.4
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
