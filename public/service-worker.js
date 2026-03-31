const CACHE_NAME = 'science-news-v1'
const API_CACHE_NAME = 'science-news-api-v1'

// Assets del shell de la app
const SHELL_ASSETS = ['/', '/index.html']

// ── Install: cachear el shell ──────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS))
  )
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

  // Llamadas a la API de noticias → Network first, fallback a cache
  if (url.hostname === 'api.thenewsapi.com') {
    event.respondWith(networkFirstWithCache(request))
    return
  }

  // Assets de la app → Cache first, fallback a network
  if (request.destination !== 'document' || url.origin === self.location.origin) {
    event.respondWith(cacheFirstWithNetwork(request))
    return
  }

  // Navegación → Network first, fallback a shell cacheado
  event.respondWith(
    fetch(request).catch(() => caches.match('/index.html'))
  )
})

// Network first: intenta red, guarda en cache, si falla devuelve cache
async function networkFirstWithCache(request) {
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
    // Sin conexión y sin cache: respuesta de error estructurada
    return new Response(
      JSON.stringify({ offline: true, message: 'No internet connection' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Cache first: devuelve cache si existe, si no va a red y cachea
async function cacheFirstWithNetwork(request) {
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
    return new Response('Offline', { status: 503 })
  }
}
