
self.addEventListener('install', event  => {
    event.waitUntil(
        caches.open('Neighborhood-Map')
        .then(cache => {
            cache.addAll([
                "/",
                "/static/js/bundle.js",
                "/static/js/1.chunk.js",
                "/static/js/main.chunk.js",
                "/main.a2f314f61455069e6be7.hot-update.js",
                "http://localhost:3002/search?keyword=coffee&location=NY",
                "https://maps.gstatic.com/mapfiles/openhand_8_8.cur",
                "/sockjs-node/info?t=1541485291957",
                "https://maps.gstatic.com/mapfiles/transparent.png",
                "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
                "/manifest.json",
                "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans",
                "https://maps.gstatic.com/mapfiles/api-3/images/google4_hdpi.png"
            ])
        })
    );
});


self.addEventListener('fetch',event => {

    if(event.request.url.includes('maps.googleapis.com') || event.request.method !== 'GET') {
        return
    }

    else if(event.request.url.includes('http')) {

        event.respondWith(
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
