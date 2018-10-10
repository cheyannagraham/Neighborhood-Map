import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map'
import ListView from './Components/ListView'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      markers : '732 stonebridge way, pleasant hill, ca'
    }
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
