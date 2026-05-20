import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Layers, MapPin, User } from 'lucide-react'
import { Badge } from './ui'
import { getSubjectColorClasses } from '../utils/subjectColors'

const TimetableSlot = ({ slot, onClick }) => {
  const subjectStyles = getSubjectColorClasses(slot.subject)
  const conflictStyles = slot.hasConflict
    ? 'border-rose-500/60 bg-rose-500/10 shadow-2xl shadow-rose-500/15 ring-1 ring-rose-500/20 animate-pulse'
    : 'border-white/10 bg-slate-950/70 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10'

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 ${conflictStyles} bg-gradient-to-br ${subjectStyles}`}
    >
      {slot.hasConflict && (
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/15 px-3 py-1 text-[11px] font-semibold text-rose-100 shadow-lg shadow-rose-500/10">
          <AlertTriangle className="h-3.5 w-3.5 animate-pulse text-rose-200" />
          Conflict
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge className="bg-black/20 text-slate-100 border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
            {slot.grade}
          </Badge>
          <h3 className="mt-3 text-white text-base font-semibold tracking-tight transition-colors group-hover:text-white/90">
            {slot.subject}
          </h3>
        </div>
        <div className={`h-2.5 w-2.5 rounded-full ${slot.hasConflict ? 'bg-rose-500' : 'bg-white/90'}`} />
      </div>

      <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm text-slate-200">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-slate-300" />
          <span>{slot.teacher}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-300" />
          <span>{slot.classroom}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-2xl bg-slate-950/80 px-3 py-2 text-xs font-semibold text-slate-300">
        <Clock className="h-4 w-4 text-blue-300" />
        <span>{slot.startTime}</span>
        <span className="text-slate-600">·</span>
        <span>{slot.endTime}</span>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 text-[10px] uppercase tracking-[0.24em] text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Tap to edit live
      </div>
    </motion.button>
  )
}

export default TimetableSlot;