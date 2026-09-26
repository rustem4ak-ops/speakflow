const SHELL='speakflow-shell-v9.0';
const AUDIO='speakflow-audio-v9.0';
const SHELL_FILES=['./','index.html','app.js','tts.js','data.json','manifest.json','audio/index.json'];

self.addEventListener('install',event=>event.waitUntil(
  caches.open(SHELL).then(c=>c.addAll(SHELL_FILES)).then(()=>self.skipWaiting())
));

self.addEventListener('activate',event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>![SHELL,AUDIO].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  event.respondWith(
    caches.match(req).then(cached=>{
      if(cached)return cached;
      return fetch(req).then(response=>{
        if(!response||response.status!==200||response.type==='opaque')return response;
        const copy=response.clone();
        caches.open(url.pathname.endsWith('.mp3')?AUDIO:SHELL).then(c=>c.put(req,copy)).catch(()=>{});
        return response;
      }).catch(()=>caches.match(req));
    })
  );
});
