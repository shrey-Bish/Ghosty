import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CalendarDays, MessageCircle, QrCode, User, WandSparkles } from 'lucide-react-native';

import { sampleMeetingLogs } from './src/data/sampleData';
import { useContactQueue } from './src/hooks/useContactQueue';
import { ContactDetailScreen } from './src/screens/ContactDetailScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { FollowUpScreen } from './src/screens/FollowUpScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { QRScreen } from './src/screens/QRScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { WandScreen } from './src/screens/WandScreen';
import { colors } from './src/theme/colors';
import { AppTab, Contact, MeetingLog, MockUserRole } from './src/types';

const tabs: Array<{ value: AppTab; label: string; icon: typeof User }> = [
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'events', label: 'Events', icon: CalendarDays },
  { value: 'followup', label: 'Follow Up', icon: MessageCircle },
  { value: 'wand', label: 'Wand', icon: WandSparkles },
  { value: 'qr', label: 'QR', icon: QrCode }
];

export default function App() {
  const {
    contacts,
    rankedContacts,
    markFollowedUp
  } = useContactQueue();
  const [signedIn, setSignedIn] = useState(false);
  const [role, setRole] = useState<MockUserRole>('student');
  const [activeTab, setActiveTab] = useState<AppTab>('profile');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [draftContact, setDraftContact] = useState<Contact | null>(null);
  const [meetingLogs, setMeetingLogs] = useState<MeetingLog[]>(sampleMeetingLogs);

  if (!signedIn) {
    return (
      <>
        <StatusBar style="light" />
        <SignInScreen
          onContinue={(nextRole) => {
            setRole(nextRole);
            setSignedIn(true);
          }}
        />
      </>
    );
  }

  const openTab = (tab: AppTab) => {
    setSelectedContact(null);
    setDraftContact(null);
    setActiveTab(tab);
  };

  const openDraft = (contact: Contact) => {
    setSelectedContact(null);
    setDraftContact(contact);
    setActiveTab('followup');
  };

  const screen = selectedContact ? (
    <ContactDetailScreen
      contact={selectedContact}
      onBack={() => setSelectedContact(null)}
      onDraft={openDraft}
    />
  ) : activeTab === 'profile' ? (
    <ProfileScreen role={role} />
  ) : activeTab === 'events' ? (
    <EventsScreen
      contacts={contacts}
      onLogCreated={(log) => setMeetingLogs((existing) => [log, ...existing])}
    />
  ) : activeTab === 'followup' ? (
    <FollowUpScreen
      key={draftContact?.id ?? 'queue'}
      contacts={rankedContacts}
      initialContact={draftContact}
      onSent={markFollowedUp}
    />
  ) : activeTab === 'wand' ? (
    <WandScreen contacts={contacts} meetingLogs={meetingLogs} onOpenContact={setSelectedContact} />
  ) : (
    <QRScreen />
  );

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      {screen}
      {!selectedContact && <BottomNav activeTab={activeTab} onSelect={openTab} />}
    </View>
  );
}

function BottomNav({ activeTab, onSelect }: { activeTab: AppTab; onSelect: (tab: AppTab) => void }) {
  return (
    <View style={styles.navWrap}>
      <View style={styles.nav}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.value;
          return (
            <Pressable
              key={tab.value}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              onPress={() => onSelect(tab.value)}
              style={styles.navItem}
            >
              <Icon size={22} color={active ? colors.amber : colors.textMuted} strokeWidth={2.2} />
              <Text style={[styles.navLabel, active && styles.navLabelActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background
  },
  navWrap: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 20
  },
  nav: {
    minHeight: 72,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.32,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 }
  },
  navItem: {
    minWidth: 56,
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
  navLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800'
  },
  navLabelActive: {
    color: colors.amber
  }
});
