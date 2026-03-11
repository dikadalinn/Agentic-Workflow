import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QueuedSong, PlayerState, PlayerActions, PlayerStore } from '@/types/player'

interface QueueState {
  songs: QueuedSong[]
  isLoading: boolean
  sortMode: 'fifo' | 'highest_first'
}

interface QueueActions {
  addSong: (song: QueuedSong) => void
  removeSong: (id: string) => void
  reorderSongs: (fromIndex: number, toIndex: number) => void
  playNext: (id: string) => void
  clearQueue: () => void
  setSortMode: (mode: 'fifo' | 'highest_first') => void
  setSongs: (songs: QueuedSong[]) => void
}

export type QueueStore = QueueState & QueueActions

export const useQueueStore = create<QueueStore>()(
  persist(
    (set, get) => ({
      songs: [],
      isLoading: false,
      sortMode: 'fifo',

      addSong: (song) => {
        set((state) => {
          const newSongs = [...state.songs, song]
          if (state.sortMode === 'highest_first') {
            newSongs.sort((a, b) => b.donationAmount - a.donationAmount)
          } else {
            newSongs.sort((a, b) => a.position - b.position)
          }
          return { songs: newSongs }
        })
      },

      removeSong: (id) => {
        set((state) => ({
          songs: state.songs.filter((song) => song.id !== id),
        }))
      },

      reorderSongs: (fromIndex, toIndex) => {
        set((state) => {
          const newSongs = [...state.songs]
          const [removed] = newSongs.splice(fromIndex, 1)
          newSongs.splice(toIndex, 0, removed)
          return { songs: newSongs }
        })
      },

      playNext: (id) => {
        set((state) => {
          const songIndex = state.songs.findIndex((s) => s.id === id)
          if (songIndex === -1) return state
          
          const [song] = state.songs.splice(songIndex, 1)
          state.songs.unshift(song)
          return { songs: state.songs }
        })
      },

      clearQueue: () => {
        set({ songs: [] })
      },

      setSortMode: (mode) => {
        set((state) => {
          const newSongs = [...state.songs]
          if (mode === 'highest_first') {
            newSongs.sort((a, b) => b.donationAmount - a.donationAmount)
          } else {
            newSongs.sort((a, b) => a.position - b.position)
          }
          return { songs: newSongs, sortMode: mode }
        })
      },

      setSongs: (songs) => {
        set({ songs })
      },
    }),
    {
      name: 'queue-storage',
    }
  )
)
