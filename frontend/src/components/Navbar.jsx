import { Bell, Search, Sparkles, UserCircle2 } from 'lucide-react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 text-slate-300 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="rounded-3xl bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-500 shadow-sm shadow-black/20">
          Enterprise
        </div>
        <div className="flex items-center gap-2 rounded-3xl bg-slate-900/70 px-4 py-2 shadow-sm shadow-black/20">
          <Sparkles className="h-4 w-4 text-blue-400" />
          <p className="text-sm text-slate-300">SaaS grade operations</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
        <div className="relative hidden items-center gap-2 rounded-3xl bg-slate-950/70 px-4 py-3 text-slate-400 shadow-sm shadow-black/20 sm:flex">
          <Search className="h-4 w-4" />
          <input
            type="search"
            placeholder="Search classes, teachers, reports"
            className="w-72 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />
        </div>
        <button className="rounded-3xl bg-slate-900/80 p-3 text-slate-300 transition hover:bg-slate-800/90">
          <Bell className="h-5 w-5" />
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110"
        >
          <UserCircle2 className="h-5 w-5" />
          <span>{user?.email?.split('@')[0] || 'Admin'}</span>
        </button>
      </div>
    </header>
  )
}
