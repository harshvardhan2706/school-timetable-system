import { useEffect, useMemo, useState } from 'react'
import { BarChart3, Clock3, Sparkles, Users2, ArrowUpRight, Calendar, Bell, RefreshCw, AlertCircle, Zap } from 'lucide-react'
import AnalyticsCharts from '../../components/AnalyticsCharts'
import DashboardCard from '../../components/DashboardCard'
import DashboardSkeleton from '../../components/DashboardSkeleton'
import useDashboardStore from '../../store/dashboardStore'

export default function DashboardPage() {
  const {
    isLoading,
    dashboardStats,
    classroomAnalytics,
    teacherAnalytics,
    timetableAnalytics,
    activityFeed,
    operationalInsights,
    errors,
    lastUpdated,
    fetchDashboardData,
    refreshDashboard,
    retryFailedRequests,
    clearErrors,
  } = useDashboardStore()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState(null)

  // Initialize dashboard data on mount
  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  // Set up auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshDashboard()
    }, 30000)
    setRefreshInterval(interval)
    return () => clearInterval(interval)
  }, [refreshDashboard])

  // Format stats cards with real data
  const stats = useMemo(() => [
    {
      title: 'Class utilization',
      value: `${classroomAnalytics?.utilizationPercentage || 0}%`,
      change: '+7%',
      icon: BarChart3,
      colorClass: 'from-blue-500 to-cyan-500 text-blue-400',
    },
    {
      title: 'Teacher load',
      value: `${teacherAnalytics?.averageLessonsPerWeek?.toFixed(0) || 0}`,
      change: `+${teacherAnalytics?.overloadedTeachers || 0} overload`,
      icon: Users2,
      colorClass: 'from-violet-500 to-purple-500 text-violet-400',
    },
    {
      title: 'Free periods',
      value: timetableAnalytics?.weeksGenerated || '0',
      change: '-6%',
      icon: Clock3,
      colorClass: 'from-emerald-500 to-teal-500 text-emerald-400',
    },
    {
      title: 'Total timetables',
      value: timetableAnalytics?.generatedTimetables || '0',
      change: '+28%',
      icon: Sparkles,
      colorClass: 'from-amber-500 to-orange-500 text-amber-400',
    },
  ], [classroomAnalytics, teacherAnalytics, timetableAnalytics])

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshDashboard()
    } finally {
      setIsRefreshing(false)
    }
  }

  // Show loading state on first load
  if (isLoading && Object.keys(dashboardStats).length === 0) {
    return <DashboardSkeleton />
  }

  // Show error state if critical errors exist
  const hasErrors = Object.values(errors).some(err => err !== null)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Error Banner */}
      {hasErrors && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 md:p-6 flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-200">Some data failed to load</h3>
            <p className="text-sm text-red-300/80 mt-1">We'll automatically retry in a few moments. You can also manually refresh.</p>
          </div>
          <button
            onClick={retryFailedRequests}
            className="flex-shrink-0 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
          >
            Retry Now
          </button>
        </div>
      )}

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
              {lastUpdated?.stats ? `Last updated ${new Date(lastUpdated.stats).toLocaleTimeString()}` : 'Real-time analytics and metrics'}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="self-start lg:self-center inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-500/10 transition duration-200 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
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
            {isLoading ? 'Loading...' : 'This week'}
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
            {activityFeed && activityFeed.length > 0 ? (
              activityFeed.map((item, index) => (
                <div key={index} className="flex items-start gap-4 rounded-xl border border-white/[0.03] bg-slate-950/40 p-4 transition duration-200 hover:bg-slate-900/40 hover:border-white/[0.08]">
                  <div className="mt-0.5 rounded-lg bg-blue-500/10 p-2 text-blue-400">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 leading-snug">{item.text}</p>
                    <span className="mt-1 block text-xs text-slate-500">{item.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                <Bell className="h-8 w-8 opacity-30 mb-2" />
                <p className="text-sm">No activity yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Operational Insights */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/[0.06] bg-[#0f1524] p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Engagement</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Operational highlights</h2>
            </div>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-400 border border-white/[0.05]">
              Live insights
            </span>
          </div>

          <div className="mt-5 space-y-3 flex-1">
            {operationalInsights && operationalInsights.length > 0 ? (
              operationalInsights.map((insight, idx) => {
                const bgColor = insight.severity === 'CRITICAL' 
                  ? 'from-red-500/20 to-red-600/5 border-red-500/20'
                  : insight.severity === 'WARNING'
                  ? 'from-amber-500/20 to-amber-600/5 border-amber-500/20'
                  : 'from-blue-500/20 to-blue-600/5 border-blue-500/20'
                
                const textColor = insight.severity === 'CRITICAL'
                  ? 'text-red-300'
                  : insight.severity === 'WARNING'
                  ? 'text-amber-300'
                  : 'text-blue-300'
                
                return (
                  <div key={idx} className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b ${bgColor} p-4 border transition duration-300 hover:border-white/[0.08]`}>
                    <div className="flex items-start gap-3">
                      <Zap className={`h-4 w-4 flex-shrink-0 mt-0.5 ${textColor}`} />
                      <div>
                        <p className={`text-sm font-semibold ${textColor}`}>{insight.title}</p>
                        <p className="mt-1 text-xs text-slate-400">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="flex items-center justify-center py-8 text-slate-500">
                <p className="text-sm">No insights available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Analytics Chart Block */}
      <section className="rounded-3xl border border-white/[0.06] bg-[#0f1524] p-6 shadow-xl">
        <AnalyticsCharts isLoading={isLoading} />
      </section>
    </div>
  )
}