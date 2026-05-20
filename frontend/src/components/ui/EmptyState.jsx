import { twMerge } from 'tailwind-merge'

export default function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={twMerge('flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/[0.08] bg-surface/80 p-10 text-center shadow-soft', className)}>
      {icon && <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-300">{icon}</div>}
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      </div>
      {action && <div className="w-full sm:w-auto">{action}</div>}
    </div>
  )
}
