import { AnimatePresence, motion } from 'framer-motion'
import Tooltip from '../ui/Tooltip'

const statusStyles = {
  available: 'bg-emerald-500/15 border-emerald-400 text-emerald-300',
  moderate: 'bg-amber-400/15 border-amber-400 text-amber-300',
  overloaded: 'bg-rose-500/15 border-rose-400 text-rose-200',
  free: 'bg-slate-700/70 border-slate-500 text-slate-300',
}

export default function TeacherMiniSchedule({ schedule }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {schedule.map((day) => {
        const classes = statusStyles[day.status] || statusStyles.free
        return (
          <Tooltip key={day.day} label={`${day.day}: ${day.label}`} className="w-full">
            <motion.div
              whileHover={{ y: -2 }}
              className={`flex h-11 flex-col items-center justify-center rounded-2xl border px-2 text-[11px] font-semibold ${classes}`}
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400">{day.day.slice(0, 3)}</span>
              <span className="mt-1 text-sm font-bold">{day.count || '-'}</span>
            </motion.div>
          </Tooltip>
        )
      })}
    </div>
  )
}
