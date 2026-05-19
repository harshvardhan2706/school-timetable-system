import { Building, Layers } from 'lucide-react'

const classes = [
  { name: 'Grade 9A', students: 28, room: 'B10' },
  { name: 'Grade 10B', students: 32, room: 'A14' },
  { name: 'Grade 11C', students: 24, room: 'C03' },
  { name: 'Grade 12D', students: 26, room: 'D01' },
]

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Class structures</p>
            <h1 className="text-2xl font-semibold text-white">Class & course management</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110">
            <Building className="h-4 w-4" />
            New class
          </button>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {classes.map((item) => (
          <div key={item.name} className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-soft transition hover:-translate-y-1 hover:bg-slate-900/90">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.26em] text-slate-500">{item.name}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{item.room}</h2>
              </div>
              <Layers className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-sm text-slate-400">{item.students} students enrolled</p>
          </div>
        ))}
      </section>
    </div>
  )
}
