import api from './api'

export async function getSubjects() {
  const response = await api.get('/subjects')
  return response.data
}
