# Architecture

```mermaid
flowchart TD
  A[Home Capture Screen] --> B[useVoiceRecorder]
  B --> C[Whisper Service]
  C --> D[Claude Extraction Service]
  D --> E[Scoring Service]
  E --> F[Swipe Contact Card]
  F --> G[Contact Queue Hook]
  G --> H[Supabase Adapter]
  G --> I[Calendar Reminder Adapter]
  G --> J[Follow-up Queue]
  G --> K[Dashboard]
  J --> L[Draft Message Editor]
  K --> M[Event Wrapped]
```

## Frontend
The app is a single Expo React Native entry point with local tab state. This keeps the hackathon demo reliable while preserving a structure that can move to Expo Router later.

## AI Layer
`src/services/whisper.ts` and `src/services/claude.ts` contain real API call paths guarded by environment variables. Without keys, they return deterministic demo outputs.

## Scoring
`src/services/scoring.ts` computes:
- Role seniority
- Company tier
- Intent weight
- Career relevance
- Recency bonus
- Estimated career value from a salary-band fallback

## Data
The current app uses in-memory state for a zero-setup demo. `supabase/migrations/001_initial_schema.sql` defines the database shape for persistence and row-level security.
