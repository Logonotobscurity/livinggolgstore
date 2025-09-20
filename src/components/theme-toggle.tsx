"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Avoid hydration mismatch by returning a placeholder or null on the server.
    return <div style={{ width: '3em', height: '1.5em' }} />
  }
  
  return (
      <input 
          className="l" 
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} 
          aria-label="Toggle theme"
      />
  )
}
