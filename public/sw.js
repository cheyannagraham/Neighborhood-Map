
// import Create-React-App default service worker to precache files
self.importScripts('service-worker.js');


// // cache initial search results on install
// self.addEventListener('install', event => {
//     event.waitUntill(
//         caches.open('Neighborhood-Map')
//         .then(cache => {
//             cache.add('http://localhost:3002/search?keyword=Coffee&location=NY' )
//         })
//     )
// })


//cach supsequent searches
self.addEventListener('fetch',event => {

    if(event.request.url.includes('http://localhost:3002')) {
        event.respondWith(
            caches.match(event.request.url)
            .then(response => {
                if(response){
                    return response
                }
                
                //only fetch new results if connected to network to prevent error responses being cached
                else if(navigator.onLine) {

                    return caches.open('Neighborhood-Map')
                    .then(cache => {
                        return cache.add(event.request.url)
                        .then(() => {
                            return cache.match(event.request.url);
                        });
                    });   
                }         
            })
        )
    }
    
});
