import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export default function Skeleton({ rows = 3, columns = 1, className }) {
  return (
    <div className={twMerge(clsx('grid gap-4 animate-pulse', className))}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="space-y-3">
          {Array.from({ length: columns }).map((__, colIndex) => (
            <div
              key={colIndex}
              className="relative overflow-hidden rounded-3xl bg-slate-900/70 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-60 before:animate-[shimmer_1.6s_infinite]"
              style={{ minHeight: '72px' }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
