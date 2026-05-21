export default function TeacherStatusBadge({ status }) {
  const statusConfig = {
    available: {
      label: 'Available',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-300',
      ring: 'ring-emerald-400/20',
    },
    moderate: {
      label: 'Moderate',
      bg: 'bg-amber-400/10',
      text: 'text-amber-300',
      ring: 'ring-amber-400/20',
    },
    overloaded: {
      label: 'Overloaded',
      bg: 'bg-rose-500/10',
      text: 'text-rose-200',
      ring: 'ring-rose-500/20',
    },
    free: {
      label: 'Free',
      bg: 'bg-slate-500/10',
      text: 'text-slate-200',
      ring: 'ring-slate-500/20',
    },
  }

  const config = statusConfig[status] || statusConfig.available

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${config.bg} ${config.text} ${config.ring}`}
    >
      {config.label}
    </span>
  )
}
