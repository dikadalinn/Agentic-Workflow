# Feature: Donation Settings
**Status:** Tech Architected

---

## 1. Business Context (Owned by @business-analyst)

**Goal:** 
Allow streamers to configure how donations work on their profile, including minimum amounts, queue sorting rules, and other donation-related preferences.

**High-Level Flow:**
1. Streamer navigates to Settings → Donation Settings → 
2. Configures minimum donation amount → 
3. Sets queue sorting rule (FIFO vs. Highest Donation First) → 
4. Optionally sets donation tiers with perks → 
5. Saves configuration

**Key Business Rules:**
- Minimum donation amount must be configurable
- Queue sorting rules: "First In, First Out" OR "Highest Donation Amount Plays First"
- Settings must apply immediately to new donations

---

## 2. Product & UX Specs (Owned by @product-manager)

### User Stories & Acceptance Criteria

---

**US-07.1: Minimum Donation Amount**
- **As a** Streamer, **I want to** set a minimum donation amount, **so that** I can filter out low-value donations and ensure quality interactions.
  - *AC1:* Minimum amount field with input type (number)
  - *AC2:* Default minimum: $1.00
  - *AC3:* Minimum can be set from $0.50 to $100.00
  - *AC4:* Input validation prevents values below $0.50
  - *AC5:* Changes apply immediately to all future donations

**US-07.2: Queue Sorting Rules**
- **As a** Streamer, **I want to** choose how my song queue is sorted, **so that** I can control the priority of requests.
  - *AC1:* Toggle between: "First In, First Out (Chronological)" and "Highest Donation First"
  - *AC2:* Default: "First In, First Out"
  - *AC3:* Visual explanation of how each sorting method works
  - *AC4:* Changes apply immediately to existing queue

**US-07.3: Donation Tiers (Optional)**
- **As a** Streamer, **I want to** optionally create donation tiers with perks, **so that** I can incentivize higher donations.
  - *AC1:* Add tier button to create new tier
  - *AC2:* Tier fields: Tier Name, Minimum Amount, Perk/Description
  - *AC3:* Example: "Gold Tier - $10 min - Priority queue placement"
  - *AC4:* Delete tier button to remove tier
  - *AC5:* Maximum 3 tiers allowed

**US-07.4: Donation Messages (Optional)**
- **As a** Streamer, **I want to** set custom thank you messages, **so that** donors feel appreciated.
  - *AC1:* Customizable "Thank You" message displayed on donation confirmation
  - *AC2:* Supports variables: {streamer_name}, {donor_name}, {amount}
  - *AC3:* Default: "Thank you {donor_name} for your ${amount} donation!"

**US-07.5: Currency Display**
- **As a** Streamer, **I want to** see which currency donations are displayed in, **so that** there's no confusion.
  - *AC1:* Currency selector (dropdown)
  - *AC2:* Default: USD ($)
  - *AC3:* Currency symbol displayed throughout settings

**US-07.6: Save Configuration**
- **As a** Streamer, **I want to** save my donation settings, **so that** my changes are persisted.
  - *AC1:* "Save" button saves all settings
  - *AC2:* Success toast: "Settings saved successfully!"
  - *AC3:* Settings apply immediately to Viewer Public Profile

**US-07.7: Reset to Defaults**
- **As a** Streamer, **I want to** reset my settings to defaults, **so that** I can start fresh if needed.
  - *AC1:* "Reset to Defaults" button with confirmation dialog
  - *AC2:* Confirmation: "Are you sure? This will reset all settings to default values."
  - *AC3:* Cancel button dismisses dialog without changes

---

### UI Design Intent & States

> **Design Intent:** Clean and organized, functional. Settings should feel straightforward and not overwhelming. Use clear labels and groupings. The Premium Modern Orange accent on the Save button. Provide clear visual feedback when settings are saved.

---

#### Page Structure (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (Optional)                    │
│  ┌─────────────────────────────────┐   │
│  │   DONATION SETTINGS            │   │
│  │                                   │   │   │
│  │  ┌─────────────────────────────────┐   │
│  │  │  Minimum Donation Amount      │   │
│  │  │  Currency: [USD ▼]  $   │   │
│  │  │  Amount: [$   1.00  ]  │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │
│  │  │  Queue Sorting Rules         │   │   │
│  │  │  ○ First In, First Out           │   │   │
│  │  │  ○ Highest Donation First       │   │   │
│  │  │  ℑ───────────────────────┘   │   │
│  │  │                                   │   │   │
│  │  │  ┌─────────────────────────────────┐   │
│  │  │  Donation Tiers (Optional)     │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │
│  │  │  │ Tier Name    │ Min │ Perk   │   │   │
│  │  │  ├─────────────┼─────┼──────┤   │   │
│  │  │  │ Gold Tier   │ $10 │ ...   │   │   │
│  │  │  ├─────────────┼─────┼──────┤   │   │
│  │  │  │ [+ Add Tier]                 │   │   │
│  │  │  └─────────────────────────────────┘   │   │
│  │  │                                   │   │   │
│  │  │  ┌─────────────────────────────────┐   │
│  │  │  Custom Messages (Optional)   │   │   │
│  │  │  [_________________________]     │   │   │
│  │  │  {streamer_name}, {donor_name}    │   │   │
│  │  │  └─────────────────────────────────┘   │   │
│  │  │                                   │   │   │
│  │  │  [Reset to Defaults] [Save]      │   │
│  │  └─────────────────────────────────┘   │
│  │                                   │   │   │
│  └─────────────────────────────────────────────────────┘
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Interface States

**Normal State:**
- All settings visible with current values
- Save button enabled when changes are made

