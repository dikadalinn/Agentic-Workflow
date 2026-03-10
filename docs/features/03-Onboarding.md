# Feature: Onboarding
**Status:** Tech Architected

---

## 1. Business Context (Owned by @business-analyst)

**Goal:** 
Collect essential profile information from newly registered streamers to personalize their public profile and enable donation collection setup.

**High-Level Flow:**
1. Streamer completes authentication → 
2. Redirected to onboarding wizard → 
3. Enters profile details (display name, bio, profile image) → 
4. Optionally configures streaming platform(s) → 
5. Onboarding complete → 
6. Redirected to Dashboard

**Key Business Rules:**
- Must be completed before accessing the main dashboard
- Should feel quick and non-intrusive (minimal required fields)
- Should set up the foundation for the streamer's public profile URL

---

## 2. Product & UX Specs (Owned by @product-manager)

### User Stories & Acceptance Criteria

---

**US-03.1: Profile Setup - Display Name**
- **As a** Streamer, **I want to** set my public display name, **so that** viewers can identify me on my profile page.
  - *AC1:* Display name field is required
  - *AC2:* Display name must be 3-30 characters
  - *AC3:* Display name must be unique (real-time validation)
  - *AC4:* Display name determines public profile URL: `frens.app/{display_name}`

**US-03.2: Profile Setup - Bio**
- **As a** Streamer, **I want to** add a short bio, **so that** viewers know who I am when they visit my profile.
  - *AC1:* Bio field is optional
  - *AC2:* Bio max 200 characters with live counter
  - *AC3:* Bio supports basic text only (no formatting)

**US-03.3: Profile Setup - Profile Image**
- **As a** Streamer, **I want to** upload a profile picture, **so that** my profile feels personal and recognizable.
  - *AC1:* Profile image upload is optional (has default avatar fallback)
  - *AC2:* Supported formats: JPG, PNG, WebP
  - *AC3:* Max file size: 5MB
  - *AC4:* Image is cropped to circle with preview
  - *AC5:* Drag-and-drop or click-to-upload options

**US-03.4: Platform Selection**
- **As a** Streamer, **I want to** indicate which streaming platform(s) I use, **so that** Frens can show relevant tips and the community knows where to find me.
  - *AC1:* Multi-select options: Twitch, YouTube, Kick, TikTok Live, Other
  - *AC2:* At least one platform must be selected
  - *AC3:* "Other" option shows free-text field

**US-03.5: Progress Indicator**
- **As a** Streamer, **I want to** see my progress through the onboarding steps, **so that** I know how much is left.
  - *AC1:* Progress bar or step indicator at top of screen
  - *AC2:* Steps clearly labeled: "Profile" → "Platform" → "Done"
  - *AC3:* Current step highlighted with Premium Orange

**US-03.6: Skip for Now (Optional Step)**
- **As a** Streamer, **I want to** skip optional fields, **so that** I can quickly get to the dashboard and complete setup later.
  - *AC1:* "Skip for now" link available on optional fields
  - *AC2:* Required fields cannot be skipped
  - *AC3:* Skipped fields can be completed later in Settings

**US-03.7: Onboarding Completion**
- **As a** Streamer, **I want to** see a success screen when onboarding is complete, **so that** I feel a sense of accomplishment.
  - *AC1:* Success screen shows: "You're all set!" message
  - *AC2:* Display unique profile URL: `frens.app/{display_name}`
  - *AC3:* "Copy Link" button for profile URL
  - *AC4:* "Go to Dashboard" primary CTA

**US-03.8: Return to Onboarding**
- **As a** Streamer, **I want to** be prompted to complete onboarding if I close the browser mid-flow, **so that** I don't get stuck in an incomplete state.
  - *AC1:* If onboarding incomplete, redirect to onboarding on next login
  - *AC2:* Progress is saved after each step
  - *AC3:* User can resume from where they left off

---

### UI Design Intent & States

> **Design Intent:** Quick, celebratory, and frictionless. The onboarding should feel like a "getting started" experience, not a chore. Use progress indicators to set expectations. Celebrate completion with confetti or animation. Keep the form light — only collect what's essential for a functional profile.

