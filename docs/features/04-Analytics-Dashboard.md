# Feature: Analytics Dashboard
**Status:** Tech Architected

---

## 1. Business Context (Owned by @business-analyst)

**Goal:** 
Provide streamers with actionable insights into their donation performance, audience engagement, and content trends to help them optimize their streaming strategy.

**High-Level Flow:**
1. Streamer logs in → 
2. Lands on Dashboard overview → 
3. Views key metrics (Total Donations, Total Donors, Profile Visits, Top Songs) → 
4. Interacts with time-series chart (toggle between traffic/visits and donation amounts) → 
5. Can drill down into specific time periods

**Key Business Rules:**
- Must show real-time or near-real-time data
- Time-series chart must support toggle between metrics
- Top Songs should rank by request frequency

---

## 2. Product & UX Specs (Owned by @product-manager)

### User Stories & Acceptance Criteria

---

**US-04.1: Dashboard Overview - Key Metrics**
- **As a** Streamer, **I want to** see my key performance metrics at a glance, **so that** I can quickly assess how my channel is performing.
  - *AC1:* Dashboard displays 4 metric cards: Total Donations, Total Donors, Profile Visits, Top Songs
  - *AC2:* Each card shows: metric label, current value, and trend indicator (↑/↓ % vs previous period)
  - *AC3:* Metrics update in real-time or near-real-time
  - *AC4:* Cards are clickable to drill down into detail view

**US-04.2: Time-Series Chart - Toggle Metrics**
- **As a** Streamer, **I want to** toggle between different metrics on a time-series chart, **so that** I can analyze trends over time.
  - *AC1:* Chart supports toggle between: Traffic/Visits and Donation Amounts
  - *AC2:* Toggle is a pill/segmented control above the chart
  - *AC3:* Chart shows last 7 days by default
  - *AC4:* Time range selector: 7D, 30D, 90D, All Time

**US-04.3: Time-Series Chart - Interactivity**
- **As a** Streamer, **I want to** hover over the chart to see detailed data points,
 **so that** I can understand specific values at specific times.
  - *AC1:* Hover tooltip shows: Date, Value for selected metric
  - *AC2:* Chart highlights the hovered data point
  - *AC3:* Smooth animation when toggling metrics or changing time range

**US-04.4: Top Songs List**
- **As a** Streamer, **I want to** see my most frequently requested songs,
 **so that** I know what music resonates with my audience.
  - *AC1:* Top Songs section shows top 5 most requested songs
  - *AC2:* Each song shows: Rank, Thumbnail, Title, Artist, Request Count
  - *AC3:* "View All" link expands to full list or dedicated page
  - *AC4:* Empty state if no songs requested yet

**US-04.5: Recent Activity Feed**
- **As a** Streamer, **I want to** see recent donation activity,
 **so that** I can stay on top of who's supporting me.
  - *AC1:* Activity feed shows last 10 donations
  - *AC2:* Each item shows: Donor name/anonymous, Amount, Song requested, Time ago
  - *AC3:* Clicking an item shows donation detail modal
  - *AC4:* Empty state if no donations yet

**US-04.6: Date Range Filter**
- **As a** Streamer, **I want to** filter all dashboard data by date range,
 **so that** I can analyze specific time periods.
  - *AC1:* Global date picker in dashboard header
  - *AC2:* Presets: Today, Last 7 Days, Last 30 Days, Last 90 Days, Custom Range
  - *AC3:* All metrics and charts update when date range changes

**US-04.7: Empty State (New User)**
- **As a** new Streamer, **I want to** see helpful guidance when I have no data yet,
 **so that** I understand what the dashboard will show once I start receiving donations.
  - *AC1:* All metric cards show "—" or "0" with no trend indicator
  - *AC2:* Chart shows empty state illustration with message: "No data yet. Share your profile to start receiving donations!"
  - *AC3:* Top Songs shows: "Songs you receive will appear here"
  - *AC4:* Activity feed shows: "Donations will appear here as they come in"
  - *AC5:* CTA to copy profile link visible in empty state

**US-04.8: Dashboard Navigation**
- **As a** Streamer, **I want to** navigate between Dashboard and other sections easily,
 **so that** I can access different parts of the app.
  - *AC1:* Sidebar navigation with: Dashboard (active), Overlays, Player, Settings
  - *AC2:* Dashboard is the default landing page after login
  - *AC3:* Breadcrumb shows: Home > Dashboard

---

### UI Design Intent & States

> **Design Intent:** Data-rich yet scannable. The dashboard should feel like a "command center" for streamers — giving them instant insight into their performance without overwhelming them. Prioritize clarity over density. Use charts that are easy to read at a glance. Premium Modern Orange for key metrics and CTAs, but let data visualization use a more neutral palette with orange accents for highlights.

---

