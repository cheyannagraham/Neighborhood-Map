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
            {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
            {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
            {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
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

            //this event will fire when the tiles for them 
            // map finish loading finished and then load the markers
            window.google.maps.event.addListenerOnce(map,'tilesloaded',this.makeMarkers)
            this.setState({map : map})

        }

    }


    makeMarkers = () => {
      let bounds = new window.google.maps.LatLngBounds();
  
      let markers = this.state.locationData.map(marker => {
        bounds.extend(marker.location);
  
        let m = new window.google.maps.Marker(
          {
            position : marker.location,
            map : this.state.map,
            title : marker.title
          }
        )
        m.addListener('click', () => {
          this.handleClick(m);
        })

        return m;
      })

      this.setState({markers : markers});
      this.state.map.fitBounds(bounds);

    }

    handleClick = (marker) => {
      console.log(marker);
      this.setState({markerClicked : marker})
      // start bounce
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      // stop bounce
      marker.setAnimation(window.google.maps.Animation.null);

    }
    

    render() {
        return (
            <div>
                {this.props.mapError && <div>{this.props.MapError}</div> }
                
                <div>
                    <ListView markerClicked = {this.state.markerClicked} listItems = {this.state.locationData} />
                </div>
            </div>

        );
      }
        
}

export default Map
//highlight marker in list on click
    

   
   
   
   
