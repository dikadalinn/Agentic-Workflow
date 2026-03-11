# 🤖 Agentic Workflow Factory

> A production-ready, 4-phase **Hub-and-Spoke agentic workflow** for [Opencode](https://opencode.ai/).  
> Designed by **Enigma Ventures** to autonomously translate raw client briefs into fully-documented, test-ready software features.

---

## ✨ What This Is

This repository is a **reusable project template** for AI-assisted software development. Clone it as the foundation of any new project to instantly get a structured team of specialized AI agents that collaborate across 4 clearly defined phases — complete with built-in quality gates, session memory, and automated document scaffolding.

---

## 🔄 The 4-Phase Relay Race

Each phase is handled by a specialized agent. They pass context forward through a shared document system, never stepping on each other's toes.

| Phase | Agent | Responsibility |
|---|---|---|
| **1 — Business Context** | `@business-analyst` | Interrogates client briefs → creates Project Overview & Feature skeletons |
| **2 — Product Context** | `@product-manager` | Enriches features with User Stories & UI/UX design intent |
| **3 — Technical Context** | `@tech-lead` | Adds architecture rules, DB schemas, API specs & Implementation Plan |
| **4 — Execution** | `@frontend-dev` `@backend-dev` `@qa-engineer` | Executes tasks from the Implementation Plan |

> 🔴 **At any phase boundary**, optionally call `@devils-advocate` via `/challenge` to Red Team the output before proceeding.

---

## 🔴 The Devil's Advocate

A dedicated **Red Team agent** that challenges assumptions across all phases. It issues a structured **Red Team Report** with:
- Hard Blockers (must resolve before proceeding)
- Assumptions Under Fire
- Blindspots Detected
- Counterproposals
- **Confidence Score** (out of 100)

Invoke it at any point with `/challenge`.

---

## ⚡ Slash Commands

| Command | When | What it does |
|---|---|---|
| `/kickoff` | After dropping a brief into `docs/moms/` | Summons `@business-analyst` to scaffold all project docs |
| `/architect` | After PM finishes UX enrichment | Summons `@tech-lead` to generate architecture + Implementation Plan |
| `/challenge` | At any phase gate | Summons `@devils-advocate` to Red Team the current phase output |
| `/test-task` | During execution phase | Runs focused QA on a single specific task (requires Task ID) |
| `/check-out` | Before closing the session | Saves session context to `docs/_inbox/session-state.md` |
| `/check-in` | At the start of a new session | Loads saved context so agents resume exactly where you left off |

---

## 🛠 Prerequisites

### 1. Install Opencode
```bash
npm install -g opencode-ai
```

### 2. Configure Global MCPs

Add the following to your `~/.config/opencode/opencode.json`:

| MCP Key | Purpose | Type |
|---|---|---|
| `context7` | Documentation & code retrieval | Remote (API key required) |
| `sequential-thinking` | Deep reasoning chains | `npx @modelcontextprotocol/server-sequential-thinking` |
| `duckduckgo` | Real-time web search | `uvx duckduckgo-mcp-server` |
| `playwright` | Browser automation for QA | `npx @playwright/mcp@latest` |
| `chrome-devtools` | DOM inspection for QA | `npx chrome-devtools-mcp@latest` |
| `github` | PR / repo management | `npx @modelcontextprotocol/server-github` |
| `supabase` | Database management | Remote |
| `figma` | Design reference reading | Figma desktop app (runs on `localhost:3845`) |
| `magic` | UI component generation | `npx @21st-dev/magic@latest` (API key required) |

### 3. Required Environment Variables
```bash
export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_your_token_here"
export CONTEXT7_API_KEY="your_key_here"
```

### 4. Install Global Skills

Skills are stored in `~/.agents/skills/`. Install community skills via [skills.sh](https://skills.sh):

```bash
# Redis patterns (from Redis official)
npx skills add redis/agent-skills

# Meta-skill: helps agents discover new skills
npx skills add vercel-labs/skills
```

Then **manually copy** the 6 custom skills from this repo's `skills/` folder to your global skills directory:

```bash
cp -r skills/socratic-interrogation ~/.agents/skills/
cp -r skills/go-toolkit-architecture ~/.agents/skills/
cp -r skills/dynamic-api-patterns     ~/.agents/skills/
cp -r skills/modern-ui-implementation ~/.agents/skills/
cp -r skills/deep-code-auditing       ~/.agents/skills/
cp -r skills/go-conventions           ~/.agents/skills/
```

---

## 🚀 Getting Started

```bash
# 1. Clone this repo into your new project directory
git clone https://github.com/dikadalinn/Agentic-Workflow.git my-new-project
cd my-new-project

# 2. Drop your client brief or meeting notes into docs/moms/
# (any .md or .txt file works)

# 3. Open Opencode in the project folder
opencode

# 4. Type /kickoff and hit Enter
```

The `@business-analyst` will automatically read your brief and begin Phase 1.

---

## 📁 Repository Structure

```
.opencode/
├── agents/
│   ├── business-analyst.md     # Phase 1 — Business Context
│   ├── product-manager.md      # Phase 2 — Product & UX
│   ├── tech-lead.md            # Phase 3 — Architecture & Plan
│   ├── devils-advocate.md      # Quality Gate — Red Teaming
│   └── subagent/
│       ├── backend-dev.md      # Phase 4 — Backend execution
│       ├── frontend-dev.md     # Phase 4 — Frontend execution
│       └── qa-engineer.md      # Phase 4 — Testing & QA
├── commands/
│   ├── kickoff.md              # /kickoff command
│   ├── architect.md            # /architect command
│   ├── challenge.md            # /challenge command
│   ├── test-task.md            # /test-task command
│   ├── check-in.md             # /check-in command
│   └── check-out.md            # /check-out command
└── memory/
    └── session-state.md        # Session memory template

skills/                         # Custom SKILL.md definitions
├── socratic-interrogation/     # Requirements interrogation technique
├── go-toolkit-architecture/    # Go project scaffolding & clean arch
├── dynamic-api-patterns/       # RESTful API design patterns
├── modern-ui-implementation/   # Premium React UI patterns
├── deep-code-auditing/         # 5-layer code audit framework
└── go-conventions/             # Idiomatic Go code conventions

docs-template/                  # Document scaffolding templates
├── 00-Project-Overview-Template.md
├── Feature-Template.md
├── 01-Architecture-Template.md
└── 02-Implementation-Plan-Template.md

docs/                           # Generated during workflow (gitignored content)
├── moms/                       # Drop your briefs/meeting notes here
├── features/                   # Auto-generated feature specs
├── red-team/                   # Red Team report outputs
└── _inbox/                     # Session memory & scratchpads
```

---

## 🧠 Agent Skills Map

Each agent is pre-loaded with only the skills relevant to its role — no overlap, no redundancy.

| Agent | Key Skills |
|---|---|
| `@business-analyst` | `socratic-interrogation`, `brainstorming`, `writing-plans`, `writing-skills` |
| `@product-manager` | `ui-ux-pro-max`, `frontend-design`, `doc-coauthoring`, `writing-skills` |
| `@tech-lead` | `architecture-patterns`, `api-design-principles`, `dispatching-parallel-agents`, `using-git-worktrees` |
| `@devils-advocate` | `socratic-interrogation`, `systematic-debugging`, `architecture-patterns`, `find-skills` |
| `@backend-dev` | `go-toolkit-architecture`, `go-conventions`, `dynamic-api-patterns`, `redis-development` |
| `@frontend-dev` | `modern-ui-implementation`, `vercel-react-best-practices`, `canvas-design` |
| `@qa-engineer` | `deep-code-auditing`, `webapp-testing`, `test-driven-development` |

---

## 📄 License

MIT — use freely, adapt for your own workflow.