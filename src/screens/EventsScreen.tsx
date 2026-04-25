import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock,
  FileUp,
  MapPin,
  Mic,
  Plus,
  Save,
  Search,
  Sparkles,
  X
} from 'lucide-react-native';

import { WaveformAnimation } from '../components/VoiceCapture/WaveformAnimation';
import { sampleEvent } from '../data/sampleData';
import { formatElapsed, useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { analyzeMeetingTranscript } from '../services/ghosty';
import { transcribeAudio } from '../services/whisper';
import { colors } from '../theme/colors';
import { Contact, ConversationCaptureMode, EventCompany, EventItem, MeetingLog } from '../types';

interface EventsScreenProps {
  contacts: Contact[];
  onLogCreated: (log: MeetingLog) => void;
}

export function EventsScreen({ contacts, onLogCreated }: EventsScreenProps) {
  const [event, setEvent] = useState<EventItem>(sampleEvent);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [recordCompany, setRecordCompany] = useState<EventCompany | null>(null);

  return (
    <View style={styles.root}>
      {detailOpen ? (
        <EventDetail
          event={event}
          contacts={contacts}
          onBack={() => setDetailOpen(false)}
          onRecord={setRecordCompany}
        />
      ) : (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.pageTitle}>Events</Text>
            <Pressable style={styles.addEventButton} onPress={() => setAddOpen(true)}>
              <Plus size={18} color={colors.black} />
              <Text style={styles.addEventText}>Add Event</Text>
            </Pressable>
          </View>

          <View style={styles.eventCard}>
            <View style={styles.eventTop}>
              <View>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.metaRow}>
                  <MapPin size={16} color={colors.textMuted} />
                  <Text style={styles.metaText}>{event.location}</Text>
                </View>
                <View style={styles.metaRow}>
                  <CalendarDays size={16} color={colors.textMuted} />
                  <Text style={styles.metaText}>{event.date} · {event.time}</Text>
                </View>
              </View>
              <Text style={styles.liveBadge}>{event.status}</Text>
            </View>
            <Pressable style={styles.outlineButton} onPress={() => setDetailOpen(true)}>
              <Text style={styles.outlineText}>View Event</Text>
              <ArrowLeft size={18} color={colors.amber} style={styles.arrowFlip} />
            </Pressable>
          </View>
        </ScrollView>
      )}

      <AddEventModal
        open={addOpen}
        event={event}
        onClose={() => setAddOpen(false)}
        onGenerate={(homepageUrl, sponsorUrl) => {
          setEvent((existing) => ({ ...existing, homepageUrl, sponsorUrl, status: 'Live' }));
          setAddOpen(false);
          setDetailOpen(true);
        }}
      />

      {recordCompany && (
        <LogConversationModal
          company={recordCompany}
          contacts={contacts}
          onClose={() => setRecordCompany(null)}
          onSave={(log) => {
            onLogCreated(log);
            setRecordCompany(null);
          }}
        />
      )}
    </View>
  );
}

