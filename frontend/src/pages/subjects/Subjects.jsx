import { Layers, Sparkles } from 'lucide-react'
import useSubjects from '../../hooks/useSubjects'

export default function SubjectsPage() {
  const { subjects, loading, error } = useSubjects()

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Subject management</p>
            <h1 className="text-2xl font-semibold text-white">Curriculum and subject catalog</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110">
            <Sparkles className="h-4 w-4" />
            Add subject
          </button>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 text-center text-slate-400">Loading subjects from backend...</div>
        ) : error ? (
          <div className="rounded-[32px] border border-rose-500/20 bg-rose-500/5 p-8 text-center text-rose-200">Unable to load subjects. Check backend connectivity.</div>
        ) : subjects.length > 0 ? (
          subjects.map((item) => (
            <div key={item.id || item.name || item.title} className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-soft transition hover:-translate-y-1 hover:bg-slate-900/90">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.26em] text-slate-500">{item.name || item.title}</p>
                <Layers className="h-5 w-5 text-violet-400" />
              </div>
              <p className="text-sm text-slate-400">{item.description || item.summary || 'Core curriculum and analytics content.'}</p>
            </div>
          ))
        ) : (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 text-center text-slate-400">No subjects returned from the backend.</div>
        )}
      </section>
    </div>
  )
}
