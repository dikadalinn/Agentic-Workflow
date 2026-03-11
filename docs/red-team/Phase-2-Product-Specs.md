# 🔴 Red Team Report — Phase 2: Product Specs

**Target:** @product-manager's User Stories and UX Design
**Date:** 2026-03-10
**Red Team Agent:** @devils-advocate

---

## Executive Summary

This report challenges the product specifications and UX design for Frens MVP. The core finding is a **fundamental architecture-UX mismatch**: the user stories assume real-time sync between dashboard and OBS overlay, but the technical architecture cannot deliver this.

**Confidence Score: 55/100** — Critical sync issue must be resolved before proceeding.

---

## Hard Blockers (Must resolve before proceeding)

### HB-1: Real-Time Sync Architecture Gap — CRITICAL

**Issue:** The UX design assumes real-time sync between:

- Dashboard (streamer controls music)
- OBS Overlay (displays in OBS Browser Source)
- Viewer Profile (receives donations)

BUT the tech architecture uses **localStorage** which:

- Is NOT shared across browser contexts
- OBS Browser Source runs in isolated context
- Cannot sync with dashboard

**Why this is fatal:** The core feature (OBS overlay sync) **CANNOT WORK** with the chosen architecture. This isn't an edge case — it's the main value proposition.

**Counterproposal:**

- **MVP Option A:** Use BroadcastChannel API with same origin for dashboard-to-overlay communication (limited but works)
- **MVP Option B:** Use URL polling in overlay (poll every 2 seconds for updates)
- **Post-MVP:** WebSockets via Supabase Realtime (already planned)

---

### HB-2: YouTube API Quota — Naive Assumption

**Issue:** 10,000 units/day quota. Search = 100 units. That's 100 searches per day total, not per user.

**Why this is fatal:**

- No per-user quota management
- No caching strategy beyond "5 min TTL client-side"
- No fallback when quota exhausted
- What happens when a streamer gets 10+ viewers in one stream?

**Counterproposal:**

- Implement server-side caching with Redis/Vercel KV (post-MVP)
- For MVP: Use sessionStorage with longer TTL + request deduplication
- Add quota monitoring UI showing remaining quota
- Implement graceful degradation: "Search temporarily unavailable" instead of silent failure

---

### HB-3: Viewer Profile Security — No Protections

**Issue:** Viewers can access profiles without authentication. No rate limiting. No bot protection.

**Why this is fatal:**

- Spam donation attacks (even mock)
- Bot scraping profile data
- No CAPTCHA or verification
- Potential for abuse even in MVP testing

**Counterproposal:**

- Add Cloudflare Turnstile (free, invisible CAPTCHA)
- Implement rate limiting per IP (even for MVP)
- Add honeypot detection for suspicious patterns

---

## Assumptions Under Fire

| Assumption                                           | What happens if wrong?                                      | Validation Question                                                              |
| ---------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Viewers will complete multi-step donation flow       | High drop-off at each step                                  | What's the expected conversion rate? Funnel analysis?                            |
| Streamers will understand the queue management UI    | Streamers struggle with complex queue controls              | User test with 5 streamers. Can they figure out queue management in < 5 minutes? |
| YouTube search results will be relevant              | Music category filter doesn't work well, irrelevant results | Test with 20 real song searches. Are results what users expect?                  |
| Mock payment success/failure rate (95%) is realistic | Real payment failure rates differ significantly             | What's the actual failure rate for similar platforms?                            |

---

## Blindspots Detected

| Missing Consideration                        | Consequence if Ignored                                                     |
| -------------------------------------------- | -------------------------------------------------------------------------- |
| **No error states for YouTube API failures** | What happens when YouTube API is down? No fallback UX.                     |
| **No accessibility audit**                   | Screen reader support? Keyboard navigation? Color contrast? Not specified. |
| **No mobile-first consideration**            | Mobile layouts are "adapted" from desktop, not designed mobile-first.      |
| **No empty state for search when offline**   | PWA/offline support not considered.                                        |
| **No content moderation**                    | Inappropriate songs, explicit lyrics, harassment in donor messages.        |

---

## Counterproposals

| Original Decision                              | Better Alternative                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| Real-time sync via localStorage                | Use BroadcastChannel API for MVP (same-origin works) or URL polling |
| 5-minute client-side cache for YouTube results | 15-minute cache + stale-while-revalidate pattern                    |
| No rate limiting on viewer profile             | Cloudflare rate limiting (free tier) + IP-based throttling          |
| No error boundary for YouTube failures         | Add error boundary with retry UI and fallback to cached results     |

---

## Missing Edge Cases

The following scenarios are NOT addressed in any user story:

| Scenario                                                           | Risk Level |
| ------------------------------------------------------------------ | ---------- |
| Song removed from YouTube (deleted/private)                        | High       |
| Donation made but song is 10+ minutes (streamer doesn't want this) | Medium     |
| Donor spams queue with 50 requests                                 | High       |
| Streamer goes offline mid-stream                                   | Medium     |
| Two donors request same song simultaneously                        | Low        |
| YouTube video has ads that play mid-stream                         | High       |

---

## 📊 Confidence Score: 55/100

**Rationale:** The UX design is thoughtful, but the technical architecture **directly contradicts** the core feature (real-time OBS sync). YouTube API handling is naive. Security is an afterthought. The sync issue alone makes the MVP incapable of demonstrating the core value proposition.

**Recommendation:** Resolve sync architecture before proceeding to implementation.
