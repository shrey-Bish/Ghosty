# Kiro Workflow Notes

Kiro was unavailable in the local environment during this implementation pass, so this repository does not claim that Kiro generated the code. Instead, the project is organized as a Kiro-ready, spec-driven build so it can be opened in Kiro later without restructuring.

## Spec-Driven Development
The `.kiro/specs/` folder defines the product requirements before implementation:
- `voice-capture.spec.md`
- `connection-value.spec.md`
- `follow-up-pipeline.spec.md`
- `qr-quick-add.spec.md`
- `dashboard.spec.md`

Each spec maps directly to implemented files in `src/`.

## Hooks
The `.kiro/hooks/` folder captures the intended automated workflows:
- Contact confirmed
- Follow-up due
- Voice memo saved
- Event ended

The current implementation mirrors those workflows with React hooks and service adapters.

## Steering Docs
The `.kiro/steering/` folder stores rules for:
- Contact extraction
- Scoring transparency
- UI design principles

These docs are intentionally written so a Kiro agent can continue the work consistently when Kiro is available.

## Honest Submission Language
Use phrasing like:

> Ghosty was built from Kiro-style specs, hooks, and steering docs. Kiro was unavailable during the final implementation window, so the repository includes Kiro-ready artifacts and a manual implementation that follows them.

Avoid claiming that Kiro generated code or ran sessions if it did not.
