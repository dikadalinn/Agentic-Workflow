/**
 * BroadcastChannel Manager for Real-Time Overlay Sync
 *
 * Provides cross-context communication between the dashboard and OBS overlays.
 * This solves the issue where OBS Browser Source cannot read localStorage
 * from the main dashboard window.
 *
 * Browser Support: Chrome 54+, Firefox 38+, Safari 15.4+, Edge 79+
 * OBS uses Chromium, so this is fully supported.
 */

import type {
  BroadcastMessage,
  BroadcastMessageType,
  QueueUpdatePayload,
  PlayerStatePayload,
  SettingsUpdatePayload,
  AlertTriggerPayload,
  LeaderboardUpdatePayload,
} from '@/types/broadcast'

// ============================================================================
// Channel Factory
// ============================================================================

const CHANNEL_PREFIX = 'frens_sync_'

/**
 * Creates or retrieves a BroadcastChannel for a specific streamer
 */
export function createBroadcastChannel(streamerId: string): BroadcastChannel {
  const channelName = `${CHANNEL_PREFIX}${streamerId}`
  return new BroadcastChannel(channelName)
}

// ============================================================================
// Publishing
// ============================================================================

/**
 * Publish a message to the broadcast channel
 */
export function publish<T extends BroadcastMessageType>(
  channel: BroadcastChannel,
  type: T,
  streamerId: string,
  payload: T extends 'QUEUE_UPDATE'
    ? QueueUpdatePayload
    : T extends 'PLAYER_STATE'
      ? PlayerStatePayload
      : T extends 'SETTINGS_UPDATE'
        ? SettingsUpdatePayload
        : T extends 'ALERT_TRIGGER'
          ? AlertTriggerPayload
          : LeaderboardUpdatePayload
): void {
  const message: BroadcastMessage = {
    type,
    streamerId,
    timestamp: Date.now(),
    payload,
  }

  channel.postMessage(message)
}

// ============================================================================
// Subscribing
// ============================================================================

export type MessageCallback = (message: BroadcastMessage) => void

/**
 * Subscribe to broadcast channel messages
 * Returns an unsubscribe function
 */
export function subscribe(channel: BroadcastChannel, callback: MessageCallback): () => void {
  const handleMessage = (event: MessageEvent<BroadcastMessage>) => {
    callback(event.data)
  }

  channel.addEventListener('message', handleMessage)

  return () => {
    channel.removeEventListener('message', handleMessage)
  }
}

// ============================================================================
// Convenience Publishers
// ============================================================================

export const publishers = {
  queueUpdate: (channel: BroadcastChannel, streamerId: string, payload: QueueUpdatePayload) =>
    publish(channel, 'QUEUE_UPDATE', streamerId, payload),

  playerState: (channel: BroadcastChannel, streamerId: string, payload: PlayerStatePayload) =>
    publish(channel, 'PLAYER_STATE', streamerId, payload),

  settingsUpdate: (channel: BroadcastChannel, streamerId: string, payload: SettingsUpdatePayload) =>
    publish(channel, 'SETTINGS_UPDATE', streamerId, payload),

  alertTrigger: (channel: BroadcastChannel, streamerId: string, payload: AlertTriggerPayload) =>
    publish(channel, 'ALERT_TRIGGER', streamerId, payload),

  leaderboardUpdate: (
    channel: BroadcastChannel,
    streamerId: string,
    payload: LeaderboardUpdatePayload
  ) => publish(channel, 'LEADERBOARD_UPDATE', streamerId, payload),
}

// ============================================================================
// Feature Detection
// ============================================================================

/**
 * Check if BroadcastChannel is supported
 */
export function isBroadcastChannelSupported(): boolean {
  return typeof BroadcastChannel !== 'undefined'
}
