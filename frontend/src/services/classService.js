import api from './api'

export async function getClasses() {
  const response = await api.get('/classes')
  return response.data
}

export async function getClassById(id) {
  const response = await api.get(`/classes/${id}`)
  return response.data
}

export async function createClass(payload) {
  const response = await api.post('/classes', payload)
  return response.data
}
