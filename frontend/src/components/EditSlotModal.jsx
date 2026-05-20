import { useState, useEffect } from 'react'
import { X, BookOpen, User, MapPin, Clock, Palette, AlertTriangle } from 'lucide-react'
import useTimetableStore from '../../src/store/timetableStore'

export default function EditSlotModal() {
  const { activeEditSlot, setActiveEditSlot, updateDirectSlot } = useTimetableStore()
  const [formData, setFormData] = useState(null)

  // Sync state variables locally when active target triggers open
  useEffect(() => {
    if (activeEditSlot) {
      setFormData({ ...activeEditSlot.slot })
    } else {
      setFormData(null)
    }
  }, [activeEditSlot])

  if (!activeEditSlot || !formData) return null

  const handleSave = (e) => {
    e.preventDefault()
    updateDirectSlot(activeEditSlot.day, activeEditSlot.index, formData)
    setActiveEditSlot(null) // Modal exit close
  }

  // Basic Conflict warning detection engine rule (Simulated live)
  const isTimeConflict = formData.startTime === "10:00" && formData.classroom === "Lab 2" && activeEditSlot.slot.id !== 'm2'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay effect blur */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setActiveEditSlot(null)} />
      
      {/* Container Frame window panel */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0d121f] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Head Bar layout block */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">Edit Session Slot</h3>
            <p className="text-xs text-slate-400">Modifying class index for grade {formData.grade} on {activeEditSlot.day}</p>
          </div>
          <button onClick={() => setActiveEditSlot(null)} className="rounded-xl bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Realtime Conflict Alerts Indicator */}
        {(isTimeConflict || formData.hasConflict) && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-red-500/10 border border-red-500/20 p-3.5 text-xs text-red-400">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Collision Warning:</span> Room resource conflicts detected or resource allocation matches another parallel track active timeline schedule.
            </div>
          </div>
        )}

        {/* Editor Settings Forms */}
        <form onSubmit={handleSave} className="mt-5 space-y-4">
          
          {/* Subject Field input control block */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-blue-400" /> Subject name</label>
            <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none transition" required />
          </div>

          {/* Teacher and Room dual block coordinates grids split row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-emerald-400" /> Faculty</label>
              <input type="text" value={formData.teacher} onChange={(e) => setFormData({ ...formData, teacher: e.target.value })} className="w-full rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm text-white focus:border-blue-500/50 focus:outline-none transition" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-purple-400" /> Classroom</label>
              <input type="text" value={formData.classroom} onChange={(e) => setFormData({ ...formData, classroom: e.target.value })} className="w-full rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm text-white focus:border-blue-500/50 focus:outline-none transition" required />
            </div>
          </div>

          {/* Timings range block adjustments row splitter input */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-slate-400" /> Start Time</label>
              <input type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} className="w-full rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm text-white focus:border-blue-500/50 focus:outline-none transition" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-slate-400" /> End Time</label>
              <input type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} className="w-full rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm text-white focus:border-blue-500/50 focus:outline-none transition" required />
            </div>
          </div>

          {/* Visual Theme Color Palette Tag selection selector block */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Palette className="h-3.5 w-3.5 text-amber-400" /> Theme Badge Color</label>
            <div className="flex gap-3">
              {['blue', 'emerald', 'purple', 'amber'].map((c) => (
                <button key={c} type="button" onClick={() => setFormData({ ...formData, color: c })} className={`h-6 w-6 rounded-full border-2 capitalize transition ${formData.color === c ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`} style={{ backgroundColor: c === 'blue' ? '#3b82f6' : c === 'emerald' ? '#10b981' : c === 'purple' ? '#a855f7' : '#f59e0b' }} />
              ))}
            </div>
          </div>

          {/* Dynamic actions foot layout system */}
          <div className="flex gap-3 pt-4 border-t border-white/5 mt-6">
            <button type="button" onClick={() => setActiveEditSlot(null)} className="flex-1 rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 shadow-lg shadow-blue-600/10">
              Apply Sync
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}