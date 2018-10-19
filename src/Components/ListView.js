import React from 'react';

class ListView extends React.Component {


    render() {
        return (
            <div>
                Filter Results <input 
                type='text' 
                value = {this.searchField} 
                onChange = { (e) => {this.props.findResults(e.target.value)}} />

                {this.props.markers && this.props.markers.length > 0 ? 
                
                <ol>
                    {this.props.markers.map(marker => {
                        let className = '';
                        
                        this.props.markerClicked && marker.title === this.props.markerClicked.title ?
                        className = 'clicked' : className = '';

                        return (
                            <li  
                            key = {marker.id || marker.title}>
                                <a className = {className}
                                href='#' 
                                onClick = {() => {this.props.handleClick(marker)}}>
                                    {marker.title} 
                                </a>
                            </li>
                        )                        
                    })}
                </ol> :

                <p>No Results</p>

           }</div>
        )
    }
}

export default ListView;