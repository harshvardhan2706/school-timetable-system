import api from './api'

export async function getTimetable() {
  try {
    const response = await api.get('/timetable')
    return response.data
  } catch (error) {
    console.error('Failed to fetch timetable:', error.message)
    throw error
  }
}

export async function saveTimetable(payload) {
  try {
    const response = await api.post('/timetable', payload)
    return response.data
  } catch (error) {
    console.error('Failed to save timetable:', error.message)
    throw error
  }
}

export async function updateTimetable(payload) {
  try {
    const response = await api.put('/timetable', payload)
    return response.data
  } catch (error) {
    console.error('Failed to update timetable:', error.message)
    throw error
  }
}

export async function syncTimetable(schedule) {
  try {
    const response = await api.post('/timetable/sync', {
      schedule,
      timestamp: new Date().toISOString(),
    })
    return response.data
  } catch (error) {
    console.error('Failed to sync timetable:', error.message)
    throw error
  }
}
