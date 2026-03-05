---
description: Saves the current session memory and progress to a scratchpad to free up context window.
---

# Check Out Protocol 💾

This workflow is meant to safely "save" your session so you can open a fresh, clean chat window without losing any context or progress.

1. **Analyze Current State:** First, analyze the most recent conversational context and decisions. Read `docs/02-Implementation-Plan.md` (if it exists) to understand exactly where the current execution phase stands.
2. **Compile the Handoff Summary:** Create a deeply detailed summary of:
   * **Active Goal:** What was the immediate task being worked on before this check-out?
   * **Recent Decisions:** What key architectural or product decisions were just made?
   * **Blocking Issues:** Are there any known bugs or blockers currently unfixed?
   * **Next Action:** What exactly should the next agent do when they wake up?
3. **Commit to Memory:** Use the `write` tool to save this summary into `.opencode/memory/session-state.md`. Ensure that previous vital context in that file isn't overwritten carelessly (append if necessary, or rewrite an updated master summary).
4. **Conclusion:** Reply exclusively with a message confirming the session state has been saved, and gracefully instruct the user that they may now safely close this chat window and start a new one.
