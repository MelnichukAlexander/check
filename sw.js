const CACHE_NAME = 'visiting-card-cache-v1';
const urlsToCache = [
  '/',
  '/check/index.html',
  '/check/offline.html',
  '/check/styles.css',
  '/check/app.js',
  '/check/images/photo.jpg',
  '/check/images/phone-qr.png',
  '/check/images/telegram-qr.png',
  '/check/images/vk-qr.png',
  '/check/images/icon-192.png'
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
      .catch(() => caches.match("/offline.html"))
  );
});