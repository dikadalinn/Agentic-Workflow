import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthStore } from '@/types'

const DEFAULT_USER = {
  id: 'mock-user-1',
  email: 'streamer@example.com',
  displayName: 'StreamMaster',
  bio: 'Welcome to my stream!',
  avatar: undefined,
  isOnboarded: false,
  createdAt: new Date().toISOString(),
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true })

        // Mock login - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock successful login
        set({
          user: DEFAULT_USER,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      register: async (email: string, password: string, displayName: string) => {
        set({ isLoading: true })

        // Mock registration - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock successful registration
        const newUser = {
          ...DEFAULT_USER,
          id: `mock-user-${Date.now()}`,
          email,
          displayName,
        }

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      updateProfile: (updates) => {
        const { user } = get()
        if (user) {
          set({
            user: { ...user, ...updates },
          })
        }
      },

      completeOnboarding: () => {
        const { user } = get()
        if (user) {
          set({
            user: { ...user, isOnboarded: true },
          })
        }
      },

      checkAuth: () => {
        // Check localStorage for persisted auth state
        const storedAuth = localStorage.getItem('auth-storage')
        if (storedAuth) {
          const parsed = JSON.parse(storedAuth)
          if (parsed.state?.user) {
            set({
              user: parsed.state.user,
              isAuthenticated: true,
            })
          }
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
