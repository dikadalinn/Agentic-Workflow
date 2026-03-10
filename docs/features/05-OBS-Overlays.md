# Feature: OBS Overlays
**Status:** Tech Architected

---

## 1. Business Context (Owned by @business-analyst)

**Goal:** 
Enable streamers to embed customizable overlay widgets into OBS, displaying real-time donation alerts, music player/queue, and leaderboards during live streams. This is the **core differentiator** of the platform.

**High-Level Flow:**
1. Streamer navigates to OBS Customization section → 
2. Selects overlay type (Alerts, Player/Queue, Leaderboard, Custom) → 
3. Configures visual settings (colors, animations, layout) → 
4. Copies overlay URL → 
5. Pastes into OBS Browser Source → 
6. Overlay renders live during stream

**Key Business Rules:**
- Must work with ANY streaming platform that supports OBS (Twitch, YouTube Live, Kick, TikTok Live, etc.)
- Overlays must be lightweight to avoid frame drops
- Each overlay type must be independently configurable

**Overlay Types:**
1. **Alerts:** Donation alert overlay (popup animation + sound)
2. **Player & Queue:** Music player + request queue list
3. **Leaderboard:** Top donor leaderboard
4. **Custom:** User-defined overlay visuals

---

## 2. Product & UX Specs (Owned by @product-manager)

### User Stories & Acceptance Criteria

---

**US-05.1: OBS Overlay Creation - Alert Overlay**
- **As a** Streamer, **I want to** create a donation alert overlay, **so that** I can celebrate and thank donors during my stream.
  - *AC1:* Alert overlay appears as a popup with animation when a donation is received
  - *AC2:* Alert overlay supports customizable animation styles (pulse, fade, slide, shake, bounce effects)
  - *AC3:* Sound effect plays when alert is triggered
  - *AC4:* Test preview button shows a live preview of how the overlay will look on my OBS
  - *AC5:* Streamer can customize alert text message (e.g., "Thank you for the donation, {username}!")
  - *AC6:* Streamer can copy a unique overlay URL to embed in OBS
  - *AC7:* Alert overlay supports multiple themes: Default, Minimal, Neon, Retro

**US-05.2: OBS Overlay Creation - Player & Queue Overlay**
- **As a** Streamer, **I want to** create a music player and request queue overlay for **so that** my viewers can see what songs are playing and what's queued.
  - *AC1:* Overlay shows a music player with current song info (title, artist, progress bar)
  - *AC2:* Queue list shows upcoming song requests (next 3-5 songs)
  - *AC3:* Each queue item shows: Position, Thumbnail, Title, Artist, Donor, Donation Amount
  - *AC4:* Real-time sync with dashboard controls (play, pause, skip)
  - *AC5:* Minimal, clean design that works with any streaming platform

**US-05.3: OBS Overlay Creation - Leaderboard Overlay**
- **As a** Streamer, **I want to** create a top donor leaderboard overlay, **so that** my top supporters are recognized and motivated to donate more.
  - *AC1:* Overlay shows top 5 donors ranked by donation amount
  - *AC2:* Each entry shows: Rank, Donor Name (or Anonymous), Amount, Avatar
  - *AC3:* Animations when new donor enters or order changes
  - *AC4:* Compact and clean design
  - *AC5:* Configurable: Show top 3, 5, or10 donors

**US-05.4: OBS Overlay Customization - Custom Overlays**
- **As a** Streamer, **I want to** create fully custom overlay visuals, **so that** I can express my unique brand identity.
  - *AC1:* Access to custom overlay creation interface
  - *AC2:* Support uploading custom images/GIFs as overlay backgrounds
  - *AC3:* Support custom CSS styling
  - *AC4:* Generate unique overlay URL for each overlay type
  - *AC5:* Preview overlay in real-time before saving

---

### UI Design Intent & States

> **Design Intent:** Each overlay should feel like a native extension of the stream, not intrusive to set up. Overlays must be visually striking and add energy to the stream without being distracting. They Premium Modern Orange accent color should be used sparingly for CTAs and interactive elements. Overlays must be lightweight to avoid frame drops.

