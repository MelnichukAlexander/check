const CACHE_NAME = 'visiting-card-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles.css',
  '/app.js',
  '/images/photo.jpg',
  '/images/phone-qr.png',
  '/images/telegram-qr.png',
  '/images/vk-qr.png',
  '/images/icon-192.png'
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