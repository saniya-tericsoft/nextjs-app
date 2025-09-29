'use client'

import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SimpleThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Get theme from localStorage or default to light
      const savedTheme = localStorage.getItem('theme')
      const isDarkMode = savedTheme === 'dark'
      setIsDark(isDarkMode)
      
      // Apply theme to document
      const root = document.documentElement
      const body = document.body
      
      root.classList.remove('light', 'dark')
      body.classList.remove('light', 'dark')
      
      if (isDarkMode) {
        root.classList.add('dark')
        body.classList.add('dark')
      } else {
        root.classList.add('light')
        body.classList.add('light')
      }
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    // Apply theme to document
    const root = document.documentElement
    const body = document.body
    
    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')
    
    if (newIsDark) {
      root.classList.add('dark')
      body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.add('light')
      body.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
    
    console.log('Theme toggled to:', newIsDark ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  )
}
