import React, { Component } from 'react';
import './App.css';
import './MediaQueries.css';
import Map from './Components/Map';
import Header from './Components/Header';
import Menu from './Components/Menu';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.mapRef = React.createRef();
    this.menuRef = React.createRef();
  }

  updateState = data => {
    if(data.error) {
      this.setState({markers : []}); 
      this.menuRef.current.updateState({markers: []});

    }
    else {
      data.businessData ?
      this.mapRef.current.makeMarkers(data.businessData) :
      this.setState(data);
      
      data.markers && this.menuRef.current.updateState(data);
    }
  } 

  filterResults = (search) => {
    let markers = (this.state.markers || []).filter(marker => marker.title.toLowerCase().includes(search.toLowerCase()));

    this.mapRef.current.showMarkers(markers);
    this.menuRef.current.updateState({markers : markers});
  }
  

  handleNavClick = () => {
    this.menuRef.current.toggleView();
  }

  handleClick = (marker) => {
    this.mapRef.current.animate(marker);
    this.menuRef.current.updateState({markerClicked : marker});

  }
  
  render() {
    return (
      <div id='app'>
        <Header navClick = {this.handleNavClick} />

        <main id='main'>
          <Map 
          mapError = {this.props.mapError} 
          updateAppState = {this.updateState}
          handleClick = {this.handleClick} 
          markers = {this.state.markers}
          ref = {this.mapRef} />
          
          <Menu
          updateAppState = {this.updateState} 
          handleClick = {this.handleClick}
          filterResults = {this.filterResults}
          ref = {this.menuRef} />

        </main> 

      </div>
      
    );
  }
}

export default App;