---

#### Overlay Configuration Panel (Dashboard)

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (Optional)                                       │
│  ┌─────────────────────────────────┐   │
│  │ OVERLAYS                            │   │
│  │  ┌─────────────┐   │   │
│  │  │  ○ Alerts     │   │   │
│  │  │  ○ Player/Queue│   │   │
│  │  │  ○ Leaderboard │   │   │
│  │  └─────────────┘   │   │
│  │                     │   │
│  │  ┌─────────────────┐   │   │
│  │  │  Name           │   │   │
│  │  │  ┌─────────┐   │   │
│  │  │  Status        │   │   │
│  │  │  ┌─────────┐   │   │
│  │  │  [Configure] │   │   │
│  │  │  ┌─────────┐   │   │
│  │  │  Theme         │   │   │
│  │  │  ┌─────────┐   │   │
│  │  │  Preview      │   │   │
│  │  │  [Copy URL]     │   │   │
│  │  └─────────────┘   │   │
│  │                     │   │
│  └─────────────────────────────────────────────────┘
│                         │
│  [Save Configuration]                                 │
└─────────────────────────────────────────────────────────────┘
```

---

#### Interface States

**Alert Overlay - Normal State:**
- Hidden until donation triggers
- Animates in when donation received (pulse, fade, slide, shake, bounce)
- Sound plays automatically
- Auto-dismiss after 5 seconds

**Alert Overlay - Empty State (No donations):**
- Shows: "No donations yet! Share your profile to get started"
- Calm, encouraging messaging

**Player/Queue Overlay - Normal State:**
- Shows current song playing with progress bar
- Shows next 3-5 songs in queue
- Real-time sync with dashboard

**Player/Queue Overlay - Empty State:**
- Shows: "Queue is empty! Waiting for song requests..."
- Static waveform or animation

**Leaderboard Overlay - Normal State:**
- Shows top 5 donors with donation amounts
- Animates when order changes (slide in/fade out)

**Custom Overlay - Configuration State:**
- Form-based configuration UI
- Real-time preview
- Copy URL functionality

**All Overlays - Loading State:**
- Skeleton loaders in configuration panel
- "Loading overlay..." placeholders

**All Overlays - Error State:**
- Error message with retry button
- Fallback to placeholder content

---

### Design Tokens (OBS-specific)

| Token | Value |
|:------|:------|
| Overlay Container | Browser Source URL |
| Alert Animation Duration | 3-5 seconds |
| Player Height | 80px |
| Queue Item Height | 60px |
| Leaderboard Item Height | 50px |
| Theme Selector | Radio buttons |
| Preview Size | 400x300px |

---

---

# Feature: OBS Overlays
**Status:** Tech Architected

---

## 1. Business Context (Owned by @business-analyst)

**Goal:** 
Enable streamers to embed customizable overlay widgets into OBS, displaying real-time donation alerts, music player/queue, and leaderboards during live streams. This is the **core differentiator** of the platform.

 is the **O**bs overlay compatibility (works with Twitch, YouTube Live, Kick, TikTok Live, etc.).

**Key Business Rules:**
- Must work with ANY streaming platform that supports OBS (not tied to platform-specific language
- Overlays must be lightweight to avoid frame drops
- Each overlay type must independently configurable

**Overlay Types:**
1. **Alerts:** Donation alert overlay (popup animation + sound)
2. **Player & Queue:** Music player + request queue list
7. **Leaderboard:** Top donor leaderboard
8. **Custom:** User-defined overlay visuals

**High-Level Flow:**
1. Streamer navigates to OBS Customization section → 
2. Select overlay type (Alerts, Player/Queue, Leaderboard, Custom) → 
3. Configures visual settings (colors, animations, layout) →
4. Copies overlay URL → 
5. Pastes into OBS Browser Source →
6. Overlay renders live during stream

**Key Business Rules:**
- Must work with any streaming platform that supports OBS
- Overlays must be lightweight to avoid frame drops
- Each overlay type needs independently configurable
- Overlays must to feel like a native extension of the stream, not intrusive to set up. Overlays must be visually striking and add energy to the stream without being distracting. Use the **Premium Modern Orange** accent color sparing on CTAs and key elements.

- Compact and clean design that works with any streaming platform

- Real-time sync with dashboard controls (play, pause, skip)
- Must sync with OBS Player overlay in real-time
- Changes apply immediately to existing donations

- Queue order respects sorting rules set in Donation Settings
- Settings must apply immediately to new donations
- Viewer experience must to feel effortless and exciting — like a game where you just tap a button to request a song. The platform works with any streaming service that uses OBS.

---

## 2. Product & UX Specs (Owned by @product-manager)

### User Stories & Acceptance Criteria

---

**US-05.1: OBS Overlay Creation - Alert Overlay**
- **As a** Streamer, **I want to** create a donation alert overlay, **so that** I can celebrate and thank donors during my stream.
  - *AC1:* Alert overlay appears as a popup with animation when a donation is received
  - *AC2:* Alert overlay supports customizable animation styles (pulse, fade, slide, shake, bounce effects)
  - *AC3:* Sound effect plays when alert is triggered
  - *AC4:* Test preview button shows a live preview of how the overlay will look on my OBS
  - *AC5:* Streamer can customize alert text message (e.g., "Thank you for the donation, {username}!")
  - *AC6:* Streamer can copy a unique overlay URL to embed in OBS
  - *AC7:* Alert overlay supports multiple themes: Default, Minimal, Neon, Retro

  - *AC8:* Skip button on item jumps to front of queue
  - *AC9:* "Remove from queue" option on each item
  - *AC10:* "Play next" option jumps item to top of queue
  - *AC11:* Confirmation dialog before removing song

**US-05.4: OBS Overlay Customization - Custom overlays**
- **As a** Streamer, **I want to** create fully custom overlay visuals, **so that** I can express my unique brand identity.
  - *AC1:* Access to custom overlay creation interface
  - *AC2:* Support uploading custom images/GIFs as overlay backgrounds
  - *AC3:* Support custom CSS styling
  - *AC4:* Generate unique overlay URL for each overlay type
  - *AC5:* Preview overlay in real-time before saving
  - *AC6:* Custom overlay must support uploading custom images/GIFs as overlay backgrounds
  - *AC7:* Custom overlays can be configured via form-based configuration UI
  - Real-time preview functionality
  - *AC8:* Copy overlay URL functionality
  - *AC9:* Accessible at `frens.app/overlays/alerts` | `frens.app/overlays/player-queue` | `frens.app/overlays/leaderboard` routes (no auth required)
  - *AC10:* Toggle (3, 5, or 10 donors)

            | Toggle | Show top 3, 5, or 10 donors |

---

### UI Design Intent & States

> **Design Intent:** Each overlay should feel like a native extension of the stream, not intrusive to set up. Overlays must be visually striking and add energy to the stream without being distracting. Use the **Premium Modern Orange** accent color sparing on CTAs and key elements.

- Clean, minimal design — streamer-focused, not platform-specific language

- Overlays need to lightweight to avoid frame drops
- Each overlay type needs independently configurable

- Overlays should feel like a native extension of the stream, not intrusive to set up. Overlays must be visually striking and add energy to the stream without feeling distracting.

---

#### Overlay Configuration Panel (Dashboard)

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (Optional)                    │
│  ┌─────────────────────────────────────────────────────┐
│  │  OVERlays                            │
│  │  ┌─────────────────────────────────────────────┐
│  │  │  ○ Alerts                            │
│  │  │  ○ Player/Queue                          │
│  │  │  ○ Leaderboard                        │
│  │  │  ┌─────────────────────────────────────────────┐
│  │  │  ┌─────────────────────────────────────────── │
│  │  └─────────────────────────────────────────────┘
│  │                                        │
│  │  [Save Configuration]                                 │
│  └─────────────────────────────────────────────────────────────┘
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Interface States

**Alert Overlay - Normal State:**
- Hidden until donation triggers
- Animates in when donation received (pulse, fade, slide, shake, bounce)
- Sound plays automatically
- Auto-dismiss after 5 seconds

**Alert Overlay - Empty State (No donations):**
- Shows: "No donations yet! Share your profile to get started"
- Calm, encouraging messaging

**Player/Queue Overlay - Normal State:**
- Shows current song playing with progress bar
- Shows next 3-5 songs in queue
- Real-time sync with dashboard

**Player/Queue Overlay - Empty State:**
- Shows: "Queue is empty! Waiting for song requests..."
- Static waveform or animation

**Leaderboard Overlay - Normal State:**
- Shows top 5 donors with donation amounts
- Animates when order changes (slide in/fade out)

**Custom Overlay - Configuration State:**
- Form-based configuration UI
- Real-time preview
- Copy URL functionality

**All Overlays - Loading State:**
- Skeleton loaders in configuration panel
- "Loading overlay..." placeholders

**All Overlays - Error State:**
- Error message with retry button
- Fallback to placeholder content

---

### Design Tokens (OBS-specific)

| Token | Value |
|:------|:------|
| Overlay Container | Browser Source URL |
| Alert Animation Duration | 3-5 seconds |
| Player Height | 80px |
| Queue Item Height | 60px |
| Leaderboard Item Height | 50px |
| Theme Selector | Radio buttons |
| Preview Size | 400x300px |

---

---

## 3. Technical Specs (Owned by @tech-lead)

### MVP Implementation
**Components:**
| Component | Path | Description |
|:----------|:-----|:------------|
| `OverlayConfigPage` | `src/app/(dashboard)/overlays/page.tsx` | Overlay management page |
| `AlertOverlay` | `src/components/overlays/alert-overlay.tsx` | Donation alert widget |
| `PlayerOverlay` | `src/components/overlays/player-overlay.tsx` | Music player + queue widget |
| `LeaderboardOverlay` | `src/components/overlays/leaderboard-overlay.tsx` | Top donors widget |
| `OverlayPreview` | `src/components/overlays/overlay-preview.tsx` | Preview functionality |
| `ThemeSelector` | `src/components/overlays/theme-selector.tsx` | Theme selector |
| `OverlayURLGenerator` | `src/components/overlays/overlay-url-generator.tsx` | URL generation |
| `CustomOverlayForm` | `src/components/overlays/custom-overlay-form.tsx` | Custom overlay form |

**Standalone Overlay Routes:**
| Route | Path | Description |
|:-----|:-----|:------------|
| `/overlay/alerts/:streamerId` | Alert overlay (no auth) |
| `/overlay/player/:streamerId` | Player + Queue overlay (no auth) |
| `/overlay/leaderboard/:streamerId` | Leaderboard overlay (no auth) |
| `/overlay/custom/:streamerId` | Custom overlay (no auth) |

**Types:**
```typescript
// src/types/overlay.ts
interface OverlaySettings {
  id: string;
  streamerId: string;
  type: "alert" | "player" | "leaderboard" | "custom";
  name: string;
  theme: "default" | "minimal" | "neon" | "retro";
  config: {
    // Type-specific configuration
    alertConfig?: AlertConfig;
    playerConfig?: PlayerConfig;
    leaderboardConfig?: LeaderboardConfig;
    customConfig?: CustomConfig;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface AlertConfig {
  animationStyle: "pulse" | "fade" | "slide" | "shake" | "bounce";
  soundEnabled: boolean;
  soundUrl?: string;
  duration: number; // seconds
  customMessage?: string;
}
interface PlayerConfig {
  showQueue: boolean;
  showProgress: boolean;
  autoPlay: boolean;
}
interface LeaderboardConfig {
  maxDonors: number; // 3, 5, 10
  showAmount: boolean;
}
interface CustomConfig {
  backgroundImageUrl?: string;
  customCss?: string;
}
```

**Zustand Store:**
```typescript
// src/store/overlays.store.ts
interface OverlayStore {
  alertSettings: OverlaySettings | null;
  playerSettings: PlayerSettings | null;
  leaderboardSettings: LeaderboardSettings | null;
  customSettings: CustomSettings | null;
  
  setAlertSettings: (settings: OverlaySettings) => void;
  setPlayerSettings: (settings: PlayerSettings) => void;
  setLeaderboardSettings: (settings: LeaderboardSettings) => void;
  setCustomSettings: (settings: CustomSettings) => void;
}
```

---

### Post-MVP: Database Schema (Supabase)
```sql
-- Overlay settings table
CREATE TABLE overlay_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  streamer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('alert', 'player', 'leaderboard', 'custom')),
  name VARCHAR(100) NOT NULL,
  theme VARCHAR(20) DEFAULT 'default' CHECK (theme IN ('default', 'minimal', 'neon', 'retro')),
  config JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(streamer_id, type)
);

