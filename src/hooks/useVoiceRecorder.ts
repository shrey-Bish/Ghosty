import { useCallback, useEffect, useState } from 'react';

export type VoiceStatus = 'idle' | 'recording' | 'processing';

const baseWave = [18, 34, 26, 52, 74, 58, 82, 64, 42, 70, 46, 30, 22];

export function useVoiceRecorder() {
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [waveform, setWaveform] = useState(baseWave);

  useEffect(() => {
    if (status !== 'recording') {
      return undefined;
    }

    const interval = setInterval(() => {
      setElapsed((value) => value + 1);
      setWaveform((bars) =>
        bars.map((bar, index) => {
          const pulse = Math.sin(Date.now() / 180 + index * 0.8) * 18;
          return Math.max(12, Math.min(92, Math.round(bar + pulse)));
        })
      );
    }, 750);

    return () => clearInterval(interval);
  }, [status]);

  const startRecording = useCallback(() => {
    setElapsed(0);
    setWaveform(baseWave);
    setStatus('recording');
  }, []);

  const stopRecording = useCallback(() => {
    setStatus('processing');
  }, []);

  const cancelRecording = useCallback(() => {
    setElapsed(0);
    setWaveform(baseWave);
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
