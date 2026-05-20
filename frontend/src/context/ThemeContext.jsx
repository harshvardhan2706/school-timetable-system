import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)
const themeKeys = ['dark', 'light', 'school']

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.localStorage.getItem('school-timetable-theme') || 'dark'
  })

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    themeKeys.forEach((value) => root.classList.remove(value))
    root.classList.add(theme)
    window.localStorage.setItem('school-timetable-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const setSchoolTheme = () => setTheme('school')

  const value = useMemo(
    () => ({ theme, toggleTheme, setSchoolTheme, isDark: theme === 'dark', isLight: theme === 'light' }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
