import { create } from "zustand";

const initialSchedule = {
  Monday: [
    { id: "m1", subject: "Mathematics", teacher: "Akbar Khan", classroom: "Room 204", grade: "9A", startTime: "09:00", endTime: "09:45", color: "blue", hasConflict: false },
    { id: "m2", subject: "Science", teacher: "Rahul Sharma", classroom: "Lab 2", grade: "10B", startTime: "10:00", endTime: "10:45", color: "emerald", hasConflict: false },
  ],
  Tuesday: [
    { id: "t1", subject: "English", teacher: "Sarah Jones", classroom: "Room 102", grade: "9A", startTime: "09:00", endTime: "09:45", color: "purple", hasConflict: false }
  ],
  Wednesday: [
    { id: "t1", subject: "Music", teacher: "Lorens", classroom: "Room 110", grade: "9B", startTime: "09:00", endTime: "09:45", color: "purple", hasConflict: false }

  ],
  Thursday: [],
  Friday: [],
};

const useTimetableStore = create((set) => ({
  schedule: initialSchedule,
  activeEditSlot: null, // Track specific item edits { day, index, slotData }

  setSchedule: (data) => set({ schedule: data }),
  
  setActiveEditSlot: (payload) => set({ activeEditSlot: payload }),

  // Upgraded dynamic object structural property assignment
  updateDirectSlot: (day, index, updatedFields) =>
    set((state) => {
      const newSchedule = { ...state.schedule };
      const updatedDay = [...newSchedule[day]];
      
      updatedDay[index] = {
        ...updatedDay[index],
        ...updatedFields,
      };
      
      newSchedule[day] = updatedDay;
      return { schedule: newSchedule };
    }),

  swapSlots: (sourceDay, sourceIndex, targetDay, targetIndex) =>
    set((state) => {
      const newSchedule = { ...state.schedule };
      const sourceSlots = [...newSchedule[sourceDay]];
      const targetSlots = [...newSchedule[targetDay]];

      if (!sourceSlots[sourceIndex] || !targetSlots[targetIndex]) return state;

      const temp = sourceSlots[sourceIndex];
      sourceSlots[sourceIndex] = targetSlots[targetIndex];
      targetSlots[targetIndex] = temp;

      newSchedule[sourceDay] = sourceSlots;
      newSchedule[targetDay] = targetSlots;

      return { schedule: newSchedule };
    }),
}));

export default useTimetableStore;