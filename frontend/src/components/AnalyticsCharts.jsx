import { Area, Bar, Line, Pie, AreaChart, BarChart, LineChart, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Cell } from 'recharts'

const workloadData = [
  { name: 'Mon', lessons: 24 },
  { name: 'Tue', lessons: 28 },
  { name: 'Wed', lessons: 21 },
  { name: 'Thu', lessons: 33 },
  { name: 'Fri', lessons: 26 },
]

const subjectDistribution = [
  { name: 'Math', value: 115 },
  { name: 'Science', value: 85 },
  { name: 'History', value: 65 },
  { name: 'Language', value: 50 },
]

const freePeriods = [
  { name: 'Wk 1', free: 12 },
  { name: 'Wk 2', free: 9 },
  { name: 'Wk 3', free: 14 },
  { name: 'Wk 4', free: 8 },
]

const COLORS = ['#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B']

export default function AnalyticsCharts() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Teacher Workload Panel */}
      <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f19]/40 p-6 shadow-xl backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-500">Teacher workload</p>
            <h2 className="text-xl font-bold text-white mt-1">Weekly lessons</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 border border-blue-500/20">
            Live data
          </span>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={workloadData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="workloadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#090d16', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }} />
              <Area type="monotone" dataKey="lessons" stroke="#3B82F6" strokeWidth={2.5} fill="url(#workloadGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid wrapper for subject distribution and charts */}
      <div className="grid gap-6">
        {/* Subject Distribution */}
        <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f19]/40 p-6 shadow-xl backdrop-blur-md">
          <div className="mb-2">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-500">Subject distribution</p>
            <h2 className="text-xl font-bold text-white mt-1">Class coverage</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="h-44 w-44 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ backgroundColor: '#090d16', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }} />
                  <Pie data={subjectDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={75} paddingAngle={5} stroke="transparent">
                    {subjectDistribution.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid flex-1 w-full gap-2 grid-cols-2">
              {subjectDistribution.map((item, index) => (
                <div key={item.name} className="rounded-xl bg-slate-950/40 p-3 border border-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <p className="text-xs font-semibold text-white">{item.name}</p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-slate-400 pl-4">{item.value} <span className="text-[10px] text-slate-600 font-normal">slots</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Analytics Bar Chart */}
        <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f19]/40 p-6 shadow-xl backdrop-blur-md">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-500">Weekly analytics</p>
            <h2 className="text-xl font-bold text-white mt-1">Free period visibility</h2>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={freePeriods} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }} />
                <Bar dataKey="free" fill="#8B5CF6" radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}