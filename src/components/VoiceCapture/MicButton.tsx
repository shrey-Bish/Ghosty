import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic } from 'lucide-react-native';

import { colors } from '../../theme/colors';
import { VoiceStatus } from '../../hooks/useVoiceRecorder';

interface MicButtonProps {
  status: VoiceStatus;
  onPress: () => void;
}

export function MicButton({ status, onPress }: MicButtonProps) {
  const isRecording = status === 'recording';
  const isProcessing = status === 'processing';
  const accent = isRecording ? colors.red : colors.amber;

  return (
    <View style={styles.wrap}>
      <View style={[styles.ring, styles.ringLarge, { borderColor: accent }]} />
      <View style={[styles.ring, styles.ringMedium, { borderColor: accent }]} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isRecording ? 'Stop recording' : 'Start voice capture'}
        onPress={onPress}
        disabled={isProcessing}
        style={({ pressed }) => [
          styles.button,
          isRecording && styles.recordingButton,
          pressed && styles.pressed
        ]}
      >
        <LinearGradient
          colors={isRecording ? ['#7F1D1D', colors.red] : [colors.surfaceRaised, '#10151F']}
          style={styles.gradient}
        >
          {isProcessing ? (
            <Text style={styles.processingText}>...</Text>
          ) : (
            <Mic size={74} color={colors.text} strokeWidth={1.8} />
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 248,
    height: 248,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 999,
    opacity: 0.22
  },
  ringLarge: {
    width: 248,
    height: 248
  },
  ringMedium: {
    width: 208,
    height: 208,
    opacity: 0.36
  },
  button: {
    width: 172,
    height: 172,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    overflow: 'hidden',
    shadowColor: colors.amber,
    shadowOpacity: 0.25,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 }
  },
  recordingButton: {
    borderColor: colors.red,
    shadowColor: colors.red,
    shadowOpacity: 0.35
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  },
  processingText: {
    color: colors.amber,
    fontSize: 48,
    fontWeight: '800',
    marginTop: -18
  }
});
