import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QueuedSong, PlayerState, PlayerActions, PlayerStore } from '@/types/player'

const initialState: PlayerState = {
  isPlaying: false,
  volume: 100,
  currentTime: 0,
  duration: 0,
  currentSong: null,
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      playSong: (song) => {
        const queuedSong = 'youtubeId' in song ? song : {
          ...song,
          youtubeId: song.youtubeVideoId,
          donationId: '',
          donorName: 'You',
          donationAmount: 0,
          requestedAt: new Date(),
          position: 0,
        } as QueuedSong
        set({
          currentSong: queuedSong,
          isPlaying: true,
          currentTime: 0,
          duration: queuedSong.duration,
        })
      },

      pauseSong: () => {
        set({ isPlaying: false })
      },

      resumeSong: () => {
        set({ isPlaying: true })
      },

      stopSong: () => {
        set({
          currentSong: null,
          isPlaying: false,
          currentTime: 0,
          duration: 0,
        })
      },

      setVolume: (volume) => {
        set({ volume })
      },

      seekTo: (time) => {
        set({ currentTime: time })
      },

      updateCurrentTime: (time) => {
        set({ currentTime: time })
      },

      updateDuration: (duration) => {
        set({ duration })
      },

      play: () => {
        set({ isPlaying: true })
      },

      pause: () => {
        set({ isPlaying: false })
      },

      skip: () => {
        set({ currentTime: 0 })
      },

      setCurrentTime: (time) => {
        set({ currentTime: time })
      },

      setCurrentSong: (song) => {
        set({
          currentSong: song,
          currentTime: song ? 0 : 0,
          duration: song?.duration || 0,
          isPlaying: false,
        })
      },
    }),
    {
      name: 'player-storage',
    }
  )
)
