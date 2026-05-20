import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LayoutContext = createContext(null)

export function LayoutProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('school-sidebar-collapsed') === 'true'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('school-sidebar-collapsed', sidebarCollapsed)
  }, [sidebarCollapsed])

  const toggleSidebar = () => setSidebarOpen((current) => !current)
  const closeSidebar = () => setSidebarOpen(false)
  const toggleCollapsed = () => setSidebarCollapsed((current) => !current)

  const value = useMemo(
    () => ({ sidebarOpen, sidebarCollapsed, toggleSidebar, closeSidebar, toggleCollapsed }),
    [sidebarOpen, sidebarCollapsed],
  )

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) throw new Error('useLayout must be used within LayoutProvider')
  return context
}
