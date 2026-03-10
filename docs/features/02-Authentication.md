# Feature: Authentication
**Status:** Tech Architected

---

## 1. Business Context (Owned by @business-analyst)

**Goal:** 
Enable streamers to securely create an account and access the platform, establishing identity for donation collection and profile management.

**High-Level Flow:**
1. Streamer clicks "Get Started" from Landing Page → 
2. Enters email and password → 
3. Receives verification email → 
4. Clicks verification link → 
5. Account activated → 
6. Redirected to Onboarding flow

**Key Business Rules:**
- Email verification is mandatory before account activation
- Only streamers need to authenticate (viewers are frictionless)
- Secure login required for dashboard access

---

## 2. Product & UX Specs (Owned by @product-manager)

### User Stories & Acceptance Criteria

---

#### Registration Flow

**US-02.1: Email Registration**
- **As a** Streamer, **I want to** create an account using my email address, **so that** I can access the platform.
  - *AC1:* Registration form has fields: Email, Password, Confirm Password
  - *AC2:* Email validation occurs on blur (real-time format check)
  - *AC3:* Password must meet minimum requirements (8+ characters, 1 number, 1 special char)
  - *AC4:* "Show Password" toggle available for password fields
  - *AC5:* "Sign Up" button is disabled until form is valid
  - *AC6:* Success: User receives "Check your email" confirmation screen

**US-02.2: Email Verification**
- **As a** Streamer, **I want to** verify my email address, **so that** my account is activated securely.
  - *AC1:* Verification email sent within 30 seconds of registration
  - *AC2:* Email contains: Frens branding, verification link, expiry notice (24 hours)
  - *AC3:* Clicking verification link opens "Email Verified" success page
  - *AC4:* "Resend verification email" option available if link expired
  - *AC5:* Verified users are auto-redirected to Onboarding flow

**US-02.3: Registration with Existing Email**
- **As a** Streamer, **I want to** know if my email is already registered, **so that** I don't create duplicate accounts.
  - *AC1:* On form submit, if email exists, show: "Email already registered. [Log in instead?]"
  - *AC2:* "Log in instead" link redirects to Login page with email pre-filled

---

#### Login Flow

**US-02.4: Email Login**
- **As a** Streamer, **I want to** log in with my email and password, **so that** I can access my dashboard.
  - *AC1:* Login form has fields: Email, Password
  - *AC2:* "Remember me" checkbox (extends session duration)
  - *AC3:* "Forgot password?" link visible below password field
  - *AC4:* Success: Redirect to Dashboard (or Onboarding if not completed)
  - *AC5:* Failure: Show generic error "Invalid email or password"

**US-02.5: Unverified Account Login**
- **As a** Streamer, **I want to** be reminded to verify my email if I try to log in unverified, **so that** I can complete the process.
  - *AC1:* If email exists but unverified, show: "Please verify your email to continue"
  - *AC2:* Display "Resend verification email" button
  - *AC3:* Link to resend verification without logging in

**US-02.6: Session Persistence**
- **As a** Streamer, **I want to** stay logged in, **so that** I don't have to re-authenticate frequently.
  - *AC1:* Session persists for 7 days by default
  - *AC2:* "Remember me" extends session to 30 days
  - *AC3:* Session cleared on explicit logout

---

#### Password Reset Flow

**US-02.7: Forgot Password**
- **As a** Streamer, **I want to** reset my password via email, **so that** I can regain access if I forget it.
  - *AC1:* "Forgot password?" link opens password reset modal/page
  - *AC2:* User enters email → receives reset link
  - *AC3:* Reset link expires after 1 hour
  - *AC4:* Reset page: New Password + Confirm Password fields
  - *AC5:* Success: Redirect to Login with "Password updated" toast

**US-02.8: Password Reset Link Expired**
- **As a** Streamer, **I want to** request a new reset link if mine expired, **so that** I can still reset my password.
  - *AC1:* Expired link shows: "This link has expired. Request a new one?"
  - *AC2:* "Request new link" button resends email

