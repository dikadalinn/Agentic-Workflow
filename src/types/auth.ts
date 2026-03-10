export type StreamingPlatform = "twitch" | "youtube" | "kick" | "tiktok" | "other"

export interface User {
  id: string
  email: string
  displayName: string
  bio?: string
  avatar?: string
  streamingPlatforms?: StreamingPlatform[]
  otherPlatform?: string
  isOnboarded: boolean
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, displayName: string) => Promise<void>
  updateProfile: (updates: Partial<User>) => void
  completeOnboarding: () => void
  checkAuth: () => void
}

export type AuthStore = AuthState & AuthActions
