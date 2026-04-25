# Ghosty

Ghosty is a mobile-first conference companion that turns voice notes into structured relationship follow-up. Tap the mic after a conversation, get a contact card, see a transparent Connection Value Score, and draft a specific follow-up before the context fades.

## What Works Now
- Expo React Native prototype with dark mobile UI.
- Voice capture demo flow with recording, waveform, processing, and contact confirmation.
- Deterministic Whisper/Claude fallback so the demo runs without API keys.
- Transparent scoring breakdown with salary-band estimate.
- Follow-up priority queue with editable LinkedIn, email, and cover letter drafts.
- Social capital dashboard, at-risk contacts, Event Wrapped summary, and QR Quick Add.
- Kiro-compatible specs, hooks, and steering docs in `.kiro/`.

## Run Locally

```bash
npm install
npm run web
```

For a device build:

```bash
npm run ios
npm run android
```

## Optional API Keys

The app runs without keys for judging. To test real transcription/extraction later, add:

```bash
EXPO_PUBLIC_OPENAI_API_KEY=...
EXPO_PUBLIC_ANTHROPIC_API_KEY=...
```

## Project Structure

```text
.kiro/                 Specs, hooks, and steering docs
src/components/        Voice, contact card, follow-up, dashboard UI
src/hooks/             Recorder, queue, alert state
src/screens/           Home, detail, follow-up, dashboard, QR
src/services/          Whisper, Claude, scoring, calendar, repository adapters
supabase/              Initial schema and voice-processing edge function
```

## Demo Flow
1. Open Ghosty on the Home tab.
2. Tap the microphone to begin capture.
3. Tap again to stop and process the memo.
4. Confirm the generated contact card.
5. Review the score breakdown, draft a follow-up, and check the dashboard.

## Privacy Posture
Ghosty is explicit tap-to-record only. The prototype uses local demo data by default; the Supabase schema is prepared for row-level security so users own their contacts and voice memo metadata.
