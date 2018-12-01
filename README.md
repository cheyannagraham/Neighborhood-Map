# Neighborhood Map
Final GWG-Udacity Project

## About
Neighborhood Map is a simple single-page app that finds places using keywords and locations. 


## Install
1. Clone/Download the repository
2. `npm install`
3. `cd Neighborhood-Map`

### Production
1. `npm run build` to build production code
2. `npm run startapp` to serve production
3. Production served @ localhost:5000

### Development

1. `npm start` to run in developer mode
2. Development served @ localhost:3000


## Using The App

### Search
Enter a valid keyword and Location.

    Keyword: Pizza
    Location: Chicago
    
The results will appear in the list and as markers on the map.

_Results will NOT fetch if 1 or both fields are empty!_

### YelpApi.js
This proxy server accepts the requests from <Search/> and sends them to the the Yelp Client and retrieves data. 

### Servcie Workers
There are two service workers active in production. 

`service-worker.js`
Create React App default service worker caches static site files;

`sw.js`
This custom service worker caches search results from Yelp API


## API
* [Yelp Fusion API](https://www.yelp.com/fusion)
* [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)

_NOTE: Google Map API key only works for localhost:3000 & 5000_

### Dependencies
* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Body-parser](https://www.npmjs.com/package/body-parser)
* [Cors](https://www.npmjs.com/package/cors)
* [Node-fetch](https://www.npmjs.com/package/node-fetch)

