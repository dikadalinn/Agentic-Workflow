export type StreamingPlatform = 'twitch' | 'youtube' | 'kick' | 'tiktok' | 'other'

export interface OnboardingData {
  displayName: string
  bio?: string
  avatarUrl?: string // Base64 or blob URL
  streamingPlatforms: StreamingPlatform[]
  otherPlatform?: string
  isOnboarded: boolean
}
