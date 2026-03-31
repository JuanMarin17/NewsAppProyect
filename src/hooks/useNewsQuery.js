import { useState, useCallback } from 'react'
import {
  fetchTopNews,
  fetchAllNews,
  fetchSimilarNews,
  fetchSources,
  fetchByDateRange,
  fetchLatest24h,
} from '../services/newsApi'

export function useNewsQuery() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (endpointId, params = {}) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      let result

      switch (endpointId) {
        case 'top':
          result = await fetchTopNews()
          break
        case 'all':
          result = await fetchAllNews()
          break
        case 'search':
          result = await fetchAllNews({ search: params.query })
          break
        case 'similar':
          result = await fetchSimilarNews(params.query)
          break
        case 'sources':
          result = await fetchSources()
          break
        case 'date':
          result = await fetchByDateRange(params.dateAfter, params.dateBefore)
          break
        case 'latest':
          result = await fetchLatest24h()
          break
        default:
          throw new Error('Unknown endpoint')
      }

      // El SW devuelve { offline: true } cuando no hay conexión ni cache
      if (result?.offline) {
        throw new Error('Sin conexión a internet. Conectate para ver nuevas noticias.')
      }
      setData(result)
    } catch (err) {
      setError(err.message || 'Error de conexión. Verifica tu token de API.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, execute }
}