---

#### Logout

**US-02.9: Logout**
- **As a** Streamer, **I want to** log out of my account, **so that** I can secure my session on shared devices.
  - *AC1:* Logout option in user menu (avatar dropdown)
  - *AC2:* Logout clears session and redirects to Landing Page
  - *AC3:* No "Are you sure?" confirmation (immediate logout)

---

### UI Design Intent & States

> **Design Intent:** Clean, minimal, and trustworthy. The authentication experience should feel secure yet effortless. Use the Premium Modern Orange sparingly — primarily on primary CTAs and focus states. Form fields should feel spacious with generous padding. Avoid overwhelming the user with too many options.

---

#### Page Structure (Desktop - Registration)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Minimal)                                           │
│  [Logo]                                              [Login]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ┌─────────────────────┐                  │
│                    │   CREATE ACCOUNT    │                  │
│                    │                     │                  │
│                    │  Email              │                  │
│                    │  [________________] │                  │
│                    │                     │                  │
│                    │  Password           │                  │
│                    │  [______________👁] │                  │
│                    │                     │                  │
│                    │  Confirm Password   │                  │
│                    │  [______________👁] │                  │
│                    │                     │                  │
│                    │  [Create Account]   │ ← Primary CTA    │
│                    │                     │   (Orange)       │
│                    │  ─────────────────  │                  │
│                    │  Already have one?  │                  │
│                    │  [Log in]           │                  │
│                    └─────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Page Structure (Desktop - Login)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Minimal)                                           │
│  [Logo]                                           [Sign Up] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ┌─────────────────────┐                  │
│                    │     WELCOME BACK    │                  │
│                    │                     │                  │
│                    │  Email              │                  │
│                    │  [________________] │                  │
│                    │                     │                  │
│                    │  Password           │                  │
│                    │  [______________👁] │                  │
│                    │                     │                  │
│                    │  ☐ Remember me                      │
│                    │                     │                  │
│                    │  [Log In]           │ ← Primary CTA    │
│                    │                     │   (Orange)       │
│                    │                     │                  │
│                    │  Forgot password?   │ ← Link           │
│                    │                     │                  │
│                    │  ─────────────────  │                  │
│                    │  Don't have account?│                  │
│                    │  [Sign up]          │                  │
│                    └─────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Page Structure (Desktop - Email Verification Pending)

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Minimal)                                           │
│  [Logo]                                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ┌─────────────────────┐                  │
│                    │      📧             │                  │
│                    │                     │                  │
│                    │   CHECK YOUR EMAIL  │                  │
│                    │                     │                  │
│                    │  We sent a verification link to:       │
│                    │  user@example.com                      │
│                    │                     │                  │
│                    │  [Resend Email]     │ ← Secondary      │
│                    │                     │                  │
│                    │  Didn't receive? Check spam folder.    │
│                    └─────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### Interface States

**Registration - Normal State:**
- All form fields visible and interactive
- Real-time validation feedback (green checkmarks for valid fields)
- Primary CTA enabled when form is valid

**Registration - Loading State:**
- "Create Account" button shows spinner + "Creating account..."
- Form fields disabled during submission

**Registration - Error State:**
- Field-level errors appear below each field (red text)
- Form-level errors appear as toast notification at top
- Email already exists: Show inline message with login link

**Login - Normal State:**
- Clean form with email and password fields
- "Remember me" checkbox unchecked by default

**Login - Error State:**
- Generic error: "Invalid email or password. Please try again."
- Unverified account: "Please verify your email first" + resend option
- Error appears as red alert box above form

**Email Verification - Success State:**
- Success icon (✓) with "Email verified!"
- Auto-redirect to Onboarding after 2 seconds
- "Continue" button for manual navigation

**Password Reset - Modal/Page:**
- Single email input field
- "Send Reset Link" button
- Success: "Check your email for reset instructions"

