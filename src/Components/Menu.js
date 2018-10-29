import React from 'react'
import Search from './Search.js'
import Filter from './Filter.js'
import ListView from './ListView.js'


class Menu extends React.Component {

    // this function updates the marker clicked to be reflected in the list view. 
    showMarkerData = marker => {
        this.setState({markerClicked : marker});
    }

    render() {
        return (
            <div id='side-bar'>
    
                <Search 
                updateAppState = {this.props.updateAppState} />
    
                <Filter />
    
                <ListView 
                markers = {this.props.markers} 
                updateAppState = {this.props.updateAppState} 
                markerClicked = {(this.state && this.state.markerClicked) || ''} 
                handleClick = {this.props.handleClick} />
    
            </div>
    
        )

    }
    
}

export default Menu