function EventDetail({
  event,
  contacts,
  onBack,
  onRecord
}: {
  event: EventItem;
  contacts: Contact[];
  onBack: () => void;
  onRecord: (company: EventCompany) => void;
}) {
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.detailHeader}>
        <View style={styles.detailTitleBlock}>
          <Text style={styles.pageTitle}>{event.title}</Text>
        </View>
        <Pressable style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={18} color={colors.text} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.metaRow}>
          <MapPin size={17} color={colors.textMuted} />
          <Text style={styles.metaText}>{event.location}</Text>
          <Text style={styles.liveBadge}>{event.status} Now</Text>
        </View>
        <View style={styles.metaRow}>
          <CalendarDays size={17} color={colors.textMuted} />
          <Text style={styles.metaText}>{event.date}</Text>
          <Clock size={17} color={colors.textMuted} />
          <Text style={styles.metaText}>{event.time}</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Building2 size={22} color={colors.text} />
        <Text style={styles.sectionTitle}>Attending Companies</Text>
      </View>

      <View style={styles.companyList}>
        {event.companies.map((company) => {
          const expanded = expandedCompanyId === company.id;
          return (
            <View key={company.id} style={styles.companyCard}>
              <View style={styles.companyTop}>
                <View style={styles.companyLogo}>
                  <Text style={styles.companyLogoText}>{company.logoText}</Text>
                </View>
                <View style={styles.companyBody}>
                  <Text style={styles.companyName}>
                    {company.name} - Booth {company.booth.replace('#', '#')}
                  </Text>
                  <View style={styles.companyMeta}>
                    <Text style={styles.priorityChip}>{company.priority} Priority</Text>
                    <Text style={styles.attendingText}>{company.attendingCount} attending</Text>
                  </View>
                </View>
              </View>
              <View style={styles.companyActions}>
                <Pressable
                  style={styles.attendButton}
                  onPress={() => setExpandedCompanyId(expanded ? null : company.id)}
                >
                  <Text style={styles.attendText}>Summary</Text>
                  {expanded ? <ChevronUp size={18} color={colors.black} /> : <ChevronDown size={18} color={colors.black} />}
                </Pressable>
                <Pressable style={styles.recordButton} onPress={() => onRecord(company)}>
                  <Text style={styles.recordButtonText}>Attend Booth</Text>
                </Pressable>
              </View>

              {expanded && (
                <View style={styles.expandedPanel}>
                  <Text style={styles.expandedTitle}>Recruiters at Booth</Text>
                  <Text style={styles.expandedText}>{company.recruiters.join(', ')}</Text>
                  <Text style={styles.expandedTitle}>About {company.name}</Text>
                  <Text style={styles.expandedText}>{company.about}</Text>
                  <Text style={styles.expandedTitle}>My Pitch Hint</Text>
                  <Text style={styles.pitchText}>"{company.pitchHint}"</Text>
                  <Text style={styles.expandedText}>Known contacts: {contacts.filter((contact) => contact.company === company.name).length}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

function AddEventModal({
  open,
  event,
  onClose,
  onGenerate
}: {
  open: boolean;
  event: EventItem;
  onClose: () => void;
  onGenerate: (homepageUrl: string, sponsorUrl: string) => void;
}) {
  const [homepageUrl, setHomepageUrl] = useState(event.homepageUrl);
  const [sponsorUrl, setSponsorUrl] = useState(event.sponsorUrl);

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.addSheet}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleRow}>
              <Sparkles size={20} color={colors.amber} />
              <Text style={styles.modalTitle}>Add Event with AI</Text>
            </View>
            <Pressable onPress={onClose}>
              <X size={20} color={colors.text} />
            </Pressable>
          </View>
          <Text style={styles.modalSubtitle}>Provide event links and let Ghosty gather details and sponsoring companies for you.</Text>
          <LabeledInput label="Event Homepage URL" value={homepageUrl} onChangeText={setHomepageUrl} />
          <LabeledInput label="Sponsor/Exhibitor List URL" value={sponsorUrl} onChangeText={setSponsorUrl} />
          <Pressable style={styles.primaryButton} onPress={() => onGenerate(homepageUrl, sponsorUrl)}>
            <Text style={styles.primaryText}>Generate Event Data</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function LogConversationModal({
  company,
  contacts,
  onClose,
  onSave
}: {
  company: EventCompany;
  contacts: Contact[];
  onClose: () => void;
  onSave: (log: MeetingLog) => void;
}) {
  const recorder = useVoiceRecorder();
  const [mode, setMode] = useState<ConversationCaptureMode>('text');
  const [note, setNote] = useState(`Hi, I'm John from ${company.name}. We talked about ${company.hiringSignal.toLowerCase()}.`);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [lastCaptureSource, setLastCaptureSource] = useState<MeetingLog['source']>('manual');
  const [selectedContactId, setSelectedContactId] = useState(
    contacts.find((contact) => contact.company === company.name)?.id ?? contacts[0]?.id ?? ''
  );
  const [summary, setSummary] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [actionItems, setActionItems] = useState<string[]>([]);

  const selectedContact = contacts.find((contact) => contact.id === selectedContactId) ?? contacts[0];

  const goToReview = async (sourceText = note) => {
    const log = await analyzeMeetingTranscript(sourceText || `Conversation with ${company.name}`, selectedContact?.id ?? company.id);
    setSummary(log.summary);
    setKeyPoints(log.keyPoints);
    setActionItems(log.actionItems);
    setMode('review');
  };

  const handleVoicePress = async () => {
    if (recorder.status === 'idle') {
      await recorder.startRecording();
      return;
    }

    if (recorder.status === 'recording') {
      const uri = await recorder.stopRecording();
      const transcript = await transcribeAudio(uri ?? 'demo://voice-memo');
      setNote(transcript);
      setLastCaptureSource('voice');
      await goToReview(transcript);
      recorder.resetRecording();
    }
  };

  const saveInteraction = () => {
    onSave({
      id: `log-${company.id}-${Date.now()}`,
      source: lastCaptureSource,
      assignedContactId: selectedContact?.id ?? company.id,
      summary: summary || note || `Conversation with ${company.name}`,
      keyPoints: keyPoints.length ? keyPoints : [company.hiringSignal, company.pitchHint],
      actionItems: actionItems.length ? actionItems : ['Send a personalized follow-up while the conversation is fresh'],
      createdAt: new Date().toISOString()
    });
  };

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.logSheet}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleRow}>
              <Mic size={20} color={colors.amber} />
              <Text style={styles.modalTitle}>Log Conversation with {company.name}</Text>
            </View>
            <Pressable onPress={onClose}>
              <X size={20} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.modeTabs}>
            <ModeButton mode="text" activeMode={mode} label="Text Note" onPress={() => setMode('text')} />
            <ModeButton mode="voice" activeMode={mode} label="Voice Note" onPress={() => setMode('voice')} />
            <ModeButton mode="upload" activeMode={mode} label="Upload" onPress={() => setMode('upload')} />
            <ModeButton mode="review" activeMode={mode} label="Review" onPress={() => goToReview()} />
          </View>

          {mode === 'text' && (
            <View style={styles.modalBody}>
              <Text style={styles.fieldLabel}>Capture the conversation</Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                multiline
                placeholder="Notes"
                placeholderTextColor={colors.textMuted}
                style={styles.noteInput}
                textAlignVertical="top"
              />
              <Pressable style={styles.primaryButton} onPress={() => goToReview()}>
                <Text style={styles.primaryText}>Next: Review & Assign</Text>
              </Pressable>
            </View>
          )}

          {mode === 'voice' && (
            <View style={styles.modalBody}>
              <Pressable style={styles.voiceButton} onPress={handleVoicePress}>
                <Mic size={26} color={recorder.status === 'recording' ? colors.red : colors.amber} />
                <Text style={styles.voiceButtonText}>
                  {recorder.status === 'recording' ? 'Stop Recording' : 'Start Voice Note'}
                </Text>
              </Pressable>
              <WaveformAnimation bars={recorder.waveform} active={recorder.status === 'recording'} color={colors.amber} />
              <Text style={styles.timerText}>{formatElapsed(recorder.elapsed)}</Text>
            </View>
          )}

          {mode === 'upload' && (
            <View style={styles.modalBody}>
              <Pressable
                style={styles.uploadBox}
                onPress={() => {
                setUploadedFileName(`${company.name}_booth_transcript.txt`);
                setNote(`Uploaded transcript from ${company.name}. Recruiter mentioned ${company.hiringSignal}. Follow up with a product-focused resume.`);
                setLastCaptureSource('zoom');
              }}
              >
                <FileUp size={30} color={colors.amber} />
                <Text style={styles.uploadTitle}>{uploadedFileName || 'Upload transcript or audio'}</Text>
                <Text style={styles.modalSubtitle}>Mock upload creates a reviewable conversation note.</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={() => goToReview()}>
                <Text style={styles.primaryText}>Next: Review & Assign</Text>
              </Pressable>
            </View>
          )}

          {mode === 'review' && (
            <View style={styles.modalBody}>
              <View style={styles.reviewHeader}>
                <Text style={styles.fieldLabel}>Who did you talk to?</Text>
                <Text style={styles.addContactText}>Add New Contact</Text>
              </View>
              <View style={styles.searchBox}>
                <Search size={17} color={colors.textMuted} />
                <Text style={styles.searchText}>Search contacts...</Text>
              </View>
              <View style={styles.contactPills}>
                {contacts.slice(0, 4).map((contact) => (
                  <Pressable
                    key={contact.id}
                    style={[styles.contactPill, selectedContactId === contact.id && styles.contactPillActive]}
                    onPress={() => setSelectedContactId(contact.id)}
                  >
                    <Text style={[styles.contactPillText, selectedContactId === contact.id && styles.contactPillTextActive]}>
                      {contact.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.fieldLabel}>Review Note</Text>
              <Text style={styles.reviewSummary}>{summary || note}</Text>
              <View style={styles.reviewColumns}>
                <View style={styles.reviewColumn}>
                  <Text style={styles.fieldLabel}>Key Points</Text>
                  <Text style={styles.reviewSmall}>{keyPoints.join('\n') || 'Notable takeaways...'}</Text>
                </View>
                <View style={styles.reviewColumn}>
                  <Text style={styles.fieldLabel}>Next Steps</Text>
                  <Text style={styles.reviewSmall}>{actionItems.join('\n') || 'Follow-up tasks...'}</Text>
                </View>
              </View>
              <Pressable style={styles.primaryButton} onPress={saveInteraction}>
                <Save size={18} color={colors.black} />
                <Text style={styles.primaryText}>Save Interaction</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

function ModeButton({
  mode,
  activeMode,
  label,
  onPress
}: {
  mode: ConversationCaptureMode;
  activeMode: ConversationCaptureMode;
  label: string;
  onPress: () => void;
}) {
  const active = mode === activeMode;
  return (
    <Pressable style={[styles.modeButton, active && styles.modeButtonActive]} onPress={onPress}>
      <Text style={[styles.modeText, active && styles.modeTextActive]}>{label}</Text>
    </Pressable>
  );
}

function LabeledInput({
  label,
  value,
  onChangeText
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.labeledInputBlock}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        placeholderTextColor={colors.textMuted}
        style={styles.modalInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  screen: {
    flex: 1
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
    justifyContent: 'space-between',
    gap: 14
  },
  pageTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    flexShrink: 1
  },
  addEventButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.amber,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  addEventText: {
    color: colors.black,
    fontWeight: '900'
  },
  eventCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 16
  },
  eventTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  eventTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 7
  },
  metaText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700'
  },
  liveBadge: {
    color: colors.teal,
    backgroundColor: colors.tealSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '900',
    alignSelf: 'flex-start'
  },
  outlineButton: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  outlineText: {
    color: colors.amber,
    fontWeight: '900'
  },
  arrowFlip: {
    transform: [{ rotate: '180deg' }]
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16
  },
  detailTitleBlock: {
    flex: 1
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingTop: 8
  },
  backText: {
    color: colors.text,
    fontWeight: '800'
  },
  infoCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900'
  },
  companyList: {
    gap: 14
  },
  companyCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 14
  },
  companyTop: {
    flexDirection: 'row',
    gap: 12
  },
  companyLogo: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.backgroundSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  companyLogoText: {
    color: colors.amber,
    fontSize: 24,
    fontWeight: '900'
  },
  companyBody: {
    flex: 1,
    minWidth: 0,
    gap: 8
  },
  companyName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900'
  },
  companyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap'
  },
  priorityChip: {
    color: colors.amber,
    backgroundColor: colors.amberSoft,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    overflow: 'hidden',
    fontSize: 11,
    fontWeight: '900'
  },
  attendingText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800'
  },
  companyActions: {
    flexDirection: 'row',
    gap: 12
  },
  attendButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.amber,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  attendText: {
    color: colors.black,
    fontWeight: '900'
  },
  recordButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recordButtonText: {
    color: colors.amber,
    fontWeight: '900'
  },
  expandedPanel: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 14,
    gap: 8
  },
  expandedTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 4
  },
  expandedText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20
  },
  pitchText: {
    color: colors.text,
    backgroundColor: colors.backgroundSoft,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    overflow: 'hidden',
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5,7,10,0.78)',
    justifyContent: 'flex-end'
  },
  addSheet: {
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    gap: 16
  },
  logSheet: {
    maxHeight: '88%',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 16
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    flex: 1
  },
  modalTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    flexShrink: 1
  },
  modalSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20
  },
  labeledInputBlock: {
    gap: 8
  },
  inputLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900'
  },
  modalInput: {
    minHeight: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    color: colors.text,
    paddingHorizontal: 14,
    fontSize: 14
  },
  primaryButton: {
    height: 52,
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
  modeTabs: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap'
  },
  modeButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    paddingHorizontal: 11,
    paddingVertical: 8
  },
  modeButtonActive: {
    backgroundColor: colors.amberSoft,
    borderColor: colors.borderStrong
  },
  modeText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900'
  },
  modeTextActive: {
    color: colors.amber
  },
  modalBody: {
    gap: 14
  },
  fieldLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '900'
  },
  noteInput: {
    minHeight: 210,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    color: colors.text,
    padding: 14,
    fontSize: 15,
    lineHeight: 22
  },
  voiceButton: {
    minHeight: 74,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.backgroundSoft,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  voiceButtonText: {
    color: colors.text,
    fontWeight: '900'
  },
  timerText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center'
  },
  uploadBox: {
    minHeight: 180,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    backgroundColor: colors.backgroundSoft,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 18
  },
  uploadTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center'
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addContactText: {
    color: colors.amber,
    fontSize: 12,
    fontWeight: '900'
  },
  searchBox: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12
  },
  searchText: {
    color: colors.textMuted,
    fontSize: 14
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
    backgroundColor: colors.backgroundSoft,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  contactPillActive: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.amberSoft
  },
  contactPillText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900'
  },
  contactPillTextActive: {
    color: colors.amber
  },
  reviewSummary: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22
  },
  reviewColumns: {
    flexDirection: 'row',
    gap: 12
  },
  reviewColumn: {
    flex: 1,
    minHeight: 100,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    padding: 12,
    gap: 8
  },
  reviewSmall: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 18
  }
});
