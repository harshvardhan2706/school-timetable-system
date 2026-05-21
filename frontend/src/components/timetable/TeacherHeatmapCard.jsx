import { memo } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Sparkles, Clock3, Activity } from 'lucide-react'
import Tooltip from '../ui/Tooltip'
import TeacherStatusBadge from './TeacherStatusBadge'
import TeacherLoadBar from './TeacherLoadBar'
import TeacherMiniSchedule from './TeacherMiniSchedule'

const statusConfig = {
  available: {
    glow: 'shadow-emerald-500/15 border-emerald-400',
    ring: 'ring-emerald-500/15',
    accent: 'from-emerald-400 to-emerald-600',
  },
  moderate: {
    glow: 'shadow-amber-500/15 border-amber-400',
    ring: 'ring-amber-500/15',
    accent: 'from-amber-400 to-amber-500',
  },
  overloaded: {
    glow: 'shadow-rose-500/20 border-rose-400',
    ring: 'ring-rose-500/20',
    accent: 'from-rose-400 to-rose-600',
  },
  free: {
    glow: 'shadow-slate-500/10 border-slate-500',
    ring: 'ring-slate-500/20',
    accent: 'from-slate-400 to-slate-500',
  },
}

function TeacherHeatmapCard({ teacher }) {
  const palette = statusConfig[teacher.status] || statusConfig.available

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group overflow-hidden rounded-3xl border bg-slate-950/95 p-5 shadow-2xl ${palette.glow} ${palette.ring}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${palette.accent} text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 shadow-lg shadow-slate-950/20`}>
            {teacher.initials}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{teacher.name}</div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{teacher.subjectSpecialization}</p>
          </div>
        </div>
        <TeacherStatusBadge status={teacher.status} />
      </div>

      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Weekly periods</p>
            <p className="mt-2 text-2xl font-semibold text-white">{teacher.weeklyPeriods}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Next free slot</p>
            <p className="mt-2 text-sm font-semibold text-slate-200">{teacher.nextFreeSlot}</p>
          </div>
        </div>

        <TeacherLoadBar value={teacher.availabilityScore} status={teacher.status} />

        <div className="grid gap-2 rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-slate-400" />
            <span>Longest consecutive periods</span>
            <span className="ml-auto font-semibold text-white">{teacher.longestConsecutive}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-slate-400" />
            <span>Free days</span>
            <span className="ml-auto font-semibold text-white">{teacher.freeDays}</span>
          </div>
          {teacher.warnings.length > 0 && (
            <div className="flex items-start gap-2 rounded-3xl bg-rose-500/10 p-3 text-sm text-rose-100">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-rose-300" />
              <div>
                <p className="font-semibold text-rose-100">Warnings</p>
                <p className="mt-1 text-xs text-rose-100/80">{teacher.warnings.join(' · ')}</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-500">
            <span>Weekly heatmap</span>
            <Tooltip label="Hover for daily status and load details">
              <span className="cursor-help text-slate-400">info</span>
            </Tooltip>
          </div>
          <TeacherMiniSchedule schedule={teacher.miniSchedule} />
        </div>
      </div>
    </motion.article>
  )
}

export default memo(TeacherHeatmapCard)
