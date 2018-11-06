self.importScripts('service-worker.js');


self.addEventListener('fetch',event => {

    if(event.request.url.includes('http://localhost:3002')) {
        event.respondWith(
            caches.match(event.request.url)
            .then(response => {
                if(response){
                    return response
                }
                
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
