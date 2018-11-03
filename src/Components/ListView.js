import React from 'react';

class ListView extends React.Component {
//change to stateless component

  focusInfoWindow = (e) => {
    const previousElement = e.target;
    const closeButton = document.querySelector("button[title='Close']");

    //make sure info window is open before giving focus
    document.getElementById('info-window') && 
    document.getElementById('info-window-title').focus();

    closeButton.addEventListener('click', () => {
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
          closeButton.focus();
        }   
      }     
    });

    document.addEventListener('keyup', e => {
      if(e.key === 'Shift') shift = false;
    });    
  }


  modDisplay = (marker) => {
    return (
    <div>
      <ol id='module-list'>
        <li tabIndex='0' aria-label='address'>{marker.address}</li>
        <li tabIndex='0' aria-label='phone'>{marker.phone}</li>
        
        <li tabIndex='0' >
          <div>
            {(marker.photos || []).map(photo => 
              (<img  key={photo} className='business-photo' src={photo} alt='business' />))}            
          </div>
        </li>

        <li>
          <button id='more-info-button' onClick={(e) => {this.focusInfoWindow(e)}}>
              Tab to InfoWindow
          </button> 
        </li>

        <li >
          <a href={marker.website}>
            <img className="yelp-logo" src = "images/Yelp_trademark_rgb.png" alt="logo"/>
          </a>
        </li>

      </ol>
    </div>
    )
  }

  makeList = () => {

    return (
      <ol id='list-view-list'>
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
      <div id='list-view-container'>
        <h2 tabIndex='0'>Markers</h2>

        {this.props.markers && this.props.markers.length > 0 
        ? this.makeList() : <p>No Results</p>}
      </div>
		)
	}
}

export default ListView;
