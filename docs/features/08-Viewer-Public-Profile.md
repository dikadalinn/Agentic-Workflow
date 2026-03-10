# Feature: Viewer Public Profile (Donation Flow)
**Status:** Tech Architected

---

## 1. Business Context (Owned by @business-analyst)

**Goal:** 
Provide a completely frictionless experience for viewers to access a streamer's profile, search for songs, and complete a donation — all **without requiring login**.

**High-Level Flow:**
1. Viewer accesses streamer's public profile URL (e.g., frens.app/username) → 
2. Views streamer's profile (bio, profile image) → 
3. Uses search bar to find a song (YouTube Music integration) → 
4. Selects song from search results → 
5. Enters donation amount + custom message → 
6. Completes mock payment checkout → 
7. Song added to streamer's queue + donation alert triggered

**Key Business Rules:**
- **NO authentication required** for viewers (frictionless)
- Search must filter to YouTube "music" category only
- Donation amount must meet streamer's minimum (if set)
- Mock payment simulates success/failure scenarios

---

## 2. Product & UX Specs (Owned by @product-manager)

### User Stories & Acceptance Criteria

---

#### Public Profile Page

**US-08.1: Frictionless Profile Access**
- **As a** Viewer, **I want to** access a streamer's public profile without logging in, **so that** I can quickly request a song.
  - *AC1:* Profile accessible via direct URL: `frens.app/{username}`
  - *AC2:* No login, authentication, or sign-up required
  - *AC3:* Page loads in under 2 seconds
  - *AC4:* Redirect to 404 if profile doesn't exist

**US-08.2: Profile Display**
- **As a** Viewer, **I want to** see the streamer's profile information, **so that** I know who I'm supporting.
  - *AC1:* Profile shows: Streamer avatar, display name, bio
 profile image
  - *AC2:* Clean, minimal design — streamer-focused
  - *AC3:* Optional: Social links if configured (Twitch, YouTube, etc.)

**US-08.3: Song Search**
- **As a** Viewer, **I want to** search for a specific song, **so that** I can request it for the donation flow.
  - *AC1:* Search bar with placeholder: "Search for a song..."
  - *AC2:* Search queries YouTube Data API v3 (music category filter)
  - *AC3:* Results show: Song title, Artist, Duration, Thumbnail
  - *AC4:* Loading state while searching (spinner, skeleton)
  - *AC5:* "No results found" state if no matches
  - *AC6:* Debounce search (300ms delay after typing stops)

**US-08.4: Song Selection**
- **As a** Viewer, **I want to** select a song from search results, **so that** I can proceed to the donation flow.
  - *AC1:* Click on song shows detail modal with more info
  - *AC2:* Modal shows: Full thumbnail, Song title, Artist, Duration, YouTube views
  - *AC3:* "Select this song" button to proceed to checkout
  - *AC4:* Can close modal and return to search results
  - *AC5:* Keyboard navigation supported (arrow keys, Tab)

**US-08.5: Donation Checkout**
- **As a** Viewer, **I want to** complete a donation with a custom message, **so that** the song gets requested and the streamer gets thanked.
  - *AC1:* Checkout shows: Selected song info, Donation amount input, Custom message textarea
  - *AC2:* Donation amount must meet minimum (if streamer has set one)
  - *AC3:* Custom message field: Max 200 characters
  - *AC4:* "Donate" button triggers mock payment flow
  - *AC5:* Real-time validation on all fields
  - *AC6:* Clear breakdown of total: Platform fee + Donation amount (visible to viewer)

**US-08.6: Mock Payment Processing**
- **As a** Viewer, **I want to** see a simulated payment processing screen, **so that** I understand what's happening.
  - *AC1:* Processing state with spinner and "Processing your donation..."
  - *AC2:* Success state: Confetti animation + success message
  - *AC3:* Success message: "Thank you! Your song request has been sent to {streamer_name}"
  - *AC4:* "Request Another Song" button to return to search
  - *AC5:* Failure state: Error message + "Try Again" button

