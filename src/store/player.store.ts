import { create } from 'zustand'
import type { PlayerStore } from '@/types'

export const usePlayerStore = create<PlayerStore>((set) => ({
  // State
  currentSong: null,
  isPlaying: false,
  volume: 1.0,
  currentTime: 0,
  duration: 0,

  // Actions
  playSong: (song) => {
    set({
      currentSong: song,
      isPlaying: true,
      currentTime: 0,
      duration: song.duration,
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
}))
