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
    this.animateMarker = React.createRef();
  }

  updateState = data => {
    data.businessData && this.makeMarkers(data.businessData);
    data.markerClicked && this.setState(data.markerClicked);
  }

  makeMarkers = (businessData) => {
    // this.hideMarkers();

    let markers = (businessData || []).map(marker => {

      let mark = new window.google.maps.Marker(marker)
      mark.addListener('click', () => {
        this.handleClick(mark);
      })

      return mark;
    })

    // this.props.updateAppState({markers : markers});
    this.setState({markers: markers});

  }
  

  handleNavClick = () => {
    this.state && this.state.hidden ? 
    this.setState({hidden : false}) :
    this.setState({hidden: true});
  }

  handleClick = (marker) => {
    // this.setState({markerClicked: marker})
    this.animateMarker.current.handleClick(marker);
  }
  
  render() {
    return ( console.log(this.state,'stateapp'),
        <div id='app'>
          <Header navClick = {this.handleNavClick} />
          
          <Map 
          mapError = {this.props.mapError} 
          navHidden = {this.state.hidden} 
          updateAppState = {this.updateState} 
          businessData = {this.state.data} 
          markers = {this.state.markers} 
          ref = {this.animateMarker} />
          
          <Menu 
          updateAppState = {this.updateState} 
          markers = {this.state.markers} 
          markerClicked = {this.state.markerClicked} 
          handleClick = {this.handleClick} />

        </div>
      
    );
  }
}

export default App;
