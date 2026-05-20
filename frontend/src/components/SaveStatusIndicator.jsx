import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import useTimetableStore from '../store/timetableStore.js'

export default function SaveStatusIndicator() {
  const { saveStatus, lastSavedAt } = useTimetableStore()

  const statusConfig = {
    idle: {
      icon: Clock,
      label: 'Ready',
      color: 'text-slate-500',
      bgColor: 'bg-slate-100',
    },
    saving: {
      icon: Clock,
      label: 'Saving...',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      animate: true,
    },
    saved: {
      icon: CheckCircle2,
      label: 'Saved',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    error: {
      icon: AlertCircle,
      label: 'Save Failed',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  }

  const config = statusConfig[saveStatus] || statusConfig.idle
  const Icon = config.icon

  const formattedTime =
    lastSavedAt && saveStatus === 'saved'
      ? new Date(lastSavedAt).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : null

  return (
    <div className="flex items-center gap-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={saveStatus}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.2 }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${config.bgColor}`}
        >
          {config.animate ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Icon className={`w-4 h-4 ${config.color}`} />
            </motion.div>
          ) : (
            <Icon className={`w-4 h-4 ${config.color}`} />
          )}
          <span className={`text-sm font-medium ${config.color}`}>
            {config.label}
            {formattedTime && <span className="ml-1 text-xs opacity-75">at {formattedTime}</span>}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
