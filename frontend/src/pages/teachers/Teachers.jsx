import { useState } from 'react'
import { Users } from 'lucide-react'
import useTeachers from '../../hooks/useTeachers'
import { createTeacher } from '../../services/teacherService'

export default function TeachersPage() {
  const { teachers, loading, error, refetch } = useTeachers()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', subject: '', classes: '' })
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveError, setSaveError] = useState(null)

  const handleSaveTeacher = async () => {
    setSaveError(null)
    setSaveLoading(true)
    try {
      await createTeacher({
        teacherName: formData.name,
        subject: formData.subject,
        email: '',
        maxPeriodsPerWeek: 0,
        assignedPeriods: Number(formData.classes) || 0,
        available: true,
      })
      setIsOpen(false)
      setFormData({ name: '', subject: '', classes: '' })
      refetch()
    } catch (err) {
      setSaveError('Unable to save teacher. Please try again.')
    } finally {
      setSaveLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Teacher management</p>
            <h1 className="text-2xl font-semibold text-white">Faculty roster</h1>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            <Users className="h-4 w-4" />
            Add teacher
          </button>
        </div>
      </section>
      <section className="grid gap-6">
        <div className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-white">Active teachers</h2>
          <p className="mt-2 text-sm text-slate-400">Manage instructors, subjects, and classroom assignments.</p>
          <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80">
            {loading ? (
              <div className="p-8 text-center text-slate-400">Loading teachers from backend...</div>
            ) : error ? (
              <div className="p-8 text-center text-rose-200">Unable to load teachers. Check your backend connection.</div>
            ) : (
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-slate-900/90 text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Teacher</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Assigned classes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-slate-950/80">
                  {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                      <tr key={teacher.id || teacher.name} className="hover:bg-slate-900/80">
                        <td className="px-6 py-4 text-white">{teacher.teacherName || teacher.name}</td>
                        <td className="px-6 py-4 text-slate-300">{teacher.subject || teacher.department || '—'}</td>
                        <td className="px-6 py-4 text-slate-400">{teacher.assignedPeriods != null ? teacher.assignedPeriods : teacher.classes || teacher.assignedClasses || '—'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-slate-400">No teacher records returned from the backend.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="w-full max-w-xl rounded-[32px] bg-slate-950 p-6 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Add teacher</p>
                <h2 className="text-2xl font-semibold text-white">Create a new teacher</h2>
              </div>
              <button type="button" className="text-slate-400 transition hover:text-white" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="block text-sm font-medium text-slate-200">Name</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                placeholder="Teacher name"
              />
              <label className="block text-sm font-medium text-slate-200">Subject</label>
              <input
                value={formData.subject}
                onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                placeholder="Subject"
              />
              <label className="block text-sm font-medium text-slate-200">Assigned classes</label>
              <input
                value={formData.classes}
                onChange={(e) => setFormData((prev) => ({ ...prev, classes: e.target.value }))}
                className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                placeholder="Class names or groups"
              />
              {saveError && <p className="text-sm text-rose-400">{saveError}</p>}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  className="rounded-3xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveTeacher}
                  disabled={saveLoading}
                  className="rounded-3xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saveLoading ? 'Saving...' : 'Save Record'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
