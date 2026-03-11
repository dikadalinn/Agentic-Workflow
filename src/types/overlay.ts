// Overlay type definitions
export interface OverlaySettings {
  id: string
  streamerId: string
  type: 'alert' | 'player' | 'leaderboard' | 'custom'
  name: string
  theme: 'default' | 'minimal' | 'neon' | 'retro'
  config: {
    alertConfig?: AlertConfig
    playerConfig?: PlayerConfig
    leaderboardConfig?: LeaderboardConfig
    customConfig?: CustomConfig
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AlertConfig {
  animationStyle: 'pulse' | 'fade' | 'slide' | 'shake' | 'bounce'
  soundEnabled: boolean
  soundUrl?: string
  duration: number // seconds
  customMessage?: string
}

export interface PlayerConfig {
  showQueue: boolean
  showProgress: boolean
  queueSize: number
  autoPlay: boolean
}

export interface LeaderboardConfig {
  maxDonors: 3 | 5 | 10
  showAmount: boolean
}

export interface CustomConfig {
  backgroundImageUrl?: string
  customCss?: string
}

// Store interfaces
export interface OverlayState {
  alertSettings: OverlaySettings | null
  playerSettings: OverlaySettings | null
  leaderboardSettings: OverlaySettings | null
  customSettings: OverlaySettings | null
  previewOverlay: OverlaySettings | null
  testAlertTriggered: boolean
}

export interface OverlayActions {
  setAlertSettings: (settings: OverlaySettings) => void
  setPlayerSettings: (settings: OverlaySettings) => void
  setLeaderboardSettings: (settings: OverlaySettings) => void
  setCustomSettings: (settings: OverlaySettings) => void
  setPreviewOverlay: (overlay: OverlaySettings) => void
  triggerTestAlert: () => void
  clearTestAlert: () => void
  updateOverlay: (type: 'alert' | 'player' | 'leaderboard' | 'custom', updates: Partial<OverlaySettings>) => void
}

export type OverlayStore = OverlayState & OverlayActions

// Additional store functions (not part of main store interface)
export interface OverlayStoreHelpers {
  initializeSettings: (streamerId: string) => void
}
