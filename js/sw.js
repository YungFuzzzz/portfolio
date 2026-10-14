const CACHE_NAME = "portfolio-assets-v2";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll([
            "../",
            "../css/style.css",
            "../js/main.js",
            "../js/media.js",
            "../js/register-sw.js",
            "../assets/logo.svg",
            "../assets/wordmark.svg"
        ]))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key !== CACHE_NAME)
                .map((key) => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const request = event.request;

    if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        request.mode === "navigate"
            ? fetch(request)
                .then((response) => {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
                    return response;
                })
                .catch(() => caches.match(request))
            : caches.match(request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request).then((response) => {
                    if (!response.ok) {
                        return response;
                    }

                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
                    return response;
                });
            })
    );
});
