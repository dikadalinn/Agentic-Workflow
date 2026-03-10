# Feature: Player & Queue Management
**Status:** Tech Architected

---

## 1. Business Context (Owned by @business-analyst)

**Goal:** 
Allow streamers to control the music playback and manage the song request queue directly from their dashboard, maintaining full control over what plays during their stream.

**High-Level Flow:**
1. Streamer navigates to Player section → 
2. Views current song playing + upcoming queue → 
3. Uses controls (Play, Pause, Skip) → 
4. Can reorder or remove songs from queue → 
5. Changes reflect in OBS overlay in real-time

**Key Business Rules:**
- Streamer has full control (play, pause, skip)
- Queue order respects sorting rules set in Donation Settings
- Must sync with OBS Player overlay in real-time

---

## 2. Product & UX Specs (Owned by @product-manager)

### User Stories & Acceptance Criteria

---

**US-06.1: Music Player Controls**
- **As a** Streamer, **I want to** control music playback (play, pause, skip) from my dashboard, **so that** I can manage what plays during my stream.
  - *AC1:* Player shows current song: Title, Artist, Album Art, Progress Bar
  - *AC2:* Play button starts playback
  - *AC3:* Pause button pauses playback
  - *AC4:* Skip button advances to next song in queue
  - *AC5:* Volume slider controls playback volume
  - *AC6:* Player state syncs with OBS overlay in real-time

**US-06.2: Queue Display**
- **As a** Streamer, **I want to** see the song request queue, **so that** I know what songs are coming up.
  - *AC1:* Queue shows list of song requests (up to 10 visible)
  - *AC2:* Each queue item displays: Position, Thumbnail, Title, Artist, Donor Name, Donation Amount, Requested Time
  - *AC3:* Currently playing song is highlighted at top of queue
  - *AC4:* Queue auto-scrolls to show more items

**US-06.3: Queue Reordering**
- **As a** Streamer, **I want to** reorder songs in the queue, **so that** I can prioritize specific requests.
  - *AC1:* Drag-and-drop to reorder queue items
  - *AC2:* Visual feedback shows new position during drag
  - *AC3:* Changes persist after drop
  - *AC4:* "Skip" button on item removes song from queue

**US-06.4: Queue Item Actions**
- **As a** Streamer, **I want to** take actions on individual queue items, **so that** I can manage problematic requests.
  - *AC1:* Click on item shows detail modal (full donor info, message, song details)
  - *AC2:* "Remove from queue" option on each item
  - *AC3:* "Play next" option jumps item to top of queue
  - *AC4:* Confirmation dialog before removing song

**US-06.5: Empty Queue State**
- **As a** Streamer, **I want to** see a friendly message when the queue is empty, **so that** I feel encouraged to share my profile.
  - *AC1:* Empty state shows: "Your queue is empty! Share your profile to start receiving song requests."
  - *AC2:* Call-to-action button: "Copy Profile Link"
  - *AC3:* Illustration or animation (music notes, headphones)

**US-06.6: Now Playing Indicator**
- **As a** Streamer, **I want to** see what's currently playing, **so that** I can quickly identify the current song.
  - *AC1:* "Now Playing" section above queue shows current song details
  - *AC2:* Album art thumbnail (80x80px)
  - *AC3:* Song title and artist prominently displayed
  - *AC4:* Progress bar shows playback position

---

### UI Design Intent & States

> **Design Intent:** A music control center that feels professional yet intuitive. The player should be the centerpiece, with large, accessible controls. Queue list on secondary panel should visually clean but data-rich. Use the Premium Modern Orange accent on the currently playing section and primary action buttons (Play/Pause/Skip). Keep the interface responsive with immediate feedback on all interactions.

---

#### Page Structure (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (Optional)                    │
│  ┌─────────────────────────────────┐   │
│  │                    PLAYER                │
│  │  ┌─────────────────────────────────┐   │
│  │  │  ▗─────────────────────┐   │   │
│  │  │  │ [Album Art]         │   │   │
│  │  │  │                     │   │   │
│  │  │  │  Now Playing            │   │   │
│  │  │  │  Song Title          │   │   │
│  │  │  │  Artist Name         │   │   │
│  │  │  │  ▓▀ ▓▀ ▓▀ ▓▀ ▓▀ ▓▀ │   │   │
│  │  │  │  [▶] [▶] [▶]             │   │   │
│  │  │  │  ─────────────────────   │   │   │
│  │  │  │  ─────────────────────   │   │   │
│  │  │  │  ─────────────────────   │   │   │
│  │  │  └─────────────────────┘   │   │
│  │  │                     │   │   │
│  │  │  ┌─────────────────────┐   │   │
│  │  │  │ [▶] [▶] [▶]           │   │   │
│  │  │  │  Volume   [━━━━━━]  │   │   │
│  │  │  └─────────────────────┘   │   │
│  │  └─────────────────────────────────┘   │
│  │                                          │
│  └─────────────────────────────────────────────────────┘
│                                                             │
│  QUEUE LIST (Scrollable)                         │
│  ┌─────────────────────────────────────────────┐   │
│  │  #1 (Now Playing)                             │   │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │ Thumbnail │ Song Title        │   │   │
│  │  │           │ Artist            │   │   │
│  │  │           │ $5.00 from @donor   │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  │  #2                                    │   │   │
│  │  ┌─────────────────────────────────────┐   │   │
│  │  │ Thumbnail │ Song Title        │   │   │
│  │  │           │ Artist            │   │   │
│  │  │           │ $3.00 from @viewer  │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  │  #3...                               │   │   │
│  └─────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Interface States

