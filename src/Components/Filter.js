import React from 'react';


function Filter(props) {

    return (
        <div id='filter-results-container'>
            <h2 id='filter-results-header'>Filter Results</h2>

            <input aria-labelledby='filter-results-header'
                type='text' 
                onChange = { (e) => {props.filterResults(e.target.value)}} />
        </div> 
    )
}

export default Filter