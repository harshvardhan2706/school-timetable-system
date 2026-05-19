export default function DashboardCard({ title, value, change, icon, colorClass, children }) {
  const Icon = icon
  return (
    <div className="group overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#0b0f19]/80 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-white/20"> 
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 font-bold">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">{value}</h3>
        </div>
        {/* FIX: Explicitly wrapped colorClass with bg-gradient-to-br layout context */}
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClass} shadow-md`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
        <span className="font-medium text-slate-500">{children}</span>
        <span className={`rounded-full px-2 py-0.5 font-bold ${change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {change}
        </span>
      </div>
    </div>
  )
}