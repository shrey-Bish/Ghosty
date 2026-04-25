import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Search, WandSparkles, X } from 'lucide-react-native';

import { searchNetwork } from '../services/ghosty';
import { colors } from '../theme/colors';
import { Contact, MeetingLog, NetworkSearchResult } from '../types';

type WandTab = 'job' | 'referral';

const referralPrompts = [
  'Who can introduce me to a hiring manager?',
  'Find mentors in product management',
  'Who has connections at top AI companies?',
  'Find warm intros to VCs or investors'
];

interface WandScreenProps {
  contacts: Contact[];
  meetingLogs: MeetingLog[];
  onOpenContact: (contact: Contact) => void;
}

export function WandScreen({ contacts, meetingLogs, onOpenContact }: WandScreenProps) {
  const [activeTab, setActiveTab] = useState<WandTab>('job');
  const [jobQuery, setJobQuery] = useState('');
  const [referralQuery, setReferralQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const query = activeTab === 'job' ? jobQuery : referralQuery;

  const results: NetworkSearchResult[] = useMemo(
    () => (submittedQuery ? searchNetwork(submittedQuery, contacts, meetingLogs) : []),
    [contacts, meetingLogs, submittedQuery]
  );

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;
    setSearching(true);
    // Small delay to show loading state
    await new Promise((r) => setTimeout(r, 400));
    setSubmittedQuery(q);
    setSearching(false);
  };

  const handlePromptTap = async (prompt: string) => {
    setReferralQuery(prompt);
    setSearching(true);
    await new Promise((r) => setTimeout(r, 400));
    setSubmittedQuery(prompt);
    setSearching(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.wandIcon}>
          <WandSparkles size={24} color={colors.black} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Magic Wand Assist</Text>
          <Text style={styles.subtitle}>Ask Ghosty who in your network can help.</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <Pressable
          style={[styles.tab, activeTab === 'job' && styles.tabActive]}
          onPress={() => { setActiveTab('job'); setSubmittedQuery(null); }}
        >
          <Text style={[styles.tabText, activeTab === 'job' && styles.tabTextActive]}>
            Job Search
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'referral' && styles.tabActive]}
          onPress={() => { setActiveTab('referral'); setSubmittedQuery(null); }}
        >
          <Text style={[styles.tabText, activeTab === 'referral' && styles.tabTextActive]}>
            Referral Assist
          </Text>
        </Pressable>
      </View>

      {/* Job Search Tab */}
      {activeTab === 'job' && (
        <View style={styles.searchCard}>
          <View style={styles.iconCenter}>
            <WandSparkles size={28} color={colors.amber} />
          </View>
          <Text style={styles.cardTitle}>Find contacts by job title</Text>
          <Text style={styles.cardSubtitle}>
            Search for specific roles or companies in your network
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              value={jobQuery}
              onChangeText={setJobQuery}
              style={styles.searchInput}
              placeholder="e.g. Software Engineer, Amazon..."
              placeholderTextColor={colors.textMuted}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <Pressable style={styles.searchButton} onPress={handleSearch}>
              {searching ? (
                <ActivityIndicator size="small" color={colors.black} />
              ) : (
                <Search size={18} color={colors.black} />
              )}
            </Pressable>
          </View>
        </View>
      )}

      {/* Referral Assist Tab */}
      {activeTab === 'referral' && (
        <View style={styles.searchCard}>
          <View style={styles.iconCenter}>
            <WandSparkles size={28} color={colors.amber} />
          </View>
          <Text style={styles.cardTitle}>Referral assistant</Text>
          <Text style={styles.cardSubtitle}>
            Find warm intros and referral paths in your network
          </Text>
          <View style={styles.promptList}>
            {referralPrompts.map((prompt) => (
              <Pressable
                key={prompt}
                style={[
                  styles.promptPill,
                  submittedQuery === prompt && styles.promptPillActive
                ]}
                onPress={() => handlePromptTap(prompt)}
              >
                <Text
                  style={[
                    styles.promptText,
                    submittedQuery === prompt && styles.promptTextActive
                  ]}
                >
                  {prompt}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.inputRow}>
            <TextInput
              value={referralQuery}
              onChangeText={setReferralQuery}
              style={styles.searchInput}
              placeholder="Or type your own question..."
              placeholderTextColor={colors.textMuted}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <Pressable style={styles.searchButton} onPress={handleSearch}>
              {searching ? (
                <ActivityIndicator size="small" color={colors.black} />
              ) : (
                <Search size={18} color={colors.black} />
              )}
            </Pressable>
          </View>
        </View>
      )}

      {/* Loading */}
      {searching && (
        <View style={styles.loadingBlock}>
          <ActivityIndicator size="small" color={colors.amber} />
          <Text style={styles.loadingText}>Searching your network...</Text>
        </View>
      )}

      {/* Results */}
      {!searching && submittedQuery && results.length > 0 && (
        <View style={styles.resultsBlock}>
          <Text style={styles.sectionLabel}>Best Matches</Text>
          {results.map((result) => (
            <Pressable
              key={result.contact.id}
              style={styles.resultCard}
              onPress={() => onOpenContact(result.contact)}
            >
              <View style={styles.resultTop}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{result.contact.initials}</Text>
                </View>
                <View style={styles.resultIdentity}>
                  <Text style={styles.name}>{result.contact.name}</Text>
                  <Text style={styles.meta}>
                    {result.contact.role} · {result.contact.company}
                  </Text>
                </View>
                <Text style={styles.score}>{result.contact.valueScore.toFixed(1)}</Text>
              </View>
              <Text style={styles.reason}>{result.reason}</Text>
              <Text style={styles.ask}>{result.suggestedAsk}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* No results */}
      {!searching && submittedQuery && results.length === 0 && (
        <View style={styles.emptyBlock}>
          <Text style={styles.emptyText}>No matches found. Try a different query.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 124,
    gap: 18
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  wandIcon: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4
  },

  /* Tabs */
  tabRow: {
    flexDirection: 'row',
    gap: 0,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden'
  },
  tab: {
    flex: 1,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabActive: {
    backgroundColor: colors.amberSoft,
    borderBottomWidth: 2,
    borderBottomColor: colors.amber
  },
  tabText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '800'
  },
  tabTextActive: {
    color: colors.amber
  },

  /* Search card */
  searchCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    gap: 14,
    alignItems: 'center'
  },
  iconCenter: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: colors.amberSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center'
  },
  cardSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%'
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    color: colors.text,
    paddingHorizontal: 14,
    fontSize: 14
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center'
  },

  /* Referral prompts */
  promptList: {
    width: '100%',
    gap: 8
  },
  promptPill: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  promptPillActive: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.amberSoft
  },
  promptText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700'
  },
  promptTextActive: {
    color: colors.amber
  },

  /* Loading */
  loadingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700'
  },

  /* Results */
  resultsBlock: {
    gap: 12
  },
  sectionLabel: {
    color: colors.amber,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  resultCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 12
  },
  resultTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.amberSoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: colors.amber,
    fontWeight: '900'
  },
  resultIdentity: {
    flex: 1,
    minWidth: 0
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900'
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 3
  },
  score: {
    color: colors.amber,
    fontSize: 19,
    fontWeight: '900'
  },
  reason: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20
  },
  ask: {
    color: colors.teal,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '800'
  },

  /* Empty */
  emptyBlock: {
    paddingVertical: 24,
    alignItems: 'center'
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700'
  }
});
