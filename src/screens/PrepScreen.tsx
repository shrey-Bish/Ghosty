import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link, Sparkles, Upload } from 'lucide-react-native';

import { ghostyProfile } from '../data/sampleData';
import { analyzeEventUrl, analyzeMeetingTranscript } from '../services/ghosty';
import { colors } from '../theme/colors';
import { Contact, EventCompany, MeetingLog, UserProfile } from '../types';

interface PrepScreenProps {
  contacts: Contact[];
  onLogCreated: (log: MeetingLog) => void;
}

export function PrepScreen({ contacts, onLogCreated }: PrepScreenProps) {
  const [profile] = useState<UserProfile>(ghostyProfile);
  const [eventUrl, setEventUrl] = useState('https://asu.example/events/kiro-spark-challenge');
  const [companies, setCompanies] = useState<EventCompany[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transcript, setTranscript] = useState(
    'Zoom transcript: Priya said the consumer growth team cares about funnel analytics. Send a short profile after May 15 and mention dashboard experiments.'
  );
  const [assignedContactId, setAssignedContactId] = useState(contacts[0]?.id ?? '');
  const [latestLog, setLatestLog] = useState<MeetingLog | null>(null);

  const assignedContact = useMemo(
    () => contacts.find((contact) => contact.id === assignedContactId) ?? contacts[0],
    [assignedContactId, contacts]
  );

  const runEventAgents = async () => {
    setIsAnalyzing(true);
    try {
      setCompanies(await analyzeEventUrl(eventUrl, profile));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const assignTranscript = async () => {
    if (!assignedContact) return;
    const log = await analyzeMeetingTranscript(transcript, assignedContact.id);
    setLatestLog(log);
    onLogCreated(log);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>Ghosty</Text>
        <Text style={styles.subtitle}>Prepare before the handshake. Remember after it.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Upload size={18} color={colors.amber} />
          <Text style={styles.cardTitle}>Teach Ghosty About You</Text>
        </View>
        <Text style={styles.resumeName}>{profile.resumeName}</Text>
        <Text style={styles.bodyText}>{profile.resumeSummary}</Text>
        <View style={styles.skillWrap}>
          {profile.topSkills.map((skill) => (
            <Text key={skill} style={styles.skillChip}>
              {skill}
            </Text>
          ))}
        </View>
        <Text style={styles.goalText}>{profile.careerGoal}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Link size={18} color={colors.teal} />
          <Text style={styles.cardTitle}>Event URL Battle Plan</Text>
        </View>
        <TextInput
          value={eventUrl}
          onChangeText={setEventUrl}
          style={styles.input}
          placeholder="Paste event URL"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
        />
        <Pressable style={styles.primaryButton} onPress={runEventAgents}>
          <Sparkles size={17} color={colors.black} />
          <Text style={styles.primaryText}>{isAnalyzing ? 'Agents scanning...' : 'Build Battle Plan'}</Text>
        </Pressable>
        <View style={styles.companyList}>
          {(companies.length ? companies : []).map((company) => (
            <View key={company.id} style={styles.companyCard}>
              <View style={styles.companyTop}>
                <Text style={styles.companyName}>{company.name}</Text>
                <Text style={styles.booth}>Booth {company.booth}</Text>
              </View>
              <Text style={styles.hiringSignal}>{company.priority} · {company.hiringSignal}</Text>
              <Text style={styles.bodyText}>{company.whyTarget}</Text>
              <View style={styles.pointList}>
                {company.talkingPoints.map((point) => (
                  <Text key={point} style={styles.point}>• {point}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Sparkles size={18} color={colors.amber} />
          <Text style={styles.cardTitle}>Assign Meeting Log</Text>
        </View>
        <View style={styles.contactPills}>
          {contacts.slice(0, 4).map((contact) => (
            <Pressable
              key={contact.id}
              onPress={() => setAssignedContactId(contact.id)}
              style={[styles.contactPill, assignedContact?.id === contact.id && styles.contactPillActive]}
            >
              <Text
                style={[
                  styles.contactPillText,
                  assignedContact?.id === contact.id && styles.contactPillTextActive
                ]}
              >
                {contact.name}
              </Text>
            </Pressable>
          ))}
        </View>
        <TextInput
          value={transcript}
          onChangeText={setTranscript}
          multiline
          style={[styles.input, styles.transcriptInput]}
          placeholder="Paste Zoom transcript or booth notes"
          placeholderTextColor={colors.textMuted}
          textAlignVertical="top"
        />
        <Pressable style={styles.secondaryButton} onPress={assignTranscript}>
          <Text style={styles.secondaryText}>Extract + Assign Log</Text>
        </Pressable>
        {latestLog && (
          <View style={styles.logResult}>
            <Text style={styles.logTitle}>Saved to {assignedContact?.name}</Text>
            <Text style={styles.bodyText}>{latestLog.summary}</Text>
            {latestLog.actionItems.map((item) => (
              <Text key={item} style={styles.actionItem}>Next: {item}</Text>
            ))}
          </View>
        )}
      </View>
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
    gap: 6
  },
  wordmark: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 14
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900'
  },
  resumeName: {
    color: colors.amber,
    fontSize: 14,
    fontWeight: '900'
  },
  bodyText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20
  },
  skillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  skillChip: {
    color: colors.text,
    backgroundColor: colors.grayChip,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '800'
  },
  goalText: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: '900'
  },
  input: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14
  },
  transcriptInput: {
    minHeight: 126,
    lineHeight: 20
  },
  primaryButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },
  primaryText: {
    color: colors.black,
    fontWeight: '900'
  },
  secondaryButton: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.amberSoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryText: {
    color: colors.amber,
    fontWeight: '900'
  },
  companyList: {
    gap: 12
  },
  companyCard: {
    borderRadius: 16,
    backgroundColor: colors.backgroundSoft,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 8
  },
  companyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  companyName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900'
  },
  booth: {
    color: colors.amber,
    fontSize: 12,
    fontWeight: '900'
  },
  hiringSignal: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: '900'
  },
  pointList: {
    gap: 4
  },
  point: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 18
  },
  contactPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  contactPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.grayChip,
    paddingHorizontal: 11,
    paddingVertical: 8
  },
  contactPillActive: {
    borderColor: colors.teal,
    backgroundColor: colors.tealSoft
  },
  contactPillText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800'
  },
  contactPillTextActive: {
    color: colors.teal
  },
  logResult: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(20,184,166,0.28)',
    backgroundColor: colors.tealSoft,
    padding: 12,
    gap: 7
  },
  logTitle: {
    color: colors.teal,
    fontWeight: '900'
  },
  actionItem: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700'
  }
});
