# Breadcrumb Prep and Network Intelligence Spec

## User Story
As a conference attendee, I want Breadcrumb to understand my background, plan which booths to visit, remember every meeting, and tell me who in my network can help so that networking turns into targeted opportunity.

## Requirements (EARS)
- WHEN the user opens Prep, the app SHALL show resume identity, skill tags, career goal, and target roles.
- WHEN the user enters an event URL, the app SHALL generate a battle plan of companies, booths, hiring signals, and talking points.
- WHEN the user pastes a Zoom transcript or booth notes, the app SHALL extract a summary, key points, and action items.
- WHEN a meeting log is extracted, the app SHALL allow assigning it to a person in the user's contact history.
- WHEN the user asks Magic Wand a question, the app SHALL search contacts and meeting logs for relevant people.
- WHEN Magic Wand returns a result, the app SHALL explain why that person is relevant and suggest the ask.

## Acceptance Criteria
- [x] Prep screen displays resume summary, skills, and career goal.
- [x] Event URL battle plan returns ranked demo companies and talking points.
- [x] Transcript analyzer creates a meeting log and assigns it to a contact.
- [x] Magic Wand searches contacts and meeting logs.
- [x] Results include a reason and suggested next action.
- [ ] Real resume upload/parsing is implemented.
- [ ] Real event URL scraping is implemented.
- [ ] Meeting logs persist in Supabase.
