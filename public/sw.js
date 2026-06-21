self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.open("seismic-globe-v1").then(async cache => {
      try {
        const network = await fetch(event.request);
        if (network && network.ok && event.request.url.startsWith(self.location.origin)) {
          cache.put(event.request, network.clone());
        }
        return network;
      } catch {
        const cached = await cache.match(event.request);
        return cached || Response.error();
      }
    })
  );
});
