self.addEventListener('fetch',event => {
    if(event.request.url.includes('maps.googleapis.com') || event.request.method !== 'GET') {
        return
    }

    else if(event.request.url.includes('http')) {
        console.log(event.request.url);
        event.respondWith(
            //cache static files
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
