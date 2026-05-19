import { createContext, useCallback, useEffect, useState } from 'react'
import api from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => window.localStorage.getItem('school-timetable-token'))
  const [user, setUser] = useState(() => {
    const stored = window.localStorage.getItem('school-timetable-user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('school-timetable-token', token)
    }
  }, [token])

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('school-timetable-user', JSON.stringify(user))
    }
  }, [user])

  const login = useCallback(async (credentials) => {
    setLoading(true)
    try {
      const response = await api.post('/auth/login', credentials)
      setToken(response.data.token)
      setUser({ email: credentials.email })
      return true
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (payload) => {
    setLoading(true)
    try {
      await api.post('/auth/register', payload)
      return login({ email: payload.email, password: payload.password })
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [login])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    window.localStorage.removeItem('school-timetable-token')
    window.localStorage.removeItem('school-timetable-user')
    window.location.href = '/login'
  }, [])

  const value = {
    token,
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: Boolean(token),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