**US-08.7: Recent Donations (Social Proof)**
- **As a** Viewer, **I want to** see recent donations on the streamer's profile, **so that** I know others are actively donating.
  - *AC1:* Shows last 5 donations (scrollable list)
  - *AC2:* Each donation shows: Donor name, Amount, Song, Time ago
  - *AC3:* "View All" link expands to full donation history
  - *AC4:* Empty state if no donations: "Be the first to donate!"

---

### UI Design Intent & States

> **Design Intent:** Frictionless, fun, and fast. The viewer experience should feel effortless and exciting — like a game where you just tap a button to request a song. No barriers, no friction. The Premium Modern Orange accent color draws attention to CTAs. Clean, minimal design with lots of whitespace.

---

#### Page Structure (Desktop - Profile View)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Minimal)                                        │
│  [Streamer Avatar]  [Streamer Name]              [Share]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PROFILE HERO                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ┌─────────────────┐                              │   │
│  │  │  [Avatar - 120px]  │  Bio text             │   │
│  │  │                  │  Streamer Name        │   │
│  │  │                  │  Platform badges        │   │
│  │  └─────────────────┘                              │   │
│  │                     │                              │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  🔍 Search for a song...                    │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ──────────────────────────────────────────────────────── │
│  SEARCH RESULTS (Grid)                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  Thumbnail  │  │  Thumbnail  │  │  Thumbnail  │   │
│  │  Song Title  │  │  Song Title  │  │  Song Title  │   │
│  │  Artist     │  │  Artist     │  │  Artist     │   │
│  │  Duration   │  │  Duration   │  │  Duration   │   │
│  │  [Select]   │  │  [Select]   │  │  [Select]   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                             │
│  ──────────────────────────────────────────────────────── │
│  RECENT DONATIONS (Optional)                               │
│  "Recent Donations"                          │
│  ┌───────────────────────────────────────────────────┐   │
│  │  💸 $5.00 from @user - "Song Name" - 2m ago   │   │
│  │  💸 $3.00 from @viewer - "Song Title" - 5m ago  │   │
│  │  💸 $10.00 from @fan - "Song Name" - 1h ago  │   │
│  └───────────────────────────────────────────────────┘   │
│  [View All →]                                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Page Structure (Desktop - Song Detail Modal)

```
┌─────────────────────────────────────────────────────────────┐
│  OVERLAY (Dark background)                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Close X]                                       │   │
│  │                                                 │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  [Large Thumbnail - 200px]              │   │   │
│  │  │                                     │   │   │
│  │  │  Song Title                            │   │   │
│  │  │  Artist Name                           │   │   │
│  │  │  Duration: 3:45                         │   │   │
│  │  │  YouTube Views: 1.2M views           │   │   │
│  │  │                                     │   │   │
│  │  │  [Select this song] - Primary CTA          │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Page Structure (Desktop - Checkout Flow)

```
┌─────────────────────────────────────────────────────────────┐
│  CHECKOUT SIDEBAR/PAGE                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Back to Search]                               │   │
│  │                                                 │   │
│  │  SELECTED SONG                                 │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  Thumbnail │ Song Title        │   │   │
│  │  │           │ Artist            │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  DONATION AMOUNT *                              │   │
│  │  [$5.00] [$10.00] [$25.00] [Custom]           │   │
│  │  Custom amount: $[_______]               │   │
│  │                                                 │   │
│  │  ADD A MESSAGE (Optional)                            │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  Leave a message for {Streamer Name}...    │   │   │
│  │  │  [________________________________]           │   │   │
│  │  │  [________________________________]           │   │   │
│  │  │  [________________________________]           │   │   │
│  │  │  200/200                                     │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  ORDER SUMMARY                                  │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  Song: Song Title                        │   │   │
│  │  │  Donation: $10.00                          │   │   │
│  │  │  Platform fee: $0.50                   │   │   │
│  │  │  Total: $10.50                              │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  [Complete Donation] - Primary CTA               │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Page Structure (Desktop - Success State)

