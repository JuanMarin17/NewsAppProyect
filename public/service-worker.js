const CACHE_NAME = 'science-news-v2'
const API_CACHE_NAME = 'science-news-api-v2'

// ── Install ────────────────────────────────────────────────────────────────
self.addEventListener('install', () => {
  self.skipWaiting()
})

// ── Activate: limpiar caches viejos ───────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== API_CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  )
  self.clients.claim()
})

// ── Fetch ──────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Solo interceptar GET
  if (request.method !== 'GET') return

  // Llamadas a la API → Network first, fallback a cache
  if (url.hostname === 'api.thenewsapi.com') {
    event.respondWith(networkFirstAPI(request))
    return
  }

  // Assets estáticos del build (/assets/*, /icons/*, etc.) → Cache first
  if (url.origin === self.location.origin && url.pathname !== '/') {
    event.respondWith(cacheFirstStatic(request))
    return
  }

  // Navegación (/) → Network first, fallback al shell cacheado
  event.respondWith(
    fetch(request)
      .then((res) => {
        const cache = caches.open(CACHE_NAME)
        cache.then((c) => c.put(request, res.clone()))
        return res
      })
      .catch(() => caches.match('/index.html'))
  )
})

// Network first para API: guarda en cache, si falla devuelve cache o error offline
async function networkFirstAPI(request) {
  const cache = await caches.open(API_CACHE_NAME)
  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await cache.match(request)
    if (cached) return cached
    return new Response(
      JSON.stringify({ offline: true, message: 'Sin conexión a internet' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Cache first para assets estáticos: si no está en cache, va a red y cachea
async function cacheFirstStatic(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    // Si es una navegación fallida, devolver el shell
    if (request.destination === 'document') {
      return caches.match('/index.html')
    }
    return new Response('Offline', { status: 503 })
  }
}
