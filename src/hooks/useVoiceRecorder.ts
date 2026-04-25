/**
 * Voice recorder hook using expo-av for real microphone capture.
 *
 * On native (iOS/Android) it requests mic permissions and records real audio.
 * On web or when permissions are denied it falls back to a simulated waveform
 * and returns a demo URI so the rest of the pipeline still works.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';

export type VoiceStatus = 'idle' | 'recording' | 'processing';

const baseWave = [18, 34, 26, 52, 74, 58, 82, 64, 42, 70, 46, 30, 22];

const RECORDING_OPTIONS: Audio.RecordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: 3, // MPEG_4
    audioEncoder: 3, // AAC
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000
  },
  ios: {
    extension: '.m4a',
    outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
    audioQuality: Audio.IOSAudioQuality.HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000
  }
};

export function useVoiceRecorder() {
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [waveform, setWaveform] = useState(baseWave);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

  // Animate waveform while recording
  useEffect(() => {
    if (status !== 'recording') return undefined;

    const interval = setInterval(() => {
      setElapsed((v) => v + 1);
      setWaveform((bars) =>
        bars.map((bar, i) => {
          const pulse = Math.sin(Date.now() / 180 + i * 0.8) * 18;
          return Math.max(12, Math.min(92, Math.round(bar + pulse)));
        })
      );
    }, 750);

    return () => clearInterval(interval);
  }, [status]);

  // Auto-stop at 60 seconds
  useEffect(() => {
    if (status === 'recording' && elapsed >= 60) {
      stopRecording();
    }
  }, [elapsed, status]);

  const startRecording = useCallback(async () => {
    setElapsed(0);
    setWaveform(baseWave);
    setAudioUri(null);

    if (isNative) {
      try {
        const permission = await Audio.requestPermissionsAsync();
        if (!permission.granted) {
          console.warn('[recorder] Mic permission denied — using demo mode');
          setStatus('recording');
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(RECORDING_OPTIONS);
        await recording.startAsync();
        recordingRef.current = recording;
      } catch (err) {
        console.warn('[recorder] Failed to start native recording:', err);
        // Fall through to demo mode — status will still be 'recording'
      }
    }

    setStatus('recording');
  }, [isNative]);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    setStatus('processing');

    const recording = recordingRef.current;
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioUri(uri);
        recordingRef.current = null;

        if (isNative) {
          await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
        }
        return uri;
      } catch (err) {
        console.warn('[recorder] Error stopping recording:', err);
        setAudioUri(null);
        return null;
      }
    }
    // If no native recording was active, audioUri stays null → demo path
    return null;
  }, [isNative]);

  const cancelRecording = useCallback(async () => {
    const recording = recordingRef.current;
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
      } catch {
        // ignore
      }
      recordingRef.current = null;
    }
    setElapsed(0);
    setWaveform(baseWave);
    setAudioUri(null);
    setStatus('idle');
  }, []);

  const resetRecording = useCallback(() => {
    setStatus('idle');
    setElapsed(0);
    setWaveform(baseWave);
  }, []);

  return {
    status,
    elapsed,
    waveform,
    audioUri,
    startRecording,
    stopRecording,
    cancelRecording,
    resetRecording
  };
}

export function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
