import { useState } from 'react'
import { Building, Layers } from 'lucide-react'
import useClasses from '../../hooks/useClasses'
import { createClass } from '../../services/classService'

export default function ClassesPage() {
  const { classes, loading, error, refetch } = useClasses()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ className: '', section: '', totalPeriodsPerDay: '' })
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveError, setSaveError] = useState(null)

  const handleSaveClass = async () => {
    setSaveError(null)
    setSaveLoading(true)

    try {
      await createClass({
        className: formData.className,
        section: formData.section,
        totalPeriodsPerDay: Number(formData.totalPeriodsPerDay) || 0,
      })
      setIsOpen(false)
      setFormData({ className: '', section: '', totalPeriodsPerDay: '' })
      refetch()
    } catch (err) {
      setSaveError('Unable to save class. Please try again.')
    } finally {
      setSaveLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Class structures</p>
            <h1 className="text-2xl font-semibold text-white">Class & course management</h1>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110"
          >
            <Building className="h-4 w-4" />
            New class
          </button>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 text-center text-slate-400">Loading classes from backend...</div>
        ) : error ? (
          <div className="rounded-[32px] border border-rose-500/20 bg-rose-500/5 p-8 text-center text-rose-200">Unable to load classes. Check backend connectivity.</div>
        ) : classes.length > 0 ? (
          classes.map((item) => (
            <div key={item.id || item.className} className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-soft transition hover:-translate-y-1 hover:bg-slate-900/90">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.26em] text-slate-500">{item.className || item.grade || item.name}</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">{item.section || item.room || 'Unknown section'}</h2>
                </div>
                <Layers className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-sm text-slate-400">{item.totalPeriodsPerDay != null ? `${item.totalPeriodsPerDay} periods/day` : 'No period data'}</p>
            </div>
          ))
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 text-center text-slate-400">No class records returned from the backend.</div>
        )}
      </section>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="w-full max-w-xl rounded-[32px] bg-slate-950 p-6 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">New class</p>
                <h2 className="text-2xl font-semibold text-white">Create a new class</h2>
              </div>
              <button type="button" className="text-slate-400 transition hover:text-white" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="block text-sm font-medium text-slate-200">Class name</label>
              <input
                value={formData.className}
                onChange={(e) => setFormData((prev) => ({ ...prev, className: e.target.value }))}
                className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                placeholder="Class name"
              />

              <label className="block text-sm font-medium text-slate-200">Section</label>
              <input
                value={formData.section}
                onChange={(e) => setFormData((prev) => ({ ...prev, section: e.target.value }))}
                className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                placeholder="Section"
              />

              <label className="block text-sm font-medium text-slate-200">Periods per day</label>
              <input
                value={formData.totalPeriodsPerDay}
                onChange={(e) => setFormData((prev) => ({ ...prev, totalPeriodsPerDay: e.target.value }))}
                type="number"
                className="w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                placeholder="Number of periods per day"
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
                  onClick={handleSaveClass}
                  disabled={saveLoading}
                  className="rounded-3xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saveLoading ? 'Saving...' : 'Save class'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