**Mobile State:**
- Form takes full width with generous padding
- Sticky header collapses to logo only
- Keyboard optimizes for email/password input types

---

### Form Validation Rules

| Field | Validation Rules |
|:------|:-----------------|
| Email | Valid email format, required, max 255 chars |
| Password | Min 8 chars, at least 1 number, at least 1 special char |
| Confirm Password | Must match Password field exactly |

---

### Error Messages (Copy)

| Scenario | Error Message |
|:---------|:--------------|
| Invalid email format | "Please enter a valid email address" |
| Password too short | "Password must be at least 8 characters" |
| Password missing number | "Password must include at least one number" |
| Password missing special char | "Password must include at least one special character" |
| Passwords don't match | "Passwords do not match" |
| Email already registered | "This email is already registered. [Log in instead?]" |
| Invalid credentials | "Invalid email or password. Please try again." |
| Unverified account | "Please verify your email to continue. [Resend verification email]" |
| Reset link expired | "This link has expired. [Request a new one]" |

---

### Design Tokens (Authentication-specific)

| Token | Value |
|:------|:------|
| Form Container Width | 400px (desktop), 100% (mobile) |
| Input Height | 48px |
| Input Padding | 16px horizontal |
| Input Border | 1px solid #E5E7EB |
| Input Focus Border | 2px solid Premium Orange |
| Error Color | #EF4444 (Red-500) |
| Success Color | #10B981 (Emerald-500) |

---

## 3. Technical Specs (Owned by @tech-lead)

### MVP Implementation (Mock Auth)

**Components:**
| Component | Path | Description |
|:----------|:-----|:------------|
| `LoginPage` | `src/app/(auth)/login/page.tsx` | Login form |
| `RegisterPage` | `src/app/(auth)/register/page.tsx` | Registration form |
| `VerifyPendingPage` | `src/app/(auth)/verify-pending/page.tsx` | Email verification pending |
| `VerifySuccessPage` | `src/app/(auth)/verify-success/page.tsx` | Email verified success |
| `ForgotPasswordModal` | `src/components/auth/forgot-password-modal.tsx` | Password reset request |
| `ResetPasswordPage` | `src/app/(auth)/reset-password/page.tsx` | Reset password form |

**Auth Store (Zustand):**
```typescript
// src/store/auth.store.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<Result<User>>;
  register: (email: string, password: string) => Promise<Result<User>>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<Result<void>>;
  requestPasswordReset: (email: string) => Promise<Result<void>>;
  resetPassword: (token: string, newPassword: string) => Promise<Result<void>>;
}
```

**Mock User Data Structure:**
```typescript
// src/types/user.ts
interface User {
  id: string;
  email: string;
  displayName: string | null;
  avatar: string | null;
  isEmailVerified: boolean;
  createdAt: string;
}

// Stored in localStorage as 'frens_user'
```

**Validation Schemas (Zod):**
```typescript
// src/lib/validations/auth.ts
export const registerSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must include at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
```

---

### Post-MVP: Database Schema (Supabase)

```sql
-- Users table (managed by Supabase Auth, extended profile)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(30) UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  streaming_platforms TEXT[],
  is_onboarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by all"
  ON profiles FOR SELECT
  USING (deleted_at IS NULL);
```

---

### Post-MVP: API Endpoints (Supabase Auth)

| Method | Endpoint | Purpose | Auth |
|:-------|:---------|:--------|:-----|
| `POST` | `/auth/v1/signup` | Register new user | None |
| `POST` | `/auth/v1/token?grant_type=password` | Login | None |
| `POST` | `/auth/v1/logout` | Logout | Required |
| `POST` | `/auth/v1/verify` | Verify email | Token |
| `POST` | `/auth/v1/recover` | Request password reset | None |
| `POST` | `/auth/v1/resend` | Resend verification email | None |

**Note:** These are Supabase Auth endpoints — handled client-side via `@supabase/auth-helpers-nextjs`.
