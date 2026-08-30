// Dwaekki Gym — service worker.
// Strategy: network-first for the app's own files (so you always get the
// newest version when you're online), falling back to the cache only when
// offline. Bump CACHE_NAME on every release so old caches get cleared out
// automatically — this is what makes "Update now" actually work.

const CACHE_NAME = "dwaekki-gym-v1.6.0";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./data.js",
  "./app.js",
  "./manifest.json",
  "./bg-bunny.jpg",
  "./gym-bg.jpg",
  "./logo.jpg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-180.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
  // Intentionally NOT calling self.skipWaiting() here — a new version waits
  // until the person taps "Update now" in the app, so updates never happen
  // silently out from under them mid-workout.
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// The in-app "Update now" button sends this message to make the waiting
// worker take over immediately.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle Dwaekki Gym's own files. Never intercept cross-origin
  // requests (Google Translate, Puter.js, etc.) — let the browser handle
  // those normally.
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
