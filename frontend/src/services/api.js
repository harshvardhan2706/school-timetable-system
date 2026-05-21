import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
})

api.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('school-timetable-token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = window.localStorage.getItem('school-refresh-token')
      if (refreshToken) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'}/auth/refresh`, {
            refreshToken,
          })
          window.localStorage.setItem('school-timetable-token', response.data.accessToken)
          window.localStorage.setItem('school-refresh-token', response.data.refreshToken)
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
          }
          return axios(originalRequest)
        } catch (refreshError) {
          console.error('Token refresh failed', refreshError)
        }
      }
      window.localStorage.removeItem('school-timetable-token')
      window.localStorage.removeItem('school-refresh-token')
      window.localStorage.removeItem('school-timetable-user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
