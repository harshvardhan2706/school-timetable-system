function parseTimeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function rangesOverlap(slotA, slotB) {
  const startA = parseTimeToMinutes(slotA.startTime)
  const endA = parseTimeToMinutes(slotA.endTime)
  const startB = parseTimeToMinutes(slotB.startTime)
  const endB = parseTimeToMinutes(slotB.endTime)

  return startA < endB && startB < endA
}

function buildConflictRecords(day, slots, keyFn, conflictType, messageFn) {
  const records = []
  const groups = new Map()

  slots.forEach((slot, index) => {
    const key = keyFn(slot)
    if (!key) return
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push({ slot, index })
  })

  groups.forEach((entries) => {
    if (entries.length < 2) return

    for (let i = 0; i < entries.length; i += 1) {
      for (let j = i + 1; j < entries.length; j += 1) {
        const current = entries[i]
        const next = entries[j]

        if (!rangesOverlap(current.slot, next.slot)) continue

        const message = messageFn(current.slot, day)
        records.push({ slotIndex: current.index, conflictType, message })
        records.push({ slotIndex: next.index, conflictType, message })
      }
    }
  })

  return records
}

export function detectTeacherConflicts(day, slots) {
  return buildConflictRecords(
    day,
    slots,
    (slot) => slot.teacher,
    'teacher',
    (slot, currentDay) => `Teacher ${slot.teacher} already assigned on ${currentDay} from ${slot.startTime} to ${slot.endTime}`,
  )
}

export function detectClassroomConflicts(day, slots) {
  return buildConflictRecords(
    day,
    slots,
    (slot) => slot.classroom,
    'classroom',
    (slot, currentDay) => `Room ${slot.classroom} is already booked on ${currentDay} from ${slot.startTime} to ${slot.endTime}`,
  )
}

export function detectGradeConflicts(day, slots) {
  return buildConflictRecords(
    day,
    slots,
    (slot) => slot.grade,
    'grade',
    (slot, currentDay) => `Grade ${slot.grade} already has another session on ${currentDay} at ${slot.startTime}`,
  )
}

function applyConflictRecord(slot, record) {
  if (!slot.conflictMessages.includes(record.message)) {
    slot.conflictMessages.push(record.message)
  }

  slot.hasConflict = true

  if (!slot.conflictType) {
    slot.conflictType = record.conflictType
  } else if (slot.conflictType !== record.conflictType && slot.conflictType !== 'multiple') {
    slot.conflictType = 'multiple'
  }
}

export function validateSchedule(schedule) {
  if (!schedule || typeof schedule !== 'object') return schedule

  const normalizedSchedule = Object.fromEntries(
    Object.entries(schedule).map(([day, slots]) => [
      day,
      slots.map((slot) => ({
        ...slot,
        hasConflict: false,
        conflictType: null,
        conflictMessages: [],
      })),
    ]),
  )

  Object.entries(normalizedSchedule).forEach(([day, slots]) => {
    const conflictRecords = [
      ...detectTeacherConflicts(day, slots),
      ...detectClassroomConflicts(day, slots),
      ...detectGradeConflicts(day, slots),
    ]

    conflictRecords.forEach((record) => {
      const slot = slots[record.slotIndex]
      if (!slot) return
      applyConflictRecord(slot, record)
    })
  })

  return normalizedSchedule
}

export default validateSchedule
