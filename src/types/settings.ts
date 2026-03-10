export interface DonationTier {
  id: string
  name: string
  minAmount: number
  color: string
  icon?: string
}

export interface DonationSettings {
  minimumDonationAmount: number
  queueSortingRule: 'fifo' | 'highest_first'
  currency: string
  customThankYouMessage?: string
  donationTiers: DonationTier[]
}

export interface SettingsState {
  settings: DonationSettings
  isLoading: boolean
}

export interface SettingsActions {
  updateSettings: (settings: Partial<DonationSettings>) => void
  resetToDefaults: () => void
  addDonationTier: (tier: Omit<DonationTier, 'id'>) => void
  removeDonationTier: (id: string) => void
  updateDonationTier: (id: string, updates: Partial<DonationTier>) => void
  loadSettings: () => void
  saveSettings: () => void
}

export type SettingsStore = SettingsState & SettingsActions
