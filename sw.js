// Pull in APP_VERSION from data.js so there's one single source of truth for the version number.
importScripts("./data.js");

const CACHE_NAME = "dwaekki-gym-v" + APP_VERSION;
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./style.css",
  "./data.js",
  "./ai.js",
  "./games.js",
  "./app.js",
  "./icon-outside-192.png",
  "./icon-outside-512.png",
  "./icon-outside-180.png",
  "./icon-inside.png",
  "./icon-inside-192.png",
  "./icon-inside-96.png",
  "./logo.png",
  "./bg-pattern.png",
  "./wallpaper-heart.jpg",
  "./wallpaper-teddy.jpg",
  "./wallpaper-chick.jpg",
  "./wallpaper-straykids.jpg",
  "./wallpaper-bunnylilac.jpg",
  "./wallpaper-bunnypink.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    // NOTE: no self.skipWaiting() here on purpose — a new version waits until the
    // person taps "Update now" in the app, so nothing changes under them mid-session.
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(()=> self.clients.claim())
  );
});

// Cache-first for local assets, network-first (fallback to cache) for anything else
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if(url.origin === self.location.origin){
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  } else {
    event.respondWith(
      fetch(event.request).catch(()=> caches.match(event.request))
    );
  }
});

// Lets the page tell a waiting worker to take over right now (used by the "Update now" button)
self.addEventListener("message", event => {
  if(event.data === "SKIP_WAITING"){
    self.skipWaiting();
  }
});
