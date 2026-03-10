// App constants

export const APP_NAME = 'Frens'

export const APP_DESCRIPTION =
  'Song requests & donations for streamers. Let your fans send song requests and donations with custom alerts and overlays.'

export const QUEUE_SORT_OPTIONS = ['fifo', 'highest_first'] as const
export type QueueSortOption = (typeof QUEUE_SORT_OPTIONS)[number]

export const MIN_DONATION_AMOUNT = 0.5
export const MAX_DONATION_AMOUNT = 1000
export const DEFAULT_DONATION_AMOUNT = 5

export const YOUTUBE_API_QUOTA_LIMIT = 10000
export const SEARCH_DEBOUNCE_MS = 300

export const OVERLAY_THEMES = [
  { id: 'default', name: 'Default' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'neon', name: 'Neon' },
  { id: 'retro', name: 'Retro' },
] as const
export type OverlayTheme = (typeof OVERLAY_THEMES)[number]['id']

export const ALERT_ANIMATION_VARIANTS = [
  { id: 'pulse', name: 'Pulse' },
  { id: 'fade', name: 'Fade' },
  { id: 'slide', name: 'Slide' },
  { id: 'shake', name: 'Shake' },
  { id: 'bounce', name: 'Bounce' },
] as const
export type AlertAnimationVariant = (typeof ALERT_ANIMATION_VARIANTS)[number]['id']

export const SUPPORTED_PLATFORMS = [
  { id: 'twitch', name: 'Twitch' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'kick', name: 'Kick' },
] as const
export type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number]['id']

export const DONATION_AMOUNT_PRESETS = [1, 5, 10, 25, 50] as const

export const MOCK_DATA = {
  songs: [
    {
      id: 'song-1',
      youtubeVideoId: 'dQw4w9WgXcQ',
      title: 'Never Gonna Give You Up',
      artist: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg',
      duration: 212,
    },
    {
      id: 'song-2',
      youtubeVideoId: 'kJQP7kiw5Fk',
      title: 'Despacito',
      artist: 'Luis Fonsi',
      thumbnailUrl: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/default.jpg',
      duration: 279,
    },
    {
      id: 'song-3',
      youtubeVideoId: '9bZkp7q19f0',
      title: 'Gangnam Style',
      artist: 'PSY',
      thumbnailUrl: 'https://i.ytimg.com/vi/9bZkp7q19f0/default.jpg',
      duration: 252,
    },
  ],
  donations: [
    {
      id: 'donation-1',
      streamerId: 'mock-user-1',
      donorName: 'MusicFan42',
      amount: 5,
      currency: 'USD',
      message: 'Play this song please! 🎵',
      songId: 'song-1',
      songTitle: 'Never Gonna Give You Up',
      status: 'completed',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'donation-2',
      streamerId: 'mock-user-1',
      donorName: 'StreamLover',
      amount: 10,
      currency: 'USD',
      message: "You're the best streamer!",
      songId: 'song-2',
      songTitle: 'Despacito',
      status: 'pending',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ],
}
