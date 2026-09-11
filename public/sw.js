// Safah Workspace PWA Service Worker
const CACHE_NAME = 'safah-workspace-v1';
const STATIC_ASSETS = [
    '/',
    '/favicon.svg',
    '/chisa.png',
    '/chisa.webp',
    '/icon-192.png',
    '/icon-512.png',
    '/icon-maskable.png',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch(() => {});
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // Stale-while-revalidate for static assets, network-first for pages
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // Static assets
    if (
        url.pathname.startsWith('/sounds/') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.webp') ||
        url.pathname.endsWith('.svg') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.js')
    ) {
        event.respondWith(
            caches.match(event.request).then((cached) => {
                if (cached) return cached;
                return fetch(event.request).then((response) => {
                    if (response && response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return response;
                }).catch(() => cached);
            })
        );
        return;
    }

    // Default network-first
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
