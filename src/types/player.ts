export interface Song {
  id: string
  youtubeVideoId: string
  title: string
  artist: string
  thumbnailUrl: string
  duration: number // in seconds
}

export interface QueueItem {
  id: string
  song: Song
  donorName: string
  amount: number
  message?: string
  requestedAt: string
  status: 'pending' | 'playing' | 'completed'
}

export interface PlayerState {
  currentSong: Song | null
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
}

export interface PlayerActions {
  playSong: (song: Song) => void
  pauseSong: () => void
  resumeSong: () => void
  stopSong: () => void
  setVolume: (volume: number) => void
  seekTo: (time: number) => void
  updateCurrentTime: (time: number) => void
  updateDuration: (duration: number) => void
}

export type PlayerStore = PlayerState & PlayerActions
