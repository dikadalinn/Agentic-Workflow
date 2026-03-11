# 🔴 Red Team Report — Phase 3: Technical Architecture

**Target:** @tech-lead's Architecture Rules and Implementation Plan
**Date:** 2026-03-10
**Red Team Agent:** @devils-advocate

---

## Executive Summary

This report challenges the technical architecture and implementation plan for Frens MVP. The core finding is a **fundamental architectural flaw**: localStorage cannot support the core real-time sync feature, making the MVP unable to demonstrate its value proposition.

**Confidence Score: 40/100** — Significant re-architecture required before proceeding.

---

## Hard Blockers (Must resolve before proceeding)

### HB-1: localStorage Architecture Cannot Support Core Feature

**Issue:** The entire state management strategy relies on localStorage:

```typescript
// From architecture doc:
"Store in localStorage: 'frens_user'"
"Store in localStorage: 'frens_onboarding'"
"Store in localStorage: 'frens_settings'"
```

BUT the core OBS overlay feature requires cross-context communication between:

1. **Dashboard** (streamer's main browser at frens.app/dashboard)
2. **OBS Overlay** (OBS Browser Source at frens.app/overlay/player/:streamerId)
3. **Viewer Profile** (viewer's browser at frens.app/username)

**localStorage is NOT shared across these contexts.** This is a fundamental architecture failure.

**Why this is fatal:** The MVP cannot demonstrate its core value proposition (real-time OBS sync) with this architecture.

**Counterproposal:**

```typescript
// MVP Solution: BroadcastChannel API (same-origin)
const channel = new BroadcastChannel('frens_sync')

// Dashboard publishes updates
channel.postMessage({ type: 'QUEUE_UPDATE', data: queue })

// Overlay subscribes
channel.onmessage = (event) => {
  if (event.data.type === 'QUEUE_UPDATE') {
    updateQueue(event.data.data)
  }
}
```

---

### HB-2: YouTube API Error Handling — Non-Existent

**Issue:** The architecture doc shows:

```typescript
export async function searchMusicVideos(query: string): Promise<YouTubeSearchResult[]>
```

But there's NO error handling for:

- API key quota exceeded (10,000 units/day)
- Network failures
- Invalid video IDs
- YouTube API downtime

**Why this is fatal:** When YouTube API fails (which it will), the entire viewer donation flow breaks silently.

**Counterproposal:**

```typescript
export async function searchMusicVideos(
  query: string
): Promise<Result<YouTubeSearchResult[], YouTubeError>> {
  try {
    // Check quota before making request
    if (await isQuotaExhausted()) {
      return {
        success: false,
        error: { code: 'QUOTA_EXHAUSTED', message: 'Search temporarily unavailable' }
      };
    }

    const response = await fetch(...);

    if (!response.ok) {
      return {
        success: false,
        error: { code: 'API_ERROR', message: 'Failed to search. Please try again.' }
      };
    }

    return { success: true, data: parseResults(data) };
  } catch (error) {
    return {
      success: false,
      error: { code: 'NETWORK_ERROR', message: 'Network error. Please check your connection.' }
    };
  }
}
```

---

### HB-3: No State Persistence Strategy for Refresh/Reload

**Issue:** Zustand stores are in-memory. On page refresh:

- Auth state is lost (user appears logged out)
- Queue state is lost
- Player state is lost
- Settings are lost

This defeats the "Remember me" functionality specified in auth.

**Why this is fatal:** Users will be confused when their session disappears on refresh.

**Counterproposal:**

```typescript
// Add persist middleware to Zustand
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      // ...
    }),
    { name: 'frens_auth' } // Key for localStorage
  )
)
```

---

## Assumptions Under Fire

| Assumption                                     | What happens if wrong?                            | Validation Question                                               |
| ---------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| Next.js App Router is the right choice         | SSR complexity, hydration issues with YouTube API | Have you tested YouTube IFrame in Next.js App Router?             |
| Zustand is sufficient for global state         | Complex cross-component state sync issues         | Have you evaluated Jotai or Redux for complex sync scenarios?     |
| 108 tasks is manageable scope                  | Scope creep, timeline risk                        | What's the minimum viable subset for PMF validation?              |
| YouTube "music category" filter works reliably | Inaccurate search results, frustrated users       | Test with real queries. Does videoCategoryId=10 work as expected? |

---

## Blindspots Detected

| Missing Consideration         | Consequence if Ignored                                                            |
| ----------------------------- | --------------------------------------------------------------------------------- |
| **No testing strategy**       | 108 tasks but no test plan. Unit tests? E2E tests? CI/CD?                         |
| **No performance monitoring** | How will you know if OBS overlay causes frame drops?                              |
| **No bundle size analysis**   | What's the expected JS bundle size for overlay? Streamers have limited bandwidth. |
| **No error tracking**         | Sentry? LogRocket? No error monitoring planned.                                   |
| **No CI/CD pipeline**         | How will deployments work? Manual?                                                |
| **No security headers**       | CSP, X-Frame-Options, etc. not documented.                                        |

---

## Counterproposals

| Original Decision          | Better Alternative                                                                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| localStorage for all state | localStorage for auth/settings ONLY. BroadcastChannel for real-time sync.                                                                       |
| 108 tasks in one MVP       | **Reduce to 40 tasks**: Landing + Auth + Onboarding + OBS Overlay Preview (static) + Viewer Profile (no real payment). Validate interest FIRST. |
| No error handling          | Result pattern for ALL async operations. Error boundaries for all components.                                                                   |
| No testing                 | Add Playwright E2E tests for critical flows (auth, donation, OBS sync).                                                                         |
| No bundle monitoring       | Add bundle size check to CI. Target: < 100KB for overlay route.                                                                                 |

---

## Scope Reduction Recommendation

The current 108-task implementation plan is too ambitious for an MVP focused on validation.

**Recommended Minimum Viable Scope (40 tasks):**

| Epic                 | Tasks | Rationale                  |
| -------------------- | ----- | -------------------------- |
| Phase 0: Setup       | 8     | Required                   |
| Epic 1: Landing Page | 9     | Required for acquisition   |
| Epic 2: Auth         | 11    | Required for identity      |
| Epic 3: Onboarding   | 10    | Required for profile       |
| Epic 5: OBS Overlays | 2     | Preview only, no real sync |

**Deferred to Post-Validation:**

- Epic 4: Dashboard (requires backend)
- Epic 6: Player & Queue (requires backend + sync)
- Epic 7: Donation Settings (requires backend)
- Epic 8: Viewer Profile (requires backend + payments)
- Epic 9: Integration (requires everything else)

---

## 📊 Confidence Score: 40/100

**Rationale:** The technical architecture has a **fundamental flaw** (localStorage vs real-time sync) that makes the core feature impossible to demonstrate. YouTube API error handling is missing. No persistence strategy for refresh scenarios. No testing plan. No performance monitoring. The 108-task scope is too large for an MVP.

**Recommendation:** Significant re-architecture required before proceeding. Focus on validation-first scope reduction.
