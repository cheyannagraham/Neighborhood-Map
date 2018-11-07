import React from 'react'


function Header(props) {

    return (
        <header id='app-header'>
            <h1>Neighborhood Map</h1>
        
            <button  
            id='nav-button'
            onClick={props.navClick}>
                &#9776;
            </button>

        </header>

    )
}

export default Header
