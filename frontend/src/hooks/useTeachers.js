import { useCallback, useEffect, useState } from 'react'
import { getTeachers } from '../services/teacherService'

export default function useTeachers() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTeachers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTeachers()
      setTeachers(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTeachers()
  }, [fetchTeachers])

  return { teachers, loading, error, refetch: fetchTeachers }
}
