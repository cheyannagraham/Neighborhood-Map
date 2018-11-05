self.addEventListener('fetch',event => {
    if(event.request.url.includes('maps.googleapis.com' || 'http://localhost:3002') || event.request.method !== 'GET') {
        return
    }

    else {
        console.log(event.request.url);
        event.respondWith(
            //find response in cache
            //if its there, return it.
            //if its not, add it, then return it from the cache
            caches.match(event.request.url)
            .then(response => {
                if(response){
                    return response
                }
                return caches.open('Neighborhood-Map')
                .then(cache => {
                    return cache.add(event.request.url)
                    .then(() => {
                        return cache.match(event.request.url);
                    });
                });            
            })
        )

    }
    
});
