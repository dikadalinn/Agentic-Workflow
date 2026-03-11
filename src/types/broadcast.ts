/**
 * BroadcastChannel Message Types for Real-Time Overlay Sync
 *
 * This solves Hard Blocker #1: localStorage cannot sync across browser contexts.
 * OBS Browser Source runs in an isolated context and cannot read localStorage
 * from the main dashboard. BroadcastChannel provides cross-context communication.
 */

import type { OverlaySettings } from './overlay'
import type { QueuedSong, PlayerState } from './player'

// ============================================================================
// Message Types
// ============================================================================

export type BroadcastMessageType =
  | 'QUEUE_UPDATE'
  | 'PLAYER_STATE'
  | 'SETTINGS_UPDATE'
  | 'ALERT_TRIGGER'
  | 'LEADERBOARD_UPDATE'

// ============================================================================
// Payload Types
// ============================================================================

export interface QueueUpdatePayload {
  queue: QueuedSong[]
  currentSong: QueuedSong | null
}

export interface PlayerStatePayload {
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
}

export interface SettingsUpdatePayload {
  overlayType: 'alert' | 'player' | 'leaderboard' | 'custom'
  settings: OverlaySettings
}

export interface AlertTriggerPayload {
  donorName: string
  amount: number
  message?: string
  isTest: boolean
}

export interface LeaderboardUpdatePayload {
  donors: Array<{
    name: string
    totalAmount: number
    donationCount: number
  }>
}

// ============================================================================
// Message Union Type
// ============================================================================

export interface BroadcastMessage {
  type: BroadcastMessageType
  streamerId: string
  timestamp: number
  payload:
    | QueueUpdatePayload
    | PlayerStatePayload
    | SettingsUpdatePayload
    | AlertTriggerPayload
    | LeaderboardUpdatePayload
}

// ============================================================================
// Type Guards
// ============================================================================

export function isQueueUpdate(
  message: BroadcastMessage
): message is BroadcastMessage & { payload: QueueUpdatePayload } {
  return message.type === 'QUEUE_UPDATE'
}

export function isPlayerState(
  message: BroadcastMessage
): message is BroadcastMessage & { payload: PlayerStatePayload } {
  return message.type === 'PLAYER_STATE'
}

export function isSettingsUpdate(
  message: BroadcastMessage
): message is BroadcastMessage & { payload: SettingsUpdatePayload } {
  return message.type === 'SETTINGS_UPDATE'
}

export function isAlertTrigger(
  message: BroadcastMessage
): message is BroadcastMessage & { payload: AlertTriggerPayload } {
  return message.type === 'ALERT_TRIGGER'
}

export function isLeaderboardUpdate(
  message: BroadcastMessage
): message is BroadcastMessage & { payload: LeaderboardUpdatePayload } {
  return message.type === 'LEADERBOARD_UPDATE'
}

// ============================================================================
// Channel Configuration
// ============================================================================

export const BROADCAST_CHANNEL_PREFIX = 'frens_sync_'

export function getChannelName(streamerId: string): string {
  return `${BROADCAST_CHANNEL_PREFIX}${streamerId}`
}
