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

  showInfoModal = content => {
    const infoModal = document.getElementById("info-modal");
    const infoModalContent = document.getElementById('info-modal-content');
    const infoModalButton = document.getElementById('info-modal-button');

    //add event listener to close modal when modal button clicked
    infoModalButton.addEventListener ('click', event => {
      document.getElementById("info-modal").classList.add('hide');
    });
    
    //show modal and insert content
    infoModal.classList.remove('hide');
    infoModalContent.innerHTML = content;

    //move focus to inside info-modal
    infoModalButton.focus();

    //trap modal focus
    document.addEventListener('keydown',event => {
      event.key === 'Tab' && event.preventDefault();
    });

  }

  updateState = data => {
    if(data.error) {
      this.setState({markers : []}); 
      this.menuRef.current.updateState({markers: []});
      console.log(data.error)

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

  //this function hanndles the clicks on markers in the map and clicks in the listview
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
          showInfoModal = {this.showInfoModal}
          ref = {this.menuRef} />

        </main> 

      </div>
      
    );
  }
}

export default App;