#### Page Structure (Desktop - Dashboard)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                     │
│  [Logo]  [Profile Avatar ▼]                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  SIDEBAR        │  MAIN CONTENT                                            │
│  ┌───────────┐  │                                                          │
│  │ 🏠 Dashboard│  │  ┌──────────────────────────────────────────────────┐ │
│  │ 🖥️ Overlays │  │  │  DASHBOARD                          [7D ▼] [📅]  │ │
│  │ 🎵 Player   │  │  └──────────────────────────────────────────────────┘ │
│  │ ⚙️ Settings │  │                                                          │
│  └───────────┘  │  METRIC CARDS                                            │
│                  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│                  │  │ 💰      │ │ 👥      │ │ 👁️      │ │ 🎵      │       │
│                  │  │ Donations│ │ Donors  │ │ Visits  │ │ Top Song│       │
│                  │  │ $0.00   │ │ 0       │ │ 0       │ │ —       │       │
│                  │  │   — %   │ │  — %   │ │  — %   │ │         │       │
│                  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│                  │                                                          │
│                  │  TIME-SERIES CHART                                       │
│                  │  ┌──────────────────────────────────────────────────┐ │
│                  │  │  [Traffic] [Donations]  ← Toggle Pills           │ │
│                  │  │                                                  │ │
│                  │  │      📈 Chart Area                               │ │
│                  │  │                                                  │ │
│                  │  │  Mon Tue Wed Thu Fri Sat Sun                    │ │
│                  │  └──────────────────────────────────────────────────┘ │
│                  │                                                          │
│                  │  ┌─────────────────────┐ ┌─────────────────────┐       │
│                  │  │ TOP SONGS           │ │ RECENT ACTIVITY     │       │
│                  │  │                     │ │                     │       │
│                  │  │ 1. [🎵] Song Title  │ │ 💸 John D. $5.00   │       │
│                  │  │    Artist • 12 req  │ │    "Play Free Bird" │       │
│                  │  │                     │ │    2 min ago        │       │
│                  │  │ 2. [🎵] Song Title  │ │                     │       │
│                  │  │    Artist • 8 req   │ │ 💸 Sarah $10.00    │       │
│                  │  │                     │ │    "Sandstorm"      │       │
│                  │  │ [View All →]        │ │    15 min ago       │       │
│                  │  └─────────────────────┘ │ [View All →]        │       │
│                  │                          └─────────────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

#### Metric Card Component

```
┌─────────────────────────────────┐
│  💰 Total Donations             │  ← Icon + Label
│                                 │
│  $1,234.56                      │  ← Large Value
│                                 │
│  ↑ 12.5% vs last 7 days         │  ← Trend Indicator
└─────────────────────────────────┘
```

