const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const TARGET_DAILY_SLOTS = 6

function parseTimeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function sortByStartTime(slots) {
  return [...slots].sort((a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime))
}

function getStatusForCount(periodCount) {
  if (periodCount >= 6) return 'overloaded'
  if (periodCount >= 4) return 'moderate'
  if (periodCount > 0) return 'available'
  return 'free'
}

function getStatusWeight(status) {
  return status === 'overloaded' ? 3 : status === 'moderate' ? 2 : status === 'available' ? 1 : 0
}

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || '')
    .join('')
}

function buildOrderedDays(schedule) {
  return WEEKDAYS.filter((day) => Object.prototype.hasOwnProperty.call(schedule, day))
}

export function calculateTeacherAvailability(schedule) {
  const orderedDays = buildOrderedDays(schedule)
  const teacherMap = {}

  orderedDays.forEach((day) => {
    const daySlots = schedule[day] || []
    daySlots.forEach((slot) => {
      const teacher = slot.teacher || 'Unknown'
      if (!teacherMap[teacher]) {
        teacherMap[teacher] = {
          name: teacher,
          slots: [],
          dailyCounts: {},
          dailyStatus: {},
          subjectCounts: {},
        }
      }
      teacherMap[teacher].slots.push({ ...slot, day })
      teacherMap[teacher].dailyCounts[day] = (teacherMap[teacher].dailyCounts[day] || 0) + 1
      teacherMap[teacher].subjectCounts[slot.subject] = (teacherMap[teacher].subjectCounts[slot.subject] || 0) + 1
    })
  })

  const teacherStats = Object.values(teacherMap).map((teacher) => {
    const dailyPeriods = {}
    const dailyLoads = {}
    const dailyConsecutives = {}
    const dayStatuses = {}
    let weeklyPeriods = 0
    let longestConsecutive = 0

    orderedDays.forEach((day) => {
      const slots = teacher.slots.filter((slot) => slot.day === day)
      const sortedSlots = sortByStartTime(slots)
      const dayCount = sortedSlots.length
      weeklyPeriods += dayCount
      dailyPeriods[day] = dayCount
      dayStatuses[day] = getStatusForCount(dayCount)

      let currentStreak = 0
      let streakMax = 0
      let lastEnd = null

      sortedSlots.forEach((slot) => {
        const start = parseTimeToMinutes(slot.startTime)
        const end = parseTimeToMinutes(slot.endTime)

        if (lastEnd !== null && start <= lastEnd + 15) {
          currentStreak += 1
        } else {
          currentStreak = 1
        }

        streakMax = Math.max(streakMax, currentStreak)
        lastEnd = end
      })

      dailyConsecutives[day] = streakMax
      dailyLoads[day] = {
        count: dayCount,
        consecutive: streakMax,
        status: dayStatuses[day],
      }
      longestConsecutive = Math.max(longestConsecutive, streakMax)
    })

    const totalPossibleWeekly = orderedDays.length * TARGET_DAILY_SLOTS
    const freeSlots = Math.max(0, totalPossibleWeekly - weeklyPeriods)
    const overloadPenalty = Math.max(0, weeklyPeriods - orderedDays.length * 3) * 6
    const consecutivePenalty = longestConsecutive * 7
    const availabilityScore = Math.max(0, freeSlots * 10 - consecutivePenalty - overloadPenalty)
    const topSubject = Object.entries(teacher.subjectCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'General'
    const dailyMax = Math.max(...Object.values(dailyPeriods), 0)
    const status = getStatusForCount(dailyMax)
    const freeDays = orderedDays.filter((day) => dailyPeriods[day] === 0).length
    const nextFreeDay = orderedDays.find((day) => dailyPeriods[day] < 4)

    const warnings = []
    if (dailyMax >= 6) warnings.push('Excessive daily load')
    if (longestConsecutive >= 4) warnings.push('Consecutive overload')
    if (weeklyPeriods >= orderedDays.length * 4) warnings.push('High weekly pressure')
    if (freeDays === 0 && weeklyPeriods > orderedDays.length) warnings.push('No free gaps')

    return {
      name: teacher.name,
      initials: getInitials(teacher.name),
      subjectSpecialization: topSubject,
      weeklyPeriods,
      freeSlots,
      longestConsecutive,
      consecutivePenalty,
      overloadPenalty,
      availabilityScore,
      status,
      freeDays,
      nextFreeSlot: nextFreeDay ? `${nextFreeDay} (${dailyPeriods[nextFreeDay] || 0} classes)` : 'Fully booked',
      dailyPeriods,
      dailyLoads,
      dayStatuses,
      warnings,
      miniSchedule: orderedDays.map((day) => ({
        day,
        count: dailyPeriods[day] || 0,
        status: dayStatuses[day] || 'free',
        label: dailyPeriods[day] ? `${dailyPeriods[day]} period${dailyPeriods[day] === 1 ? '' : 's'}` : 'Free day',
      })),
    }
  })

  const teacherAvailabilityMap = teacherStats.reduce((result, teacher) => {
    result[teacher.name] = teacher
    return result
  }, {})

  const teacherLoadMap = teacherStats.reduce((result, teacher) => {
    result[teacher.name] = {
      weeklyPeriods: teacher.weeklyPeriods,
      dailyPeriods: teacher.dailyPeriods,
      status: teacher.status,
      availabilityScore: teacher.availabilityScore,
    }
    return result
  }, {})

  const sortedStats = teacherStats.sort((a, b) => {
    const diff = getStatusWeight(b.status) - getStatusWeight(a.status)
    return diff !== 0 ? diff : b.availabilityScore - a.availabilityScore
  })

  return {
    teacherAvailabilityMap,
    teacherLoadMap,
    teacherStats: sortedStats,
  }
}

export const teacherAvailabilitySelectors = {
  selectTeacherStats: (state) => state.teacherStats,
  selectTeacherAvailabilityMap: (state) => state.teacherAvailabilityMap,
  selectTeacherLoadMap: (state) => state.teacherLoadMap,
}
