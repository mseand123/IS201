const C = "ground-contact-15d682e824";
const SHELL = ["/", "/index.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];
self.addEventListener("install", e => { self.skipWaiting();
  e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).catch(() => {})); });
self.addEventListener("activate", e => { e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))
    .then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const url = new URL(r.url);
  if (url.origin !== location.origin) return;   // fonts fall back to the stack in CSS
  if (r.mode === "navigate") {
    e.respondWith(fetch(r).then(res => { const cp = res.clone();
      caches.open(C).then(c => c.put("/index.html", cp)); return res; })
      .catch(() => caches.match("/index.html")));
    return;
  }
  e.respondWith(caches.match(r).then(hit => hit || fetch(r)));
});
