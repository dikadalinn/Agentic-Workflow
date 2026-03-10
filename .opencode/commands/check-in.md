---
description: Loads the saved session memory to resume work without losing context.
---

# Check In Protocol 🚀

This workflow is used at the start of a fresh, clean chat window to instantly give the agent all the context from the previous session, drastically saving token context window.

1. **Load Memory:** Use the `read` tool to parse the contents of `.opencode/memory/session-state.md` immediately. 
2. **Contextualize with Docs:** Cross-reference the memory by doing a quick `read` of `docs/00-Project-Overview.md` and `docs/02-Implementation-Plan.md` to ground the memory with the actual project files. 
3. **Resume Briefing:** Briefly summarize to the user what you have learned from the `session-state.md` file. Example: "I see we left off working on the Authentication feature and encountered a Supabase RLS bug. I'm ready to continue!"
4. **Propose Next Steps:** Declare which Agent should take the lead on the immediate next step, and wait for the user's confirmation before executing.
