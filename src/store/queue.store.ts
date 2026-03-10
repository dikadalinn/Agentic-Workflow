import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QueueItem } from '@/types'

interface QueueState {
  queue: QueueItem[]
}

interface QueueActions {
  addToQueue: (item: QueueItem) => void
  removeFromQueue: (id: string) => void
  reorderQueue: (fromIndex: number, toIndex: number) => void
  clearQueue: () => void
  updateQueueStatus: (id: string, status: QueueItem['status']) => void
  sortQueue: (sortBy: 'fifo' | 'highest_first') => void
  playNext: () => QueueItem | null
}

export type QueueStore = QueueState & QueueActions

export const useQueueStore = create<QueueStore>()(
  persist(
    (set, get) => ({
      // State
      queue: [],

      // Actions
      addToQueue: (item) => {
        set((state) => ({
          queue: [...state.queue, item],
        }))
      },

      removeFromQueue: (id) => {
        set((state) => ({
          queue: state.queue.filter((item) => item.id !== id),
        }))
      },

      reorderQueue: (fromIndex, toIndex) => {
        set((state) => {
          const newQueue = [...state.queue]
          const [removed] = newQueue.splice(fromIndex, 1)
          newQueue.splice(toIndex, 0, removed)
          return { queue: newQueue }
        })
      },

      clearQueue: () => {
        set({ queue: [] })
      },

      updateQueueStatus: (id, status) => {
        set((state) => ({
          queue: state.queue.map((item) => (item.id === id ? { ...item, status } : item)),
        }))
      },

      sortQueue: (sortBy) => {
        set((state) => {
          const sortedQueue = [...state.queue].sort((a, b) => {
            if (sortBy === 'highest_first') {
              return b.amount - a.amount
            }
            // Default FIFO
            return new Date(a.requestedAt).getTime() - new Date(b.requestedAt).getTime()
          })
          return { queue: sortedQueue }
        })
      },

      playNext: () => {
        const { queue } = get()
        if (queue.length === 0) return null

        const nextItem = queue[0]
        set((state) => ({
          queue: state.queue.slice(1),
        }))

        return nextItem
      },
    }),
    {
      name: 'queue-storage',
    }
  )
)
