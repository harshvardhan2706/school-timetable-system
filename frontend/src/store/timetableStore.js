import { create } from "zustand";

const initialSchedule = {
  Monday: [
    {
      id: "m1",
      subject: "Mathematics",
      teacher: "Akbar Khan",
      classroom: "Room 204",
      grade: "9A",
      startTime: "09:00",
      endTime: "09:45",
      color: "blue",
      hasConflict: false,
    },
    {
      id: "m2",
      subject: "Science",
      teacher: "Rahul Sharma",
      classroom: "Lab 2",
      grade: "10B",
      startTime: "10:00",
      endTime: "10:45",
      color: "emerald",
      hasConflict: false,
    },
  ],

  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
};

const useTimetableStore = create((set) => ({
  schedule: initialSchedule,

  setSchedule: (data) =>
    set({
      schedule: data,
    }),

  updateSlot: (day, index, updatedSlot) =>
    set((state) => {

      const updatedDay = [...state.schedule[day]];

      updatedDay[index] = updatedSlot;

      return {
        schedule: {
          ...state.schedule,
          [day]: updatedDay,
        },
      };
    }),
}));

export default useTimetableStore;