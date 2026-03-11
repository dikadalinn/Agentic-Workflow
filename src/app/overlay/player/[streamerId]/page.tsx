'use client'

import { useEffect, useState, useCallback } from 'react'
import { PlayerOverlay } from '@/components/overlays/player-overlay'
import type { OverlaySettings } from '@/types/overlay'
import type { QueuedSong, PlayerState } from '@/types/player'
import { isQueueUpdate, isSettingsUpdate, isPlayerState } from '@/types/broadcast'
import { useBroadcastSync } from '@/hooks/use-broadcast-sync'
import { mockQueue, mockCurrentSong } from '@/lib/mock-player-data'

import type { BroadcastMessage } from '@/types/broadcast'

interface PlayerOverlayPageProps {
  params: {
    streamerId: string
  }
}

// Default settings for initial load
const defaultPlayerSettings: OverlaySettings = {
  id: 'player-mock',
  streamerId: '',
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
}

export default function PlayerOverlayPage({ params }: PlayerOverlayPageProps) {
  const [settings, setSettings] = useState<OverlaySettings | null>(null)
  const [queue, setQueue] = useState<QueuedSong[]>(mockQueue)
  const [currentSong, setCurrentSong] = useState<QueuedSong | null>(mockCurrentSong)
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    volume: 100,
    currentTime: 0,
    duration: 0,
    currentSong: null,
  })

  // Handle incoming broadcast messages
  const handleBroadcastMessage = useCallback((message: BroadcastMessage) => {
    // Handle queue updates
    if (isQueueUpdate(message)) {
      setQueue(message.payload.queue)
      setCurrentSong(message.payload.currentSong)
    }

    // Handle settings updates
    if (isSettingsUpdate(message) && message.payload.overlayType === 'player') {
      setSettings(message.payload.settings)
    }

    // Handle player state changes
    if (isPlayerState(message)) {
      setPlayerState((prev) => ({
        ...prev,
        ...message.payload,
      }))
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
          if (parsed.state?.playerSettings) {
            setSettings(parsed.state.playerSettings)
            return
          }
        }
      } catch (error) {
        console.warn('Failed to load settings from localStorage:', error)
      }

      // Fallback to default settings
      setSettings({
        ...defaultPlayerSettings,
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
          <div className="text-4xl mb-4 animate-pulse">🎵</div>
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

      <PlayerOverlay
        settings={settings}
        queue={queue}
        currentSong={currentSong}
        playerState={playerState}
        isPreview={false}
      />
    </div>
  )
}
