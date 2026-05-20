import { twMerge } from 'tailwind-merge'

export default function Table({ caption, children, className, ...props }) {
  return (
    <div className={twMerge('overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/80 shadow-soft', className)}>
      <table className="min-w-full divide-y divide-white/10 text-left text-sm" {...props}>
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        {children}
      </table>
    </div>
  )
}
