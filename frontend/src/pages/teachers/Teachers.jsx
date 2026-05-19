import { Users } from 'lucide-react'

const teacherData = [
  { name: 'Laura Bennett', subject: 'Mathematics', classes: '8A, 9B' },
  { name: 'Ethan Turner', subject: 'History', classes: '7C, 10A' },
  { name: 'Mia Patel', subject: 'Biology', classes: '11B, 12A' },
  { name: 'Noah Reed', subject: 'Physical Education', classes: '8B, 9C' },
]

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Teacher management</p>
            <h1 className="text-2xl font-semibold text-white">Faculty roster</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110">
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
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-slate-900/90 text-slate-400">
                <tr>
                  <th className="px-6 py-4">Teacher</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Assigned classes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-slate-950/80">
                {teacherData.map((teacher) => (
                  <tr key={teacher.name} className="hover:bg-slate-900/80">
                    <td className="px-6 py-4 text-white">{teacher.name}</td>
                    <td className="px-6 py-4 text-slate-300">{teacher.subject}</td>
                    <td className="px-6 py-4 text-slate-400">{teacher.classes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
