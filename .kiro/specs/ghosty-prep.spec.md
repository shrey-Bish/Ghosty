# Ghosty Profile, Events, and Network Intelligence Spec

## User Story
As a conference attendee, I want Ghosty to understand my background, plan which booths to visit, remember every meeting, and tell me who in my network can help so that networking turns into targeted opportunity.

## Requirements (EARS)
- WHEN the app launches, it SHALL show a mock Student/Recruiter sign-in gate before the main app.
- WHEN the user opens Profile, the app SHALL show editable identity, QR, bio, resume, URLs, and skills.
- WHEN the user opens Events, the app SHALL show the NeurIPS event and a working Add Event modal.
- WHEN the user opens an event, the app SHALL show attending companies with Attend Booth and Record actions.
- WHEN the user records a booth interaction, the app SHALL support text note, voice note, upload, and review/assign modes.
- WHEN a meeting log is saved, the app SHALL attach it to local relationship history.
- WHEN the user asks Magic Wand a question, the app SHALL search contacts and meeting logs for relevant people.
- WHEN Magic Wand returns a result, the app SHALL explain why that person is relevant and suggest the ask.

## Acceptance Criteria
- [x] Mock Student/Recruiter sign-in is implemented.
- [x] Profile tabs display and update local profile state.
- [x] Events screen displays NeurIPS and generates event data from mock URLs.
- [x] Attend Booth expands company context and pitch hints.
- [x] Record opens a conversation modal with text, voice, upload, and review states.
- [x] Saving creates a local meeting log.
- [x] Magic Wand searches contacts and meeting logs.
- [x] Results include a reason and suggested next action.
- [ ] Real resume upload/parsing is implemented.
- [ ] Real event URL scraping is implemented.
- [ ] Meeting logs persist in Supabase.