**Trend States:**
- **Positive (↑):** Green text (#10B981)
- **Negative (↓):** Red text (#EF4444)
- **Neutral (—):** Gray text (#6B7280)
- **No Data:** "—" gray text

---

#### Time-Series Chart Toggle

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌────────────┐  ┌────────────┐                        │
│  │  Traffic   │  │ Donations  │                        │
│  └────────────┘  └────────────┘                        │
│       ↑ Active      Pill style toggle                   │
│                                                         │
│  Chart renders below...                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Toggle Behavior:**
- Active pill: Filled with Premium Orange background
- Inactive pill: Transparent with gray border
- Chart animates smoothly on toggle

---

#### Empty State Components

**Metric Card Empty:**
```
┌─────────────────────────────────┐
│  💰 Total Donations             │
│                                 │
│  $0.00                          │  ← Gray text
│                                 │
│  — No data yet                  │  ← Gray, no trend
└─────────────────────────────────┘
```

**Chart Empty:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│           ┌─────────────────────┐                      │
│           │     📊              │                      │
│           │                     │                      │
│           │  No data yet        │                      │
│           │                     │                      │
│           │  Share your profile │                      │
│           │  to start receiving │                      │
│           │  donations!         │                      │
│           │                     │                      │
│           │  [Copy Profile Link]│                      │
│           └─────────────────────┘                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Top Songs Empty:**
```
┌─────────────────────────────┐
│  TOP SONGS                  │
│                             │
│  🎵 Songs you receive will  │
│     appear here             │
│                             │
└─────────────────────────────┘
```

**Recent Activity Empty:**
```
┌─────────────────────────────┐
│  RECENT ACTIVITY            │
│                             │
│  💸 Donations will appear   │
│     here as they come in    │
│                             │
└─────────────────────────────┘
```

---

#### Interface States

**Dashboard - Normal State (With Data):**
- All metrics populated with values
- Chart shows line/area graph with data points
- Top Songs list populated
- Activity feed shows recent donations

**Dashboard - Loading State:**
- Skeleton loaders for metric cards
- Chart area shows pulsing placeholder
- Lists show skeleton rows

**Dashboard - Empty State (New User):**
- All sections show empty state messaging
- Encouraging copy with CTA to share profile
- No red errors — just neutral guidance

**Dashboard - Error State (API Failure):**
- Metric cards show "—" with error tooltip on hover
- Chart shows: "Unable to load data. [Retry]"
- Error toast notification appears

**Mobile State:**
- Sidebar collapses to bottom navigation or hamburger
- Metric cards become 2x2 grid
- Chart becomes full-width, taller for touch interaction
- Top Songs and Activity stack vertically

---

### Date Range Picker

**Presets:**
| Label | Range |
|:------|:------|
| Today | Current day |
| Last 7 Days | 7 days including today |
| Last 30 Days | 30 days including today |
| Last 90 Days | 90 days including today |
| All Time | From account creation |
| Custom | User-selected range |

**UI:**
- Dropdown trigger shows current selection
- Calendar picker for custom range
- Selection updates all dashboard components

---

### Data Visualization Specifications

| Component | Type | Colors |
|:----------|:-----|:-------|
| Traffic Chart | Area chart | Premium Orange fill (20% opacity), Orange line |
| Donations Chart | Bar chart | Premium Orange bars |
| Chart Grid | Dashed lines | Gray (#E5E7EB) |
| Chart Axis | Labels | Gray (#6B7280) |
| Tooltip | Floating card | White background, shadow |

---

### Design Tokens (Dashboard-specific)

| Token | Value |
|:------|:------|
| Metric Card Min Width | 200px |
| Metric Card Padding | 24px |
| Metric Value Font Size | 32px (bold) |
| Trend Font Size | 12px |
| Chart Height | 300px |
| Sidebar Width | 240px (collapsible to 64px icons only) |
| Grid Gap | 24px |
| Card Border Radius | 12px |
| Card Shadow | 0 2px 8px rgba(0,0,0,0.06) |

---

## 3. Technical Specs (Owned by @tech-lead)

### MVP Implementation (Mock Data)

**Components:**
| Component | Path | Description |
|:----------|:-----|:------------|
| `DashboardPage` | `src/app/(dashboard)/dashboard/page.tsx` | Main dashboard route |
| `MetricCard` | `src/components/dashboard/metric-card.tsx` | Reusable metric display |
| `TimeSeriesChart` | `src/components/dashboard/time-series-chart.tsx` | Recharts area/bar chart |
| `MetricToggle` | `src/components/dashboard/metric-toggle.tsx` | Traffic vs Donations toggle |
| `DateRangePicker` | `src/components/dashboard/date-range-picker.tsx` | Date filter component |
| `TopSongsList` | `src/components/dashboard/top-songs-list.tsx` | Top 5 songs component |
| `RecentActivityFeed` | `src/components/dashboard/recent-activity-feed.tsx` | Last 10 donations |
| `EmptyStateCard` | `src/components/dashboard/empty-state-card.tsx` | Empty state with CTA |

**Types:**
```typescript
// src/types/analytics.ts
interface DashboardMetrics {
  totalDonations: number;
  totalDonors: number;
  profileVisits: number;
  topSongs: SongRequest[];
  donationsTrend: TrendData;
  visitsTrend: TrendData;
  recentDonations: Donation[];
}

interface TrendData {
  current: number;
  previous: number;
  percentageChange: number;
  dataPoints: { date: string; value: number }[];
}

interface SongRequest {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
  requestCount: number;
}
```

**Mock Data Service:**
```typescript
// src/lib/mock-data.ts
export function generateMockDashboardData(dateRange: DateRange): DashboardMetrics {
  return {
    totalDonations: 1234.56,
    totalDonors: 42,
    profileVisits: 892,
    // ... generated based on date range
  };
}
```

---

### Post-MVP: Database Schema (Supabase)

```sql
-- Donations table
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  streamer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  donor_name VARCHAR(100),
  donor_email VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0.50),
  currency VARCHAR(3) DEFAULT 'USD',
  message TEXT,
  song_id UUID REFERENCES songs(id),
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  platform_fee DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  
  INDEX idx_donations_streamer_created (streamer_id, created_at DESC),
  INDEX idx_donations_status (status)
);

-- Profile visits (analytics)
CREATE TABLE profile_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  streamer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  visitor_id UUID,
  referrer VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  INDEX idx_visits_streamer_created (streamer_id, created_at DESC)
);

-- Aggregated analytics (materialized view for performance)
CREATE MATERIALIZED VIEW streamer_analytics AS
SELECT 
  streamer_id,
  DATE(created_at) as date,
  COUNT(*) as donation_count,
  SUM(amount) as total_amount,
  COUNT(DISTINCT donor_email) as unique_donors
FROM donations
WHERE deleted_at IS NULL AND status = 'completed'
GROUP BY streamer_id, DATE(created_at);
```

---

### Post-MVP: API Endpoints

| Method | Endpoint | Purpose | Auth |
|:-------|:---------|:--------|:-----|
| `GET` | `/api/v1/analytics/dashboard` | Get all dashboard metrics | Required (streamer) |
| `GET` | `/api/v1/analytics/donations` | List donations (paginated) | Required (streamer) |
| `GET` | `/api/v1/analytics/songs/top` | Get top requested songs | Required (streamer) |
| `GET` | `/api/v1/analytics/trend?metric=donations\|visits` | Get time-series data | Required (streamer) |

**Query Parameters:**
```typescript
interface AnalyticsQuery {
  startDate?: string; // ISO date
  endDate?: string;   // ISO date
  range?: "7d" | "30d" | "90d" | "all";
}
```
