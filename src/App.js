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
    // data.businessData && this(data.businessData);
    // data.markerClicked && this.setState(data.markerClicked);
    // data.markers && 
    console.log('data')
    data.businessData ?
    this.mapRef.current.makeMarkers(data.businessData) :
    this.setState(data);
    //markerclicked {}, businessdatat {}, markers {}
  }

 
  

  handleNavClick = () => {
    this.state && this.state.hidden ? 
    this.setState({hidden : false}) :
    this.setState({hidden: true});
  }

  handleClick = (marker) => {
    // this.setState({markerClicked: marker})
    this.mapRef.current.animate(marker);
    this.menuRef.current.showMarkerData(marker);

  }

  // showMarkerData = marker => {
  //   this.menuRef.current.showMarkerData(marker);

  // }
  
  render() {
    return (
        <div id='app'>
          <Header navClick = {this.handleNavClick} />
          
          <Map 
          mapError = {this.props.mapError} 
          navHidden = {this.state.hidden} 
          updateAppState = {this.updateState}
          handleClick = {this.handleClick} 

          //businessData = {this.state.businessData} 
          markers = {this.state.markers}
          showMarkerData = {this.showMarkerData} 
          ref = {this.mapRef} />
          
          <Menu 
          updateAppState = {this.updateState} 
          markers = {this.state.markers} 
          markerClicked = {this.state.markerClicked} 
          handleClick = {this.handleClick} 
          showMarkerData = {this.showMarkerData}
          ref = {this.menuRef} />

        </div>
      
    );
  }
}

export default App;
