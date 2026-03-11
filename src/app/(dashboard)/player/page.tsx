'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { usePlayerStore } from '@/store/player.store'
import { useQueueStore } from '@/store/queue.store'
import { NowPlaying } from '@/components/player/now-playing'
import { PlayerControls } from '@/components/player/player-controls'
import { QueueList } from '@/components/player/queue-list'
import { mockQueue, mockCurrentSong } from '@/lib/mock-player-data'
import { Play, MoreVertical, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PlayerPage() {
  const router = useRouter()
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  const { currentSong, setCurrentSong, play, pause } = usePlayerStore()
  const { songs, setSongs, sortMode, setSortMode } = useQueueStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    checkAuth()
  }, [checkAuth])

  const loadMockData = useCallback(() => {
    setSongs(mockQueue)
    setCurrentSong(mockCurrentSong)
  }, [setSongs, setCurrentSong])

  useEffect(() => {
    loadMockData()
  }, [loadMockData])

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

  const handleSortToggle = () => {
    const newMode = sortMode === 'fifo' ? 'highest_first' : 'fifo'
    setSortMode(newMode)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Player & Queue</h1>
            <p className="text-muted-foreground">
              Manage your music playback and song requests
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSortToggle}
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              {sortMode === 'fifo' ? 'FIFO' : 'Highest First'}
            </Button>
            <Button
              onClick={() => {
                if (currentSong) {
                  play()
                }
              }}
              variant="default"
              className="bg-primary-orange hover:bg-primary-orange/90 text-white"
              disabled={!currentSong}
            >
              <Play className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <NowPlaying />
            <PlayerControls />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Queue</h2>
                <span className="text-sm text-muted-foreground">
                  {songs.length} song{songs.length !== 1 ? 's' : ''}
                </span>
              </div>

              <QueueList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