**Loading State:**
- Skeleton loaders for settings sections
- Save button disabled

**Saved State:**
- Success toast appears
- Settings persist in real-time

**Reset Confirmation:**
- Modal appears when "Reset to Defaults" clicked
- "Cancel" and "Confirm" options
- Confirm resets all settings and default values

**Validation Error:**
- Error message below field
- Red border on input
- Save button remains disabled until error is fixed

---

### Queue Sorting Rules - Visual Explanation

| Rule | Description |
|:-----|:------------|
| **First In, First Out** | Songs play in the order they were requested. Simple chronological ordering. |
| **Highest Donation First** | Songs with higher donations jump to front of queue. Equal donations maintain chronological order. |

---

### Design Tokens (Settings-specific)

| Token | Value |
|:------|:------|
| Input Height | 48px |
| Input Padding | 12px 16px |
| Toggle Button Width | 200px |
| Section Spacing | 24px |
| Save Button | Full-width on mobile, auto-width on desktop |

---

## 3. Technical Specs (Owned by @tech-lead)

### MVP Implementation

**Components:**
| Component | Path | Description |
|:----------|:-----|:------------|
| `SettingsPage` | `src/app/(dashboard)/settings/page.tsx` | Settings page route |
| `DonationSettingsForm` | `src/components/settings/donation-settings-form.tsx` | Main settings form |
| `MinimumAmountInput` | `src/components/settings/minimum-amount-input.tsx` | Min donation input |
| `QueueSortToggle` | `src/components/settings/queue-sort-toggle.tsx` | FIFO vs Highest First toggle |
| `DonationTiers` | `src/components/settings/donation-tiers.tsx` | Tier configuration |
| `CustomMessageInput` | `src/components/settings/custom-message-input.tsx` | Thank you message |
| `ResetConfirmationDialog` | `src/components/settings/reset-confirmation-dialog.tsx` | Reset confirmation modal |

**Types:**
```typescript
// src/types/settings.ts
interface DonationSettings {
  minimumAmount: number;
  currency: string;
  queueSortMode: "fifo" | "highest_first";
  donationTiers: DonationTier[];
  customThankYouMessage: string;
  platformFeePercentage: number;
}

interface DonationTier {
  id: string;
  name: string;
  minimumAmount: number;
  perkDescription: string;
}
```

**Zustand Store:**
```typescript
// src/store/settings.store.ts
interface SettingsStore {
  donationSettings: DonationSettings;
  isLoading: boolean;
  isDirty: boolean;
  
  updateSettings: (settings: Partial<DonationSettings>) => void;
  saveSettings: () => Promise<void>;
  resetToDefaults: () => void;
}

// Default values
const DEFAULT_SETTINGS: DonationSettings = {
  minimumAmount: 1.00,
  currency: "USD",
  queueSortMode: "fifo",
  donationTiers: [],
  customThankYouMessage: "Thank you {donor_name} for your ${amount} donation!",
  platformFeePercentage: 5,
};
```

**Validation Schema:**
```typescript
// src/lib/validations/settings.ts
export const donationSettingsSchema = z.object({
  minimumAmount: z.number().min(0.50).max(100),
  currency: z.enum(["USD", "EUR", "GBP"]),
  queueSortMode: z.enum(["fifo", "highest_first"]),
  donationTiers: z.array(
    z.object({
      name: z.string().min(1).max(50),
      minimumAmount: z.number().min(1),
      perkDescription: z.string().max(200),
    })
  ).max(3),
  customThankYouMessage: z.string().max(500),
});
```

---

### Post-MVP: Database Schema (Supabase)

```sql
-- Donation settings table
CREATE TABLE donation_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  streamer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  minimum_amount DECIMAL(10,2) DEFAULT 1.00 CHECK (minimum_amount >= 0.50),
  currency VARCHAR(3) DEFAULT 'USD',
  queue_sort_mode VARCHAR(20) DEFAULT 'fifo' CHECK (queue_sort_mode IN ('fifo', 'highest_first')),
  custom_thank_you_message TEXT DEFAULT 'Thank you {donor_name} for your ${amount} donation!',
  platform_fee_percentage DECIMAL(5,2) DEFAULT 5.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(streamer_id)
);

-- Donation tiers table
CREATE TABLE donation_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  streamer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  minimum_amount DECIMAL(10,2) NOT NULL CHECK (minimum_amount >= 1),
  perk_description TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  INDEX idx_tiers_streamer (streamer_id, position)
);

-- Row Level Security
ALTER TABLE donation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own settings" ON donation_settings
  FOR ALL USING (streamer_id = auth.uid());

CREATE POLICY "Users can manage own tiers" ON donation_tiers
  FOR ALL USING (streamer_id = auth.uid());
```

---

### Post-MVP: API Endpoints

| Method | Endpoint | Purpose | Auth |
|:-------|:---------|:--------|:-----|
| `GET` | `/api/v1/settings/donations` | Get donation settings | Required (streamer) |
| `PATCH` | `/api/v1/settings/donations` | Update donation settings | Required (streamer) |
| `POST` | `/api/v1/settings/donations/reset` | Reset to defaults | Required (streamer) |
| `GET` | `/api/v1/settings/donations/tiers` | List donation tiers | Required (streamer) |
| `POST` | `/api/v1/settings/donations/tiers` | Create donation tier | Required (streamer) |
| `DELETE` | `/api/v1/settings/donations/tiers/:id` | Delete donation tier | Required (streamer) |

**PATCH Payload:**
```typescript
{
  minimumAmount?: number;
  currency?: "USD" | "EUR" | "GBP";
  queueSortMode?: "fifo" | "highest_first";
  customThankYouMessage?: string;
}
```
