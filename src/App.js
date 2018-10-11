import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map'
import ListView from './Components/ListView'
// import * from 


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = 
    {
      markers : '732 stonebridge way, pleasant hill, ca'
    }
  }

  componentDidMount() {
    this.getMap();
  }

  getMap() {
    // let map = new google.maps.Map(
    //   document.createElement('div'),
    //   {
    //     center:
    //     {
    //         lat:41.159577,
    //         lng:-74.255406
    //     },
    //     zoom:9
    //   }
    // )
  }

  render() {
    return (
      <div>
        <Map markers = {this.state.markers} />
        <ListView markers = {this.state.markers} />
      </div>
    );
  }
}

export default App;
