// WB Study AI Service Worker
// Version: 1.0.0
const CACHE_NAME = "wb-study-ai-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/metadata.json",
];

// Install Event: Pre-cache app shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS).catch((err) => {
          console.warn("[SW] Pre-cache non-fatal error:", err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up outdated caches and take control
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log("[SW] Removing old cache:", cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event: Cache strategies
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET requests for standard caching
  if (request.method !== "GET") {
    // For POST requests to API endpoints, provide an offline fallback JSON response if offline
    if (url.pathname.startsWith("/api/")) {
      event.respondWith(
        fetch(request).catch(() => {
          return new Response(
            JSON.stringify({
              success: false,
              offline: true,
              error:
                "You are currently offline. Please reconnect to internet for AI generation. In the meantime, you can view your saved notes and access offline curriculum materials.",
            }),
            {
              headers: { "Content-Type": "application/json" },
              status: 503,
              statusText: "Service Unavailable (Offline)",
            }
          );
        })
      );
    }
    return;
  }

  // 1. Navigation requests (HTML pages) -> Network First with cache fallback to /index.html
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const fallbackIndex = await caches.match("/index.html");
          if (fallbackIndex) return fallbackIndex;
          const rootFallback = await caches.match("/");
          return rootFallback || new Response("Offline - WB Study AI", { status: 200, headers: { "Content-Type": "text/html" } });
        })
    );
    return;
  }

  // 2. Static Assets (Scripts, Styles, Fonts, Images) -> Stale While Revalidate
  if (
    url.origin === location.origin ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".json") ||
    url.pathname.includes("/assets/") ||
    url.pathname.includes("/@")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch((err) => {
            // Network failed, we'll rely on cached response
            if (!cachedResponse) {
              console.warn("[SW] Fetch failed with no cache for:", request.url);
            }
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. Fallback: Network with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
