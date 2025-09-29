'use client'

import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem('lifesync-theme-storage')
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme)
        const themeValue = parsed.state?.theme || 'light'
        setTheme(themeValue)
        applyTheme(themeValue)
      } catch {
        setTheme('light')
        applyTheme('light')
      }
    } else {
      setTheme('light')
      applyTheme('light')
    }
    setMounted(true)
  }, [])

  // Apply theme to DOM
  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    const body = document.body
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')
    
    // Add new theme class
    root.classList.add(newTheme)
    body.classList.add(newTheme)
  }

  // Handle theme toggle
  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    
    console.log('Theme toggle clicked, switching from', theme, 'to', newTheme)
    
    // Update state
    setTheme(newTheme)
    
    // Apply theme to DOM
    applyTheme(newTheme)
    
    // Save to localStorage
    localStorage.setItem('lifesync-theme-storage', JSON.stringify({
      state: { theme: newTheme }
    }))
    
    console.log('Theme applied:', newTheme)
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800">
        <div className="h-5 w-5" />
      </div>
    )
  }

  return (
    <button
      onClick={handleToggle}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      type="button"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  )
}
