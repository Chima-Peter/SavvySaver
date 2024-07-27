const addResourcesToCache = async (resources) => {
   const cache = await caches.open("version-1.1");
   await cache.addAll(resources);
   self.skipWaiting();
   console.log('active now')
 };


 self.addEventListener("install", (event) => {
   const basename = self.location.pathname.includes('/SavvySaver/') ? '/SavvySaver/' : '/'
   event.waitUntil(
     addResourcesToCache([
       `${basename}`,
       `${basename}index.html`,
       `${basename}images/desktop/404-error.webp`,
       `${basename}images/tablet/404-error.webp`,
       `${basename}images/mobile/404-error.webp`,
       `${basename}images/onboarding/ellipse.svg`,
       `${basename}images/onboarding/control.webp`,
       `${basename}images/onboarding/email.webp`,
       `${basename}images/onboarding/goes.webp`,
       `${basename}images/onboarding/plan.webp`,
     ]),
   );
 });

 const putInCache = async (request, response) => {
   const cache = await caches.open("version-1.1");
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
   const cacheKeepList = ["version-1.1"];
   const keyList = await caches.keys();
   const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
   await Promise.all(cachesToDelete.map(deleteCache));
 };
 
self.addEventListener("activate", (event) => {
   event.waitUntil(
     (async () => {
       await deleteOldCaches();
       await clients.claim(); 
     })()
   );
 });
 
 