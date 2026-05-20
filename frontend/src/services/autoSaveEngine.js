import { debounce } from 'lodash'
import { syncTimetable } from './timetableService'

class AutoSaveEngine {
  constructor() {
    this.debouncedSync = debounce(this.performSync.bind(this), 2000, {
      maxWait: 5000,
      leading: false,
      trailing: true,
    })
    this.pendingSchedule = null
    this.isProcessing = false
  }

  async performSync(schedule, onStatusChange) {
    if (!schedule || this.isProcessing) return

    this.isProcessing = true
    try {
      onStatusChange?.('saving')
      const result = await syncTimetable(schedule)
      onStatusChange?.('saved')
      this.pendingSchedule = null
      return result
    } catch (error) {
      console.error('Auto-save failed:', error.message)
      onStatusChange?.('error')
      throw error
    } finally {
      this.isProcessing = false
    }
  }

  schedule(nextSchedule, onStatusChange) {
    this.pendingSchedule = nextSchedule
    onStatusChange?.('idle')
    this.debouncedSync(nextSchedule, onStatusChange)
  }

  async flush(schedule, onStatusChange) {
    if (this.debouncedSync.pending()) {
      this.debouncedSync.cancel()
      return this.performSync(schedule, onStatusChange)
    }
    return Promise.resolve()
  }

  cancel() {
    this.debouncedSync.cancel()
    this.pendingSchedule = null
  }
}

export default new AutoSaveEngine()
