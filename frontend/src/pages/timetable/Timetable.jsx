import { useEffect } from 'react'
import useTimetableStore from '../../store/timetableStore'
import TimetableSlot from '../../components/TimetableSlot'
import TimetableEditModal from '../../components/timetable/TimetableEditModal'
import SaveStatusIndicator from '../../components/SaveStatusIndicator'
import TeacherAvailabilityPanel from '../../components/timetable/TeacherAvailabilityPanel'
import { CalendarDays } from 'lucide-react'

export default function TimetablePage() {
  const schedule = useTimetableStore((state) => state.schedule)
  const openEditModal = useTimetableStore((state) => state.openEditModal)
  const loadSchedule = useTimetableStore((state) => state.loadSchedule)
  const isScheduleLoading = useTimetableStore((state) => state.isScheduleLoading)
  const scheduleError = useTimetableStore((state) => state.scheduleError)

  useEffect(() => {
    loadSchedule().catch((error) => {
      console.error('Failed to load timetable:', error?.message || error)
    })
  }, [loadSchedule])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-300 shadow-soft">
            <CalendarDays className="h-5 w-5 text-blue-400" />
            Live edit mode enabled
          </div>
          <SaveStatusIndicator />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-blue-500" /> Timetable Engine
        </h1>
        <p className="text-sm text-slate-400">Click any slot to open the live timetable editor and sync changes instantly.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] items-start">
        <div className="space-y-6">
          {isScheduleLoading ? (
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-8 text-center text-slate-400">
              Loading timetable from the backend...
            </div>
          ) : scheduleError ? (
            <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 text-center text-rose-100">
              Failed to load timetable. Please refresh or check your backend connection.
            </div>
          ) : Object.keys(schedule).length > 0 ? (
            Object.entries(schedule).map(([day, slots]) => (
              <div key={day} className="flex flex-col rounded-3xl border border-white/10 bg-slate-950/40 p-4 shadow-soft min-h-[520px]">
                <div className="mb-4 border-b border-white/10 pb-3">
                  <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-[0.22em]">{day}</h2>
                  <span className="text-[11px] text-slate-500 font-medium">{slots.length} active slot{slots.length === 1 ? '' : 's'}</span>
                </div>

                <div className="flex flex-col gap-4">
                  {slots.length > 0 ? (
                    slots.map((slot, index) => (
                      <TimetableSlot
                        key={slot.id}
                        slot={slot}
                        onClick={() => openEditModal({ day, index, slot })}
                      />
                    ))
                  ) : (
                    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-950/50 px-4 py-6 text-center text-sm text-slate-500">
                      No periods scheduled
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-8 text-center text-slate-400">
              No timetable records available. Connect with the backend to load schedule data.
            </div>
          )}
        </div>

        <TeacherAvailabilityPanel />
      </div>

      <TimetableEditModal />
    </div>
  )
}
