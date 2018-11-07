import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker.js';


let appRef;

window.initMap = function() { 
    appRef = React.createRef();

    ReactDOM.render(<App ref ={appRef} mapError={false} />, document.getElementById('root'));
}



// catch authentication Error
window.gm_authFailure = function() {

    let content = 
        {
            header: 'Google Maps API',
            content:'Authentication Error! Check Javascript console (Ctrl + Shift + I ) for more information.'
        }
    
    appRef.current.showInfoModal(content);

}


//load app if script failed and send error to map component
window.scriptFail = function() {
    
    appRef = React.createRef();   

    ReactDOM.render(<App mapError = {'Google Maps API Unreachable'} ref = {appRef} />, document.getElementById('root'));
    
    // Send error if map did not load.
    let content = 
    {
        header: 'Script Failed',
        content:'Error, Google Maps API did not load because the script failed. Check Javascript console (Ctrl + Shift + I ) for more information.'
    } 

    appRef.current.showInfoModal(content);
}


//register service worker
serviceWorker.register();

// notify user when there is no internet connection
window.addEventListener('offline',event => {
    let content = 
    {
        header: 'Network',
        content: 'NOTICE!: No Internet Connection Detected'
    }
    appRef.current.showInfoModal(content);
});
