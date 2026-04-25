const demoTranscript =
  'Just met Priya Kumar from Stripe. She is a senior PM hiring for a consumer growth role in San Francisco. She said to reach out after May 15 and mentioned she knows the hiring manager for the data team too.';

export async function transcribeAudio(audioUri: string): Promise<string> {
  const apiKey = getEnv('EXPO_PUBLIC_OPENAI_API_KEY');

  if (!apiKey || audioUri === 'demo://voice-memo') {
    await wait(850);
    return demoTranscript;
  }

  const formData = new FormData();
  formData.append('file', {
    uri: audioUri,
    type: 'audio/wav',
    name: 'memo.wav'
  } as unknown as Blob);
  formData.append('model', 'whisper-1');
  formData.append('language', 'en');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Whisper transcription failed: ${response.status}`);
  }

  const data = (await response.json()) as { text?: string };
  return data.text ?? '';
}

function getEnv(key: string) {
  return (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } })
    .process?.env?.[key];
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
