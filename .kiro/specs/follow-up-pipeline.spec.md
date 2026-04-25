# Follow-up Draft Generation Spec

## User Story
As a user, I want AI-drafted follow-up messages that reference our actual conversation so that my outreach feels personal and specific.

## Requirements (EARS)
- WHEN a user opens a contact from the follow-up queue, the app SHALL display editable drafts.
- The draft SHALL reference at least one captured detail from the conversation.
- WHEN the intent tag is recruiting, the app SHALL provide LinkedIn, email, and cover letter variants.
- WHEN a draft is sent, the app SHALL mark the contact as followed up.
- IF real API keys are not present, the app SHALL generate deterministic drafts for the demo.

## Acceptance Criteria
- [x] LinkedIn, email, and cover letter tabs are implemented.
- [x] Draft copy is editable.
- [x] Draft can be copied.
- [x] Send action marks the contact as followed up.
