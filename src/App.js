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

    this.trapfocus();
  }

  trapfocus = () => {
    const infoModal = document.getElementById("info-modal");
    const infoModalButton = document.getElementById('info-modal-button');

    document.addEventListener('keydown', event => {
      
      if(!infoModal.classList.contains('hide')) {
        event.key === 'Tab' && event.preventDefault();
          //keep focus inside info-modal if its open
          infoModalButton.focus();
      }
    });

  }

  showInfoModal = content => {
    const infoModal = document.getElementById("info-modal");
    const infoModalContent = document.getElementById('info-modal-content');
    const infoModalButton = document.getElementById('info-modal-button');

    //show modal and insert content
    infoModal.classList.remove('hide');
    let html = `
      <h4 id='info-modal-header'>${content.header}</h4>
      <p id='info-modal-content-p'>${content.content}</p>`
    
    infoModalContent.innerHTML = html;   


    //add event listener to close modal when modal button clicked
    infoModalButton.addEventListener ('click', event => {
      document.getElementById("info-modal").classList.add('hide');
    });


    
    infoModal.setAttribute('role','alertdialog');

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
          role='menu'
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
