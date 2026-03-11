'use client'

import { useEffect, useState, useCallback } from 'react'
import { LeaderboardOverlay } from '@/components/overlays/leaderboard-overlay'
import type { OverlaySettings } from '@/types/overlay'
import { isSettingsUpdate, isLeaderboardUpdate } from '@/types/broadcast'
import { useBroadcastSync } from '@/hooks/use-broadcast-sync'

interface LeaderboardOverlayPageProps {
  params: {
    streamerId: string
  }
}

// Default settings for initial load
const defaultLeaderboardSettings: OverlaySettings = {
  id: 'leaderboard-mock',
  streamerId: '',
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
}

interface LeaderboardDonor {
  name: string
  totalAmount: number
  donationCount: number
}

export default function LeaderboardOverlayPage({ params }: LeaderboardOverlayPageProps) {
  const [settings, setSettings] = useState<OverlaySettings | null>(null)
  const [donors, setDonors] = useState<LeaderboardDonor[]>([
    { name: 'TopDonor1', totalAmount: 150.0, donationCount: 12 },
    { name: 'MusicLover99', totalAmount: 75.5, donationCount: 8 },
    { name: 'StreamFan', totalAmount: 50.0, donationCount: 5 },
    { name: 'ChatMember', totalAmount: 25.0, donationCount: 3 },
    { name: 'NewViewer', totalAmount: 10.0, donationCount: 1 },
  ])

  // Handle incoming broadcast messages
  const handleBroadcastMessage = useCallback((message: BroadcastMessage) => {
    // Handle settings updates
    if (isSettingsUpdate(message) && message.payload.overlayType === 'leaderboard') {
      setSettings(message.payload.settings)
    }

    // Handle leaderboard updates (new donations change rankings)
    if (isLeaderboardUpdate(message)) {
      setDonors(message.payload.donors)
    }
  }, [])

  // Subscribe to BroadcastChannel for real-time updates
  const { isSupported, isConnected } = useBroadcastSync({
    streamerId: params.streamerId,
    onMessage: handleBroadcastMessage,
  })

  // Load initial settings from localStorage (hybrid approach)
  useEffect(() => {
    const loadInitialSettings = () => {
      try {
        const storedSettings = localStorage.getItem('overlay-storage')
        if (storedSettings) {
          const parsed = JSON.parse(storedSettings)
          if (parsed.state?.leaderboardSettings) {
            setSettings(parsed.state.leaderboardSettings)
            return
          }
        }
      } catch (error) {
        console.warn('Failed to load settings from localStorage:', error)
      }

      // Fallback to default settings
      setSettings({
        ...defaultLeaderboardSettings,
        streamerId: params.streamerId,
      })
    }

    loadInitialSettings()
  }, [params.streamerId])

  // Loading state
  if (!settings) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="text-4xl mb-4 animate-pulse">🏆</div>
          <p className="text-white/70">Loading overlay...</p>
          {!isSupported && (
            <p className="text-yellow-500 text-sm mt-2">
              ⚠️ Real-time sync not supported in this browser
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen p-4 flex items-center justify-center bg-transparent">
      {/* Connection status indicator (only visible in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-2 right-2 text-xs px-2 py-1 rounded bg-black/50 text-white/50">
          BroadcastChannel: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      )}

      <LeaderboardOverlay settings={settings} donors={donors} isPreview={false} />
    </div>
  )
}
