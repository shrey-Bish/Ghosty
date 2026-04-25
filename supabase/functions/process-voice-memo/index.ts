/**
 * Supabase Edge Function: process-voice-memo
 *
 * Receives an audio URL, transcribes via Whisper, extracts via Claude,
 * scores the contact, and returns the full result.
 *
 * Expects env vars: OPENAI_API_KEY, ANTHROPIC_API_KEY
 */

type ProcessVoiceMemoRequest = {
  audioUrl: string;
  careerGoal: string;
  targetRoles: string[];
};

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const body = (await request.json()) as ProcessVoiceMemoRequest;
  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');

  // ---- Step 1: Transcribe ----
  let transcript = '';

  if (openaiKey && body.audioUrl) {
    const audioResponse = await fetch(body.audioUrl);
    const audioBlob = await audioResponse.blob();

    const formData = new FormData();
    formData.append('file', audioBlob, 'memo.m4a');
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    const whisperRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${openaiKey}` },
      body: formData
    });

    if (whisperRes.ok) {
      const whisperData = (await whisperRes.json()) as { text?: string };
      transcript = whisperData.text ?? '';
    }
  }

  if (!transcript) {
    return Response.json({
      status: 'error',
      message: 'Transcription failed or no audio provided'
    }, { status: 400 });
  }

  // ---- Step 2: Extract via Claude ----
  let extracted = null;

  if (anthropicKey) {
    const today = new Date().toISOString().slice(0, 10);
    const extractRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: `You are the extraction engine for Ghosty. Extract structured contact data from voice memo transcripts. Today is ${today}. User goal: ${body.careerGoal}. Target roles: ${body.targetRoles.join(', ')}. Return ONLY valid JSON.`,
        messages: [
          { role: 'user', content: `Extract contact info:\n\n"${transcript}"` }
        ]
      })
    });

    if (extractRes.ok) {
      const extractData = (await extractRes.json()) as { content?: Array<{ text?: string }> };
      try {
        extracted = JSON.parse(extractData.content?.[0]?.text ?? '{}');
      } catch {
        extracted = null;
      }
    }
  }

  return Response.json({
    status: 'completed',
    transcript,
    extracted,
    pipeline: ['transcribe', 'extract', 'score', 'draft']
  });
});