```
┌─────────────────────────────────────────────────────────────┐
│  SUCCESS SCREEN                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │        🎉 CONFETTI ANIMATION                   │   │
│  │                                                 │   │
│  │     THANK YOU!                              │   │
│  │                                                 │   │
│  │  Your song request has been sent to              │   │
│  │  {Streamer Name}!                              │   │
│  │                                                 │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │  "Song Title" by Artist            │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  They'll see your message:               │   │
│  │  "{Your custom message here}"            │   │
│  │                                                 │   │
│  │  [Request Another Song]                      │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Interface States

**Profile - Normal State:**
- Streamer profile fully visible
- Search bar focused and ready for input
- Recent donations visible (if any)

**Profile - Loading State:**
- Skeleton loader for profile info
- Search bar disabled

**Profile - Not Found State:**
- 404-style message: "This streamer doesn't exist"
- Suggested streamers nearby
- Link back to homepage

**Search - Normal State:**
- Search results grid populated
- Each result clickable to show detail modal
- Smooth scroll loading for more results

**Search - Loading State:**
- Spinner in search bar
- Skeleton cards for results (3 columns)
- "Searching..." text

**Search - Empty State:**
- "No songs found for Try a different search term"
- Suggestions: "Check the spelling", "Try a more specific artist or song title"

**Search - Error State:**
- Error message: "Failed to search. Please try again."
- Retry button

**Checkout - Normal State:**
- Selected song info visible
- Donation amount selector
- Message textarea
- Order summary visible
- Donate button enabled

**Checkout - Validation Error:**
- Amount below minimum: "Minimum donation is $X.XX"
- Message too long: "Message must be 200 characters or less"
- Red borders on invalid fields

**Processing - Normal State:**
- Spinner with "Processing your donation..."
- Donate button disabled
- Animated progress bar

**Processing - Success State:**
- Confetti animation
- Success message
- "Request Another Song" button

**Processing - Failure State:**
- Error message
- "Try Again" button
- Option to contact support (placeholder for MVP)

**Mobile State:**
- Single column layout
- Search results become 2-column grid
- Checkout becomes full-screen modal
- Touch-optimized interactions

---

### Donation Amount Presets

| Preset | Amount |
|:------|:-------|
| Small | $1.00 |
| Medium | $5.00 |
| Large | $10.00 |
| Custom | User input (min: $0.50) |

---

### Platform Fee Display

- Fee percentage shown in checkout summary
- Example: $10.00 donation + $0.50 fee = $10.50 total
- Transparent to viewer (no hidden fees)

---

### Design Tokens (Viewer Profile-specific)

| Token | Value |
|:------|:------|
| Profile Container Width | 100% (desktop), 100% (mobile) |
| Search Result Card | 280px width |
| Avatar Size | 120px |
| Thumbnail Size | 80x80px |
| Donation Preset Button | 80px |
| Message Textarea Height | 120px |
| Confetti Duration | 2-3 seconds |

---

## 3. Technical Specs (Owned by @tech-lead)

### MVP Implementation

**Components:**
| Component | Path | Description |
|:----------|:-----|:------------|
| `ViewerProfilePage` | `src/app/(viewer)/[username]/page.tsx` | Public profile route |
| `StreamerHero` | `src/components/viewer/streamer-hero.tsx` | Streamer profile header |
| `SongSearchBar` | `src/components/viewer/song-search-bar.tsx` | YouTube search input |
| `SearchResultsGrid` | `src/components/viewer/search-results-grid.tsx` | Search results display |
| `SongDetailModal` | `src/components/viewer/song-detail-modal.tsx` | Song selection modal |
| `DonationCheckout` | `src/components/viewer/donation-checkout.tsx` | Checkout flow |
| `MockPaymentProcessing` | `src/components/viewer/mock-payment-processing.tsx` | Simulated payment |
| `DonationSuccess` | `src/components/viewer/donation-success.tsx` | Success screen with confetti |
| `RecentDonationsFeed` | `src/components/viewer/recent-donations-feed.tsx` | Recent donations |

**Hooks:**
| Hook | Path | Description |
|:-----|:-----|:------------|
| `useYouTubeSearch` | `src/hooks/use-youtube-search.ts` | YouTube Data API v3 search |
| `useDebounce` | `src/hooks/use-debounce.ts` | 300ms debounce for search |

**Types:**
```typescript
// src/types/viewer.ts
interface StreamerProfile {
  id: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  streamingPlatforms: string[];
  minimumDonation: number;
  currency: string;
  customMessage?: string;
}

