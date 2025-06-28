const CACHE_NAME = 'simples-mortales-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/src/resources/imgs/gabo.jpg',
  '/src/resources/imgs/agus.jpg',
  '/src/resources/imgs/ivan.jpg',
  '/src/resources/imgs/facu.jpg',
  '/src/resources/imgs/marto.jpg',
  '/src/resources/imgs/gallery/1.jpeg',
  '/src/resources/imgs/gallery/3.jpeg',
  '/src/resources/imgs/gallery/4.jpeg',
  '/src/resources/imgs/gallery/5.jpeg',
  '/src/resources/imgs/gallery/6.jpeg',
  '/src/resources/imgs/gallery/7.jpeg',
  '/3dObjects/PuaSM3D.glb'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 