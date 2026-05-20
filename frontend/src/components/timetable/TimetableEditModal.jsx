import { useEffect, useState } from 'react'
import { AlertTriangle, BookOpen, Clock, Layers, MapPin, User } from 'lucide-react'
import { Badge, Button, Modal } from '../ui'
import useTimetableStore from '../../store/timetableStore'
import { getSubjectColorClasses } from '../../utils/subjectColors'
import { inputStyles } from '../../styles/theme'

export default function TimetableEditModal() {
  const selectedSlot = useTimetableStore((state) => state.selectedSlot)
  const isOpen = useTimetableStore((state) => state.isEditModalOpen)
  const closeEditModal = useTimetableStore((state) => state.closeEditModal)
  const updateSlot = useTimetableStore((state) => state.updateSlot)
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    if (selectedSlot) {
      setFormData({ ...selectedSlot.slot })
    } else {
      setFormData(null)
    }
  }, [selectedSlot])

  if (!selectedSlot || !formData) return null

  const subjectClasses = getSubjectColorClasses(formData.subject)
  const conflictMode = formData.hasConflict

  const handleSave = (event) => {
    event.preventDefault()
    updateSlot(formData)
    closeEditModal()
  }

  return (
    <Modal open={isOpen} onClose={closeEditModal} title="Edit timetable slot" className="max-w-xl">
      <div className="rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/70 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-slate-900/70 text-slate-200 border-white/10">{selectedSlot.day}</Badge>
                <Badge className="bg-slate-900/70 text-slate-200 border-white/10">Grade {formData.grade}</Badge>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Live slot editor</h3>
                <p className="text-sm text-slate-400">Update subject, teacher, classroom, and times with instant timetable sync.</p>
              </div>
            </div>
            <div className={`rounded-3xl border ${subjectClasses} px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90`}>Subject theme</div>
          </div>

          {conflictMode && (
            <div className="flex items-center gap-3 rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4 text-sm text-rose-100">
              <AlertTriangle className="h-4 w-4 text-rose-200" />
              <div>
                <div className="font-semibold">Conflict-ready slot</div>
                <p className="text-slate-200 text-sm">This slot is flagged for review and can show a red alert in the timetable grid.</p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-slate-400"><BookOpen className="h-4 w-4 text-blue-400" /> Subject</span>
              <input
                type="text"
                value={formData.subject}
                onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                className={`${inputStyles} bg-slate-950/70`}
                required
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-slate-400"><User className="h-4 w-4 text-emerald-400" /> Teacher</span>
              <input
                type="text"
                value={formData.teacher}
                onChange={(event) => setFormData({ ...formData, teacher: event.target.value })}
                className={`${inputStyles} bg-slate-950/70`}
                required
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-slate-400"><MapPin className="h-4 w-4 text-purple-400" /> Classroom</span>
              <input
                type="text"
                value={formData.classroom}
                onChange={(event) => setFormData({ ...formData, classroom: event.target.value })}
                className={`${inputStyles} bg-slate-950/70`}
                required
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-slate-400"><Layers className="h-4 w-4 text-sky-400" /> Grade</span>
              <input
                type="text"
                value={formData.grade}
                onChange={(event) => setFormData({ ...formData, grade: event.target.value })}
                className={`${inputStyles} bg-slate-950/70`}
                required
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-slate-400"><Clock className="h-4 w-4 text-slate-400" /> Start time</span>
              <input
                type="time"
                value={formData.startTime}
                onChange={(event) => setFormData({ ...formData, startTime: event.target.value })}
                className={`${inputStyles} bg-slate-950/70`}
                required
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-slate-400"><Clock className="h-4 w-4 text-slate-400" /> End time</span>
              <input
                type="time"
                value={formData.endTime}
                onChange={(event) => setFormData({ ...formData, endTime: event.target.value })}
                className={`${inputStyles} bg-slate-950/70`}
                required
              />
            </label>
          </div>

          <div className="mt-2 rounded-3xl border border-white/10 bg-slate-950/80 p-4">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Slot tags</div>
            <div className="flex flex-wrap gap-3">
              {['Mathematics', 'Science', 'English', 'History', 'Music'].map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => setFormData({ ...formData, subject })}
                  className={`rounded-2xl border px-3 py-2 text-xs font-semibold transition ${subject === formData.subject ? 'border-blue-400/40 bg-blue-500/10 text-blue-100' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'}`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
