   import React from 'react';
   import ListView from './ListView'


class Map extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
          locationData : 
          [
            {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
            {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
            {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
            // {title: 'Home', location: {lat: 37.943490, lng: -122.073000}}
          ]
        }
      } 
    

    componentDidMount(){

        //Check if library loaded
        if(window.google.maps)
        {
            let map = new window.google.maps.Map(
            document.querySelector('#map'),
            {
                center : {
                    lat:41.263849,
                    lng:-74.382206
                },
                zoom : 11
            });

            //this event will fire when the map is idle or 
            // finished and then load the markers
            map.addListener('idle',this.makeMarkers);
            this.setState({map : map})
            this.makeMarkers();

        }

    }


      makeMarkers = () => {
        let bounds = new window.google.maps.LatLngBounds();
    
        let markers = this.state.locationData.map(marker => {
          bounds.extend(marker.location);
          console.log(this.state.map)
    
          return new window.google.maps.Marker(
            {
              position : marker.location,
              map : this.state.map,
              title : marker.title
            }
          )
        })

        this.setState({markers : markers});
        // console.log(this.state)

        // this.state.map.fitBounds(bounds);
      }
    

    render() {
        return (console.log(this.state.map),
            <div>
                {this.props.mapError && <div>{this.props.MapError}</div> }
                
                <div>
                    <ListView listItems = {this.state.locationData} />
                </div>
            </div>

        );
      }
        
}

export default Map
    

   
   
   
   
