import React, { Component } from 'react';
import './App.css';
import './MediaQueries.css';
import Map from './Components/Map';
import Header from './Components/Header';
// import Menu from './Components/Menu';



class App extends Component {
  
  render() {
    return (
        <div id='app'>
          <Header />
          
          <Map mapError = {this.props.mapError} />
          
          {/* <Menu /> */}

        </div>
      
    );
  }
}

export default App;
