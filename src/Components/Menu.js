import React from 'react'
import Search from './Search.js'
import Filter from './Filter.js'
import ListView from './ListView.js'


class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.listViewRef = React.createRef();
    }

    updateState = (data) => {
        this.setState(data)
    }

    toggleView = () => {
        const sideMenu = document.getElementById('side-menu');
        sideMenu.className.includes('hide') ?
        sideMenu.classList.remove('hide') : 
        sideMenu.classList.add('hide');
    }


    render() {
        return (
            <div id='side-menu' aria-label='side-menu' className = {this.props.navHidden ? 'hide' : ''}>
    
                <Search 
                updateAppState = {this.props.updateAppState}
                showInfoModal = {this.props.showInfoModal} />
    
                <Filter 
                filterResults = {this.props.filterResults} />
    
                <ListView 
                markers = {(this.state && this.state.markers) || []} 
                updateAppState = {this.props.updateAppState} 
                markerClicked = {(this.state && this.state.markerClicked) || ''} 
                handleClick = {this.props.handleClick} 
                ref = {this.listViewRef} />
    
            </div>    
        )
    }    
}

export default Menu