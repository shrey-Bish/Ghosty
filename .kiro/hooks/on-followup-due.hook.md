# Hook: on-followup-due

## Trigger
A follow-up date is within 24 hours, or a score 7+ contact remains uncontacted.

## Actions
1. Surface the contact in the follow-up queue.
2. Mark the contact as at risk when the score and urgency thresholds are met.
3. Preload the existing draft so the user can send quickly.

## Current Implementation
- `src/hooks/useFollowUpAlerts.ts`
- `src/services/scoring.ts`
- `src/components/FollowUp/PriorityQueue.tsx`
