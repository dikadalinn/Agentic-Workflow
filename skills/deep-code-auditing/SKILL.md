---
name: deep-code-auditing
description: Systematic code quality audit techniques for QA engineers. Use this skill when performing code reviews, security audits, identifying anti-patterns, finding performance bottlenecks, or verifying adherence to architecture rules before a feature is marked complete. Covers static analysis, security checks, and acceptance criteria validation.
license: MIT
compatibility: opencode
---

# Deep Code Auditing

Apply these techniques when auditing code produced by development agents BEFORE marking a task complete. Your job is to find what others miss.

## The 5-Layer Audit Framework

Run through all 5 layers for every feature review:

### Layer 1: Acceptance Criteria Coverage
- Does the code fulfill **every** user story in the feature spec?
- Are ALL interface states implemented? (Loading, Empty, Error, Success)
- Are edge cases handled? (empty arrays, null values, max-length inputs)
- Does the Happy Path work end-to-end?

### Layer 2: Security Audit
**Backend checks:**
- [ ] Are all inputs validated and sanitized? (No raw user input to DB)
- [ ] Are parameterized queries or ORM used? (No string concatenation in SQL)
- [ ] Are sensitive fields excluded from API responses? (No `password_hash` in JSON)
- [ ] Is authentication enforced on protected routes?
- [ ] Are CORS origins restricted (not `*`)?
- [ ] Are JWT tokens validated correctly (expiry, signature)?

**Frontend checks:**
- [ ] Is user-generated content escaped before rendering? (No `dangerouslySetInnerHTML` with unescaped data)
- [ ] Are API keys / secrets committed to the codebase? (Should be in env vars)
- [ ] Are auth tokens stored safely? (Never `localStorage` for sensitive tokens — use `httpOnly` cookies)

### Layer 3: Architecture Compliance
- Does the code follow the rules in `docs/01-Architecture-And-Rules.md`?
- Are the correct layers used? (No business logic leaking into handlers or UI components)
- Are file/folder naming conventions followed?
- Are dependency directions respected? (No circular imports)

### Layer 4: Performance & Reliability
**Backend:**
- [ ] Are database queries indexed? No full-table scans on user-facing operations
- [ ] Are N+1 query patterns present? (Call `EXPLAIN ANALYZE` mentally)
- [ ] Are external calls (DB, Redis, HTTP) done with context timeouts?
- [ ] Are errors propagated with `fmt.Errorf("%w", err)` (not swallowed)?

**Frontend:**
- [ ] Are lists over 50 items virtualized?
- [ ] Are large components lazy-loaded?
- [ ] Are React re-renders properly controlled? (No unnecessary `useEffect` deps)

### Layer 5: Code Readability & Maintainability
- Is function length reasonable? (< 50 lines as a guideline)
- Are variable names self-explanatory?
- Are complex sections commented with WHY (not WHAT)?
- Is there dead code or commented-out blocks left behind?

## Bug Report Format

When a bug is found, always report it in this exact format:

```
## Bug Report: [Short Title]

**Violated Acceptance Criteria:** [Quote the exact AC from the feature spec]

**Severity:** Critical / High / Medium / Low

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:** [What should happen]
**Actual Behavior:** [What actually happens]

**Suggested Fix:** [Specific, actionable suggestion — not "fix the bug"]

**File(s) Affected:** [Exact file path(s)]
```

## Audit Sign-Off Criteria

Only sign off on a feature when ALL of the following are true:
- [ ] All Acceptance Criteria are met
- [ ] No security vulnerabilities in Layer 2
- [ ] Architecture rules are followed
- [ ] No obvious performance anti-patterns
- [ ] Code is readable and maintainable

If any item is unchecked, file a Bug Report and return to the developer. Do NOT mark the task complete.
