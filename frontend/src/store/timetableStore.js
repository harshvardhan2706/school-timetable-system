import { create } from 'zustand'

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
    },
  ],
}

const useTimetableStore = create((set) => ({
  schedule: initialSchedule,
  selectedSlot: null,
  activeEditSlot: null,
  isEditModalOpen: false,
  history: {
    past: [],
    future: [],
  },

  setSchedule: (data) => set({ schedule: data }),

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
      const schedule = { ...state.schedule }
      const daySlots = [...schedule[day]]
      const updatedSlot = {
        ...daySlots[index],
        ...updatedFields,
      }
      daySlots[index] = updatedSlot
      schedule[day] = daySlots

      return {
        schedule,
        selectedSlot: { ...state.selectedSlot, slot: updatedSlot },
        activeEditSlot: state.activeEditSlot
          ? { ...state.activeEditSlot, slot: updatedSlot }
          : null,
      }
    }),

  swapSlots: (sourceDay, sourceIndex, targetDay, targetIndex) =>
    set((state) => {
      const schedule = { ...state.schedule }
      const sourceSlots = [...schedule[sourceDay]]
      const targetSlots = [...schedule[targetDay]]

      if (!sourceSlots[sourceIndex] || !targetSlots[targetIndex]) return state

      const temp = sourceSlots[sourceIndex]
      sourceSlots[sourceIndex] = targetSlots[targetIndex]
      targetSlots[targetIndex] = temp

      schedule[sourceDay] = sourceSlots
      schedule[targetDay] = targetSlots

      return { schedule }
    }),

  recordHistory: (snapshot) =>
    set((state) => ({
      history: {
        past: [...state.history.past, snapshot],
        future: [],
      },
    })),
}))

export default useTimetableStore;
