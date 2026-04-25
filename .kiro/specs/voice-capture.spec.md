# Voice Capture Spec

## User Story
As a conference attendee, I want to record a voice memo immediately after meeting someone so that I can capture context before I forget it.

## Requirements (EARS)
- WHEN the user taps the microphone button, the app SHALL begin recording immediately with no additional prompt.
- WHILE recording, the app SHALL display a visible active-recording state, waveform, and elapsed time.
- WHEN the user taps stop or after 60 seconds, the app SHALL send the audio to transcription.
- WHEN transcription is complete, the app SHALL send the transcript to structured extraction.
- WHEN extraction is complete, the app SHALL display a pre-filled contact card for confirmation.
- IF the user rejects the card, the app SHALL allow re-recording without losing the rest of the queue.
- IF API credentials are unavailable, the app SHALL run a deterministic demo pipeline for judging.

## Acceptance Criteria
- [x] Recording state begins from a single microphone tap.
- [x] Waveform and timer are visible during recording.
- [x] Processing state communicates transcription, extraction, and scoring.
- [x] Extraction populates name, company, role, follow-up date, context, intent, and score.
- [x] Confirm and re-record actions are available on the generated card.
- [x] Demo fallback works without committed API keys.
