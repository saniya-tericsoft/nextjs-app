import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Theme type
export type Theme = 'light' | 'dark'

// Store interface
interface AppStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// Create the store with persistence
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    {
      name: 'lifesync-theme-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)

// Selectors for better performance
export const useTheme = () => useAppStore((state) => state.theme)
export const useSetTheme = () => useAppStore((state) => state.setTheme)
export const useToggleTheme = () => useAppStore((state) => state.toggleTheme)
