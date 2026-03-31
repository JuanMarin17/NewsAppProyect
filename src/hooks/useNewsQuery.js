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

    const lang = params.language || 'es'

    try {
      let result

      switch (endpointId) {
        case 'top':
          result = await fetchTopNews(lang)
          break
        case 'all':
          result = await fetchAllNews(lang)
          break
        case 'search':
          result = await fetchAllNews(lang, { search: params.query })
          break
        case 'similar':
          result = await fetchSimilarNews(params.query, lang)
          break
        case 'sources':
          result = await fetchSources(lang)
          break
        case 'date':
          result = await fetchByDateRange(params.dateAfter, params.dateBefore, lang)
          break
        case 'latest':
          result = await fetchLatest24h(lang)
          break
        default:
          throw new Error('Endpoint desconocido')
      }

      if (result?.offline) {
        throw new Error('Sin conexión a internet. Conéctate para ver nuevas noticias.')
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