interface YouTubeSearchResult {
  id: string;
  title: string;
  artist?: string;
  thumbnailUrl: string;
  duration: number;
  viewCount: number;
}

interface DonationCheckout {
  streamerId: string;
  songId: string;
  amount: number;
  message?: string;
  donorName?: string;
  donorEmail?: string;
}

interface MockPaymentResult {
  success: boolean;
  transactionId: string;
  error?: string;
}
```

**YouTube API Integration:**
```typescript
// src/lib/youtube.ts
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

interface YouTubeSearchParams {
  q: string;
  type: "video";
  videoCategoryId: string; // Music category = 10
  maxResults: number;
  part: string;
}

export async function searchMusicVideos(query: string): Promise<YouTubeSearchResult[]> {
  const params = new URLSearchParams({
    q: `${query} music`, // Bias toward music results
    type: "video",
    videoCategoryId: "10", // Music category
    maxResults: "12",
    part: "snippet,contentDetails,statistics",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!,
  });

  const response = await fetch(`${YOUTUBE_API_BASE}/search?${params}`);
  const data = await response.json();
  
  return data.items.map(parseYouTubeResult);
}

export async function getVideoDetails(videoId: string): Promise<YouTubeSearchResult> {
  const params = new URLSearchParams({
    id: videoId,
    part: "snippet,contentDetails,statistics",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!,
  });

  const response = await fetch(`${YOUTUBE_API_BASE}/videos?${params}`);
  const data = await response.json();
  
  return parseYouTubeResult(data.items[0]);
}
```

**Mock Payment Flow:**
```typescript
// src/lib/mock-payment.ts
export async function processMockPayment(checkout: DonationCheckout): Promise<MockPaymentResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  // 95% success rate for realism
  const isSuccess = Math.random() > 0.05;

  if (isSuccess) {
    return {
      success: true,
      transactionId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  return {
    success: false,
    transactionId: "",
    error: "Payment failed. Please try again.",
  };
}
```

---

### Post-MVP: Database Schema (Supabase)

```sql
-- Public profile view (for viewer access)
CREATE VIEW public_profiles AS
SELECT 
  id,
  display_name,
  bio,
  avatar_url,
  streaming_platforms,
  minimum_donation_amount,
  currency,
  custom_thank_you_message
FROM profiles
WHERE is_onboarded = TRUE AND deleted_at IS NULL;

-- Donations table (already defined in Analytics Dashboard)
-- See Feature 04 for full schema

-- Donation receipts (for viewer confirmation)
CREATE TABLE donation_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID NOT NULL REFERENCES donations(id),
  receipt_email VARCHAR(255),
  receipt_sent_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### Post-MVP: API Endpoints

| Method | Endpoint | Purpose | Auth |
|:-------|:---------|:--------|:-----|
| `GET` | `/api/v1/public/:username` | Get public streamer profile | None |
| `GET` | `/api/v1/public/:username/recent-donations` | Get recent donations (public) | None |
| `POST` | `/api/v1/donations` | Create new donation (viewer) | None |
| `GET` | `/api/v1/search/youtube?q={query}` | Search YouTube music | None |
| `GET` | `/api/v1/youtube/videos/:id` | Get video details | None |

**POST /api/v1/donations Payload:**
```typescript
{
  streamerId: string;
  songYoutubeId: string;
  songTitle: string;
  songArtist?: string;
  songThumbnailUrl: string;
  songDuration: number;
  amount: number;
  message?: string;
  donorName?: string;
  donorEmail?: string;
}
```

**POST /api/v1/donations Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    status: "pending" | "completed" | "failed";
    queuePosition: number;
    estimatedPlayTime?: string; // ISO timestamp
  }
}
```
