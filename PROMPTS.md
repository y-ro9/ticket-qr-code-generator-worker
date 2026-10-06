# PROMPTS.md — Prompt Traceability Log

> Ticket: **ENG-139055** | Owner: **Yash Raj [PDIT-INT-1247]**
> Project: **Ticket QR Code Generator Worker**
> Workflow: **AI-Assisted Software Engineering (Vibe Coding)**

This file documents the exact sequence of prompts used to guide the AI assistant
from requirements to a working, tested, deployable solution.

---

## Phase 1 — Architecture (Planning)

### Prompt 1.1 — Context ingestion
**Prompt:**
> "Read the attached TRD for ticket ENG-139055 (Ticket QR Code Generator Worker).
> Summarize the happy path, unhappy path, NFRs, and the Definition of Done."

**Outcome:** Confirmed scope = frontend-only SPA, TDD workflow mandatory, PROMPTS.md required.

---

### Prompt 1.2 — Stack decision
**Prompt:**
> "Given TRD says 'simulated analytics', 'before storing in state', and '5 story points',
> should I use Next.js or Vite + React? Justify."

**Outcome:** **Vite + React + TS** chosen. Next.js overkill (no real backend needed).

---

### Prompt 1.3 — ERD + API contracts
**Prompt:**
> "Draft the definitive ERD (Mermaid) and API contracts for the ticket QR worker.
> Include: users, tickets, qr_codes, scan_logs, audit_events.
> Privacy: hash IPs. Support QR versioning with is_active flag."

**Outcome:** ERD + API contracts saved to `docs/architecture.md`.

---

## Phase 2 — Repo Scaffold

### Prompt 2.1 — Scaffold config
**Prompt:**
> "Generate Vite + React + TS scaffold on Arch Linux (BlackArch).
> Include: Tailwind (mono tokens only, no rogue hex), Vitest + RTL + jsdom,
> ESLint (jsx-a11y + no-unused-imports), strict tsconfig, path alias `@/`."

**Outcome:** All config files created. `npm run dev` + `npm run test` verified.

---

## Phase 3 — TDD (Failing tests first)

### Prompt 3.1 — Write test suite
**Prompt:**
> "Write failing tests (Vitest + RTL) covering all Acceptance Criteria:
> AC-01 (form submit → QR renders), AC-02 (list displays), AC-03 (empty state),
> AC-04 (loading spinner), AC-05 (invalid input → aria-invalid),
> AC-06 (XSS sanitize), AC-07 (telemetry log), AC-08 (a11y labels + keyboard).
> Do NOT write implementation yet. Tests must fail first."

**Outcome:** 6 test files created. All failing (RED phase). Implementation deferred to Phase 4.