```

---

### Post-MVP: API Endpoints
| Method | Endpoint | Purpose | Auth |
|:-------|:---------|:--------|:-----|
| `GET` | `/api/v1/overlays` | List all overlays | Required |
| `POST` | `/api/v1/overlays` | Create overlay | Required |
| `PATCH` | `/api/v1/overlays/:id` | Update overlay | Required |
| `DELETE` | `/api/v1/overlays/:id` | Delete overlay | Required |
| `GET` | `/api/v1/overlays/:id/url` | Get overlay URL | Required |
| `GET` | `/api/v1/overlays/alerts/:streamerId/data` | Get alert data (no auth) |
| `GET` | `/api/v1/overlays/player/:streamerId/data` | Get player data (no auth) |
| `GET` | `/api/v1/overlays/leaderboard/:streamerId/data` | Get leaderboard data (no auth) |

**POST /api/v1/overlays Payload:**
```typescript
{
  type: "alert" | "player" | "leaderboard" | "custom";
  name: string;
  theme: string;
  config: {
    // Type-specific configuration
  };
}
```

**Zustand Store:**
```typescript
// src/store/overlay.store.ts
interface OverlayState {
  activeOverlays: OverlaySettings[];
  previewOverlay: OverlaySettings | null;
  
  // Actions
  setPreviewOverlay: (overlay: OverlaySettings) => void;
  updateOverlay: (id: string, settings: Partial<OverlaySettings>) => void;
}
```

---

### Post-MVP: Database Schema (Supabase)

```sql
-- Overlay settings
CREATE TABLE overlay_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  streamer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('alert', 'player', 'leaderboard', 'custom')),
  theme VARCHAR(20) DEFAULT 'default',
  animation_style VARCHAR(20) DEFAULT 'pulse',
  sound_enabled BOOLEAN DEFAULT TRUE,
  sound_url TEXT,
  custom_message TEXT,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  
  UNIQUE (streamer_id, type)
);

-- Custom overlay assets
CREATE TABLE overlay_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  overlay_id UUID NOT NULL REFERENCES overlay_settings(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### Post-MVP: API Endpoints

| Method | Endpoint | Purpose | Auth |
|:-------|:---------|:--------|:-----|
| `GET` | `/api/v1/overlays` | List streamer's overlays | Required |
| `POST` | `/api/v1/overlays` | Create overlay | Required |
| `PATCH` | `/api/v1/overlays/:id` | Update overlay | Required |
| `DELETE` | `/api/v1/overlays/:id` | Delete overlay | Required |
| `GET` | `/api/v1/overlays/public/:streamerId/:type` | Get overlay data (no auth) | None |

**Public Overlay Response:**
```typescript
{
  streamerName: string;
  overlayType: string;
  theme: string;
  config: {
    // Type-specific configuration
  };
  data: {
    // Real-time data (current song, top donors, etc.)
  };
}
```
