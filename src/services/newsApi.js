const BASE_URL = 'https://api.thenewsapi.com/v1'
export const API_TOKEN = 'AMtRPDM8SjvuL5uzgqcXBYf6kZEd06SwEi3vB9pD'

const request = async (path, params = {}) => {
  const query = new URLSearchParams({
    api_token: API_TOKEN,
    ...Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== undefined)),
  }).toString()

  let res
  try {
    res = await fetch(`${BASE_URL}${path}?${query}`)
  } catch {
    throw new Error('Sin conexión a internet. Conectate para ver nuevas noticias.')
  }

  const json = await res.json()

  // El SW devuelve { offline: true } cuando no hay red ni cache
  if (json?.offline) return json

  if (!res.ok) {
    throw new Error(json.message || `HTTP ${res.status}`)
  }

  return json
}

export const fetchTopNews = () =>
  request('/news/top', { locale: 'es', categories: 'science', language: 'es' })

export const fetchAllNews = (extraParams = {}) =>
  request('/news/all', { locale: 'es', categories: 'science', language: 'es', ...extraParams })

export const fetchSimilarNews = (search) =>
  request('/news/similar', { locale: 'es', categories: 'science', language: 'es', search })

export const fetchSources = () =>
  request('/news/sources', { locale: 'es', categories: 'science', language: 'es' })

export const fetchByDateRange = (published_after, published_before) =>
  request('/news/all', {
    locale: 'es',
    categories: 'science',
    language: 'es',
    published_after,
    published_before,
  })

export const fetchLatest24h = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const dateStr = yesterday.toISOString().split('T')[0]
  return request('/news/all', {
    locale: 'es',
    categories: 'science',
    language: 'es',
    published_after: dateStr,
    limit: 12,
  })
}
