var cacheName = 'web-dev-overview';
var filesToCache = [
    '/',
    '/index.html',
    '/js/app.00792e39.js',
    '/js/app.00792e39.js.map',
    '/js/chunk-vendors.130053b1.js',
    '/js/chunk-vendors.130053b1.js.map',
    '/css/app.43a0a869.css',
    '/css/chunk-vendors.e21bea4e.css',
    '/favicon.ico',
    '/service_worker.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });

  self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
        /*return response ;
        return fetch(e.request) */ ;
      })
    );
  });