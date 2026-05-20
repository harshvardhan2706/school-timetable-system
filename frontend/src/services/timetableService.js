import api from './api'

export async function getTimetable() {
  const response = await api.get('/timetable')
  return response.data
}

export async function saveTimetable(payload) {
  const response = await api.post('/timetable', payload)
  return response.data
}
