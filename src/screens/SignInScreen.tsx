import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BriefcaseBusiness, GraduationCap, Mail, MapPin } from 'lucide-react-native';

import { colors } from '../theme/colors';
import { MockUserRole } from '../types';

interface SignInScreenProps {
  onContinue: (role: MockUserRole, email: string) => void;
}

export function SignInScreen({ onContinue }: SignInScreenProps) {
  const [role, setRole] = useState<MockUserRole>('student');
  const [email, setEmail] = useState('sbishno2@asu.edu');

  return (
    <View style={styles.screen}>
      <View style={styles.logoBlock}>
        <View style={styles.logo}>
          <MapPin size={30} color={colors.black} />
        </View>
        <Text style={styles.brand}>Ghosty</Text>
      </View>

      <View style={styles.heroCopy}>
        <Text style={styles.title}>Sign in to Ghosty</Text>
        <Text style={styles.subtitle}>Connect with opportunities that matter</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.roleRow}>
          <RoleButton
            active={role === 'student'}
            label="Student"
            icon="student"
            onPress={() => setRole('student')}
          />
          <RoleButton
            active={role === 'recruiter'}
            label="Recruiter"
            icon="recruiter"
            onPress={() => setRole('recruiter')}
          />
        </View>

        <View style={styles.inputWrap}>
          <Mail size={19} color={colors.textMuted} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <Pressable style={styles.primaryButton} onPress={() => onContinue(role, email)}>
          <Text style={styles.primaryText}>Continue with Email</Text>
        </Pressable>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <Pressable style={styles.googleButton} onPress={() => onContinue(role, email)}>
          <Text style={styles.googleMark}>G</Text>
          <Text style={styles.googleText}>Continue with Google</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Privacy Policy</Text>
        <Text style={styles.footerText}>·</Text>
        <Text style={styles.footerText}>Terms of Service</Text>
      </View>
    </View>
  );
}

function RoleButton({
  active,
  label,
  icon,
  onPress
}: {
  active: boolean;
  label: string;
  icon: 'student' | 'recruiter';
  onPress: () => void;
}) {
  const Icon = icon === 'student' ? GraduationCap : BriefcaseBusiness;
  return (
    <Pressable style={[styles.roleButton, active && styles.roleButtonActive]} onPress={onPress}>
      <Icon size={22} color={active ? colors.black : colors.text} />
      <Text style={[styles.roleText, active && styles.roleTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 82,
    paddingBottom: 34,
    justifyContent: 'space-between'
  },
  logoBlock: {
    alignItems: 'center',
    gap: 14
  },
  logo: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.amber,
    shadowOpacity: 0.3,
    shadowRadius: 20
  },
  brand: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '900'
  },
  heroCopy: {
    alignItems: 'center',
    gap: 12,
    marginTop: 18
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900'
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    textAlign: 'center'
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.28,
    shadowRadius: 24
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12
  },
  roleButton: {
    flex: 1,
    height: 82,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.backgroundSoft
  },
  roleButtonActive: {
    backgroundColor: colors.amber,
    borderColor: colors.amber
  },
  roleText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900'
  },
  roleTextActive: {
    color: colors.black
  },
  inputWrap: {
    height: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15
  },
  primaryButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.amber,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '900'
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border
  },
  orText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800'
  },
  googleButton: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.grayChip
  },
  googleMark: {
    color: colors.amber,
    fontSize: 20,
    fontWeight: '900'
  },
  googleText: {
    color: colors.text,
    fontWeight: '800'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700'
  }
});
