import api from './api'

export async function getTeachers() {
  const response = await api.get('/teachers')
  return response.data
}

export async function createTeacher(payload) {
  const response = await api.post('/teachers', payload)
  return response.data
}
