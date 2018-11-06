# Neighborhood Map
Final GWG-Udacity Project

## About
Neighborhood Map is a simple single-page app that finds places using keywords and locations. 


## Install
1. Clone/Download the repository
2. `npm install`
3.  `npm run startapp` to run build production
4.  `npm start` to run in developer mode
*NOTE: You will need your own keys (free of course) to access API data.*

## Using The App

### Search
Enter a valid keyword and Location.

    Keyword: Pizza
    Location: Chicago
    
The results will appear in the list and as markers on the map.

### YelpApi.js
This proxy server accepts the requests from <Search/> and sends them to the the Yelp Client and retrieves data. 

### Sw.js
The service worker is active in both the build production and development mode. Feel free to comment out `        navigator.serviceWorker.register("sw.js");` 
in the `<Index />` component  :) 

The service worker caches static files as well as Yelp Requests for offline use.

## API
* [Yelp Fusion API](https://www.yelp.com/fusion)
* [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)

### Dependencies
* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Body-parser](https://www.npmjs.com/package/body-parser)
* [Cors](https://www.npmjs.com/package/cors)
* [Node-fetch](https://www.npmjs.com/package/node-fetch)

