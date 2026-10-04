const C = "finance-v14"; // bump this number whenever you change any file
const A = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./sw.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(C)
      // cache:"reload" skips the browser's HTTP cache so we store the fresh files
      .then(c => c.addAll(A.map(u => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== C).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network first: always try to get the latest file, fall back to the
// saved copy only when offline.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(response => {
        if (response && response.ok && new URL(e.request.url).origin === location.origin) {
          const copy = response.clone();
          caches.open(C).then(cache => cache.put(e.request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(e.request).then(cached => cached || caches.match("./index.html"))
      )
  );
});
