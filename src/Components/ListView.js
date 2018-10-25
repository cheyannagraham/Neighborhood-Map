import React from 'react';



class ListView extends React.Component {

	componentDidUpdate = () => {
		document.querySelector('#street-view') && this.props.getStreetView();		
  }



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
        {/* <li>{marker.hours}</li> */}
        <li><a href={marker.website}>Visit</a></li>
      </ol>
    </div>
    )
  }

  makeList = () => {
    return (
      <ol>
        {this.props.markers.map(marker => {
          let className = '';
          let display = '';

          //toggle clicked class if marker clicked
          if(this.props.markerClicked && marker.id === this.props.markerClicked.id) {            
            className = 'clicked';							
            display = this.modDisplay(marker);
          }

          return (
            <li                    
              key = {marker.id}>
                
              <button 
                className = {className}
                onClick = {() => {this.props.handleClick(marker)}} >
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

        {this.props.markers && this.props.markers.length > 0 
        ? this.makeList() : <p>No Results</p>}

			</div>
		)
	}
}

export default ListView;