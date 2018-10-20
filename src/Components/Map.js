   import React from 'react';
   import ListView from './ListView'
   import Search from './Search'


class Map extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      locationData : 
      [
        {title: 'Park Ave Penthouse', position: {lat: 40.7713024, lng: -73.9632393}},
        {title: 'Chelsea Loft', position: {lat: 40.7444883, lng: -73.9949465}},
        {title: 'Union Square Open Floor Plan', position: {lat: 40.7347062, lng: -73.9895759}},
        {title: 'East Village Hip Studio', position: {lat: 40.7281777, lng: -73.984377}},
        {title: 'TriBeCa Artsy Bachelor Pad', position: {lat: 40.7195264, lng: -74.0089934}},
        {title: 'Chinatown Homey Space', position: {lat: 40.7180628, lng: -73.9961237}}
      ]
    }
  } 

  getData = (keyword,location) => {
    fetch('http://localhost:3002',
    {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body : JSON.stringify({
        keyword: keyword,
        location: location
      })
    })
    .then(resp => resp.json())
    .then(resp => this.getMarkers(resp));
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
        zoom : 12
      });

      //this event will fire when the tiles for them 
      // map finish loading finished and then load the markers
      window.google.maps.event.addListenerOnce(map,'tilesloaded',this.makeMarkers);
      
      let infoWindow = new window.google.maps.InfoWindow();

      this.setState({map : map, infoWindow : infoWindow})
    }

  }

  getMarkers = (data) => {
    this.hideMarkers();
    this.setState({locationData : data});
    this.makeMarkers();

  }


  makeMarkers = () => {


    let markers = this.state.locationData.map(marker => {

      let mark = new window.google.maps.Marker(marker)
      mark.addListener('click', () => {
        this.handleClick(mark);
      })

      return mark;
    })

    this.setState({markers : markers});
    this.showMarkers(markers);

  }

  showMarkers = (markers) => {
    this.hideMarkers();

    this.setState({showMarkers : markers})
    
    let bounds = new window.google.maps.LatLngBounds();

    markers.forEach(marker => {
      bounds.extend(marker.position);
      marker.setMap(this.state.map);
    })

    if(markers.length > 0) {
      // this.state.map.panToBounds(bounds);
      this.state.map.fitBounds(bounds);
      
      markers.length === 1 && this.state.map.setZoom(12);
    }
  }

  hideMarkers = () => {
    this.state.markers.forEach(marker => {
      marker.setMap(null);
    })
  }
  

  findResults = (search) => {
    let markers = this.state.markers.filter(marker => marker.title.toLowerCase().includes(search.toLowerCase()));
    this.showMarkers(markers);
  }

  getStreetView = () => {
    console.log(document.getElementById('street-view'))

    let streetView = new window.google.maps.StreetViewPanorama(document.getElementById('street-view'),{
      position : this.state.markerClicked.position,
      pov : {
        heading : 34,
        pitch : 10
      }
    });
    // this.state.map.setStreetView(streetView);
  }

  
  handleClick = (marker) => {
    // console.log(marker);
    this.setState({markerClicked : marker});

    // start bounce
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    // stop bounce
    marker.setAnimation(window.google.maps.Animation.null);

    // display info window
    let display = (`
      <div id = "marker-content" >
        <ul id="info-window-list">
          <li><h3>${marker.title}</h3></li>
          <li><image class = 'avatar' src = '${marker.avatar}' alt = '${marker.title} image'></li>
          <li>Rating: ${marker.rating} (${marker.reviewCount})</li>
          <li>Price: ${marker.price}</li>        
        </ul>
      </div>`)

    this.state.infoWindow.setContent(display);
    this.state.infoWindow.open(this.state.map,marker);

  }
  

  render() {
      return (
          <div>
              {this.props.mapError && <div>{this.props.MapError}</div> }
              
              <div>
                  <ListView 
                  markerClicked = {this.state.markerClicked} 
                  markers = {this.state.showMarkers || this.state.markers} 
                  handleClick = {this.handleClick}
                  findResults = {this.findResults} 
                  getStreetView = {this.getStreetView} />
              </div>

              <Search 
              getData = {this.getData} />
          </div>

      );
    }
        
}

export default Map
//populate info window with all data 
//style
//fix warning
    

   
   
   
   
