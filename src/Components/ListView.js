import React from 'react';


// This component creates and renders the list shown in the side menu. 
// Its also shows the extra info when a marker is clicked. 
class ListView extends React.Component {

// This function traps the tabbing while inside the infoWindow. 
// This only works if tabbed into infoWindow
  focusInfoWindow = (e) => {
    const previousElement = e.target;
    const closeInfoWindow = document.querySelector("button[title='Close']")

    //make sure info window is open before giving focus
    document.getElementById('info-window') && 
    document.getElementById('info-window-title').focus();


    closeInfoWindow.addEventListener('click', () => {
      previousElement.focus();
    })

    let shift = false;
    
    document.addEventListener('keydown',e => {
      if(e.key === 'Shift') shift = true;
      
      if(document.activeElement.title === 'Close' && e.key === 'Tab'){
        if(shift)
        {
          document.getElementById('info-window-logo').focus();
        }  else {
          document.getElementById('info-window').focus();
        } 
      }

      if(document.activeElement.id === 'info-window-title' && e.key === 'Tab'){
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
    <div id='module-list'>
      <p> 
        {marker.address}
      </p>
      
      <p> 
        {marker.phone}
      </p>
      
      <p> 
        <div>
          {(marker.photos || []).map(photo => 
            (<img  
            key={photo} 
            className='business-photo' 
            src={photo} 
            alt='business' />))}            
        </div>
      </p>

        <button 
        id='more-info-button' 
        onClick={(e) => {this.focusInfoWindow(e)}}>
            Tab to InfoWindow
        </button> 

      <p>
        <a href={marker.website}>
          <img 
          className="yelp-logo" 
          src = "images/Yelp_trademark_rgb.png" 
          alt="logo"/>
        </a>
      </p>

    </div>
    )
  }

  //Create list of marker items
  makeList = () => {

    return (
      <ol id='marker-list'>
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
            className = {`marker-list-item ${className}`}>

              <button 
              className='marker-button list-title'
              onClick = {() => {this.props.handleClick(marker)}}>          
                {marker.title}
              </button>
              
              {display} 
            
            </li>
          )                                  
        })}
      </ol>
      
    ) 
  }
  
	render() {
		return (
      <div id='marker-list-container'>
        <h2>Markers</h2>

        {this.props.markers && this.props.markers.length > 0 
        ? this.makeList() : <p>No Results</p>}
      </div>
		)
	}
}

export default ListView;
