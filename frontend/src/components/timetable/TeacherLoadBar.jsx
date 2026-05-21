import { motion } from 'framer-motion'

const statusStyles = {
  available: 'from-emerald-400 to-emerald-600',
  moderate: 'from-amber-400 to-amber-500',
  overloaded: 'from-rose-400 to-rose-600',
  free: 'from-slate-400 to-slate-500',
}

export default function TeacherLoadBar({ value, status }) {
  const percent = Math.min(100, Math.max(0, Math.round(value)))
  const gradient = statusStyles[status] || statusStyles.available

  return (
    <div className="rounded-full bg-slate-900/80 p-1">
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-2.5 rounded-full bg-gradient-to-r ${gradient}`}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span>Load score</span>
        <span>{percent}%</span>
      </div>
    </div>
  )
}
