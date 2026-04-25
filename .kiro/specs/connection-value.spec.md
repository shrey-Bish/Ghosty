# Connection Value Score Spec

## User Story
As a user, I want to see the potential career value of each connection so that I can prioritize follow-up energy on the highest-impact relationships.

## Requirements (EARS)
- WHEN a contact is generated, the app SHALL calculate a Connection Value Score from 1 to 10.
- The score SHALL incorporate role seniority, company tier, relevance to career goal, intent tag, and recency.
- WHEN a score is displayed, the app SHALL show a transparent breakdown of scoring factors.
- WHEN a high-value contact has not been followed up with, the app SHALL place that contact in the priority queue.
- The score SHALL include a salary-band or market-value source label.

## Acceptance Criteria
- [x] Score is calculated during contact generation.
- [x] Breakdown is visible from the contact detail screen.
- [x] Salary band is displayed on the confirmation card.
- [x] Queue ranking uses score and urgency.
- [x] Score decay rule is documented in UI and code.
