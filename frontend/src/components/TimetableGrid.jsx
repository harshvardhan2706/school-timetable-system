import { useState } from 'react'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { CalendarRange } from 'lucide-react'

const columns = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const initialSchedule = {
  Monday: ['Math-9A', 'Science-10B', 'History-8A', 'Language-9C'],
  Tuesday: ['Science-9B', 'Math-10A', 'Art-7A', 'PE-8B'],
  Wednesday: ['History-10B', 'Language-8B', 'Math-7C', 'Biology-9A'],
  Thursday: ['Chemistry-11A', 'Geography-9B', 'Music-6A', 'Science-8C'],
  Friday: ['PE-10A', 'Math-8C', 'Science-9A', 'Art-9B'],
}

function DraggableSlot({ id, value }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      className={`cursor-grab rounded-xl border border-white/[0.04] bg-slate-900/60 px-4 py-3.5 text-sm font-semibold text-slate-200 shadow-sm transition-all ${isDragging ? 'opacity-40 border-blue-500/40 bg-blue-500/10' : 'hover:border-white/10 hover:bg-slate-900'}`}
    >
      <div className="flex items-center justify-between">
        <span>{value}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-60" />
      </div>
    </motion.div>
  )
}

export default function TimetableGrid() {
  const [activeId, setActiveId] = useState(null)
  const [schedule, setSchedule] = useState(initialSchedule)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDragStart = (event) => setActiveId(event.active.id)

  const handleDragEnd = (event) => {
    setActiveId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    const sourceColumn = Object.keys(schedule).find((day) => schedule[day].includes(active.id))
    const targetColumn = Object.keys(schedule).find((day) => day === over.id || schedule[day].includes(over.id))
    
    if (!sourceColumn || !targetColumn) return

    setSchedule((prev) => {
      const sourceList = [...prev[sourceColumn]]
      const targetList = [...prev[targetColumn]]
      
      const activeIndex = sourceList.indexOf(active.id)
      sourceList.splice(activeIndex, 1)

      if (sourceColumn === targetColumn) {
        const overIndex = prev[sourceColumn].indexOf(over.id)
        return { ...prev, [sourceColumn]: arrayMove(prev[sourceColumn], activeIndex, overIndex) }
      } else {
        const overIndex = targetList.indexOf(over.id)
        if (overIndex === -1) targetList.push(active.id)
        else targetList.splice(overIndex, 0, active.id)
        return { ...prev, [sourceColumn]: sourceList, [targetColumn]: targetList }
      }
    })
  }

  return (
    <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f19]/40 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/10 p-2.5 text-violet-400 border border-violet-500/20 hidden sm:block">
            <CalendarRange className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Timetable</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Weekly grid planner</h2>
          </div>
        </div>
        <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 shadow-lg shadow-blue-600/10 active:scale-98">
          Save schedule
        </button>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((day) => (
            <div key={day} className="rounded-2xl border border-white/[0.04] bg-slate-950/40 p-4 flex flex-col min-h-[350px]">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 border-b border-white/[0.03] pb-2">{day}</h3>
              <SortableContext items={schedule[day]} strategy={verticalListSortingStrategy}>
                <div className="space-y-2.5 flex-1">
                  {schedule[day].map((lesson) => (
                    <DraggableSlot key={lesson} id={lesson} value={lesson} />
                  ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  )
}