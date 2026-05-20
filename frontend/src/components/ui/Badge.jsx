import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const variants = {
  default: 'bg-slate-950/70 text-slate-100 border-white/10',
  success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  danger: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  info: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
}

export default function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span className={twMerge(clsx('inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold', variants[variant] ?? variants.default, className))} {...props}>
      {children}
    </span>
  )
}
