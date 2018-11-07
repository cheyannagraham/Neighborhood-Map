import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker.js';

let appRef;

//This function is invoked in the 'index.html' script. 
window.initMap = function() {
    let mapError;

    // Send error if map did not load.
    if(!window.google.maps){
        mapError = 'Error, Google Maps Not Loaded';
    }
    appRef = React.createRef();

    ReactDOM.render(<App mapError = {mapError} ref = {appRef} />, document.getElementById('root'));
}

// catch authentication Error
window.gm_authFailure = function() {

    let content = `<h4>Google Maps API</h4>
    <p>Authentication Error! Check Javascript console (Ctrl + Shift + I ) for more information.</p>`;
    appRef.current.showInfoModal(content);

}

//register service worker
serviceWorker.register();

// notify user when there is no internet connection
window.addEventListener('offline',event => {
    console.log('No internet connection!')
    document.getElementById("offline").classList.remove('hide');
});

window.addEventListener('online',event => {
    console.log('Connection Restored!')
    document.getElementById("offline").classList.add('hide');
});



