import React, { Component } from 'react';
import './App.css';
import './MediaQueries.css';
import Map from './Components/Map';
import Header from './Components/Header';
import Menu from './Components/Menu';



class App extends Component {
  constructor(props) {
    super(props);
    //set nav window to hidden on initial load
    this.state = {hidden: true};
    this.mapRef = React.createRef();
    this.menuRef = React.createRef();
  }

  updateState = data => {
    data.businessData ?
    this.mapRef.current.makeMarkers(data.businessData) :
    this.setState(data);
    //markerclicked {}, businessdatat {}, markers {}
  } 

  filterResults = (search) => {
    let markers = this.state.markers.filter(marker => marker.title.toLowerCase().includes(search.toLowerCase()));
    this.showMarkers(markers);

    this.menuRef.current.updateList(markers);
  }
  

  handleNavClick = () => {
    this.menuRef.current.toggleView();
  }

  handleClick = (marker) => {
    this.mapRef.current.animate(marker);
    this.menuRef.current.updateList(marker);

  }
  
  render() {
    return (
        <div id='app'>
          <Header navClick = {this.handleNavClick} />

          <div id='main'>
            <Map 
            mapError = {this.props.mapError} 
            updateAppState = {this.updateState}
            handleClick = {this.handleClick} 
            markers = {this.state.markers}
            ref = {this.mapRef} />
            
            <Menu
            updateAppState = {this.updateState} 
            markers = {this.state.markers} 
            markerClicked = {this.state.markerClicked} 
            handleClick = {this.handleClick} 
            ref = {this.menuRef} />


          </div>
          


        </div>
      
    );
  }
}

export default App;
