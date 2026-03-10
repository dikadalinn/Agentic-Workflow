import { create } from 'zustand'
import type { OverlayStore, OverlaySettings } from '@/types/overlay'

// Default configurations for each overlay type
const createDefaultAlertSettings = (streamerId: string): OverlaySettings => ({
  id: `alert-${Date.now()}`,
  streamerId,
  type: 'alert',
  name: 'Donation Alerts',
  theme: 'default',
  config: {
    alertConfig: {
      animationStyle: 'pulse',
      soundEnabled: true,
      duration: 5,
      customMessage: 'Thank you for the donation, {username}!',
    },
  },
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})

const createDefaultPlayerSettings = (streamerId: string): OverlaySettings => ({
  id: `player-${Date.now()}`,
  streamerId,
  type: 'player',
  name: 'Music Player & Queue',
  theme: 'default',
  config: {
    playerConfig: {
      showQueue: true,
      showProgress: true,
      queueSize: 5,
      autoPlay: true,
    },
  },
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})

const createDefaultLeaderboardSettings = (streamerId: string): OverlaySettings => ({
  id: `leaderboard-${Date.now()}`,
  streamerId,
  type: 'leaderboard',
  name: 'Top Donors Leaderboard',
  theme: 'default',
  config: {
    leaderboardConfig: {
      maxDonors: 5,
      showAmount: true,
    },
  },
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
})

const createDefaultCustomSettings = (streamerId: string): OverlaySettings => ({
  id: `custom-${Date.now()}`,
  streamerId,
  type: 'custom',
  name: 'Custom Overlay',
  theme: 'default',
  config: {
    customConfig: {},
  },
  isActive: false,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const useOverlayStore = create<OverlayStore>((set, get) => ({
  // State
  alertSettings: null,
  playerSettings: null,
  leaderboardSettings: null,
  customSettings: null,
  previewOverlay: null,
  testAlertTriggered: false,

  // Actions
  setAlertSettings: (settings: OverlaySettings) => {
    set({ alertSettings: settings })
  },

  setPlayerSettings: (settings: OverlaySettings) => {
    set({ playerSettings: settings })
  },

  setLeaderboardSettings: (settings: OverlaySettings) => {
    set({ leaderboardSettings: settings })
  },

  setCustomSettings: (settings: OverlaySettings) => {
    set({ customSettings: settings })
  },

  setPreviewOverlay: (overlay: OverlaySettings) => {
    set({ previewOverlay: overlay })
  },

  triggerTestAlert: () => {
    set({ testAlertTriggered: true })
    // Auto-clear after 5 seconds
    setTimeout(() => {
      set({ testAlertTriggered: false })
    }, 5000)
  },

  clearTestAlert: () => {
    set({ testAlertTriggered: false })
  },

  updateOverlay: (type, updates) => {
    const state = get()
    let settings: OverlaySettings | null = null

    switch (type) {
      case 'alert':
        settings = state.alertSettings
        break
      case 'player':
        settings = state.playerSettings
        break
      case 'leaderboard':
        settings = state.leaderboardSettings
        break
      case 'custom':
        settings = state.customSettings
        break
    }

    if (settings) {
      const updatedSettings = {
        ...settings,
        ...updates,
        updatedAt: new Date(),
      }

      switch (type) {
        case 'alert':
          set({ alertSettings: updatedSettings })
          break
        case 'player':
          set({ playerSettings: updatedSettings })
          break
        case 'leaderboard':
          set({ leaderboardSettings: updatedSettings })
          break
        case 'custom':
          set({ customSettings: updatedSettings })
          break
      }
    }
  },

  // Helper to initialize default settings
  initializeSettings: (streamerId: string) => {
    const state = get()

    if (!state.alertSettings) {
      set({ alertSettings: createDefaultAlertSettings(streamerId) })
    }

    if (!state.playerSettings) {
      set({ playerSettings: createDefaultPlayerSettings(streamerId) })
    }

    if (!state.leaderboardSettings) {
      set({ leaderboardSettings: createDefaultLeaderboardSettings(streamerId) })
    }

    if (!state.customSettings) {
      set({ customSettings: createDefaultCustomSettings(streamerId) })
    }
  },
}))
