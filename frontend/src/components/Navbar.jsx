import { Bell, Search, Sparkles, UserCircle2, Moon, SunMedium, Menu } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'
import { useLayout } from '../context/LayoutContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { toggleSidebar } = useLayout()

  return (
    <header className="flex flex-col gap-4 border-b border-white/10 px-4 py-4 text-slate-300 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button type="button" className="inline-flex items-center justify-center rounded-2xl bg-slate-950/80 p-3 text-slate-300 transition hover:bg-slate-900/90 md:hidden" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="rounded-3xl bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-500 shadow-sm shadow-black/20">
            Enterprise
          </div>
          <div className="hidden items-center gap-2 rounded-3xl bg-slate-900/70 px-4 py-2 shadow-sm shadow-black/20 sm:flex">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <p className="text-sm text-slate-300">SaaS grade operations</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button type="button" onClick={toggleTheme} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950/80 text-slate-200 transition hover:bg-slate-900/90">
            {theme === 'dark' ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="rounded-3xl bg-slate-900/80 p-3 text-slate-300 transition hover:bg-slate-800/90">
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={logout}
            className="hidden items-center gap-3 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110 md:flex"
          >
            <UserCircle2 className="h-5 w-5" />
            <span>{user?.email?.split('@')[0] || 'Admin'}</span>
          </button>
        </div>
      </div>

      <div className="relative hidden items-center gap-2 rounded-3xl bg-slate-950/70 px-4 py-3 text-slate-400 shadow-sm shadow-black/20 sm:flex">
        <Search className="h-4 w-4" />
        <input
          type="search"
          placeholder="Search classes, teachers, reports"
          className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
        />
      </div>
    </header>
  )
}
