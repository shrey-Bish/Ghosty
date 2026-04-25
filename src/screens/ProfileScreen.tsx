import { ReactNode, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FileText, Link, PenLine, QrCode, ShieldCheck, Sparkles, X } from 'lucide-react-native';

import { ghostyProfile } from '../data/sampleData';
import { colors } from '../theme/colors';
import { MockUserRole, ProfileTab, UserProfile } from '../types';

const profileTabs: Array<{ value: ProfileTab; label: string }> = [
  { value: 'bio', label: 'Bio' },
  { value: 'resume', label: 'Resume' },
  { value: 'urls', label: 'URLs' },
  { value: 'skills', label: 'Skills' }
];

const qrCells = Array.from({ length: 121 }, (_, index) => {
  const row = Math.floor(index / 11);
  const col = index % 11;
  return (row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3) || (row * 5 + col * 7) % 4 === 0;
});

export function ProfileScreen({ role }: { role: MockUserRole }) {
  const [profile, setProfile] = useState<UserProfile>(ghostyProfile);
  const [activeTab, setActiveTab] = useState<ProfileTab>('bio');
  const [skillInput, setSkillInput] = useState('Python');
  const [urlInput, setUrlInput] = useState('portfolio.example.com');
  const [qrOpen, setQrOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const initials = useMemo(
    () =>
      profile.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    [profile.name]
  );

  const addResume = () => {
    setProfile((existing) => ({
      ...existing,
      resumes: [...existing.resumes, `Resume_${existing.resumes.length + 1}.pdf`]
    }));
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || profile.skills.includes(trimmed)) return;
    setProfile((existing) => ({
      ...existing,
      skills: [...existing.skills, trimmed],
      topSkills: [...existing.topSkills, trimmed]
    }));
    setSkillInput('');
  };

  const addUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setProfile((existing) => ({
      ...existing,
      urls: [...existing.urls, { label: `Link ${existing.urls.length + 1}`, value: trimmed }]
    }));
    setUrlInput('');
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <View style={styles.smallAvatar}>
            <Text style={styles.smallAvatarText}>{initials}</Text>
          </View>
          <Text style={styles.brand}>Ghosty</Text>
          <Text style={styles.roleBadge}>{role}</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.cover} />
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials[0] ?? 'G'}</Text>
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.title}>{profile.title}</Text>
          <Text style={styles.meta}>{profile.school}</Text>
          <Text style={styles.linkedIn}>{profile.linkedin}</Text>

          <Pressable style={styles.outlineButton} onPress={() => setEditOpen(true)}>
            <PenLine size={18} color={colors.amber} />
            <Text style={styles.outlineText}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={() => setQrOpen(true)}>
            <QrCode size={18} color={colors.black} />
            <Text style={styles.primaryText}>Show My QR</Text>
          </Pressable>
        </View>

        <View style={styles.tabs}>
          {profileTabs.map((tab) => (
            <Pressable key={tab.value} onPress={() => setActiveTab(tab.value)} style={styles.tabButton}>
              <Text style={[styles.tabText, activeTab === tab.value && styles.tabTextActive]}>{tab.label}</Text>
              {activeTab === tab.value && <View style={styles.activeLine} />}
            </Pressable>
          ))}
        </View>

        {activeTab === 'bio' && (
          <Section icon={<Sparkles size={20} color={colors.teal} />} title="Career Summary" subtitle="A quick overview of your professional profile">
            <Field label="Current Focus" value={profile.currentFocus} />
            <Field label="Expected Graduation" value={profile.graduation} />
            <Text style={styles.bioText}>{profile.bio}</Text>
            <View style={styles.tipBox}>
              <Text style={styles.tipTitle}>Pro Tip</Text>
              <Text style={styles.tipText}>
                Keep your university and graduation year accurate. Recruiters use these filters to find candidates for internship cycles and full-time roles.
              </Text>
            </View>
            <PrivacyBlock />
          </Section>
        )}

        {activeTab === 'resume' && (
          <Section icon={<FileText size={20} color={colors.teal} />} title="Resumes" subtitle="Upload multiple versions for different roles">
            <Pressable style={styles.addInline} onPress={addResume}>
              <Text style={styles.addInlineText}>Add</Text>
            </Pressable>
            <View style={styles.resumeList}>
              {profile.resumes.map((resume) => (
                <View key={resume} style={styles.rowCard}>
                  <FileText size={18} color={colors.amber} />
                  <View style={styles.rowBody}>
                    <Text style={styles.rowTitle}>{resume}</Text>
                    <Text style={styles.rowMeta}>Added to your Ghosty profile</Text>
                  </View>
                </View>
              ))}
            </View>
            <PrivacyBlock />
          </Section>
        )}

        {activeTab === 'urls' && (
          <Section icon={<Link size={20} color={colors.teal} />} title="URLs" subtitle="Add your public profile links">
            {profile.urls.map((url) => (
              <View key={`${url.label}-${url.value}`} style={styles.rowCard}>
                <Link size={18} color={colors.amber} />
                <View style={styles.rowBody}>
                  <Text style={styles.rowTitle}>{url.label}</Text>
                  <Text style={styles.rowMeta}>{url.value}</Text>
                </View>
              </View>
            ))}
            <View style={styles.inlineInputRow}>
              <TextInput
                value={urlInput}
                onChangeText={setUrlInput}
                placeholder="Add URL"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                style={styles.inlineInput}
              />
              <Pressable style={styles.smallButton} onPress={addUrl}>
                <Text style={styles.smallButtonText}>Add</Text>
              </Pressable>
            </View>
          </Section>
        )}

        {activeTab === 'skills' && (
          <Section icon={<Sparkles size={20} color={colors.teal} />} title="Skills & Expertise" subtitle="Tag your top skills for AI matching">
            <View style={styles.skillWrap}>
              {profile.skills.map((skill) => (
                <Text key={skill} style={styles.skillChip}>
                  {skill}
                </Text>
              ))}
            </View>
            <View style={styles.inlineInputRow}>
              <TextInput
                value={skillInput}
                onChangeText={setSkillInput}
                placeholder="Enter a skill (e.g. Python, SQL)"
                placeholderTextColor={colors.textMuted}
                style={styles.inlineInput}
              />
              <Pressable style={styles.smallButton} onPress={addSkill}>
                <Text style={styles.smallButtonText}>Add</Text>
              </Pressable>
            </View>
            <PrivacyBlock />
          </Section>
        )}
      </ScrollView>

      <QrModal open={qrOpen} initials={initials} profile={profile} onClose={() => setQrOpen(false)} />
      <EditProfileModal
        open={editOpen}
        profile={profile}
        onClose={() => setEditOpen(false)}
        onSave={(nextProfile) => {
          setProfile(nextProfile);
          setEditOpen(false);
        }}
      />
    </View>
  );
}

