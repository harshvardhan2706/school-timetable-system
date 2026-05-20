import { useCallback, useEffect, useState } from 'react'
import { getSubjects } from '../services/subjectService'

export default function useSubjects() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSubjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getSubjects()
      setSubjects(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubjects()
  }, [fetchSubjects])

  return { subjects, loading, error, refetch: fetchSubjects }
}
