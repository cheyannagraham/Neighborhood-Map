import React from 'react';


function Filter(props) {

    return (
        <div id='filter-results-container'>
            <h3>Filter Results</h3>
            <input 
                type='text' 
                //value = {this.searchField} 
                onChange = { (e) => {props.findResults(e.target.value)}} />
        </div> 
    )
}

export default Filter