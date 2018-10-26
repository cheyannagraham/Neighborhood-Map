   import React from 'react';
   import ListView from './ListView'
   import Search from './Search'
   import Filter from './Filter'


class Map extends React.Component{

  constructor(props) {
    super(props);
    this.state = {}
  } 
  

  componentDidMount(){

    //Check if library loaded
    if(window.google.maps)
    {
      const div = document.createElement('div');
      div.id = 'map';
      document.getElementById('root').append(div);
      
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

    this.getData('coffee','NY');

  }

  getData = (keyword='',location='') => {
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

  getMarkers = (data) => {
    this.setState({locationData : data});
    this.makeMarkers();
  }

  makeMarkers = () => {
    this.hideMarkers();

    let markers = (this.state.locationData || []).map(marker => {

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
    //for filter results
    this.hideMarkers()
    this.setState({showMarkers : markers})
    
    let bounds = new window.google.maps.LatLngBounds();

    markers.forEach(marker => {
      bounds.extend(marker.position);
      marker.setMap(this.state.map);
    })

    if(markers.length > 0) {
      this.state.map.fitBounds(bounds);      
      markers.length === 1 && this.state.map.setZoom(12);
    }
  }

  hideMarkers = () => {
    (this.state.markers || []).forEach(marker => {
      marker.setMap(null);
    })
  }  

  findResults = (search) => {
    console.log('fr',search)
    let markers = this.state.markers.filter(marker => marker.title.toLowerCase().includes(search.toLowerCase()));
    this.showMarkers(markers);
  }

  getStreetView = () => {
    return new window.google.maps.StreetViewPanorama(document.getElementById('street-view'),{
      position : this.state.markerClicked.position,
      pov : {
        heading : 34,
        pitch : 10
      }
    });
  }

  
  handleClick = (marker) => {
    this.setState({markerClicked : marker});

    //animation
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    marker.setAnimation(window.google.maps.Animation.null);

    this.fillInfoWindow(marker)
  }

  fillInfoWindow = (marker) => {
    //FIX undefined values
    let display = (`
      <div id = "marker-content" >
        <ul id="info-window-list">
          <li><h3>${marker.title}</h3></li>
          <li><image class = 'avatar' src = '${marker.avatar}' alt = '${marker.title} image'></li>
          <li>Rating: ${marker.rating} (${marker.reviewCount})</li>
          <li>Price: ${marker.price || ''}</li> 
          <li id='open-status'>${marker.hours && marker.hours[0].is_open_now ? 'Open now' : 'Closed'} </li>       
        </ul>
      </div>`)

    this.state.infoWindow.setContent(display);
    this.state.infoWindow.open(this.state.map,marker);


  }
  

  render() {
    return (
      <div id='content-section'>
        {this.props.mapError && <div>{this.props.MapError}</div> }

        <Search 
        getData = {this.getData} />

        <Filter findResults = {this.findResults} />  
        
        <ListView 
        markerClicked = {this.state.markerClicked} 
        markers = {this.state.showMarkers || this.state.markers} 
        handleClick = {this.handleClick}
        findResults = {this.findResults} 
        getStreetView = {this.getStreetView} />
        
      </div>

    );
    }
        
}

export default Map

//style
// replace streetview w photos & hours
//fix bug on targets
    

   
   
   
   
