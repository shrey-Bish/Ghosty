# Ghosty Implementation Plan

Ghosty expands Ghosty's voice-first networking flow into a full AI career companion. The product promise is: prepare before the event, capture every meeting, keep each relationship history organized, and send high-context follow-ups before the opportunity cools off.

## Product Pillars

### 1. Teach Ghosty About You
Users add a resume and tag their top skills before the event. Ghosty uses this profile to tailor follow-up emails toward the user's actual strengths.

Implemented now:
- Resume/profile preparation screen.
- Skill tags with selected strengths.
- Target role and career goal summary.

Next:
- Real document picker and resume parser.
- Persistent user profile table in Supabase.

### 2. Event URL Intelligence
Instead of manual event planning, the user pastes an event URL. Ghosty's agent workflow extracts companies, booths, hiring signals, and recommended talking points.

Implemented now:
- Event URL input.
- Deterministic demo agent output with companies, booths, priorities, and talking points.
- Personalized "battle plan" ranked against the user's skills.

Next:
- Server-side scraping edge function.
- Real event URL parsing with fallback to user paste/manual import.

### 3. Verified Contact Exchange
People can scan a Ghosty QR to exchange verified contact info and link to a profile.

Implemented now:
- QR exchange screen adapted to Ghosty identity.
- Existing contact pipeline can attach context after exchange.

Next:
- Signed profile payloads.
- Scan-to-create-contact flow.

### 4. Meeting Memory
Ghosty accepts live voice memos or pasted Zoom transcripts. It extracts key points, action items, and relationship context, then assigns the log to a person.

Implemented now:
- Voice memo flow already generates structured contacts.
- Transcript analyzer prototype extracts action items and assigns the log to an existing contact in memory.
- Contact detail screen shows captured context and transcript-derived details.

Next:
- Store logs in a dedicated `meeting_logs` table.
- Attach multiple logs to one contact over time.

### 5. Magic Wand Network Search
Users ask who in their network can help. Ghosty searches relationship history and returns the strongest contacts with reasons.

Implemented now:
- Magic Wand screen.
- Query-based search across contact roles, companies, snippets, and key details.
- Ranked answers with reasons and suggested next action.

Next:
- Embeddings/vector search.
- Natural language answer synthesis over all logs.

### 6. Context-Aware Bulk Follow-up
Ghosty drafts personalized, context-aware emails for everyone met today.

Implemented now:
- Per-contact LinkedIn/email/cover-letter drafts.
- Follow-up queue and editable drafts.
- Bulk follow-up concept documented in the follow-up spec.

Next:
- Batch draft review screen.
- Send integrations for Gmail/LinkedIn.

## Build Priority
1. Keep the existing voice capture and scoring flow stable.
2. Add Ghosty prep and intelligence screens.
3. Add transcript assignment and Magic Wand search.
4. Update docs and Kiro specs to describe the expanded product.
5. Preserve demo fallbacks for hackathon reliability.
