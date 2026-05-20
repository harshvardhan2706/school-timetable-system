import { useCallback, useEffect, useState } from 'react'
import { getClasses } from '../services/classService'

export default function useClasses() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchClasses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getClasses()
      setClasses(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])

  return { classes, loading, error, refetch: fetchClasses }
}
