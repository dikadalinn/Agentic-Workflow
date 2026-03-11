/**
 * YouTube IFrame API Type Definitions
 *
 * These types are for the YouTube IFrame Player API which is loaded dynamically.
 */

export interface YouTubePlayer {
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  setVolume: (volume: number) => void
  getVolume: () => number
  getCurrentTime: () => number
  getDuration: () => number
  loadVideoById: (videoId: string, startSeconds?: number) => void
}

export interface YouTubePlayerOptions {
  height?: string | number
  width?: string | number
  videoId?: string
  playerVars?: {
    autoplay?: number
    controls?: number
    modestbranding?: number
    rel?: number
  }
  events?: {
    onReady?: (event: { target: YouTubePlayer }) => void
    onStateChange?: (event: { data: number }) => void
  }
}

export interface YouTubePlayerState {
  UNSTARTED: -1
  ENDED: 0
  PLAYING: 1
  PAUSED: 2
  BUFFERING: 3
  CUED: 5
}

export interface YTGlobal {
  Player: new (elementId: string, options: YouTubePlayerOptions) => YouTubePlayer
  PlayerState: YouTubePlayerState
}

declare global {
  interface Window {
    YT?: YTGlobal
    onYouTubeIframeAPIReady?: () => void
  }
}