function Section({
  icon,
  title,
  subtitle,
  children
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleRow}>
        {icon}
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

function PrivacyBlock() {
  return (
    <View style={styles.privacy}>
      <Text style={styles.privacyTitle}>Account Privacy</Text>
      <View style={styles.rowCard}>
        <ShieldCheck size={18} color={colors.teal} />
        <View style={styles.rowBody}>
          <Text style={styles.rowTitle}>Privacy & Data Sharing</Text>
          <Text style={styles.rowMeta}>Manage how recruiters see you</Text>
        </View>
      </View>
    </View>
  );
}

function QrModal({
  open,
  initials,
  profile,
  onClose
}: {
  open: boolean;
  initials: string;
  profile: UserProfile;
  onClose: () => void;
}) {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.qrSheet}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <X size={18} color={colors.text} />
          </Pressable>
          <Text style={styles.modalTitle}>Your Ghosty QR</Text>
          <View style={styles.qr}>
            {qrCells.map((active, index) => (
              <View key={index} style={[styles.qrCell, active && styles.qrCellActive]} />
            ))}
            <View style={styles.qrLogo}>
              <Text style={styles.qrLogoText}>{initials[0] ?? 'G'}</Text>
            </View>
          </View>
          <Text style={styles.qrName}>{profile.name}</Text>
          <Text style={styles.rowMeta}>{profile.title} · {profile.school}</Text>
        </View>
      </View>
    </Modal>
  );
}

