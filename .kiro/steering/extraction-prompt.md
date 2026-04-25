# Extraction Prompt Steering

## Purpose
Extract structured contact information from noisy, informal voice transcripts captured in conference environments.

## Extraction Rules
- Always extract name, company, and a context snippet when present.
- Extract role, follow-up date, specific opportunity, and warm referral path when present.
- Infer intent tag from context:
  - Hiring or role language means `recruiting`.
  - Advice or guidance language means `mentor`.
  - Work together or partner language means `collaborator`.
  - Introductions, press, investors, or audience language means `amplifier`.
  - Default to `peer`.
- Do not hallucinate details not present in the transcript.
- Mark ambiguous fields in `uncertainFields`.
- Return valid JSON matching `ExtractedContactCard`.

## Output Schema
```json
{
  "name": "string",
  "company": "string | null",
  "role": "string | null",
  "followUpDate": "YYYY-MM-DD | null",
  "intentTag": "recruiting | mentor | collaborator | amplifier | peer",
  "contextSnippet": "string",
  "keyDetails": ["string"],
  "uncertainFields": ["string"],
  "estimatedSeniority": "junior | mid | senior | director | vp | c-suite | unknown"
}
```
