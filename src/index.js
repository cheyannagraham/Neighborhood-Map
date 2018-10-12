import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


window.initMap = function() {
    let map,mapError;

    //Check if library loaded
    if(window.google.maps)
    {
        map = new window.google.maps.Map(
        document.querySelector('#map'),
        {
            center : {
                lat:41.263849,
                lng:-74.382206
            },
            zoom : 11
        })



    } else {
        mapError = "Error, Google Maps Not Loaded";
    }

    ReactDOM.render(<App map = {map} mapError = {mapError}/>, document.getElementById('root'));

}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
