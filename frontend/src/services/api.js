import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8086/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('school-timetable-token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API response error:', error.response?.status || error.message)
    if (error.response?.status === 401) {
      window.localStorage.removeItem('school-timetable-token')
      window.localStorage.removeItem('school-timetable-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
