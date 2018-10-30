import React from 'react';



class ListView extends React.Component {

  modDisplay = (marker) => {
    return (
    <div>
      <ol id='module-list'>
        <li tabIndex='0' aria-label='address'>{marker.address}</li>
        <li tabIndex='0' aria-label='phone'>{marker.phone}</li>
        
        <li tabIndex='0' >
          <a href={marker.website}>
            <img className="yelp-logo" src = "images/Yelp_trademark_rgb.png" alt="logo"/>
          </a>
        </li>
        
        <li tabIndex='0' >
          <div>
            {(marker.photos || []).map(photo => 
              (<img  key={photo} className='business-photo' src={photo} alt='business photo' />))}            
          </div>
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

          //toggle clicked class if marker clicked
          if(this.props.markerClicked && marker.id === this.props.markerClicked.id) {            
            className = 'clicked';							
            display = this.modDisplay(marker);
          }

          return (

            <button
            tabIndex='0'                   
            key = {marker.id}                
            className = {`marker-button ${className}`}
            onClick = {() => {this.props.handleClick(marker)}}
            //onSubmit = {() => {this.props.handleClick(marker)}}
            >
              
              <span className='list-title'> 
                {marker.title}
              </span>
                {display}              
            </button>
          )                                  
        })}
      </ol>

      
    ) 
  }
  
	render() {
		return (
      <div id='list-view-container'>
        <h2 tabIndex='0       '>Markers</h2>

        {this.props.markers && this.props.markers.length > 0 
        ? this.makeList() : <p>No Results</p>}
      </div>
		)
	}
}

export default ListView;