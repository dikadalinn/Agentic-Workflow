/**
 * React Hook for Publishing Player State & Queue Updates to BroadcastChannel
 *
 * This hook subscribes to player and queue store changes and publishes
 * updates to OBS overlays in real-time via BroadcastChannel API.
 */

'use client'

import { useEffect, useRef } from 'react'
import { usePlayerStore } from '@/store/player.store'
import { useQueueStore } from '@/store/queue.store'
import { useBroadcastChannel } from '@/hooks/use-broadcast-sync'
import { publishers } from '@/lib/broadcast-channel'
import type { QueuedSong, PlayerState } from '@/types/player'

export interface UsePlayerBroadcastOptions {
  /**
   * The streamer ID for creating the BroadcastChannel
   */
  streamerId: string

  /**
   * Whether to enable broadcasting (useful for disabling in tests)
   * @default true
   */
  enabled?: boolean
}

/**
 * Hook for broadcasting player state and queue updates to OBS overlays
 *
 * This hook listens to changes in:
 * - Player state (isPlaying, currentTime, duration, volume, currentSong)
 * - Queue state (songs array, currentSong in queue)
 *
 * And publishes them via BroadcastChannel to be received by overlay pages.
 *
 * @example
 * ```tsx
 * function PlayerPage() {
 *   const { user } = useAuthStore()
 *
 *   usePlayerBroadcast({
 *     streamerId: user.id,
 *   })
 *
 *   return <div>...</div>
 * }
 * ```
 */
export function usePlayerBroadcast({
  streamerId,
  enabled = true,
}: UsePlayerBroadcastOptions): void {
  const { channel, isSupported } = useBroadcastChannel(streamerId)

  // Get player state from store
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const volume = usePlayerStore((state) => state.volume)
  const currentTime = usePlayerStore((state) => state.currentTime)
  const duration = usePlayerStore((state) => state.duration)
  const currentSong = usePlayerStore((state) => state.currentSong)

  // Get queue state from store
  const songs = useQueueStore((state) => state.songs)

  // Refs to track previous values for change detection
  const prevPlayerStateRef = useRef<Partial<PlayerState>>({
    isPlaying,
    volume,
    currentTime,
    duration,
    currentSong,
  })

  const prevSongsRef = useRef<QueuedSong[]>(songs)

  useEffect(() => {
    // Don't broadcast if not supported or disabled
    if (!isSupported || !enabled || !channel) return

    // Check for player state changes
    const playerStateChanged =
      prevPlayerStateRef.current.isPlaying !== isPlaying ||
      prevPlayerStateRef.current.volume !== volume ||
      prevPlayerStateRef.current.currentTime !== currentTime ||
      prevPlayerStateRef.current.duration !== duration ||
      prevPlayerStateRef.current.currentSong?.id !== currentSong?.id

    if (playerStateChanged) {
      // Publish player state update
      publishers.playerState(channel, streamerId, {
        isPlaying,
        volume,
        currentTime,
        duration,
      })

      // Update ref
      prevPlayerStateRef.current = {
        isPlaying,
        volume,
        currentTime,
        duration,
        currentSong,
      }
    }
  }, [
    isPlaying,
    volume,
    currentTime,
    duration,
    currentSong,
    channel,
    isSupported,
    enabled,
    streamerId,
  ])

  useEffect(() => {
    // Don't broadcast if not supported or disabled
    if (!isSupported || !enabled || !channel) return

    // Check for queue changes (simple array comparison by IDs)
    const songsChanged =
      prevSongsRef.current.length !== songs.length ||
      prevSongsRef.current.some((song, index) => song.id !== songs[index]?.id)

    if (songsChanged) {
      // Publish queue update
      publishers.queueUpdate(channel, streamerId, {
        queue: songs,
        currentSong,
      })

      // Update ref
      prevSongsRef.current = songs
    }
  }, [songs, currentSong, channel, isSupported, enabled, streamerId])
}
