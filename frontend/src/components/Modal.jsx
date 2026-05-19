import { motion } from 'framer-motion'

export default function Modal({ title, open, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-surface p-6 shadow-soft"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-2xl bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          >
            Close
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  )
}
