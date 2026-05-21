/**
 * Chart Skeleton Loader
 * Animated shimmer placeholder for charts
 */
export default function ChartSkeleton() {
  return (
    <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f19]/40 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-3 w-32 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
          <div className="mt-2 h-6 w-48 bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
        </div>
        <div className="h-8 w-24 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full animate-pulse" />
      </div>
      <div className="h-72 w-full bg-gradient-to-r from-slate-700 to-slate-800 rounded animate-pulse" />
    </div>
  );
}
