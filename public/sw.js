const addResourcesToCache = async (resources) => {
   const cache = await caches.open("v2");
   await cache.addAll(resources);
   console.log('active now')
 };
 
 self.addEventListener("install", (event) => {
   event.waitUntil(
     addResourcesToCache([
       "/",
       "/index.html",
       '/images/desktop/404-error.webp',
       '/images/tablet/404-error.webp',
       '/images/mobile/404-error.webp',
       '/images/onboarding/ellipse.svg'
     ]),
   );
 });

 const putInCache = async (request, response) => {
   const cache = await caches.open("v2");
   await cache.put(request, response);
 };
 
 const cacheFirst = async ({ request }) => {
   const responseFromCache = await caches.match(request);
   if (responseFromCache) {
     return responseFromCache;
   }
   try {
     const responseFromNetwork = await fetch(request);
     putInCache(request, responseFromNetwork.clone());
     return responseFromNetwork;
   } catch (error) {
      return new Response("Network error happened", {
         status: 408,
         headers: { "Content-Type": "text/plain" },
     });
   }
 };
 
 self.addEventListener("fetch", (event) => {
   event.respondWith(
     cacheFirst({
       request: event.request,
     }),
   );
 });


 const deleteCache = async (key) => {
   await caches.delete(key);
 };
 
 const deleteOldCaches = async () => {
   const cacheKeepList = ["v2"];
   const keyList = await caches.keys();
   const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
   await Promise.all(cachesToDelete.map(deleteCache));
 };
 
 self.addEventListener("activate", (event) => {
   event.waitUntil(clients.claim())
   event.waitUntil(deleteOldCaches());
 });
 
 