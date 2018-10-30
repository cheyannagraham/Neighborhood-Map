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
    if(data.error) {
      this.setState({markers : []}); 
      this.menuRef.current.updateState({markers: []});

    }
    else {
      data.businessData ?
      this.mapRef.current.makeMarkers(data.businessData) :
      this.setState(data);
      
      //this will update the state of <Menu> which will in 
      // turn trigger a rerender and will show the updated markers
      // w/o rerendering the map
      data.markers && this.menuRef.current.updateState(data)

    }

    //markerclicked {}, businessdatat {}, markers {}
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

        <div id='main'>
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

        </div> 

      </div>
      
    );
  }
}

export default App;
