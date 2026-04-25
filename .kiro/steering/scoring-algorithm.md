# Scoring Algorithm Steering

Ghosty's Connection Value Score is intentionally transparent. It should never feel like a black-box judgment of a person; it is a prioritization aid for the user's follow-up energy.

## Factors
- Role seniority: 0-3 points.
- Company tier: 0-2 points.
- Intent tag: recruiting has the highest weight, then mentor, amplifier, collaborator, peer.
- Career relevance: 0-2 points based on user's current goal and target roles.
- Recency: starts at 1 and decays by 10% each week without follow-up.

## UI Requirements
- Always show factor labels, details, and point values.
- Always show the salary band source label.
- Avoid presenting the estimate as guaranteed compensation.

## Code
The implemented algorithm lives in `src/services/scoring.ts`.
