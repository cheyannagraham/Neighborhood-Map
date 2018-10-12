import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map'


class App extends Component {
  
  render() {
    return (
      <div>
        <Map mapError = {this.props.mapError} />
      </div>
    );
  }
}

export default App;