---

#### Page Structure (Desktop - Step 1: Profile Setup)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Minimal)                                           │
│  [Logo]                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PROGRESS:  [●────────]  Step 1 of 2                        │
│                                                             │
│                    ┌─────────────────────┐                  │
│                    │   LET'S SET YOU UP  │                  │
│                    │                     │                  │
│                    │     ┌─────┐         │                  │
│                    │     │ 📷  │  ← Click to upload        │
│                    │     └─────┘         │                  │
│                    │   Add photo         │                  │
│                    │                     │                  │
│                    │  Display Name *     │                  │
│                    │  [________________] │                  │
│                    │  frens.app/{name}   │ ← Live preview   │
│                    │                     │                  │
│                    │  Bio (optional)     │                  │
│                    │  [________________] │                  │
│                    │  [________________] │                  │
│                    │  0/200              │                  │
│                    │                     │                  │
│                    │  [Continue]         │ ← Primary CTA    │
│                    └─────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Page Structure (Desktop - Step 2: Platform Selection)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Minimal)                                           │
│  [Logo]                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PROGRESS:  [────●───]  Step 2 of 2                        │
│                                                             │
│                    ┌─────────────────────┐                  │
│                    │  WHERE DO YOU       │                  │
│                    │  STREAM?            │                  │
│                    │                     │                  │
│                    │  ┌─────┐ ┌─────┐    │                  │
│                    │  │ 🟣  │ │ ▶️  │    │                  │
│                    │  │Twitch│ │YT   │    │                  │
│                    │  └─────┘ └─────┘    │                  │
│                    │                     │                  │
│                    │  ┌─────┐ ┌─────┐    │                  │
│                    │  │ 💚  │ │ 🎵  │    │                  │
│                    │  │Kick  │ │TikTok│   │                  │
│                    │  └─────┘ └─────┘    │                  │
│                    │                     │                  │
│                    │  ┌─────────────┐    │                  │
│                    │  │   Other     │    │                  │
│                    │  └─────────────┘    │                  │
│                    │                     │                  │
│                    │  [Back]    [Finish] │                  │
│                    └─────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Page Structure (Desktop - Step 3: Success)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Minimal)                                           │
│  [Logo]                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ┌─────────────────────┐                  │
│                    │                     │                  │
│                    │      🎉             │                  │
│                    │                     │                  │
│                    │   YOU'RE ALL SET!   │                  │
│                    │                     │                  │
│                    │  Your profile is ready:               │
│                    │                     │                  │
│                    │  ┌───────────────────────┐            │
│                    │  │ frens.app/username   📋│            │
│                    │  └───────────────────────┘            │
│                    │                     │                  │
│                    │  Share this link with your viewers    │
│                    │                     │                  │
│                    │  [Go to Dashboard]  │ ← Primary CTA    │
│                    │                     │   (Orange)       │
│                    │                     │                  │
│                    │  💡 Tip: Add your overlay to OBS      │
│                    │     from Settings → OBS Overlays      │
│                    │                     │                  │
│                    └─────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Interface States

**Step 1 - Normal State:**
- Profile image placeholder with camera icon
- Display name field with live URL preview
- Bio field with character counter
- Continue button disabled until display name is valid

**Step 1 - Display Name Taken:**
- Red border on display name field
- Error message: "This name is already taken"
- URL preview shows strikethrough

**Step 1 - Image Upload:**
- Drag state shows dashed border
- Uploading shows spinner in image circle
- Success shows cropped preview

**Step 2 - Normal State:**
- Platform cards selectable (toggle state)
- Multi-select allowed
- At least one must be selected
- Finish button enabled when selection made

**Step 2 - "Other" Selected:**
- Free-text field appears below
- Placeholder: "Enter platform name"

**Step 3 - Success State:**
- Confetti animation on load
- Profile URL in copyable field
- Copy button shows "Copied!" feedback on click

**Mobile State:**
- Single column layout
- Platform selection becomes 2-column grid
- Full-width buttons
- Sticky progress indicator at top

