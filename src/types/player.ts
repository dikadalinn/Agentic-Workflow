export interface Song {
  id: string
  youtubeVideoId: string
  title: string
  artist: string
  thumbnailUrl: string
  duration: number
}

export interface QueuedSong {
  id: string
  youtubeId: string
  title: string
  artist: string
  thumbnailUrl: string
  duration: number
  donationId: string
  donorName: string
  donationAmount: number
  message?: string
  requestedAt: Date
  position: number
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
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  currentSong: QueuedSong | null
}

export interface PlayerActions {
  playSong: (song: Song | QueuedSong) => void
  pauseSong: () => void
  resumeSong: () => void
  stopSong: () => void
  setVolume: (volume: number) => void
  seekTo: (time: number) => void
  updateCurrentTime: (time: number) => void
  updateDuration: (duration: number) => void
  play: () => void
  pause: () => void
  skip: () => void
  setCurrentTime: (time: number) => void
  setCurrentSong: (song: QueuedSong | null) => void
}

export type PlayerStore = PlayerState & PlayerActions
