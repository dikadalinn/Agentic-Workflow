'use client'

import { useEffect, useState, useCallback } from 'react'
import { AlertOverlay } from '@/components/overlays/alert-overlay'
import type { OverlaySettings } from '@/types/overlay'
import { isSettingsUpdate, isAlertTrigger } from '@/types/broadcast'
import { useBroadcastSync } from '@/hooks/use-broadcast-sync'

interface AlertOverlayPageProps {
  params: {
    streamerId: string
  }
}

// Default settings for initial load
const defaultAlertSettings: OverlaySettings = {
  id: 'alert-mock',
  streamerId: '',
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
}

interface AlertData {
  donorName: string
  amount: number
  message?: string
  isTest: boolean
}

export default function AlertOverlayPage({ params }: AlertOverlayPageProps) {
  const [settings, setSettings] = useState<OverlaySettings | null>(null)
  const [isAlertTriggered, setIsAlertTriggered] = useState(false)
  const [alertData, setAlertData] = useState<AlertData | null>(null)

  // Handle incoming broadcast messages
  const handleBroadcastMessage = useCallback(
    (message) => {
      // Handle settings updates
      if (isSettingsUpdate(message) && message.payload.overlayType === 'alert') {
        setSettings(message.payload.settings)
      }

      // Handle alert triggers (from dashboard test or real donations)
      if (isAlertTrigger(message)) {
        const { donorName, amount, message: alertMessage, isTest } = message.payload
        setAlertData({ donorName, amount, message: alertMessage, isTest })
        setIsAlertTriggered(true)

        // Auto-dismiss after duration
        const duration = settings?.config?.alertConfig?.duration || 5
        setTimeout(() => {
          setIsAlertTriggered(false)
          setAlertData(null)
        }, duration * 1000)
      }
    },
    [settings?.config?.alertConfig?.duration]
  )

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
          if (parsed.state?.alertSettings) {
            setSettings(parsed.state.alertSettings)
            return
          }
        }
      } catch (error) {
        console.warn('Failed to load settings from localStorage:', error)
      }

      // Fallback to default settings
      setSettings({
        ...defaultAlertSettings,
        streamerId: params.streamerId,
      })
    }

    loadInitialSettings()
  }, [params.streamerId])

  // Mock demo alerts (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setAlertData({
          donorName: 'DemoDonor',
          amount: 5.0,
          message: 'This is a demo alert!',
          isTest: true,
        })
        setIsAlertTriggered(true)
        setTimeout(() => {
          setIsAlertTriggered(false)
          setAlertData(null)
        }, 5000)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  // Loading state
  if (!settings) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="text-4xl mb-4 animate-pulse">🔔</div>
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
    <div className="w-full h-screen relative overflow-hidden bg-transparent">
      {/* Connection status indicator (only visible in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-2 right-2 text-xs px-2 py-1 rounded bg-black/50 text-white/70">
          {isConnected ? '🟢 Synced' : '🔴 Disconnected'}
        </div>
      )}

      {isAlertTriggered && alertData && (
        <AlertOverlay
          settings={settings}
          isTriggered={isAlertTriggered}
          isPreview={false}
          donorName={alertData.donorName}
          amount={alertData.amount}
          message={alertData.message}
        />
      )}
    </div>
  )
}
