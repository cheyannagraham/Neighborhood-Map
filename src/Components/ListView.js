import React from 'react';



class ListView extends React.Component {

  modDisplay = (marker) => {
    return (
    <div>
      <ol id='module-list'>
        <li>
          <div>
            {(marker.photos || []).map(photo => 
              (<img  key={photo} className='business-photo' src={photo} alt={marker.title} />))}            
          </div>

        </li>
        <li>{marker.address}</li>
        <li>{marker.phone}</li>
        <li>
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

          //toggle clicked class if marker clicked
          if(this.props.markerClicked && marker.id === this.props.markerClicked.id) {            
            className = 'clicked';							
            display = this.modDisplay(marker);
          }

          return (

            <li                    
              role='button' key = {marker.id}                
              className = {`marker-list-item ${className}`}
              onClick = {() => {this.props.handleClick(marker)}} >
                <span className='list-title'>{marker.title}</span >
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
        <h2>Markers</h2>

        {this.props.markers && this.props.markers.length > 0 
        ? this.makeList() : <p>No Results</p>}
      </div>
		)
	}
}

export default ListView;