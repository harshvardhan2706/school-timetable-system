// components/Sidebar.jsx
import { LayoutDashboard, Users, BookOpen, GraduationCap, Calendar, FileText, Upload, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const menuItems = [
  { path: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: 'teachers', label: 'Teachers', icon: Users },
  { path: 'classes', label: 'Classes', icon: GraduationCap },
  { path: 'subjects', label: 'Subjects', icon: BookOpen },
  { path: 'timetable', label: 'Timetable', icon: Calendar },
  { path: 'reports', label: 'Reports', icon: FileText },
  { path: 'excel-upload', label: 'Excel Upload', icon: Upload },
  { path: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-white/5 bg-[#0b0f19] p-4 text-slate-400">
      <div className="space-y-6">
        {/* Branding Headers */}
        <div className="px-3 py-2">
          <h2 className="text-lg font-bold text-white tracking-wide">School ERP</h2>
          <p className="text-xs text-blue-400 font-medium">Timetable HQ</p>
        </div>

        {/* Navigation Elements Array */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/15'
                    : 'hover:bg-white/[0.03] hover:text-slate-200'
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Branding block */}
      <div className="mt-auto border-t border-white/5 pt-4 px-3">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Saas Grade Operations</p>
      </div>
    </div>
  )
}