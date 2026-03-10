---
description: Run targeted Quality Assurance and testing on a specific Task, Feature, or Epic without testing the entire project.
---

# Targeted QA Protocol 🧪

This workflow isolates the testing process so the `@qa-engineer` only focuses on a single Feature, Epic, or Task ID, drastically reducing test time, token usage, and preventing scope creep.

1. **Identify the Target:** First, ask the user: *"Which Task ID from the Implementation Plan, or which Feature file, would you like to test right now?"*
2. **Retrieve Context:** Once the user provides the target:
   - Use `read` to open the corresponding feature file in `docs/features/`.
   - Use `read` on `docs/02-Implementation-Plan.md` to understand what code was supposed to be written.
3. **Isolate Acceptance Criteria:** Extract the specific "Product & UX Specs", User Stories, or "Acceptance Criteria" that apply ONLY to this target. Ignore all other features.
4. **Summon the QA Engineer:** Handoff the isolated context to the `@qa-engineer`.
5. **Targeted Execution:** The `@qa-engineer` will use `playwright`, `chrome-devtools`, or run the specific automated test suites targeted *only* at the components/APIs modified for this feature.
6. **Focused Report:** Return a targeted Bug Report (Violated AC, Steps to Reproduce) for the developer, or issue a "Pass" status specifically for this task so the `@tech-lead` can mark it complete.
