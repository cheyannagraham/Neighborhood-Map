import React from 'react';



class ListView extends React.Component {

	componentDidUpdate = () => {
		document.querySelector('#street-view') && this.props.getStreetView();		
  }

  filter = () => {
    return <input 
            type='text' 
            value = {this.searchField} 
            onChange = { (e) => {this.props.findResults(e.target.value)}} />
  }

  modDisplay = (marker) => {
    return <div>
              <ol id='module-list'>
                <li id='street-view'></li>
                <li>{marker.address}</li>
                <li>{marker.phone}</li>
                <li><a href={marker.website}>Visit</a></li>
              </ol>
            </div>
  }
  
	render() {
		return (
			<div>
      Filter Results {this.filter()}        				

				{this.props.markers && this.props.markers.length > 0 ? 
				
				<ol>
					{this.props.markers.map(marker => {
						let className, display;

						//toggle clicked class if marker clicked
						if(this.props.markerClicked && marker.title === this.props.markerClicked.title) {
							
              className = 'clicked';							
              display = this.modDisplay(marker);

            }
            else {
              className = '';
              display = '';
            }

            return (
              <li  
              key = {marker.id || marker.title}>
                  
                <button 
                className = {className}
                onClick = {() => {this.props.handleClick(marker)}} >
                  {marker.title} 
                </button>
                
                {display}
              </li>
            )                        
							})}
					</ol> :

					<p>No Results</p>

				}
			</div>
		)
	}
}

export default ListView;