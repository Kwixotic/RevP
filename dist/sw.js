const CACHE = 'luma-v6';
const FILES = ['./','./index.html','./styles.css?v=6','./core.js?v=6','./app.js?v=6','./startup.js?v=6','./icon-192.png?v=6','./icon-512.png?v=6','./apple-touch-icon.png?v=6','./manifest.webmanifest?v=6'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method!=='GET' || new URL(event.request.url).origin!==self.location.origin) return;
  event.respondWith(fetch(event.request).then(response=>{
    if (response.ok && (response.type==='basic'||response.type==='default')) {
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});
    }
    return response;
  }).catch(()=>caches.match(event.request).then(cached=>cached || (event.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
