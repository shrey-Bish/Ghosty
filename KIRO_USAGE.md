# Kiro Workflow Notes

Ghosty was built from Kiro-style specs, hooks, and steering docs. The repository includes Kiro-ready artifacts and an implementation that follows them, with real service integrations wired alongside deterministic demo fallbacks.

## Spec-Driven Development
The `.kiro/specs/` folder defines the product requirements before implementation:
- `voice-capture.spec.md` — real `expo-av` recording, Whisper transcription, Claude extraction
- `connection-value.spec.md` — transparent scoring with factor breakdown and salary bands
- `follow-up-pipeline.spec.md` — AI-drafted LinkedIn, email, and cover letter messages
- `qr-quick-add.spec.md` — QR code identity exchange screen
- `dashboard.spec.md` — social capital timeline, at-risk contacts, Event Wrapped

Each spec maps directly to implemented files in `src/`.

## Hooks
The `.kiro/hooks/` folder captures the automated workflows:
- **on-contact-confirmed** — persists to Supabase, calculates score, generates drafts, creates calendar reminder
- **on-followup-due** — surfaces at-risk contacts in the priority queue
- **on-voice-memo-saved** — runs transcription → extraction → scoring → card render
- **on-event-ended** — generates Event Wrapped summary

The current implementation mirrors those workflows with React hooks and service adapters.

## Steering Docs
The `.kiro/steering/` folder stores rules for:
- **extraction-prompt.md** — full Claude system prompt for structured contact extraction from noisy transcripts
- **scoring-algorithm.md** — transparent Connection Value Score factors and decay rules
- **ui-design-principles.md** — dark premium palette, one action per screen, recording state colors

## Real Integrations
All services follow a dual-path pattern: real API when env vars are present, deterministic demo when they are not.

| Service | Env Var | Real Path | Demo Fallback |
|---|---|---|---|
| Whisper | `EXPO_PUBLIC_OPENAI_API_KEY` | OpenAI Whisper API | Hardcoded transcript |
| Claude extraction | `EXPO_PUBLIC_ANTHROPIC_API_KEY` | Claude API with steering prompt | Deterministic contact card |
| Claude drafting | `EXPO_PUBLIC_ANTHROPIC_API_KEY` | Claude API with tone rules | Template-based drafts |
| Supabase | `EXPO_PUBLIC_SUPABASE_URL` + `EXPO_PUBLIC_SUPABASE_ANON_KEY` + user session | Supabase Postgres with RLS | In-memory Map |
| Voice recording | Native device | `expo-av` with mic permissions | Simulated waveform + demo URI |

## Implementation Highlights
- `src/hooks/useVoiceRecorder.ts` uses `expo-av` `Audio.Recording` with proper permission requests and auto-stop at 60 seconds.
- `src/services/claude.ts` implements the full extraction prompt from `.kiro/steering/extraction-prompt.md` including date inference, intent tag rules, and uncertainty marking.
- `src/services/supabase.ts` maps the `Contact` type to the Postgres schema from `supabase/migrations/001_initial_schema.sql`, checks for an authenticated Supabase user before RLS writes, and persists drafts to `follow_up_drafts` when a session exists.
- `supabase/functions/process-voice-memo/index.ts` implements the full server-side pipeline (Whisper → Claude → response).

## Follow-up Work
- Add Supabase Auth UI so the RLS-backed persistence path can run in the demo, not just in the adapter.
- Finish Google Calendar OAuth; the current `calendar.ts` service returns a reminder payload for the product flow.
- Add screenshot/video capture notes once the final simulator pass is complete.
