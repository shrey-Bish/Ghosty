# Ghosty

Ghosty is a mobile-first conference companion that turns voice notes into structured relationship follow-up. Tap the mic after a conversation, get a contact card, see a transparent Connection Value Score, and draft a specific follow-up before the context fades.

## What Works Now
- Expo React Native prototype with dark mobile UI.
- Real microphone recording via `expo-av` on iOS/Android with permission handling.
- Voice capture demo flow with recording, waveform, processing, and contact confirmation.
- Real OpenAI Whisper transcription when `EXPO_PUBLIC_OPENAI_API_KEY` is set.
- Real Claude extraction and draft generation when `EXPO_PUBLIC_ANTHROPIC_API_KEY` is set, following `.kiro/steering/extraction-prompt.md`.
- Deterministic Whisper/Claude fallback so the demo runs without API keys.
- Supabase adapter for contacts, events, and follow-up drafts. It persists when Supabase is configured and an authenticated user session exists.
- In-memory fallback when Supabase is not configured.
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

## Environment Variables

The app runs without any keys for judging. To enable real integrations, set:

```bash
# AI services
EXPO_PUBLIC_OPENAI_API_KEY=sk-...        # Whisper transcription
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-... # Claude extraction & drafting

# Supabase persistence (optional)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Calendar integration (placeholder for the next pass)
EXPO_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID=...
EXPO_PUBLIC_GOOGLE_CALENDAR_API_KEY=...
```

When keys are missing, each service falls back to deterministic demo data.

Supabase RLS requires a signed-in user. Until auth UI is added, the app keeps using local demo storage when no session is present, even if Supabase URL/key are configured.

## Project Structure

```text
.kiro/                 Specs, hooks, and steering docs
src/components/        Voice, contact card, follow-up, dashboard UI
src/hooks/             Recorder (expo-av), queue, alert state
src/screens/           Home, detail, follow-up, dashboard, QR
src/services/          Whisper, Claude, scoring, calendar, Supabase
supabase/              Schema migration and voice-processing edge function
```

## Demo Flow
1. Open Ghosty on the Home tab.
2. Tap the microphone to begin capture (grants mic permission on first use).
3. Tap again to stop and process the memo.
4. Confirm the generated contact card.
5. Review the score breakdown, draft a follow-up, and check the dashboard.

## Privacy Posture
Ghosty is explicit tap-to-record only. A red pulsing indicator is always visible while recording. The prototype uses local demo data by default; the Supabase schema enforces row-level security so users own their contacts and voice memo metadata.

## Remaining Work
- Add sign-in/sign-up so Supabase RLS persistence can be exercised end to end.
- Replace the calendar placeholder with a real Google Calendar OAuth flow.
- Add device/simulator QA screenshots for the final submission package.
