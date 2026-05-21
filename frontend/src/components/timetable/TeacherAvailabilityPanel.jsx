import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react'
import useTimetableStore from '../../store/timetableStore'
import TeacherHeatmapCard from './TeacherHeatmapCard'
import AvailabilityLegend from './AvailabilityLegend'

export default function TeacherAvailabilityPanel() {
  const teacherStats = useTimetableStore((state) => state.teacherStats)
  const [open, setOpen] = useState(true)
  const overloadedCount = useMemo(
    () => teacherStats.filter((teacher) => teacher.status === 'overloaded').length,
    [teacherStats],
  )
  const moderateCount = useMemo(
    () => teacherStats.filter((teacher) => teacher.status === 'moderate').length,
    [teacherStats],
  )

  return (
    <>
      <div className="hidden lg:flex lg:w-[380px] lg:flex-col">
        <div className="sticky top-24 space-y-4 rounded-4xl border border-white/10 bg-slate-950/90 px-5 py-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Teacher Availability</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Smart workload heatmap</h2>
            </div>
            <div className="rounded-3xl bg-slate-900/80 px-3 py-2 text-sm text-slate-300 shadow-inner">
              <span className="font-semibold text-slate-100">{teacherStats.length}</span> teachers
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Overloaded</p>
              <p className="mt-2 text-2xl font-semibold text-rose-200">{overloadedCount}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Moderate load</p>
              <p className="mt-2 text-2xl font-semibold text-amber-200">{moderateCount}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              <span>Realtime scoring and daily load guidance</span>
            </div>
          </div>

          <AvailabilityLegend />

          <div className="space-y-4">
            {teacherStats.map((teacher) => (
              <TeacherHeatmapCard key={teacher.name} teacher={teacher} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-4 bottom-4 z-50 flex flex-col rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/50 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Teacher Availability</p>
                <h3 className="mt-1 text-base font-semibold text-white">Workload heatmap</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-slate-900/80 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-3 text-sm text-slate-300">
                  <p className="uppercase tracking-[0.22em] text-[10px] text-slate-500">Overloaded</p>
                  <p className="mt-2 text-2xl font-semibold text-rose-200">{overloadedCount}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-3 text-sm text-slate-300">
                  <p className="uppercase tracking-[0.22em] text-[10px] text-slate-500">Moderate</p>
                  <p className="mt-2 text-2xl font-semibold text-amber-200">{moderateCount}</p>
                </div>
              </div>

              <AvailabilityLegend />
            </div>

            <div className="mt-4 space-y-3 max-h-[55vh] overflow-y-auto pr-2">
              {teacherStats.map((teacher) => (
                <TeacherHeatmapCard key={teacher.name} teacher={teacher} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-blue-500/20 md:hidden"
        >
          <BarChart3 className="h-4 w-4" />
          View teacher load
        </button>
      )}
    </>
  )
}
