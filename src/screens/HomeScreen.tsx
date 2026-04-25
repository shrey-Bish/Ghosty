import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { X } from 'lucide-react-native';

import { SwipeCard } from '../components/ContactCard/SwipeCard';
import { MicButton } from '../components/VoiceCapture/MicButton';
import { ProcessingCard } from '../components/VoiceCapture/ProcessingCard';
import { WaveformAnimation } from '../components/VoiceCapture/WaveformAnimation';
import { formatElapsed, useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { transcribeAudio } from '../services/whisper';
import { colors } from '../theme/colors';
import { AppTab, Contact, EventInfo } from '../types';

interface HomeScreenProps {
  contacts: Contact[];
  currentEvent: EventInfo;
  createContactFromTranscript: (transcript: string) => Promise<Contact>;
  onContactConfirmed: (contact: Contact) => Promise<void>;
  onOpenContact: (contact: Contact) => void;
  onNavigate: (tab: AppTab) => void;
}

/** Return the audio URI for transcription, falling back to demo when no real recording exists. */
function resolveAudioUri(uri: string | null): string {
  return uri ?? 'demo://voice-memo';
}

export function HomeScreen({
  contacts,
  currentEvent,
  createContactFromTranscript,
  onContactConfirmed,
  onOpenContact,
  onNavigate
}: HomeScreenProps) {
  const recorder = useVoiceRecorder();
  const [pendingContact, setPendingContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMicPress = async () => {
    setError(null);

    if (recorder.status === 'idle') {
      await recorder.startRecording();
      return;
    }

    if (recorder.status === 'recording') {
      const stoppedAudioUri = await recorder.stopRecording();
      try {
        const uri = resolveAudioUri(stoppedAudioUri ?? recorder.audioUri);
        const transcript = await transcribeAudio(uri);
        const contact = await createContactFromTranscript(transcript);
        setPendingContact(contact);
      } catch (processingError) {
        setError(processingError instanceof Error ? processingError.message : 'Could not process memo.');
      } finally {
        recorder.resetRecording();
      }
    }
  };

  const confirmPendingContact = async (contact: Contact) => {
    await onContactConfirmed(contact);
    setPendingContact(null);
    onOpenContact(contact);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.wordmark}>Breadcrumb</Text>
          <Text style={styles.eventName}>{currentEvent.name}</Text>
          <Text style={styles.eventDate}>{currentEvent.dateLabel}</Text>
        </View>
        <Pressable style={styles.avatar} onPress={() => onNavigate('dashboard')}>
          <Text style={styles.avatarText}>AR</Text>
        </Pressable>
      </View>

      {recorder.status === 'recording' && (
        <Pressable style={styles.cancel} onPress={recorder.cancelRecording}>
          <X size={16} color={colors.textMuted} />
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      )}

      <View style={styles.captureZone}>
        {recorder.status === 'processing' ? (
          <ProcessingCard />
        ) : (
          <>
            {recorder.status === 'recording' && (
              <View style={styles.recordingLabel}>
                <View style={styles.redDot} />
                <Text style={styles.recordingText}>Recording...</Text>
              </View>
            )}
            <MicButton status={recorder.status} onPress={handleMicPress} />
            {recorder.status === 'recording' ? (
              <>
                <WaveformAnimation bars={recorder.waveform} active color={colors.red} />
                <Text style={styles.timer}>{formatElapsed(recorder.elapsed)}</Text>
                <Text style={styles.helper}>Speak freely - Ghosty is listening</Text>
              </>
            ) : (
              <Text style={styles.helper}>Tap to capture a connection</Text>
            )}
          </>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {!pendingContact && recorder.status === 'idle' && (
        <>
          <View style={styles.statRow}>
            <Stat value={String(contacts.length)} label="contacts today" tone={colors.teal} />
            <Stat
              value={String(contacts.filter((contact) => contact.followedUpAt).length + 2)}
              label="followed up"
              tone={colors.text}
            />
            <Stat
              value={String(contacts.filter((contact) => contact.valueScore >= 8).length)}
              label="at risk"
              tone={colors.red}
            />
          </View>

          <View style={styles.recentBlock}>
            <View style={styles.recentHeader}>
              <Text style={styles.sectionTitle}>Latest Cards</Text>
              <Pressable onPress={() => onNavigate('followup')}>
                <Text style={styles.linkText}>Queue</Text>
              </Pressable>
            </View>
            {contacts.slice(0, 2).map((contact) => (
              <Pressable key={contact.id} style={styles.miniCard} onPress={() => onOpenContact(contact)}>
                <View style={styles.miniAvatar}>
                  <Text style={styles.miniAvatarText}>{contact.initials}</Text>
                </View>
                <View style={styles.miniBody}>
                  <Text style={styles.miniName}>{contact.name}</Text>
                  <Text style={styles.miniMeta}>
                    {contact.role} · {contact.company}
                  </Text>
                </View>
                <Text style={styles.miniScore}>{contact.valueScore.toFixed(1)}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}

      {pendingContact && (
        <View style={styles.pendingWrap}>
          <SwipeCard
            contact={pendingContact}
            onConfirm={confirmPendingContact}
            onRerecord={() => setPendingContact(null)}
            onOpenScore={onOpenContact}
          />
        </View>
      )}
    </ScrollView>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: tone }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
    gap: 26
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16
  },
  wordmark: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900'
  },
  eventName: {
    color: colors.amber,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 22
  },
  eventDate: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 5
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: colors.teal,
    fontWeight: '900'
  },
  cancel: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  },
  cancelText: {
    color: colors.textMuted,
    fontWeight: '800'
  },
  captureZone: {
    minHeight: 380,
    justifyContent: 'center',
    gap: 16
  },
  recordingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.red
  },
  recordingText: {
    color: colors.red,
    fontSize: 14,
    fontWeight: '900'
  },
  timer: {
    color: colors.text,
    fontSize: 42,
    fontWeight: '900',
    textAlign: 'center'
  },
  helper: {
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic'
  },
  error: {
    color: colors.red,
    textAlign: 'center',
    fontWeight: '700'
  },
  statRow: {
    flexDirection: 'row',
    gap: 10
  },
  stat: {
    flex: 1,
    minHeight: 70,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 12,
    justifyContent: 'center',
    gap: 4
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900'
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700'
  },
  recentBlock: {
    gap: 12
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900'
  },
  linkText: {
    color: colors.teal,
    fontWeight: '900',
    fontSize: 13
  },
  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14
  },
  miniAvatar: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.amberSoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  miniAvatarText: {
    color: colors.amber,
    fontWeight: '900'
  },
  miniBody: {
    flex: 1,
    minWidth: 0
  },
  miniName: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 15
  },
  miniMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 3
  },
  miniScore: {
    color: colors.amber,
    fontSize: 19,
    fontWeight: '900'
  },
  pendingWrap: {
    paddingBottom: 22
  }
});
