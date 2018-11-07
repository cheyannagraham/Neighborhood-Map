# Neighborhood Map
Final GWG-Udacity Project

## About
Neighborhood Map is a simple single-page app that finds places using keywords and locations. 


## Install
1. Clone/Download the repository
2. `npm install`
3. `cd Neighborhood-Map`
4.  `npm run build` to make build
5. `npm run startapp` to start build production
6.  `npm start` to run in developer mode


## Using The App

### Search
Enter a valid keyword and Location.

    Keyword: Pizza
    Location: Chicago
    
The results will appear in the list and as markers on the map.

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

### Dependencies
* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Body-parser](https://www.npmjs.com/package/body-parser)
* [Cors](https://www.npmjs.com/package/cors)
* [Node-fetch](https://www.npmjs.com/package/node-fetch)

