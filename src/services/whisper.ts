/**
 * Whisper transcription service.
 *
 * When EXPO_PUBLIC_OPENAI_API_KEY is set and a real audio URI is provided,
 * the file is sent to the OpenAI Whisper API. Otherwise a deterministic
 * demo transcript is returned so the app works without keys.
 */

const demoTranscript =
  'Just met Priya Kumar from Stripe. She is a senior PM hiring for a consumer growth role in San Francisco. She said to reach out after May 15 and mentioned she knows the hiring manager for the data team too.';

export async function transcribeAudio(audioUri: string): Promise<string> {
  const apiKey = getEnv('EXPO_PUBLIC_OPENAI_API_KEY');

  // Demo fallback — no key or explicit demo URI
  if (!apiKey || audioUri === 'demo://voice-memo') {
    await wait(850);
    return demoTranscript;
  }

  // Real Whisper API call
  const formData = new FormData();
  formData.append('file', {
    uri: audioUri,
    type: 'audio/m4a',
    name: 'memo.m4a'
  } as unknown as Blob);
  formData.append('model', 'whisper-1');
  formData.append('language', 'en');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: formData
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Whisper transcription failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as { text?: string };
  return data.text ?? '';
}

function getEnv(key: string) {
  // Expo inlines EXPO_PUBLIC_* at build time via Metro bundler
  const vars: Record<string, string | undefined> = {
    EXPO_PUBLIC_OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  };
  return vars[key];
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
