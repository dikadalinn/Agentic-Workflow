'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { OverlaySettings } from '@/types/overlay'
import { Play, RefreshCw } from 'lucide-react'
import { AlertOverlay } from './alert-overlay'
import { PlayerOverlay } from './player-overlay'
import { LeaderboardOverlay } from './leaderboard-overlay'

interface OverlayPreviewProps {
  type: 'alert' | 'player' | 'leaderboard'
  settings: OverlaySettings | null
}

export function OverlayPreview({ type, settings }: OverlayPreviewProps) {
  const [isTestTriggered, setIsTestTriggered] = useState(false)

  useEffect(() => {
    const handleTestAlert = () => {
      if (type === 'alert') {
        setIsTestTriggered(true)
        setTimeout(() => setIsTestTriggered(false), 5000)
      }
    }

    window.addEventListener('test-alert', handleTestAlert as EventListener)
    return () => {
      window.removeEventListener('test-alert', handleTestAlert as EventListener)
    }
  }, [type])

  const handleTestClick = () => {
    if (type === 'alert') {
      setIsTestTriggered(true)
      setTimeout(() => setIsTestTriggered(false), 5000)
    }
  }

  const getPreviewHeight = () => {
    switch (type) {
      case 'alert':
        return '200px'
      case 'player':
        return '280px'
      case 'leaderboard':
        return '350px'
    }
  }

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-primary-orange" />
          Live Preview
        </CardTitle>
        <CardDescription>
          See how your overlay will appear in OBS (400x300px)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview Container */}
        <div
          className="relative w-full bg-black rounded-lg overflow-hidden border border-white/10"
          style={{ height: getPreviewHeight() }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            {settings && (
              <>
                {type === 'alert' && (
                  <AlertOverlay
                    settings={settings}
                    isTriggered={isTestTriggered}
                    isPreview={true}
                  />
                )}
                {type === 'player' && (
                  <PlayerOverlay settings={settings} isPreview={true} />
                )}
                {type === 'leaderboard' && (
                  <LeaderboardOverlay settings={settings} isPreview={true} />
                )}
              </>
            )}

            {!settings && (
              <div className="text-center text-muted-foreground">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-sm">Loading preview...</p>
              </div>
            )}
          </div>

          {/* Preview Badge */}
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            400x300px
          </div>
        </div>

        {/* Test Button */}
        {type === 'alert' && (
          <Button
            onClick={handleTestClick}
            className="w-full bg-primary-orange hover:bg-primary-orange-hover text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Test Alert Animation
          </Button>
        )}

        {type !== 'alert' && (
          <div className="text-center text-sm text-muted-foreground">
            Preview updates automatically
          </div>
        )}
      </CardContent>
    </Card>
  )
}
