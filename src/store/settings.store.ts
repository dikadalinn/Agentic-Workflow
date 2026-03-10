import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DonationTier, DonationSettings } from '@/types'

const DEFAULT_SETTINGS: DonationSettings = {
  minimumDonationAmount: 1.0,
  queueSortingRule: 'fifo',
  currency: 'USD',
  customThankYouMessage: 'Thank you for your song request! 🎵',
  donationTiers: [
    {
      id: 'tier-1',
      name: 'Bronze',
      minAmount: 1,
      color: '#CD7F32',
    },
    {
      id: 'tier-2',
      name: 'Silver',
      minAmount: 5,
      color: '#C0C0C0',
    },
    {
      id: 'tier-3',
      name: 'Gold',
      minAmount: 10,
      color: '#FFD700',
    },
    {
      id: 'tier-4',
      name: 'Platinum',
      minAmount: 25,
      color: '#E5E4E2',
    },
  ],
}

export const useSettingsStore = create()(
  persist(
    (set) => ({
      // State
      settings: DEFAULT_SETTINGS,
      isLoading: false,

      // Actions
      updateSettings: (updates: Partial<DonationSettings>) => {
        set((state: any) => ({
          settings: { ...state.settings, ...updates },
        }))
      },

      resetToDefaults: () => {
        set({ settings: DEFAULT_SETTINGS })
      },

      addDonationTier: (tier: DonationTier) => {
        set((state: any) => ({
          settings: {
            ...state.settings,
            donationTiers: [...state.settings.donationTiers, { ...tier, id: `tier-${Date.now()}` }],
          },
        }))
      },

      removeDonationTier: (id: string) => {
        set((state: any) => ({
          settings: {
            ...state.settings,
            donationTiers: state.settings.donationTiers.filter((t: DonationTier) => t.id !== id),
          },
        }))
      },

      updateDonationTier: (id: string, updates: Partial<DonationTier>) => {
        set((state: any) => ({
          settings: {
            ...state.settings,
            donationTiers: state.settings.donationTiers.map((t: DonationTier) =>
              t.id === id ? { ...t, ...updates } : t
            ),
          },
        }))
      },

      loadSettings: () => {
        // Settings are automatically loaded from localStorage via persist middleware
        const storedSettings = localStorage.getItem('settings-storage')
        if (storedSettings) {
          const parsed = JSON.parse(storedSettings)
          if (parsed.state?.settings) {
            set({ settings: parsed.state.settings })
          }
        }
      },

      saveSettings: () => {
        // Settings are automatically saved to localStorage via persist middleware
        // This is a no-op, kept for API compatibility
      },
    }),
    {
      name: 'settings-storage',
    }
  )
)
