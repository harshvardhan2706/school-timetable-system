import { create } from 'zustand'
import { validateSchedule as validateScheduleUtil } from '../utils/conflictDetection'
import autoSaveEngine from '../services/autoSaveEngine'
import { calculateTeacherAvailability, teacherAvailabilitySelectors } from '../utils/teacherAvailability'
import { getTimetable, saveTimetable } from '../services/timetableService'

const emptySchedule = {}

const useTimetableStore = create((set, get) => ({
  schedule: emptySchedule,
  selectedSlot: null,
  activeEditSlot: null,
  isEditModalOpen: false,
  isScheduleLoading: false,
  scheduleError: null,
  saveStatus: 'idle',
  hasUnsavedChanges: false,
  lastSavedAt: null,
  teacherAvailabilityMap: {},
  teacherLoadMap: {},
  teacherStats: [],
  availabilitySelectors: teacherAvailabilitySelectors,
  history: {
    past: [],
    future: [],
  },

  setSchedule: (data) => {
    const validated = validateScheduleUtil(data || emptySchedule)
    const availability = calculateTeacherAvailability(validated)

    set({
      schedule: validated,
      teacherAvailabilityMap: availability.teacherAvailabilityMap,
      teacherLoadMap: availability.teacherLoadMap,
      teacherStats: availability.teacherStats,
      scheduleError: null,
      hasUnsavedChanges: false,
      saveStatus: 'saved',
      lastSavedAt: new Date(),
    })
  },

  loadSchedule: async () => {
    set({ isScheduleLoading: true, scheduleError: null })
    try {
      const data = await getTimetable()
      get().setSchedule(data)
      return data
    } catch (error) {
      set({ scheduleError: error })
      throw error
    } finally {
      set({ isScheduleLoading: false })
    }
  },

  saveSchedule: async (payload) => {
    set({ saveStatus: 'saving' })
    try {
      const data = await saveTimetable(payload)
      get().setSchedule(data)
      return data
    } catch (error) {
      set({ saveStatus: 'error', scheduleError: error })
      throw error
    }
  },

  refreshTeacherAvailability: (schedule) => {
    const availability = calculateTeacherAvailability(schedule)
    set({
      teacherAvailabilityMap: availability.teacherAvailabilityMap,
      teacherLoadMap: availability.teacherLoadMap,
      teacherStats: availability.teacherStats,
    })
    return availability
  },

  validateSchedule: (schedule) => validateScheduleUtil(schedule),

  runValidation: () =>
    set((state) => {
      const validated = validateScheduleUtil(state.schedule)
      const availability = calculateTeacherAvailability(validated)
      return {
        schedule: validated,
        teacherAvailabilityMap: availability.teacherAvailabilityMap,
        teacherLoadMap: availability.teacherLoadMap,
        teacherStats: availability.teacherStats,
      }
    }),

  _triggerAutoSave: (schedule) => {
    set({ saveStatus: 'idle', hasUnsavedChanges: true })
    autoSaveEngine.schedule(schedule, (status) => {
      if (status === 'saved') {
        set({
          saveStatus: 'saved',
          hasUnsavedChanges: false,
          lastSavedAt: new Date(),
        })
      } else if (status === 'saving') {
        set({ saveStatus: 'saving' })
      } else if (status === 'error') {
        set({ saveStatus: 'error', hasUnsavedChanges: true })
      }
    })
  },

  openEditModal: (payload) =>
    set({
      selectedSlot: payload,
      activeEditSlot: payload,
      isEditModalOpen: true,
    }),

  closeEditModal: () =>
    set({
      selectedSlot: null,
      activeEditSlot: null,
      isEditModalOpen: false,
    }),

  updateSlot: (updatedFields) => {
    const state = get()
    if (!state.selectedSlot) return

    get().recordHistory(state.schedule)

    const { day, index } = state.selectedSlot
    const nextSchedule = { ...state.schedule }
    const daySlots = [...(nextSchedule[day] || [])]
    const updatedSlot = {
      ...daySlots[index],
      ...updatedFields,
    }
    daySlots[index] = updatedSlot
    nextSchedule[day] = daySlots

    const validatedSchedule = validateScheduleUtil(nextSchedule)
    const validatedSlot = validatedSchedule[day]?.[index]
    const availability = calculateTeacherAvailability(validatedSchedule)

    set({
      schedule: validatedSchedule,
      selectedSlot: { ...state.selectedSlot, slot: validatedSlot },
      activeEditSlot: state.activeEditSlot
        ? { ...state.activeEditSlot, slot: validatedSlot }
        : null,
      teacherAvailabilityMap: availability.teacherAvailabilityMap,
      teacherLoadMap: availability.teacherLoadMap,
      teacherStats: availability.teacherStats,
      hasUnsavedChanges: true,
      saveStatus: 'idle',
    })

    get()._triggerAutoSave(validatedSchedule)
  },

  swapSlots: (sourceDay, sourceIndex, targetDay, targetIndex) => {
    const state = get()
    get().recordHistory(state.schedule)

    const nextSchedule = { ...state.schedule }
    const sourceSlots = [...(nextSchedule[sourceDay] || [])]
    const targetSlots = [...(nextSchedule[targetDay] || [])]

    if (!sourceSlots[sourceIndex] || !targetSlots[targetIndex]) return

    const temp = sourceSlots[sourceIndex]
    sourceSlots[sourceIndex] = targetSlots[targetIndex]
    targetSlots[targetIndex] = temp

    nextSchedule[sourceDay] = sourceSlots
    nextSchedule[targetDay] = targetSlots

    const validatedSchedule = validateScheduleUtil(nextSchedule)
    const availability = calculateTeacherAvailability(validatedSchedule)

    set({
      schedule: validatedSchedule,
      teacherAvailabilityMap: availability.teacherAvailabilityMap,
      teacherLoadMap: availability.teacherLoadMap,
      teacherStats: availability.teacherStats,
      hasUnsavedChanges: true,
      saveStatus: 'idle',
    })

    get()._triggerAutoSave(validatedSchedule)
  },

  recordHistory: (snapshot) =>
    set((state) => ({
      history: {
        past: [...state.history.past, snapshot],
        future: [],
      },
    })),

  flushAutoSave: async () => {
    const state = get()
    return autoSaveEngine.flush(state.schedule, (status) => {
      if (status === 'saved') {
        set({
          saveStatus: 'saved',
          hasUnsavedChanges: false,
          lastSavedAt: new Date(),
        })
      } else if (status === 'saving') {
        set({ saveStatus: 'saving' })
      } else if (status === 'error') {
        set({ saveStatus: 'error' })
      }
    })
  },

  cancelAutoSave: () => {
    autoSaveEngine.cancel()
    set({ saveStatus: 'idle' })
  },
}))

export default useTimetableStore
