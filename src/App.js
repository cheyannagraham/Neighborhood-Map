import React, { Component } from 'react';
import './App.css';
import ListView from './Components/ListView'
// import * from 


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      markers : 
      [
        {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
        {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
        {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}}
      ]
    }
  } 
  
  componentDidMount() {
    this.showMarkers();
  }

  showMarkers = () => {
    this.state.markers.map(marker => 
      new window.google.maps.Marker(
        {
          position : marker.location,
          map : this.props.map,
          title : marker.title
        }
      )
    )
  }


  render() {
    return (
      <div>
        <ListView listItems = {this.state.markers} />
      </div>
    );
  }
}

export default App;