**Normal State:**
- Player shows current song with progress bar
- Queue shows upcoming songs
- Controls are responsive and provide visual feedback

**Empty Queue State:**
- "Your queue is empty!" message
- "Share your profile link to start receiving requests" CTA
- Subtle music note animation

**Loading State:**
- Skeleton placeholders for queue items
- Player shows loading spinner

**Error State:**
- Error message if player fails to load
- Retry button to attempt reconnection

**Item Detail Modal:**
- Triggered by clicking queue item
- Shows: Full donor info, message, song details, requested time
- Actions: Remove from queue, Play next, Close

---

### Design Tokens (Player-specific)

| Token | Value |
|:------|:------|
| Player Height | 120px |
| Album Art Size | 80x80px |
| Progress Bar Height | 4px |
| Control Button Size | 48x48px |
| Volume Slider Width | 100px |
| Queue Item Height | 72px |
| Thumbnail Size | 48x48px |

---

## 3. Technical Specs (Owned by @tech-lead)

### MVP Implementation

**Components:**
| Component | Path | Description |
|:----------|:-----|:------------|
| `PlayerPage` | `src/app/(dashboard)/player/page.tsx` | Player & Queue page |
| `NowPlaying` | `src/components/player/now-playing.tsx` | Current song display |
| `PlayerControls` | `src/components/player/player-controls.tsx` | Play/Pause/Skip/Volume |
| `QueueList` | `src/components/player/queue-list.tsx` | Queue items list |
| `QueueItem` | `src/components/player/queue-item.tsx` | Single queue item |
| `QueueItemModal` | `src/components/player/queue-item-modal.tsx` | Item detail modal |
| `EmptyQueueState` | `src/components/player/empty-queue-state.tsx` | Empty state with CTA |

**Hooks:**
| Hook | Path | Description |
|:-----|:-----|:------------|
| `useYouTubePlayer` | `src/hooks/use-youtube-player.ts` | YouTube IFrame Player integration |
| `usePlayerStore` | `src/store/player.store.ts` | Player state (play/pause/skip) |
| `useQueueStore` | `src/store/queue.store.ts` | Queue management state |

**Types:**
```typescript
// src/types/player.ts
interface PlayerState {
  isPlaying: boolean;
  volume: number; // 0-100
  currentTime: number; // seconds
  duration: number; // seconds
  currentSong: QueuedSong | null;
}

interface QueuedSong {
  id: string;
  youtubeId: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
  duration: number;
  donationId: string;
  donorName: string;
  donationAmount: number;
  message?: string;
  requestedAt: Date;
  position: number;
}

interface QueueState {
  songs: QueuedSong[];
  isLoading: boolean;
  sortMode: "fifo" | "highest_first";
}
```

**Zustand Store:**
```typescript
// src/store/player.store.ts
interface PlayerStore {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  currentSong: QueuedSong | null;
  
  play: () => void;
  pause: () => void;
  skip: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setCurrentSong: (song: QueuedSong | null) => void;
}

// src/store/queue.store.ts
interface QueueStore {
  songs: QueuedSong[];
  sortMode: "fifo" | "highest_first";
  
  addSong: (song: QueuedSong) => void;
  removeSong: (id: string) => void;
  reorderSongs: (fromIndex: number, toIndex: number) => void;
  playNext: (id: string) => void;
  clearQueue: () => void;
}
```

**YouTube IFrame Player Integration:**
```typescript
// src/lib/youtube-player.ts
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT) {
      resolve();
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve();
  });
}

export function createPlayer(videoId: string, onStateChange: (state: number) => void): YT.Player {
  return new YT.Player("youtube-player", {
    height: "0",
    width: "0",
    videoId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
    },
    events: {
      onStateChange: (event) => onStateChange(event.data),
    },
  });
}
```

---

### Post-MVP: Database Schema (Supabase)

```sql
-- Songs table (queue items)
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  streamer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  youtube_id VARCHAR(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255),
  thumbnail_url TEXT,
  duration INTEGER, -- seconds
  donation_id UUID REFERENCES donations(id),
  position INTEGER DEFAULT 0,
  played_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  
  INDEX idx_songs_streamer_queue (streamer_id, position) WHERE played_at IS NULL AND deleted_at IS NULL,
  INDEX idx_songs_streamer_created (streamer_id, created_at DESC)
);

-- Queue history (for analytics)
CREATE TABLE queue_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  streamer_id UUID NOT NULL REFERENCES profiles(id),
  song_id UUID REFERENCES songs(id),
  action VARCHAR(20) NOT NULL, -- 'played', 'skipped', 'removed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### Post-MVP: API Endpoints

| Method | Endpoint | Purpose | Auth |
|:-------|:---------|:--------|:-----|
| `GET` | `/api/v1/queue` | Get current queue | Required (streamer) |
| `POST` | `/api/v1/queue/reorder` | Reorder queue items | Required (streamer) |
| `DELETE` | `/api/v1/queue/:songId` | Remove song from queue | Required (streamer) |
| `PATCH` | `/api/v1/queue/:songId/play-next` | Move song to front | Required (streamer) |
| `POST` | `/api/v1/player/play` | Start playback | Required (streamer) |
| `POST` | `/api/v1/player/pause` | Pause playback | Required (streamer) |
| `POST` | `/api/v1/player/skip` | Skip to next song | Required (streamer) |
| `GET` | `/api/v1/overlays/player` | Get player overlay data | None (public overlay URL) |

**POST /api/v1/queue/reorder Payload:**
```typescript
{
  songId: string;
  newPosition: number;
}
```
