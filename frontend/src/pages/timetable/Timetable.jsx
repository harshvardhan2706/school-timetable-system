import useTimetableStore from '../../store/timetableStore'
import TimetableSlot from '../../components/TimetableSlot'
import TimetableEditModal from '../../components/timetable/TimetableEditModal'
import { CalendarDays } from 'lucide-react'

export default function TimetablePage() {
  const schedule = useTimetableStore((state) => state.schedule)
  const openEditModal = useTimetableStore((state) => state.openEditModal)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-300 shadow-soft">
          <CalendarDays className="h-5 w-5 text-blue-400" />
          Live edit mode enabled
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-blue-500" /> Timetable Engine
        </h1>
        <p className="text-sm text-slate-400">Click any slot to open the live timetable editor and sync changes instantly.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 items-start">
        {Object.entries(schedule).map(([day, slots]) => (
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
        ))}
      </div>

      <TimetableEditModal />
    </div>
  )
}
