// Niu-Dash Service Worker — v1.0
// Cache-first for static assets, network-first for API, offline fallback
const CACHE = 'niu-dash-v1';
const ASSETS = [
  '.',
  'index.html',
  'manifest.json',
  'icon-192.svg',
  'icon-512.svg'
];

// Install: cache app shell
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for assets, network-first for API, network-only for GitHub API
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // GitHub API — network-only (always fresh)
  if (url.hostname === 'api.github.com') {
    e.respondWith(
      fetch(e.request).catch(() => {
        // If offline, try cache or return empty
        return new Response(JSON.stringify([]), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Same-origin assets — cache-first
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchAndCache = fetch(e.request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(cache => cache.put(e.request, clone));
          }
          return res;
        });
        return cached || fetchAndCache;
      })
    );
    return;
  }

  // External (fonts, etc.) — network-first with cache fallback
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
