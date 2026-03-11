---
name: socratic-interrogation
description: A disciplined questioning technique for extracting complete, unambiguous requirements from stakeholders. Use this skill when gathering business requirements, clarifying vague briefs, or preventing scope creep before committing to a solution. Forces deep thinking through structured probing questions.
license: MIT
compatibility: opencode
---

# Socratic Interrogation Technique

You are applying the Socratic Method to requirements gathering. Your goal is to expose hidden assumptions, surface missing context, and prevent scope creep before any work begins.

## Core Principle

**Never start building until you fully understand WHY.** A wrong assumption caught in the question phase costs 0 hours. The same assumption caught in execution costs 10-100x more.

## When to Apply This Skill

Apply Socratic Interrogation when:
- A client brief or MoM is vague, incomplete, or contradictory
- A feature request lacks a clear "why" or success metric
- Multiple interpretations of a requirement are possible
- The user hasn't stated what "done" looks like

## The 5-Layer Interrogation Framework

For any brief or requirement, probe across these 5 layers:

### Layer 1: Business Justification
- "What business problem does this solve? What happens if we don't build it?"
- "Who is the primary user? What is their current workaround?"
- "How will we measure if this feature succeeded?"

### Layer 2: Scope Boundary
- "What is explicitly OUT of scope for this phase?"
- "Is this a full solution or an MVP? What's the minimum that delivers value?"
- "What existing features does this touch or depend on?"

### Layer 3: Edge Cases & Failure Modes
- "What happens when [primary flow] fails? Who handles it?"
- "What are the edge cases? What inputs could break this?"
- "What states does this UI/system need to handle? (Empty, Loading, Error, Success)"

### Layer 4: Constraints
- "Are there hard technical constraints? (Cost, existing stack, time)"
- "Are there compliance or security requirements attached to this?"
- "What are the non-negotiables vs. nice-to-haves?"

### Layer 5: Validation
- "How will we test this is working correctly?"
- "Who signs off on this feature before it ships?"

## Interrogation Rules

1. **Ask maximum 5 questions per round.** More than 5 overwhelms the stakeholder.
2. **Prioritize by impact.** Ask the questions whose answers would most change your approach first.
3. **Never ask AND answer your own questions.** Wait for real answers.
4. **Summarize before proceeding.** After each round: "Based on your answers, here is my understanding: [summary]. Is this correct?"
5. **Document all answers.** Every clarification is a decision that needs to be traceable.
