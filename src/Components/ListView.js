import React from 'react';


 
class ListView extends React.Component {

// manage focus while inside infoWindow
  focusInfoWindow = (e) => {
    const previousElement = e.target;
    const closeInfoWindow = document.querySelector("button[title='Close']")

    //make sure info window is open before giving focus
    document.getElementById('info-window') && 
    document.getElementById('info-window').focus();

    closeInfoWindow.addEventListener('click', () => {
      previousElement.focus();
    })

    let shift = false;
    
    document.addEventListener('keydown',e => {
      if(e.key === 'Shift') shift = true;
      
      if(document.activeElement.title === 'Close' && e.key === 'Tab'){
        //if shift tab is pressed from the close button, go back to logo
        if(shift)
        {
          document.getElementById('info-window-logo').focus();
        }  else {
          document.getElementById('info-window').focus();
        } 
      }

      if(document.activeElement.id === 'info-window' && e.key === 'Tab'){
        if(shift)
        {
          closeInfoWindow.focus();
        }   
      }     
    });

    document.addEventListener('keyup', e => {
      if(e.key === 'Shift') shift = false;
    });    
  }


  //this info is displayed in the side-menu
  modDisplay = (marker) => {
    return (
    <ul id='module-list' aria-labelledby={marker.title}>
      <li> 
        {marker.address}
      </li>
      
      <li> 
        {marker.phone}
      </li>
      
        <div>
          {(marker.photos || []).map(photo => 
            (<img  
            key={photo} 
            className='business-photo' 
            src={photo} 
            alt={`${marker.title}`} />))}            
        </div>

        {//show this button if the Google maps object is available

        (window.google && window.google.maps) && 
        <button 
        id='more-info-button' 
        onClick={(e) => {this.focusInfoWindow(e)}}>
          Tab to InfoWindow
        </button>} 

      <li>
        <a href={marker.website}>
          <img 
          className="yelp-logo" 
          src = "images/Yelp_trademark_rgb.png" 
          alt="Yelp logo"/>
        </a>
      </li>

    </ul>
    )
  }

  //Create list of marker items
  makeList = () => {

    return (
      <ul id='marker-list' aria-labelledby='marker-list-header'>
        {(this.props.markers || []).map(marker => {
          let className = '';
          let display = '';

          if(this.props.markerClicked && marker.id === this.props.markerClicked.id) {            
            className = 'clicked';							
            display = this.modDisplay(marker);
          }

          return (
            <li 
            key = {marker.id}                
            className = {`marker-list-item ${className}`}
            id = {marker.title}>

              <button 
              className='marker-button list-title'
              onClick = {() => {this.props.handleClick(marker)}}>          
                {marker.title}
              </button>             
              {display}             
            </li>

          )                                  
        })}
      </ul>      
    ) 
  }
  
	render() {
		return (
      <div id='marker-list-container'>
        <h2 id='marker-list-header'>Markers</h2>

        {this.props.markers && this.props.markers.length > 0 
        ? this.makeList() : <p>No Results</p>}
      </div>
		)
	}
}

export default ListView;
