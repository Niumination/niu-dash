/* NIU⚡DASH — Service Worker v1.2 */
const RELEASED_JSON_URL = 'https://raw.githubusercontent.com/Niumination/niu-dash/main/data/released.json';
const CACHE = 'niu-dash-v1';
const ASSETS = [
  '.',
  'index.html',
  '/',
  'manifest.json',
  'icon.svg',
  RELEASED_JSON_URL
];

// Install — cache all static assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
    .then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache-first for static, network-first for API, stale-while-revalidate for others
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  
  // released.json — cache-first (always serve cached, update in background)
  if (url.href.startsWith(RELEASED_JSON_URL)) {
    e.respondWith(cacheFirst(e.request));
    return;
  }
  
  // GitHub API — network-first (always want fresh data)
  if (url.hostname === 'api.github.com') {
    e.respondWith(networkFirst(e.request));
    return;
  }
  
  // Static assets — cache-first
  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(e.request));
    return;
  }
  
  // Everything else — network with fallback
  e.respondWith(networkFirst(e.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok && request.method === 'GET') {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('Offline', { status: 503 });
  }
}
