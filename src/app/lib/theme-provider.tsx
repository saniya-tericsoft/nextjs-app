'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useTheme, useSetTheme } from '@/lib/store'

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: string
  setTheme: (theme: string) => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const zustandTheme = useTheme()
  const setZustandTheme = useSetTheme()
  const [theme, setTheme] = useState(zustandTheme)

  // Apply theme to document element and body
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(zustandTheme)
    body.classList.add(zustandTheme)
    
    // Update state to match Zustand
    setTheme(zustandTheme)
  }, [zustandTheme])

  const value = {
    theme,
    setTheme: (theme: string) => {
      setZustandTheme(theme as 'light' | 'dark')
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useThemeProvider = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useThemeProvider must be used within a ThemeProvider')

  return context
}
