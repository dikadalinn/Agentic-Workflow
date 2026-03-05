---
description: Automates Phase 3 by reading product requirements and generating technical specs and the execution plan.
---

# Architecture & Planning Protocol 🏗️

This workflow automates the Tech Lead phase. It translates the PM's user stories into actionable APIs, database schemas, and a step-by-step developer checklist.

1. **Summon Architect:** The `@tech-lead` takes control.
2. **Global Ingestion:** Read `docs/00-Project-Overview.md` to understand context.
3. **Feature Review:** Use the `list` tool to view all files inside `docs/features/`. Use the `read` tool to systematically read the Business and Product Contexts of every single feature file.
4. **Architect Global Rules:** Read `docs-template/01-Architecture-Template.md`. Generate `docs/01-Architecture-And-Rules.md` defining the exact tech stack, file structure, state management patterns, and security rules.
5. **Enrich Feature Specs:** Iterate through every file in `docs/features/`. Append "Section 3: Technical Specs" to each one. Detail the exact Database Schema (DDL or types), API Endpoints (methods, routes, payloads), and component tree needed for *that specific feature*.
6. **Generate Implementation Plan:** Read `docs-template/02-Implementation-Plan-Template.md`. Generate the master `docs/02-Implementation-Plan.md`. Break down the work into sequential TASKS (e.g., `TASK-1.1: Setup Auth DB Table`, `TASK-1.2: Build Auth UI Components`), ready to be assigned to subagents.
7. **Handoff:** Present the completed Implementation Plan to the user, and advise them on which execution agent (`@frontend-dev` or `@backend-dev`) should be assigned the first task.
