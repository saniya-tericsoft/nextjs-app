'use client'

import { useEffect } from 'react'
import { useTheme } from '@/lib/store'

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useTheme()

  // Apply theme to document on mount and when theme changes
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(theme)
    body.classList.add(theme)
    
    console.log('ClientThemeProvider applied theme:', theme) // Debug log
  }, [theme])

  return <>{children}</>
}
