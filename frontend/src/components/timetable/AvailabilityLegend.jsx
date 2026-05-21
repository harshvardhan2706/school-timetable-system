const legendItems = [
  { label: 'Available', dot: 'bg-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Moderate', dot: 'bg-amber-400', bg: 'bg-amber-500/10' },
  { label: 'Overloaded', dot: 'bg-rose-400', bg: 'bg-rose-500/10' },
  { label: 'Free day', dot: 'bg-slate-400', bg: 'bg-slate-500/10' },
]

export default function AvailabilityLegend() {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/85 p-4 shadow-soft">
      <div className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Availability guide</div>
      <div className="grid gap-3">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-3 bg-slate-900/70">
            <span className={`inline-flex h-3.5 w-3.5 rounded-full ${item.dot} ${item.bg}`} />
            <span className="text-sm text-slate-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
