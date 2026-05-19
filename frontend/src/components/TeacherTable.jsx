import { useMemo, useState } from 'react'
import { Edit3, Plus, Search, Trash2, SlidersHorizontal } from 'lucide-react'
import Modal from './Modal'

const teachers = [
  { id: 1, name: 'Aisha Khan', subject: 'Mathematics', status: 'Active' },
  { id: 2, name: 'Mia Patel', subject: 'Science', status: 'Active' },
  { id: 3, name: 'Noah Lee', subject: 'History', status: 'On leave' },
  { id: 4, name: 'Oliver Green', subject: 'Literature', status: 'Active' },
]

export default function TeacherTable() {
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const filtered = useMemo(
    () => teachers.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase()) || t.subject.toLowerCase().includes(filter.toLowerCase())),
    [filter],
  )

  return (
    <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f19]/40 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Teachers</p>
          <h2 className="mt-1 text-2xl font-bold text-white">Manage your team</h2>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex flex-1 sm:flex-initial items-center gap-2 rounded-xl bg-slate-950/50 px-3.5 py-2.5 border border-white/[0.05] text-slate-300 focus-within:border-blue-500/50 transition">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search staff members..."
              className="w-full sm:w-48 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
          <button
            onClick={() => {
              setSelected({ name: '', subject: '', status: 'Active' })
              setIsOpen(true)
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:opacity-95 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add teacher
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/[0.05] bg-slate-950/20">
        <table className="w-full border-collapse text-left text-sm text-slate-200">
          <thead className="bg-slate-950/60 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/[0.05]">
            <tr>
              <th className="px-6 py-4">Instructor Name</th>
              <th className="px-6 py-4">Department core</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {filtered.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-white/[0.02] transition duration-150">
                <td className="px-6 py-4 font-semibold text-white">{teacher.name}</td>
                <td className="px-6 py-4 text-slate-400">{teacher.subject}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${teacher.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${teacher.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    {teacher.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-rose-400 hover:bg-rose-550/10 transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal title="Configure Teacher Account" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Name</label>
            <input className="w-full rounded-xl border border-white/[0.08] bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-blue-500/50 transition" value={selected?.name} onChange={(e) => setSelected((prev) => ({ ...prev, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Assigned Subject</label>
            <input className="w-full rounded-xl border border-white/[0.08] bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-blue-500/50 transition" value={selected?.subject} onChange={(e) => setSelected((prev) => ({ ...prev, subject: e.target.value }))} />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.05]">
            <button onClick={() => setIsOpen(false)} className="rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10">Cancel</button>
            <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 shadow-lg shadow-blue-600/10">Save Record</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}