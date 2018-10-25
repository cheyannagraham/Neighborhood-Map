import React from 'react';


function Filter(props) {

    return (
        <div id='filter-results-container'>
            <h2>Filter Results</h2>
            <input 
                type='text' 
                onChange = { (e) => {props.findResults(e.target.value)}} />
        </div> 
    )
}

export default Filter