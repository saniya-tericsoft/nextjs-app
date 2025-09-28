'use client'

import { useTheme, useToggleTheme } from '@/lib/store'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const theme = useTheme()
  const toggleTheme = useToggleTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  )
}
