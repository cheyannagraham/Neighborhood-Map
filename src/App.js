import React, { Component } from 'react';
import './App.css';
import './MediaQueries.css';
import Map from './Components/Map';
import Header from './Components/Header';
// import Menu from './Components/Menu';



class App extends Component {
  constructor(props) {
    super(props);
    //set nav window to hidden on initial load
    this.state = {hidden: true};
  }

  updateState = data => {

  }
  

  handleNavClick = () => {
    this.state && this.state.hidden ? 
    this.setState({hidden : false}) :
    this.setState({hidden: true});
  }
  
  render() {
    return ( 
        <div id='app'>
          <Header navClick = {this.handleNavClick} />
          
          <Map mapError = {this.props.mapError} navHidden = {this.state.hidden} updateAppState = {this.updateState} />
          
          <Menu />

        </div>
      
    );
  }
}

export default App;
