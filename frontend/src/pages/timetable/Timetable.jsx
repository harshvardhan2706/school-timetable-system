import useTimetableStore from "../../store/timetableStore";
import TimetableSlot from "../../components/TimetableSlot";
import { CalendarDays } from "lucide-react";

export default function TimetablePage() {
  const schedule = useTimetableStore((state) => state.schedule);

  return (
    <div className="space-y-6">
      {/* Page Header banner block */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-blue-500" /> Timetable Engine
        </h1>
        <p className="text-sm text-slate-400">Manage, organize, and map out academic schedules.</p>
      </div>

      {/* Week Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 items-start">
        {Object.entries(schedule).map(([day, slots]) => (
          <div key={day} className="flex flex-col rounded-2xl border border-white/5 bg-[#0b0f19]/40 p-4 min-h-[500px]">
            {/* Weekday Label */}
            <div className="mb-4 border-b border-white/5 pb-2">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{day}</h2>
              <span className="text-[11px] text-slate-500 font-medium">{slots.length} Active Slots</span>
            </div>

            {/* Dynamic Slot mapping iteration stack */}
            <div className="flex flex-col gap-4">
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <TimetableSlot key={slot.id} slot={slot} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/5 p-6 text-center text-xs text-slate-600">
                  No periods scheduled
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}