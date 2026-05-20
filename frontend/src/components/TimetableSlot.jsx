import { motion } from "framer-motion";
import { User, MapPin, Clock, Layers } from "lucide-react";

// Tailwind configuration configurations map safely
const colorMap = {
  blue: { bg: "bg-blue-500/10", border: "hover:border-blue-500/40", badge: "bg-blue-500" },
  emerald: { bg: "bg-emerald-500/10", border: "hover:border-emerald-500/40", badge: "bg-emerald-500" },
  purple: { bg: "bg-purple-500/10", border: "hover:border-purple-500/40", badge: "bg-purple-500" },
  amber: { bg: "bg-amber-500/10", border: "hover:border-amber-500/40", badge: "bg-amber-500" }
};

const TimetableSlot = ({ slot }) => {
  const styles = colorMap[slot.color] || colorMap.blue;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`group rounded-2xl border border-white/5 bg-surface/50 p-4 cursor-pointer transition-all duration-300 ${styles.border} hover:shadow-lg hover:shadow-black/20`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`inline-flex items-center gap-1 rounded-md ${styles.bg} px-2 py-0.5 text-xs font-medium text-white/90 mb-2`}>
            <Layers className="h-3 w-3" /> {slot.grade}
          </span>
          <h3 className="text-white font-semibold text-base tracking-wide group-hover:text-blue-400 transition-colors">
            {slot.subject}
          </h3>
        </div>
        <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${slot.hasConflict ? 'bg-red-500 animate-pulse' : styles.badge}`} />
      </div>

      <div className="mt-4 space-y-2 border-t border-white/5 pt-3 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-slate-500" />
          <span>{slot.teacher}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-500" />
          <span>{slot.classroom}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 rounded-xl bg-black/20 px-3 py-1.5 text-xs font-medium text-slate-400 w-fit">
        <Clock className="h-3.5 w-3.5 text-blue-400" />
        <span>{slot.startTime} - {slot.endTime}</span>
      </div>
    </motion.div>
  );
};

export default TimetableSlot;