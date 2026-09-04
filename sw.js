const C = "finance-v13";
const A = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./sw.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(C).then(c => c.addAll(A)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== C).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        const copy = response.clone();
        caches.open(C).then(cache => cache.put(e.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});