import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { CalendarRange, User, MapPin, Clock, Layers } from 'lucide-react'

// Core Global State & Modal Imports
import useTimetableStore from '../../store/timetableStore'
import EditSlotModal from './EditSlotModal'

const columns = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const colorMap = {
  blue: { bg: "bg-blue-500/10", border: "hover:border-blue-500/40", badge: "bg-blue-500" },
  emerald: { bg: "bg-emerald-500/10", border: "hover:border-emerald-500/40", badge: "bg-emerald-500" },
  purple: { bg: "bg-purple-500/10", border: "hover:border-purple-500/40", badge: "bg-purple-500" },
  amber: { bg: "bg-amber-500/10", border: "hover:border-amber-500/40", badge: "bg-amber-500" }
}

// Sub-Component: Enterprise Draggable & Clickable Card
function DraggableTimetableSlot({ slot, day, index }) {
  // Pulling active tracking modifier from global store
  const setActiveEditSlot = useTimetableStore((state) => state.setActiveEditSlot)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `${day}-${index}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const styles = colorMap[slot.color] || colorMap.blue

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // Trigger live edit modal on double click trigger sequence
      onDoubleClick={() => setActiveEditSlot({ day, index, slot })}
      whileHover={{ scale: 1.01 }}
      className={`group relative rounded-2xl border p-4 cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging 
          ? 'opacity-30 scale-105 z-50 border-blue-500 bg-blue-500/5 shadow-2xl' 
          : slot.hasConflict
            ? 'border-red-500 bg-red-500/10'
            : 'border-white/5 bg-[#0e1322]'
      } hover:border-blue-500/30 hover:shadow-xl`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`inline-flex items-center gap-1 rounded-md ${styles.bg} px-2 py-0.5 text-[11px] font-medium text-white/90 mb-2`}>
            <Layers className="h-3 w-3" /> {slot.grade}
          </span>
          <h3 className="text-white font-semibold text-sm tracking-wide group-hover:text-blue-400 transition-colors">
            {slot.subject}
          </h3>
        </div>
        <div className={`h-2 w-2 shrink-0 rounded-full mt-1.5 ${slot.hasConflict ? 'bg-red-500 animate-pulse' : styles.badge}`} />
      </div>

      <div className="mt-3 space-y-1.5 border-t border-white/5 pt-2.5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-slate-500" />
          <span>{slot.teacher}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-slate-500" />
          <span>{slot.classroom}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-black/20 px-2.5 py-1 text-[11px] font-medium text-slate-400 w-fit">
        <Clock className="h-3.5 w-3.5 text-blue-400" />
        <span>{slot.startTime} - {slot.endTime}</span>
      </div>

      {/* Micro copy helper utility */}
      <div className="absolute bottom-2 right-3 text-[9px] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Double-click to edit
      </div>
    </motion.div>
  )
}

// Main Refactored Grid Board
export default function TimetableGrid() {
  // Bind global state engine variables securely replacing useState hooks layout
  const schedule = useTimetableStore((state) => state.schedule)
  const setSchedule = useTimetableStore((state) => state.setSchedule)
  const swapSlots = useTimetableStore((state) => state.swapSlots)
  
  const sensors = useSensors(
    useSensor(PointerSensor, { 
      activationConstraint