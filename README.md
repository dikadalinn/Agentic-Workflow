# Agentic Workflow Factory 🤖

A robust, 4-phase **Hub-and-Spoke** agentic workflow for [Opencode](https://opencode.ai/). This system uses specialized AI agents to autonomously translate raw business requirements (meeting notes, briefs) into fully tested, production-ready code.

## 🌟 The 4-Phase Relay Race

This workflow utilizes a strict chain of command to prevent context bloat and ensure high-quality software architecture:

1. **Phase 1: Business Context (`@business-analyst`)**
   - Ingests rough notes or project briefs.
   - Socratic interrogation to ensure business goals are clear.
   - Scaffolds the `00-Project-Overview.md` and creates Hub-and-Spoke feature templates.
2. **Phase 2: Product Context (`@product-manager`)**
   - Translates business needs into User Stories and UI/UX Design rules.
3. **Phase 3: Tech Context (`@tech-lead`)**
   - The CTO. Defines the global architecture (`01-Architecture-And-Rules.md`).
   - Translates UI/UX into Database Schemas and APIs.
   - Generates the step-by-step `02-Implementation-Plan.md`.
4. **Phase 4: Execution Phase**
   - Directed by the Tech Lead.
   - `@frontend-dev`: Builds the UI using `magic`, `figma`, and modern frontend stacks.
   - `@backend-dev`: Builds APIs and db migrations (using `supabase`).
   - `@qa-engineer`: Conducts isolated testing using `chrome-devtools` and `playwright`.

## 🛠 Prerequisites

To use this workflow, you need Opencode installed globally along with a specific set of **Model Context Protocol (MCP)** servers.

Your global `~/.config/opencode/opencode.json` should have the following MCPs configured:
- `context7`
- `playwright`
- `chrome-devtools`
- `sequential-thinking`
- `github` (Local via `@modelcontextprotocol/server-github`)
- `supabase`
- `duckduckgo`
- `figma`
- `magic`

**Environment Variables Required:**
If using the local Github MCP for the Tech Lead to read/write PRs, ensure you have set your Github Token in your shell:
```bash
export GITHUB_PERSONAL_ACCESS_TOKEN="your_token_here"
```

## ⚡ Custom Commands (Workflows)

We have engineered 5 custom `/slash` commands into this repository to entirely automate the tedious parts of prompting the agents:

* **`/kickoff`**: Run this immediately after placing a client brief into `docs/moms/`. It summons the Business Analyst to automatically scaffold the project files.
* **`/architect`**: Run this after the Product Manager finishes UX. It summons the Tech Lead to automatically generate all technical specs and the Developer Implementation Plan checklist.
* **`/test-task`**: Performs laser-focused QA. Prompts you for a specific Task ID from the plan, and only tests that feature without wasting tokens reading the rest of the app.
* **`/check-out`**: Run this before going to sleep or closing the chat window. It condenses the entire context window into a dense memory file (`.opencode/memory/session-state.md`).
* **`/check-in`**: Run this when opening a brand new chat window. It instantly loads the saved memory so the agent resumes exactly from where it left off, saving massive token context.

## 🚀 Getting Started

1. Clone this repository to use as the base `docs` and `.opencode` folder for your new coding project.
2. Drop your first client brief, meeting notes, or raw ideas into the `docs/moms/` directory as a text file.
3. Open the Opencode chat interface inside this repo.
4. Type `/kickoff` and hit Enter to start the magic!