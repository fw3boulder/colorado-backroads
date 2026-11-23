const C='roadbook-salida-overnight-b1ffcbd60f',P='salida-overnight.html';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll([P,'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js','https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('roadbook-salida-overnight-')&&x!==C)
 .map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=e.request.url;
 if(u.startsWith('https://unpkg.com/leaflet@1.9.4/dist/leaflet')){e.respondWith(caches.match(u).then(r=>r||fetch(e.request)));return;}
 if(e.request.mode!=='navigate'||!new URL(u).pathname.endsWith('/'+P))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const k=r.clone();e.waitUntil(caches.open(C).then(c=>c.put(P,k)));}return r;})
 .catch(()=>caches.match(P)));});
