import { twMerge } from 'tailwind-merge'

export default function SectionHeader({ title, subtitle, action, className }) {
  return (
    <div className={twMerge('flex flex-col gap-3 md:flex-row md:items-start md:justify-between', className)}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{subtitle}</p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
