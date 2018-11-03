import React from 'react'


function Header(props) {

    return (
        <header id='app-header'>
            <h1 tabIndex='0'>Neighborhood Map</h1>
        
            <button 
            aria-label= 'side-menu' 
            id='nav-button'
            onClick={props.navClick}>
                &#9776;
            </button>

        </header>

    )
}

export default Header
