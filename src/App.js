import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map'
import ListView from './Components/ListView'


class App extends Component {
  render() {
    return (
      <div>
        <Map />
        <ListView />
      </div>
    );
  }
}

export default App;
