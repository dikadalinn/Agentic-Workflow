# Feature: Landing Page
**Status:** Tech Architected

---

## 1. Business Context (Owned by @business-analyst)

**Goal:** 
Convert visiting streamers into registered users by clearly communicating Frens' unique value proposition — a song request and donation platform with seamless OBS overlay integration.

**High-Level Flow:**
1. Streamer lands on Frens homepage → 
2. Sees hero section with value prop (donations + music requests + OBS overlays) → 
3. Views feature highlights / social proof → 
4. Clicks CTA to "Get Started" or "Learn More" → 
5. Redirected to Registration flow

**Key Business Rules:**
- Must clearly differentiate from generic donation platforms
- Must emphasize OBS overlay compatibility (works with Twitch, YouTube, Kick, TikTok Live, etc.)
- CTA should drive toward registration, not exploration

---

## 2. Product & UX Specs (Owned by @product-manager)

### User Stories & Acceptance Criteria

**US-01.1: Hero Section Value Proposition**
- **As a** Streamer, **I want to** immediately understand what Frens does and why it's different, **so that** I can decide if it's worth my time.
  - *AC1:* Hero section displays within 1 second of page load
  - *AC2:* Headline clearly states "Song requests + donations for streamers"
  - *AC3:* Subheadline mentions OBS overlay compatibility
  - *AC4:* Primary CTA "Get Started" is visible above the fold

**US-01.2: Platform Agnostic Messaging**
- **As a** Streamer on any platform (Twitch, YouTube, Kick, TikTok Live), **I want to** see that Frens works with my streaming setup, **so that** I feel included regardless of platform.
  - *AC1:* Landing page displays logos/icons of major streaming platforms (Twitch, YouTube, Kick, TikTok)
  - *AC2:* Copy emphasizes "Works with OBS" rather than platform-specific language
  - *AC3:* No exclusive partnership messaging that alienates certain platforms

**US-01.3: Feature Showcase**
- **As a** Streamer, **I want to** see the key features visually explained, **so that** I understand the full value before signing up.
  - *AC1:* 3-4 feature cards/blocks highlight: Donations, Music Requests, OBS Overlays, Analytics
  - *AC2:* Each feature has an icon, title, and 1-2 sentence description
  - *AC3:* Visual preview (screenshot/mockup or animation) of OBS overlay in action

**US-01.4: Social Proof**
- **As a** Streamer, **I want to** see that other streamers use Frens, **so that** I trust the platform is legitimate.
  - *AC1:* Testimonials section with streamer quotes and profile pictures (or placeholder for MVP)
  - *AC2:* Optional: "Trusted by X streamers" counter (even if mocked for MVP)
  - *AC3:* Logos of partnered streamers or communities (if applicable)

**US-01.5: Clear Call-to-Action**
- **As a** Streamer, **I want to** easily find how to get started, **so that** I can sign up without friction.
  - *AC1:* Primary CTA "Get Started" in hero section
  - *AC2:* Secondary CTA "Learn More" scrolls to features section
  - *AC3:* Sticky header with CTA button always visible when scrolling
  - *AC4:* CTA button uses premium modern orange accent color

**US-01.6: Navigation & Footer**
- **As a** Streamer, **I want to** access additional information (pricing, FAQ, login), **so that** I can learn more or return if I already have an account.
  - *AC1:* Header navigation includes: Logo, Features, Pricing (placeholder), Login
  - *AC2:* Footer includes: Logo, Product links, Company links, Social media icons
  - *AC3:* "Login" link redirects to authentication page

---

### UI Design Intent & States

> **Design Intent:** Friendly, approachable, yet premium and modern. The page should feel energetic and creator-focused, with the **Premium Modern Orange** accent color drawing attention to CTAs and key elements. Avoid cluttered layouts — breathe with whitespace. Aim for an emotional connection: "This was made for streamers like me."

---

