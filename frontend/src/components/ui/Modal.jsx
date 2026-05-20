import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Modal({ title, open, onClose, children, className }) {
  useEffect(() => {
    const listener = (event) => {
      if (event.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={twMerge('w-full max-w-2xl rounded-[32px] border border-white/10 bg-surface p-6 shadow-soft', className)}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
