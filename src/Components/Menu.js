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
        console.log(data,'menu');
        this.setState(data)
    }

    // filterList = results => {
    //     //this.setState({markers:results})
    //     //this.listViewRef.current.makeList(results);
    //     // this.listViewRef.current.render('chey');
    //     this.updateState(results)
    // }

    // showMarkerData = marker => {
    //     this.setState({markerClicked : marker});
    // }

    toggleView = () => {
        const sideMenu = document.getElementById('side-menu');
        sideMenu.className.includes('hide-menu') ?
        sideMenu.classList.remove('hide-menu') : 
        sideMenu.classList.add('hide-menu');
    }


    render() {
        return (
            <div id='side-menu' className = {this.props.navHidden ? 'hide-menu' : ''}>
    
                <Search 
                updateAppState = {this.props.updateAppState} />
    
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