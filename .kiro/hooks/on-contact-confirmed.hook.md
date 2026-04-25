# Hook: on-contact-confirmed

## Trigger
A user confirms a generated contact card.

## Actions
1. Persist the contact through the contact repository.
2. Calculate and store the transparent Connection Value Score.
3. Generate LinkedIn, email, and cover letter drafts.
4. If a follow-up date exists, create a follow-up reminder payload.
5. Refresh dashboard totals and priority queue ordering.

## Current Implementation
- `src/hooks/useContactQueue.ts`
- `src/services/scoring.ts`
- `src/services/calendar.ts`
- `src/services/supabase.ts`
