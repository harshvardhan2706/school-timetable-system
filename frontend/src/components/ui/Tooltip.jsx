import { twMerge } from 'tailwind-merge'

export default function Tooltip({ label, children, className }) {
  return (
    <div className={twMerge('group relative inline-flex', className)}>
      {children}
      {label ? (
        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950/95 px-3 py-2 text-xs text-slate-200 opacity-0 shadow-soft transition-all duration-200 group-hover:opacity-100">
          {label}
        </span>
      ) : null}
    </div>
  )
}