#### Page Structure (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Sticky)                                            │
│  [Logo]              Features  Pricing  [Login] [Get Started]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO SECTION                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  "Turn Song Requests into Donations"                │   │
│  │  Sub: The OBS-ready platform for streamers          │   │
│  │                                                     │   │
│  │  [Platform Icons: Twitch | YouTube | Kick | TikTok] │   │
│  │                                                     │   │
│  │  [Get Started - Primary CTA]  [Learn More]          │   │
│  │                                                     │   │
│  │  [Hero Visual: OBS Overlay Preview Animation]       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FEATURE HIGHLIGHTS (3-4 Cards)                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ 🎵 Music │  │ 💸 Donate│  │ 🖥️ OBS   │  │ 📊 Stats │   │
│  │ Requests │  │ & Earn   │  │ Overlays │  │ Dashboard│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HOW IT WORKS (3 Steps)                                     │
│  1. Sign Up → 2. Add to OBS → 3. Start Earning             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SOCIAL PROOF / TESTIMONIALS                                │
│  [Streamer Avatar + Quote + Name]                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FINAL CTA SECTION                                          │
│  "Ready to engage your audience?"                           │
│  [Get Started - Large CTA]                                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
│  [Logo]  [Product Links]  [Social Icons]  [Copyright]       │
└─────────────────────────────────────────────────────────────┘
```

---

#### Interface States

**Normal State:**
- Hero section fully visible with animation (OBS overlay preview)
- All feature cards render with hover effects
- CTAs are interactive with hover state (slight scale + color shift)
- Smooth scroll behavior for "Learn More"

**Loading State:**
- Skeleton placeholders for hero visual
- Feature cards appear with staggered fade-in animation

**Mobile State:**
- Hero stacks vertically (headline → subheadline → platform icons → CTA → visual)
- Feature cards become horizontal scroll or 2-column grid
- Sticky header collapses to hamburger menu
- CTA buttons full-width

**Error State (rare):**
- If hero visual fails to load, fallback to static gradient background
- Feature cards remain functional

---

### Design Tokens (Reference)

| Token | Value |
|:------|:------|
| Primary Accent | Premium Modern Orange (#FF6B35 or similar) |
| Background | Light/White (#FFFFFF, #FAFAFA) |
| Text Primary | Dark (#1A1A2E) |
| Text Secondary | Gray (#6B7280) |
| Font Family | System stack or modern sans-serif (Inter, DM Sans) |
| Border Radius | 8px - 12px (friendly, not sharp) |
| Shadow | Soft elevation (0 4px 20px rgba(0,0,0,0.08)) |

---

## 3. Technical Specs (Owned by @tech-lead)

### MVP Implementation (Frontend Only)

**Components:**
| Component | Path | Description |
|:----------|:-----|:------------|
| `LandingPage` | `src/app/(marketing)/page.tsx` | Main landing page route |
| `HeroSection` | `src/components/landing/hero-section.tsx` | Hero with CTA |
| `FeatureCards` | `src/components/landing/feature-cards.tsx` | 4 feature highlights |
| `HowItWorks` | `src/components/landing/how-it-works.tsx` | 3-step process |
| `Testimonials` | `src/components/landing/testimonials.tsx` | Social proof section |
| `FinalCTA` | `src/components/landing/final-cta.tsx` | Bottom CTA section |
| `SiteHeader` | `src/components/layout/site-header.tsx` | Sticky header |
| `SiteFooter` | `src/components/layout/site-footer.tsx` | Footer with links |

**Mock Data Structure:**
```typescript
// src/lib/mock-data.ts
export const MOCK_TESTIMONIALS = [
  {
    id: "1",
    name: "StreamerName",
    avatar: "/images/testimonials/avatar-1.jpg",
    quote: "Frens transformed how I interact with my audience!",
    platform: "Twitch",
  },
  // ... more testimonials
];

export const FEATURE_HIGHLIGHTS = [
  {
    icon: "Music",
    title: "Music Requests",
    description: "Let viewers request songs with their donations",
  },
  // ... more features
];
```

**Routing:**
- `/` → Landing Page
- `/login` → Authentication
- `/register` → Authentication

---

### Post-MVP: Database Schema

```sql
-- No database tables required for Landing Page
-- This is a static marketing page

-- Future: Analytics tracking
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page VARCHAR(255) NOT NULL,
  visitor_id UUID,
  referrer VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### Post-MVP: API Endpoints

| Method | Endpoint | Purpose | Auth |
|:-------|:---------|:--------|:-----|
| `POST` | `/api/v1/analytics/pageview` | Track page views | None |

**Payload:**
```typescript
{
  page: string;
  referrer?: string;
  visitorId?: string;
}
```
