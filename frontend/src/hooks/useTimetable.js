import { useCallback, useEffect, useState } from 'react'
import { getTimetable, saveTimetable } from '../services/timetableService'

export default function useTimetable() {
  const [timetable, setTimetable] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const fetchTimetable = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTimetable()
      setTimetable(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const persistTimetable = useCallback(
    async (payload) => {
      setSaving(true)
      setError(null)
      try {
        const data = await saveTimetable(payload)
        setTimetable(data)
        return data
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setSaving(false)
      }
    },
    [],
  )

  useEffect(() => {
    fetchTimetable()
  }, [fetchTimetable])

  return { timetable, loading, error, saving, refetch: fetchTimetable, saveTimetable: persistTimetable }
}
