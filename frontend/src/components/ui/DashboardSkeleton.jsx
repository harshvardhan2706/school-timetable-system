import Skeleton from './Skeleton'

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton rows={1} columns={1} className="h-40" />
      <Skeleton rows={1} columns={4} />
      <Skeleton rows={2} columns={2} />
    </div>
  )
}
