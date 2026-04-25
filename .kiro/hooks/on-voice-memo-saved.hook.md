# Hook: on-voice-memo-saved

## Trigger
The user stops recording a voice memo.

## Actions
1. Queue transcription.
2. Run structured extraction.
3. Calculate the score and salary-band estimate.
4. Render the confirmation card.

## Current Implementation
- `src/screens/HomeScreen.tsx`
- `src/services/whisper.ts`
- `src/services/claude.ts`
- `src/services/scoring.ts`
