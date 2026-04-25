# How Kiro Was Used — Ghosty

Ghosty was built spec-first with Kiro. Every major feature started as a structured requirement before a line of implementation code was written. This document explains how each Kiro capability shaped the development process and the final product.

## Spec-Driven Development

We wrote 6 specs in `.kiro/specs/` before implementation began. Each spec follows EARS (Easy Approach to Requirements Syntax) with explicit WHEN/SHALL/IF clauses and acceptance criteria checkboxes.

**How this changed what we built:**

The `voice-capture.spec.md` spec forced us to define the offline case before writing any recording code. The requirement "IF API credentials are unavailable, the app SHALL run a deterministic demo pipeline" led directly to the dual-path architecture where every service has a real API path and a demo fallback. Without the spec, we would have built the happy path first and bolted on fallbacks as an afterthought — or not at all.

The `connection-value.spec.md` spec required "WHEN a score is displayed, the app SHALL show a transparent breakdown of the scoring factors." This single requirement shaped the entire `ValueScore` component and the `ScoreFactor` type. It prevented us from shipping a black-box number and forced the transparency guardrail into the UI from day one.

**Specs written:**
- `voice-capture.spec.md` — recording, transcription, extraction, confirmation, offline fallback
- `connection-value.spec.md` — scoring factors, breakdown visibility, salary band sourcing, decay rules
- `follow-up-pipeline.spec.md` — AI drafts, conversation references, edit mode, send tracking
- `qr-quick-add.spec.md` — QR display, scan frame, email fallback
- `dashboard.spec.md` — pipeline value, timeline, intent distribution, at-risk contacts, Event Wrapped
- `ghosty-prep.spec.md` — event preparation, company intel, conversation logging

## Steering Docs

Three steering docs in `.kiro/steering/` provided persistent context that guided every AI-related implementation decision.

**`extraction-prompt.md`** — This was the most impactful steering doc. It defined the exact extraction rules, intent tag inference logic, output schema, and tone guidelines for follow-up drafts. The Claude system prompt in `src/services/claude.ts` is a direct implementation of this steering doc. When we iterated on extraction quality, we edited the steering doc first, then updated the code to match — not the other way around.

**`scoring-algorithm.md`** — Documented the Connection Value Score factors, point ranges, and UI requirements. The rule "Always show factor labels, details, and point values" and "Avoid presenting the estimate as guaranteed compensation" directly shaped the `ValueScore` component and the salary band display text.

**`ui-design-principles.md`** — Defined the dark premium palette, one-action-per-screen principle, and color semantics (amber = high-value, teal = completed, red = at-risk/recording). Every component in the app follows these rules. The recording state being "visibly red and unmistakable" led to the red dot, red waveform, and red mic button border during capture.

## Agent Hooks

Four hooks in `.kiro/hooks/` documented the automated workflows that the app implements:

- **`on-contact-confirmed.hook.md`** — Maps to `useContactQueue.confirmContact()`: persist contact → calculate score → generate drafts → create calendar reminder → refresh queue.
- **`on-voice-memo-saved.hook.md`** — Maps to `HomeScreen.handleMicPress()`: transcribe → extract → score → render confirmation card.
- **`on-followup-due.hook.md`** — Maps to `useFollowUpAlerts`: filter contacts by score ≥ 7 and urgency, surface in priority queue.
- **`on-event-ended.hook.md`** — Maps to `EventSummary`: generate total contacts, pipeline value, top connections, batch follow-up action.

These hooks served as living documentation of the app's reactive behavior. When we added the Events screen conversation logging flow, we could verify it aligned with the existing hook contracts.

## Vibe Coding

We used vibe coding for:
- **UI polish**: Iterating on the swipe card spring physics, waveform animation timing, and mic button glow effects.
- **Quick action implementation**: Describing "Make shorter should use Claude to rewrite the draft to 2-3 sentences" and getting a working implementation with loading states and demo fallbacks.
- **Magic Wand redesign**: Describing the two-tab layout (Job Search / Referral Assist) from a screenshot reference and getting the full component with search, prompts, and results.
- **Data migration**: Describing the 9 real mentors from the event slide and getting structured `Contact` objects with realistic drafts, scores, and breakdowns.

## How Spec-Driven Development Compared to Vibe Coding

Spec-driven development was better for **architectural decisions** — the dual-path API/demo pattern, the scoring transparency requirement, the offline queue system. These are decisions that affect every file in the codebase and need to be consistent. Writing them as specs first prevented contradictions.

Vibe coding was better for **UI iteration and feature refinement** — adjusting animation timing, rewriting component layouts, adding quick action buttons. These are localized changes where seeing the result immediately matters more than upfront specification.

The combination was powerful: specs defined the contract, vibe coding filled in the implementation details.

## Kiro Feature Summary

| Kiro Feature | Files/Artifacts | Impact |
|---|---|---|
| Specs (6) | `.kiro/specs/*.spec.md` | Defined requirements before code, forced explicit decisions on offline behavior, transparency, and privacy |
| Steering (3) | `.kiro/steering/*.md` | Guided Claude extraction prompt, scoring algorithm, and UI design across all contributors |
| Hooks (4) | `.kiro/hooks/*.hook.md` | Documented reactive workflows, served as contracts for implementation verification |
| Vibe coding | All `src/` files | UI polish, feature refinement, data migration, rapid iteration on component design |

## What We Would Do Differently

If we had more time, we would add:
- **MCP integration** for Google Calendar (auto-create follow-up reminders) and public salary data APIs (replace demo salary bands with real Levels.fyi/BLS data).
- **More granular specs** for the Events screen conversation logging flow and the Magic Wand network search algorithm.
- **A steering doc for draft tone** — currently the follow-up draft tone rules are inline in the Claude service; extracting them to a steering doc would make them easier to iterate on.
