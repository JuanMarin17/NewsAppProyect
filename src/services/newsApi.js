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
    throw new Error('Sin conexión a internet. Conéctate para ver nuevas noticias.')
  }

  const json = await res.json()

  if (json?.offline) return json

  if (!res.ok) {
    throw new Error(json.message || `HTTP ${res.status}`)
  }

  return json
}

export const fetchTopNews = (lang = 'es') =>
  request('/news/top', { locale: 'es', categories: 'science', language: lang })

export const fetchAllNews = (lang = 'es', extraParams = {}) =>
  request('/news/all', { locale: 'es', categories: 'science', language: lang, ...extraParams })

export const fetchSimilarNews = (search, lang = 'es') =>
  request('/news/similar', { locale: 'es', categories: 'science', language: lang, search })

export const fetchSources = (lang = 'es') =>
  request('/news/sources', { locale: 'es', categories: 'science', language: lang })

export const fetchByDateRange = (published_after, published_before, lang = 'es') =>
  request('/news/all', {
    locale: 'es',
    categories: 'science',
    language: lang,
    published_after,
    published_before,
  })

export const fetchLatest24h = (lang = 'es') => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const dateStr = yesterday.toISOString().split('T')[0]
  return request('/news/all', {
    locale: 'es',
    categories: 'science',
    language: lang,
    published_after: dateStr,
    limit: 12,
  })
}
