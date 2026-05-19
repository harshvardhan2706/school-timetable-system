import TimetableGrid from '../../components/TimetableGrid'

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Timetable designer</p>
            <h1 className="text-2xl font-semibold text-white">Drag, drop and optimize schedules</h1>
          </div>
          <p className="max-w-xl text-sm text-slate-400">A responsive weekly timetable layout built for fast audit, conflict resolution and classroom orchestration.</p>
        </div>
      </section>
      <TimetableGrid />
    </div>
  )
}