---

### Form Validation Rules

| Field | Validation Rules |
|:------|:-----------------|
| Display Name | 3-30 chars, alphanumeric + underscore only, unique |
| Bio | Max 200 characters |
| Profile Image | JPG/PNG/WebP, max 5MB |
| Platform Selection | At least 1 required |

---

### Onboarding Data Collected

| Field | Required | Stored In |
|:------|:---------|:----------|
| Display Name | ✅ Yes | User profile |
| Profile Image | ❌ No | User profile |
| Bio | ❌ No | User profile |
| Streaming Platform(s) | ✅ Yes | User profile |

---

### Design Tokens (Onboarding-specific)

| Token | Value |
|:------|:------|
| Form Container Width | 480px (desktop), 100% (mobile) |
| Platform Card Size | 100x100px |
| Platform Card Gap | 16px |
| Profile Image Size | 120px diameter |
| Progress Bar Height | 4px |
| Progress Bar Color | Premium Orange (#FF6B35) |
| Confetti Animation | Lottie or CSS confetti burst |

---

## 3. Technical Specs (Owned by @tech-lead)

### MVP Implementation

**Components:**
| Component | Path | Description |
|:----------|:-----|:------------|
| `OnboardingPage` | `src/app/(auth)/onboarding/page.tsx` | Multi-step onboarding wizard |
| `ProfileStep` | `src/components/onboarding/profile-step.tsx` | Step 1: Profile setup |
| `PlatformStep` | `src/components/onboarding/platform-step.tsx` | Step 2: Platform selection |
| `SuccessStep` | `src/components/onboarding/success-step.tsx` | Step 3: Completion success |
| `ProgressIndicator` | `src/components/onboarding/progress-indicator.tsx` | Step progress bar |
| `PlatformCard` | `src/components/onboarding/platform-card.tsx` | Selectable platform card |
| `AvatarUpload` | `src/components/onboarding/avatar-upload.tsx` | Image upload with crop |

**Types:**
```typescript
// src/types/user.ts
interface UserProfile {
  id: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  streamingPlatforms: StreamingPlatform[];
  isOnboarded: boolean;
  createdAt: Date;
}

type StreamingPlatform = "twitch" | "youtube" | "kick" | "tiktok" | "other";

interface OnboardingData {
  displayName: string;
  bio?: string;
  avatarFile?: File;
  streamingPlatforms: StreamingPlatform[];
  otherPlatform?: string;
}
```

**Validation Schema:**
```typescript
// src/lib/validations/onboarding.ts
export const onboardingSchema = z.object({
  displayName: z.string()
    .min(3, "Display name must be at least 3 characters")
    .max(30, "Display name must be 30 characters or less")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
  bio: z.string().max(200).optional(),
  streamingPlatforms: z.array(z.enum(["twitch", "youtube", "kick", "tiktok", "other"]))
    .min(1, "Select at least one platform"),
  otherPlatform: z.string().optional(),
});
```

**Mock Implementation:**
```typescript
// Store in localStorage: 'frens_onboarding'
// Display name uniqueness check against mock user list
```

---

### Post-MVP: Database Schema (Supabase)

```sql
-- Extend profiles table (created in Auth feature)
-- Columns already defined:
-- display_name, bio, avatar_url, streaming_platforms, is_onboarded

-- Display name uniqueness index
CREATE UNIQUE INDEX idx_profiles_display_name ON profiles(display_name) 
WHERE display_name IS NOT NULL;

-- Onboarding completion trigger
CREATE OR REPLACE FUNCTION handle_onboarding_complete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles 
  SET is_onboarded = TRUE 
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

### Post-MVP: API Endpoints

| Method | Endpoint | Purpose | Auth |
|:-------|:---------|:--------|:-----|
| `PATCH` | `/api/v1/profile/me` | Update profile/onboarding data | Required |
| `GET` | `/api/v1/profile/check-name?name={name}` | Check display name availability | None |

**PATCH Payload:**
```typescript
{
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  streamingPlatforms?: string[];
  isOnboarded?: boolean;
}
```
