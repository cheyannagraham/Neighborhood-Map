import React from 'react';


class Map extends React.Component{

  constructor(props) {
    super(props);
    this.state = {}
  }   

  //Once the component is mounted, create the map object and add it to created div
  componentDidMount(){
    const div = document.createElement('div');
    div.id = 'map';
    div.setAttribute('aria-label','Map');
    div.setAttribute('role','application');

    document.getElementById('main').append(div);

    //make map if there was no error and the maps object is available
    if(!this.props.mapError && window.google.maps){
      
      let map = new window.google.maps.Map(
      document.querySelector('#map'),
      {
        center : {
          lat:41.263849,
          lng:-74.382206
        },
        zoom : 12,
        disableDefaultUI: true
      });
  
        let infoWindow = new window.google.maps.InfoWindow();
        this.setState({map : map, infoWindow : infoWindow})
      } 
      
      if(this.props.mapError) {
        div.setAttribute('class','map-error')
        div.innerHTML = `<p>${this.props.mapError}</p>`;
      }

  }
  
  //this will add a click event to map markers if the map is available. 
  // if its not available, it will just return the marker data
  makeMarkers = (businessData) => {
    this.hideMarkers();
    let markers;

    if(window.google && window.google.maps){

      markers = (businessData || []).map(marker => {
  
        let mark = new window.google.maps.Marker(marker)
        mark.addListener('click', () => {
          this.handleClick(mark);
        })
  
        return mark;
      });
    }
    
    this.props.updateAppState({markers: markers || businessData});

  }

  showMarkers = (markers = this.props.markers || []) => {

    if(!this.props.mapError && window.google.maps)
    {
      //hide markers when results are filtered
      this.hideMarkers()          
      let bounds = new window.google.maps.LatLngBounds();

      (markers).forEach(marker => {
        bounds.extend(marker.position);
        marker.setMap(this.state.map);
      })

      if(markers.length > 0) {
        this.state.map.fitBounds(bounds);      
        markers.length === 1 && this.state.map.setZoom(12);
      }
    }
    
  }

  hideMarkers = () => {
    (this.props.markers || []).forEach(marker => {
      marker.setMap(null);
    })
  } 
 
  handleClick = (marker) => {
    this.props.handleClick(marker);
  }

  animate = marker => {
    if(!this.props.mapError) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      marker.setAnimation(window.google.maps.Animation.null);
  
      this.fillInfoWindow(marker);
    }
  }

  getRatingImage = rating => {
    let filename = '';
    rating === 0 ? filename = "small_0" :
    rating === 1 ? filename = "small_1" :
    rating === 1.5 ? filename = "small_1_half" :
    rating === 2 ? filename = "small_2" :
    rating === 2.5 ? filename = "small_2_half" :
    rating === 3 ? filename = "small_3" :
    rating === 3.5 ? filename = "small_3_half" :
    rating === 4 ? filename = "small_4" :
    rating === 4.5 ? filename = "small_4_half" :
    rating === 5 ? filename = "small_5" :
    filename = "small_0";

    return (`images/${filename}.png`);
  }

  fillInfoWindow = (marker) => {
    let display = (`
      <div tabindex="0" aria-label="info-window" id = "info-window" >
        
        <p>
          <h3 id="info-window-title" >${marker.title}</h3>
        </p>
        
        <p>
          <image class = "avatar" src = "${marker.avatar}" alt = "${marker.title} image">
        </p>
                  
        <p > 
            <img class="yelp-rating-logo" 
            src=${marker.rating && this.getRatingImage(marker.rating)} 
            alt="rating-logo" />
              ${marker.rating} (${marker.reviewCount})
        </p>
        
        <p>
          Price: ${marker.price || ""}
        </p> 
        
        <p id="open-status">
          ${marker.hours && marker.hours[0].is_open_now ? "Open now" : "Closed"} 
        </p>
        
        <p>
          <a id="info-window-logo" href=${marker.website}>
            <img class="yelp-logo" src = "images/Yelp_trademark_rgb.png" alt="logo"/>
          </a>            
        </p>
        
      </div>`)

    this.state.infoWindow.setContent(display);
    this.state.infoWindow.open(this.state.map,marker);
  }

  render() {
    return (
      <div>
        { (!this.props.mapError) && this.showMarkers()}
      </div>
    )
  }        
}

export default Map