function EditProfileModal({
  open,
  profile,
  onClose,
  onSave
}: {
  open: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
}) {
  const [draft, setDraft] = useState<UserProfile>(profile);

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.editSheet}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <Pressable onPress={onClose}>
              <X size={20} color={colors.text} />
            </Pressable>
          </View>
          <EditInput label="Name" value={draft.name} onChangeText={(value) => setDraft({ ...draft, name: value })} />
          <EditInput label="Title" value={draft.title} onChangeText={(value) => setDraft({ ...draft, title: value, currentFocus: value })} />
          <EditInput label="School" value={draft.school} onChangeText={(value) => setDraft({ ...draft, school: value })} />
          <EditInput label="Bio" value={draft.bio} onChangeText={(value) => setDraft({ ...draft, bio: value })} multiline />
          <Pressable style={styles.primaryButton} onPress={() => onSave(draft)}>
            <Text style={styles.primaryText}>Save Profile</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function EditInput({
  label,
  value,
  onChangeText,
  multiline = false
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={styles.editInputBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        style={[styles.editInput, multiline && styles.editInputMultiline]}
        placeholderTextColor={colors.textMuted}
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
    paddingTop: 50,
    paddingBottom: 124,
    gap: 18
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.amberSoft,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallAvatarText: {
    color: colors.amber,
    fontWeight: '900'
  },
  brand: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900'
  },
  roleBadge: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'capitalize'
  },
  profileCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 10,
    alignItems: 'center',
    overflow: 'hidden'
  },
  cover: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 110,
    backgroundColor: colors.amberSoft
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 999,
    backgroundColor: colors.amber,
    borderWidth: 5,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  avatarText: {
    color: colors.black,
    fontSize: 42,
    fontWeight: '900'
  },
  name: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 8,
    textAlign: 'center'
  },
  title: {
    color: colors.amber,
    fontSize: 16,
    fontWeight: '900'
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700'
  },
  linkedIn: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: '900'
  },
  outlineButton: {
    marginTop: 12,
    width: '100%',
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },
  outlineText: {
    color: colors.text,
    fontWeight: '900'
  },
  primaryButton: {
    width: '100%',
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingTop: 4
  },
  tabButton: {
    minHeight: 46,
    alignItems: 'center',
    gap: 9
  },
  tabText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '900'
  },
  tabTextActive: {
    color: colors.text
  },
  activeLine: {
    width: 34,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.amber
  },
  section: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 18
  },
  sectionTitleRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start'
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900'
  },
  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 5
  },
  field: {
    gap: 5
  },
  fieldLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  fieldValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900'
  },
  bioText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22
  },
  tipBox: {
    borderRadius: 16,
    backgroundColor: colors.tealSoft,
    borderWidth: 1,
    borderColor: 'rgba(20,184,166,0.28)',
    padding: 14,
    gap: 7
  },
  tipTitle: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  tipText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20
  },
  privacy: {
    gap: 12,
    marginTop: 8
  },
  privacyTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900'
  },
  addInline: {
    position: 'absolute',
    right: 18,
    top: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 9
  },
  addInlineText: {
    color: colors.amber,
    fontWeight: '900'
  },
  resumeList: {
    gap: 10
  },
  rowCard: {
    minHeight: 62,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  rowBody: {
    flex: 1,
    minWidth: 0
  },
  rowTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900'
  },
  rowMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 3
  },
  inlineInputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  inlineInput: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    color: colors.text,
    paddingHorizontal: 14,
    fontSize: 14
  },
  smallButton: {
    minWidth: 76,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallButtonText: {
    color: colors.black,
    fontWeight: '900'
  },
  skillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  skillChip: {
    color: colors.amber,
    backgroundColor: colors.amberSoft,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    overflow: 'hidden',
    fontWeight: '900'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5,7,10,0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22
  },
  qrSheet: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    alignItems: 'center',
    gap: 14
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 2
  },
  modalTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900'
  },
  qr: {
    width: 220,
    height: 220,
    borderRadius: 18,
    backgroundColor: colors.background,
    padding: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative'
  },
  qrCell: {
    width: `${100 / 11}%`,
    height: `${100 / 11}%`,
    borderRadius: 2
  },
  qrCellActive: {
    backgroundColor: colors.amber
  },
  qrLogo: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    left: 88,
    top: 88
  },
  qrLogoText: {
    color: colors.amber,
    fontWeight: '900',
    fontSize: 20
  },
  qrName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900'
  },
  editSheet: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 14
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  editInputBlock: {
    gap: 7
  },
  editInput: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  editInputMultiline: {
    minHeight: 94,
    textAlignVertical: 'top'
  }
});
