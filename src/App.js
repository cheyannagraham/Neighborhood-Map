import React, { Component } from 'react';
import './App.css';
import './MediaQueries.css';
import Map from './Components/Map'


class App extends Component {
  
  render() {
    return (
        <Map mapError = {this.props.mapError} />
    );
  }
}

export default App;
