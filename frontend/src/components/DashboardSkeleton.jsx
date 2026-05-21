/**
 * Dashboard Skeleton Loader
 * Animated shimmer placeholders while data loads
 */
export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner Skeleton */}
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#111827] to-[#0b0f19] p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="h-4 w-32 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
            <div className="mt-3 h-8 w-64 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
            <div className="mt-3 h-4 w-full max-w-md bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
          </div>
          <div className="h-12 w-32 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl animate-pulse self-start lg:self-center" />
        </div>
      </section>

      {/* Metrics Grid Skeleton */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-white/[0.06] bg-[#0f1524] p-6 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-3 w-32 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
                <div className="mt-3 h-10 w-24 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
              </div>
              <div className="h-12 w-12 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl animate-pulse" />
            </div>
            <div className="mt-4 h-3 w-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
          </div>
        ))}
      </section>

      {/* Info Split Section Skeleton */}
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Activity Feed Skeleton */}
        <div className="rounded-3xl border border-white/[0.06] bg-[#0f1524] p-6 shadow-xl">
          <div className="pb-4 border-b border-white/[0.05]">
            <div className="h-3 w-32 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
            <div className="mt-2 h-6 w-48 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
          </div>

          <div className="mt-5 space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start gap-4 rounded-xl border border-white/[0.03] bg-slate-950/40 p-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-slate-700 to-slate-800 animate-pulse" />
                <div className="flex-1">
                  <div className="h-3 w-full bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
                  <div className="mt-2 h-3 w-24 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights Skeleton */}
        <div className="rounded-3xl border border-white/[0.06] bg-[#0f1524] p-6 shadow-xl">
          <div className="pb-4 border-b border-white/[0.05]">
            <div className="h-3 w-32 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
            <div className="mt-2 h-6 w-48 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
          </div>

          <div className="mt-5 grid gap-4 grid-cols-1">
            {[1, 2].map((item) => (
              <div key={item} className="rounded-2xl bg-gradient-to-b from-slate-950/60 to-slate-950/30 p-5 border border-white/[0.02]">
                <div className="h-3 w-32 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
                <div className="mt-3 h-8 w-24 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Chart Block Skeleton */}
      <section className="rounded-3xl border border-white/[0.06] bg-[#0f1524] p-6 shadow-xl">
        <div className="grid gap-6 xl:grid-cols-2">
          {[1, 2].map((item) => (
            <div key={item} className="rounded-3xl border border-white/[0.06] bg-[#0b0f19]/40 p-6">
              <div className="mb-6">
                <div className="h-3 w-32 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
                <div className="mt-2 h-6 w-48 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
              </div>
              <div className="h-64 w-full bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
