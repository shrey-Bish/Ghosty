# Ghosty

Ghosty is a mobile-first conference companion that turns voice notes into structured relationship follow-up. Tap the mic after a conversation, get a contact card, see a transparent Connection Value Score, and draft a specific follow-up before the context fades.

## What Works Now
- Expo React Native prototype with dark premium mobile UI.
- Sign-in screen with student/recruiter role selection.
- Editable profile with bio, resumes, URLs, skills, and QR code.
- Events screen with attending companies, booth summaries, recruiter lists, and pitch hints.
- Conversation logging via text, voice, or upload with AI-powered review.
- Real microphone recording via `expo-av` on iOS/Android with permission handling.
- Real OpenAI Whisper transcription when `EXPO_PUBLIC_OPENAI_API_KEY` is set.
- Real Claude extraction and draft generation when `EXPO_PUBLIC_ANTHROPIC_API_KEY` is set.
- Deterministic demo fallbacks so the app runs without any API keys.
- Transparent scoring breakdown with salary-band estimate.
- Follow-up priority queue with AI-powered "Make shorter", "More formal", and "Add skill highlight" quick actions.
- Magic Wand with Job Search and Referral Assist tabs for network matching.
- QR Quick Add screen for identity exchange.
- Kiro-compatible specs, hooks, and steering docs in `.kiro/`.

## Run Locally

```bash
npm install
npx expo start --tunnel
```

Scan the QR code with Expo Go on your phone.

## Environment Variables

The app runs without any keys for demo/judging. To enable real AI integrations:

```bash
EXPO_PUBLIC_OPENAI_API_KEY=sk-...        # Whisper transcription
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-... # Claude extraction & drafting
```

When keys are missing, each service falls back to deterministic demo data.

## Project Structure

```text
.kiro/                 Specs, hooks, and steering docs
src/components/        Voice, contact card, follow-up, dashboard UI
src/hooks/             Recorder (expo-av), queue, alert state
src/screens/           SignIn, Profile, Events, FollowUp, Wand, QR, ContactDetail
src/services/          Whisper, Claude, scoring, calendar stub, Supabase stub, Ghosty AI
src/data/              Sample contacts (real mentors), events, profile
supabase/              Schema migration and voice-processing edge function (ready for production)
```

## Demo Flow
1. Sign in as a student with sbishno2@asu.edu.
2. View your profile — Shrey Bishnoi, Software Engineer, ASU.
3. Go to Events — see the Kiro Spark Challenge with AWS, Toptal, Amazon, AI Cloud Innovation Center.
4. Tap a company → Summary shows recruiters, about, pitch hint. Attend Booth opens conversation logging.
5. Go to Follow Up — see prioritized mentor contacts. Tap one, use AI quick actions to refine drafts.
6. Go to Magic Wand — search by job title or use referral assist prompts to find best matches.
7. Go to QR — share your Ghosty identity code.

## Privacy Posture
Ghosty is explicit tap-to-record only. A red pulsing indicator is always visible while recording. The Supabase schema enforces row-level security so users own their data. Voice memos are processed and not stored.
