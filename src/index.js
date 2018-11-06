import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


window.initMap = function() {
    let mapError;

    if(!window.google.maps){
        mapError = 'Error, Google Maps Not Loaded';
    }

    ReactDOM.render(<App mapError = {mapError}/>, document.getElementById('root'));
}


if(navigator.serviceWorker) {
    window.addEventListener('load', event => {
        navigator.serviceWorker.register("sw.js");
    })
}

window.addEventListener('offline',event => {
    console.log('No internet connection!')
    document.getElementById("offline").classList.remove('hide');
})

