import React from 'react'
import Search from './Search.js'
import Filter from './Filter.js'
import ListView from './ListView.js'


function Menu(props) {
    // console.log(props)
    return (
        <div id='side-bar'>

            <Search 
            updateAppState = {props.updateAppState} />

            <Filter />

            <ListView 
            markers = {props.markers} 
            updateAppState = {props.updateAppState} 
            markerClicked = {props.markerClicked} 
            handleClick = {props.handleClick} />

        </div>

    )
}

export default Menu