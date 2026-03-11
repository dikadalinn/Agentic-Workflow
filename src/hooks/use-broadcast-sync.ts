/**
 * React Hook for BroadcastChannel Sync
 *
 * Provides a simple interface for components to publish and subscribe
 * to real-time updates via BroadcastChannel API.
 */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createBroadcastChannel, subscribe, type MessageCallback } from '@/lib/broadcast-channel'
import type { BroadcastMessage } from '@/types/broadcast'
import { isBroadcastChannelSupported } from '@/lib/broadcast-channel'

export interface UseBroadcastSyncOptions {
  /**
   * The streamer ID to create a channel for
   */
  streamerId: string

  /**
   * Callback to handle incoming messages
   */
  onMessage?: MessageCallback

  /**
   * Whether to automatically subscribe on mount
   * @default true
   */
  autoSubscribe?: boolean
}

export interface UseBroadcastSyncReturn {
  /**
   * Whether BroadcastChannel is supported in this browser
   */
  isSupported: boolean

  /**
   * The latest message received (null if none)
   */
  latestMessage: BroadcastMessage | null

  /**
   * The BroadcastChannel instance (null if not supported)
   */
  channel: BroadcastChannel | null

  /**
   * Manually subscribe to messages (returns unsubscribe function)
   */
  subscribe: (callback: MessageCallback) => (() => void) | null

  /**
   * Connection status
   */
  isConnected: boolean
}

/**
 * Hook for subscribing to BroadcastChannel messages
 *
 * @example
 * ```tsx
 * function PlayerOverlay({ streamerId }) {
 *   const { latestMessage, isSupported } = useBroadcastSync({
 *     streamerId,
 *     onMessage: (message) => {
 *       if (isQueueUpdate(message)) {
 *         setQueue(message.payload.queue)
 *       }
 *     }
 *   })
 *
 *   if (!isSupported) {
 *     return <div>Your browser doesn't support real-time sync</div>
 *   }
 *
 *   return <div>...</div>
 * }
 * ```
 */
export function useBroadcastSync({
  streamerId,
  onMessage,
  autoSubscribe = true,
}: UseBroadcastSyncOptions): UseBroadcastSyncReturn {
  const [latestMessage, setLatestMessage] = useState<BroadcastMessage | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const channelRef = useRef<BroadcastChannel | null>(null)
  const unsubscribeRef = useRef<(() => void) | null>(null)

  const isSupported = isBroadcastChannelSupported()

  // Create channel on mount
  useEffect(() => {
    if (!isSupported || !streamerId) return

    channelRef.current = createBroadcastChannel(streamerId)
    setIsConnected(true)

    return () => {
      // Cleanup on unmount
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
      if (channelRef.current) {
        channelRef.current.close()
        channelRef.current = null
      }
      setIsConnected(false)
    }
  }, [isSupported, streamerId])

  // Subscribe to messages
  useEffect(() => {
    if (!autoSubscribe || !channelRef.current || !onMessage) return

    const handleMessage: MessageCallback = (message) => {
      setLatestMessage(message)
      onMessage(message)
    }

    unsubscribeRef.current = subscribe(channelRef.current, handleMessage)

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
      }
    }
  }, [autoSubscribe, onMessage])

  // Manual subscribe function
  const manualSubscribe = useCallback((callback: MessageCallback): (() => void) | null => {
    if (!channelRef.current) return null

    return subscribe(channelRef.current, callback)
  }, [])

  return {
    isSupported,
    latestMessage,
    channel: channelRef.current,
    subscribe: manualSubscribe,
    isConnected,
  }
}

/**
 * Hook for getting just the channel (for publishing)
 *
 * Use this in components that only need to publish, not subscribe
 *
 * @example
 * ```tsx
 * function ConfigPanel({ streamerId }) {
 *   const { channel, isSupported } = useBroadcastChannel(streamerId)
 *
 *   const handleSave = (settings) => {
 *     if (channel) {
 *       publishers.settingsUpdate(channel, streamerId, {
 *         overlayType: 'player',
 *         settings,
 *       })
 *     }
 *   }
 * }
 * ```
 */
export function useBroadcastChannel(streamerId: string): {
  channel: BroadcastChannel | null
  isSupported: boolean
} {
  const channelRef = useRef<BroadcastChannel | null>(null)
  const isSupported = isBroadcastChannelSupported()

  useEffect(() => {
    if (!isSupported || !streamerId) return

    channelRef.current = createBroadcastChannel(streamerId)

    return () => {
      if (channelRef.current) {
        channelRef.current.close()
        channelRef.current = null
      }
    }
  }, [isSupported, streamerId])

  return {
    channel: channelRef.current,
    isSupported,
  }
}
