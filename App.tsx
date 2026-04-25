import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BarChart3, Home, MessageCircle, QrCode } from 'lucide-react-native';

import { useContactQueue } from './src/hooks/useContactQueue';
import { useFollowUpAlerts } from './src/hooks/useFollowUpAlerts';
import { ContactDetailScreen } from './src/screens/ContactDetailScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { FollowUpScreen } from './src/screens/FollowUpScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { QRScreen } from './src/screens/QRScreen';
import { colors } from './src/theme/colors';
import { AppTab, Contact } from './src/types';

const tabs: Array<{ value: AppTab; label: string; icon: typeof Home }> = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'followup', label: 'Follow Up', icon: MessageCircle },
  { value: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { value: 'qr', label: 'QR', icon: QrCode }
];

export default function App() {
  const {
    contacts,
    rankedContacts,
    currentEvent,
    createContactFromTranscript,
    confirmContact,
    markFollowedUp
  } = useContactQueue();
  const atRiskContacts = useFollowUpAlerts(contacts);
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [draftContact, setDraftContact] = useState<Contact | null>(null);

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
  ) : activeTab === 'home' ? (
    <HomeScreen
      contacts={contacts}
      currentEvent={currentEvent}
      createContactFromTranscript={createContactFromTranscript}
      onContactConfirmed={confirmContact}
      onOpenContact={setSelectedContact}
      onNavigate={openTab}
    />
  ) : activeTab === 'followup' ? (
    <FollowUpScreen
      key={draftContact?.id ?? 'queue'}
      contacts={rankedContacts}
      initialContact={draftContact}
      onSent={markFollowedUp}
    />
  ) : activeTab === 'dashboard' ? (
    <DashboardScreen contacts={contacts} atRiskContacts={atRiskContacts} onNavigate={openTab} />
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
    minWidth: 68,
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
