---
description: Automates Phase 1 by reading project briefs and scaffolding the initial project documents.
---

# Project Kickoff Protocol 🚀

This workflow automates the Business Analyst phase. Instead of manually explaining the project, you just run this command to parse your meeting notes and scaffold the documentation.

1. **Summon Analyst:** The `@business-analyst` takes control.
2. **Ingest Context:** Use the `list` or `read` tools to check the `docs/moms/` directory. Read the most recent meeting notes, client briefs, or PRDs found there.
3. **Proactive Interrogation (Check 1):** Before writing any documents, analyze the brief. Does it lack fundamental business goals, a clear target audience, or a definition of success? If so, stop and ask the user a maximum of 3 highly critical clarification questions. Wait for the user's response.
4. **Scaffold Project Overview:** If the context is sufficient, read the `docs-template/00-Project-Overview-Template.md`. Create a new file `docs/00-Project-Overview.md` filled with the parsed business context.
5. **Scaffold Feature Spokes:** Identify the core modules/features from the brief. Read `docs-template/Feature-Template.md`. For each major feature, create a file in `docs/features/` (e.g., `01-Authentication.md`, `02-Dashboard.md`) and fill out *only* "Section 1: Business Context". Leave the PM and TL sections blank.
6. **Handoff:** Present the created files to the user for approval. Once approved, instruct the user to call the `@product-manager` to begin defining the UX.
