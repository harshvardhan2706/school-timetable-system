import { BarChart3, Clock3, Sparkles, Users2, ArrowUpRight, Calendar, Bell } from 'lucide-react'
import AnalyticsCharts from '../../components/AnalyticsCharts'
import DashboardCard from '../../components/DashboardCard'

const stats = [
  { title: 'Class utilization', value: '98%', change: '+7%', icon: BarChart3, colorClass: 'from-blue-500 to-cyan-500 text-blue-400' },
  { title: 'Teacher load', value: '134', change: '+4%', icon: Users2, colorClass: 'from-violet-500 to-purple-500 text-violet-400' },
  { title: 'Free periods', value: '24', change: '-6%', icon: Clock3, colorClass: 'from-emerald-500 to-teal-500 text-emerald-400' },
  { title: 'Monthly imports', value: '12', change: '+28%', icon: Sparkles, colorClass: 'from-amber-500 to-orange-500 text-amber-400' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#111827] to-[#0b0f19] p-6 md:p-8 shadow-2xl">
        {/* Subtle background ambient glow */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between relative z-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">Overview Panel</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              School operations dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              Monitor teacher assignments, classroom usage, and timetable readiness with a premium ERP view.
            </p>
          </div>
          <button className="self-start lg:self-center inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-500/10 transition duration-200 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]">
            Quick actions
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <DashboardCard 
            key={item.title} 
            title={item.title} 
            value={item.value} 
            change={item.change} 
            icon={item.icon} 
            colorClass={item.colorClass}
          >
            This week
          </DashboardCard>
        ))}
      </section>

      {/* Info Split Section */}
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Activity Feed */}
        <div className="flex flex-col rounded-3xl border border-white/[0.06] bg-[#0f1524] p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Activity feed</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Latest campus updates</h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Real time
            </span>
          </div>
          
          <div className="mt-5 space-y-3 flex-1 overflow-y-auto">
            {[
              { text: 'New timetable upload completed for grade 9.', time: '10m ago' },
              { text: 'Teacher onboarding approved for Ms. Green.', time: '1h ago' },
              { text: 'Classroom assignments refreshed for spring term.', time: '3h ago' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 rounded-xl border border-white/[0.03] bg-slate-950/40 p-4 transition duration-200 hover:bg-slate-900/40 hover:border-white/[0.08]">
                <div className="mt-0.5 rounded-lg bg-blue-500/10 p-2 text-blue-400">
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-300 leading-snug">{item.text}</p>
                  <span className="mt-1 block text-xs text-slate-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Highlights */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/[0.06] bg-[#0f1524] p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Engagement</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Operational highlights</h2>
            </div>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-400 border border-white/[0.05]">
              Updated hourly
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 flex-1 justify-center">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950/60 to-slate-950/30 p-5 border border-white/[0.02] transition duration-300 hover:border-white/[0.08]">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Average response time</p>
              <p className="mt-2 text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">2.8m</p>
              <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                <span>↓ 12% from yesterday</span>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950/60 to-slate-950/30 p-5 border border-white/[0.02] transition duration-300 hover:border-white/[0.08]">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Student adoption</p>
              <p className="mt-2 text-3xl font-bold text-white tracking-tight group-hover:text-violet-400 transition-colors">96%</p>
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Target: 95%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Chart Block */}
      <section className="rounded-3xl border border-white/[0.06] bg-[#0f1524] p-6 shadow-xl">
        <AnalyticsCharts />
      </section>
    </div>
  )
}