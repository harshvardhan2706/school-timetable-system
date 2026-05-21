import { create } from 'zustand'
import { validateSchedule as validateScheduleUtil } from '../utils/conflictDetection'
import autoSaveEngine from '../services/autoSaveEngine'
import { calculateTeacherAvailability, teacherAvailabilitySelectors } from '../utils/teacherAvailability'

const initialSchedule = {
  Monday: [
    {
      id: 'slot-1',
      subject: 'Mathematics',
      teacher: 'Akbar Khan',
      classroom: 'Room 204',
      grade: '9A',
      startTime: '09:00',
      endTime: '09:45',
      color: 'blue',
      hasConflict: false,
      conflictType: null,
      conflictMessages: [],
    },
    {
      id: 'slot-2',
      subject: 'Science',
      teacher: 'Rahul Sharma',
      classroom: 'Lab 2',
      grade: '10B',
      startTime: '10:00',
      endTime: '10:45',
      color: 'emerald',
      hasConflict: false,
      conflictType: null,
      conflictMessages: [],
    },
  ],
  Tuesday: [
    {
      id: 'slot-3',
      subject: 'English',
      teacher: 'Sarah Jones',
      classroom: 'Room 102',
      grade: '9A',
      startTime: '09:00',
      endTime: '09:45',
      color: 'purple',
      hasConflict: false,
      conflictType: null,
      conflictMessages: [],
    },
    {
      id: 'slot-4',
      subject: 'History',
      teacher: 'Priya Mehta',
      classroom: 'Room 107',
      grade: '10A',
      startTime: '11:00',
      endTime: '11:45',
      color: 'amber',
      hasConflict: false,
      conflictType: null,
      conflictMessages: [],
    },
  ],
  Wednesday: [
    {
      id: 'slot-5',
      subject: 'Music',
      teacher: 'Lorens',
      classroom: 'Room 110',
      grade: '9B',
      startTime: '09:00',
      endTime: '09:45',
      color: 'purple',
      hasConflict: false,
      conflictType: null,
      conflictMessages: [],
    },
    {
      id: 'slot-6',
      subject: 'Art',
      teacher: 'Mina Lopez',
      classroom: 'Studio 3',
      grade: '11C',
      startTime: '13:00',
      endTime: '13:45',
      color: 'pink',
      hasConflict: false,
      conflictType: null,
      conflictMessages: [],
    },
  ],
  Thursday: [
    {
      id: 'slot-7',
      subject: 'Chemistry',
      teacher: 'Dr. Kaur',
      classroom: 'Lab 1',
      grade: '10C',
      startTime: '10:00',
      endTime: '10:45',
      color: 'cyan',
      hasConflict: false,
      conflictType: null,
      conflictMessages: [],
    },
  ],
  Friday: [
    {
      id: 'slot-8',
      subject: 'Physical Education',
      teacher: 'Derek Mills',
      classroom: 'Gym Hall',
      grade: '9A',
      startTime: '14:00',
      endTime: '14:45',
      color: 'sky',
      hasConflict: false,
      conflictType: null,
      conflictMessages: [],
    },
  ],
}

const validatedInitialSchedule = validateScheduleUtil(initialSchedule)
const initialTeacherAvailability = calculateTeacherAvailability(validatedInitialSchedule)

const useTimetableStore = create((set, get) => ({
  schedule: validatedInitialSchedule,
  selectedSlot: null,
  activeEditSlot: null,
  isEditModalOpen: false,
  saveStatus: 'idle',
  hasUnsavedChanges: false,
  lastSavedAt: null,
  teacherAvailabilityMap: initialTeacherAvailability.teacherAvailabilityMap,
  teacherLoadMap: initialTeacherAvailability.teacherLoadMap,
  teacherStats: initialTeacherAvailability.teacherStats,
  availabilitySelectors: teacherAvailabilitySelectors,
  history: {
    past: [],
    future: [],
  },

  setSchedule: (data) => {
    const validated = validateScheduleUtil(data)
    const availability = calculateTeacherAvailability(validated)

    set({
      schedule: validated,
      teacherAvailabilityMap: availability.teacherAvailabilityMap,
      teacherLoadMap: availability.teacherLoadMap,
      teacherStats: availability.teacherStats,
      hasUnsavedChanges: false,
      lastSavedAt: new Date(),
      saveStatus: 'saved',
    })
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

  updateSlot: (updatedFields) =>
    set((state) => {
      if (!state.selectedSlot) return state

      const { day, index } = state.selectedSlot
      const nextSchedule = { ...state.schedule }
      const daySlots = [...nextSchedule[day]]
      const updatedSlot = {
        ...daySlots[index],
        ...updatedFields,
      }
      daySlots[index] = updatedSlot
      nextSchedule[day] = daySlots

      const validatedSchedule = validateScheduleUtil(nextSchedule)
      const validatedSlot = validatedSchedule[day][index]
      get().refreshTeacherAvailability(validatedSchedule)

      return {
        schedule: validatedSchedule,
        selectedSlot: { ...state.selectedSlot, slot: validatedSlot },
        activeEditSlot: state.activeEditSlot
          ? { ...state.activeEditSlot, slot: validatedSlot }
          : null,
      }
    }),

  swapSlots: (sourceDay, sourceIndex, targetDay, targetIndex) =>
    set((state) => {
      const nextSchedule = { ...state.schedule }
      const sourceSlots = [...nextSchedule[sourceDay]]
      const targetSlots = [...nextSchedule[targetDay]]

      if (!sourceSlots[sourceIndex] || !targetSlots[targetIndex]) return state

      const temp = sourceSlots[sourceIndex]
      sourceSlots[sourceIndex] = targetSlots[targetIndex]
      targetSlots[targetIndex] = temp

      nextSchedule[sourceDay] = sourceSlots
      nextSchedule[targetDay] = targetSlots

      const validatedSchedule = validateScheduleUtil(nextSchedule)
      get().refreshTeacherAvailability(validatedSchedule)

      return {
        schedule: validatedSchedule,
      }
    }),

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
