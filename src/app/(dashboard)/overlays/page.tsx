'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { useOverlayStore } from '@/store/overlays.store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertConfigPanel } from '@/components/overlays/alert-config-panel'
import { PlayerConfigPanel } from '@/components/overlays/player-config-panel'
import { LeaderboardConfigPanel } from '@/components/overlays/leaderboard-config-panel'
import { OverlayPreview } from '@/components/overlays/overlay-preview'
import { OverlayURLGenerator } from '@/components/overlays/overlay-url-generator'
import { Copy, Settings } from 'lucide-react'

export default function OverlaysPage() {
  const router = useRouter()
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  const {
    alertSettings,
    playerSettings,
    leaderboardSettings,
    previewOverlay,
    setPreviewOverlay,
    initializeSettings,
    updateOverlay,
  } = useOverlayStore()

  const [activeTab, setActiveTab] = useState<'alert' | 'player' | 'leaderboard'>('alert')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isMounted) return

    const authCheckTimeout = setTimeout(() => {
      if (!isAuthenticated || !user) {
        router.push('/login')
        return
      }

      if (!user.isOnboarded) {
        router.push('/onboarding')
        return
      }
    }, 100)

    return () => clearTimeout(authCheckTimeout)
  }, [isMounted, isAuthenticated, user, router])

  // Initialize overlay settings when user is authenticated
  useEffect(() => {
    if (isMounted && isAuthenticated && user?.id) {
      initializeSettings(user.id)
    }
  }, [isMounted, isAuthenticated, user?.id, initializeSettings])

  const handlePreview = () => {
    if (activeTab === 'alert' && alertSettings) {
      setPreviewOverlay(alertSettings)
    } else if (activeTab === 'player' && playerSettings) {
      setPreviewOverlay(playerSettings)
    } else if (activeTab === 'leaderboard' && leaderboardSettings) {
      setPreviewOverlay(leaderboardSettings)
    }
  }

  const handleSettingsUpdate = (updates: any) => {
    updateOverlay(activeTab, updates)
  }

  if (!isMounted) {
    return null
  }

  const getCurrentSettings = () => {
    switch (activeTab) {
      case 'alert':
        return alertSettings
      case 'player':
        return playerSettings
      case 'leaderboard':
        return leaderboardSettings
    }
  }

  const currentSettings = getCurrentSettings()

  if (!currentSettings) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">⚙️</div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Settings</h2>
          <p className="text-muted-foreground">Please wait...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">OBS Overlays</h1>
          <p className="text-muted-foreground">
            Configure and customize your stream overlays for alerts, player, and leaderboard
          </p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="w-full">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="alert">Alerts</TabsTrigger>
          <TabsTrigger value="player">Player & Queue</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        {/* Alerts Tab */}
        <TabsContent value="alert" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary-orange" />
                  Alert Configuration
                </CardTitle>
                <CardDescription>
                  Customize how donation alerts appear on your stream
                </CardDescription>
              </CardHeader>
              <CardContent>
                {alertSettings && (
                  <AlertConfigPanel
                    settings={alertSettings}
                    onUpdate={handleSettingsUpdate}
                  />
                )}
              </CardContent>
            </Card>

            {/* Preview & URL */}
            <div className="space-y-6">
              <OverlayPreview type="alert" settings={alertSettings} />
              <OverlayURLGenerator type="alert" streamerId={user?.id || ''} />
            </div>
          </div>
        </TabsContent>

        {/* Player Tab */}
        <TabsContent value="player" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary-orange" />
                  Player & Queue Configuration
                </CardTitle>
                <CardDescription>
                  Configure the music player and request queue overlay
                </CardDescription>
              </CardHeader>
              <CardContent>
                {playerSettings && (
                  <PlayerConfigPanel
                    settings={playerSettings}
                    onUpdate={handleSettingsUpdate}
                  />
                )}
              </CardContent>
            </Card>

            {/* Preview & URL */}
            <div className="space-y-6">
              <OverlayPreview type="player" settings={playerSettings} />
              <OverlayURLGenerator type="player" streamerId={user?.id || ''} />
            </div>
          </div>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary-orange" />
                  Leaderboard Configuration
                </CardTitle>
                <CardDescription>
                  Display your top donors on stream
                </CardDescription>
              </CardHeader>
              <CardContent>
                {leaderboardSettings && (
                  <LeaderboardConfigPanel
                    settings={leaderboardSettings}
                    onUpdate={handleSettingsUpdate}
                  />
                )}
              </CardContent>
            </Card>

            {/* Preview & URL */}
            <div className="space-y-6">
              <OverlayPreview type="leaderboard" settings={leaderboardSettings} />
              <OverlayURLGenerator type="leaderboard" streamerId={user?.id || ''} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Instructions Card */}
      <Card className="mt-8 bg-gradient-to-br from-primary-orange/10 to-transparent border-primary-orange/20">
        <CardHeader>
          <CardTitle>How to Add Overlay to OBS</CardTitle>
          <CardDescription>Follow these steps to add your overlay to your streaming software</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ol className="list-decimal list-inside space-y-2">
            <li>Copy the overlay URL from the card above</li>
            <li>Open OBS and go to <strong>Sources</strong> → <strong>+</strong> → <strong>Browser</strong></li>
            <li>Paste the URL into the <strong>URL</strong> field</li>
            <li>Set <strong>Width</strong> to 1920 and <strong>Height</strong> to 1080 (or your stream resolution)</li>
            <li>Click <strong>OK</strong> and position the overlay as needed</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
